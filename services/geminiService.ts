import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { AuditResult } from "../types";

// NOTE: In a real production app with a backend, we would keep the API key on the server.
// Since this is a client-side demo, we rely on the injected process.env.API_KEY.

export const runBrandAudit = async (url: string): Promise<AuditResult> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return mockAudit();
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
    Perform a ruthless "COOLO Brand Reality Check".
    
    RESEARCH STEPS (Use Google Search):
    1.  **VISUALS & VIBE**: Look for descriptions of their website design, logo, colors, and imagery. Search for "reviews" or "features" that might describe the look. READ ALT TEXT or Captions if available in snippets.
    2.  **VOICE & BIO**: Analyze their Headline, "About Us" snippets, and Social Media bios.
    3.  **consistency**: Do the visuals (inferred) match the words?

    OUTPUT:
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
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from Gemini");
      
      const raw = JSON.parse(text);
      const pillars = Array.isArray(raw.pillars) ? raw.pillars : [];

      // CALCULATE SCORE PROGRAMMATICALLY FOR CONSISTENCY
      // We calculate the average of the pillars to get a score out of 10.
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

const mockAudit = (): Promise<AuditResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalScore: 4.2,
        verdict: "DEMO MODE / NO KEY",
        pillars: [],
        hardQuestions: ["Please provide a valid API Key"]
      } as unknown as AuditResult);
    }, 1000);
  });
};
