import { GoogleGenAI } from "@google/genai";
import { AuditResult } from "../types";

const SYSTEM_PROMPT = `
You are the COOLO Brand Strategist. Audit the provided website profile based on:
1. C-CLARITY, 2. O-ORIGIN, 3. O-ONE VOICE, 4. L-LONGEVITY, 5. O-OUTCOME.
Return JSON ONLY. Structure: { verdict: string, pillars: [{ pillar: string, name: string, score: number, critique: string }], hardQuestions: string[] }
`;

export const runBrandAudit = async (url: string): Promise<AuditResult> => {
  // Pull from Vercel Environment Variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) throw new Error("API Key Missing");

  const genAI = new GoogleGenAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Perform a COOLO Brand Reality Check for: ${url}. Be direct and ruthless.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: SYSTEM_PROMPT,
    });
    
    const response = await result.response;
    const text = response.text().replace(/```json|```/gi, "").trim();
    const data = JSON.parse(text);

    let total = 0;
    data.pillars.forEach((p: any) => total += p.score);

    return {
      ...data,
      totalScore: Number((total / 5).toFixed(1))
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};