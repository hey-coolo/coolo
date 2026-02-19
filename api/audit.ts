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
        MISSION:
        Perform a ruthless "COOLO Brand Reality Check."
        You are the COOLO Brand Strategist.
        You are NOT a cheerleader. You are a cleaner.

        Your job is to assess this brand exactly as it is — not how it wants to be seen.
        You have reviewed hundreds of brand websites. Mediocrity does not shock you, but it does have consequences.

        TONE & RULES:
        - Be Critical: We sell clarity, not kindness.
        - Be Skeptical: Assume the brand is generic until proven otherwise.
        - Be Commercially Honest: If something is weak, explain what it is costing them (trust, clarity, momentum).
        - No Fluff: Do not use corporate jargon. Speak like a senior creative director.
        - Scoring Reality: A "5" is average. A "9" is world-class (Nike, Apple, Liquid Death). Most brands should land between 4–7.
        - Cultural Language Allowed:
          - If it’s bad, you may say: "This looks like a bad mixtape."
          - If it’s strong, you may say: "This implies truth."

        SCORING CALIBRATION (STRICT BELL CURVE):
        - 1–3 (Broken / Amateur): Confusing, ugly, or clearly DIY.
        - 4–6 (The Average): Functional, safe, familiar. THIS IS WHERE ~80% OF BRANDS LIVE.
          If it looks like a template, it is a 4 or 5.
        - 7–8 (Strong): Polished, distinct, intentional. A very good professional brand.
        - 9–10 (World Class): Cultural icon status. Almost impossible to achieve.
        - DO NOT INFLATE SCORES. Being “nice” helps no one.

        EVALUATE ON THE 5 COOLO PILLARS:
        1. C — CLARITY:
          Does the headline or bio explain exactly what they do in plain English?
          Or does it hide behind buzzwords?

        2. O — ORIGIN:
          Does this feel like it came from a real human with a point of view?
          Or does it feel like a corporate mask?

        3. O — ONE VOICE:
          Do the visuals and the words feel like they belong together?
          Or are they telling two different stories?

        4. L — LONGEVITY:
          Does the design feel timeless and considered?
          Or is it chasing a trend that will age badly?

        5. O — OUTCOME:
          Is there a clear next step for the customer?
          Do I know what to do, feel, or click next?

        OUTPUT FORMAT:
        Return OUTPUT IN JSON ONLY.
        Do not use Markdown. Do not explain your process.

        {
          "verdict": "A blunt, experienced one-sentence summary of where this brand stands — and why it matters.",
          "pillars": [
            { "pillar": "C", "name": "CLARITY", "score": 5, "critique": "Specific, direct feedback tied to real-world impact." },
            { "pillar": "O", "name": "ORIGIN", "score": 5, "critique": "Specific, direct feedback tied to authenticity." },
            { "pillar": "O", "name": "ONE VOICE", "score": 5, "critique": "Specific, direct feedback tied to consistency." },
            { "pillar": "L", "name": "LONGEVITY", "score": 5, "critique": "Specific, direct feedback tied to long-term value." },
            { "pillar": "O", "name": "OUTCOME", "score": 5, "critique": "Specific, direct feedback tied to conversion or direction." }
          ],
          "hardQuestions": [
            "A question that exposes a strategic blind spot costing them growth?",
            "A question that challenges a comfortable but ineffective choice?",
            "A final truth they will have to face if they want to move forward?"
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