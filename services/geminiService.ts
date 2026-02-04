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

**Tone & Style:**
*   **Brutal Honesty:** If the brand is generic, call it "Invisible."
*   **No Fluff:** Do not use corporate speak. Use "Studio/Designer" language.
*   **Evidence-Based:** Cite what you found in search (e.g., "Reviews mention poor service," "Instagram looks inconsistent").
*   **Hard Questions:** End with 3 provocative questions that force the founder to think.
`;

export const runBrandAudit = async (url: string): Promise<AuditResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in environment variables.");
  }

  // Use the standard stable SDK
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Use the stable flash model
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-pro",
    systemInstruction: SYSTEM_PROMPT
  });

  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error("Analysis timed out (45s)")), 45000)
  );

  try {
    const prompt = `
    TARGET URL: ${url}

    MISSION:
    Perform a live, fact-based "COOLO Brand Reality Check" (Deep Strategic Audit).
    This is NOT a creative writing exercise. This is a FACT-BASED audit.

    EXECUTION STEPS (You MUST use the 'googleSearch' tool):
    1.  **CRAWL & VERIFY**: Search for the brand name specifically. Does the URL match a real business?
    2.  **VISUAL & VIBE CHECK**: Search for "site design", "instagram", or "products" for this brand. Do search snippets describe a premium or amateur aesthetic?
    3.  **VOICE & REPUTATION**: Search for "[Brand Name] reviews", "Reddit [Brand Name]", or their social bios. What is the *actual* market sentiment?
    4.  **CONSISTENCY**: Does the promise on their landing page match what people are saying on other platforms?

    SCORING RULES (BRUTAL HONESTY):
    - **Score 5/10** is Average/Invisible.
    - **Score 8+/10** requires EVIDENCE of excellence found in search results.
    - If data is scarce or the brand is invisible, score low on 'Origin' and 'Outcome'.

    OUTPUT FORMAT:
    Return pure JSON matching the schema. No markdown.
    
    Structure:
    {
      "verdict": string (A razor-sharp, 10-15 word summary of the gap between their strategy and reality),
      "pillars": [
        { "pillar": "C", "name": "CLARITY", "score": number (1-10), "critique": "Specific evidence from search..." },
        { "pillar": "O", "name": "ORIGIN", "score": number (1-10), "critique": "Specific evidence..." },
        { "pillar": "O", "name": "ONE VOICE", "score": number (1-10), "critique": "Specific evidence..." },
        { "pillar": "L", "name": "LONGEVITY", "score": number (1-10), "critique": "Specific evidence..." },
        { "pillar": "O", "name": "OUTCOME", "score": number (1-10), "critique": "Specific evidence..." }
      ],
      "hardQuestions": [string, string, string] (3 strategic questions based on the specific weaknesses found)
    }
    `;

    const fetchAudit = async () => {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) throw new Error("Empty response from AI");

      // CLEAN THE RESPONSE: Remove markdown code blocks if present
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let raw;
      try {
        raw = JSON.parse(cleanedText);
      } catch (e) {
        console.error("JSON Parse Error. Raw Text:", text);
        throw new Error("Failed to read AI response. Please try again.");
      }

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

      const safeResult: AuditResult = {
        totalScore: finalAverage,
        verdict: typeof raw.verdict === 'string' ? raw.verdict : "Analysis Incomplete",
        pillars: pillars,
        hardQuestions: Array.isArray(raw.hardQuestions) ? raw.hardQuestions : []
      };

      if (safeResult.pillars.length === 0) {
         // Create empty pillars if missing
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
    // Return a functional error object so the UI shows *something* other than a white screen
    return {
        totalScore: 0,
        verdict: "SYSTEM ERROR",
        pillars: [
          { pillar: "E", name: "ERROR", score: 0, critique: error.message || "Unknown error." },
          { pillar: "R", name: "RETRY", score: 0, critique: "Please check the URL and try again." },
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Connection unstable." },
          { pillar: "X", name: "VOID", score: 0, critique: "Audit failed." },
          { pillar: "X", name: "VOID", score: 0, critique: "Audit failed." }
        ],
        hardQuestions: [
          "Is the URL correct?",
          "Is VITE_GEMINI_API_KEY set?",
          "Are you connected?"
        ]
    };
  }
};