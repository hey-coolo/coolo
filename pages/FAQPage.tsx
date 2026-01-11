
import React from 'react';
import Accordion from '../components/Accordion';
import { FAQ_DATA } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';

const FAQPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-4">Intel / Knowledge Base</span>
            <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mt-0">
              Questions<br/><span className="text-brand-purple">& Clarity.</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              We believe in transparency. Here is the raw truth about how we work, why we charge what we charge, and who we are not for.
            </p>
          </header>
        </AnimatedSection>
        
        <div className="pb-24 md:pb-32 max-w-6xl">
          {FAQ_DATA.map((category, index) => (
            <AnimatedSection key={category.category} delay={index * 150}>
              <div className="mb-24">
                <div className="flex items-end mb-12 border-b border-brand-navy/20 pb-4">
                    <h2 className="font-sans text-5xl font-black uppercase tracking-tighter text-brand-navy">{category.category}</h2>
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold ml-6 mb-2">Ref: 0{index+1}</span>
                </div>
                <div className="space-y-4">
                  {category.questions.map((faq) => (
                    <Accordion key={faq.q} title={faq.q}>
                      {faq.a}
                    </Accordion>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <section className="py-24 border-t-2 border-brand-navy text-center">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-8">Still have questions?</h3>
            <Link to="/contact" className="inline-block border-b-2 border-brand-navy pb-1 font-mono uppercase font-bold tracking-widest text-brand-purple hover:text-brand-navy transition-colors">
                Proceed to Inquiry &rarr;
            </Link>
        </section>
      </div>
    </div>
  );
};

export default FAQPage;
