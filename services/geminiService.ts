import { GoogleGenerativeAI } from "@google/generative-ai";
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
  // CORRECT WAY TO ACCESS VITE ENV VARIABLES
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("CRITICAL: No API Key found in environment variables.");
    return {
      totalScore: 0,
      verdict: "CONFIGURATION ERROR",
      pillars: [
        { pillar: "E", name: "MISSING KEY", score: 0, critique: "The VITE_GEMINI_API_KEY is missing." },
        { pillar: "R", name: "REQUIRED", score: 0, critique: "Add the API key to your Vercel Environment Variables." },
        { pillar: "R", name: "REBUILD", score: 0, critique: "Redeploy the project after adding the key." },
        { pillar: "O", name: "OFFLINE", score: 0, critique: "The AI engine cannot connect." },
        { pillar: "R", name: "RETRY", score: 0, critique: "Check Vercel Settings > Environment Variables." }
      ],
      hardQuestions: ["Is the Key starting with 'AIza'?", "Is it named VITE_GEMINI_API_KEY?", "Did you Redeploy?"]
    };
  }

  // Initialize the Web-Compatible SDK
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 45s Timeout
  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error("Analysis timed out")), 45000)
  );

  try {
    const prompt = `
    TARGET URL: ${url}

    MISSION:
    Perform a ruthless "COOLO Brand Reality Check" on this URL.
    Since you cannot browse live, infer the brand strategy from the URL structure and common brand patterns for this type of domain.
    
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

    const fetchAudit = async () => {
      const result = await model.generateContent([
        SYSTEM_PROMPT, 
        prompt
      ]);
      
      const response = await result.response;
      const text = response.text();
      
      // Clean up markdown formatting if present (e.g. ```json ... ```)
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let raw;
      try {
        raw = JSON.parse(cleanedText);
      } catch (e) {
        console.error("JSON Parse Error. Received:", text);
        throw new Error("Failed to parse AI response.");
      }

      const pillars = Array.isArray(raw.pillars) ? raw.pillars : [];

      // Calculate Score
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

      // Fallback if AI hallucinates empty data
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

  } catch (error: any) {
    console.error("Gemini Audit Failed:", error);
    
    // Friendly error messaging
    let errorMessage = "Could not complete the audit.";
    if (error.message?.includes("API key")) errorMessage = "Invalid API Key detected.";
    if (error.message?.includes("fetch")) errorMessage = "Browser blocked the connection.";
    
    return {
        totalScore: 0,
        verdict: "CONNECTION FAILURE",
        pillars: [
          { pillar: "E", name: "ERROR", score: 0, critique: errorMessage },
          { pillar: "R", name: "RETRY", score: 0, critique: "Please check the URL and try again." },
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check your internet connection." },
          { pillar: "R", name: "REFRESH", score: 0, critique: "System overloaded." },
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