import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ScanningOverlay from '../components/ScanningOverlay';
import AuditDashboard from '../components/AuditDashboard';
import { AuditResult, AuditState } from '../types';
import { runBrandAudit } from '../services/geminiService';

const AuditPage: React.FC = () => {
  const [appState, setAppState] = useState<AuditState>(AuditState.IDLE);
  const [url, setUrl] = useState('');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const handleRunCheck = async () => {
    if (!url.trim()) return;

    setAppState(AuditState.ANALYZING);
    
    try {
      const result = await runBrandAudit(url);
      setAuditResult(result);
      setAppState(AuditState.RESULTS);
    } catch (error) {
      alert("Audit Failed. Please check the URL or try again later.");
      setAppState(AuditState.IDLE);
    }
  };

  const handleReset = () => {
    setUrl('');
    setAuditResult(null);
    setAppState(AuditState.IDLE);
  };

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-navy pt-32 pb-32">
      <div className="container mx-auto px-8">
        {appState === AuditState.IDLE && (
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
              <div className="w-full max-w-3xl text-center">
                <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                    Tool 01 / Reality Check
                </span>
                <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tight leading-[0.85] text-brand-navy mb-12">
                    Audit Your<br/>
                    <span className="text-brand-purple italic">Signal.</span>
                </h1>

                <div className="relative group max-w-2xl mx-auto">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-brand.com"
                    className="w-full bg-transparent border-b-2 border-brand-navy/20 py-4 text-xl md:text-3xl text-center focus:outline-none focus:border-brand-purple transition-colors placeholder-brand-navy/20 font-mono text-brand-navy"
                    onKeyDown={(e) => e.key === 'Enter' && handleRunCheck()}
                  />
                </div>
                
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleRunCheck}
                    disabled={!url}
                    className="bg-brand-navy text-brand-offwhite hover:bg-brand-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all px-12 py-5 font-bold tracking-widest text-sm uppercase shadow-xl"
                  >
                    Run Reality Check
                  </button>
                </div>
                
                 <div className="mt-8 text-[10px] md:text-xs text-center opacity-40 max-w-lg mx-auto leading-relaxed font-mono">
                    *COOLO USES GEMINI AI SEARCH GROUNDING TO ANALYZE YOUR TEXT, META TAGS, AND INFER VISUALS FROM LIVE DATA. 
                    RESULTS MAY HURT YOUR FEELINGS.
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {(appState === AuditState.SCANNING || appState === AuditState.ANALYZING) && (
          <ScanningOverlay status="INITIATING..." />
        )}

        {appState === AuditState.RESULTS && auditResult && (
          <AuditDashboard result={auditResult} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default AuditPage;