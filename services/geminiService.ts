import { AuditResult } from "../types";

export const runBrandAudit = async (url: string): Promise<AuditResult> => {
  try {
    // 1. Call our own internal API (Bypasses AdBlockers & CORS)
    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || 'Server error');
    }

    // 2. Map the raw data to our types
    const pillars = Array.isArray(data.pillars) ? data.pillars : [];
    
    // Calculate Average Score
    let total = 0;
    let count = 0;
    pillars.forEach((p: any) => {
      if (Number(p.score) > 0) {
        total += Number(p.score);
        count++;
      }
    });
    
    const finalScore = count > 0 ? Number((total / count).toFixed(1)) : 0;

    return {
      totalScore: finalScore,
      verdict: data.verdict || "Analysis Complete",
      pillars: pillars,
      hardQuestions: data.hardQuestions || []
    };

  } catch (error: any) {
    console.error("Audit Service Error:", error);
    
    // Fallback Result for UI
    return {
        totalScore: 0,
        verdict: "SYSTEM OVERLOAD",
        pillars: [
          { pillar: "E", name: "ERROR", score: 0, critique: "The connection was blocked or timed out." },
          { pillar: "R", name: "RETRY", score: 0, critique: "Try refreshing the page." },
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check your internet connection." },
          { pillar: "L", name: "LOGS", score: 0, critique: error.message || "Unknown error" },
          { pillar: "R", name: "REPORT", score: 0, critique: "Contact hey@coolo.co.nz if this persists." }
        ],
        hardQuestions: [
          "Is the URL correct?",
          "Are you online?",
          "Did the server wake up?"
        ]
    };
  }
};