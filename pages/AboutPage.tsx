import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite pt-32">
      <div className="container mx-auto px-8">
        
        {/* Header / Origin Story */}
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl relative">
            <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black block">Identity & Essence</span>
            </div>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-8">
              Humans in<br/><span className="text-brand-purple italic">the Machine</span>
            </h1>
          </header>
        </AnimatedSection>

        {/* Narrative / History */}
        <section className="pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-brand-navy/10 pt-24">
            <div className="lg:col-span-5">
                <h3 className="text-4xl font-black uppercase tracking-tight text-brand-navy leading-none sticky top-32">
                    Calibrating<br/>The Signal.
                </h3>
            </div>
            <div className="lg:col-span-7 space-y-12 text-xl md:text-2xl font-light text-brand-navy/80 leading-relaxed">
                <AnimatedSection delay={100}>
                    <p>
                        Most brands don't have a design problem.<strong className="font-bold text-brand-navy">They have a clarity problem.</strong> That's where we start. We are here to help clarify what you do and how you say it.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                    <p>
                        We don't use templates. Our mission is to help you fix what's not fully landing: your message, your positioning, and how your brand shows up.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={300}>
                    <p>
                        Operating from Mount Maunganui, we provide a senior creative process model. We partner with founders, and agencies to refine the message and eliminate the noise.
                        We keep seeing the same pattern: good businesses, badly explained or designed. That's why and what COOLO is built to fix.
                    </p>
                </AnimatedSection>
            </div>
        </section>

        {/* Values / The Principles */}
        <section className="py-32 border-t-2 border-brand-navy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {[
                    { t: "Deep Clarity", d: "If people don't understand you quickly, they move on. We fix that." },
                    { t: "Design Power", d: "Your visuals should carry weight, not decoration." },
                    { t: "Soulful Logic", d: "Strategy connects what you do to how people perceive you." },
                    { t: "The Slow Burn", d: "We build brands that still make sense in 3 years, not just today." }
                ].map((val, i) => (
                    <AnimatedSection key={val.t} delay={i * 100} className="h-full">
                        <div className="border-r-2 border-bottom-2 border-brand-navy p-12 h-full hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 group">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow font-bold mb-4 block">Principle 0{i + 1}</span>
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-6">{val.t}</h3>
                            <p className="font-body text-lg opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">{val.d}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>

      </div>

      {/* Support An Artist / Internal Lab Feature */}
      <section className="py-32 bg-brand-navy text-brand-offwhite relative overflow-hidden">
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
                      </div>
                  </div>
              </AnimatedSection>
          </div>
      </section>

      <div className="container mx-auto px-8">
        {/* The Crew / Team CMS Integration */}
        <section className="py-48 relative">
            <AnimatedSection>
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-4 block">The Crew</span>
                        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                            The Humans
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-brand-navy/60 leading-relaxed text-right">
                        You'll work directly with us. No handoffs.<br/>Clear thinking and honest feedback.
                    </p>
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
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
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

                {/* 2. RECRUITMENT SLOT */}
                <AnimatedSection delay={300}>
                     <Link to="/join" className="group relative block aspect-[3/4] overflow-hidden bg-brand-offwhite border-2 border-brand-navy/10 hover:border-brand-purple transition-colors duration-500 flex flex-col justify-center items-center text-center p-12">
        
                        {/* Technical Background Pattern */}
                       <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3A0888_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
                        <div className="relative z-10">
                          <div className="w-24 h-24 rounded-full border-2 border-brand-navy/10 flex items-center justify-center mx-auto mb-8 group-hover:border-brand-purple group-hover:scale-110 transition-all duration-500">
                             <svg className="w-8 h-8 text-brand-navy/40 group-hover:text-brand-purple transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
             
                         <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-brand-navy mb-4 group-hover:text-brand-purple transition-colors">
                          Join<br/>The Team
                         </h3>
             
                         <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 max-w-xs mx-auto leading-relaxed">
                             Seeking Senior Creatives<br/>& Talent
                         </p>

                         <span className="inline-block mt-8 border-b-2 border-brand-purple pb-1 font-mono text-xs uppercase font-bold text-brand-purple tracking-widest group-hover:text-brand-navy group-hover:border-brand-navy transition-all">
                          Submit Portfolio
                         </span>
                       </div>
                  </Link>
                </AnimatedSection>
                
            </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;