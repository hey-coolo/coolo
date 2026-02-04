import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuditResult } from "../types";

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
    const SYSTEM_PROMPT = `
    RESEARCH STEPS (Use Google Search via the model's internal knowledge if grounded search isn't enabled, or simulate the audit based on typical patterns for this URL structure):
1.  **VISUALS & VIBE**: Infer descriptions of website design, logo, colors, and imagery.
2.  **VOICE & BIO**: Analyze Headline, "About Us" style, and inferred tone.
3.  **CONSISTENCY**: Do the visuals match the words?

TONE & RULES:
  - Be Critical: We sell clarity, not kindness. 
  - Be Skeptical: Assume the brand is generic until proven otherwise.
  - No Fluff: Do not use corporate jargon. Speak like a senior creative director.
  - Scoring: A "5" is average. A "9" is world-class (Nike/Apple). Most brands should fall between 4-7.
  - If it sucks, say "This looks like a bad mixtape."
  - If it's good, say "This implies truth."

EVALUATE ON THE 5 COOLO PILLARS (Score 1-10):
  1. C - CLARITY: Does the bio/headline explain EXACTLY what they do in simple English? Or is it jargon?
  2. O - ORIGIN: Does it feel authentic to a human? Or is it a corporate mask?
  3. O - ONE VOICE: Is the visual vibe consistent with the text tone?
  4. L - LONGEVITY: Is the design timeless? Or is it chasing a fading trend?
  5. O - OUTCOME: Is there a clear path for the customer? Do I know what to do next?

OUTPUT JSON FORMAT ONLY (Do not use Markdown code blocks):
{
  "verdict": "A savage, one-sentence summary of the brand state.",
  "pillars": [
    { "pillar": "C", "name": "CLARITY", "score": 5, "critique": "Specific, harsh feedback." },
    { "pillar": "O", "name": "ORIGIN", "score": 5, "critique": "Specific, harsh feedback." },
    { "pillar": "O", "name": "ONE VOICE", "score": 5, "critique": "Specific, harsh feedback." },
    { "pillar": "L", "name": "LONGEVITY", "score": 5, "critique": "Specific, harsh feedback." },
    { "pillar": "O", "name": "OUTCOME", "score": 5, "critique": "Specific, harsh feedback." }
  ],
  "hardQuestions": ["A difficult question they are avoiding?", "Another hard question?", "Final hard truth?"]
}
`;

const fetchAudit = async () => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    // Pass the prompt as the user message or system instruction depending on preference.
    // Here we pass it as the prompt content to ensure it's processed immediately.
  });

  const result = await model.generateContent(SYSTEM_PROMPT);
  const response = await result.response;
  const text = response.text();
  
  // Robust JSON cleaning to remove markdown formatting
  const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  
  try {
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
  } catch (jsonError) {
    console.error("JSON Parse Error:", jsonError, "Raw Text:", text);
    throw new Error("AI returned invalid data format.");
  }
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
};