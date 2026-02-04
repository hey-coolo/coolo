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