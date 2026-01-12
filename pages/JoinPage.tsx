import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const JoinPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    role: '',
    rate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('API Error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const inputClass = "bg-transparent border-b-2 border-brand-navy/20 text-brand-navy font-mono text-xl md:text-2xl focus:border-brand-purple focus:outline-none placeholder-brand-navy/30 w-full py-6 transition-all duration-300";

  return (
    <div className="bg-brand-offwhite min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="container mx-auto px-8 pt-48 pb-32 flex-grow">
        <AnimatedSection>
            <div className="max-w-3xl mx-auto">
                
                {status !== 'success' && (
                    <header className="mb-24 text-left">
                        <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold block mb-4">Recruitment</span>
                        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tight text-brand-navy leading-[0.85]">
                            Join the<br/>Unit.
                        </h1>
                        <p className="mt-8 text-xl text-brand-navy/60 max-w-xl italic font-medium">
                            We are always looking for seniors. No juniors. No hand-holding. If you can execute at a high level, we want to know you.
                        </p>
                    </header>
                )}

                <div className={`relative transition-all duration-500 ${status === 'success' ? '' : 'bg-white border border-brand-navy/10 p-8 md:p-16 shadow-xl'}`}>
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="min-h-[50vh] flex flex-col items-center justify-center text-center border-2 border-brand-navy p-8 md:p-16 bg-white shadow-[16px_16px_0px_0px_#3A0888]"
                            >
                                <div className="w-24 h-24 bg-brand-purple rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-brand-navy text-white">
                                    <span className="text-4xl font-bold">✓</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-navy mb-4 leading-none">Dossier Sent.</h2>
                                <p className="font-body text-xl text-brand-navy/60 max-w-md mx-auto mb-12">
                                    We've received your portfolio. If the work aligns with our standard, we'll reach out for a coffee or a call.
                                </p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="mt-4 font-mono text-xs uppercase font-black tracking-[0.2em] border-b-2 border-brand-navy pb-1 hover:text-brand-purple transition-all"
                                >
                                    Submit Another
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-2">
                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Your Name</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Rick Rubin" className={inputClass} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Email Address</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="rick@shangrila.com" className={inputClass} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Portfolio Link</label>
                                    <input type="text" name="portfolio" required value={formData.portfolio} onChange={handleChange} placeholder="https://coolo.co.nz" className={inputClass} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-2">
                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Primary Role</label>
                                        <input type="text" name="role" required value={formData.role} onChange={handleChange} placeholder="Motion Designer" className={inputClass} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Day Rate (NZD/USD)</label>
                                        <input type="text" name="rate" required value={formData.rate} onChange={handleChange} placeholder="$800/day" className={inputClass} />
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-brand-navy/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <button type="submit" disabled={status === 'submitting'} className="group flex items-center gap-6 text-4xl md:text-5xl font-black uppercase text-brand-navy hover:text-brand-purple transition-colors disabled:opacity-50" >
                                        <span>{status === 'submitting' ? 'Uploading...' : 'Send Profile'}</span>
                                        <span className="group-hover:translate-x-4 transition-transform duration-300">→</span>
                                    </button>
                                    <p className="font-mono text-[10px] uppercase text-brand-navy/40 max-w-[200px]">By submitting, you agree to being added to our talent database.</p>
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-500 font-mono text-xs uppercase font-bold tracking-widest bg-red-50 p-4 border-l-4 border-red-500">Something went wrong. Email hey@coolo.co.nz directly.</p>
                                )}
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AnimatedSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinPage;