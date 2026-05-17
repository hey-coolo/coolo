import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { PARTNERSHIP_MODELS } from '../constants';
import { Link } from 'react-router-dom';

const PartnershipPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold block mb-4">Phase 03 / The Scale Button</span>
            <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
              Plug <br/><span className="text-brand-purple italic">& Play.</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              For senior agencies and visionaries. We are the elite unit you plug into your process to handle the heavy lifting of high-end execution.
            </p>
          </header>
        </AnimatedSection>

        {/* ENGAGEMENT MODELS - BRUTALIST TIERS */}
        <section className="py-32 border-t-2 border-brand-navy mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                 <div className="lg:col-span-4">
                     <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-4 block">How We Engage</span>
                     <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-brand-navy">
                        Engagement<br/>Models.
                     </h2>
                     <p className="mt-8 font-body text-xl text-brand-navy/60 leading-relaxed">
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
                                    className={`block border-2 p-12 transition-all duration-500 h-full group relative overflow-hidden flex flex-col justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
                                        isEquity 
                                        ? 'bg-brand-navy text-brand-offwhite border-brand-navy shadow-[12px_12px_0px_0px_#FCC803] hover:bg-white hover:text-brand-navy' 
                                        : 'bg-white border-brand-navy text-brand-navy shadow-[12px_12px_0px_0px_#0F0328] hover:bg-brand-navy hover:text-brand-offwhite'
                                    }`}
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <span className={`font-mono text-xs uppercase tracking-widest font-bold transition-colors ${isEquity ? 'text-brand-yellow group-hover:text-brand-purple' : 'text-brand-purple group-hover:text-brand-yellow'}`}>
                                                {model.commitment}
                                            </span>
                                            <span className={`font-mono text-[10px] uppercase font-black px-2 py-1 transition-colors ${isEquity ? 'bg-brand-offwhite/10 group-hover:bg-brand-navy/5 text-brand-yellow group-hover:text-brand-navy' : 'bg-brand-navy/5 group-hover:bg-brand-offwhite/10 group-hover:text-brand-yellow'}`}>
                                                {model.priceLabel}
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-black uppercase tracking-tight mb-6 leading-none">
                                            {model.title}
                                        </h3>
                                        <p className={`font-body text-xl transition-colors leading-relaxed min-h-[80px] ${isEquity ? 'text-brand-offwhite/70 group-hover:text-brand-navy/60' : 'text-brand-navy/60 group-hover:text-brand-offwhite/70'}`}>
                                            {model.description}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-12 flex items-center gap-4">
                                        <span className="font-mono text-sm uppercase font-bold tracking-widest">View Details</span>
                                        <div className={`w-12 h-[2px] transition-all duration-500 group-hover:w-24 ${isEquity ? 'bg-brand-offwhite group-hover:bg-brand-navy' : 'bg-brand-navy group-hover:bg-brand-yellow'}`}></div>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        );
                    })}
                 </div>
            </div>
        </section>

        {/* ALIGNED CAPABILITIES SECTION */}
        <section className="pb-32 border-t border-brand-navy/10 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <h3 className="text-4xl font-black uppercase text-brand-navy tracking-tight italic">What We Ship.</h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                     {[
                         { title: "Strategy", items: ["Brand Compass", "Positioning", "Messaging Matrix"] },
                         { title: "Identity", items: ["Visual Systems", "Logo Design", "Typography"] },
                         { title: "Motion & 3D", items: ["Product Viz", "Campaign Assets", "Social Motion"] },
                         { title: "Digital", items: ["Webflow Dev", "UI/UX Design", "Framer Sites"] }
                     ].map(cap => (
                         <div key={cap.title}>
                             <h4 className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-4">{cap.title}</h4>
                             <ul className="space-y-3">
                                 {cap.items.map(i => (
                                     <li key={i} className="font-body text-xl text-brand-navy/80 flex items-center gap-3">
                                         <span className="w-1 h-1 bg-brand-navy/20"></span> {i}
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
  );
};

export default PartnershipPage;