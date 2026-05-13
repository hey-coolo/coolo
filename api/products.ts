import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DROPS } from '../constants';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Safely extract ID if Vercel parses it as an array
  const rawId = req.query.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId; 
  
  const shopId = process.env.PRINTIFY_SHOP_ID;
  const token = process.env.PRINTIFY_ACCESS_TOKEN;

  // HELPER: Serve Fallback Constants
  const serveFallback = () => {
    if (id) {
        const drop = DROPS.find((d: any) => d.slug === id);
        return drop ? res.status(200).json(drop) : res.status(404).json({ error: 'Product not found in local constants' });
    }
    return res.status(200).json(DROPS);
  };

  // If environment variables are entirely missing, skip fetch and serve local data.
  if (!shopId || !token) {
    console.warn("Printify Environment Variables missing. Serving local fallback.");
    return serveFallback();
  }

  try {
    if (id) {
        // --- FETCH SINGLE PRODUCT FOR PDP ---
        const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products/${id}.json`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
            console.error(`Printify returned ${response.status} for product ${id}. Serving fallback.`);
            return serveFallback();
        }
        
        const p = await response.json();
        
        // Safely map Printify Product to COOLO 'Drop' Type
        const mappedProduct = {
            slug: p.id,
            title: p.title,
            category: p.tags && p.tags.length > 0 ? p.tags[0] : 'Apparel', 
            status: 'Live',
            price: p.variants && p.variants.length > 0 ? (p.variants[0].price / 100).toFixed(2) : '0.00',
            description: p.description ? p.description.replace(/(<([^>]+)>)/gi, "").substring(0, 120) + '...' : '',
            longDescription: p.description ? p.description.replace(/(<([^>]+)>)/gi, "") : '',
            imageUrl: p.images && p.images.length > 0 ? p.images[0].src : '',
            galleryImages: p.images ? p.images.map((img: any) => img.src) : [],
            features: ['Printify Fulfillment', 'Made on Demand'],
            variants: p.variants ? p.variants.filter((v: any) => v.is_enabled).map((v: any) => ({
                id: v.id,
                title: v.title,
                price: (v.price / 100).toFixed(2),
                available: v.is_available
            })) : []
        };

        return res.status(200).json(mappedProduct);
    } else {
        // --- FETCH ALL PRODUCTS FOR CATALOG ---
        const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json?limit=50`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
            console.error(`Printify returned ${response.status} for catalog. Serving fallback.`);
            return serveFallback();
        }

        const data = await response.json();
        
        // Ensure Printify actually returned the 'data' array
        if (!data.data || !Array.isArray(data.data)) {
            console.error("Printify payload missing data array. Serving fallback.");
            return serveFallback();
        }
        
        // Safely map Printify Product Array to COOLO 'Drop' Type Array
        const mappedProducts = data.data.map((p: any) => ({
            slug: p.id,
            title: p.title,
            category: p.tags && p.tags.length > 0 ? p.tags[0] : 'Apparel',
            status: 'Live',
            price: p.variants && p.variants.length > 0 ? (p.variants[0].price / 100).toFixed(2) : '0.00',
            description: p.description ? p.description.replace(/(<([^>]+)>)/gi, "").substring(0, 120) + '...' : '',
            imageUrl: p.images && p.images.length > 0 ? p.images[0].src : ''
        }));
        
        return res.status(200).json(mappedProducts);
    }

  } catch (error: any) {
    console.error('Printify API Exception caught:', error.message);
    // If the fetch completely crashes, serve the local constants so the site doesn't go down.
    return serveFallback();
  }
}