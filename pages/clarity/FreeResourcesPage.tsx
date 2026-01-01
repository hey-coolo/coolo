
import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';
import { FREE_RESOURCES } from '../../constants';

const FreeResourcesPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <div className="max-w-4xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Clarity / Leg 1.1</span>
            <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
              Free<br/><span className="text-brand-purple">Intelligence.</span>
            </h1>
            <p className="font-body text-2xl md:text-3xl text-brand-navy/60 mt-12 leading-tight">
              A high-end studio shouldn't keep secrets. Start with the Starter Kit to unlock the system. Use these tools to audit your current brand state before spending a dime.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-32 border-t border-brand-navy/10">
          {FREE_RESOURCES.map((res, i) => (
            <AnimatedSection key={res.id} delay={i * 100}>
              <motion.a 
                href={res.link}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-16 border-b border-brand-navy/10 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-700 px-4 -mx-4"
              >
                <div className="flex items-center gap-12">
                   <span className="font-mono text-4xl text-brand-purple group-hover:text-brand-yellow font-black transition-colors">{res.id}</span>
                   <div>
                     <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">{res.title}</h3>
                     <p className="font-body text-xl text-brand-navy/50 group-hover:text-brand-offwhite/50 mt-4 max-w-xl transition-colors">{res.desc}</p>
                   </div>
                </div>
                <div className="mt-8 md:mt-0 flex items-center gap-6">
                  <span className="font-mono text-sm uppercase font-bold tracking-widest">{res.format} / Download</span>
                  <div className="w-12 h-[2px] bg-brand-navy group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500"></div>
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeResourcesPage;
