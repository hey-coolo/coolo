import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vibe: '', // 'Brand New', 'Rebrand', 'Agency Partner'
    budget: '', // 'Bootstrapping', 'Solid', 'Full Scale'
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const inputClass = "bg-transparent border-b-2 border-brand-navy/20 text-brand-navy font-mono text-xl md:text-2xl focus:border-brand-purple focus:outline-none placeholder-brand-navy/30 w-full py-4 transition-all duration-300";

  return (
    <div className="bg-brand-offwhite pt-32 min-h-screen flex flex-col">
      <div className="container mx-auto px-8 pb-32">
        
        <AnimatedSection>
            <div className="max-w-3xl mx-auto">
                <header className="mb-24 text-center md:text-left">
                    <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold block mb-4">Discovery</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.9]">
                        Let's Start<br/>Something.
                    </h1>
                </header>

                <div className="bg-white border border-brand-navy/10 p-8 md:p-16 shadow-xl relative">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-24"
                            >
                                <div className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
                                    ✌️
                                </div>
                                <h3 className="text-5xl font-black uppercase text-brand-navy leading-none mb-6">We Got It.</h3>
                                <p className="font-body text-xl text-brand-navy/60 max-w-md mx-auto mb-12">
                                    Thanks for the intel. We'll review your brief and hit you back within 24 hours.
                                </p>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="font-mono text-xs uppercase tracking-widest text-brand-purple border-b border-brand-purple pb-1 hover:text-brand-navy hover:border-brand-navy transition-colors"
                                >
                                    Send Another
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-24">
                                
                                {/* 01. IDENTITY */}
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase text-brand-navy mb-8">01. Who are we talking to?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Your Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                name="name" 
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe" 
                                                className={inputClass} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Your Email</label>
                                            <input 
                                                required
                                                type="email" 
                                                name="email" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@studio.com" 
                                                className={inputClass} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 02. VIBE / GOAL */}
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase text-brand-navy mb-8">02. What's the mission?</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {['Brand New Thing', 'Leveling Up (Rebrand)', 'Agency Partner'].map(opt => (
                                            <button 
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({...formData, vibe: opt})}
                                                className={`font-mono uppercase text-xs md:text-sm px-6 py-4 border-2 font-bold transition-all duration-300 ${
                                                    formData.vibe === opt 
                                                    ? 'bg-brand-purple text-white border-brand-purple shadow-lg scale-105' 
                                                    : 'bg-transparent border-brand-navy/10 text-brand-navy/60 hover:border-brand-purple hover:text-brand-purple'
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 03. BUDGET */}
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase text-brand-navy mb-8">03. Real talk—Budget range?</h3>
                                    <div className="flex flex-col gap-4">
                                        {[
                                            { label: 'Bootstrapping (< $5k)', val: 'Bootstrapping' },
                                            { label: 'Solid Start ($5k - $15k)', val: 'Solid' },
                                            { label: 'Full Scale ($15k+)', val: 'Full Scale' }
                                        ].map((opt) => (
                                            <label key={opt.val} className="flex items-center gap-6 cursor-pointer group p-4 border border-transparent hover:bg-brand-navy/5 rounded-lg transition-colors -mx-4">
                                                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${formData.budget === opt.val ? 'border-brand-purple' : 'border-brand-navy/20 group-hover:border-brand-purple'}`}>
                                                    {formData.budget === opt.val && <div className="w-3 h-3 bg-brand-purple rounded-full" />}
                                                </div>
                                                <span className={`font-mono text-sm md:text-base uppercase font-bold transition-colors ${formData.budget === opt.val ? 'text-brand-purple' : 'text-brand-navy/60 group-hover:text-brand-navy'}`}>
                                                    {opt.label}
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="budget" 
                                                    value={opt.val} 
                                                    onChange={() => setFormData({...formData, budget: opt.val})} 
                                                    className="hidden" 
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 04. CONTEXT */}
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase text-brand-navy mb-8">04. Anything else?</h3>
                                    <textarea 
                                        name="message" 
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about the timeline, the struggle, or the dream..." 
                                        className="w-full bg-brand-navy/5 border-0 p-6 font-body text-lg text-brand-navy placeholder-brand-navy/40 min-h-[150px] resize-y focus:ring-2 focus:ring-brand-purple transition-all"
                                    />
                                </div>

                                {/* SUBMIT */}
                                <div className="pt-8 border-t border-brand-navy/10">
                                    <button 
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="group flex items-center gap-4 text-4xl md:text-6xl font-black uppercase text-brand-navy hover:text-brand-purple transition-colors disabled:opacity-50"
                                    >
                                        <span>{status === 'submitting' ? 'Sending...' : 'Send It'}</span>
                                        <span className="group-hover:translate-x-4 transition-transform duration-300">&rarr;</span>
                                    </button>
                                </div>

                                {status === 'error' && (
                                    <p className="text-red-500 font-mono text-xs uppercase font-bold tracking-widest">
                                        Something went wrong. Email us directly at hey@coolo.co.nz
                                    </p>
                                )}
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AnimatedSection>
      </div>
      
      <div className="bg-brand-navy text-brand-offwhite py-24 mt-auto">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 font-mono uppercase tracking-[0.2em] text-[10px]">
          <div><h3 className="text-brand-purple mb-4 font-bold">HQ</h3><p className="text-lg font-sans font-black tracking-normal">Mount Maunganui, NZ</p></div>
          <div><h3 className="text-brand-purple mb-4 font-bold">Direct Line</h3><a href="mailto:hey@coolo.co.nz" className="text-lg font-sans font-black tracking-normal block hover:text-brand-purple">hey@coolo.co.nz</a></div>
          <div><h3 className="text-brand-purple mb-4 font-bold">Network</h3><a href="https://instagram.com/coolo.studio" target="_blank" rel="noopener noreferrer" className="text-lg font-sans font-black tracking-normal block hover:text-brand-purple">Instagram</a></div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;