import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESIGN_POWER_TIERS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import Accordion from '../components/Accordion';

const TierDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tier = DESIGN_POWER_TIERS.find(t => t.slug === slug);

  if (!tier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
        <div className="text-center">
            <h1 className="text-6xl font-black uppercase text-brand-navy tracking-tight">Scope_Error</h1>
            <Link to="/design-power" className="font-mono uppercase underline mt-8 block text-brand-purple tracking-widest text-xs">Return to Grid</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8 pb-32">
        <AnimatedSection>
          <header className="py-24 max-w-5xl">
            <Link to="/design-power" className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block hover:text-brand-navy transition-colors">
              &larr; Service Leg 02 / {tier.name}
            </Link>
            <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
              {tier.focus}
            </h1>
            <p className="font-body text-2xl md:text-3xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              {tier.desc}
            </p>
          </header>
        </AnimatedSection>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-24 border-t-2 border-brand-navy">
            <div className="lg:col-span-4 space-y-12">
                <AnimatedSection delay={100}>
                    <div className="p-8 bg-brand-navy text-brand-offwhite">
                        <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold mb-2 block">Est. Timeline</span>
                        <h3 className="text-4xl font-black uppercase tracking-tight">{tier.timeline}</h3>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold mb-4 block">Ideal Candidate</span>
                        <p className="font-body text-xl text-brand-navy/80 leading-relaxed">
                            {tier.idealFor}
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                    <Link to="/contact" className="block w-full bg-brand-purple text-brand-offwhite font-mono text-sm font-black uppercase py-6 tracking-widest text-center hover:bg-brand-yellow hover:text-brand-navy transition-all shadow-xl">
                        Inquire for {tier.name}
                    </Link>
                </AnimatedSection>
            </div>

            <div className="lg:col-span-8">
                <div className="mb-24">
                    <h3 className="text-5xl font-black uppercase tracking-tight text-brand-navy mb-12">Scope Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tier.deliverables.map((item, index) => (
                            <AnimatedSection key={index} delay={index * 50}>
                                <div className="border-l-4 border-brand-navy/10 pl-6 py-2 hover:border-brand-purple transition-colors group">
                                    <span className="font-mono text-[10px] uppercase font-bold text-brand-navy/30 mb-2 block group-hover:text-brand-purple">Item 0{index + 1}</span>
                                    <h4 className="text-2xl font-black uppercase tracking-tight text-brand-navy group-hover:text-brand-purple transition-colors">{item}</h4>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>

                {tier.faqs && tier.faqs.length > 0 && (
                    <AnimatedSection delay={200}>
                        <div className="mb-12">
                            <h3 className="text-4xl font-black uppercase tracking-tight text-brand-navy mb-8 border-b border-brand-navy/10 pb-4">
                                Specifics & Logic
                            </h3>
                            <div className="space-y-2">
                                {tier.faqs.map((faq) => (
                                    <Accordion key={faq.q} title={faq.q}>
                                        {faq.a}
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                )}
                
                <div className="mt-24 p-12 border border-brand-navy/10 bg-brand-navy/5">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold mb-4">Humans in the Machine Standard</h4>
                    <p className="font-body text-lg text-brand-navy/70 leading-relaxed max-w-2xl">
                        We build the systems, but we aren't robots. We're in the trenches with you. We use our tools and experience to unblock your brand so you can stop stressing and start moving.
                    </p>
                </div>
            </div>
        </section>
      </div>

      <section className="py-48 group bg-brand-navy hover:bg-brand-purple transition-colors duration-500 flex flex-col items-center justify-center overflow-hidden">
         <Link to="/design-power" className="block relative z-10 text-center w-full">
            <span className="font-mono text-brand-offwhite/50 group-hover:text-brand-offwhite uppercase tracking-[0.5em] text-xs font-black transition-colors duration-500">Design Power Unit</span>
            <div className="overflow-hidden mt-12">
                <h3 className="text-6xl md:text-[8vw] font-black uppercase tracking-tight text-brand-offwhite transform transition-transform duration-700 group-hover:scale-105">
                    Return to Grid &larr;
                </h3>
            </div>
        </Link>
      </section>
    </div>
  );
};

export default TierDetailPage;