import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { Drop } from '../types';

const AboutPage: React.FC = () => {
  const [featuredDrop, setFeaturedDrop] = useState<Drop | null>(null);

  useEffect(() => {
    // Fetch the latest product from the store to feature on the About page
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Grab the first live drop
          const liveDrop = data.find((d: Drop) => d.status === 'Live') || data[0];
          setFeaturedDrop(liveDrop);
        }
      })
      .catch(err => console.error("Error fetching featured drop:", err));
  }, []);

  return (
    <div className="bg-brand-offwhite pt-32">
      <div className="container mx-auto px-8">
        
        {/* Header / Origin Story */}
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl relative">
            <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black block">Identity & Essence</span>
            </div>
            <h1 className="text-brand-navy text-7xl md:text-[11vw] font-black uppercase tracking-tight leading-[0.9] mt-8">
              How great brands<br/><span className="text-brand-purple italic">earn attention.</span>
            </h1>
          </header>
        </AnimatedSection>

        {/* Narrative / History */}
        <section className="pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 border-t-2 border-brand-navy pt-24">
            <div className="lg:col-span-5">
                <h3 className="text-4xl font-black uppercase tracking-tight text-brand-navy leading-none sticky top-32">
                    Creative<br/>Consultancy.
                </h3>
            </div>
            <div className="lg:col-span-7 space-y-12 text-xl md:text-2xl font-light text-brand-navy/80 leading-relaxed">
                <AnimatedSection delay={100}>
                    <p>
                        Nobody hires branding. People hire decisions. We are a creative consultancy built to make the right ones.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                    <p>
                        We don't just decorate businesses. We define positioning, build identity systems, and engineer cultural relevance. We make the strategic decisions that guide how your brand behaves in the real world.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={300}>
                    <p>
                        Operating from Mount Maunganui, we provide independent creative direction for ambitious brands. We strip away the corporate noise to build systems that people actually remember.
                    </p>
                </AnimatedSection>
            </div>
        </section>

        {/* The Partnership / Team CMS Integration */}
        <section className="py-32 relative border-t-2 border-brand-navy">
            <AnimatedSection>
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-4 block">The Partnership</span>
                        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                            Franco <span className="text-brand-purple">+</span><br/>Ariana
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-brand-navy/60 leading-relaxed text-right">
                        Founders don't buy logos.<br/>They buy confidence that someone can guide the brand after the logo is approved.
                    </p>
                </div>
            </AnimatedSection>

            {/* The Dynamics Matrix */}
            <AnimatedSection delay={100}>
                <div className="mb-32 flex flex-col border-2 border-brand-navy bg-white shadow-[12px_12px_0px_0px_#0F0328]">
                    {[
                        { left: "Creative direction", right: "Growth systems" },
                        { left: "Brand vision", right: "Client experience" },
                        { left: "Art direction", right: "Operations" },
                        { left: "Attention systems", right: "Business development" },
                        { left: "Campaign thinking", right: "Long-term growth" }
                    ].map((row, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-brand-navy last:border-b-0">
                            <div className="p-8 md:p-10 md:border-r-2 border-brand-navy flex items-center md:justify-end">
                                <span className="text-2xl md:text-4xl font-black uppercase tracking-tight text-brand-navy">{row.left}</span>
                            </div>
                            <div className="p-8 md:p-10 bg-brand-navy/5 flex items-center">
                                <span className="text-2xl md:text-4xl font-black uppercase tracking-tight text-brand-purple"><span className="text-brand-navy/30 mr-4 font-light">+</span>{row.right}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Existing Team Members */}
                {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => (
                    <AnimatedSection key={slug} delay={index * 150}>
                        <Link to={`/team/${slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-brand-navy border-2 border-brand-navy">
                            <motion.img 
                                initial={{ scale: 1.1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                            />
                            
                            {/* Overlay UI */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="flex justify-between items-start">
                                    <div className="w-2 h-2 bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/50 group-hover:text-brand-yellow font-bold border border-brand-offwhite/20 px-2 py-1 bg-brand-navy/20 backdrop-blur-sm">
                                        View Profile
                                    </span>
                                </div>
                                
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow mb-2 block font-bold transition-colors">
                                        {member.title}
                                    </span>
                                    <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none text-brand-offwhite">
                                        {member.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </section>

      </div>

      {/* Support An Artist / Internal Lab Feature */}
      <section className="py-32 bg-brand-navy text-brand-offwhite relative overflow-hidden mt-24">
          {/* Schematic Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FCC803_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="container mx-auto px-8 relative z-10">
              <AnimatedSection>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                      <div className="lg:col-span-7">
                          <span className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-black mb-6 block">The Internal Lab</span>
                          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-8">
                              Support<br/>
                              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px #FCC803' }}>An Artist</span>
                          </h2>
                          <p className="font-body text-xl md:text-2xl font-light opacity-80 leading-relaxed max-w-2xl mb-12">
                              We don't just build brands for clients. We fund, build, and launch limited-run physical drops with independent artists. No mass production. Total creative freedom.
                          </p>
                          <div className="flex flex-wrap gap-6">
                              <Link to="/support-an-artist" className="inline-block bg-brand-yellow text-brand-navy px-8 py-4 font-mono uppercase font-black text-xs tracking-widest hover:bg-white transition-colors">
                                  Shop The Lab
                              </Link>
                              <Link to="/contact" className="inline-block border border-brand-offwhite/20 text-brand-offwhite px-8 py-4 font-mono uppercase font-bold text-xs tracking-widest hover:bg-brand-offwhite hover:text-brand-navy transition-colors">
                                  Pitch A Drop
                              </Link>
                          </div>
                      </div>
                      
                      <div className="lg:col-span-5 hidden lg:block">
                          {/* E-Commerce Product Feature Layout */}
                          {featuredDrop ? (
                              <Link to={`/support-an-artist/${featuredDrop.slug}`} className="block group relative bg-white p-6 shadow-[12px_12px_0px_#FCC803] hover:-translate-y-2 transition-transform duration-500">
                                  <div className="aspect-[4/5] bg-brand-offwhite overflow-hidden relative border border-brand-navy/5">
                                      <img 
                                          src={featuredDrop.imageUrl} 
                                          alt={featuredDrop.title} 
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                      />
                                      <div className="absolute top-4 left-4 bg-brand-yellow text-brand-navy font-mono text-[9px] uppercase font-bold px-3 py-1 shadow-sm">
                                          Featured Drop
                                      </div>
                                  </div>
                                  <div className="mt-6 flex justify-between items-start text-brand-navy">
                                      <div>
                                          <h4 className="font-sans text-2xl font-black uppercase leading-none group-hover:text-brand-purple transition-colors">{featuredDrop.title.replace(/_/g, ' ')}</h4>
                                          <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-2">{featuredDrop.category}</p>
                                      </div>
                                  </div>
                                  <div className="mt-6 w-full bg-brand-navy text-brand-offwhite text-center py-4 font-mono text-xs uppercase font-bold group-hover:bg-brand-purple transition-colors">
                                      Shop Now
                                  </div>
                              </Link>
                          ) : (
                              <div className="aspect-square border border-brand-offwhite/10 flex items-center justify-center p-12 relative group cursor-pointer hover:border-brand-yellow/30 transition-colors duration-500">
                                  <div className="absolute inset-4 border border-brand-yellow/20 group-hover:scale-[0.97] transition-transform duration-700"></div>
                                  <div className="absolute inset-8 border border-brand-purple/20 group-hover:scale-105 transition-transform duration-700"></div>
                                  <div className="text-center relative z-10">
                                      <svg className="w-16 h-16 mx-auto mb-6 text-brand-yellow/80 group-hover:text-brand-yellow transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                      </svg>
                                      <span className="font-mono text-2xl md:text-3xl text-brand-offwhite font-bold uppercase tracking-tight block">100% Artist Cut</span>
                                      <p className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/40 mt-4">Independent Minds Only</p>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </AnimatedSection>
          </div>
      </section>

    </div>
  );
};

export default AboutPage;