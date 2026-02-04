import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import ScanningOverlay from '../../components/ScanningOverlay';
import AuditDashboard from '../../components/AuditDashboard';
import { runBrandAudit } from '../../services/geminiService';
import { AuditResult, AuditState } from '../../types';

const RealityCheckApp: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<AuditState>(AuditState.IDLE);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleRunCheck = async () => {
    if (!url.trim()) return;
    
    // 1. Start Scanning
    setStatus(AuditState.ANALYZING);
    
    // 2. Run Audit (The service now handles ALL errors and returns a valid object)
    const data = await runBrandAudit(url);
    
    // 3. Show Results (Success or Failure)
    setResult(data);
    setStatus(AuditState.RESULTS);
  };

  const handleReset = () => {
    setUrl('');
    setResult(null);
    setStatus(AuditState.IDLE);
  };

  return (
    <div className="pt-32 pb-32 w-full min-h-screen">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          
          {/* --- STATE 1: INPUT --- */}
          {status === AuditState.IDLE && (
            <div className="max-w-4xl mx-auto pt-12">
                <div className="bg-white border-2 border-brand-navy p-8 md:p-16 shadow-[12px_12px_0px_0px_#0F0328]">
                <div className="mb-12 border-b border-brand-navy/10 pb-8">
                    <span className="font-mono text-brand-purple text-xs font-black uppercase tracking-widest block mb-4">
                    Tool 01 / Live Search Grounding
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.9]">
                    Brand Reality<br/><span className="text-brand-purple italic">Check.</span>
                    </h1>
                    <p className="mt-8 font-body text-xl text-brand-navy/60 max-w-2xl leading-relaxed">
                    Don't guess. Measure. Drop your link below. Our AI engine (Gemini 2.0) will analyze your digital footprint using live search grounding.
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-yellow rounded opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                    <div className="relative flex flex-col md:flex-row gap-4 bg-white p-2 border border-brand-navy/10">
                    <input 
                        type="text" 
                        placeholder="https://www.yourbrand.com" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRunCheck()}
                        className="flex-grow bg-brand-navy/5 border-2 border-brand-navy/10 p-6 font-mono text-xl text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:border-brand-purple transition-all"
                    />
                    <button 
                        onClick={handleRunCheck}
                        disabled={!url}
                        className="bg-brand-navy text-brand-offwhite font-mono font-black uppercase tracking-widest px-10 py-6 hover:bg-brand-purple transition-all shadow-xl hover:shadow-none hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Run Scan
                    </button>
                    </div>
                </div>
                
                <div className="mt-8">
                    <p className="font-mono text-[9px] text-brand-navy/40 uppercase tracking-widest">
                        * RESULTS MAY HURT YOUR FEELINGS.
                    </p>
                </div>
                </div>
            </div>
          )}

          {/* --- STATE 2: SCANNING --- */}
          {(status === AuditState.SCANNING || status === AuditState.ANALYZING) && (
            <ScanningOverlay status="PROCESSING" />
          )}

          {/* --- STATE 3: RESULTS (RENDERED BY DASHBOARD) --- */}
          {status === AuditState.RESULTS && result && (
            <AuditDashboard result={result} onReset={handleReset} />
          )}

        </AnimatedSection>
      </div>
    </div>
  );
};

export default RealityCheckApp;