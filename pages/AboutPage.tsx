import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        
        {/* Header / Origin Story */}
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl relative">
            <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black block">Identity & Essence</span>
                <div className="px-3 py-1 bg-brand-navy/5 border border-brand-navy/20 rounded-full flex items-center gap-2">
                    <svg className="w-3 h-3 text-brand-purple" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-brand-navy/60">Logic Locked</span>
                </div>
            </div>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-8">
              The Architecture<br/><span className="text-brand-purple italic">of Soul.</span>
            </h1>
          </header>
        </AnimatedSection>

        {/* Playbook Link - Locked State */}
        <section className="py-12 border-t border-brand-navy/10">
            <AnimatedSection>
                <Link to="/playbook" className="group block border-2 border-brand-navy p-12 bg-white hover:bg-brand-navy transition-all duration-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-4 h-4 text-brand-purple group-hover:text-brand-yellow transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow font-bold transition-colors">Internal Tools / Restricted</span>
                            </div>
                            <h3 className="text-4xl font-black uppercase tracking-tight text-brand-navy group-hover:text-brand-offwhite">Access Agency Playbook &rarr;</h3>
                        </div>
                        <div className="hidden md:block w-32 h-32 border-l border-brand-navy/10 group-hover:border-brand-offwhite/10 relative">
                             <div className="absolute inset-0 flex items-center justify-center font-mono text-6xl group-hover:text-brand-offwhite transition-colors">*</div>
                        </div>
                    </div>
                </Link>
            </AnimatedSection>
        </section>

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
                        COOLO was founded on the belief that <strong className="font-bold text-brand-navy">clarity is the ultimate sophistication.</strong> We are here to help brands, businesses, and organizations find their soul—the raw truth of who they are.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                    <p>
                        We don't believe in "filler" design. We believe in high-resolution communication that reflects deep integrity. Our mission is to help you develop an unmistakable taste for design, ensuring every touchpoint of your brand feels deliberate, technical, and soulful.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={300}>
                    <p>
                        Operating from Mount Maunganui, we provide a senior unit model. We partner with founders, internal teams, and ambitious agencies to refine the signal and eliminate the noise. No bloat. Just deep focus.
                    </p>
                </AnimatedSection>
            </div>
        </section>

        {/* Values / The Principles */}
        <section className="py-32 border-t-2 border-brand-navy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {[
                    { t: "Deep Clarity", d: "We help you find your center. If your brand doesn't have a soul, it doesn't have a future." },
                    { t: "Design Power", d: "Precision is non-negotiable. We build high-end visual systems that command respect." },
                    { t: "Soulful Logic", d: "Strategy isn't cold; it's the bridge between what you do and who you truly are." },
                    { t: "The Slow Burn", d: "We build for longevity. Our systems are designed to outlast trends and cultivate taste." }
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

        {/* The Crew / Team CMS Integration */}
        <section className="py-48 relative border-t border-brand-navy/10">
            <AnimatedSection>
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-4 block">The Crew</span>
                        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                            The Unit
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-brand-navy/60 leading-relaxed text-right">
                        You get the Brains and the Engine. <br/>Direct access to the senior unit.
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

                {/* 2. NEW: RECRUITMENT / PARTNER SLOT */}
                <AnimatedSection delay={300}>
                    <Link to="/contact" className="group relative block aspect-[3/4] overflow-hidden bg-brand-offwhite border-2 border-brand-navy/10 hover:border-brand-purple transition-colors duration-500 flex flex-col justify-center items-center text-center p-12">
                        
                        {/* Technical Background Pattern */}
                        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3A0888_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        
                        <div className="relative z-10">
                             <div className="w-24 h-24 rounded-full border-2 border-brand-navy/10 flex items-center justify-center mx-auto mb-8 group-hover:border-brand-purple group-hover:scale-110 transition-all duration-500">
                                <svg className="w-8 h-8 text-brand-navy/40 group-hover:text-brand-purple transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                             </div>
                             
                             <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-brand-navy mb-4 group-hover:text-brand-purple transition-colors">
                                Join<br/>The Unit
                             </h3>
                             
                             <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 max-w-xs mx-auto leading-relaxed">
                                Seeking Senior Creatives<br/>& Specialists
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