import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const DropsPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        
        {/* Header */}
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl mx-auto text-center">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">Internal Lab</span>
            <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
              The<br/><span className="text-brand-purple italic">Playground.</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl mx-auto">
              Beyond client work, we build our own stuff. Drops are standalone mini-brands, creative experiments, and limited-run products.
            </p>
          </header>
        </AnimatedSection>

        {/* Coming Soon Block */}
        <section className="pb-48">
            <AnimatedSection delay={200}>
                <div className="border-2 border-dashed border-brand-navy/20 bg-brand-navy/5 p-12 md:p-32 text-center relative overflow-hidden group hover:border-brand-purple transition-colors duration-500">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3A0888_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center mb-8 shadow-xl animate-pulse">
                             <svg className="w-10 h-10 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        
                        <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand-navy/40 font-bold mb-4 bg-white px-4 py-1 border border-brand-navy/10">
                            Status: In Production
                        </span>

                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-brand-navy mb-6">
                            Cooking<br/>Something<br/>Weird.
                        </h2>
                        
                        <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-brand-navy/60 max-w-md mx-auto leading-relaxed mb-12">
                            We are currently developing the first wave of internal projects. Expect physical goods, digital assets, and pure chaos.
                        </p>

                        <Link to="/" className="inline-block border-b-2 border-brand-purple pb-1 font-mono text-xs uppercase font-bold text-brand-purple tracking-widest hover:text-brand-navy hover:border-brand-navy transition-all">
                            Return to Base &rarr;
                        </Link>
                    </div>
                </div>
            </AnimatedSection>
        </section>

      </div>
    </div>
  );
};

export default DropsPage;