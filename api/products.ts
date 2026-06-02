import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawId = req.query.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId; 
  
  const storeId = process.env.PRINTFUL_STORE_ID;
  const token = process.env.PRINTFUL_ACCESS_TOKEN;

  const serveFallback = (reason: string) => {
    console.warn(`[PRINTFUL FALLBACK] ${reason}`);
    return res.status(500).json({ error: reason });
  };

  if (!token) return serveFallback("Missing PRINTFUL_ACCESS_TOKEN");

  const headers: any = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  };
  if (storeId) headers['X-PF-Store-Id'] = storeId;

  try {
    if (id) {
        // 1. FETCH SYNC PRODUCT (Your customized item)
        const response = await fetch(`https://api.printful.com/store/products/${id}`, { headers });
        if (!response.ok) return res.status(response.status).json({ error: await response.text() });
        
        const data = await response.json();
        const p = data.result?.sync_product;
        const variants = data.result?.sync_variants || [];
        
        if (!p) return res.status(404).json({ error: "Product not found" });

        // Extract extra mockup angles from the variants
        const gallerySet = new Set<string>();
        if (p.thumbnail_url) gallerySet.add(p.thumbnail_url);
        
        variants.forEach((v: any) => {
            if (v.files && Array.isArray(v.files)) {
                v.files.forEach((file: any) => {
                    if (file.preview_url) gallerySet.add(file.preview_url);
                });
            }
        });

        // 2. FETCH CATALOG PRODUCT (To extract the real description)
        let enrichedDescription = p.name; // Fallback to title
        const baseProductId = variants.length > 0 ? (variants[0].product?.product_id || variants[0].product_id) : null;
        
        if (baseProductId) {
            try {
                // Hitting the Printful V2 Catalog API
                const catRes = await fetch(`https://api.printful.com/v2/catalog-products/${baseProductId}`, { headers });
                if (catRes.ok) {
                    const catData = await catRes.json();
                    if (catData.data?.description) {
                        // Strip raw HTML from Printful's catalog description for a clean text UI
                        enrichedDescription = catData.data.description.replace(/(<([^>]+)>)/gi, "").trim();
                    }
                }
            } catch (e) {
                console.error("Failed to fetch catalog description", e);
            }
        }

        return res.status(200).json({
            slug: p.id.toString(),
            title: p.name,
            category: 'Apparel', 
            status: 'Live',
            price: variants.length > 0 ? parseFloat(variants[0].retail_price).toFixed(2) : '0.00',
            description: enrichedDescription.substring(0, 140) + '...',
            longDescription: enrichedDescription,
            imageUrl: p.thumbnail_url,
            galleryImages: Array.from(gallerySet), 
            features: [
                'Printful Fulfillment', 
                'Made On-Demand to reduce overproduction', 
                'Global Shipping'
            ],
            variants: variants.filter((v: any) => !v.is_ignored).map((v: any) => {
                
                // 3. PERFECT VARIANT CLEANING:
                let cleanTitle = v.name || "";
                // If variant name contains the product title, slice it out
                if (cleanTitle.includes(p.name)) {
                    cleanTitle = cleanTitle.replace(p.name, '').trim();
                }
                // Remove leftover hyphens, slashes, or whitespace at the start
                cleanTitle = cleanTitle.replace(/^[-/\s]+/, '').trim();
                // Strip out parenthesis notes (e.g., "(Large)")
                cleanTitle = cleanTitle.replace(/\(.*?\)/g, '').trim();
                
                return {
                    id: v.id,
                    title: cleanTitle || "Standard",
                    price: parseFloat(v.retail_price).toFixed(2),
                    available: true 
                };
            })
        });
    } else {
        // FETCH CATALOG
        const response = await fetch(`https://api.printful.com/store/products?limit=50`, { headers });
        if (!response.ok) return res.status(response.status).json({ error: await response.text() });

        const data = await response.json();
        const results = data.result;
        
        if (!results || !Array.isArray(results)) return res.status(500).json({ error: "Invalid payload" });
        if (results.length === 0) return res.status(200).json([]);
        
        // PARALLEL SWEEP: Fetch detailed pricing concurrently
        const detailedProductPromises = results.map((p: any) => 
            fetch(`https://api.printful.com/store/products/${p.id}`, { headers })
                .then(res => res.json())
                .catch(() => null) 
        );

        const detailedProductsData = await Promise.all(detailedProductPromises);

        const mappedProducts = detailedProductsData.map((detailData: any) => {
            if (!detailData || !detailData.result) return null;
            
            const p = detailData.result.sync_product;
            const variants = detailData.result.sync_variants || [];
            const actualPrice = variants.length > 0 ? parseFloat(variants[0].retail_price).toFixed(2) : '0.00';

            return {
                slug: p.id.toString(),
                title: p.name || 'Untitled Product',
                category: 'Apparel',
                status: 'Live',
                price: actualPrice, 
                description: p.name,
                imageUrl: p.thumbnail_url || ''
            };
        }).filter(Boolean);
        
        return res.status(200).json(mappedProducts);
    }
  } catch (error: any) {
    return res.status(500).json({ error: `Server Exception: ${error.message}` });
  }
}