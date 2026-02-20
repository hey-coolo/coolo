import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

// --- NEW FAQ COPY ---
const CONTACT_FAQS = [
  {
    q: "Do you just design logos and websites?",
    a: "No. A logo is just a badge if there is no thinking behind it. We start with Brand Strategy to define who you actually are, and then move into Design Execution to build the systems we’ve imagined together. We build brands that last."
  },
  {
    q: "Will my project be handed off to a junior designer?",
    a: "Never. That is the classic agency bait-and-switch. When you work with COOLO, you are working with experienced creatives. The people you talk to in the kickoff meeting are the hands actually doing the work."
  },
  {
    q: "What do we actually get at the end of this?",
    a: "You don't just get a zipped folder of assets and a \"good luck.\" Depending on the scope, we build out \"Brand Culture\" Workbooks and Playbooks so your team actually knows how to use the systems we build."
  },
  {
    q: "Do I own the files at the end?",
    a: "You own the final brand. Once the last invoice is paid, you get all the final, ready-to-use assets and the full rights to use them. What we keep are our raw working files—the messy background layers. You own the finished product, we keep our tools."
  },
  {
    q: "Can you turn this around in a couple of weeks?",
    a: "If you want rushed, trend-chasing work, we aren't the right fit. We come from a time when you had to get it right on the first take. We set realistic timelines because the hardest thing to do is keep it simple, and that takes time."
  },
  {
    q: "What is it like working with you?",
    a: "We treat our process like an Open Studio Door. It’s a workspace, not a museum where everything is hidden behind glass. You will see the wireframes, the raw files, and the layers as we build. We share our perspective, not a rulebook."
  },
  {
    q: "Do you work with startups or just established brands?",
    a: "Both. We don't filter by company size; we filter by mindset. We like working with real people. We build relationships first, and the business follows the trust. If you care about the craft as much as we do, we will figure out the rest."
  }
];

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    situation: '',
    needs: [] as string[],
    budget: ''
  });
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleNeed = (need: string) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need) 
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('API Error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  // Validation logic
  const isStep1Valid = formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.email.trim() !== '';
  const isStep2Valid = formData.situation.trim() !== '';
  const isStep3Valid = formData.needs.length > 0;
  const isStep4Valid = formData.budget !== '';

  const inputClass = "bg-transparent border-b-[1px] border-brand-navy/30 text-brand-navy font-sans text-3xl md:text-5xl focus:border-brand-navy focus:outline-none placeholder-brand-navy/20 w-full py-4 transition-colors rounded-none";

  const stepVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-brand-yellow min-h-screen flex flex-col font-sans selection:bg-brand-navy selection:text-brand-yellow text-brand-navy">
      <Header />
      
      <main className="container mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-32 flex-grow max-w-[1600px]">
        <AnimatedSection>
            
            {/* --- EDITORIAL GRID --- */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
                
                {/* --- LEFT COL: MASSIVE TYPOGRAPHY --- */}
                <div className="xl:col-span-5 xl:sticky xl:top-48 z-10">
                    <p className="font-mono uppercase tracking-widest text-xs font-bold mb-8">
                        01 / Initiation
                    </p>
                    <h1 className="text-[15vw] xl:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] break-words m-0">
                        Brief<br/>Us.
                    </h1>
                </div>

                {/* --- RIGHT COL: EDITORIAL FORM --- */}
                <div className="xl:col-span-7 w-full max-w-3xl mx-auto xl:mx-0 xl:ml-auto">
                    
                    <div className="relative mb-24">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-start py-12"
                                >
                                    <h2 className="text-6xl md:text-8xl font-black uppercase mb-6 leading-[0.85] tracking-tighter">
                                        Brief<br/>Received.
                                    </h2>
                                    <p className="text-xl md:text-2xl font-medium max-w-lg mb-12">
                                        Your information is in our system. One of our directors will review the details and reach out within 24 hours.
                                    </p>
                                    
                                    <div className="w-full border-t-[1px] border-brand-navy pt-8 flex justify-between items-end font-mono uppercase text-sm">
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
                                            setFormData({ firstName: '', lastName: '', email: '', company: '', situation: '', needs: [], budget: '' });
                                        }}
                                        className="mt-16 text-sm font-mono uppercase tracking-widest border-b-[1px] border-brand-navy pb-1 hover:opacity-50 transition-opacity font-bold"
                                    >
                                        Start Over
                                    </button>
                                </motion.div>
                            ) : (
                                <div>
                                    {/* Minimal Step Indicator */}
                                    <div className="flex items-center justify-between border-b-[1px] border-brand-navy pb-4 mb-16">
                                        <span className="font-mono text-sm uppercase tracking-widest font-bold">Step {currentStep} of 4</span>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(step => (
                                                <div 
                                                    key={step} 
                                                    className={`w-12 h-[2px] transition-all duration-300 ${step <= currentStep ? 'bg-brand-navy' : 'bg-brand-navy/20'}`} 
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
                                                        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter">The Introduction.</h2>
                                                    </div>
                                                    <div className="space-y-10">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                            <div className="space-y-2">
                                                                <label className="font-mono text-xs uppercase tracking-widest font-bold opacity-50">First Name</label>
                                                                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="Don" className={inputClass} autoFocus />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="font-mono text-xs uppercase tracking-widest font-bold opacity-50">Last Name</label>
                                                                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Draper" className={inputClass} />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-mono text-xs uppercase tracking-widest font-bold opacity-50">Email</label>
                                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="don@scdp.com" className={inputClass} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-mono text-xs uppercase tracking-widest font-bold opacity-50">Brand / Company Name</label>
                                                            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Sterling Cooper" className={inputClass} />
                                                        </div>
                                                    </div>
                                                    <div className="pt-8">
                                                        <button type="button" onClick={nextStep} disabled={!isStep1Valid} className="bg-brand-navy text-brand-yellow px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-brand-navy transition-colors disabled:opacity-30 disabled:pointer-events-none w-full md:w-auto">
                                                            Next Step →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: The Situation */}
                                            {currentStep === 2 && (
                                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter">What's the reality?</h2>
                                                        <p className="mt-4 font-mono text-sm uppercase tracking-widest opacity-60 font-bold max-w-lg leading-relaxed">
                                                            Don't write us a novel. Just give us the raw brief. What are you building, what's broken, or what needs a redesign?
                                                        </p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <textarea 
                                                            name="situation" 
                                                            required 
                                                            value={formData.situation} 
                                                            onChange={handleChange} 
                                                            placeholder="The situation is..." 
                                                            className="w-full bg-transparent border-b-[1px] border-brand-navy/30 py-4 font-sans text-2xl md:text-3xl placeholder-brand-navy/20 min-h-[250px] resize-y focus:outline-none focus:border-brand-navy transition-colors" 
                                                        />
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t-[1px] border-brand-navy/20">
                                                        <button type="button" onClick={prevStep} className="font-mono text-sm uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity">
                                                            ← Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep2Valid} className="bg-brand-navy text-brand-yellow px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-brand-navy transition-colors disabled:opacity-30 disabled:pointer-events-none w-full md:w-auto">
                                                            Next Step →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: The Need */}
                                            {currentStep === 3 && (
                                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter">Where do you need us?</h2>
                                                        <p className="mt-4 font-mono text-sm uppercase tracking-widest opacity-60 font-bold">(Select all that apply)</p>
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        {[
                                                            'Brand Strategy',
                                                            'Design Execution',
                                                            'Brand Culture / Playbooks',
                                                            "Not sure yet, let's talk"
                                                        ].map((need) => {
                                                            const isSelected = formData.needs.includes(need);
                                                            return (
                                                                <button
                                                                    key={need}
                                                                    type="button"
                                                                    onClick={() => toggleNeed(need)}
                                                                    className={`flex items-center gap-6 p-6 border-[1px] transition-colors text-left ${isSelected ? 'border-brand-navy bg-brand-navy text-brand-yellow' : 'border-brand-navy/20 hover:border-brand-navy'}`}
                                                                >
                                                                    <div className={`w-6 h-6 border-[1px] flex items-center justify-center transition-colors ${isSelected ? 'border-brand-yellow' : 'border-brand-navy/30'}`}>
                                                                        {isSelected && <div className="w-3 h-3 bg-brand-yellow" />}
                                                                    </div>
                                                                    <span className="font-black text-2xl md:text-3xl uppercase tracking-tight">{need}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t-[1px] border-brand-navy/20">
                                                        <button type="button" onClick={prevStep} className="font-mono text-sm uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity">
                                                            ← Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} disabled={!isStep3Valid} className="bg-brand-navy text-brand-yellow px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-brand-navy transition-colors disabled:opacity-30 disabled:pointer-events-none w-full md:w-auto">
                                                            Next Step →
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 4: Commercial Reality */}
                                            {currentStep === 4 && (
                                                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                                                    <div>
                                                        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter">What's the commercial reality?</h2>
                                                        <p className="mt-4 font-mono text-sm uppercase tracking-widest opacity-60 font-bold max-w-lg leading-relaxed">
                                                            Good work takes time, and we don't guess. Where is your budget sitting for this project?
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        {[
                                                            'Under $5k',
                                                            '$5k - $10k',
                                                            '$10k - $25k',
                                                            '$30k+',
                                                            'Just exploring right now'
                                                        ].map((budget) => (
                                                            <button
                                                                key={budget}
                                                                type="button"
                                                                onClick={() => setFormData({...formData, budget: budget})}
                                                                className={`flex items-center gap-6 p-6 border-[1px] transition-colors text-left ${formData.budget === budget ? 'border-brand-navy bg-brand-navy text-brand-yellow' : 'border-brand-navy/20 hover:border-brand-navy'}`}
                                                            >
                                                                <div className={`w-6 h-6 rounded-full border-[1px] flex items-center justify-center transition-colors ${formData.budget === budget ? 'border-brand-yellow' : 'border-brand-navy/30'}`}>
                                                                    {formData.budget === budget && <div className="w-3 h-3 rounded-full bg-brand-yellow" />}
                                                                </div>
                                                                <span className="font-sans font-medium text-xl md:text-2xl">{budget}</span>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t-[1px] border-brand-navy/20">
                                                        <button type="button" onClick={prevStep} className="font-mono text-sm uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity">
                                                            ← Back
                                                        </button>
                                                        <button type="submit" disabled={status === 'submitting' || !isStep4Valid} className="bg-brand-navy text-brand-yellow px-12 py-6 font-mono text-lg md:text-xl uppercase tracking-widest font-black hover:bg-white hover:text-brand-navy transition-colors disabled:opacity-50 disabled:pointer-events-none w-full md:w-auto">
                                                            {status === 'submitting' ? 'SENDING...' : 'SEND THE BRIEF.'}
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

                    {/* --- DIRECT CALENDAR LINK --- */}
                    <div className="border-t-[1px] border-brand-navy pt-16 mt-16 text-left">
                        <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">Or bypass the forms.</h3>
                        <p className="font-sans text-xl md:text-2xl font-medium mb-10 max-w-lg opacity-80">
                            Book a slot directly in our calendar for a video call. Let's talk face to face.
                        </p>
                        <button className="bg-transparent border-[1px] border-brand-navy text-brand-navy px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy hover:text-brand-yellow transition-colors inline-block">
                            Open Calendar
                        </button>
                    </div>

                </div>
            </div>
        </AnimatedSection>
        
        {/* --- FAQ SECTION (Ultra Minimal) --- */}
        <AnimatedSection>
            <div className="mt-40 xl:mt-64 pt-24 border-t-[1px] border-brand-navy">
                <header className="mb-24 text-left max-w-4xl">
                    <p className="font-mono uppercase tracking-widest text-xs font-bold mb-8">
                        02 / The Fine Print
                    </p>
                    <h2 className="text-[12vw] md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] m-0">
                        The<br/>Truth.
                    </h2>
                </header>

                <div className="space-y-0 border-t-[1px] border-brand-navy">
                    {CONTACT_FAQS.map((item, index) => {
                        const isExpanded = openFaq === index;

                        return (
                            <div 
                                key={index} 
                                className="border-b-[1px] border-brand-navy"
                            >
                                <button 
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left py-10 md:py-16 flex justify-between items-start md:items-center gap-8 cursor-pointer focus:outline-none group hover:opacity-50 transition-opacity"
                                >
                                    <h4 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter m-0 pr-8">
                                        {item.q}
                                    </h4>
                                    <span className={`text-4xl md:text-6xl font-light flex-shrink-0 transition-transform duration-500 ${isExpanded ? 'rotate-45' : ''}`}>
                                        +
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-16 max-w-4xl">
                                                <p className="font-sans font-medium text-2xl md:text-3xl leading-relaxed">
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
        </AnimatedSection>
      </main>
    </div>
  );
};

export default ContactPage;