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
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm font-bold">Leg 3: Scale</span>
            <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] mt-0">
              The Scale<br/><span className="text-brand-purple italic">Button.</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-navy/70 mt-12 leading-tight max-w-3xl">
              For senior agencies and visionaries. We are the elite unit you plug into your process to handle the heavy lifting of high-end execution.
            </p>
          </header>
        </AnimatedSection>

        {/* Engagement Models */}
        <section className="py-32 border-t border-brand-navy/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                 <div className="lg:col-span-4">
                     <h2 className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-8">How We Engage</h2>
                     <h3 className="text-5xl font-black uppercase tracking-tight leading-none text-brand-navy">Engagement<br/>Models.</h3>
                 </div>
                 <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PARTNERSHIP_MODELS.map((model, index) => {
                        const isEquity = model.slug === 'equity';
                        return (
                            <AnimatedSection key={model.slug} delay={index * 100} className="h-full">
                                <Link 
                                    to={`/partnership/${model.slug}`} 
                                    className={`block p-12 border h-full flex flex-col transition-all duration-300 group relative overflow-hidden ${
                                        isEquity 
                                        ? 'bg-brand-navy text-brand-offwhite border-brand-navy hover:scale-[1.02]' 
                                        : 'bg-white border-brand-navy/10 hover:border-brand-purple'
                                    }`}
                                >
                                    <h4 className={`text-3xl font-black uppercase tracking-tight mb-4 ${isEquity ? 'text-brand-yellow' : 'text-brand-navy'}`}>
                                        {model.title}
                                    </h4>
                                    <p className={`font-body text-lg mb-8 flex-grow ${isEquity ? 'text-brand-offwhite/70' : 'text-brand-navy/70'}`}>
                                        {model.description}
                                    </p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className={`font-mono text-xs uppercase px-4 py-2 font-bold ${isEquity ? 'bg-brand-offwhite/10 text-brand-offwhite' : 'bg-brand-navy/5 text-brand-navy'}`}>
                                            {model.priceLabel}
                                        </span>
                                        <span className={`font-mono text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300 ${isEquity ? 'text-brand-yellow' : 'text-brand-purple'}`}>
                                            View Details &rarr;
                                        </span>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        );
                    })}
                 </div>
            </div>
        </section>

        {/* Capabilities */}
        <section className="py-32 border-t border-brand-navy/10 bg-white -mx-8 px-8">
            <div className="container mx-auto">
                <div className="max-w-4xl mb-16">
                    <h2 className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-6">Capabilities</h2>
                    <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none text-brand-navy">What We Ship.</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {[
                         { title: "Strategy", items: ["Brand Compass", "Positioning", "Messaging Matrix"] },
                         { title: "Identity", items: ["Visual Systems", "Logo Design", "Typography"] },
                         { title: "Motion", items: ["3D Product Viz", "Campaign Assets", "Social Motion"] },
                         { title: "Digital", items: ["Webflow Dev", "UI/UX Design", "Framer Sites"] }
                     ].map(cap => (
                         <div key={cap.title} className="p-8 border-l-2 border-brand-navy pl-8">
                             <h4 className="text-2xl font-black uppercase tracking-tight mb-6">{cap.title}</h4>
                             <ul className="space-y-4">
                                 {cap.items.map(i => (
                                     <li key={i} className="font-mono text-sm uppercase tracking-widest text-brand-navy/70 flex items-center gap-2">
                                         <span className="w-1 h-1 bg-brand-purple"></span> {i}
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