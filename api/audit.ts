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
    const modelsToTry = ["gemini-2.5-pro"];
    let rawText = "";

    const SYSTEM_PROMPT = `
    TARGET URL: ${url}

    MISSION:
    Perform a live, fact-based "COOLO Brand Reality Check" (Deep Strategic Audit).
    This is NOT a creative writing exercise. This is a FACT-BASED audit.

    EXECUTION STEPS (You MUST use the 'googleSearch' tool):
    1.  **CRAWL & VERIFY**: Search for the brand name specifically. Does the URL match a real business?
    2.  **VISUAL & VIBE CHECK**: Search for "site design", "instagram", or "products" for this brand. Do search snippets describe a premium or amateur aesthetic?
    3.  **VOICE & REPUTATION**: Search for "[Brand Name] reviews", "Reddit [Brand Name]", or their social bios. What is the *actual* market sentiment?
    4.  **CONSISTENCY**: Does the promise on their landing page match what people are saying on other platforms?

    SCORING RULES (BRUTAL HONESTY):
    - **Score 5/10** is Average/Invisible.
    - **Score 8+/10** requires EVIDENCE of excellence found in search results.
    - If data is scarce or the brand is invisible, score low on 'Origin' and 'Outcome'.

    OUTPUT FORMAT:
    Return pure JSON matching the schema. No markdown.
    
    Structure:
    {
      "verdict": string (A razor-sharp, 10-15 word summary of the gap between their strategy and reality),
      "pillars": [
        { "pillar": "C", "name": "CLARITY", "score": number (1-10), "critique": "Specific evidence from search..." },
        { "pillar": "O", "name": "ORIGIN", "score": number (1-10), "critique": "Specific evidence..." },
        { "pillar": "O", "name": "ONE VOICE", "score": number (1-10), "critique": "Specific evidence..." },
        { "pillar": "L", "name": "LONGEVITY", "score": number (1-10), "critique": "Specific evidence..." },
        { "pillar": "O", "name": "OUTCOME", "score": number (1-10), "critique": "Specific evidence..." }
      ],
      "hardQuestions": [string, string, string] (3 strategic questions based on the specific weaknesses found)
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