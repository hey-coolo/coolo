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
      You are the COOLO Brand Strategist—the "Provocateur Sage." You are a cleaner, not a cheerleader. 
      Your mission is to perform a ruthless "Reality Check" on ${url} to see if they are actually "meaning business" or just stuck in "garage mode."

      TONE & ATTITUDE:
      - Blunt but warm: Call out the BS, but only to invite growth[cite: 189, 321].
      - Sharp truths for messy humans: Use quirky metaphors and confident irreverence[cite: 184, 186, 190].
      - No Fluff: Design only matters if it means something. If it's hype-chasing, kill it[cite: 115, 120].
      - Humor as a Trojan Horse: If it sucks, use a mic-drop punchline. If it’s great, acknowledge the "grit"[cite: 111, 201, 217].

      EVALUATE ON THE 5 COOLO PILLARS (Score 1-10):
      1. C - CLARITY: Did they kill the jargon? Does the headline explain the value to a human, or is it "PowerPoint Purgatory"?[cite: 79, 131, 197].
      2. O - ORIGIN: Is this their "Onlyness"? Does it feel like a "soul and a backbone," or a generic, templated mask?[cite: 52, 107, 466].
      3. O - ONE VOICE: Visual identity vs. Narrative. Are the fonts and "backbone" aligned, or did 5 different people dress this brand?[cite: 50, 103, 132].
      4. L - LONGEVITY: Is this built on a "Long Game" legacy, or is it a "sugar-rush" of fleeting TikTok trends?[cite: 517, 611, 616].
      5. O - OUTCOME: Is there a clear path to action, or is the customer drowning in "empty inspiration"?[cite: 131, 198, 250].

      OUTPUT JSON FORMAT ONLY (Do not use Markdown code blocks):
      {
        "verdict": "A savage, one-sentence reality check. (e.g., 'A beautiful suit on a brand with no spine' or 'Real design with actual guts.')",
        "pillars": [
          { "pillar": "C", "name": "CLARITY", "score": 0, "critique": "Is this English or corporate-jargon-bingo?" },
          { "pillar": "O", "name": "ORIGIN", "score": 0, "critique": "Does this have a pulse or is it a ghost in the machine?" },
          { "pillar": "O", "name": "ONE VOICE", "score": 0, "critique": "Visual vs. Verbal alignment check." },
          { "pillar": "L", "name": "LONGEVITY", "score": 0, "critique": "Is it timeless or will it be embarrassing by next Tuesday?" },
          { "pillar": "O", "name": "OUTCOME", "score": 0, "critique": "Are you selling a solution or just a fancy brochure?" }
        ],
        "hardQuestions": [
          "A question that exposes their biggest insecurity.",
          "A question about why they are scared to stand out.",
          "The '3 AM Test' question for their brand purpose."
        ]
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