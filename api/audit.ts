import { GoogleGenerativeAI } from "@google/generative-ai";

// api/audit.ts
export default async function handler(req: any, res: any) {
  // 1. CORS Configuration (Allow your domain)
  // Vercel serverless functions need manual CORS handling sometimes depending on setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // 2. Secure Environment Variable (Use process.env for Node context)
  const apiKey = process.env.GEMINI_API_KEY; 
  
  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY missing in server environment.");
    return res.status(500).json({ 
        verdict: "CONFIGURATION ERROR",
        totalScore: 0,
        pillars: [], 
        hardQuestions: ["Is the API Key set in Vercel?"]
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const SYSTEM_PROMPT = `
      You are the COOLO Brand Strategist. Perform a "Reality Check" on: ${url}.
      
      OUTPUT JSON FORMAT ONLY:
      {
        "verdict": "Punchy one-sentence summary",
        "pillars": [
          { "pillar": "C", "name": "CLARITY", "score": 5, "critique": "Explanation..." },
          { "pillar": "O", "name": "ORIGIN", "score": 5, "critique": "Explanation..." },
          { "pillar": "O", "name": "ONE VOICE", "score": 5, "critique": "Explanation..." },
          { "pillar": "L", "name": "LONGEVITY", "score": 5, "critique": "Explanation..." },
          { "pillar": "O", "name": "OUTCOME", "score": 5, "critique": "Explanation..." }
        ],
        "hardQuestions": ["Question 1?", "Question 2?", "Question 3?"]
      }
    `;

    const result = await model.generateContent(SYSTEM_PROMPT);
    const response = await result.response;
    const text = response.text();
    
    // Clean markdown if Gemini adds it
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    // Calculate score server-side
    let total = 0;
    let count = 0;
    if(jsonResponse.pillars) {
        jsonResponse.pillars.forEach((p: any) => {
            total += (p.score || 0);
            count++;
        });
    }
    jsonResponse.totalScore = count > 0 ? Number((total / count).toFixed(1)) : 0;

    return res.status(200).json(jsonResponse);

  } catch (error: any) {
    console.error("Gemini Audit Error:", error);
    return res.status(500).json({ error: error.message || "Audit failed" });
  }
}