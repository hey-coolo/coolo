import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { BRAND_CLARITY_TIERS, FREE_RESOURCES } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Resource } from '../types';

const ClarityPage: React.FC = () => {
  const [selectedRes, setSelectedRes] = useState<Resource | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'sent' | 'error'>('idle');
  const navigate = useNavigate();

  const handleAction = (res: Resource) => {
    // FIX: Navigates to app for ID 01, otherwise opens modal
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
    <div className="bg-brand-offwhite pt-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-4">Phase 01 / The Logic</span>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
              No Magic<br/><span className="text-brand-purple italic">Formula™</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              We don’t invent your brand. 
              We help you reveal it.
              <br/><span className="text-brand-navy/40 not-italic text-xl mt-4 block font-normal">
              Stop chasing trends. The answer isn't a new logo—it's the truth. You already have a great brand, it's just buried under bad habits. We help you find it.
              </span>
            </p>
          </header>
        </AnimatedSection>

        {/* FREE GAME SECTION */}
        <section className="py-24 border-t-2 border-brand-navy mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-4 block">The Reality Check</span>
                    <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-brand-navy">Free<br/>Game.</h2>
                    <p className="mt-8 font-body text-xl text-brand-navy/60 leading-relaxed">
                        You think your branding is fine. Your customers might think it’s a mess. Use these free tools to check your pulse before you spend a dime.
                    </p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {FREE_RESOURCES.map((res, i) => (
                        <AnimatedSection key={res.id} delay={i * 100} className="h-full">
                            <button 
                                onClick={() => handleAction(res)}
                                className="group w-full text-left border border-brand-navy/10 p-8 h-full bg-white hover:bg-brand-navy transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl"
                            >
                                <span className="font-mono text-xs uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow font-bold mb-4 block">Tool 0{res.id}</span>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-brand-offwhite leading-none">{res.title}</h3>
                                <p className="font-body text-sm text-brand-navy/60 group-hover:text-brand-offwhite/60 mb-8">{res.desc}</p>
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-navy/5 w-full group-hover:border-brand-offwhite/10">
                                    <span className="font-mono text-[10px] uppercase font-bold text-brand-navy group-hover:text-brand-offwhite">{res.format}</span>
                                    <span className="font-mono text-[10px] uppercase font-bold text-brand-purple group-hover:text-brand-yellow underline decoration-2 underline-offset-4">
                                        {res.id === '01' ? 'Launch' : 'Get it'} &rarr;
                                    </span>
                                </div>
                            </button>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>

        {/* CORE TIERS */}
        <section className="pb-48 grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRAND_CLARITY_TIERS.map((tier, i) => (
                <AnimatedSection key={tier.name} delay={i * 100}>
                    <Link to={`/clarity/${tier.slug}`} className="block border-2 border-brand-navy p-12 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 h-full group relative overflow-hidden bg-white shadow-[12px_12px_0px_0px_#0F0328] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple group-hover:text-brand-yellow">{tier.subtitle}</span>
                                    <span className="font-mono text-[10px] uppercase font-black px-2 py-1 bg-brand-navy/5 group-hover:bg-brand-offwhite/10 group-hover:text-brand-yellow">Talk to us</span>
                                </div>
                                <h3 className="text-5xl font-black uppercase leading-none tracking-tight mb-6">{tier.name}</h3>
                                <p className="font-body text-xl text-brand-navy/60 group-hover:text-brand-offwhite/70 transition-colors leading-relaxed">
                                    {tier.desc}
                                </p>
                                <ul className="mt-8 space-y-2 border-t border-brand-navy/10 pt-8 group-hover:border-brand-offwhite/20">
                                    {tier.features.slice(0, 3).map(f => (
                                        <li key={f} className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 bg-brand-purple group-hover:bg-brand-yellow"></span> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 flex items-center gap-4">
                                <span className="font-mono text-sm uppercase font-bold tracking-widest">Explore Tier</span>
                                <div className="w-12 h-[2px] bg-brand-navy group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500"></div>
                            </div>
                        </div>
                    </Link>
                </AnimatedSection>
            ))}
        </section>
        
        {/* THE RESULT */}
        <section className="pb-32 border-t border-brand-navy/10 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <h3 className="text-4xl font-black uppercase text-brand-navy tracking-tight italic">The Outcome.</h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { t: "No More Guessing", d: "You stop wondering 'does this look right?' and start knowing 'this works'." },
                        { t: "Human Connection", d: "We skip the corporate personas. We talk to real people about real needs." },
                        { t: "One Clear Voice", d: "Your website, your emails, and your sales deck finally sound like the same person." },
                        { t: "A Real Plan", d: "A 90-day roadmap you can actually follow without burning out." }
                    ].map(o => (
                        <div key={o.t}>
                            <h4 className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-2">{o.t}</h4>
                            <p className="font-body text-xl text-brand-navy/80">{o.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedRes && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/95 backdrop-blur-sm p-4" onClick={() => setSelectedRes(null)}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-brand-offwhite p-8 md:p-12 max-w-lg w-full relative border-2 border-brand-yellow shadow-[20px_20px_0px_0px_#3A0888]" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedRes(null)} className="absolute top-4 right-4 text-brand-navy font-mono text-xl hover:rotate-90 transition-transform">✕</button>
                    <div className="mb-8">
                        <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold block mb-2">Free Goods</span>
                        <h3 className="text-4xl font-black uppercase tracking-tight text-brand-navy leading-none">Grab the<br/>{selectedRes.title}</h3>
                    </div>
                    {status === 'sent' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-brand-yellow text-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📬</div>
                            <h4 className="text-2xl font-bold uppercase text-brand-navy mb-2">Check your inbox.</h4>
                            <p className="font-body text-brand-navy/70">We've just sent the link to <strong>{email}</strong>. Check your spam if it's missing.</p>
                            <button onClick={() => setSelectedRes(null)} className="mt-8 font-mono text-xs uppercase tracking-widest border-b border-brand-navy pb-1">Back to site</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="space-y-6">
                            <p className="font-body text-brand-navy/70 leading-relaxed">Where should we send the file?</p>
                            <input 
                                type="email" required placeholder="YOUR@EMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-brand-navy/5 border-b-2 border-brand-navy/20 p-4 font-mono text-sm focus:outline-none focus:border-brand-purple transition-colors placeholder-brand-navy/30 text-brand-navy"
                            />
                            <button type="submit" disabled={status === 'processing'} className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-bold py-4 hover:bg-brand-purple transition-all disabled:opacity-50">
                                {status === 'processing' ? 'Sending...' : 'Send it to me'}
                            </button>
                            {status === 'error' && <p className="text-red-500 font-mono text-[10px] text-center">Something went wrong. Try again?</p>}
                            <p className="text-center font-mono text-[9px] uppercase text-brand-navy/30 tracking-tighter">Joining the crew. No spam, just value.</p>
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