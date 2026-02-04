import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuditResult } from "../types";

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
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT 
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Fix: Robust JSON cleaning to remove markdown formatting
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
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check if your Wi-Fi is actually vibing." },
          { pillar: "L", name: "LOGS", score: 0, critique: "System says: " + (error.message || "Unknown vibe check failure.") },
          { pillar: "R", name: "REPORT", score: 0, critique: "Still broken? Holla at hey@coolo.co.nz." }
        ],
        hardQuestions: ["Is the URL legit?", "Is the site public?", "Are you definitely online?"]
    };
  }
};