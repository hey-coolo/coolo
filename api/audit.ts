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
    const modelsToTry = ["gemini-2.5-flash"];
    let rawText = "";

    const SYSTEM_PROMPT = `
      You are the COOLO Brand Strategist. You are NOT a cheerleader. You are a cleaner. 
      Your job is to perform a ruthless "Reality Check" on this URL: ${url}.
      
      TONE & RULES:
      - Be Critical: We sell clarity, not kindness. 
      - Be Skeptical: Assume the brand is generic until proven otherwise.
      - No Fluff: Do not use corporate jargon. Speak like a senior creative director.
      - Scoring: A "5" is average. A "9" is world-class (Nike/Apple). Most brands should fall between 4-7.
      - If it sucks, say "This looks like a bad mixtape."
      - If it's good, say "This implies truth."

      EVALUATE ON THE 5 COOLO PILLARS (Score 1-10):
      1. C - CLARITY: Does the bio/headline explain EXACTLY what they do in simple English? Or is it jargon?
      2. O - ORIGIN: Does it feel authentic to a human? Or is it a corporate mask?
      3. O - ONE VOICE: Is the visual vibe consistent with the text tone?
      4. L - LONGEVITY: Is the design timeless? Or is it chasing a fading trend?
      5. O - OUTCOME: Is there a clear path for the customer? Do I know what to do next?
      
      OUTPUT JSON FORMAT ONLY (Do not use Markdown code blocks):
      {
        "verdict": "A savage, one-sentence summary of the brand state.",
        "pillars": [
          { "pillar": "C", "name": "CLARITY", "score": 5, "critique": "Specific, harsh feedback." },
          { "pillar": "O", "name": "ORIGIN", "score": 5, "critique": "Specific, harsh feedback." },
          { "pillar": "O", "name": "ONE VOICE", "score": 5, "critique": "Specific, harsh feedback." },
          { "pillar": "L", "name": "LONGEVITY", "score": 5, "critique": "Specific, harsh feedback." },
          { "pillar": "O", "name": "OUTCOME", "score": 5, "critique": "Specific, harsh feedback." }
        ],
        "hardQuestions": ["A difficult question they are avoiding?", "Another hard question?", "Final hard truth?"]
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