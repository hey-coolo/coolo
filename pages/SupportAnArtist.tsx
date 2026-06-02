import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { Drop } from '../types';

const DropsPage: React.FC = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="w-full bg-brand-offwhite min-h-screen font-sans text-brand-navy pt-24 md:pt-32">
      
      {/* --- STORE MARQUEE (E-Commerce Vibe) --- */}
      <div className="bg-brand-navy border-y-2 border-brand-navy py-3 overflow-hidden flex whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ ease: "linear", duration: 25, repeat: Infinity }} 
            className="flex font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-brand-yellow"
          >
              {[...Array(8)].map((_, i) => (
                  <span key={i} className="mx-8">
                      MADE ON DEMAND &bull; 100% ARTIST CUT &bull; SECURE CHECKOUT &bull; GLOBAL SHIPPING &bull;
                  </span>
              ))}
          </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-8 max-w-[1600px]">
          
          {/* --- EDITORIAL HERO BANNER --- */}
          <section className="py-8 md:py-12">
              <AnimatedSection>
                  <div className="relative w-full h-[50vh] md:h-[60vh] bg-brand-navy overflow-hidden group border border-brand-navy/10">
                      {/* Upload your e-commerce hero image here */}
                      <img 
                          src="/assets/images/drops-hero.jpg" 
                          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[0.19,1,0.22,1]"
                          alt="Latest Drop Campaign"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop'; }} // Fallback if image is missing
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-yellow mb-4 drop-shadow-md">
                              Collection 01
                          </span>
                          <h2 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-brand-offwhite m-0 drop-shadow-lg">
                              LATEST<br/>
                              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #F7F7F7' }}>DROP.</span>
                          </h2>
                      </div>
                  </div>
              </AnimatedSection>
          </section>

          {/* --- UTILITY TOOLBAR --- */}
          <section className="border-y border-brand-navy/20 sticky top-[88px] md:top-[104px] z-30 bg-brand-offwhite/95 backdrop-blur-md mb-12">
            <div className="py-4 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy">
                <div className="flex gap-8">
                    <span className="text-brand-purple">ALL PRODUCTS</span>
                    <span className="hidden md:inline hover:text-brand-purple cursor-pointer transition-colors">OUTERWEAR</span>
                    <span className="hidden md:inline hover:text-brand-purple cursor-pointer transition-colors">ACCESSORIES</span>
                </div>
                <div className="opacity-50">
                    {isLoading ? 'SYNCING...' : `[ ${drops.length} ITEMS ]`}
                </div>
            </div>
          </section>

          {/* --- MINIMALIST CATALOGUE GRID --- */}
          <section className="pb-32 min-h-[50vh]">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                        {[1, 2, 3, 4].map((skeleton) => (
                            <div key={skeleton} className="animate-pulse">
                                <div className="aspect-[4/5] bg-white border border-brand-navy/10 mb-6 w-full"></div>
                                <div className="h-6 bg-brand-navy/10 w-3/4 mb-2"></div>
                                <div className="h-4 bg-brand-navy/5 w-1/4"></div>
                            </div>
                        ))}
                    </div>
                ) : errorMsg ? (
                    <div className="p-12 border border-red-500 bg-red-50 text-red-700 font-mono text-sm max-w-2xl mx-auto text-center">
                        <h3 className="font-bold uppercase mb-4 text-lg">System Error</h3>
                        <p>{errorMsg}</p>
                    </div>
                ) : drops.length === 0 ? (
                    <div className="py-32 border border-brand-navy/10 text-center font-mono max-w-4xl mx-auto bg-white shadow-sm">
                        <h3 className="text-2xl font-bold uppercase text-brand-navy mb-4">Store Empty</h3>
                        <p className="text-brand-navy/60 text-sm">No products found. Please sync inventory via Printful.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-y-20">
                        {drops.map((drop, index) => (
                            <AnimatedSection key={drop.slug} delay={index * 50}>
                                <Link to={`/support-an-artist/${drop.slug}`} className="group block h-full flex flex-col">
                                    
                                    {/* High-End Product Image Container */}
                                    <div className="relative aspect-[4/5] bg-white border border-brand-navy/10 overflow-hidden mb-6 p-6 md:p-10 flex items-center justify-center transition-colors duration-500 group-hover:border-brand-navy">
                                        {drop.imageUrl && (
                                            <img 
                                                src={drop.imageUrl} 
                                                alt={drop.title} 
                                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-[0.19,1,0.22,1]"
                                            />
                                        )}
                                        {/* Minimal Status Pill */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`font-mono text-[9px] uppercase tracking-widest font-bold px-2 py-1 ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-white'}`}>
                                                {drop.status}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Clean Product Meta */}
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tight text-brand-navy group-hover:text-brand-purple transition-colors leading-none">
                                                {drop.title.replace(/_/g, ' ')}
                                            </h3>
                                            <span className="font-mono text-xs font-bold text-brand-navy shrink-0 mt-0.5">
                                                ${drop.price}
                                            </span>
                                        </div>
                                        <div className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 font-bold">
                                            {drop.category}
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>
                )}
          </section>

          {/* --- EDITORIAL PITCH BANNER --- */}
          <section className="pb-32">
              <AnimatedSection>
                  <div className="w-full bg-brand-navy text-brand-offwhite flex flex-col lg:flex-row items-center justify-between p-12 md:p-24 border border-brand-navy shadow-[16px_16px_0px_#FCC803] relative overflow-hidden group">
                      
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F7F7F7_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

                      <div className="relative z-10 text-center lg:text-left mb-12 lg:mb-0">
                          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-yellow mb-4 block">
                              Artist Submissions
                          </span>
                          <h2 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                              PITCH A<br/>DROP.
                          </h2>
                          <p className="font-body text-lg text-brand-offwhite/70 max-w-md font-light leading-relaxed">
                              We are always looking for independent minds. If your work is sharp enough, we'll fund it, build it, and launch it with you. 100% of the artist's cut goes to you.
                          </p>
                      </div>

                      <div className="relative z-10 w-full lg:w-auto">
                          <Link to="/contact" className="block w-full lg:w-auto text-center bg-brand-yellow text-brand-navy font-mono text-sm uppercase font-black tracking-widest px-12 py-6 hover:bg-white transition-colors duration-300">
                              Submit Concept
                          </Link>
                      </div>
                  </div>
              </AnimatedSection>
          </section>
      </div>
    </div>
  );
};

export default DropsPage;