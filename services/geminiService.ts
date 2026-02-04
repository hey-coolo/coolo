import { GoogleGenAI } from "@google/genai";
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
  // FIX: Use Vite-compatible environment variable access
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    // In production, this should likely throw an error or handle gracefully
    throw new Error("Missing API Key");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Timeout promise to prevent infinite loading
  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error("Analysis timed out")), 30000)
  );

  try {
    const prompt = `
    TARGET URL: ${url}

    MISSION:
    Perform a ruthless "COOLO Brand Reality Check". You are the COOLO Brand Strategist. You do not give generic advice. You provide a "Reality Check." Audit the provided profile based on these 5 Pillars derived from the COOLO philosophy:
    
    RESEARCH STEPS (Use Google Search):
    1.  **VISUALS & VIBE**: Look for descriptions of their website design, logo, colors, and imagery. Search for "reviews" or "features" that might describe the look. READ ALT TEXT or Captions if available in snippets.
    2.  **VOICE & BIO**: Analyze their Headline, "About Us" snippets, and Social Media bios.
    3.  **consistency**: Do the visuals (inferred) match the words?

    OUTPUT:
    * Be direct. No fluff.
    * If it sucks, say "This looks like a bad mixtape."
    * If it's good, say "This implies truth."
    * End with 3 "Hard Questions" the user needs to answer.
    Return a single JSON object.
    Do not include markdown formatting like \`\`\`json.
    
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

    const fetchAudit = async () => {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: [{ googleSearch: {} }], // Search grounding enabled
          responseMimeType: "application/json",
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from Gemini");
      
      const raw = JSON.parse(text);
      const pillars = Array.isArray(raw.pillars) ? raw.pillars : [];

      // CALCULATE SCORE PROGRAMMATICALLY FOR CONSISTENCY
      let calculatedTotal = 0;
      let validPillarCount = 0;
      
      pillars.forEach((p: any) => {
        const score = Number(p.score) || 0;
        calculatedTotal += score;
        if (score > 0) validPillarCount++;
      });

      // Avoid divide by zero
      const finalAverage = validPillarCount > 0 
        ? Number((calculatedTotal / validPillarCount).toFixed(1)) 
        : 0;

      // Validate and Sanitize Response
      const safeResult: AuditResult = {
        totalScore: finalAverage,
        verdict: typeof raw.verdict === 'string' ? raw.verdict : "Analysis Incomplete",
        pillars: pillars,
        hardQuestions: Array.isArray(raw.hardQuestions) ? raw.hardQuestions : []
      };

      // Ensure we have exactly 5 pillars if possible, or handle empty
      if (safeResult.pillars.length === 0) {
        safeResult.pillars = [
            { pillar: "C", name: "CLARITY", score: 0, critique: "Data missing." },
            { pillar: "O", name: "ORIGIN", score: 0, critique: "Data missing." },
            { pillar: "O", name: "ONE VOICE", score: 0, critique: "Data missing." },
            { pillar: "L", name: "LONGEVITY", score: 0, critique: "Data missing." },
            { pillar: "O", name: "OUTCOME", score: 0, critique: "Data missing." }
        ];
      }

      return safeResult;
    };

    // Race between the fetch and the timeout
    return await Promise.race([fetchAudit(), timeout]);

  } catch (error) {
    console.error("Gemini Audit Failed:", error);
    // Return graceful error state instead of crashing
    return {
        totalScore: 0,
        verdict: "CONNECTION FAILURE",
        pillars: [
          { pillar: "E", name: "ERROR", score: 0, critique: "Could not complete the audit." },
          { pillar: "R", name: "RETRY", score: 0, critique: "Please check the URL and try again." },
          { pillar: "R", name: "REFRESH", score: 0, critique: "System overloaded." },
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Internet connection may be unstable." },
          { pillar: "R", name: "REPORT", score: 0, critique: "If this persists, contact support." }
        ],
        hardQuestions: [
          "Is the URL correct?",
          "Is the site accessible publicly?",
          "Are you online?"
        ]
    };
  }
};