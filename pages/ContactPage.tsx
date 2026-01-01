
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [step, setStep] = useState(0);
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

  // Kinetic input styling
  const inputClass = "bg-transparent border-b-4 border-brand-purple/30 text-brand-navy font-black focus:border-brand-purple focus:outline-none placeholder-brand-navy/20 w-full transition-all duration-300";

  return (
    <div className="bg-brand-offwhite pt-32 min-h-screen flex flex-col">
      <div className="container mx-auto px-8 flex-grow flex flex-col justify-center">
        
        <AnimatedSection>
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold block mb-4">Procedural Intake / Discovery</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.95]">
                        State Your<br/>Mission.
                    </h1>
                </header>

                <div className="bg-white border border-brand-navy/10 p-8 md:p-16 shadow-2xl min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 font-mono text-[10px] uppercase tracking-widest opacity-30">
                        Step 0{step + 1} / 06
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="relative z-10">
                        <AnimatePresence mode="wait">
                            {step === 0 && (
                                <motion.div 
                                    key="step0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        Identify yourself. <br/>
                                        I am <input 
                                            autoFocus
                                            type="text" 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange}
                                            placeholder="[YOUR NAME]" 
                                            className={`${inputClass} inline-block w-auto min-w-[300px]`}
                                        />.
                                    </label>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div 
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        I am operating on behalf of <br/>
                                        <input 
                                            autoFocus
                                            type="text" 
                                            name="business" 
                                            value={formData.business} 
                                            onChange={handleChange}
                                            placeholder="[BUSINESS NAME]" 
                                            className={`${inputClass} inline-block w-auto min-w-[400px]`}
                                        /> <br/>
                                        where I serve as the <input 
                                            type="text" 
                                            name="role" 
                                            value={formData.role} 
                                            onChange={handleChange}
                                            placeholder="[YOUR ROLE]" 
                                            className={`${inputClass} inline-block w-auto min-w-[300px] text-brand-purple`}
                                        />.
                                    </label>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div 
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        The specific friction or pain point <br/> we are facing right now is: <br/>
                                        <textarea 
                                            autoFocus
                                            name="problem" 
                                            value={formData.problem} 
                                            onChange={handleChange}
                                            placeholder="[DESCRIBE THE PAIN... BE BRUTAL]" 
                                            className={`${inputClass} w-full mt-4 h-32 resize-none`}
                                        />
                                    </label>
                                </motion.div>
                            )}

                             {step === 3 && (
                                <motion.div 
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        The single most important outcome <br/> I hope to achieve with COOLO is: <br/>
                                        <textarea 
                                            autoFocus
                                            name="goal" 
                                            value={formData.goal} 
                                            onChange={handleChange}
                                            placeholder="[DESCRIBE THE VICTORY]" 
                                            className={`${inputClass} w-full mt-4 h-32 resize-none`}
                                        />
                                    </label>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div 
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <label className="block text-3xl md:text-5xl font-light text-brand-navy leading-tight">
                                        You can confirm this brief and <br/> send the dossier to: <br/>
                                        <input 
                                            autoFocus
                                            type="email" 
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleChange}
                                            placeholder="[YOUR EMAIL ADDRESS]" 
                                            className={`${inputClass} inline-block w-full`}
                                        />
                                    </label>
                                </motion.div>
                            )}

                             {step === 5 && (
                                <motion.div 
                                    key="step5"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-8">Brief Generated</div>
                                    <h3 className="text-4xl md:text-6xl font-black uppercase text-brand-navy leading-none mb-8">Ready to Transmit?</h3>
                                    <p className="font-body text-xl text-brand-navy/60 max-w-lg mx-auto mb-12">
                                        We will review your intel and respond within 24 hours if the fit is right.
                                    </p>
                                    <a 
                                        href={`mailto:hey@coolo.co.nz?subject=Inquiry from ${formData.name}&body=Name: ${formData.name}%0ABusiness: ${formData.business} (${formData.role})%0A%0AThe Pain:%0A${formData.problem}%0A%0AThe Goal:%0A${formData.goal}`}
                                        className="inline-block bg-brand-navy text-brand-offwhite font-mono text-xl uppercase px-12 py-6 hover:bg-brand-purple transition-all shadow-xl"
                                    >
                                        Execute Transmission
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {step < 5 && (
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
                                Proceed &rarr;
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedSection>
      </div>

      <div className="bg-brand-navy text-brand-offwhite py-24 mt-24">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 font-mono uppercase tracking-[0.2em] text-[10px]">
          <div>
              <h3 className="text-brand-purple mb-4 font-bold">HQ</h3>
              <p className="text-lg font-sans font-black tracking-normal">Mount Maunganui, NZ</p>
          </div>
          <div>
               <h3 className="text-brand-purple mb-4 font-bold">Direct Line</h3>
               <a href="mailto:hey@coolo.co.nz" className="text-lg font-sans font-black tracking-normal block hover:text-brand-purple">hey@coolo.co.nz</a>
          </div>
          <div>
              <h3 className="text-brand-purple mb-4 font-bold">Network</h3>
              <a href="https://instagram.com/coolo.studio" target="_blank" rel="noopener noreferrer" className="text-lg font-sans font-black tracking-normal block hover:text-brand-purple">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
