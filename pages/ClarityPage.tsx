
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { CLARITY_TIERS } from '../constants';

const ClarityPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-4">Leg 1: Strategy</span>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
              No Magic<br/><span className="text-brand-purple">Formula™</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              We replace hype with clarity. A calibrated system to help founders find their sharp point-of-view and a workable plan.
            </p>
          </header>
        </AnimatedSection>

        <section className="pb-48 grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLARITY_TIERS.map((tier, i) => (
                <AnimatedSection key={tier.name} delay={i * 100}>
                    <Link to={`/clarity/${tier.slug}`} className="block border-2 border-brand-navy p-12 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 h-full group relative overflow-hidden bg-white hover:border-brand-navy">
                        
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple group-hover:text-brand-yellow">{tier.subtitle}</span>
                                    <span className="font-mono text-xl font-bold group-hover:text-brand-yellow transition-colors">{tier.price}</span>
                                </div>
                                <h3 className="text-5xl font-black uppercase leading-none tracking-tight mb-6">{tier.name}</h3>
                                <p className="font-body text-xl text-brand-navy/60 group-hover:text-brand-offwhite/70 transition-colors leading-relaxed">
                                    {tier.desc}
                                </p>
                                
                                <ul className="mt-8 space-y-2 border-t border-brand-navy/10 pt-8 group-hover:border-brand-offwhite/20">
                                    {tier.features.slice(0, 3).map(f => (
                                        <li key={f} className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 bg-brand-purple group-hover:bg-brand-yellow"></span> {f}
                                        </li>
                                    ))}
                                    {tier.features.length > 3 && (
                                         <li className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 opacity-50">
                                             + More Details
                                         </li>
                                    )}
                                </ul>
                            </div>
                            
                            <div className="mt-12 flex items-center gap-4">
                                <span className="font-mono text-sm uppercase font-bold tracking-widest">View Module</span>
                                <div className="w-12 h-[2px] bg-brand-navy group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500"></div>
                            </div>
                        </div>
                    </Link>
                </AnimatedSection>
            ))}
        </section>
        
        <section className="pb-32 border-t border-brand-navy/10 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <h3 className="text-4xl font-black uppercase text-brand-navy tracking-tight">Core Outcomes</h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { t: "Positioning", d: "A tight, credible position you can defend and communicate." },
                        { t: "Audience Mapping", d: "Real people, real needs (JTBD), real language. No fake personas." },
                        { t: "Messaging System", d: "Narrative spine + value props + proof points + content angles." },
                        { t: "Story Roadmap", d: "Campaign themes, content pillars, and your next 90-day plan." }
                    ].map(o => (
                        <div key={o.t}>
                            <h4 className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-2">{o.t}</h4>
                            <p className="font-body text-xl text-brand-navy/80">{o.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default ClarityPage;
