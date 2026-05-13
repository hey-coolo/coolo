import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Make sure you have added PRINTIFY_ACCESS_TOKEN to your Vercel Environment Variables
  const token = process.env.PRINTIFY_ACCESS_TOKEN;

  if (!token) {
    return res.status(500).json({ 
        error: "Missing Token", 
        message: "Please add PRINTIFY_ACCESS_TOKEN to Vercel or your local .env file first." 
    });
  }

  try {
    const response = await fetch('https://api.printify.com/v1/shops.json', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Printify API rejected the token: ${errorText}`);
    }

    const data = await response.json();
    
    // This will print the exact JSON payload from the Printify docs
    return res.status(200).json({
        message: "Here are your shops! Grab the 'id' number below.",
        shops: data
    });

  } catch (error: any) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: error.message });
  }
}