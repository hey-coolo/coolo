import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const QUESTIONS = [
  {
    id: 1,
    q: "If your brand was a car, what would it be?",
    options: [
      { text: "A reliable 2005 sedan (Safe, but invisible)", score: 1 },
      { text: "A modified drift car (Loud, niche, messy)", score: 2 },
      { text: "A vintage Porsche (Timeless, technical, soulful)", score: 3 },
      { text: "A generic rental (No personality, just utility)", score: 1 }
    ]
  },
  {
    id: 2,
    q: "How often do you have to explain what you actually do?",
    options: [
      { text: "Every single time. It's exhausting.", score: 1 },
      { text: "Sometimes, usually to the wrong people.", score: 2 },
      { text: "Rarely. The work speaks for itself.", score: 3 }
    ]
  },
  {
    id: 3,
    q: "Does your website match your pricing?",
    options: [
      { text: "No, I look cheaper than I am.", score: 1 },
      { text: "It's okay, but lacks the 'premium' feel.", score: 2 },
      { text: "Yes, it justifies the investment instantly.", score: 3 }
    ]
  }
];

const RealityCheckApp: React.FC = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const getResult = () => {
    if (totalScore <= 4) return { title: "SIGNAL_BLUR", desc: "Your brand is currently white noise. You're blending in so well that you're invisible." };
    if (totalScore <= 7) return { title: "STATIC_INTERFERENCE", desc: "You have a soul, but the execution is messy. The market hears you, but they're confused." };
    return { title: "HIGH_RES_LOGIC", desc: "You're close. You just need to sharpen the edges to dominate the niche." };
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-8 max-w-4xl">
        <AnimatedSection>
          {!isFinished ? (
            <div className="bg-white border-2 border-brand-navy p-8 md:p-16 shadow-[12px_12px_0px_0px_#0F0328]">
              <div className="flex justify-between items-center mb-12">
                <span className="font-mono text-brand-purple text-xs font-black uppercase tracking-widest">Diagnostic Step 0{step + 1}</span>
                <div className="flex gap-2">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`w-8 h-1 transition-colors ${i <= step ? 'bg-brand-purple' : 'bg-brand-navy/10'}`} />
                  ))}
                </div>
              </div>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-brand-navy mb-12 leading-none">
                {QUESTIONS[step].q}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.score)}
                    className="group text-left border-2 border-brand-navy/10 p-6 hover:border-brand-purple hover:bg-brand-navy transition-all duration-300"
                  >
                    <p className="font-mono text-lg text-brand-navy group-hover:text-brand-offwhite transition-colors uppercase font-bold">
                      {opt.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-navy text-brand-offwhite p-8 md:p-20 border-2 border-brand-yellow shadow-[20px_20px_0px_0px_#3A0888]"
            >
              <span className="font-mono text-brand-yellow text-xs font-black uppercase tracking-widest block mb-4">// ANALYSIS_COMPLETE</span>
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
                {getResult().title}
              </h2>
              <p className="font-body text-2xl md:text-3xl text-brand-offwhite/70 mb-12 leading-tight">
                {getResult().desc}
              </p>
              
              <div className="border-t border-brand-offwhite/10 pt-12 flex flex-col md:flex-row gap-8">
                <Link to="/contact" className="bg-brand-yellow text-brand-navy font-mono font-black uppercase py-5 px-10 hover:bg-white transition-all text-center">
                  Fix the Signal
                </Link>
                <Link to="/clarity" className="font-mono text-brand-offwhite/40 uppercase font-bold py-5 px-10 hover:text-brand-offwhite transition-all text-center border border-brand-offwhite/10">
                  Return to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default RealityCheckApp;