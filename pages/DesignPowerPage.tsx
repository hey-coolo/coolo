import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { DESIGN_POWER_TIERS } from '../constants';
import { Link } from 'react-router-dom';

const DesignPowerPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite pt-32">
      <div className="container mx-auto px-8">
        
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-4">Phase 02 / The Creative Execution</span>
            {/* HEADLINE SCALE REFACTORED FOR GIANT LANDING POSTURE */}
            <h1 className="text-brand-navy text-8xl md:text-[14vw] lg:text-[15vw] xl:text-[16vw] font-black uppercase tracking-tighter leading-[0.85] mt-0">
              Make It <br/>
              <span className="text-brand-purple italic">Real.</span>
            </h1>
              <span className="text-brand-navy/40 not-italic text-xl mt-6 block font-normal">
                You have the direction. Now you need to show up like it. <br/> 
                This is where it becomes visible. Where ideas turn into something people can actually see, trust, and remember. <br/> 
                Not just pretty design. Design that performs. That holds attention. That feels real across every brand touchpoint.
              </span>
          </header>
        </AnimatedSection>

        {/* ALIGNED TO CLARITY PAGE 12-COL LAYOUT */}
        <section className="py-24 border-t-2 border-brand-navy mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-4 block">The execution</span>
                    <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-brand-navy">
                        Death to<br/>Clip Art.
                    </h2>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 font-body text-xl leading-relaxed text-brand-navy/80">
                    <AnimatedSection delay={100}>
                        <h4 className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-2">The Harsh Truth</h4>
                        <p>
                            <strong>People judge books by their covers.</strong> It sucks, but it’s true. If your business looks like it was made in MS Paint, nobody is going to trust your strategy.
                        </p>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <h4 className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-2">The Solution</h4>
                        <p>
                            We use <strong>The Creative Method™</strong> to translate your strategy into visuals. We don't guess. We take the "Soul" we found in Phase 1 and build a body for it.
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        </section>

        {/* BRUTALIST TIERS - ALIGNED TO CLARITY PAGE CARDS */}
        <section className="pb-48">
            <div className="mb-16">
                <h3 className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold">The Menu</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {DESIGN_POWER_TIERS.map((tier, i) => (
                    <AnimatedSection key={tier.slug} delay={i * 100}>
                        <Link 
                            to={`/design-power/${tier.slug}`} 
                            className="block border-2 border-brand-navy p-12 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 h-full group relative overflow-hidden bg-white shadow-[12px_12px_0px_0px_#0F0328] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                        >
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        <span className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">{tier.subtitle || tier.timeline}</span>
                                        <span className="font-mono text-[10px] uppercase font-black px-2 py-1 bg-brand-navy/5 group-hover:bg-brand-offwhite/10 group-hover:text-brand-yellow transition-colors">Talk to us</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight mb-6">{tier.name}</h3>
                                    <p className="font-body text-xl text-brand-navy/60 group-hover:text-brand-offwhite/70 transition-colors leading-relaxed min-h-[80px]">
                                        {tier.desc}
                                    </p>

                                    <ul className="mt-8 space-y-2 border-t border-brand-navy/10 pt-8 group-hover:border-brand-offwhite/20 transition-colors">
                                        {(tier.deliverables || []).slice(0, 3).map((feature) => (
                                            <li key={feature} className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-1 h-1 bg-brand-purple group-hover:bg-brand-yellow transition-colors"></span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-12 flex items-center gap-4">
                                    <span className="font-mono text-sm uppercase font-bold tracking-widest">{tier.cta}</span>
                                    <div className="w-12 h-[2px] bg-brand-navy group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500"></div>
                                </div>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        {/* ALIGNED TO CLARITY PAGE "THE OUTCOME" */}
        <section className="pb-32 border-t border-brand-navy/10 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <h3 className="text-4xl font-black uppercase text-brand-navy tracking-tight italic">How we build and design brands.</h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { step: "01", t: "The Download", d: "We don't start sketching until we understand the job. We take your strategy and turn it into a Visual Brief." },
                        { step: "02", t: "The Messy Art Work", d: "We show you the sketches, the bad ideas, and the rough drafts so we can find the gold together." },
                        { step: "03", t: "The Build", d: "Once we sign-off on the look, we build the design system. Every file, every format, every pixel—ready to use." },
                        { step: "04", t: "The Handoff", d: "We hand over the keys. Full ownership of assets, clear rules, and no hostage situations." }
                    ].map(o => (
                        <div key={o.t}>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-mono text-brand-purple text-xs font-bold">[{o.step}]</span>
                                <h4 className="font-mono text-brand-navy uppercase tracking-widest text-xs font-bold">{o.t}</h4>
                            </div>
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

export default DesignPowerPage;