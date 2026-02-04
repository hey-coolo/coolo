import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ScanningOverlay from '../components/ScanningOverlay';
import AuditDashboard from '../components/AuditDashboard';
import { runBrandAudit } from '../services/geminiService';
import { AuditResult } from '../types';

const AuditPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleRunCheck = async () => {
    if (!url.trim()) return;
    setStatus('scanning');
    
    // Call the AI Service
    try {
        const data = await runBrandAudit(url);
        setResult(data);
        setStatus('results');
    } catch (e) {
        alert("Audit failed. Please check the URL and try again.");
        setStatus('idle');
    }
  };

  const handleReset = () => {
    setUrl('');
    setResult(null);
    setStatus('idle');
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <Header />
          
          {/* --- STATE 1: INPUT --- */}
          {status === 'idle' && (
            <div className="max-w-4xl mx-auto pt-24">
                <div className="bg-white border-2 border-brand-navy p-8 md:p-16 shadow-[12px_12px_0px_0px_#0F0328]">
                <div className="mb-12 border-b border-brand-navy/10 pb-8">
                    <span className="font-mono text-brand-purple text-xs font-black uppercase tracking-widest block mb-4">
                    Free Tool 01 / AI Powered
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.9]">
                    Brand Reality<br/><span className="text-brand-purple italic">Check.</span>
                    </h1>
                    <p className="mt-8 font-body text-xl text-brand-navy/60 max-w-2xl leading-relaxed">
                    Don't guess. Measure. Drop your web or socials link below. Our <strong>AI</strong> engine will analyze your digital footprint and give you a raw COOLO Score™ based on visual and strategic integrity.
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
                <div className="mt-8 text-center md:text-left">
                    <p className="font-mono text-[9px] text-brand-navy/40 uppercase tracking-widest leading-relaxed">
                        *COOLO USES GEMINI 2.0 SEARCH GROUNDING TO ANALYZE YOUR TEXT, META TAGS, AND INFER VISUALS FROM LIVE DATA.<br/>
                        RESULTS MAY HURT YOUR FEELINGS.
                    </p>
                </div>
                </div>
            </div>
          )}

          {/* --- STATE 2: SCANNING --- */}
          {status === 'scanning' && (
            <ScanningOverlay />
          )}

          {/* --- STATE 3: RESULTS --- */}
          {status === 'results' && result && (
            <AuditDashboard result={result} onReset={handleReset} />
          )}

          <Footer />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AuditPage;