import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { QA_DATA } from '../constants';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vibe: '',
    budget: '',
    message: ''
  });
  
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<string | null>(null);

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
        throw new Error('API Error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const isStep1Valid = formData.name.trim() !== '' && formData.email.trim() !== '';
  const isStep2Valid = formData.vibe !== '';
  const isStep3Valid = formData.budget !== '';
  const isStep4Valid = formData.message.trim() !== '';

  const inputClass = "bg-transparent border-b-2 border-brand-navy/20 text-brand-navy font-mono text-xl md:text-3xl focus:border-brand-purple focus:outline-none placeholder-brand-navy/20 w-full py-4 transition-all duration-300 rounded-none";

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-brand-offwhite min-h-screen flex flex-col font-sans selection:bg-brand-yellow">
      <Header />
      
      <main className="container mx-auto px-6 md:px-8 pt-40 md:pt-48 pb-32 flex-grow max-w-[1400px]">
        <AnimatedSection>
            
            {/* --- HERO HEADER --- */}
            {status !== 'success' && (
                <header className="mb-16 text-center max-w-4xl mx-auto">
                    <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold block mb-4">
                        Initiation
                    </span>
                    <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tight text-brand-navy leading-[0.85]">
                        Start<br/>Something.
                    </h1>
                    <p className="mt-8 text-xl md:text-2xl text-brand-navy/60 font-medium max-w-2xl mx-auto">
                        Skip the small talk. Tell us what you're building, what's broken, or what you're dreaming about.
                    </p>
                </header>
            )}

            {/* --- HERO FORM CONTAINER --- */}
            <div className="max-w-4xl mx-auto">
                <div className={`relative transition-all duration-500 mb-24 bg-white border border-brand-navy/10 p-8 md:p-16 shadow-2xl ${status === 'success' ? 'min-h-[60vh] flex flex-col justify-center' : ''}`}>
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center text-center bg-white"
                            >
                                <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center mb-8 border-2 border-brand-navy">
                                    <span className="text-4xl text-brand-navy font-bold">✓</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-navy mb-4 leading-none tracking-tighter">
                                    Brief Received.
                                </h2>
                                <p className="font-body text-xl text-brand-navy/60 max-w-md mx-auto mb-12">
                                    Your data has hit our inbox. One of us will dive into the details and reach out within 24 hours.
                                </p>
                                <div className="bg-brand-navy/5 border-l-4 border-brand-purple p-8 text-left w-full max-w-md mx-auto font-mono">
                                    <p className="text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2 font-bold">Thread Reference</p>
                                    <p className="text-xl font-bold text-brand-navy mb-6">#COOLO_{Math.floor(Math.random() * 100000)}</p>
                                    
                                    <p className="text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2 font-bold">Status</p>
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-sm font-bold text-brand-navy uppercase tracking-tighter">Analyzing your project</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        setStatus('idle');
                                        setCurrentStep(1);
                                        setFormData({ name: '', email: '', vibe: '', budget: '', message: '' });
                                    }}
                                    className="mt-12 font-mono text-xs uppercase font-black tracking-[0.2em] border-b-2 border-brand-navy pb-1 hover:text-brand-purple transition-colors"
                                >
                                    Start New Message
                                </button>
                            </motion.div>
                        ) : (
                            <div className="relative">
                                {/* Form Progress Indicator */}
                                <div className="flex items-center gap-2 mb-12">
                                    {[1, 2, 3, 4].map(step => (
                                        <div 
                                            key={step} 
                                            className={`h-2 flex-1 rounded-full transition-all duration-500 ${step <= currentStep ? 'bg-brand-purple' : 'bg-brand-navy/10'}`} 
                                        />
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} className="min-h-[400px] flex flex-col justify-between">
                                    <AnimatePresence mode="wait">
                                        
                                        {/* STEP 1: Basic Info */}
                                        {currentStep === 1 && (
                                            <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                <div>
                                                    <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/50 font-bold mb-2">Step 1 of 4</p>
                                                    <h2 className="text-4xl md:text-6xl font-black uppercase text-brand-navy leading-none tracking-tighter">Who are we<br/>talking to?</h2>
                                                </div>
                                                <div className="space-y-8">
                                                    <div className="space-y-2">
                                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 font-bold">Your Name</label>
                                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Don Draper" className={inputClass} autoFocus />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 font-bold">Email Address</label>
                                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="don@sterlingcooper.com" className={inputClass} />
                                                    </div>
                                                </div>
                                                <div className="pt-8 flex justify-end">
                                                    <button type="button" onClick={nextStep} disabled={!isStep1Valid} className="w-full md:w-auto bg-brand-navy text-brand-offwhite px-8 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none">
                                                        Next: The Mission →
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: The Vibe */}
                                        {currentStep === 2 && (
                                            <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                <div>
                                                    <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/50 font-bold mb-2">Step 2 of 4</p>
                                                    <h2 className="text-4xl md:text-6xl font-black uppercase text-brand-navy leading-none tracking-tighter">What's the<br/>mission?</h2>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {[
                                                        { label: 'Brand New Thing', desc: 'Starting from scratch' },
                                                        { label: 'Leveling Up', desc: 'Rebrand or evolution' },
                                                        { label: 'Digital Product', desc: 'Web / App / SaaS' },
                                                        { label: 'Agency Partner', desc: 'Ongoing design power' }
                                                    ].map((option) => (
                                                        <button
                                                            key={option.label}
                                                            type="button"
                                                            onClick={() => setFormData({...formData, vibe: option.label})}
                                                            className={`text-left p-6 md:p-8 border-2 transition-all duration-300 ${formData.vibe === option.label ? 'bg-brand-purple border-brand-purple text-white shadow-lg scale-[1.02]' : 'bg-brand-offwhite/50 border-brand-navy/10 text-brand-navy hover:border-brand-purple/50'}`}
                                                        >
                                                            <h3 className="font-black text-2xl uppercase mb-2 leading-none">{option.label}</h3>
                                                            <p className={`font-mono text-[10px] uppercase tracking-widest ${formData.vibe === option.label ? 'text-white/80' : 'text-brand-navy/50'}`}>{option.desc}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
                                                    <button type="button" onClick={prevStep} className="text-brand-navy/50 hover:text-brand-navy px-4 font-mono text-sm uppercase font-bold transition-colors">
                                                        ← Back
                                                    </button>
                                                    <button type="button" onClick={nextStep} disabled={!isStep2Valid} className="w-full md:w-auto bg-brand-navy text-brand-offwhite px-8 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none">
                                                        Next: The Scale →
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 3: The Budget/Scale */}
                                        {currentStep === 3 && (
                                            <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                <div>
                                                    <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/50 font-bold mb-2">Step 3 of 4</p>
                                                    <h2 className="text-4xl md:text-6xl font-black uppercase text-brand-navy leading-none tracking-tighter">What's the<br/>scale?</h2>
                                                </div>
                                                <div className="space-y-6">
                                                    <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 font-bold">Rough budget indication helps us align the right team.</p>
                                                    <div className="flex flex-col gap-3">
                                                        {['Under $5k (Just starting out)', '$5k - $15k (Growing fast)', '$15k - $30k (Scaling up)', '$30k+ (All the way)'].map((budget) => (
                                                            <button
                                                                key={budget}
                                                                type="button"
                                                                onClick={() => setFormData({...formData, budget: budget})}
                                                                className={`px-6 py-5 font-mono text-sm md:text-base font-bold border-2 transition-all text-left ${formData.budget === budget ? 'bg-brand-navy border-brand-navy text-brand-yellow scale-[1.01]' : 'bg-transparent border-brand-navy/10 text-brand-navy hover:border-brand-purple'}`}
                                                            >
                                                                {budget}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
                                                    <button type="button" onClick={prevStep} className="text-brand-navy/50 hover:text-brand-navy px-4 font-mono text-sm uppercase font-bold transition-colors">
                                                        ← Back
                                                    </button>
                                                    <button type="button" onClick={nextStep} disabled={!isStep3Valid} className="w-full md:w-auto bg-brand-navy text-brand-offwhite px-8 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none">
                                                        Next: The Details →
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 4: The Story */}
                                        {currentStep === 4 && (
                                            <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                <div>
                                                    <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/50 font-bold mb-2">Step 4 of 4</p>
                                                    <h2 className="text-4xl md:text-6xl font-black uppercase text-brand-navy leading-none tracking-tighter">Spill the<br/>details.</h2>
                                                </div>
                                                <div className="space-y-6">
                                                    <textarea 
                                                        name="message" 
                                                        required 
                                                        value={formData.message} 
                                                        onChange={handleChange} 
                                                        placeholder="Give us the elevator pitch. What's the timeline? What's the main struggle you're trying to solve?" 
                                                        className="w-full bg-brand-navy/5 border-0 p-6 md:p-8 font-body text-lg md:text-xl text-brand-navy placeholder-brand-navy/40 min-h-[250px] resize-y focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all rounded-sm" 
                                                    />
                                                </div>

                                                <div className="pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 border-t border-brand-navy/10">
                                                    <button type="button" onClick={prevStep} className="text-brand-navy/50 hover:text-brand-navy px-4 font-mono text-sm uppercase font-bold transition-colors">
                                                        ← Back
                                                    </button>
                                                    <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-6">
                                                        <p className="font-mono text-[9px] uppercase text-brand-navy/40 max-w-[200px] text-center md:text-right hidden md:block">
                                                            Humans behind the machine. We reply personally within 24h.
                                                        </p>
                                                        <button type="submit" disabled={status === 'submitting' || !isStep4Valid} className="w-full md:w-auto bg-brand-purple text-brand-offwhite px-10 py-5 font-mono text-lg uppercase tracking-widest font-bold hover:bg-brand-navy transition-all shadow-[6px_6px_0px_0px_#0F0328] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:pointer-events-none">
                                                            {status === 'submitting' ? 'Sending...' : 'Transmit Brief'}
                                                        </button>
                                                    </div>
                                                </div>
                                                {status === 'error' && (
                                                    <p className="text-red-500 font-mono text-xs uppercase font-bold tracking-widest bg-red-50 p-4 border-l-4 border-red-500 mt-6">Something went wrong. Email hey@coolo.co.nz directly.</p>
                                                )}
                                            </motion.div>
                                        )}
                                        
                                    </AnimatePresence>
                                </form>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- CALENDAR INTEGRATION BLOCK --- */}
                <div className="bg-brand-purple/5 border border-brand-purple/20 p-8 md:p-12 text-center rounded-sm">
                    <h3 className="text-3xl font-black uppercase mb-4 text-brand-navy">Or Book a Time</h3>
                    <p className="font-body text-lg text-brand-navy/70 mb-8 max-w-lg mx-auto">
                        Skip the forms and jump straight into a call. Find a time that works for you.
                    </p>
                    <button className="bg-brand-purple text-brand-offwhite px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy transition-colors">
                        Open Calendar
                    </button>
                </div>

            </div>
        </AnimatedSection>
        
        {/* --- FAQ SECTION (Standard Accordion) --- */}
        <AnimatedSection>
            <div className="mt-40 border-t border-brand-navy/10 pt-24 max-w-5xl mx-auto">
                <header className="mb-24 text-left">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                        The Fine Print
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.9]">
                        The <span className="text-brand-purple italic">Truth.</span>
                    </h2>
                    <p className="font-body text-xl md:text-2xl text-brand-navy/70 mt-8 leading-tight max-w-3xl">
                        You have questions. We have honest answers. <br/>
                        No corporate jargon. No sales fluff. Just the raw data on how we work, what we charge, and why we do it.
                    </p>
                </header>

                <div className="space-y-16">
                    {QA_DATA.map((section, i) => (
                        <div key={i} className="pt-8 border-t-2 border-brand-navy">
                            <h3 className="font-mono text-brand-navy uppercase tracking-widest text-sm font-bold mb-8">
                                {String(i + 1).padStart(2, '0')} / {section.category}
                            </h3>
                            
                            <div className="space-y-2">
                                {section.questions.map((item, j) => {
                                    const faqId = `${i}-${j}`;
                                    const isExpanded = openFaq === faqId;

                                    return (
                                        <div 
                                            key={j} 
                                            className="group border-b border-brand-navy/10 last:border-0"
                                        >
                                            <button 
                                                onClick={() => toggleFaq(faqId)}
                                                className="w-full text-left py-6 flex justify-between items-center gap-6 cursor-pointer focus:outline-none"
                                            >
                                                <h4 className={`text-2xl md:text-4xl font-black uppercase italic transition-colors duration-300 ${isExpanded ? 'text-brand-purple' : 'text-brand-navy group-hover:text-brand-purple'}`}>
                                                    "{item.q}"
                                                </h4>
                                                <span className="text-4xl text-brand-navy font-mono flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    {isExpanded ? '-' : '+'}
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pb-8 pt-2 pl-4 md:pl-8 border-l-4 border-brand-purple/50">
                                                            <p className="font-body text-lg md:text-xl leading-relaxed text-brand-navy/80">
                                                                {item.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default ContactPage;