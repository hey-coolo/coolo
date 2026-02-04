import { AuditResult } from "../types";

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
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();
    return data as AuditResult;

  } catch (error) {
    console.error("Audit Service Failed:", error);
    // Return a fallback error object so the UI doesn't crash
    return {
      totalScore: 0,
      verdict: "CONNECTION FAILURE",
      pillars: [
        { pillar: "E", name: "ERROR", score: 0, critique: "Could not connect to Audit Server." },
      ],
      hardQuestions: ["Are you online?", "Is the API configured?"]
    };
  }
};