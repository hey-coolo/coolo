import { GoogleGenAI } from "@google/genai";
import { AuditResult } from "../types";

// COOLO STRATEGY PROMPT
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
    console.warn("No API Key found. Returning mock data.");
    return mockAudit();
  }

  const ai = new GoogleGenAI({ apiKey });

  // Timeout promise to prevent infinite loading
  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error("Analysis timed out")), 45000)
  );

  try {
    const prompt = `
    TARGET URL: ${url}

    MISSION:
    Perform a ruthless "COOLO Brand Reality Check".
    
    RESEARCH STEPS (Use Google Search):
    1.  **VISUALS & VIBE**: Look for descriptions of their website design, logo, colors, and imagery. Search for "reviews" or "features" that might describe the look. READ ALT TEXT or Captions if available in snippets.
    2.  **VOICE & BIO**: Analyze their Headline, "About Us" snippets, and Social Media bios.
    3.  **CONSISTENCY**: Do the visuals (inferred) match the words?

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
        model: "gemini-2.0-flash-exp", // Updated to latest flash model
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

      const safeResult: AuditResult = {
        totalScore: finalAverage,
        verdict: typeof raw.verdict === 'string' ? raw.verdict : "Analysis Incomplete",
        pillars: pillars,
        hardQuestions: Array.isArray(raw.hardQuestions) ? raw.hardQuestions : []
      };

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
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check your internet connection." },
          { pillar: "R", name: "REPORT", score: 0, critique: "If this persists, contact hey@coolo.co.nz." }
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
        verdict: "DEMO MODE (NO API KEY)",
        pillars: [
            { pillar: "C", name: "CLARITY", score: 3, critique: "This is a mock result. You need to add VITE_GEMINI_API_KEY to your .env file." },
            { pillar: "O", name: "ORIGIN", score: 5, critique: "Generic mock data detected." },
            { pillar: "O", name: "ONE VOICE", score: 4, critique: "Visuals are undefined." },
            { pillar: "L", name: "LONGEVITY", score: 2, critique: "Trends will fade." },
            { pillar: "O", name: "OUTCOME", score: 7, critique: "The outcome is to fix the code." }
        ],
        hardQuestions: ["Where is the API Key?", "Is it in the .env file?", "Did you restart the server?"]
      });
    }, 2000);
  });
};import { GoogleGenAI } from "@google/genai";
import { AuditResult } from "../types";

// COOLO STRATEGY PROMPT
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
    console.warn("No API Key found. Returning mock data.");
    return mockAudit();
  }

  const ai = new GoogleGenAI({ apiKey });

  // Timeout promise to prevent infinite loading
  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error("Analysis timed out")), 45000)
  );

  try {
    const prompt = `
    TARGET URL: ${url}

    MISSION:
    Perform a ruthless "COOLO Brand Reality Check".
    
    RESEARCH STEPS (Use Google Search):
    1.  **VISUALS & VIBE**: Look for descriptions of their website design, logo, colors, and imagery. Search for "reviews" or "features" that might describe the look. READ ALT TEXT or Captions if available in snippets.
    2.  **VOICE & BIO**: Analyze their Headline, "About Us" snippets, and Social Media bios.
    3.  **CONSISTENCY**: Do the visuals (inferred) match the words?

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
        model: "gemini-2.0-flash-exp", // Updated to latest flash model
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

      const safeResult: AuditResult = {
        totalScore: finalAverage,
        verdict: typeof raw.verdict === 'string' ? raw.verdict : "Analysis Incomplete",
        pillars: pillars,
        hardQuestions: Array.isArray(raw.hardQuestions) ? raw.hardQuestions : []
      };

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
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check your internet connection." },
          { pillar: "R", name: "REPORT", score: 0, critique: "If this persists, contact hey@coolo.co.nz." }
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
        verdict: "DEMO MODE (NO API KEY)",
        pillars: [
            { pillar: "C", name: "CLARITY", score: 3, critique: "This is a mock result. You need to add VITE_GEMINI_API_KEY to your .env file." },
            { pillar: "O", name: "ORIGIN", score: 5, critique: "Generic mock data detected." },
            { pillar: "O", name: "ONE VOICE", score: 4, critique: "Visuals are undefined." },
            { pillar: "L", name: "LONGEVITY", score: 2, critique: "Trends will fade." },
            { pillar: "O", name: "OUTCOME", score: 7, critique: "The outcome is to fix the code." }
        ],
        hardQuestions: ["Where is the API Key?", "Is it in the .env file?", "Did you restart the server?"]
      });
    }, 2000);
  });
};