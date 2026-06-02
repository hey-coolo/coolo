import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { Drop } from '../types';

const DropsPage: React.FC = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Parallax Setup for the Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
    <div className="w-full bg-brand-offwhite min-h-screen font-sans text-brand-navy selection:bg-brand-navy selection:text-brand-yellow">
      
      {/* --- CINEMATIC IMAGE HERO --- */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24 md:pb-32 bg-brand-navy border-b border-brand-navy/20">
        
        {/* Parallax Background Image */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <img 
                src="/assets/images/drops-hero.jpg" // <-- UPLOAD YOUR HERO IMAGE HERE
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Support an Artist - COOLO Drops"
                loading="eager"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-brand-navy/10" />
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-[1600px]">
            <AnimatedSection>
                <div className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow mb-8 drop-shadow-md">
                [ The Internal Lab ]
                </div>
                <h1 className="font-sans text-[15vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-brand-offwhite m-0 mb-8">
                COOLO<br/>
                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #F7F7F7' }}>DROPS.</span>
                </h1>
                <p className="font-body text-lg md:text-2xl text-brand-offwhite/80 leading-relaxed font-light max-w-2xl drop-shadow-sm">
                Limited-run drops, designed by independent artists, backed by COOLO. You get exclusive physical goods. Artists get the funding to keep creating. No mass production.
                </p>
            </AnimatedSection>
        </div>
      </section>

      {/* --- UTILITY TOOLBAR --- */}
      <section className="border-b border-brand-navy/20 sticky top-[88px] md:top-[104px] z-30 bg-brand-offwhite/95 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy">
            <div className="opacity-50">
                {isLoading ? 'SYNCING INVENTORY...' : `COLLECTION [ ${drops.length} ]`}
            </div>
            <div className="hidden md:flex gap-8 opacity-50">
                <span>FILTER: ALL</span>
                <span>SORT: LATEST</span>
            </div>
        </div>
      </section>

      {/* --- CATALOGUE GRID --- */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[50vh]">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {[1, 2, 3, 4].map((skeleton) => (
                        <div key={skeleton} className="animate-pulse">
                            <div className="aspect-[4/5] bg-brand-navy/5 mb-6 w-full border border-brand-navy/10"></div>
                            <div className="h-6 bg-brand-navy/10 w-2/3 mb-2"></div>
                            <div className="h-3 bg-brand-navy/5 w-1/3"></div>
                        </div>
                    ))}
                </div>
            ) : errorMsg ? (
                <div className="p-12 border border-red-500 bg-red-50 text-red-700 font-mono text-sm max-w-2xl mx-auto text-center">
                    <h3 className="font-bold uppercase mb-4 text-lg">System Error</h3>
                    <p>{errorMsg}</p>
                </div>
            ) : drops.length === 0 ? (
                <div className="py-24 border border-brand-navy/20 text-center font-mono max-w-3xl mx-auto bg-white">
                    <h3 className="text-xl font-bold uppercase text-brand-navy mb-4">Inventory Empty</h3>
                    <p className="text-brand-navy/60 text-sm">No products found in the database. Please sync products in your Printful dashboard.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-y-24">
                    {drops.map((drop, index) => (
                        <AnimatedSection key={drop.slug} delay={index * 50}>
                            <Link to={`/support-an-artist/${drop.slug}`} className="group block h-full flex flex-col">
                                
                                {/* Image Container - Clean Editorial Style */}
                                <div className="relative aspect-[4/5] bg-white border border-brand-navy/10 overflow-hidden mb-6 p-8 flex items-center justify-center transition-colors duration-500 group-hover:border-brand-navy/30">
                                    {drop.imageUrl && (
                                        <img 
                                            src={drop.imageUrl} 
                                            alt={drop.title} 
                                            // object-contain & mix-blend-multiply removes the harsh mockup background boxes and makes them look like floating catalogue items
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-[0.19,1,0.22,1]"
                                        />
                                    )}
                                    {/* Status Pill */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`font-mono text-[9px] uppercase tracking-widest font-bold px-2 py-1 ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-white'}`}>
                                            {drop.status}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Product Meta */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <h3 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tight text-brand-navy group-hover:text-brand-purple transition-colors leading-none">
                                            {drop.title.replace(/_/g, ' ')}
                                        </h3>
                                        <span className="font-mono text-xs font-bold text-brand-navy shrink-0">
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

                    {/* Artist Submission Slot - Matching the minimal grid */}
                    <AnimatedSection delay={drops.length * 50}>
                        <Link to="/contact" className="group relative block h-full flex flex-col justify-center items-center text-center p-8 bg-brand-navy text-brand-offwhite hover:bg-brand-purple transition-colors duration-500 aspect-[4/5]">
                            <div className="relative z-10 flex flex-col items-center">
                                <h3 className="font-sans text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                                    PITCH A<br/>DROP
                                </h3>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/50 max-w-[200px] leading-relaxed mb-8">
                                    100% Artist Cut. Independent minds only.
                                </p>
                                <span className="font-mono text-xs uppercase tracking-widest font-bold border-b border-brand-yellow text-brand-yellow pb-1">
                                    Submit Concept
                                </span>
                            </div>
                        </Link>
                    </AnimatedSection>
                </div>
            )}
      </section>
    </div>
  );
};

export default DropsPage;