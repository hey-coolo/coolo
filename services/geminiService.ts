import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuditResult } from "../types";

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

export const runBrandAudit = async (url: string): Promise<AuditResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is missing");
    return {
        totalScore: 0,
        verdict: "CONFIG ERROR",
        pillars: [],
        hardQuestions: ["Missing API Key in Vercel"]
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error("Analysis timed out")), 45000)
  );

  try {
    const prompt = `
    TARGET URL: ${url}

    MISSION:
    Perform a ruthless "COOLO Brand Reality Check".
    
    RESEARCH STEPS (Use Google Search):
    1.  **VISUALS & VIBE**: Look for descriptions of their website design, logo, colors, and imagery.
    2.  **VOICE & BIO**: Analyze their Headline, "About Us" snippets, and Social Media bios.
    3.  **consistency**: Do the visuals (inferred) match the words?

    OUTPUT:
    Return a single JSON object.
    
    Structure required:
    {
      "verdict": string,
      "pillars": [
        { "pillar": "C", "name": "CLARITY", "score": number, "critique": string },
        { "pillar": "O", "name": "ORIGIN", "score": number, "critique": string },
        { "pillar": "O", "name": "ONE VOICE", "score": number, "critique": string },
        { "pillar": "L", "name": "LONGEVITY", "score": number, "critique": string },
        { "pillar": "O", "name": "OUTCOME", "score": number, "critique": string }
      ],
      "hardQuestions": [string, string, string]
    }
    `;

    const fetchAudit = async () => {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT 
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Robust JSON cleaning to remove markdown formatting
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const raw = JSON.parse(cleanedText);

      const pillars = Array.isArray(raw.pillars) ? raw.pillars : [];
      let calculatedTotal = 0;
      let validPillarCount = 0;
      
      pillars.forEach((p: any) => {
        const score = Number(p.score) || 0;
        calculatedTotal += score;
        if (score > 0) validPillarCount++;
      });

      const finalAverage = validPillarCount > 0 
        ? Number((calculatedTotal / validPillarCount).toFixed(1)) 
        : 0;

      return {
        totalScore: finalAverage,
        verdict: raw.verdict || "Analysis Incomplete",
        pillars: pillars,
        hardQuestions: raw.hardQuestions || []
      };
    };

    return await Promise.race([fetchAudit(), timeout]);

  } catch (error: any) {
    console.error("Audit Engine Redlined:", error);
    
    return {
        totalScore: 0,
        verdict: "SIGNAL LOST",
        pillars: [
          { pillar: "E", name: "ERROR", score: 0, critique: "Google's AI is ghosting us. It's not you, it's the cloud." },
          { pillar: "R", name: "RETRY", score: 0, critique: "Give it 30 seconds to breathe and try again." },
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check if your Wi-Fi is actually working." },
          { pillar: "L", name: "LOGS", score: 0, critique: "System says: " + (error.message || "Unknown vibe check failure.") },
          { pillar: "R", name: "REPORT", score: 0, critique: "Still broken? Let's us know we can run it for you at hey@coolo.co.nz." }
        ],
        hardQuestions: ["Is the URL legit?", "Is the site public?", "Are you definitely online?"]
    };
  }
};