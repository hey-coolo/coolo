// FILE: pages/FAQPage.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { QA_DATA } from '../constants';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const FAQPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen flex flex-col font-sans text-brand-navy selection:bg-brand-purple selection:text-white">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 container mx-auto max-w-7xl">
        
        {/* 1. HERO: The Truth */}
        <AnimatedSection>
            <header className="mb-24 md:mb-40 pt-12 md:pt-24 border-b-2 border-brand-navy pb-12">
                <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-6">
                    04 / The Fine Print
                </span>
                <h1 className="text-[14vw] md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8 text-brand-navy">
                    The <br/> Truth.
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <p className="text-xl md:text-2xl font-body max-w-2xl text-brand-navy/70 leading-relaxed">
                        You have questions. We have honest answers. <br/>
                        No corporate jargon. No sales fluff. Just the raw data on how we work, what we charge, and why we do it.
                    </p>
                    <span className="font-mono text-xs uppercase tracking-widest bg-brand-navy text-brand-offwhite px-3 py-1 rotate-[-2deg]">
                        Updated for 2026
                    </span>
                </div>
            </header>
        </AnimatedSection>

        {/* 2. THE Q&A GRID */}
        <div className="space-y-32">
            {QA_DATA.map((section, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky Category Title */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <h2 className="font-mono text-brand-purple uppercase tracking-widest text-sm font-bold mb-4">
                                {String(i + 1).padStart(2, '0')} / {section.category}
                            </h2>
                            <div className="h-[2px] w-12 bg-brand-navy/20"></div>
                        </div>
                    </div>
                    
                    {/* Questions */}
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

        {/* 3. FINAL CTA: The "Weird" Question */}
        <AnimatedSection>
            <div className="mt-40 p-12 md:p-24 bg-brand-navy text-brand-offwhite text-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                     <div className="w-[600px] h-[600px] border-[40px] border-white rounded-full absolute -top-32 -left-32"></div>
                </div>

                <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none">
                        Still Confused?
                    </h2>
                    <p className="font-body text-xl md:text-2xl mb-12 opacity-70 max-w-2xl mx-auto">
                        If your question is too weird, too specific, or too embarrassing for this list, just ask us directly. We've heard it all.
                    </p>
                    <a 
                        href="mailto:hello@coolo.co.nz?subject=Weird%20Question" 
                        className="inline-block border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-10 py-5 font-mono uppercase font-bold text-lg transition-all tracking-widest"
                    >
                        Ask a Weird Question
                    </a>
                </div>
            </div>
        </AnimatedSection>

      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;