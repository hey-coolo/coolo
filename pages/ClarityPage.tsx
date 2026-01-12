import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { CLARITY_TIERS, FREE_RESOURCES } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Resource } from '../types';

const ClarityPage: React.FC = () => {
  const [selectedRes, setSelectedRes] = useState<Resource | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'sent'>('idle');

  const handleOpenModal = (res: Resource) => {
    setSelectedRes(res);
    setStatus('idle');
    setEmail('');
  };

  const handleCloseModal = () => {
    setSelectedRes(null);
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
            resourceId: selectedRes.id 
        })
      });

      if (!response.ok) throw new Error('API Error');
      setStatus('sent');
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-4">Service Leg 01 / Strategy</span>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
              TheNo Magic<br/><span className="text-brand-purple">Formula™</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              We replace hype with clarity. A calibrated system to help founders find their sharp point-of-view and a workable plan.
            </p>
          </header>
        </AnimatedSection>

        <section className="py-24 border-t-2 border-brand-navy mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-4 block">Leg 0 / Starter Kit</span>
                    <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-brand-navy">Free<br/>Game.</h2>
                    <p className="mt-8 font-body text-xl text-brand-navy/60 leading-relaxed">
                        Start with the system. We've unlocked three of our core strategic tools. Get them below.
                    </p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {FREE_RESOURCES.map((res) => (
                        <AnimatedSection key={res.id}>
                            <button 
                                onClick={() => handleOpenModal(res)}
                                className="group bg-white border-2 border-brand-navy p-8 h-full flex flex-col text-left hover:bg-brand-purple hover:text-white transition-all duration-500 shadow-[8px_8px_0px_0px_#0F0328] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                            >
                                <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">{res.tag}</span>
                                <h3 className="text-2xl font-black uppercase leading-tight mb-4">{res.title}</h3>
                                <p className="font-body text-sm opacity-80 mb-8 flex-grow">{res.description}</p>
                                <span className="font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-current pb-1 w-fit">Get Tool &rarr;</span>
                            </button>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedRes && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-navy/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-brand-offwhite w-full max-w-xl p-8 md:p-12 relative border-2 border-brand-navy shadow-[16px_16px_0px_0px_#6E3DFF]"
            >
              <button onClick={handleCloseModal} className="absolute top-6 right-6 text-brand-navy hover:text-brand-purple transition-colors text-2xl font-black">✕</button>
              
              {status === 'sent' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-brand-navy">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-4">Check Your Inbox</h3>
                  <p className="font-body text-brand-navy/60">We've sent the {selectedRes.title} to your email. Go get it.</p>
                  <button onClick={handleCloseModal} className="mt-12 font-mono text-xs uppercase font-black tracking-widest border-b-2 border-brand-navy pb-1">Back to site</button>
                </div>
              ) : (
                <>
                  <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-4 block">Requesting: {selectedRes.title}</span>
                  <h3 className="text-4xl font-black uppercase text-brand-navy mb-6 leading-none">Where should we send the file?</h3>
                  <form onSubmit={handleSubscribe} className="space-y-6">
                    <input 
                      type="email" 
                      required
                      placeholder="YOUR@EMAIL.COM"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-navy/5 border-2 border-brand-navy p-6 font-mono text-xl focus:border-brand-purple focus:outline-none transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={status === 'processing'}
                      className="w-full bg-brand-navy text-white font-black uppercase py-6 text-xl hover:bg-brand-purple transition-colors disabled:opacity-50"
                    >
                      {status === 'processing' ? 'Processing...' : 'Send it to me'}
                    </button>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-brand-navy/40 text-center">By clicking, you're joining the COOLO network. No spam, just high-signal strategy.</p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClarityPage;