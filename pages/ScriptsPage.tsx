
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { SCRIPTS_DATA } from '../constants';
import { motion } from 'framer-motion';

const ScriptsPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-48">
      <div className="container mx-auto px-8">
        
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-4">Intel / Source Code</span>
            <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mt-0">
              The Agency<br/><span className="text-brand-purple italic">Playbook.</span>
            </h1>
            <p className="font-body text-2xl md:text-3xl text-brand-navy/70 mt-12 leading-tight max-w-4xl">
              Declassified scripts for handling clients, pricing, and process. The raw logic we use to win arguments and build trust.
            </p>
          </header>
        </AnimatedSection>

        <section className="border-t border-brand-navy/10 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SCRIPTS_DATA.map((script, index) => (
                    <AnimatedSection key={script.id} delay={index * 100}>
                        <div className="bg-white border-2 border-brand-navy/5 p-8 md:p-12 hover:border-brand-purple transition-all duration-300 group h-full flex flex-col">
                            <div className="flex justify-between items-start mb-8 border-b border-brand-navy/5 pb-4">
                                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple">Script {String(script.id).padStart(2, '0')}</span>
                                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/40">{script.category}</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-8 text-brand-navy group-hover:text-brand-purple transition-colors">
                                {script.title}
                            </h2>

                            <div className="space-y-6 mb-8 flex-grow">
                                {script.dialogue.map((line, i) => (
                                    <div key={i} className={`flex gap-4 ${line.speaker === 'You' ? 'items-end' : 'items-start'}`}>
                                        <span className={`font-mono text-[10px] uppercase font-bold tracking-widest min-w-[50px] ${line.speaker === 'You' ? 'text-brand-purple' : 'text-brand-navy/40'}`}>
                                            {line.speaker}:
                                        </span>
                                        <p className={`font-body text-lg leading-relaxed ${line.speaker === 'You' ? 'font-medium text-brand-navy' : 'text-brand-navy/60 italic'}`}>
                                            {line.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-brand-navy text-brand-offwhite p-4 text-center">
                                <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block mb-2">Core Truth</span>
                                <p className="font-black font-sans uppercase tracking-tight text-lg md:text-xl leading-none text-brand-yellow">
                                    {script.overlay}
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        <section className="py-32 text-center">
            <h3 className="text-2xl font-mono uppercase font-bold tracking-widest mb-8 text-brand-navy/40">End of Declassified Section</h3>
            <p className="max-w-xl mx-auto font-body text-xl text-brand-navy mb-12">
                Need the full 32-script operating system? It's included in our Consulting Sprints.
            </p>
            <a href="/contact" className="inline-block bg-brand-purple text-brand-offwhite font-mono uppercase font-bold px-12 py-4 hover:bg-brand-yellow hover:text-brand-navy transition-all">
                Request Full Access
            </a>
        </section>

      </div>
    </div>
  );
};

export default ScriptsPage;
