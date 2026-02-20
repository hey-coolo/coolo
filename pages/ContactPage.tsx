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

  const inputClass = "bg-transparent border-b-8 border-brand-navy text-brand-navy font-mono text-3xl md:text-5xl focus:bg-white focus:outline-none placeholder-brand-navy/20 w-full py-6 px-4 transition-none uppercase rounded-none shadow-[8px_8px_0px_0px_#0F0328] focus:shadow-none focus:translate-x-1 focus:translate-y-1";

  const stepVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "circOut" } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.2 } }
  };

  return (
    <div 
        className="bg-brand-yellow min-h-screen flex flex-col font-sans selection:bg-brand-navy selection:text-brand-yellow relative"
        style={{
            backgroundImage: 'radial-gradient(#0F0328 2px, transparent 2px)',
            backgroundSize: '48px 48px'
        }}
    >
      <Header />
      
      {/* --- INFINITE MARQUEE --- */}
      <div className="fixed top-24 md:top-32 left-0 w-full overflow-hidden bg-brand-navy text-brand-yellow py-2 z-40 border-y-4 border-brand-navy hidden md:block">
          <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="whitespace-nowrap font-mono text-sm uppercase font-black tracking-[0.3em] flex gap-8"
          >
              {[...Array(10)].map((_, i) => (
                  <span key={i}>/// SECURE CONNECTION ESTABLISHED /// AWAITING DATA INPUT /// NO FLUFF ALLOWED ///</span>
              ))}
          </motion.div>
      </div>

      <main className="container mx-auto px-6 md:px-12 pt-40 md:pt-64 pb-32 flex-grow max-w-[1600px] relative z-10">
        <AnimatedSection>
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
                
                {/* --- LEFT COL: MASSIVE TITLE & BADGE --- */}
                <div className="xl:col-span-5 xl:sticky xl:top-64 z-10 relative">
                    {/* Rotating Brutalist Badge */}
                    <div className="absolute -top-16 -right-8 md:-top-24 md:-right-16 md:w-48 md:h-48 w-32 h-32 hidden md:flex items-center justify-center z-[-1]">
                        <motion.img 
                            src="/assets/stickers/sticker_worldwide.svg" 
                            alt="Worldwide" 
                            className="w-full h-full object-contain opacity-20 sepia hue-rotate-180 saturate-200"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="bg-white border-4 border-brand-navy px-6 py-2 uppercase tracking-[0.3em] text-sm font-black inline-flex items-center gap-3 mb-8 shadow-[6px_6px_0px_0px_#0F0328]">
                        <span className="w-3 h-3 bg-[#FF0000] border-2 border-brand-navy animate-pulse"></span>
                        Initiate Sequence
                    </div>
                    
                    <h1 className="text-[18vw] xl:text-[10rem] font-black uppercase tracking-tighter text-brand-navy leading-[0.75] break-words m-0 bg-white inline-block border-8 border-brand-navy p-4 shadow-[16px_16px_0px_0px_#0F0328]">
                        BRIEF<br/>US.
                    </h1>
                    
                    <div className="mt-12 bg-brand-navy p-8 border-4 border-brand-navy shadow-[12px_12px_0px_0px_#A882DD]">
                        <p className="text-2xl md:text-3xl text-white font-black leading-tight uppercase">
                            NO SMALL TALK.<br/>
                            TRANSMIT YOUR STRUGGLE.
                        </p>
                    </div>
                </div>

                {/* --- RIGHT COL: NEO-BRUTALIST FORM --- */}
                <div className="xl:col-span-7 w-full max-w-4xl mx-auto xl:mx-0 xl:ml-auto">
                    
                    <div className={`relative transition-none bg-brand-offwhite border-8 border-brand-navy p-8 md:p-16 shadow-[24px_24px_0px_0px_#0F0328] mb-24 ${status === 'success' ? 'min-h-[60vh] flex flex-col justify-center' : ''}`}>
                        
                        {/* Decorative Crosshairs */}
                        <div className="absolute top-4 left-4 text-brand-navy/30 font-mono text-xl">+</div>
                        <div className="absolute top-4 right-4 text-brand-navy/30 font-mono text-xl">+</div>
                        <div className="absolute bottom-4 left-4 text-brand-navy/30 font-mono text-xl">+</div>
                        <div className="absolute bottom-4 right-4 text-brand-navy/30 font-mono text-xl">+</div>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-start bg-brand-offwhite"
                                >
                                    <div className="w-32 h-32 bg-[#00FF00] border-8 border-brand-navy flex items-center justify-center mb-12 shadow-[12px_12px_0px_0px_#0F0328]">
                                        <span className="text-8xl text-brand-navy font-black">✓</span>
                                    </div>
                                    <h2 className="text-7xl md:text-9xl font-black uppercase text-brand-navy mb-6 leading-[0.8] tracking-tighter bg-white px-4 border-4 border-brand-navy">
                                        PAYLOAD<br/>SECURE.
                                    </h2>
                                    <div className="bg-white border-4 border-brand-navy p-8 w-full font-mono mt-8 shadow-[8px_8px_0px_0px_#0F0328]">
                                        <div className="flex justify-between border-b-4 border-brand-navy pb-4 mb-4">
                                            <p className="text-lg uppercase tracking-widest text-brand-navy font-black">REF_ID</p>
                                            <p className="text-2xl font-black text-brand-navy">#CLO_{Math.floor(Math.random() * 100000)}</p>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <p className="text-lg uppercase tracking-widest text-brand-navy font-black">SYS_STATUS</p>
                                            <div className="flex items-center gap-4 bg-brand-navy text-brand-yellow px-4 py-2 border-2 border-brand-navy">
                                                <span className="w-3 h-3 bg-brand-yellow animate-ping"></span>
                                                <span className="text-xl font-black uppercase">ANALYZING</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setStatus('idle');
                                            setCurrentStep(1);
                                            setFormData({ name: '', email: '', vibe: '', budget: '', message: '' });
                                        }}
                                        className="mt-16 w-full bg-brand-navy text-white px-8 py-6 font-mono text-2xl uppercase font-black hover:bg-brand-yellow hover:text-brand-navy transition-none border-8 border-brand-navy shadow-[12px_12px_0px_0px_#0F0328] hover:shadow-[4px_4px_0px_0px_#0F0328] hover:translate-x-2 hover:translate-y-2 active:shadow-none active:translate-x-3 active:translate-y-3"
                                    >
                                        REBOOT TERMINAL
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="relative">
                                    {/* Terminal Header */}
                                    <div className="flex justify-between items-center border-b-8 border-brand-navy pb-6 mb-12">
                                        <div className="font-mono text-xl md:text-2xl uppercase font-black text-brand-navy bg-white px-4 py-2 border-4 border-brand-navy shadow-[4px_4px_0px_0px_#0F0328]">
                                            STEP {currentStep} OF 4
                                        </div>
                                        <div className="font-mono text-sm uppercase font-bold text-brand-navy/50 tracking-widest">
                                            TERMINAL_V2.4
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="min-h-[450px] flex flex-col justify-between">
                                        <AnimatePresence mode="wait">
                                            
                                            {/* STEP 1: Basic Info */}
                                            {currentStep === 1 && (
                                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <h2 className="text-6xl md:text-8xl font-black uppercase text-brand-navy leading-none tracking-tighter bg-brand-yellow inline-block px-4 border-4 border-brand-navy shadow-[6px_6px_0px_0px_#0F0328] mb-4">IDENTIFY.</h2>
                                                    </div>
                                                    <div className="space-y-12">
                                                        <div className="space-y-4">
                                                            <label className="font-mono text-xl uppercase font-black text-brand-navy flex gap-4 items-center">
                                                                <span className="bg-brand-navy text-white px-2 py-1">A</span> NAME
                                                            </label>
                                                            <div className="relative flex items-center">
                                                                <span className="absolute left-6 font-mono text-4xl text-brand-navy font-black">{'>'}</span>
                                                                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="DON DRAPER" className={`${inputClass} pl-16`} autoFocus />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <label className="font-mono text-xl uppercase font-black text-brand-navy flex gap-4 items-center">
                                                                <span className="bg-brand-navy text-white px-2 py-1">B</span> EMAIL
                                                            </label>
                                                            <div className="relative flex items-center">
                                                                <span className="absolute left-6 font-mono text-4xl text-brand-navy font-black">{'>'}</span>
                                                                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="DON@STERLINGCOOPER.COM" className={`${inputClass} pl-16`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-12">
                                                        <button type="button" onClick={nextStep} disabled={!isStep1Valid} className="w-full bg-brand-purple text-white px-12 py-8 font-mono text-3xl uppercase font-black transition-none border-8 border-brand-navy shadow-[12px_12px_0px_0px_#0F0328] disabled:opacity-50 disabled:pointer-events-none hover:bg-brand-navy hover:text-brand-yellow hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-3 active:translate-y-3 active:shadow-none">
                                                            ENGAGE →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: The Vibe */}
                                            {currentStep === 2 && (
                                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <h2 className="text-6xl md:text-8xl font-black uppercase text-brand-navy leading-none tracking-tighter bg-brand-yellow inline-block px-4 border-4 border-brand-navy shadow-[6px_6px_0px_0px_#0F0328] mb-4">MISSION.</h2>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                                className={`text-left p-8 border-8 border-brand-navy transition-none ${formData.vibe === option.label ? 'bg-brand-navy text-brand-yellow shadow-none translate-x-2 translate-y-2' : 'bg-white text-brand-navy hover:bg-brand-purple hover:text-white shadow-[8px_8px_0px_0px_#0F0328]'}`}
                                                            >
                                                                <h3 className="font-black text-4xl uppercase mb-4 leading-none">{option.label}</h3>
                                                                <p className="font-mono text-lg uppercase font-bold bg-black/10 inline-block px-2">{option.desc}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row gap-6">
                                                        <button type="button" onClick={prevStep} className="bg-white text-brand-navy border-8 border-brand-navy px-8 py-6 font-mono text-2xl uppercase font-black transition-none shadow-[8px_8px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            ← BACK
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep2Valid} className="flex-1 bg-brand-purple text-white px-12 py-6 font-mono text-2xl uppercase font-black transition-none border-8 border-brand-navy shadow-[12px_12px_0px_0px_#0F0328] disabled:opacity-50 disabled:pointer-events-none hover:bg-brand-navy hover:text-brand-yellow hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-3 active:translate-y-3 active:shadow-none">
                                                            CONFIRM →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: The Budget/Scale */}
                                            {currentStep === 3 && (
                                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <h2 className="text-6xl md:text-8xl font-black uppercase text-brand-navy leading-none tracking-tighter bg-brand-yellow inline-block px-4 border-4 border-brand-navy shadow-[6px_6px_0px_0px_#0F0328] mb-4">SCALE.</h2>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <div className="flex flex-col gap-6">
                                                            {['Under $5k (Seed)', '$5k - $15k (Growth)', '$15k - $30k (Scale)', '$30k+ (Enterprise)'].map((budget) => (
                                                                <button
                                                                    key={budget}
                                                                    type="button"
                                                                    onClick={() => setFormData({...formData, budget: budget})}
                                                                    className={`px-8 py-6 font-mono text-2xl md:text-3xl uppercase font-black border-8 transition-none text-left flex justify-between items-center ${formData.budget === budget ? 'bg-brand-navy border-brand-navy text-brand-yellow shadow-none translate-x-2 translate-y-2' : 'bg-white border-brand-navy text-brand-navy hover:bg-brand-purple hover:text-white shadow-[8px_8px_0px_0px_#0F0328]'}`}
                                                                >
                                                                    {budget}
                                                                    {formData.budget === budget && <span className="text-4xl text-brand-yellow">X</span>}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row gap-6">
                                                        <button type="button" onClick={prevStep} className="bg-white text-brand-navy border-8 border-brand-navy px-8 py-6 font-mono text-2xl uppercase font-black transition-none shadow-[8px_8px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            ← BACK
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep3Valid} className="flex-1 bg-brand-purple text-white px-12 py-6 font-mono text-2xl uppercase font-black transition-none border-8 border-brand-navy shadow-[12px_12px_0px_0px_#0F0328] disabled:opacity-50 disabled:pointer-events-none hover:bg-brand-navy hover:text-brand-yellow hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-3 active:translate-y-3 active:shadow-none">
                                                            CONFIRM →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 4: The Story */}
                                            {currentStep === 4 && (
                                                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <h2 className="text-6xl md:text-8xl font-black uppercase text-brand-navy leading-none tracking-tighter bg-brand-yellow inline-block px-4 border-4 border-brand-navy shadow-[6px_6px_0px_0px_#0F0328] mb-4">DATA.</h2>
                                                    </div>
                                                    <div className="space-y-6 relative">
                                                        <div className="absolute top-0 left-0 w-12 h-12 bg-brand-navy flex justify-center items-center text-white font-mono font-black z-10 border-b-4 border-r-4 border-brand-navy">TXT</div>
                                                        <textarea 
                                                            name="message" 
                                                            required 
                                                            value={formData.message} 
                                                            onChange={handleChange} 
                                                            placeholder="GIVE US THE RAW DATA. WHAT'S THE TIMELINE? WHAT'S THE CORE STRUGGLE? [NO FLUFF]" 
                                                            className="w-full bg-white border-8 border-brand-navy pt-16 p-8 font-mono text-2xl text-brand-navy uppercase placeholder-brand-navy/30 min-h-[350px] resize-y focus:outline-none focus:bg-[#f0f0f0] transition-none shadow-[12px_12px_0px_0px_#0F0328]" 
                                                        />
                                                    </div>

                                                    <div className="pt-8 flex flex-col-reverse md:flex-row gap-6">
                                                        <button type="button" onClick={prevStep} className="bg-white text-brand-navy border-8 border-brand-navy px-8 py-6 font-mono text-2xl uppercase font-black transition-none shadow-[8px_8px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            ← BACK
                                                        </button>
                                                        <button type="submit" disabled={status === 'submitting' || !isStep4Valid} className="flex-1 bg-brand-navy text-brand-yellow px-12 py-6 font-mono text-3xl uppercase font-black transition-none border-8 border-brand-navy shadow-[12px_12px_0px_0px_#A882DD] disabled:opacity-50 disabled:pointer-events-none hover:bg-brand-purple hover:text-white hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-3 active:translate-y-3 active:shadow-none">
                                                            {status === 'submitting' ? 'UPLOADING...' : 'TRANSMIT BRIEF'}
                                                        </button>
                                                    </div>
                                                    {status === 'error' && (
                                                        <div className="bg-[#FF0000] border-8 border-brand-navy p-6 mt-6 shadow-[8px_8px_0px_0px_#0F0328] text-center">
                                                            <p className="text-white font-mono text-2xl uppercase font-black blink">SYSTEM ERROR. EMAIL HEY@COOLO.CO.NZ.</p>
                                                        </div>
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
                    <div className="bg-brand-purple border-8 border-brand-navy p-10 md:p-16 text-left shadow-[24px_24px_0px_0px_#0F0328] relative overflow-hidden group">
                        
                        {/* Decorative Barcode / Arrow */}
                        <div className="absolute top-0 right-0 w-32 h-full hidden md:flex flex-col justify-between p-4 border-l-8 border-brand-navy bg-brand-navy text-brand-yellow opacity-10 group-hover:opacity-100 transition-opacity">
                            <span className="text-8xl font-black">↓</span>
                            <span className="text-8xl font-black">↓</span>
                            <span className="text-8xl font-black">↓</span>
                        </div>

                        <h3 className="text-6xl md:text-8xl font-black uppercase mb-6 text-white tracking-tighter leading-none bg-brand-navy inline-block p-4 border-4 border-white shadow-[8px_8px_0px_0px_#FFFFFF]">
                            COMM.
                        </h3>
                        <p className="font-mono font-black text-2xl md:text-3xl text-brand-navy mb-12 uppercase max-w-lg bg-brand-yellow p-4 border-4 border-brand-navy">
                            SKIP THE FORMS. ESTABLISH A DIRECT VIDEO LINK.
                        </p>
                        <button className="bg-white text-brand-navy border-8 border-brand-navy px-12 py-8 font-mono text-3xl md:text-4xl uppercase font-black transition-none shadow-[12px_12px_0px_0px_#0F0328] hover:bg-brand-navy hover:text-brand-yellow hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-3 active:translate-y-3 active:shadow-none inline-block w-full text-center md:w-auto">
                            OPEN CALENDAR
                        </button>
                    </div>

                </div>
            </div>
        </AnimatedSection>
        
        {/* --- FAQ SECTION (Brutalist Table/Accordion) --- */}
        <AnimatedSection>
            <div className="mt-40 xl:mt-64 pt-24">
                <header className="mb-24 text-left max-w-5xl">
                    <span className="font-mono text-brand-navy bg-white border-4 border-brand-navy px-6 py-2 uppercase tracking-[0.3em] text-sm font-black inline-flex items-center gap-4 mb-8 shadow-[6px_6px_0px_0px_#0F0328]">
                        <span className="w-4 h-4 rounded-full bg-brand-yellow border-2 border-brand-navy"></span>
                        The Fine Print
                    </span>
                    <h2 className="text-[14vw] md:text-[11rem] font-black uppercase tracking-tighter text-brand-navy leading-[0.8] m-0 bg-brand-offwhite border-8 border-brand-navy inline-block p-8 shadow-[24px_24px_0px_0px_#0F0328]">
                        RAW<br/>DATA.
                    </h2>
                    <div className="mt-16 bg-brand-navy p-8 border-4 border-brand-navy shadow-[12px_12px_0px_0px_#A882DD]">
                        <p className="font-mono text-2xl md:text-4xl text-brand-yellow font-black leading-tight uppercase m-0">
                            NO JARGON. NO FLUFF. JUST THE TRUTH ON HOW WE OPERATE, WHAT WE CHARGE, AND WHY.
                        </p>
                    </div>
                </header>

                <div className="space-y-0 border-8 border-brand-navy bg-brand-offwhite shadow-[24px_24px_0px_0px_#0F0328]">
                    {QA_DATA.map((section, i) => (
                        <div key={i} className="border-b-8 border-brand-navy last:border-b-0">
                            
                            {/* Section Header */}
                            <div className="bg-brand-navy text-brand-yellow p-6 md:p-10 border-b-8 border-brand-navy flex items-center gap-8">
                                <span className="text-5xl md:text-8xl font-black border-r-8 border-brand-yellow pr-8">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-black uppercase tracking-tight text-4xl md:text-6xl m-0 leading-none">
                                    {section.category}
                                </h3>
                            </div>
                            
                            <div className="bg-brand-offwhite">
                                {section.questions.map((item, j) => {
                                    const faqId = `${i}-${j}`;
                                    const isExpanded = openFaq === faqId;

                                    return (
                                        <div 
                                            key={j} 
                                            className={`group border-b-8 border-brand-navy last:border-b-0 transition-colors ${isExpanded ? 'bg-brand-yellow' : 'bg-white hover:bg-brand-yellow/50'}`}
                                        >
                                            <button 
                                                onClick={() => toggleFaq(faqId)}
                                                className="w-full text-left p-8 md:p-12 flex justify-between items-start md:items-center gap-8 cursor-pointer focus:outline-none transition-none"
                                            >
                                                <h4 className="text-3xl md:text-5xl font-black uppercase text-brand-navy leading-tight tracking-tighter m-0 flex-1">
                                                    {item.q}
                                                </h4>
                                                <span className={`text-6xl md:text-8xl text-brand-navy font-black flex-shrink-0 leading-none transition-transform duration-300 ${isExpanded ? 'rotate-45 text-brand-purple' : ''}`}>
                                                    +
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-brand-navy"
                                                    >
                                                        <div className="p-8 md:p-16 border-t-8 border-brand-navy text-white relative">
                                                            {/* Terminal line decoration */}
                                                            <div className="absolute top-0 left-8 bottom-0 w-2 bg-brand-purple"></div>
                                                            <p className="font-mono font-black text-2xl md:text-3xl leading-relaxed uppercase pl-8 m-0">
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