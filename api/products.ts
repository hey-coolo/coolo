import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DROPS } from '../constants';

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

  const serveFallback = (reason: string) => {
    console.warn(`[PRINTFUL FALLBACK] ${reason}`);
    if (id) {
        const drop = DROPS.find((d: any) => d.slug === id);
        return drop ? res.status(200).json(drop) : res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(DROPS);
  };

  if (!token) {
    return serveFallback("Missing PRINTFUL_ACCESS_TOKEN");
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
        
        if (!response.ok) {
            const errText = await response.text();
            return serveFallback(`Fetch failed (HTTP ${response.status}): ${errText}`);
        }
        
        const data = await response.json();
        const p = data.result?.sync_product;
        const variants = data.result?.sync_variants || [];
        
        if (!p) return serveFallback("Missing 'sync_product' object.");

        // Aggressively extract extra mockup angles from variants to build the image gallery
        const gallerySet = new Set<string>();
        if (p.thumbnail_url) gallerySet.add(p.thumbnail_url);
        
        variants.forEach((v: any) => {
            if (v.files && Array.isArray(v.files)) {
                v.files.forEach((file: any) => {
                    // Grab any preview image it can find
                    if (file.preview_url) {
                        gallerySet.add(file.preview_url);
                    }
                });
            }
        });

        const mappedProduct = {
            slug: p.id.toString(),
            title: p.name,
            category: 'Apparel', 
            status: 'Live',
            price: variants.length > 0 ? parseFloat(variants[0].retail_price).toFixed(2) : '0.00',
            description: p.name,
            longDescription: p.name,
            imageUrl: p.thumbnail_url,
            galleryImages: Array.from(gallerySet), // Pass all unique angles to the UI
            features: ['Printful Fulfillment', 'Made on Demand', 'Global Shipping'],
            variants: variants.filter((v: any) => !v.is_ignored).map((v: any) => {
                
                // CLEAN UP VARIANT NAMES: Extract just the size/color
                let cleanTitle = v.name;
                if (cleanTitle.includes(' - ')) {
                    cleanTitle = cleanTitle.split(' - ').pop()?.trim() || cleanTitle;
                }
                // Handle cases where Printful uses parentheses for variant names
                if (cleanTitle.includes(' (')) {
                    cleanTitle = cleanTitle.split(' (')[1].replace(')', '').trim();
                }
                
                return {
                    id: v.id,
                    title: cleanTitle,
                    price: parseFloat(v.retail_price).toFixed(2),
                    available: true 
                };
            })
        };

        return res.status(200).json(mappedProduct);
    } else {
        // FETCH CATALOG (Printful API v1)
        const response = await fetch(`https://api.printful.com/store/products?limit=50`, { headers });
        
        if (!response.ok) {
            const errText = await response.text();
            return serveFallback(`Fetch failed (HTTP ${response.status}): ${errText}`);
        }

        const data = await response.json();
        const results = data.result;
        
        if (!results || !Array.isArray(results)) {
            return serveFallback("Payload missing 'result' array.");
        }

        if (results.length === 0) {
            return res.status(200).json([]);
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
    console.error('Server Crash:', error);
    return serveFallback(`Internal Error: ${error.message}`);
  }
}