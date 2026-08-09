import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { BRAND_CLARITY_TIERS, FREE_RESOURCES } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Resource } from '../types';
import PageTransition from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';

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
    <PageTransition>
        <div className="bg-brand-offwhite pt-32 pb-32">
        <div className="container mx-auto px-6 md:px-12">
            
            {/* UNIFIED HEADER */}
            <AnimatedSection>
                <header className="py-24 md:py-32 max-w-6xl">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black block mb-8">Phase 01 / The Logic</span>
                    <h1 className="text-brand-navy text-[15vw] md:text-[12vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mt-0 mb-12">
                        No Magic<br/>
                        <span className="text-brand-purple italic">Formula.</span>
                    </h1>
                    <p className="font-body text-2xl md:text-3xl lg:text-4xl text-brand-navy/80 leading-tight max-w-4xl">
                        We don't invent your brand. We help you reveal it.
                    </p>
                    <p className="font-body text-lg md:text-xl text-brand-navy/60 mt-8 max-w-3xl leading-relaxed">
                        Stop chasing trends. The answer isn't a new logo—it's the truth. You already have a great brand, it's just buried under bad habits. We help you find it.
                    </p>
                </header>
            </AnimatedSection>

            {/* FREE GAME SECTION */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">The Reality Check</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            Free<br/>Game.
                        </h2>
                        <p className="mt-8 font-body text-xl text-brand-navy/70 leading-relaxed max-w-sm">
                            You think your branding is fine. Your customers might think it's a mess. Use these free tools to check your pulse before you spend a dime.
                        </p>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FREE_RESOURCES.map((res, i) => (
                            <AnimatedSection key={res.id} delay={i * 100} className="h-full">
                                <button 
                                    onClick={() => handleAction(res)}
                                    className="group w-full text-left border border-brand-navy/20 p-8 h-full bg-white hover:bg-brand-navy transition-colors duration-500 flex flex-col"
                                >
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-purple group-hover:text-brand-yellow font-bold mb-6 block transition-colors">Tool 0{res.id}</span>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-brand-offwhite leading-none transition-colors">{res.title}</h3>
                                    <p className="font-body text-sm text-brand-navy/60 group-hover:text-brand-offwhite/60 mb-12 transition-colors leading-relaxed">{res.desc}</p>
                                    
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-navy/10 group-hover:border-brand-offwhite/20 transition-colors w-full">
                                        <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-brand-navy group-hover:text-brand-offwhite transition-colors">{res.format}</span>
                                        <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-brand-purple group-hover:text-brand-yellow transition-colors flex items-center gap-2">
                                            {res.id === '01' ? 'Launch' : 'Get it'} <ArrowRight size={12} className="stroke-[3]" />
                                        </span>
                                    </div>
                                </button>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORE TIERS */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Engagement Models</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            The Menu.
                        </h2>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {BRAND_CLARITY_TIERS.map((tier, i) => (
                            <AnimatedSection key={tier.name} delay={i * 100} className="h-full">
                                <Link to={`/clarity/${tier.slug}`} className="block border border-brand-navy/20 p-10 hover:bg-brand-navy hover:text-brand-offwhite transition-colors duration-500 h-full group bg-white flex flex-col">
                                    <div className="flex justify-between items-start mb-10">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">{tier.subtitle}</span>
                                        <span className="font-mono text-[9px] uppercase tracking-widest font-black px-3 py-1 bg-brand-navy/5 group-hover:bg-brand-offwhite/10 group-hover:text-brand-yellow transition-colors">Talk to us</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tighter mb-6">{tier.name}</h3>
                                    <p className="font-body text-lg md:text-xl text-brand-navy/60 group-hover:text-brand-offwhite/70 transition-colors leading-relaxed mb-8 flex-grow">
                                        {tier.desc}
                                    </p>
                                    
                                    <ul className="mt-8 space-y-3 border-t border-brand-navy/10 pt-8 group-hover:border-brand-offwhite/20 transition-colors">
                                        {tier.features.slice(0, 3).map(f => (
                                            <li key={f} className="font-mono text-[10px] uppercase tracking-widest font-bold flex items-start gap-3 opacity-80 group-hover:opacity-100">
                                                <span className="w-1.5 h-1.5 bg-brand-purple group-hover:bg-brand-yellow transition-colors mt-1 block shrink-0"></span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <div className="mt-12 pt-6 border-t border-brand-navy/10 group-hover:border-brand-offwhite/20 flex items-center justify-between transition-colors">
                                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Explore Tier</span>
                                        <ArrowRight size={14} className="stroke-[3] text-brand-navy group-hover:text-brand-yellow transition-colors" />
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* THE RESULT */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Capabilities</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            The<br/>Outcome.
                        </h2>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
                        {[
                            { t: "No More Guessing", d: "You stop wondering 'does this look right?' and start knowing 'this works'." },
                            { t: "Human Connection", d: "We skip the corporate personas. We talk to real people about real needs." },
                            { t: "One Clear Voice", d: "Your website, your emails, and your sales deck finally sound like the same person." },
                            { t: "A Real Plan", d: "A 90-day roadmap you can actually follow without burning out." }
                        ].map((o, index) => (
                            <div key={o.t} className="flex flex-col border-t border-brand-navy/10 pt-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold mb-4 block">0{index + 1}</span>
                                <h4 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 text-brand-navy">{o.t}</h4>
                                <p className="font-body text-lg text-brand-navy/70 leading-relaxed">{o.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

        <AnimatePresence>
            {selectedRes && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/95 backdrop-blur-md p-6" onClick={() => setSelectedRes(null)}>
                    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-brand-offwhite p-10 md:p-16 max-w-xl w-full relative border border-brand-navy/20" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedRes(null)} className="absolute top-6 right-6 text-brand-navy hover:text-brand-purple transition-colors p-2">
                            <span className="font-mono text-xs uppercase font-bold tracking-widest">CLOSE [X]</span>
                        </button>
                        
                        <div className="mb-10 mt-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-purple font-bold block mb-4">Free Goods</span>
                            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-brand-navy leading-none">Grab the<br/>{selectedRes.title}</h3>
                        </div>

                        {status === 'sent' ? (
                            <div className="text-left py-8 border-t border-brand-navy/10 pt-8">
                                <h4 className="text-2xl font-black uppercase text-brand-navy mb-4 tracking-tighter">Check your inbox.</h4>
                                <p className="font-body text-lg text-brand-navy/70 leading-relaxed">We've just sent the link to <strong className="text-brand-navy">{email}</strong>. Check your spam if it's missing.</p>
                                <button onClick={() => setSelectedRes(null)} className="mt-8 font-mono text-[10px] uppercase font-bold tracking-widest text-brand-purple hover:text-brand-navy transition-colors border-b border-current pb-1">BACK TO SITE</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-8 border-t border-brand-navy/10 pt-8">
                                <p className="font-body text-lg text-brand-navy/70 leading-relaxed">Where should we send the file?</p>
                                
                                <div className="relative">
                                    <input 
                                        type="email" required placeholder="YOUR@EMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent border-b border-brand-navy/30 pb-4 font-mono text-sm focus:outline-none focus:border-brand-purple transition-colors placeholder-brand-navy/30 text-brand-navy"
                                    />
                                </div>

                                <button type="submit" disabled={status === 'processing'} className="w-full bg-brand-navy text-brand-offwhite font-mono text-[10px] uppercase tracking-[0.2em] font-bold py-5 hover:bg-brand-purple transition-colors disabled:opacity-50">
                                    {status === 'processing' ? 'SENDING SYSTEM...' : 'SEND IT TO ME'}
                                </button>
                                
                                {status === 'error' && <p className="text-red-500 font-mono text-[10px] uppercase tracking-widest text-center">System Error. Try again?</p>}
                                <p className="text-left font-mono text-[9px] uppercase text-brand-navy/40 tracking-widest font-bold">Joining the crew. No spam, just value.</p>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </div>
    </PageTransition>
  );
};

export default ClarityPage;