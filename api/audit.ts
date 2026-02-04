import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  // 1. Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // 2. FIXED: Use process.env for Server-Side API Keys to fix TS1343
  // The Vercel build fails if you use import.meta.env in /api/ files
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL: Missing API Key on Server.");
    return res.status(500).json({ 
      error: 'Server Configuration Error',
      details: 'API Key missing. Check Environment Variables.'
    });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  try {
    let rawText = "";
    
    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            // Use the stable generateContent method
            const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
            const response = await result.response;
            rawText = response.text();
            if (rawText) break; 
        } catch (e: any) {
            console.warn(`Model ${modelName} failed, trying next...`);
            if (modelName === modelsToTry[modelsToTry.length - 1]) throw e;
        }
    }

  // --- 3. EXACT PROMPTS TRANSFERRED FROM CLIENT ---
  const SYSTEM_PROMPT = `
You are the COOLO Brand Strategist. You do not give generic advice. You provide a "Reality Check." Audit the provided profile based on these 5 Pillars derived from the COOLO philosophy:

**The COOLO Framework:**
1. **C - CLARITY:** (Based on "Is your brand confusing?"): Does the bio/headline explain *exactly* what they do in simple English? Or is it full of jargon? (Score 1-10)
2. **O - ORIGIN:** (Based on "We help you reveal it"): Does this feel authentic to a human, or is it a corporate persona? (Score 1-10)
3. **O - ONE VOICE:** (Based on "One Clear Voice"): Is the visual vibe consistent with the text tone? Do they sound like the same person? (Score 1-10)
4. **L - LONGEVITY:** (Based on "Stop chasing trends"): Is the design timeless, or does it look like a bad mixtape of current trends? (Score 1-10)
5. **O - OUTCOME:** (Based on "The Outcome"): Is there a clear path for the customer? Do I know what to do next? (Score 1-10)

**Output Style:**
* Be direct. No fluff.
* If it sucks, say "This looks like a bad mixtape."
* If it's good, say "This implies truth."
* End with 3 "Hard Questions" the user needs to answer.
`;

  const prompt = `
    TARGET URL: ${url}

    MISSION:
    Perform a ruthless "COOLO Brand Reality Check" on this URL.
    
    NOTE: You are operating in INFERENCE MODE. You cannot browse the live web.
    Analyze the URL string itself, the industry implied by the domain, and apply general knowledge about this brand (if known) or typical patterns for this type of business.
    
    If the brand is unknown, profile it based on the "Vibe" suggested by its name.
    
    OUTPUT:
    Return a single JSON object. 
    Strictly format as JSON. No markdown ticks.
    
    Structure required:
    {
      "verdict": string (A punchy, one-sentence summary of the brand reality),
      "pillars": [
        { "pillar": "C", "name": "CLARITY", "score": number (1-10 integer), "critique": string },
        { "pillar": "O", "name": "ORIGIN", "score": number (1-10 integer), "critique": string },
        { "pillar": "O", "name": "ONE VOICE", "score": number (1-10 integer), "critique": string },
        { "pillar": "L", "name": "LONGEVITY", "score": number (1-10 integer), "critique": string },
        { "pillar": "O", "name": "OUTCOME", "score": number (1-10 integer), "critique": string }
      ],
      "hardQuestions": [string, string, string]
    }
  `;
  
  try {
    let rawText = "";
    let errorLog = "";

    // 4. Model Fallback Loop
    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
            const response = await result.response;
            rawText = response.text();
            break; // Success
        } catch (e: any) {
            console.warn(`Model ${modelName} failed.`);
            errorLog = e.message;
            if (modelName === modelsToTry[modelsToTry.length - 1]) throw new Error(errorLog);
        }
    }

    // 5. Clean & Send JSON
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    return res.status(200).json(jsonResponse);

} catch (error: any) {
    console.error("Audit Service Error:", error);
    
    return {
        totalScore: 0,
        verdict: "SIGNAL LOST",
        pillars: [
          { pillar: "E", name: "ERROR", score: 0, critique: "Google's AI is ghosting us. It's not you, it's the cloud." },
          { pillar: "R", name: "RETRY", score: 0, critique: "Take a breath, hit refresh in 30 seconds." },
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check if your Wi-Fi is actually vibing." },
          { pillar: "L", name: "LOGS", score: 0, critique: "System says: " + (error.message || "Unknown vibe failure.") },
          { pillar: "R", name: "REPORT", score: 0, critique: "Still broken? Holla at hey@coolo.co.nz." }
        ],
        hardQuestions: ["Is the URL legit?", "Is the site public?", "Are you definitely online?"]
    };
  }
};
