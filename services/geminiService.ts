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
  try {
    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Audit request failed');
    }

    const data: AuditResult = await response.json();
    return data;

  } catch (error: any) {
    console.error("Audit Service Error:", error);
    
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
  }
};