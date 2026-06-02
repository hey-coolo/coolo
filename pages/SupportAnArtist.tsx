import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Drop } from '../types';

const DropsPage: React.FC = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?t=${Date.now()}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `API Error: ${response.status}`);
        }
        
        if (Array.isArray(data)) {
            setDrops(data);
        } else {
            throw new Error("Data returned is not an array");
        }
      } catch (error: any) {
        console.error("API Fetch Error:", error);
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-brand-offwhite min-h-screen">
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-8 border-b-2 border-brand-navy">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-brand-purple mb-6">
              [ THE INTERNAL LAB ]
            </div>
            <h1 className="font-sans text-[12vw] md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-brand-navy mb-8">
              SUPPORT AN<br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #0F0328' }}>ARTIST.</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-brand-navy/70 max-w-3xl mb-10 leading-relaxed font-light">
              Limited-run drops, designed by independent artists, backed by COOLO. You get exclusive physical goods. Artists get the funding to keep creating. No mass production.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="border-b border-brand-navy/10 sticky top-[88px] md:top-[104px] z-30 bg-brand-offwhite/90 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/50">
                {isLoading ? 'SYNCING INVENTORY...' : `SHOWING ${drops.length} RESULTS`}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 pb-32">
        <div className="container mx-auto px-6 md:px-8">
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {[1, 2, 3].map((skeleton) => (
                        <div key={skeleton} className="animate-pulse">
                            <div className="aspect-[4/5] bg-brand-navy/10 mb-6 w-full"></div>
                            <div className="h-8 bg-brand-navy/10 w-3/4 mb-2"></div>
                            <div className="h-4 bg-brand-navy/10 w-1/4 mb-4"></div>
                            <div className="h-12 bg-brand-navy/10 w-full"></div>
                        </div>
                    ))}
                </div>
            ) : errorMsg ? (
                <div className="p-12 border-2 border-red-500 bg-red-50 text-red-700 font-mono">
                    <h3 className="text-xl font-bold uppercase mb-4">System Error Detected</h3>
                    <p>{errorMsg}</p>
                </div>
            ) : drops.length === 0 ? (
                <div className="p-12 border-2 border-brand-navy/20 text-center font-mono">
                    <h3 className="text-xl font-bold uppercase text-brand-navy mb-4">Store Empty</h3>
                    <p className="text-brand-navy/60">No products found in Printful. Please sync products in your dashboard.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {drops.map((drop, index) => (
                        <AnimatedSection key={drop.slug} delay={index * 50}>
                            <Link to={`/support-an-artist/${drop.slug}`} className="group block h-full flex flex-col">
                                <div className="relative aspect-[4/5] bg-brand-navy/5 overflow-hidden border border-brand-navy/5 mb-6">
                                    {drop.imageUrl && (
                                        <img 
                                            src={drop.imageUrl} 
                                            alt={drop.title} 
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[0.19,1,0.22,1]"
                                        />
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className={`font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-sm ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-white'}`}>
                                            {drop.status}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-sans text-3xl font-black uppercase tracking-tight text-brand-navy group-hover:text-brand-purple transition-colors">
                                            {drop.title}
                                        </h3>
                                    </div>
                                    <div className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 font-bold mb-4">
                                        {drop.category}
                                    </div>
                                    <p className="font-body text-sm text-brand-navy/60 line-clamp-2 mt-auto">
                                        {drop.description}
                                    </p>
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>
            )}
        </div>
      </section>
    </div>
  );
};

export default DropsPage;