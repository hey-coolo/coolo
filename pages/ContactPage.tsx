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

  // Clean, thin borders for inputs - Swiss style
  const inputClass = "bg-transparent border-b-[1px] border-brand-navy/30 text-brand-navy font-sans text-3xl md:text-5xl focus:border-brand-navy focus:outline-none placeholder-brand-navy/20 w-full py-4 transition-colors uppercase rounded-none";

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-brand-yellow min-h-screen flex flex-col font-sans selection:bg-brand-navy selection:text-brand-yellow text-brand-navy">
      <Header />
      
      <main className="container mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-32 flex-grow max-w-[1600px]">
        <AnimatedSection>
            
            {/* --- GRID LAYOUT --- */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
                
                {/* --- LEFT COL: MASSIVE TYPOGRAPHY --- */}
                <div className="xl:col-span-5 xl:sticky xl:top-48 z-10">
                    <p className="font-mono text-brand-navy uppercase tracking-widest text-xs font-bold mb-8">
                        01 / Initiation
                    </p>
                    <h1 className="text-[15vw] xl:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] break-words m-0">
                        Brief<br/>Us.
                    </h1>
                    <p className="mt-12 text-xl md:text-2xl font-medium leading-relaxed max-w-md">
                        Skip the small talk. Tell us what you're building, what's broken, or what you're dreaming about.
                    </p>
                </div>

                {/* --- RIGHT COL: EDITORIAL FORM --- */}
                <div className="xl:col-span-7 w-full max-w-3xl mx-auto xl:mx-0 xl:ml-auto">
                    
                    <div className={`relative transition-all duration-500 mb-24 ${status === 'success' ? 'min-h-[60vh] flex flex-col justify-center' : ''}`}>
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-start"
                                >
                                    <div className="w-20 h-20 rounded-full border-[1px] border-brand-navy flex items-center justify-center mb-10">
                                        <span className="text-4xl font-light">✓</span>
                                    </div>
                                    <h2 className="text-6xl md:text-8xl font-black uppercase mb-6 leading-[0.85] tracking-tighter">
                                        Brief<br/>Received.
                                    </h2>
                                    <p className="text-xl md:text-2xl font-medium max-w-lg mb-12">
                                        Your information is in our system. One of our directors will review the details and reach out within 24 hours.
                                    </p>
                                    
                                    <div className="w-full border-t-[1px] border-brand-navy/20 pt-8 flex justify-between items-end font-mono uppercase text-sm">
                                        <div>
                                            <p className="opacity-50 mb-1">Thread</p>
                                            <p className="font-bold">#COOLO_{Math.floor(Math.random() * 100000)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="opacity-50 mb-1">Status</p>
                                            <div className="flex items-center gap-2 justify-end">
                                                <span className="w-2 h-2 rounded-full bg-brand-navy animate-pulse"></span>
                                                <span className="font-bold">Reviewing</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => {
                                            setStatus('idle');
                                            setCurrentStep(1);
                                            setFormData({ name: '', email: '', vibe: '', budget: '', message: '' });
                                        }}
                                        className="mt-16 text-sm font-mono uppercase tracking-widest border-b-[1px] border-brand-navy pb-1 hover:text-brand-purple transition-colors font-bold"
                                    >
                                        Start Over
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="relative">
                                    
                                    {/* Minimal Step Indicator */}
                                    <div className="flex items-center justify-between border-b-[1px] border-brand-navy/20 pb-4 mb-16">
                                        <span className="font-mono text-sm uppercase tracking-widest font-bold">Step {currentStep} of 4</span>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(step => (
                                                <div 
                                                    key={step} 
                                                    className={`w-8 h-[2px] transition-all duration-300 ${step <= currentStep ? 'bg-brand-navy' : 'bg-brand-navy/20'}`} 
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="min-h-[400px] flex flex-col justify-between">
                                        <AnimatePresence mode="wait">
                                            
                                            {/* STEP 1: Basic Info */}
                                            {currentStep === 1 && (
                                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-16">
                                                    <div>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Identify<br/>Yourself.</h2>
                                                    </div>
                                                    <div className="space-y-10">
                                                        <div className="space-y-2">
                                                            <label className="font-mono text-xs uppercase tracking-widest font-bold opacity-50">Name</label>
                                                            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="DON DRAPER" className={inputClass} autoFocus />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-mono text-xs uppercase tracking-widest font-bold opacity-50">Email</label>
                                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="DON@STERLINGCOOPER.COM" className={inputClass} />
                                                        </div>
                                                    </div>
                                                    <div className="pt-8">
                                                        <button type="button" onClick={nextStep} disabled={!isStep1Valid} className="bg-brand-navy text-brand-yellow px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none w-full md:w-auto">
                                                            Next: Mission →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: The Vibe */}
                                            {currentStep === 2 && (
                                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-16">
                                                    <div>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">The<br/>Mission.</h2>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {[
                                                            { label: 'Brand New', desc: 'Starting from zero' },
                                                            { label: 'Level Up', desc: 'Evolution / Rebrand' },
                                                            { label: 'Digital', desc: 'Web / App / Product' },
                                                            { label: 'Agency', desc: 'Design Partner' }
                                                        ].map((option) => (
                                                            <button
                                                                key={option.label}
                                                                type="button"
                                                                onClick={() => setFormData({...formData, vibe: option.label})}
                                                                className={`text-left p-8 border-[1px] transition-colors duration-300 ${formData.vibe === option.label ? 'bg-brand-navy border-brand-navy text-brand-yellow' : 'bg-transparent border-brand-navy/20 text-brand-navy hover:border-brand-navy hover:bg-brand-navy/5'}`}
                                                            >
                                                                <h3 className="font-black text-3xl uppercase mb-2 leading-none">{option.label}</h3>
                                                                <p className="font-mono text-xs uppercase tracking-widest opacity-60">{option.desc}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                                                        <button type="button" onClick={prevStep} className="font-mono text-sm uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity">
                                                            ← Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep2Valid} className="bg-brand-navy text-brand-yellow px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none w-full md:w-auto">
                                                            Next: Scale →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: The Budget/Scale */}
                                            {currentStep === 3 && (
                                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-16">
                                                    <div>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">The<br/>Scale.</h2>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="flex flex-col gap-3">
                                                            {['Under $5k (Seed)', '$5k - $15k (Growth)', '$15k - $30k (Scale)', '$30k+ (Enterprise)'].map((budget) => (
                                                                <button
                                                                    key={budget}
                                                                    type="button"
                                                                    onClick={() => setFormData({...formData, budget: budget})}
                                                                    className={`px-8 py-6 font-mono text-lg md:text-xl uppercase font-bold border-[1px] transition-colors text-left ${formData.budget === budget ? 'bg-brand-navy border-brand-navy text-brand-yellow' : 'bg-transparent border-brand-navy/20 text-brand-navy hover:border-brand-navy hover:bg-brand-navy/5'}`}
                                                                >
                                                                    {budget}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                                                        <button type="button" onClick={prevStep} className="font-mono text-sm uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity">
                                                            ← Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep3Valid} className="bg-brand-navy text-brand-yellow px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none w-full md:w-auto">
                                                            Next: Details →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 4: The Story */}
                                            {currentStep === 4 && (
                                                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-16">
                                                    <div>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">The<br/>Details.</h2>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-mono text-xs uppercase tracking-widest font-bold opacity-50">Project Brief</label>
                                                        <textarea 
                                                            name="message" 
                                                            required 
                                                            value={formData.message} 
                                                            onChange={handleChange} 
                                                            placeholder="Timeline. Core struggle. The big idea. Lay it out." 
                                                            className="w-full bg-transparent border-b-[1px] border-brand-navy/30 py-4 font-sans text-2xl md:text-3xl uppercase placeholder-brand-navy/20 min-h-[200px] resize-y focus:outline-none focus:border-brand-navy transition-colors" 
                                                        />
                                                    </div>

                                                    <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                                                        <button type="button" onClick={prevStep} className="font-mono text-sm uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity">
                                                            ← Back
                                                        </button>
                                                        <button type="submit" disabled={status === 'submitting' || !isStep4Valid} className="bg-brand-purple text-brand-offwhite px-12 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy transition-colors disabled:opacity-50 disabled:pointer-events-none w-full md:w-auto">
                                                            {status === 'submitting' ? 'Sending...' : 'Transmit Brief'}
                                                        </button>
                                                    </div>
                                                    {status === 'error' && (
                                                        <p className="text-red-600 font-mono text-xs uppercase font-bold tracking-widest mt-4">System error. Email hey@coolo.co.nz directly.</p>
                                                    )}
                                                </motion.div>
                                            )}
                                            
                                        </AnimatePresence>
                                    </form>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- CALENDAR BLOCK (Editorial) --- */}
                    <div className="border-t-[1px] border-brand-navy/20 pt-16 mt-16 text-left">
                        <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">Direct Line.</h3>
                        <p className="font-sans text-xl md:text-2xl font-medium mb-8 max-w-lg">
                            Skip the forms entirely. Book a slot in our calendar for a direct video call.
                        </p>
                        <button className="bg-transparent border-[1px] border-brand-navy text-brand-navy px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy hover:text-brand-yellow transition-colors inline-block">
                            Open Calendar
                        </button>
                    </div>

                </div>
            </div>
        </AnimatedSection>
        
        {/* --- FAQ SECTION (Clean Editorial Accordion) --- */}
        <AnimatedSection>
            <div className="mt-40 xl:mt-64 pt-24 border-t-[1px] border-brand-navy/20">
                <header className="mb-24 text-left max-w-4xl">
                    <p className="font-mono uppercase tracking-widest text-xs font-bold mb-8">
                        02 / The Fine Print
                    </p>
                    <h2 className="text-[12vw] md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] m-0">
                        The<br/>Truth.
                    </h2>
                    <p className="mt-12 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
                        No jargon. No fluff. Just the raw data on how we operate, what we charge, and why we do it.
                    </p>
                </header>

                <div className="space-y-24">
                    {QA_DATA.map((section, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                            
                            {/* Section Category */}
                            <div className="md:col-span-4">
                                <h3 className="font-mono text-sm uppercase tracking-widest font-bold sticky top-32">
                                    {String(i + 1).padStart(2, '0')} / {section.category}
                                </h3>
                            </div>
                            
                            {/* Questions */}
                            <div className="md:col-span-8 space-y-0">
                                {section.questions.map((item, j) => {
                                    const faqId = `${i}-${j}`;
                                    const isExpanded = openFaq === faqId;

                                    return (
                                        <div 
                                            key={j} 
                                            className="border-b-[1px] border-brand-navy/20 last:border-b-0"
                                        >
                                            <button 
                                                onClick={() => toggleFaq(faqId)}
                                                className="w-full text-left py-8 md:py-12 flex justify-between items-start md:items-center gap-8 cursor-pointer focus:outline-none group"
                                            >
                                                <h4 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter m-0 group-hover:text-brand-purple transition-colors">
                                                    {item.q}
                                                </h4>
                                                <span className={`text-5xl font-light flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
                                                    +
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
                                                        <div className="pb-12 pt-2 md:pl-12">
                                                            <p className="font-sans font-medium text-xl md:text-2xl leading-relaxed">
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