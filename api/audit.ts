import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  // 1. CORS Headers
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

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
        verdict: "CONFIGURATION ERROR",
        totalScore: 0,
        pillars: [], 
        hardQuestions: ["Is the API Key set in Vercel?"]
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use stable production model string to prevent 404
    const modelsToTry = ["gemini-1.5-pro-002"];
    let rawText = "";

    const SYSTEM_PROMPT = `
      You are the COOLO Brand Strategist. Perform a "Reality Check" on: ${url}.
      Tone: Casual, direct, Coolo. If it sucks, say "This looks like a bad mixtape."
      
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

    // Attempt model fallback
    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent([SYSTEM_PROMPT]);
            const response = await result.response;
            rawText = response.text();
            if (rawText) break;
        } catch (e) {
            console.warn(`Model ${modelName} failed, trying next...`);
        }
    }
    
    // Clean Markdown
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    // Calculate Scores Locally
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