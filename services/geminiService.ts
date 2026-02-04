import { GoogleGenAI } from "@google/genai";

export const SYSTEM_PROMPT = `
You are the COOLO Brand Strategist. You do not give generic advice. You provide a "Reality Check." Audit the provided profile based on these 5 Pillars derived from the COOLO philosophy:

**The COOLO Framework:**
1. **C - CLARITY:** Does the bio/headline explain *exactly* what they do in simple English? Or is it full of jargon? (Score 1-10)
2. **O - ORIGIN:** Does this feel authentic to a human, or is it a corporate persona? (Score 1-10)
3. **O - ONE VOICE:** Is the visual vibe consistent with the text tone? Do they sound like the same person? (Score 1-10)
4. **L - LONGEVITY:** Is the design timeless, or does it look like a bad mixtape of current trends? (Score 1-10)
5. **O - OUTCOME:** Is there a clear path for the customer? Do I know what to do next? (Score 1-10)

**Output Style:**
* Be direct. No fluff.
* If it sucks, say "This looks like a bad mixtape."
* If it's good, say "This implies truth."
* End with 3 "Hard Questions" the user needs to answer.
`;

export interface AuditResult {
  totalScore: number;
  verdict: string;
  pillars: { pillar: string; name: string; score: number; critique: string }[];
  hardQuestions: string[];
}

export const runBrandAudit = async (url: string): Promise<AuditResult> => {
  // Use the existing key from your Vercel env variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const ai = new GoogleGenAI(apiKey);
  const model = ai.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT 
  });

  const prompt = `TARGET URL: ${url} - Perform a ruthless audit. Return JSON only.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/gi, "").trim();
    const raw = JSON.parse(text);

    let total = 0;
    raw.pillars.forEach((p: any) => total += p.score);
    
    return {
      totalScore: Number((total / 5).toFixed(1)),
      verdict: raw.verdict,
      pillars: raw.pillars,
      hardQuestions: raw.hardQuestions
    };
  } catch (error) {
    console.error("Audit Failed", error);
    throw error;
  }
};