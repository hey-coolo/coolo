import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DROPS } from '../constants';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CRITICAL FIX: Prevent Vercel Edge caching so live inventory always shows
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Safely extract ID if Vercel parses it as an array
  const rawId = req.query.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId; 
  
  const storeId = process.env.PRINTFUL_STORE_ID;
  const token = process.env.PRINTFUL_ACCESS_TOKEN;

  // HELPER: Serve Fallback Constants
  const serveFallback = () => {
    if (id) {
        const drop = DROPS.find((d: any) => d.slug === id);
        return drop ? res.status(200).json(drop) : res.status(404).json({ error: 'Product not found in local constants' });
    }
    return res.status(200).json(DROPS);
  };

  // If environment variables are entirely missing, skip fetch and serve local data.
  if (!token) {
    console.warn("Printful Environment Variables missing. Serving local fallback.");
    return serveFallback();
  }

  const headers: any = { Authorization: `Bearer ${token}` };
  if (storeId) headers['X-PF-Store-Id'] = storeId;

  try {
    if (id) {
        // --- FETCH SINGLE PRODUCT FOR PDP (PRINTFUL API V2) ---
        const response = await fetch(`https://api.printful.com/v2/store/products/${id}`, { headers });
        
        if (!response.ok) {
            console.error(`Printful returned ${response.status} for product ${id}. Serving fallback.`);
            return serveFallback();
        }
        
        const data = await response.json();
        // Defensive check for V2 beta changing response wrappers (data vs result)
        const p = data.data?.sync_product || data.result?.sync_product;
        const variants = data.data?.sync_variants || data.result?.sync_variants || [];
        
        // Safely map Printful Product to COOLO 'Drop' Type
        const mappedProduct = {
            slug: p.id.toString(),
            title: p.name,
            category: 'Apparel', 
            status: 'Live',
            price: variants.length > 0 ? parseFloat(variants[0].retail_price).toFixed(2) : '0.00',
            description: p.name,
            longDescription: p.name,
            imageUrl: p.thumbnail_url,
            galleryImages: [p.thumbnail_url],
            features: ['Printful Fulfillment', 'Made on Demand'],
            variants: variants.filter((v: any) => !v.is_ignored).map((v: any) => ({
                id: v.id,
                title: v.name,
                price: parseFloat(v.retail_price).toFixed(2),
                available: true // Printful manages inventory actively
            }))
        };

        return res.status(200).json(mappedProduct);
    } else {
        // --- FETCH ALL PRODUCTS FOR CATALOG (PRINTFUL API V2) ---
        const response = await fetch(`https://api.printful.com/v2/store/products?limit=50`, { headers });
        
        if (!response.ok) {
            console.error(`Printful returned ${response.status} for catalog. Serving fallback.`);
            return serveFallback();
        }

        const data = await response.json();
        const results = data.data || data.result;
        
        if (!results || !Array.isArray(results)) {
            console.error("Printful payload missing data array. Serving fallback.");
            return serveFallback();
        }
        
        // Safely map Printful Product Array to COOLO 'Drop' Type Array
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
    console.error('Printful API Exception caught:', error.message);
    // If the fetch completely crashes, serve the local constants so the site doesn't go down.
    return serveFallback();
  }
}