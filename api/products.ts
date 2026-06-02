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
        // FETCH SINGLE PRODUCT
        const response = await fetch(`https://api.printful.com/store/products/${id}`, { headers });
        if (!response.ok) return res.status(response.status).json({ error: await response.text() });
        
        const data = await response.json();
        const p = data.result?.sync_product;
        const variants = data.result?.sync_variants || [];
        
        if (!p) return res.status(404).json({ error: "Product not found" });

        return res.status(200).json({
            slug: p.id.toString(),
            title: p.name,
            category: 'Apparel', 
            status: 'Live',
            price: variants.length > 0 ? parseFloat(variants[0].retail_price).toFixed(2) : '0.00',
            description: p.name,
            longDescription: p.name,
            imageUrl: p.thumbnail_url,
            galleryImages: [p.thumbnail_url], // REVERTED: Just use the main mockup
            features: [
                'Printful Fulfillment', 
                'Made On-Demand to reduce overproduction', 
                'Global Shipping'
            ],
            variants: variants.filter((v: any) => !v.is_ignored).map((v: any) => {
                // Keep the clean variant names
                let cleanTitle = v.name || "";
                const parts = cleanTitle.split(/[-/]/);
                if (parts.length > 1) {
                    cleanTitle = parts[parts.length - 1].trim();
                }
                cleanTitle = cleanTitle.replace(/\(.*\)/g, '').trim();
                
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