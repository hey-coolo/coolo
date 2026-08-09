import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { PARTNERSHIP_MODELS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const PartnershipPage: React.FC = () => {
  return (
    <PageTransition>
        <div className="bg-brand-offwhite min-h-screen pt-32 pb-32">
        <div className="container mx-auto px-6 md:px-12">
            
            {/* UNIFIED HEADER */}
            <AnimatedSection>
                <header className="py-24 md:py-32 max-w-6xl">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-bold block mb-8">Phase 03 / The Scale Button</span>
                    <h1 className="text-brand-navy text-[15vw] md:text-[12vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mt-0 mb-12">
                        Plug <br/>
                        <span className="text-brand-purple italic">& Play.</span>
                    </h1>
                    <p className="font-body text-2xl md:text-3xl lg:text-4xl text-brand-navy/80 leading-tight max-w-4xl">
                        For senior agencies and visionaries. We are the elite unit you plug into your process to handle the heavy lifting of high-end execution.
                    </p>
                </header>
            </AnimatedSection>

            {/* UNIFIED TIERS */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Engagement Models</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            The Menu.
                        </h2>
                        <p className="mt-8 font-body text-xl text-brand-navy/70 leading-relaxed max-w-sm">
                            We don't do typical freelancer arrangements. We build partnerships based on specific outputs and high accountability.
                        </p>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {PARTNERSHIP_MODELS.map((model, index) => {
                            const isEquity = model.slug === 'equity';
                            return (
                                <AnimatedSection key={model.slug} delay={index * 100} className="h-full">
                                    <Link 
                                        to={`/partnership/${model.slug}`} 
                                        className={`block border p-10 transition-colors duration-500 h-full group flex flex-col ${
                                            isEquity 
                                            ? 'bg-brand-navy text-brand-offwhite border-brand-navy hover:bg-white hover:text-brand-navy' 
                                            : 'bg-white border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-brand-offwhite'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-10">
                                            <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${isEquity ? 'text-brand-yellow group-hover:text-brand-purple' : 'text-brand-purple group-hover:text-brand-yellow'}`}>
                                                {model.commitment}
                                            </span>
                                            <span className={`font-mono text-[9px] uppercase tracking-widest font-black px-3 py-1 transition-colors ${isEquity ? 'bg-brand-offwhite/10 group-hover:bg-brand-navy/5 text-brand-yellow group-hover:text-brand-navy' : 'bg-brand-navy/5 group-hover:bg-brand-offwhite/10 group-hover:text-brand-yellow'}`}>
                                                {model.priceLabel}
                                            </span>
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                                            {model.title}
                                        </h3>
                                        <p className={`font-body text-lg md:text-xl transition-colors leading-relaxed mb-8 flex-grow ${isEquity ? 'text-brand-offwhite/70 group-hover:text-brand-navy/60' : 'text-brand-navy/60 group-hover:text-brand-offwhite/70'}`}>
                                            {model.description}
                                        </p>
                                        
                                        <div className={`mt-12 pt-6 border-t flex items-center justify-between transition-colors ${isEquity ? 'border-brand-offwhite/20 group-hover:border-brand-navy/10' : 'border-brand-navy/10 group-hover:border-brand-offwhite/20'}`}>
                                            <span className="font-mono text-[10px] uppercase font-bold tracking-widest">View Details</span>
                                            <ArrowRight size={14} className={`stroke-[3] transition-colors ${isEquity ? 'text-brand-yellow group-hover:text-brand-navy' : 'text-brand-navy group-hover:text-brand-yellow'}`} />
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* UNIFIED OUTCOME / CAPABILITIES */}
            <section className="py-32 border-t border-brand-navy/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Capabilities</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            What We<br/>Ship.
                        </h2>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
                        {[
                            { title: "Strategy", items: ["Brand Compass", "Positioning", "Messaging Matrix"] },
                            { title: "Identity", items: ["Visual Systems", "Logo Design", "Typography"] },
                            { title: "Motion & 3D", items: ["Product Viz", "Campaign Assets", "Social Motion"] },
                            { title: "Digital", items: ["Webflow Dev", "UI/UX Design", "Framer Sites"] }
                        ].map((cap, index) => (
                            <div key={cap.title} className="flex flex-col border-t border-brand-navy/10 pt-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold mb-4 block">0{index + 1}</span>
                                <h4 className="font-display text-2xl font-black uppercase tracking-tighter mb-6 text-brand-navy">{cap.title}</h4>
                                <ul className="space-y-4">
                                    {cap.items.map(i => (
                                        <li key={i} className="font-body text-lg text-brand-navy/70 flex items-center gap-4">
                                            <span className="w-1.5 h-1.5 bg-brand-navy/20 block shrink-0"></span> {i}
                                        </li>
                                    ))}
                                </ul>
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

export default PartnershipPage;