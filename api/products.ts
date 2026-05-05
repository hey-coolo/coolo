import { DROPS } from '../constants';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // If fetching a single product, 'id' is passed as a query param (matching our slug)
  const { id } = req.query; 
  const shopId = process.env.PRINTIFY_SHOP_ID;
  const token = process.env.PRINTIFY_ACCESS_TOKEN;

  // PRODUCTION SAFETY FALLBACK: 
  // If API keys aren't set, serve the hardcoded constants so the UI doesn't crash.
  if (!shopId || !token) {
    if (id) {
        const drop = DROPS.find(d => d.slug === id);
        return drop ? res.status(200).json(drop) : res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(DROPS);
  }

  try {
    if (id) {
        // --- FETCH SINGLE PRODUCT FOR PDP ---
        const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products/${id}.json`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch from Printify');
        const p = await response.json();
        
        // Map Printify Product to COOLO 'Drop' Type
        const mappedProduct = {
            slug: p.id,
            title: p.title,
            category: p.tags && p.tags.length > 0 ? p.tags[0] : 'Apparel', 
            status: 'Live',
            price: p.variants.length > 0 ? (p.variants[0].price / 100).toFixed(2) : '0.00',
            // Strip HTML tags from Printify description
            description: p.description.replace(/(<([^>]+)>)/gi, "").substring(0, 120) + '...',
            longDescription: p.description.replace(/(<([^>]+)>)/gi, ""),
            imageUrl: p.images.length > 0 ? p.images[0].src : '',
            galleryImages: p.images.map((img: any) => img.src),
            features: ['Printify Fulfillment', 'Made on Demand'],
            variants: p.variants.filter((v: any) => v.is_enabled).map((v: any) => ({
                id: v.id,
                title: v.title,
                price: (v.price / 100).toFixed(2),
                available: v.is_available
            }))
        };

        return res.status(200).json(mappedProduct);
    } else {
        // --- FETCH ALL PRODUCTS FOR CATALOG ---
        const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json?limit=50`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch from Printify');
        const data = await response.json();
        
        // Map Printify Product Array to COOLO 'Drop' Type Array
        const mappedProducts = data.data.map((p: any) => ({
            slug: p.id,
            title: p.title,
            category: p.tags && p.tags.length > 0 ? p.tags[0] : 'Apparel',
            status: 'Live',
            price: p.variants.length > 0 ? (p.variants[0].price / 100).toFixed(2) : '0.00',
            description: p.description.replace(/(<([^>]+)>)/gi, "").substring(0, 120) + '...',
            imageUrl: p.images.length > 0 ? p.images[0].src : ''
        }));
        
        return res.status(200).json(mappedProducts);
    }

  } catch (error: any) {
    console.error('Printify API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}