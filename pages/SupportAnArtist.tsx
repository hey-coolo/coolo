import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Drop } from '../types';

const DropsPage: React.FC = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (Array.isArray(data)) {
            setDrops(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-brand-offwhite min-h-screen">
      {/* Section 01: Hero */}
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

      {/* Section 02: Grid Toolbar */}
      <section className="border-b border-brand-navy/10 sticky top-[88px] md:top-[104px] z-30 bg-brand-offwhite/90 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/50">
                {isLoading ? 'SYNCING INVENTORY...' : `SHOWING ${drops.length} RESULTS`}
            </div>
            <div className="flex gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold border border-brand-navy/20 px-4 py-2 hover:bg-brand-navy hover:text-white transition-colors cursor-pointer">All Categories</span>
            </div>
        </div>
      </section>

      {/* Section 03: The Editorial E-Comm Grid */}
      <section className="py-16 md:py-24">
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
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {drops.map((drop, index) => (
                        <AnimatedSection key={drop.slug} delay={index * 50}>
                            <Link to={`/support-an-artist/${drop.slug}`} className="group block h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative aspect-[4/5] bg-brand-navy/5 overflow-hidden border border-brand-navy/5 mb-6">
                                    {drop.imageUrl && (
                                        <img 
                                            src={drop.imageUrl} 
                                            alt={drop.title} 
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[0.19,1,0.22,1]"
                                        />
                                    )}
                                    {/* Status Pill */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-sm ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-white'}`}>
                                            {drop.status}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Product Meta */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-sans text-3xl font-black uppercase tracking-tight text-brand-navy group-hover:text-brand-purple transition-colors">
                                            {drop.title}
                                        </h3>
                                        <span className="font-sans text-2xl font-bold text-brand-navy">
                                            ${drop.price}
                                        </span>
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

      {/* Section 04: Footer Pitch */}
      <section className="py-24 md:py-32 bg-brand-navy text-brand-offwhite text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSection>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-yellow font-bold mb-6 block">Artist Submissions</span>
            <h2 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tight mb-8">
              Got a dangerous good idea?
            </h2>
            <p className="font-body text-xl md:text-2xl mb-12 opacity-80 leading-relaxed font-light">
              We are always looking for independent minds. If your work is sharp enough, we'll fund it, build it, and launch it with you. 100% of the artist's cut goes to you.
            </p>
            <Link to="/contact" className="inline-block border-2 border-brand-yellow text-brand-yellow px-12 py-5 font-mono uppercase font-bold text-sm tracking-widest hover:bg-brand-yellow hover:text-brand-navy transition-all">
              Pitch Your Drop
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default DropsPage;