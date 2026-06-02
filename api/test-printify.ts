import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const storeId = process.env.PRINTFUL_STORE_ID;
  const token = process.env.PRINTFUL_ACCESS_TOKEN;

  // TEST 1: Are the environment variables actually injected by Vercel?
  if (!token) {
    return res.status(200).json({
      status: "FAIL: MISSING ENV VARS",
      diagnostics: {
        hasStoreId: !!storeId,
        hasToken: !!token,
        instruction: "Vercel cannot see your Printful environment variables. Go to Vercel -> Settings -> Environment Variables, ensure PRINTFUL_ACCESS_TOKEN exists, and explicitly hit REDEPLOY."
      }
    });
  }

  try {
    const headers: any = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    if (storeId) headers['X-PF-Store-Id'] = storeId;

    // TEST 2: Can we authenticate and fetch products using API v1?
    // Note: Printful API v2 Beta does NOT support the Sync Products endpoint yet.
    const response = await fetch(`https://api.printful.com/store/products?limit=50`, {
        method: 'GET',
        headers
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        return res.status(200).json({ 
            status: `FAIL: PRINTFUL REJECTED REQUEST (HTTP ${response.status})`,
            storeIdUsed: storeId,
            printfulError: errorText,
            instruction: "If it says 'unauthorized', your Token is bad. If it says 'not found', your Store ID is wrong."
        });
    }

    const data = await response.json();
    const resultList = data.result;
    
    // TEST 3: Are there actually products in the store?
    if (!resultList || resultList.length === 0) {
        return res.status(200).json({
            status: "SUCCESS: BUT STORE IS EMPTY",
            storeIdUsed: storeId,
            instruction: "We connected perfectly, but Printful says there are 0 'Sync Products' in this specific store. You need to add/publish products inside Printful."
        });
    }

    // TEST 4: Perfect Success.
    return res.status(200).json({
        status: "SUCCESS: PRODUCTS FOUND",
        productCount: resultList.length,
        firstProductPreview: {
            title: resultList[0].name,
            id: resultList[0].id
        }
    });

  } catch (error: any) {
    return res.status(500).json({ 
        status: "FAIL: SERVER CRASH", 
        message: error.message 
    });
  }
}