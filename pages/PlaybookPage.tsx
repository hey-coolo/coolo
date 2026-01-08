import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { SCRIPTS_DATA, PROCESS_STEPS } from '../constants';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PlaybookPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1990') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      // Shake effect or feedback
      setTimeout(() => setError(false), 500);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="bg-brand-offwhite min-h-screen flex items-center justify-center pt-32 px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border-2 border-brand-navy p-12 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-8">
            <svg className="w-5 h-5 text-brand-purple" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold">Restricted Access // Protocol 1990</span>
          </div>
          
          <h1 className="text-4xl font-black uppercase tracking-tight text-brand-navy mb-8 leading-none">
            Enter<br/>Access Code.
          </h1>

          <form onSubmit={handleUnlock} className="space-y-6">
            <input 
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              className={`w-full bg-brand-navy/5 border-b-4 ${error ? 'border-red-500 animate-pulse' : 'border-brand-purple'} p-4 font-mono text-2xl focus:outline-none transition-all`}
            />
            {error && <p className="font-mono text-[10px] text-red-500 uppercase font-bold">Invalid Authorization Key.</p>}
            <button 
              type="submit"
              className="w-full bg-brand-navy text-brand-offwhite font-mono font-bold uppercase py-4 tracking-widest hover:bg-brand-purple transition-colors"
            >
              Verify Identity
            </button>
          </form>
          
          <Link to="/about" className="block mt-8 text-center font-mono text-[10px] uppercase text-brand-navy/40 hover:text-brand-navy transition-colors">
            Return to Studio Origin
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-48 animate-in fade-in duration-700">
      <div className="container mx-auto px-8">
        
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <Link to="/about" className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block hover:text-brand-navy transition-colors">
              &larr; Studio / Intel
            </Link>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] mt-0">
              Agency<br/><span className="text-brand-purple italic">Playbook.</span>
            </h1>
            <p className="font-body text-2xl md:text-3xl text-brand-navy/70 mt-12 leading-tight max-w-4xl">
              Declassified operating procedures. The raw logic we use to win arguments, build trust, and execute at speed.
            </p>
          </header>
        </AnimatedSection>

        {/* Process Section */}
        <section className="py-32 border-t border-brand-navy/10">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-brand-navy mb-16">The Operating System</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PROCESS_STEPS.map((step, index) => (
                    <AnimatedSection key={index} delay={index * 100}>
                        <div className="border-l-2 border-brand-navy pl-6 h-full">
                            <span className="font-mono text-[10px] uppercase font-bold text-brand-purple tracking-widest mb-4 block">{step.time}</span>
                            <h4 className="text-2xl font-black uppercase tracking-tight mb-4">{step.title}</h4>
                            <p className="font-body text-brand-navy/70">{step.desc}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        {/* Scripts Section */}
        <section className="border-t border-brand-navy/10 pt-32">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-brand-navy mb-16">Declassified Scripts</h3>
            <div className="grid grid-cols-1 gap-12">
                {SCRIPTS_DATA.map((script, index) => (
                    <AnimatedSection key={script.id} delay={index * 50}>
                        <div className="bg-white border border-brand-navy/10 p-8 md:p-12 hover:border-brand-purple transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-brand-navy/5 pb-8">
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple mb-2 block">{script.category}</span>
                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-brand-navy group-hover:text-brand-purple transition-colors">
                                        {script.title}
                                    </h2>
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/40 mt-4 md:mt-0">Ref: 0{script.id}</span>
                            </div>

                            <div className="space-y-6 mb-8 max-w-4xl">
                                {script.dialogue.map((line, i) => (
                                    <div key={i} className={`flex gap-4 ${line.speaker === 'You' ? 'items-end' : 'items-start'}`}>
                                        <span className={`font-mono text-[10px] uppercase font-bold tracking-widest min-w-[50px] pt-1 ${line.speaker === 'You' ? 'text-brand-purple' : 'text-brand-navy/40'}`}>
                                            {line.speaker}:
                                        </span>
                                        <p className={`font-body text-lg md:text-xl leading-relaxed whitespace-pre-wrap ${line.speaker === 'You' ? 'font-medium text-brand-navy' : 'text-brand-navy/60 italic'}`}>
                                            {line.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-brand-navy/5 p-6 border-l-4 border-brand-purple">
                                <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block mb-2">Core Truth</span>
                                <p className="font-black font-sans uppercase tracking-tight text-xl md:text-2xl leading-none text-brand-navy">
                                    {script.overlay}
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
};

export default PlaybookPage;