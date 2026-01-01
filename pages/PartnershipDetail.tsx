
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PARTNERSHIP_MODELS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';

const PartnershipDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const model = PARTNERSHIP_MODELS.find(m => m.slug === slug);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
        <div className="text-center">
            <h1 className="text-6xl font-black uppercase text-brand-navy tracking-tight">Model_Error</h1>
            <Link to="/partnership" className="font-mono uppercase underline mt-8 block text-brand-purple tracking-widest text-xs">Return to Scale</Link>
        </div>
      </div>
    );
  }

  const isEquity = model.slug === 'equity';

  return (
    <div className={`min-h-screen pt-32 ${isEquity ? 'bg-brand-navy text-brand-offwhite' : 'bg-brand-offwhite text-brand-navy'}`}>
      <div className="container mx-auto px-8 pb-32">
        
        {/* Header */}
        <AnimatedSection>
          <header className="py-24 max-w-5xl">
            <Link to="/partnership" className={`font-mono uppercase tracking-[0.3em] text-xs font-bold mb-8 block transition-colors ${isEquity ? 'text-brand-yellow hover:text-brand-offwhite' : 'text-brand-purple hover:text-brand-navy'}`}>
              &larr; Service Leg 03 / {model.title}
            </Link>
            <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9]">
              {model.title}
            </h1>
            <p className={`font-body text-2xl md:text-3xl mt-12 leading-tight max-w-3xl ${isEquity ? 'text-brand-offwhite/70' : 'text-brand-navy/70'}`}>
              {model.description}
            </p>
          </header>
        </AnimatedSection>

        {/* Breakdown Grid */}
        <section className={`grid grid-cols-1 lg:grid-cols-12 gap-16 py-24 border-t-2 ${isEquity ? 'border-brand-offwhite/20' : 'border-brand-navy'}`}>
            
            {/* Sidebar Meta */}
            <div className="lg:col-span-4 space-y-12">
                <AnimatedSection delay={100}>
                    <div className={`p-8 ${isEquity ? 'bg-brand-offwhite text-brand-navy' : 'bg-brand-navy text-brand-offwhite'}`}>
                        <span className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 block ${isEquity ? 'text-brand-purple' : 'text-brand-yellow'}`}>Commitment</span>
                        <h3 className="text-4xl font-black uppercase tracking-tight">{model.commitment}</h3>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                    <div className={`p-8 border ${isEquity ? 'border-brand-offwhite/20' : 'border-brand-navy/10'}`}>
                        <span className={`font-mono text-xs uppercase tracking-widest font-bold mb-2 block ${isEquity ? 'text-brand-yellow' : 'text-brand-purple'}`}>Pricing Model</span>
                        <h3 className="text-2xl font-black uppercase tracking-tight">{model.priceLabel}</h3>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                    <div>
                        <span className={`font-mono text-xs uppercase tracking-widest font-bold mb-4 block ${isEquity ? 'text-brand-yellow' : 'text-brand-purple'}`}>Ideal For</span>
                        <p className={`font-body text-xl leading-relaxed ${isEquity ? 'text-brand-offwhite/80' : 'text-brand-navy/80'}`}>
                            {model.idealFor}
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={400}>
                    <Link to="/contact" className={`block w-full font-mono text-sm font-black uppercase py-6 tracking-widest text-center transition-all shadow-xl ${isEquity ? 'bg-brand-yellow text-brand-navy hover:bg-brand-offwhite' : 'bg-brand-purple text-brand-offwhite hover:bg-brand-yellow hover:text-brand-navy'}`}>
                        Initiate {model.title}
                    </Link>
                </AnimatedSection>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
                <AnimatedSection>
                    <h3 className="text-5xl font-black uppercase tracking-tight mb-8">Operational Details</h3>
                    <p className={`font-body text-xl md:text-2xl leading-relaxed mb-16 ${isEquity ? 'text-brand-offwhite/80' : 'text-brand-navy/80'}`}>
                        {model.details}
                    </p>
                </AnimatedSection>

                <div className="mb-24">
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-12">Core Deliverables</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {model.deliverables.map((item, index) => (
                            <AnimatedSection key={index} delay={index * 50}>
                                <div className={`border-l-4 pl-6 py-4 group transition-colors ${isEquity ? 'border-brand-offwhite/20 hover:border-brand-yellow' : 'border-brand-navy/10 hover:border-brand-purple'}`}>
                                    <span className={`font-mono text-[10px] uppercase font-bold mb-2 block ${isEquity ? 'text-brand-offwhite/40 group-hover:text-brand-yellow' : 'text-brand-navy/30 group-hover:text-brand-purple'}`}>Output 0{index + 1}</span>
                                    <h4 className={`text-2xl font-black uppercase tracking-tight transition-colors ${isEquity ? 'text-brand-offwhite group-hover:text-brand-yellow' : 'text-brand-navy group-hover:text-brand-purple'}`}>{item}</h4>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
      </div>

      {/* Footer Nav - Solid Color Kinetic Hover */}
      <section className="py-48 group bg-brand-navy hover:bg-brand-purple transition-colors duration-700 flex flex-col items-center justify-center overflow-hidden">
         <Link to="/partnership" className="block relative z-10 text-center w-full">
            <span className="font-mono text-brand-offwhite/50 group-hover:text-brand-offwhite uppercase tracking-[0.5em] text-xs font-black transition-colors duration-500">System Navigation</span>
            <div className="overflow-hidden mt-12">
                <h3 className="text-6xl md:text-[8vw] font-black uppercase tracking-tight text-brand-offwhite transform transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105">
                    Return to Scale &larr;
                </h3>
            </div>
        </Link>
      </section>
    </div>
  );
};

export default PartnershipDetail;
