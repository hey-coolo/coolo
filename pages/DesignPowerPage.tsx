import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { DESIGN_POWER_TIERS } from '../constants';

const DesignPowerPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite pt-32">
      <div className="container mx-auto px-8">
        
        {/* 1. HERO: The Hook */}
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">Phase 02 / The Creative Execution</span>
            <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
              Make It <br/>
              <span className="text-brand-purple italic">Real.</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              STRATEGY IS THE MAP. <br/> DESIGN IS THE CAR.
              <span className="text-brand-navy/40 not-italic text-xl mt-6 block font-normal">
                You have the plan. Now you need to look the part. <br/>
                We don't make things "pretty." We make things work. <br/>
                We build brands that look expensive, feel authentic, and work on every screen.
              </span>
            </p>
          </header>
        </AnimatedSection>

        {/* 2. THE PHILOSOPHY: Why We Do It */}
        <section className="py-24 border-t-2 border-brand-navy grid grid-cols-1 lg:grid-cols-2 gap-16">
           <div>
              <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-brand-navy">
                 Death to <br/>Clip Art.
              </h2>
           </div>
           <div className="font-body text-xl leading-relaxed space-y-8 text-brand-navy/80">
              <p>
                <strong>People judge books by their covers.</strong> <br/>
                It sucks, but it’s true. If your business looks like it was made in MS Paint, nobody is going to trust your strategy.
              </p>
              <p>
                We use <strong>The Creative Method™</strong> to translate your strategy into visuals. We don't guess. We take the "Soul" we found in Phase 1 and build a body for it.
              </p>
           </div>
        </section>

        {/* 3. THE TIERS: The Menu */}
        <section className="pb-48">
            <div className="mb-16">
                <h3 className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold">The Menu</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DESIGN_POWER_TIERS.map((tier, i) => (
                    <AnimatedSection key={tier.slug} delay={i * 100}>
                        <div className="border border-brand-navy/10 bg-white p-8 md:p-12 hover:border-brand-purple transition-all duration-500 group h-full flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-4xl font-black uppercase italic text-brand-navy group-hover:text-brand-purple transition-colors">{tier.name}</h3>
                                        <span className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 mt-2 block">{tier.subtitle}</span>
                                    </div>
                                    <span className="font-mono text-xs border border-brand-navy/20 px-2 py-1 rounded-full text-brand-navy">{tier.timeline}</span>
                                </div>
                                
                                <p className="font-body text-lg text-brand-navy/70 mb-10 min-h-[80px]">
                                    {tier.desc}
                                </p>

                                <ul className="space-y-4 mb-12">
                                    {tier.features?.map((feature) => (
                                        <li key={feature} className="flex items-center font-mono text-sm text-brand-navy">
                                            <span className="w-2 h-2 bg-brand-purple rounded-full mr-4"></span>
                                            {feature}
                                        </li>
                                    )) || tier.deliverables?.map((feature) => (
                                        <li key={feature} className="flex items-center font-mono text-sm text-brand-navy">
                                            <span className="w-2 h-2 bg-brand-purple rounded-full mr-4"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full py-4 border-2 border-brand-navy text-brand-navy font-mono uppercase font-bold hover:bg-brand-navy hover:text-white transition-all">
                                {tier.cta}
                            </button>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        {/* 4. THE PROCESS: How it works */}
        <section className="pb-32 border-t border-brand-navy/10 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <h3 className="text-4xl font-black uppercase text-brand-navy tracking-tight italic">How we build and design brands.</h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 gap-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start border-b border-brand-navy/5 pb-8">
                        <span className="font-mono text-brand-purple text-xl font-bold">01</span>
                        <div>
                            <h4 className="font-bold text-2xl uppercase mb-2 text-brand-navy">The Download</h4>
                            <p className="font-body text-brand-navy/60">We don't start sketching until we understand the job. We take your strategy and turn it into a Visual Brief.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-start border-b border-brand-navy/5 pb-8">
                        <span className="font-mono text-brand-purple text-xl font-bold">02</span>
                        <div>
                            <h4 className="font-bold text-2xl uppercase mb-2 text-brand-navy">The Messy Art Work</h4>
                            <p className="font-body text-brand-navy/60">We show you the sketches, the bad ideas, and the rough drafts so we can find the gold together.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-start border-b border-brand-navy/5 pb-8">
                        <span className="font-mono text-brand-purple text-xl font-bold">03</span>
                        <div>
                            <h4 className="font-bold text-2xl uppercase mb-2 text-brand-navy">The Build</h4>
                            <p className="font-body text-brand-navy/60">Once we sign-off on the look, we build the design system. Every file, every format, every pixel—ready to use.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default DesignPowerPage;