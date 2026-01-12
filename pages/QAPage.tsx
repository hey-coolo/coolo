import React, { useState } from 'react';
import { QA_DATA } from '../constants';
import AnimatedSection from '../components/AnimatedSection';

const FAQPage: React.FC = () => {
  const [btnText, setBtnText] = useState("Ask a Weird Question");

  const handleCopy = () => {
    navigator.clipboard.writeText("hey@coolo.co.nz");
    setBtnText("Email Copied to Clipboard");
    setTimeout(() => setBtnText("Ask a Weird Question"), 2000);
  };

  return (
    <div className="bg-brand-offwhite pt-32 min-h-screen">
      
      <div className="container mx-auto px-8 pb-24">
        
        <AnimatedSection>
            <header className="py-24 md:py-48 max-w-6xl">
                <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                    04 / The Fine Print
                </span>
                <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
                    The<br/><span className="text-brand-purple italic">Truth.</span>
                </h1>
                <p className="font-body text-2xl md:text-3xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
                    You have questions. We have honest answers. <br/>
                    No corporate jargon. No sales fluff. Just the raw data on how we work, what we charge, and why we do it.
                </p>
            </header>
        </AnimatedSection>

        <div className="space-y-32 border-t border-brand-navy/10 pt-24">
            {QA_DATA.map((section, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <h2 className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-4">
                                {String(i + 1).padStart(2, '0')} / {section.category}
                            </h2>
                            <div className="h-[2px] w-12 bg-brand-navy/20"></div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-8 space-y-20">
                        {section.questions.map((item, j) => (
                            <AnimatedSection delay={j * 0.1} key={j}>
                                <div className="group">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 italic text-brand-navy group-hover:text-brand-purple transition-colors duration-300">
                                        "{item.q}"
                                    </h3>
                                    <div className="border-l-4 border-brand-purple/20 pl-6 md:pl-8 group-hover:border-brand-purple transition-colors duration-300">
                                        <p className="font-body text-lg md:text-2xl leading-relaxed text-brand-navy/80">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <AnimatedSection>
            <div className="mt-40 p-12 md:p-24 border-2 border-brand-navy bg-white text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none text-brand-navy">
                        Still Confused?
                    </h2>
                    <p className="font-body text-xl md:text-2xl mb-12 text-brand-navy/60 max-w-2xl mx-auto">
                        If your question is too weird, too specific, or too embarrassing for this list, just ask us directly.
                    </p>
                    {/* BUTTON COPIES EMAIL, NO MAILTO */}
                    <button 
                        onClick={handleCopy}
                        className="inline-block bg-brand-navy text-brand-offwhite hover:bg-brand-purple px-10 py-5 font-mono uppercase font-bold text-lg transition-all tracking-widest shadow-[8px_8px_0px_0px_#FCC803] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </AnimatedSection>

      </div>
    </div>
  );
};

export default FAQPage;