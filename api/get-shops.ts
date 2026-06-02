import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.PRINTFUL_ACCESS_TOKEN;

  if (!token) {
    return res.status(500).json({ 
        error: "Missing Token", 
        message: "Please add PRINTFUL_ACCESS_TOKEN to Vercel or your local .env file first." 
    });
  }

  try {
    const response = await fetch('https://api.printful.com/stores', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Printful API rejected the token: ${errorText}`);
    }

    const data = await response.json();
    
    return res.status(200).json({
        message: "Here are your stores! Grab the 'id' number below to set your PRINTFUL_STORE_ID.",
        shops: data.result
    });

  } catch (error: any) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: error.message });
  }
}