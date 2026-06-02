import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CRITICAL FIX: Prevent Vercel caching so live inventory always shows
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

  if (!token) {
    return res.status(500).json({ error: "Missing PRINTFUL_ACCESS_TOKEN on Vercel." });
  }

  const headers: any = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  };
  if (storeId) headers['X-PF-Store-Id'] = storeId;

  try {
    if (id) {
        // FETCH SINGLE PRODUCT (Printful API v1)
        const response = await fetch(`https://api.printful.com/store/products/${id}`, { headers });
        if (!response.ok) return res.status(response.status).json({ error: await response.text() });
        
        const data = await response.json();
        const p = data.result?.sync_product;
        const variants = data.result?.sync_variants || [];
        
        if (!p) return res.status(404).json({ error: "No product found in Printful" });

        // Extract extra mockup angles from the variants to build a rich image gallery
        const gallerySet = new Set<string>();
        if (p.thumbnail_url) gallerySet.add(p.thumbnail_url);
        
        variants.forEach((v: any) => {
            if (v.files && Array.isArray(v.files)) {
                v.files.forEach((file: any) => {
                    if (file.type === 'preview' && file.preview_url) {
                        gallerySet.add(file.preview_url);
                    }
                });
            }
        });

        return res.status(200).json({
            slug: p.id.toString(),
            title: p.name,
            category: 'Apparel', 
            status: 'Live',
            price: variants.length > 0 ? parseFloat(variants[0].retail_price).toFixed(2) : '0.00',
            description: p.name,
            longDescription: p.name,
            imageUrl: p.thumbnail_url,
            galleryImages: Array.from(gallerySet), // Passes all unique angles to your UI
            features: ['Printful Fulfillment', 'Made on Demand', 'Global Shipping'],
            variants: variants.filter((v: any) => !v.is_ignored).map((v: any) => {
                
                // 1. Clean Printful's clunky variant names (e.g. "Unisex ECO Hoodie - Black / XL" -> "Black / XL")
                let cleanTitle = v.name.replace(p.name, '').trim();
                cleanTitle = cleanTitle.replace(/^[-\s\/]+/, ''); // Remove leading dashes or slashes
                
                return {
                    id: v.id,
                    title: cleanTitle || v.name, // Fallback to raw name if parsing fails
                    price: parseFloat(v.retail_price).toFixed(2),
                    available: true 
                };
            })
        });
    } else {
        // FETCH CATALOG (Printful API v1)
        const response = await fetch(`https://api.printful.com/store/products?limit=50`, { headers });
        if (!response.ok) return res.status(response.status).json({ error: await response.text() });

        const data = await response.json();
        const results = data.result;
        
        if (!results || !Array.isArray(results)) {
            return res.status(500).json({ error: "Invalid payload from Printful" });
        }
        
        const mappedProducts = results.map((p: any) => ({
            slug: p.id.toString(),
            title: p.name || 'Untitled Product',
            category: 'Apparel',
            status: 'Live',
            price: '0.00', 
            description: p.name,
            imageUrl: p.thumbnail_url || ''
        }));
        
        return res.status(200).json(mappedProducts);
    }
  } catch (error: any) {
    return res.status(500).json({ error: `Server Exception: ${error.message}` });
  }
}