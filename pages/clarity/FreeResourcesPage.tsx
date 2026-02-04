import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { FREE_RESOURCES } from '../../constants';
import { Resource } from '../../types';
import { useNavigate } from 'react-router-dom';

const FreeResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRes, setSelectedRes] = useState<Resource | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'sent' | 'error'>('idle');

  const handleAction = (res: Resource) => {
    if (res.id === '01') {
      navigate('/audit');
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
    <div className="bg-brand-offwhite min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <div className="max-w-4xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Clarity / Leg 1.1</span>
            <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
              Free<br/><span className="text-brand-purple italic">Intelligence.</span>
            </h1>
            <p className="font-body text-2xl md:text-3xl text-brand-navy/60 mt-12 leading-tight">
              A high-end studio shouldn't keep secrets. Start with the Starter Kit to unlock the system. Use these tools to audit your current brand state before spending a dime.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-32 border-t border-brand-navy/10">
          {FREE_RESOURCES.map((res, i) => (
            <AnimatedSection key={res.id} delay={i * 100}>
              <button 
                onClick={() => handleAction(res)}
                className="w-full text-left group flex flex-col md:flex-row justify-between items-start md:items-center py-16 border-b border-brand-navy/10 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-700 px-4 -mx-4 cursor-pointer"
              >
                <div className="flex items-center gap-12">
                   <span className="font-mono text-4xl text-brand-purple group-hover:text-brand-yellow font-black transition-colors">{res.id}</span>
                   <div>
                     <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">{res.title}</h3>
                     <p className="font-body text-xl text-brand-navy/50 group-hover:text-brand-offwhite/50 mt-4 max-w-xl transition-colors text-left">{res.desc}</p>
                   </div>
                </div>
                <div className="mt-8 md:mt-0 flex items-center gap-6">
                  <span className="font-mono text-sm uppercase font-bold tracking-widest">
                    {res.format} / {res.format === 'APP' ? 'Launch' : 'Download'}
                  </span>
                  <div className="w-12 h-[2px] bg-brand-navy group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500"></div>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
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

export default FreeResourcesPage;