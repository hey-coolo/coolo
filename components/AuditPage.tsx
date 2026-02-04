import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { runBrandAudit, AuditResult } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const AuditPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const data = await runBrandAudit(url);
      setResult(data);
    } catch (err) {
      alert("Calibration failed. Check your URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-brand-offwhite selection:bg-brand-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-8 pt-48 pb-32">
        <AnimatedSection>
          {!result ? (
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-8 block">Internal Tool / Reality Check</span>
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
                Audit Your<br/><span className="text-transparent" style={{ WebkitTextStroke: '2px #F7F7F7' }}>Signal.</span>
              </h1>
              
              <form onSubmit={handleAudit} className="max-w-2xl mx-auto">
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="ENTER_BRAND_URL.COM"
                  className="w-full bg-transparent border-b-2 border-brand-offwhite/20 py-6 font-mono text-2xl md:text-4xl text-center focus:outline-none focus:border-brand-purple transition-colors mb-12"
                />
                <button 
                  disabled={loading}
                  className="bg-brand-offwhite text-brand-dark px-12 py-6 font-mono font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-all disabled:opacity-50"
                >
                  {loading ? 'CALIBRATING...' : 'RUN REALITY CHECK'}
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-brand-offwhite pb-8 mb-12 gap-8">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">{result.verdict}</h2>
                        <p className="font-mono text-brand-purple uppercase tracking-widest mt-4">Automated Strategic Analysis</p>
                    </div>
                    <div className="text-right">
                        <span className="font-mono text-xs opacity-50 block mb-2">OVERALL_RATING</span>
                        <span className="text-8xl font-black">{result.totalScore}<span className="text-2xl opacity-30">/10</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 border border-brand-offwhite/20">
                    {result.pillars.map((p) => (
                        <div key={p.name} className="p-8 border-r border-brand-offwhite/20 last:border-0 hover:bg-brand-offwhite hover:text-brand-dark transition-all group">
                            <span className="text-5xl font-black opacity-10 group-hover:opacity-100 mb-8 block">{p.pillar}</span>
                            <h4 className="font-mono text-xs font-bold uppercase border-b border-current pb-2 mb-4">{p.name}</h4>
                            <p className="text-sm font-medium leading-relaxed">{p.critique}</p>
                            <div className="mt-8 font-mono text-xl font-bold">[{p.score}]</div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-brand-purple font-black">Hard Questions</h3>
                        {result.hardQuestions.map((q, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <span className="font-mono text-xs border border-brand-offwhite/30 rounded-full w-6 h-6 flex items-center justify-center shrink-0">{i+1}</span>
                                <p className="text-2xl font-bold uppercase leading-tight italic">"{q}"</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-brand-offwhite/5 p-12 border border-brand-offwhite/10 text-center">
                        <p className="font-mono text-xs opacity-50 mb-4">SCORE BELOW 8.0?</p>
                        <h4 className="text-4xl font-black uppercase mb-8">Stop Guessing.<br/>Start Revealing.</h4>
                        <button onClick={() => setResult(null)} className="font-mono text-xs uppercase underline tracking-widest">Run Another Audit</button>
                    </div>
                </div>
            </div>
          )}
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default AuditPage;