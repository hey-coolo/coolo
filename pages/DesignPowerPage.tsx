import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { DESIGN_POWER_TIERS } from '../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Terminal, Sparkles, Layers } from 'lucide-react';

const DesignPowerPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-brand-navy text-white overflow-hidden studio-grid pt-32">
      <Helmet>
        <title>Design Power & Visual Systems | COOLO</title>
        <meta name="description" content="Turn strategy into pure tangible assets. Explore our design ecosystems, custom Webflow builds, and full brand transformations." />
      </Helmet>

      {/* Ambient Lighting Background Accents */}
      <div className="absolute top-0 right-0 w-[60vw] h-[50vw] bg-brand-yellow/5 blur-[130px] rounded-full pointer-events-none z-0 translate-x-1/4 -translate-y-1/4" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* HEADER SECTION */}
        <AnimatedSection>
          <header className="py-20 md:py-32 max-w-5xl border-b border-white/5 mb-24">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">
              // Phase 02 / The Creative Execution Engine
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.88] tracking-tighter text-white select-text">
              Make It <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-offwhite to-brand-yellow italic">Real.</span>
            </h1>
            <p className="font-body text-xl md:text-2xl font-light text-white/70 mt-10 leading-relaxed max-w-3xl">
              You have the direction. Now you need to show up like it. This is where it becomes visible. Where ideas turn into something people can actually see, trust, and remember. Not just pretty design. Design that performs. That holds attention. That feels real across every brand touchpoint.
            </p>
          </header>
        </AnimatedSection>

        {/* HARSH TRUTH / SOLUTION SPLIT BLOCK */}
        <section className="py-20 border-b border-white/5 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-mono text-[9px] uppercase font-bold px-3 py-1 mb-4 rounded-full">
                        <Terminal size={10} />
                        <span>TACTICAL MATRIX OVERLAY</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                        Death to<br/>Clip Art.
                    </h2>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10 font-mono text-xs">
                    <div className="bg-platform-dark/20 border border-white/5 p-6 rounded-xs">
                        <h4 className="text-brand-purple uppercase tracking-widest text-[10px] font-black mb-3">// The Harsh Truth</h4>
                        <p className="font-body text-sm font-light text-white/60 leading-relaxed">
                            <strong>People judge books by their covers.</strong> It sucks, but it’s true. If your business looks like it was made in MS Paint, nobody is going to trust your internal strategy layers.
                        </p>
                    </div>
                    <div className="bg-platform-dark/20 border border-white/5 p-6 rounded-xs">
                        <h4 className="text-brand-yellow uppercase tracking-widest text-[10px] font-black mb-3">// The Solution</h4>
                        <p className="font-body text-sm font-light text-white/60 leading-relaxed">
                            We use <strong>The Creative Method™</strong> to translate your strategy into high-resolution visuals. We don't guess. We take the "Soul" we found in Phase 1 and build a body for it.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* RESTORED DESIGN POWER TIERS ROUTING MATRIX */}
        <section className="mb-24">
            <div className="mb-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-yellow font-bold block">// DESIGN MENUS MATRIX</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DESIGN_POWER_TIERS.map((tier) => (
                    <AnimatedSection key={tier.slug}>
                        <Link 
                            to={`/design-power/${tier.slug}`} 
                            className="block border border-white/5 p-10 bg-platform-dark/20 hover:bg-platform-dark/50 rounded-sm transition-all duration-400 group relative overflow-hidden neon-glow-border shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">{tier.timeline}</span>
                                        <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-2.5 py-0.5 font-mono text-[9px] text-white/40 group-hover:text-white/60">
                                            <Layers size={10} />
                                            <span>Production Asset</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">{tier.name}</h3>
                                    <p className="font-body text-sm font-light text-white/60 group-hover:text-white/70 transition-colors leading-relaxed min-h-[4.5rem]">
                                        {tier.desc}
                                    </p>

                                    <ul className="mt-6 space-y-2 border-t border-white/5 pt-6 font-mono text-[9px] uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-colors">
                                        {(tier.deliverables || []).slice(0, 3).map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-brand-purple group-hover:bg-brand-yellow rounded-full transition-colors"></span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-10 flex items-center gap-3 font-mono text-xs font-bold text-white/80 group-hover:text-brand-yellow transition-colors">
                                    <span>{tier.cta}</span>
                                    <div className="w-8 h-[1px] bg-white/20 group-hover:bg-brand-yellow group-hover:w-16 transition-all duration-400"></div>
                                </div>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        {/* THE METHODOLOGY WORKFLOW SECTION */}
        <section className="py-20 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <h3 className="text-3xl font-black uppercase text-white tracking-tight italic">How we build and design brands.</h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10 font-mono">
                    {[
                        { step: "01", t: "The Download", d: "We don't start sketching until we thoroughly process the baseline metrics. We transform your strategy logs into a clean Visual Brief." },
                        { step: "02", t: "The Messy Art Work", d: "We expose the internal sketches, the rough draft layers, and the direction matrices so we can pinpoint the edge assets together." },
                        { step: "03", t: "The Build", d: "Once the creative posture is locked, we synthesize the design system. Every file vector format is compiled—ready to run." },
                        { step: "04", t: "The Handoff", d: "We turn over the master keys. Full clean ownership of visual components, simple rules, and zero hostage pipelines." }
                    ].map(o => (
                        <div key={o.t} className="bg-platform-dark/10 border border-white/5 p-6 rounded-xs">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-brand-purple text-[10px] font-black">[{o.step}]</span>
                                <h4 className="text-white uppercase tracking-widest text-[10px] font-black">{o.t}</h4>
                            </div>
                            <p className="font-body text-sm font-light text-white/60 leading-relaxed">{o.d}</p>
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