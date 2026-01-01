
import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { WORKBOOKS } from '../../constants';

const WorkbookPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <div className="max-w-4xl mb-24">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Product / Digital Tools</span>
            <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[1.0] text-brand-navy">
              Tactical<br/><span className="text-brand-purple">Intelligence.</span>
            </h1>
            <p className="font-body text-2xl md:text-3xl text-brand-navy/70 mt-12 leading-tight">
              Tools, templates, and systems extracted directly from our studio workflow. No theory, just the raw files we use to run COOLO.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKBOOKS.map((product, index) => (
                <AnimatedSection key={product.title} delay={index * 150} className="h-full">
                    <div className="group border-2 border-brand-navy bg-white hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 h-full flex flex-col justify-between p-8 relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/></svg>
                        </div>

                        <div>
                            <div className="flex justify-between items-end border-b border-brand-navy/10 group-hover:border-brand-offwhite/20 pb-4 mb-8">
                                <span className="font-mono text-sm uppercase font-bold tracking-widest text-brand-purple group-hover:text-brand-yellow">Vol. {product.vol}</span>
                                <span className="font-mono text-xl font-black">{product.price}</span>
                            </div>
                            
                            <h3 className="text-4xl font-black uppercase leading-none tracking-tight mb-2">{product.title}</h3>
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-6">{product.subtitle}</span>
                            
                            <p className="font-body text-lg leading-relaxed text-brand-navy/70 group-hover:text-brand-offwhite/80 mb-8">
                                {product.description}
                            </p>

                            <ul className="space-y-2 mb-8">
                                {product.features.map(f => (
                                    <li key={f} className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1 h-1 bg-brand-navy group-hover:bg-brand-yellow"></span> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto">
                             <button className="w-full bg-brand-navy text-brand-offwhite group-hover:bg-brand-offwhite group-hover:text-brand-navy py-4 font-mono uppercase font-bold tracking-widest text-xs transition-colors">
                                 Add to Cart
                             </button>
                             <div className="text-center mt-3 font-mono text-[9px] uppercase tracking-widest opacity-50">
                                 Instant Download &bull; {product.format}
                             </div>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WorkbookPage;
