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

  const inputClass = "bg-transparent border-b-4 border-brand-navy text-brand-navy font-mono text-3xl md:text-5xl focus:border-brand-purple focus:outline-none placeholder-brand-navy/20 w-full py-4 transition-none uppercase rounded-none";

  // Animation variants - snappier for brutalist feel
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "circOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="bg-brand-yellow min-h-screen flex flex-col font-sans selection:bg-brand-navy selection:text-brand-yellow">
      <Header />
      
      <main className="container mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-32 flex-grow max-w-[1600px]">
        <AnimatedSection>
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
                
                {/* --- LEFT COL: MASSIVE TITLE --- */}
                <div className="xl:col-span-5 xl:sticky xl:top-48 z-10">
                    <span className="font-mono text-brand-navy border-4 border-brand-navy px-4 py-2 uppercase tracking-[0.2em] text-sm font-black inline-block mb-8 bg-white shadow-[4px_4px_0px_0px_#0F0328]">
                        Initiation
                    </span>
                    <h1 className="text-[18vw] xl:text-[9rem] font-black uppercase tracking-tighter text-brand-navy leading-[0.8] break-words m-0">
                        Brief<br/>Us.
                    </h1>
                    <p className="mt-8 text-2xl md:text-3xl text-brand-navy font-bold leading-tight max-w-lg font-mono">
                        NO SMALL TALK. TELL US WHAT YOU'RE BUILDING, WHAT'S BROKEN, OR WHAT YOU'RE DREAMING ABOUT.
                    </p>
                </div>

                {/* --- RIGHT COL: NEO-BRUTALIST FORM --- */}
                <div className="xl:col-span-7 w-full max-w-3xl mx-auto xl:mx-0 xl:ml-auto">
                    
                    <div className={`relative transition-none bg-white border-4 border-brand-navy p-8 md:p-16 shadow-[16px_16px_0px_0px_#0F0328] mb-16 ${status === 'success' ? 'min-h-[60vh] flex flex-col justify-center' : ''}`}>
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-start bg-white"
                                >
                                    <div className="w-24 h-24 bg-brand-yellow border-4 border-brand-navy flex items-center justify-center mb-12 shadow-[8px_8px_0px_0px_#0F0328]">
                                        <span className="text-6xl text-brand-navy font-black">✓</span>
                                    </div>
                                    <h2 className="text-6xl md:text-8xl font-black uppercase text-brand-navy mb-6 leading-[0.85] tracking-tighter">
                                        Data<br/>Received.
                                    </h2>
                                    <p className="font-mono text-xl text-brand-navy max-w-md mb-12 font-bold uppercase">
                                        Your brief has hit our mainframe. Expect contact within 24 hours.
                                    </p>
                                    <div className="bg-brand-offwhite border-4 border-brand-navy p-8 w-full font-mono">
                                        <p className="text-sm uppercase tracking-widest text-brand-navy font-black mb-2 border-b-2 border-brand-navy/20 pb-2">Thread Reference</p>
                                        <p className="text-3xl font-black text-brand-navy mb-8">#COOLO_{Math.floor(Math.random() * 100000)}</p>
                                        
                                        <p className="text-sm uppercase tracking-widest text-brand-navy font-black mb-2 border-b-2 border-brand-navy/20 pb-2">Status</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            <span className="w-4 h-4 bg-[#00FF00] border-2 border-brand-navy"></span>
                                            <span className="text-xl font-black text-brand-navy uppercase">Analyzing Payload</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setStatus('idle');
                                            setCurrentStep(1);
                                            setFormData({ name: '', email: '', vibe: '', budget: '', message: '' });
                                        }}
                                        className="mt-12 bg-brand-navy text-brand-yellow px-8 py-4 font-mono text-lg uppercase font-black hover:bg-brand-purple hover:text-white transition-none border-4 border-brand-navy shadow-[8px_8px_0px_0px_#0F0328] hover:shadow-[4px_4px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2"
                                    >
                                        Start Over
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="relative">
                                    {/* Form Progress Indicator (Brutalist blocks) */}
                                    <div className="flex items-center gap-0 mb-16 border-4 border-brand-navy bg-brand-navy/5 p-1 h-8">
                                        {[1, 2, 3, 4].map(step => (
                                            <div 
                                                key={step} 
                                                className={`h-full flex-1 transition-all duration-300 ${step <= currentStep ? 'bg-brand-navy' : 'bg-transparent'} ${step < 4 ? 'border-r-4 border-brand-navy' : ''}`} 
                                            />
                                        ))}
                                    </div>

                                    <form onSubmit={handleSubmit} className="min-h-[400px] flex flex-col justify-between">
                                        <AnimatePresence mode="wait">
                                            
                                            {/* STEP 1: Basic Info */}
                                            {currentStep === 1 && (
                                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <p className="font-mono text-xl uppercase tracking-widest text-brand-navy font-black mb-4">01 / 04</p>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-navy leading-none tracking-tighter">Identify<br/>Yourself.</h2>
                                                    </div>
                                                    <div className="space-y-12">
                                                        <div className="space-y-4">
                                                            <label className="font-mono text-lg uppercase font-black text-brand-navy">Name</label>
                                                            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="DON DRAPER" className={inputClass} autoFocus />
                                                        </div>
                                                        <div className="space-y-4">
                                                            <label className="font-mono text-lg uppercase font-black text-brand-navy">Email</label>
                                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="DON@STERLINGCOOPER.COM" className={inputClass} />
                                                        </div>
                                                    </div>
                                                    <div className="pt-8">
                                                        <button type="button" onClick={nextStep} disabled={!isStep1Valid} className="w-full md:w-auto bg-brand-navy text-brand-yellow px-12 py-6 font-mono text-xl uppercase font-black hover:bg-brand-purple hover:text-white transition-none border-4 border-brand-navy shadow-[8px_8px_0px_0px_#0F0328] disabled:opacity-50 disabled:pointer-events-none hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            Next: Mission →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: The Vibe */}
                                            {currentStep === 2 && (
                                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <p className="font-mono text-xl uppercase tracking-widest text-brand-navy font-black mb-4">02 / 04</p>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-navy leading-none tracking-tighter">The<br/>Mission.</h2>
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
                                                                className={`text-left p-8 border-4 border-brand-navy transition-none ${formData.vibe === option.label ? 'bg-brand-navy text-brand-yellow shadow-[6px_6px_0px_0px_#A882DD]' : 'bg-brand-offwhite text-brand-navy hover:bg-brand-purple hover:text-white shadow-[6px_6px_0px_0px_#0F0328]'}`}
                                                            >
                                                                <h3 className="font-black text-3xl uppercase mb-2 leading-none">{option.label}</h3>
                                                                <p className="font-mono text-sm uppercase font-bold">{option.desc}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row gap-6">
                                                        <button type="button" onClick={prevStep} className="bg-transparent text-brand-navy border-4 border-brand-navy px-8 py-6 font-mono text-xl uppercase font-black hover:bg-brand-offwhite transition-none shadow-[8px_8px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            ← Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep2Valid} className="flex-1 bg-brand-navy text-brand-yellow px-12 py-6 font-mono text-xl uppercase font-black hover:bg-brand-purple hover:text-white transition-none border-4 border-brand-navy shadow-[8px_8px_0px_0px_#0F0328] disabled:opacity-50 disabled:pointer-events-none hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            Next: Scale →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: The Budget/Scale */}
                                            {currentStep === 3 && (
                                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <p className="font-mono text-xl uppercase tracking-widest text-brand-navy font-black mb-4">03 / 04</p>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-navy leading-none tracking-tighter">The<br/>Scale.</h2>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <div className="flex flex-col gap-4">
                                                            {['Under $5k (Seed)', '$5k - $15k (Growth)', '$15k - $30k (Scale)', '$30k+ (Enterprise)'].map((budget) => (
                                                                <button
                                                                    key={budget}
                                                                    type="button"
                                                                    onClick={() => setFormData({...formData, budget: budget})}
                                                                    className={`px-8 py-6 font-mono text-xl md:text-2xl uppercase font-black border-4 transition-none text-left ${formData.budget === budget ? 'bg-brand-navy border-brand-navy text-brand-yellow shadow-[6px_6px_0px_0px_#A882DD]' : 'bg-brand-offwhite border-brand-navy text-brand-navy hover:bg-brand-purple hover:text-white shadow-[6px_6px_0px_0px_#0F0328]'}`}
                                                                >
                                                                    {budget}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row gap-6">
                                                        <button type="button" onClick={prevStep} className="bg-transparent text-brand-navy border-4 border-brand-navy px-8 py-6 font-mono text-xl uppercase font-black hover:bg-brand-offwhite transition-none shadow-[8px_8px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            ← Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep3Valid} className="flex-1 bg-brand-navy text-brand-yellow px-12 py-6 font-mono text-xl uppercase font-black hover:bg-brand-purple hover:text-white transition-none border-4 border-brand-navy shadow-[8px_8px_0px_0px_#0F0328] disabled:opacity-50 disabled:pointer-events-none hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            Next: Details →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 4: The Story */}
                                            {currentStep === 4 && (
                                                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <p className="font-mono text-xl uppercase tracking-widest text-brand-navy font-black mb-4">04 / 04</p>
                                                        <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-navy leading-none tracking-tighter">The<br/>Details.</h2>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <textarea 
                                                            name="message" 
                                                            required 
                                                            value={formData.message} 
                                                            onChange={handleChange} 
                                                            placeholder="GIVE US THE RAW DATA. WHAT'S THE TIMELINE? WHAT'S THE CORE STRUGGLE?" 
                                                            className="w-full bg-brand-offwhite border-4 border-brand-navy p-8 font-mono text-xl text-brand-navy uppercase placeholder-brand-navy/30 min-h-[300px] resize-y focus:outline-none focus:bg-white transition-none shadow-[8px_8px_0px_0px_#0F0328]" 
                                                        />
                                                    </div>

                                                    <div className="pt-8 flex flex-col-reverse md:flex-row gap-6">
                                                        <button type="button" onClick={prevStep} className="bg-transparent text-brand-navy border-4 border-brand-navy px-8 py-6 font-mono text-xl uppercase font-black hover:bg-brand-offwhite transition-none shadow-[8px_8px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            ← Back
                                                        </button>
                                                        <button type="submit" disabled={status === 'submitting' || !isStep4Valid} className="flex-1 bg-brand-purple text-brand-offwhite px-12 py-6 font-mono text-2xl uppercase font-black hover:bg-brand-navy transition-none border-4 border-brand-navy shadow-[8px_8px_0px_0px_#0F0328] disabled:opacity-50 disabled:pointer-events-none hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none">
                                                            {status === 'submitting' ? 'SENDING...' : 'TRANSMIT BRIEF'}
                                                        </button>
                                                    </div>
                                                    {status === 'error' && (
                                                        <div className="bg-red-500 border-4 border-brand-navy p-6 mt-6 shadow-[8px_8px_0px_0px_#0F0328]">
                                                            <p className="text-white font-mono text-lg uppercase font-black">SYSTEM ERROR. EMAIL HEY@COOLO.CO.NZ DIRECTLY.</p>
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
                    <div className="bg-brand-purple border-4 border-brand-navy p-10 md:p-16 text-left shadow-[16px_16px_0px_0px_#0F0328]">
                        <h3 className="text-5xl md:text-7xl font-black uppercase mb-6 text-white tracking-tighter leading-none">Book<br/>Comm.</h3>
                        <p className="font-mono font-bold text-xl text-white/90 mb-10 uppercase max-w-lg">
                            SKIP THE FORMS. ESTABLISH A DIRECT VIDEO LINK WITH THE STUDIO.
                        </p>
                        <button className="bg-white text-brand-navy border-4 border-brand-navy px-12 py-6 font-mono text-xl uppercase font-black hover:bg-brand-yellow transition-none shadow-[8px_8px_0px_0px_#0F0328] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#0F0328] active:translate-x-2 active:translate-y-2 active:shadow-none inline-block">
                            OPEN CALENDAR
                        </button>
                    </div>

                </div>
            </div>
        </AnimatedSection>
        
        {/* --- FAQ SECTION (Brutalist Table/Accordion) --- */}
        <AnimatedSection>
            <div className="mt-40 xl:mt-64 border-t-8 border-brand-navy pt-24">
                <header className="mb-24 text-left max-w-4xl">
                    <span className="font-mono text-brand-navy bg-white border-4 border-brand-navy px-4 py-2 uppercase tracking-[0.2em] text-sm font-black inline-block mb-8 shadow-[4px_4px_0px_0px_#0F0328]">
                        The Fine Print
                    </span>
                    <h2 className="text-[12vw] md:text-[8rem] font-black uppercase tracking-tighter text-brand-navy leading-[0.85] m-0">
                        RAW<br/>DATA.
                    </h2>
                    <p className="font-mono text-2xl md:text-3xl text-brand-navy font-bold mt-12 leading-tight uppercase">
                        NO JARGON. NO FLUFF. JUST THE TRUTH ON HOW WE OPERATE, WHAT WE CHARGE, AND WHY.
                    </p>
                </header>

                <div className="space-y-0 border-4 border-brand-navy bg-white shadow-[16px_16px_0px_0px_#0F0328]">
                    {QA_DATA.map((section, i) => (
                        <div key={i} className="border-b-4 border-brand-navy last:border-b-0">
                            
                            {/* Section Header */}
                            <div className="bg-brand-navy text-brand-yellow p-6 md:p-8 border-b-4 border-brand-navy flex items-center gap-6">
                                <span className="text-4xl md:text-6xl font-black">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-black uppercase tracking-tight text-3xl md:text-5xl m-0 leading-none">
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
                                            className="group border-b-4 border-brand-navy last:border-b-0 bg-white"
                                        >
                                            <button 
                                                onClick={() => toggleFaq(faqId)}
                                                className="w-full text-left p-6 md:p-10 flex justify-between items-start md:items-center gap-8 cursor-pointer focus:outline-none hover:bg-brand-yellow transition-none"
                                            >
                                                <h4 className="text-2xl md:text-4xl font-black uppercase text-brand-navy leading-tight tracking-tighter m-0">
                                                    {item.q}
                                                </h4>
                                                <span className="text-5xl md:text-6xl text-brand-navy font-black flex-shrink-0 leading-none">
                                                    {isExpanded ? '−' : '+'}
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
                                                        <div className="p-6 md:p-10 border-t-4 border-brand-navy text-white">
                                                            <p className="font-mono font-bold text-xl md:text-2xl leading-relaxed uppercase">
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