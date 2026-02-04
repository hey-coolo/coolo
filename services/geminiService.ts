import { AuditResult } from "../types";

export const runBrandAudit = async (url: string): Promise<AuditResult> => {
  try {
    // 1. Call our own internal API
    // This bypasses AdBlockers because it's a same-origin request
    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    // 2. Handle Non-JSON errors (HTML error pages from Vercel)
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
       const text = await response.text();
       console.error("API Returned Non-JSON:", text);
       throw new Error("Server returned an HTML error page. Check Vercel Logs.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || 'Server error');
    }

    // 3. Process Data
    const pillars = Array.isArray(data.pillars) ? data.pillars : [];
    
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
    
    return {
        totalScore: 0,
        verdict: "SYSTEM OVERLOAD",
        pillars: [
          { pillar: "E", name: "ERROR", score: 0, critique: "Connection failed." },
          { pillar: "R", name: "RETRY", score: 0, critique: "Try refreshing the page." },
          { pillar: "O", name: "OFFLINE", score: 0, critique: "Check internet or AdBlocker." },
          { pillar: "L", name: "LOGS", score: 0, critique: error.message || "Unknown error" },
          { pillar: "R", name: "REPORT", score: 0, critique: "Contact hey@coolo.co.nz." }
        ],
        hardQuestions: ["Is the URL correct?", "Are you online?", "Is the API Key valid?"]
    };
  }
};