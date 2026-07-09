import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { BRAND_CLARITY_TIERS, FREE_RESOURCES } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Resource } from '../types';
import { Terminal, Sparkles, Target, ShieldCheck, Eye } from 'lucide-react';

const ClarityPage: React.FC = () => {
  const [selectedRes, setSelectedRes] = useState<Resource | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'sent' | 'error'>('idle');
  const navigate = useNavigate();

  const handleAction = (res: Resource) => {
    if (res.id === '01') {
        navigate('/clarity/reality-check');
    } else {
        setSelectedRes(res);
        setStatus('idle');
        setEmail('');
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedRes) return;
    setStatus('processing');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email, 
            resourceId: selectedRes.id,
            resourceTitle: selectedRes.title,
            downloadLink: selectedRes.link
        })
      });

      if (response.ok) {
        setStatus('sent');
      } else throw new Error();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-navy text-white overflow-hidden studio-grid pt-32">
      <Helmet>
        <title>Brand Strategy & Clarity | COOLO</title>
        <meta name="description" content="We don’t invent your brand. We help you reveal it. Stop chasing trends. Find the truth with our strategy sessions and brand diagnosis sprints." />
      </Helmet>

      {/* Ambient Lighting Background Accents */}
      <div className="absolute top-0 right-0 w-[60vw] h-[50vw] bg-brand-purple/10 blur-[130px] rounded-full pointer-events-none z-0 translate-x-1/4 -translate-y-1/4" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* HEADER SECTION */}
        <AnimatedSection>
          <header className="py-20 md:py-32 max-w-5xl border-b border-white/5 mb-24">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">
              // Phase 01 / The Logic Engine
            </span>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] xl:text-[11rem] font-black uppercase leading-[0.85] tracking-tighter text-white select-text">
              No Magic<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-offwhite to-brand-lavender italic">Formula™.</span>
            </h1>
            <p className="font-body text-xl md:text-2xl font-light text-white/70 mt-10 leading-relaxed max-w-3xl">
              We don’t invent your brand. We help you reveal it. Stop chasing trends. The answer isn't a new logo—it's the truth. You already have a great brand, it's just buried under bad habits. We help you find it.
            </p>
          </header>
        </AnimatedSection>

        {/* FREE GAME / RESOURCES LINK DECK */}
        <section className="py-20 border-b border-white/5 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="inline-flex items-center gap-2 bg-brand-purple/20 border border-brand-purple/40 text-brand-lavender font-mono text-[9px] uppercase font-bold px-3 py-1 mb-4 rounded-full">
                        <Terminal size={10} />
                        <span>TACTICAL MATRIX OVERLAY</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">Free<br/>Game.</h2>
                    <p className="mt-6 font-body text-base font-light text-white/60 leading-relaxed">
                        You think your branding is fine. Your customers might think it’s a mess. Use these free tools to check your pulse before you spend a dime.
                    </p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {FREE_RESOURCES.map((res) => (
                        <AnimatedSection key={res.id} className="h-full">
                            <button 
                                onClick={() => handleAction(res)}
                                className="group w-full text-left border border-white/5 p-8 h-full bg-platform-dark/20 hover:bg-platform-dark/40 rounded-sm transition-all duration-300 flex flex-col justify-between neon-glow-border shadow-xl relative"
                            >
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow font-bold mb-4 block">// Tool 0{res.id}</span>
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white leading-tight">{res.title}</h3>
                                    <p className="font-body text-xs text-white/50 leading-relaxed mb-6">{res.desc}</p>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between w-full mt-auto font-mono text-[10px] uppercase font-bold">
                                    <span className="text-white/40">{res.format}</span>
                                    <span className="text-brand-purple group-hover:text-brand-yellow underline decoration-1 underline-offset-4 transition-colors">
                                        {res.id === '01' ? 'Launch' : 'Get it'} &rarr;
                                    </span>
                                </div>
                            </button>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>

        {/* RESTORED CORE TIERS ROUTING MATRIX */}
        <section className="mb-24">
            <div className="mb-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-purple font-bold block">// STUDIO TIERS SELECTOR</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BRAND_CLARITY_TIERS.map((tier) => (
                    <AnimatedSection key={tier.name}>
                        <Link 
                            to={`/clarity/${tier.slug}`} 
                            className="block border border-white/5 p-10 bg-platform-dark/20 hover:bg-platform-dark/50 rounded-sm transition-all duration-400 group relative overflow-hidden neon-glow-border shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">{tier.subtitle}</span>
                                        <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-2.5 py-0.5 font-mono text-[9px] text-white/40 group-hover:text-white/60">
                                            <Sparkles size={10} />
                                            <span>Active Protocol</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">{tier.name}</h3>
                                    <p className="font-body text-sm font-light text-white/60 group-hover:text-white/70 transition-colors leading-relaxed min-h-[4.5rem]">
                                        {tier.desc}
                                    </p>
                                    <ul className="mt-6 space-y-2 border-t border-white/5 pt-6 font-mono text-[9px] uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-colors">
                                        {tier.features.slice(0, 3).map(f => (
                                            <li key={f} className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-brand-purple group-hover:bg-brand-yellow rounded-full transition-colors"></span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 flex items-center gap-3 font-mono text-xs font-bold text-white/80 group-hover:text-brand-yellow transition-colors">
                                    <span>Explore Tier Scope</span>
                                    <div className="w-8 h-[1px] bg-white/20 group-hover:bg-brand-yellow group-hover:w-16 transition-all duration-400"></div>
                                </div>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </section>
        
        {/* THE OUTCOME SECTION */}
        <section className="py-20 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <h3 className="text-3xl font-black uppercase text-white tracking-tight italic">The Outcome.</h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10 font-mono">
                    {[
                        { t: "// No More Guessing", d: "You stop wondering 'does this look right?' and start knowing 'this works' across target conversion tracks." },
                        { t: "// Human Connection", d: "We skip the corporate personas. We talk directly to real audiences about genuine performance needs." },
                        { t: "// One Clear Voice", d: "Your interface environment, your content channels, and your sales deck finally sound like the same architecture." },
                        { t: "// A Real Plan", d: "A clear 90-day technical roadmap you can map seamlessly without resource burn out." }
                    ].map(o => (
                        <div key={o.t} className="bg-platform-dark/10 border border-white/5 p-6 rounded-xs">
                            <h4 className="text-brand-purple uppercase tracking-widest text-[10px] font-black mb-2">{o.t}</h4>
                            <p className="font-body text-sm font-light text-white/60 leading-relaxed">{o.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </div>

      {/* SYSTEM SUBSCRIPTION MODAL DECK */}
      <AnimatePresence>
        {selectedRes && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-md p-4" onClick={() => setSelectedRes(null)}>
                <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }} className="bg-platform-dark p-8 md:p-12 max-w-md w-full relative border border-white/10 rounded-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedRes(null)} className="absolute top-4 right-4 text-white/40 hover:text-white font-mono text-base transition-colors">✕</button>
                    <div className="mb-6">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-brand-purple font-black block mb-2">// INTEL DISPATCH</span>
                        <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none">Grab the<br/>{selectedRes.title}</h3>
                    </div>
                    {status === 'sent' ? (
                        <div className="text-center py-6">
                            <div className="w-12 h-12 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📬</div>
                            <h4 className="text-xl font-black uppercase text-white mb-2">Check your inbox.</h4>
                            <p className="font-body text-xs text-white/60 leading-relaxed">We've dispatched the source parameters to <strong>{email}</strong>. Check folder filters if missing.</p>
                            <button onClick={() => setSelectedRes(null)} className="mt-6 font-mono text-[10px] uppercase tracking-widest text-brand-purple border-b border-brand-purple pb-0.5">Back to site</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="space-y-4 font-mono text-xs">
                            <p className="font-body text-xs text-white/60 leading-relaxed">Designate secure delivery destination:</p>
                            <input 
                                type="email" required placeholder="SECURE@EMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-brand-navy/60 border border-white/10 p-4 font-mono focus:outline-none focus:border-brand-purple transition-colors placeholder-white/20 text-white rounded-xs"
                            />
                            <button type="submit" disabled={status === 'processing'} className="w-full bg-white hover:bg-brand-purple text-brand-navy hover:text-white font-black uppercase py-4 transition-colors rounded-xs disabled:opacity-50">
                                {status === 'processing' ? 'Processing...' : 'Transmit Link'}
                            </button>
                            {status === 'error' && <p className="text-red-500 text-[10px] text-center uppercase font-bold">Transmission failure. Retry query.</p>}
                            <p className="text-center text-[9px] uppercase text-white/20 tracking-tighter">Syncing payload configuration logs.</p>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClarityPage;