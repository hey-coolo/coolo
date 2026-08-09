import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { DESIGN_POWER_TIERS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const DesignPowerPage: React.FC = () => {
  return (
    <PageTransition>
        <div className="bg-brand-offwhite pt-32 pb-32">
        <div className="container mx-auto px-6 md:px-12">
            
            {/* UNIFIED HEADER */}
            <AnimatedSection>
                <header className="py-24 md:py-32 max-w-6xl">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-bold block mb-8">Phase 02 / The Creative Execution</span>
                    <h1 className="text-brand-navy text-[15vw] md:text-[12vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mt-0 mb-12">
                        Make It <br/>
                        <span className="text-brand-purple italic">Real.</span>
                    </h1>
                    <p className="font-body text-2xl md:text-3xl lg:text-4xl text-brand-navy/80 leading-tight max-w-4xl">
                        You have the direction. Now you need to show up like it.
                    </p>
                    <p className="font-body text-lg md:text-xl text-brand-navy/60 mt-8 max-w-3xl leading-relaxed">
                        This is where it becomes visible. Where ideas turn into something people can actually see, trust, and remember. Not just pretty design. Design that performs. That holds attention. That feels real across every brand touchpoint.
                    </p>
                </header>
            </AnimatedSection>

            {/* THE HARSH TRUTH */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">The Execution</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            Death to<br/>Clip Art.
                        </h2>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 font-body text-lg md:text-xl leading-relaxed text-brand-navy/80">
                        <AnimatedSection delay={100} className="flex flex-col border-t border-brand-navy/10 pt-6">
                            <h4 className="font-mono text-brand-purple uppercase tracking-widest text-[10px] font-bold mb-6">The Harsh Truth</h4>
                            <p>
                                <strong className="font-bold text-brand-navy">People judge books by their covers.</strong> It sucks, but it's true. If your business looks like it was made in MS Paint, nobody is going to trust your strategy.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection delay={200} className="flex flex-col border-t border-brand-navy/10 pt-6">
                            <h4 className="font-mono text-brand-purple uppercase tracking-widest text-[10px] font-bold mb-6">The Solution</h4>
                            <p>
                                We use <strong className="font-bold text-brand-navy">The Creative Method™</strong> to translate your strategy into visuals. We don't guess. We take the "Soul" we found in Phase 1 and build a body for it.
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* UNIFIED TIERS */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Engagement Models</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            The Menu.
                        </h2>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {DESIGN_POWER_TIERS.map((tier, i) => (
                            <AnimatedSection key={tier.slug} delay={i * 100} className="h-full">
                                <Link to={`/design-power/${tier.slug}`} className="block border border-brand-navy/20 p-10 hover:bg-brand-navy hover:text-brand-offwhite transition-colors duration-500 h-full group bg-white flex flex-col">
                                    <div className="flex justify-between items-start mb-10">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">{tier.subtitle || tier.timeline}</span>
                                        <span className="font-mono text-[9px] uppercase tracking-widest font-black px-3 py-1 bg-brand-navy/5 group-hover:bg-brand-offwhite/10 group-hover:text-brand-yellow transition-colors">Talk to us</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tighter mb-6">{tier.name}</h3>
                                    <p className="font-body text-lg md:text-xl text-brand-navy/60 group-hover:text-brand-offwhite/70 transition-colors leading-relaxed mb-8 flex-grow">
                                        {tier.desc}
                                    </p>

                                    <ul className="mt-8 space-y-3 border-t border-brand-navy/10 pt-8 group-hover:border-brand-offwhite/20 transition-colors">
                                        {(tier.deliverables || []).slice(0, 3).map((feature) => (
                                            <li key={feature} className="font-mono text-[10px] uppercase tracking-widest font-bold flex items-start gap-3 opacity-80 group-hover:opacity-100">
                                                <span className="w-1.5 h-1.5 bg-brand-purple group-hover:bg-brand-yellow transition-colors mt-1 block shrink-0"></span> {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-12 pt-6 border-t border-brand-navy/10 group-hover:border-brand-offwhite/20 flex items-center justify-between transition-colors">
                                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest">{tier.cta || "Explore Tier"}</span>
                                        <ArrowRight size={14} className="stroke-[3] text-brand-navy group-hover:text-brand-yellow transition-colors" />
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* UNIFIED OUTCOME */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Capabilities</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            How We<br/>Build.
                        </h2>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
                        {[
                            { step: "01", t: "The Download", d: "We don't start sketching until we understand the job. We take your strategy and turn it into a Visual Brief." },
                            { step: "02", t: "The Messy Art Work", d: "We show you the sketches, the bad ideas, and the rough drafts so we can find the gold together." },
                            { step: "03", t: "The Build", d: "Once we sign-off on the look, we build the design system. Every file, every format, every pixel—ready to use." },
                            { step: "04", t: "The Handoff", d: "We hand over the keys. Full ownership of assets, clear rules, and no hostage situations." }
                        ].map((o) => (
                            <div key={o.t} className="flex flex-col border-t border-brand-navy/10 pt-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold mb-4 block">{o.step}</span>
                                <h4 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 text-brand-navy">{o.t}</h4>
                                <p className="font-body text-lg text-brand-navy/70 leading-relaxed">{o.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
        </div>
    </PageTransition>
  );
};

export default DesignPowerPage;