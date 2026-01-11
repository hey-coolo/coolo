import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    role: '',
    problem: '',
    goal: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.currentTarget.tagName === 'TEXTAREA' && !e.metaKey && !e.ctrlKey) {
        return;
      }
      e.preventDefault(); 
      if (step === 5) {
        handleTransmission();
      } else {
        handleNext();
      }
    }
  };

  const handleTransmission = async () => {
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus('error');
    }
  };

  const inputClass = "bg-transparent border-b-4 border-brand-purple/30 text-brand-navy font-black focus:border-brand-purple focus:outline-none placeholder-brand-navy/20 w-full transition-all duration-300";

  return (
    <div className="bg-brand-offwhite pt-32 min-h-screen flex flex-col">
      <div className="container mx-auto px-8 flex-grow flex flex-col justify-center">
        
        <AnimatedSection>
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold block mb-4">Discovery</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.95]">
                        {status === 'success' ? 'We Got It.' : 'Let\'s Talk.'}
                    </h1>
                </header>

                <div className="bg-white border border-brand-navy/10 p-8 md:p-16 shadow-2xl min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                    
                    {status !== 'success' && (
                        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] uppercase tracking-widest opacity-30">
                            Step 0{step + 1} / 06
                        </div>
                    )}

                    <form onSubmit={(e) => e.preventDefault()} className="relative z-10 h-full flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            
                            {/* SUCCESS STATE */}
                            {status === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-8">
                                        <svg className="w-10 h-10 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black uppercase text-brand-navy leading-none mb-6">Received.</h3>
                                    <p className="font-body text-xl text-brand-navy/60 max-w-lg mx-auto mb-12">
                                        Your brief is logged. We'll take a look and get back to you within 24 hours.
                                    </p>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="font-mono text-xs uppercase tracking-widest text-brand-purple border-b border-brand-purple pb-1 hover:text-brand-navy hover:border-brand-navy transition-colors"
                                    >
                                        Start New Message
                                    </button>
                                </motion.div>
                            )}

                            {/* STEP 0: NAME */}
                            {status !== 'success' && step === 0 && (
                                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        First up, who are you? <br/>
                                        I am <input 
                                            autoFocus
                                            type="text" 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown} 
                                            placeholder="[YOUR NAME]" 
                                            className={`${inputClass} inline-block w-auto min-w-[300px]`}
                                        />.
                                    </label>
                                    <div className="mt-4 text-xs font-mono text-brand-navy/40 uppercase tracking-widest">[Press Enter]</div>
                                </motion.div>
                            )}

                            {/* STEP 1: BUSINESS */}
                            {status !== 'success' && step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        I am operating on behalf of <br/>
                                        <input 
                                            autoFocus
                                            type="text" 
                                            name="business" 
                                            value={formData.business} 
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="[BUSINESS NAME]" 
                                            className={`${inputClass} inline-block w-auto min-w-[400px]`}
                                        /> <br/>
                                        where I serve as the <input 
                                            type="text" 
                                            name="role" 
                                            value={formData.role} 
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="[YOUR ROLE]" 
                                            className={`${inputClass} inline-block w-auto min-w-[300px] text-brand-purple`}
                                        />.
                                    </label>
                                    <div className="mt-4 text-xs font-mono text-brand-navy/40 uppercase tracking-widest">[Press Enter]</div>
                                </motion.div>
                            )}

                            {/* STEP 2: PAIN */}
                            {status !== 'success' && step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        The main friction or pain point <br/> we are facing right now is: <br/>
                                        <textarea 
                                            autoFocus
                                            name="problem" 
                                            value={formData.problem} 
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="[DESCRIBE THE PAIN...]" 
                                            className={`${inputClass} w-full mt-4 h-32 resize-none`}
                                        />
                                    </label>
                                    <span className="text-xs font-mono opacity-40 block">[CMD+ENTER to Continue]</span>
                                </motion.div>
                            )}

                             {/* STEP 3: GOAL */}
                             {status !== 'success' && step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        The big outcome <br/> I hope to achieve with COOLO is: <br/>
                                        <textarea 
                                            autoFocus
                                            name="goal" 
                                            value={formData.goal} 
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="[DESCRIBE THE VICTORY]" 
                                            className={`${inputClass} w-full mt-4 h-32 resize-none`}
                                        />
                                    </label>
                                    <span className="text-xs font-mono opacity-40 block">[CMD+ENTER to Continue]</span>
                                </motion.div>
                            )}

                            {/* STEP 4: EMAIL */}
                            {status !== 'success' && step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        You can reply to me at: <br/>
                                        <input 
                                            autoFocus
                                            type="email" 
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="[YOUR EMAIL ADDRESS]" 
                                            className={`${inputClass} inline-block w-full`}
                                        />
                                    </label>
                                    <div className="mt-4 text-xs font-mono text-brand-navy/40 uppercase tracking-widest">[Press Enter]</div>
                                </motion.div>
                            )}

                             {/* STEP 5: REVIEW */}
                             {status !== 'success' && step === 5 && (
                                <motion.div 
                                    key="step5"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-8">Brief Ready</div>
                                    <h3 className="text-4xl md:text-6xl font-black uppercase text-brand-navy leading-none mb-8">Ready to Send?</h3>
                                    <p className="font-body text-xl text-brand-navy/60 max-w-lg mx-auto mb-12">
                                        We will review your notes and hit you back shortly.
                                    </p>
                                    
                                    <button 
                                        onClick={handleTransmission}
                                        disabled={status === 'submitting'}
                                        className="inline-block bg-brand-navy text-brand-offwhite font-mono text-xl uppercase px-12 py-6 hover:bg-brand-purple transition-all shadow-xl disabled:opacity-70 disabled:cursor-wait"
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </button>

                                    {status === 'error' && (
                                        <p className="mt-4 text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
                                            Error. Please try again.
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {/* Navigation Buttons (Back / Next) */}
                    {status !== 'success' && step < 5 && (
                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-brand-navy/5">
                            <button 
                                onClick={handleBack} 
                                className={`font-mono text-xs uppercase tracking-widest font-bold ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-brand-navy/40 hover:text-brand-navy'}`}
                            >
                                &larr; Back
                            </button>
                            <button 
                                onClick={handleNext}
                                className="bg-brand-purple text-brand-offwhite font-mono text-xs uppercase px-8 py-3 hover:bg-brand-yellow hover:text-brand-navy transition-all font-bold tracking-widest shadow-lg"
                            >
                                Next &rarr;
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedSection>
      </div>
      
      <div className="bg-brand-navy text-brand-offwhite py-24 mt-24">
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