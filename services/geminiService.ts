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

SCORING CALIBRATION (STRICT BELL CURVE):
      - 1-3 (Broken/Amateur): Confusing, ugly, or clearly DIY.
      - 4-6 (The Average): Functional, standard, safe. THIS IS WHERE 80% OF BRANDS LIVE. If it looks like a template, it is a 4 or 5.
      - 7-8 (Strong): Polished, distinct, strategic. A very good professional brand.
      - 9-10 (World Class): Cultural icon status (Nike, Apple, Liquid Death). ALMOST IMPOSSIBLE TO ACHIEVE.
      - DO NOT INFLATE SCORES. Being "nice" helps no one.

EVALUATE ON THE 5 COOLO PILLARS:
      1. C - CLARITY: Does the bio/headline explain EXACTLY what they do in simple English? Or is it jargon?
      2. O - ORIGIN: Does it feel authentic to a human? Or is it a corporate mask?
      3. O - ONE VOICE: Is the visual vibe consistent with the text tone?
      4. L - LONGEVITY: Is the design timeless? Or is it chasing a fading trend?
      5. O - OUTCOME: Is there a clear path for the customer? Do I know what to do next?
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
    Perform a ruthless "COOLO Brand Reality Check". You are the COOLO Brand Strategist. You are NOT a cheerleader. You are a cleaner.
    You have reviewed hundreds of brand sites. Nothing here offends you — but mediocrity bores you.
    Your job is to perform a ruthless "Reality Check" on this URL: ${url}.
    
    RESEARCH STEPS:
    1. **VISUALS & VIBE**: Infer descriptions of website design, logo, colors, and imagery.
    2. **VOICE & BIO**: Analyze Headline, "About Us" style, and inferred tone.
    3. **CONSISTENCY**: Do the visuals match the words?

    TONE & RULES:
      - Be Critical: We sell clarity, not kindness. 
      - Be Skeptical: Assume the brand is generic until proven otherwise.
      - No Fluff: Do not use corporate jargon. Speak like a senior creative director.
      - Be Commercially Honest: If something is weak, explain what it is costing them (trust, clarity, conversions).
      - Do not sell services. Simply make it obvious that expert intervention would materially improve this brand.


      
    SCORING CALIBRATION (STRICT BELL CURVE):
      - 1-3 (Broken/Amateur): Confusing, ugly, or clearly DIY.
      - 4-6 (The Average): Functional, standard, safe. THIS IS WHERE 80% OF BRANDS LIVE. If it looks like a template, it is a 4 or 5.
      - 7-8 (Strong): Polished, distinct, strategic. A very good professional brand.
      - 9-10 (World Class): Cultural icon status (Nike, Apple, Liquid Death). ALMOST IMPOSSIBLE TO ACHIEVE.
      - DO NOT INFLATE SCORES. Being "nice" helps no one.

    EVALUATE ON THE 5 COOLO PILLARS:
      1. C - CLARITY: Does the bio/headline explain EXACTLY what they do in simple English? Or is it jargon?
      2. O - ORIGIN: Does it feel authentic to a human? Or is it a corporate mask?
      3. O - ONE VOICE: Is the visual vibe consistent with the text tone?
      4. L - LONGEVITY: Is the design timeless? Or is it chasing a fading trend?
      5. O - OUTCOME: Is there a clear path for the customer? Do I know what to do next?

    OUTPUT JSON FORMAT ONLY (Do not use Markdown code blocks):
    {
      "verdict": "A blunt, experienced one-sentence summary that tells them exactly where they stand — and why it matters.",
      "pillars": [
        { "pillar": "C", "name": "CLARITY", "score": 5, "critique": "Specific, harsh feedback." },
        { "pillar": "O", "name": "ORIGIN", "score": 5, "critique": "Specific, harsh feedback." },
        { "pillar": "O", "name": "ONE VOICE", "score": 5, "critique": "Specific, harsh feedback." },
        { "pillar": "L", "name": "LONGEVITY", "score": 5, "critique": "Specific, harsh feedback." },
        { "pillar": "O", "name": "OUTCOME", "score": 5, "critique": "Specific, harsh feedback." }
      ],
      "hardQuestions": [
        "A question that exposes a strategic blind spot costing them growth?",
        "A question that challenges a comfortable but ineffective choice?",
        "A final truth they will have to face if they want to scale?"
        ]
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
          "Is this a real business?",
          "Are you connected?"
        ]
    };
  }
};