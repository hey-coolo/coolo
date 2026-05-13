import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const shopId = process.env.PRINTIFY_SHOP_ID;
  const token = process.env.PRINTIFY_ACCESS_TOKEN;

  // TEST 1: Are the environment variables actually injected by Vercel?
  if (!shopId || !token) {
    return res.status(200).json({
      status: "FAIL: MISSING ENV VARS",
      diagnostics: {
        hasShopId: !!shopId,
        hasToken: !!token,
        instruction: "Vercel cannot see your environment variables. Go to Vercel -> Settings -> Environment Variables, ensure they exist, and explicitly hit REDEPLOY."
      }
    });
  }

  try {
    // TEST 2: Can we authenticate and fetch products?
    const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json?limit=50`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        return res.status(200).json({ 
            status: `FAIL: PRINTIFY REJECTED REQUEST (HTTP ${response.status})`,
            shopIdUsed: shopId,
            printifyError: errorText,
            instruction: "If it says 'unauthorized', your Token is bad. If it says 'not found', your Shop ID is wrong."
        });
    }

    const data = await response.json();
    
    // TEST 3: Are there actually products in the store?
    if (!data.data || data.data.length === 0) {
        return res.status(200).json({
            status: "SUCCESS: BUT STORE IS EMPTY",
            shopIdUsed: shopId,
            instruction: "We connected perfectly, but Printify says there are 0 products in this specific shop. You need to add/publish products in Printify."
        });
    }

    // TEST 4: Perfect Success.
    return res.status(200).json({
        status: "SUCCESS: PRODUCTS FOUND",
        productCount: data.data.length,
        firstProductPreview: {
            title: data.data[0].title,
            id: data.data[0].id
        }
    });

  } catch (error: any) {
    return res.status(500).json({ 
        status: "FAIL: SERVER CRASH", 
        message: error.message 
    });
  }
}