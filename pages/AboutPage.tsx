
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
                <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black block">Origin & Entropy</span>
                <div className="px-3 py-1 bg-brand-navy/5 border border-brand-navy/20 rounded-full flex items-center gap-2">
                    <svg className="w-3 h-3 text-brand-purple" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-brand-navy/60">System Locked</span>
                </div>
            </div>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-8">
              The System<br/><span className="text-brand-purple italic">Is The Solution.</span>
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
                                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow font-bold transition-colors">Internal Resources / Restricted</span>
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
                    Escaping<br/>The Agency<br/>Trap.
                </h3>
            </div>
            <div className="lg:col-span-7 space-y-12 text-xl md:text-2xl font-light text-brand-navy/80 leading-relaxed">
                <AnimatedSection delay={100}>
                    <p>
                        We started COOLO in 2024 with a specific resentment: <strong className="font-bold text-brand-navy">Complexity is usually a disguise for lack of clarity.</strong>
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                    <p>
                        Having spent a decade in high-tier agencies, we saw the pattern. The bloated teams, the junior hand-offs, the "magic" processes that were just meetings about meetings. Clients were paying for overhead, not output.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={300}>
                    <p>
                        We moved to Mount Maunganui to strip it all back. To build a "Senior Unit" model. Two experts. One system. No account managers, no filler. Just raw strategy and surgical execution.
                    </p>
                </AnimatedSection>
            </div>
        </section>

        {/* Values / The Protocol */}
        <section className="py-32 border-t-2 border-brand-navy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {[
                    { t: "Radical Truth", d: "We tell you what you need to hear, not what flatters you. Growth requires friction." },
                    { t: "Surgical Ops", d: "We don't 'explore' endlessly. We diagnose, we plan, we execute. Speed is a feature." },
                    { t: "System > Art", d: "Pretty pictures die. Systems scale. We build brand engines that run without us." },
                    { t: "No Bloat", d: "If it doesn't add value to the user or the bottom line, it gets cut. Ruthlessly." }
                ].map((val, i) => (
                    <AnimatedSection key={val.t} delay={i * 100} className="h-full">
                        <div className="border-r-2 border-b-2 border-brand-navy p-12 h-full hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 group">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow font-bold mb-4 block">Protocol 0{i + 1}</span>
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-6">{val.t}</h3>
                            <p className="font-body text-lg opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">{val.d}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        {/* The Unit / Team CMS Integration */}
        <section className="py-48 relative">
            <AnimatedSection>
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-4 block">The Unit / Roster</span>
                        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                            The Operators
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-brand-navy/60 leading-relaxed text-right">
                        You get the Brains and the Engine. <br/>Direct access. No middlemen.
                    </p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dynamically generating team cards from CMS constants */}
                {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => (
                    <AnimatedSection key={slug} delay={index * 150}>
                        <Link to={`/team/${slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-brand-navy border-2 border-brand-navy">
                            <motion.img 
                                initial={{ scale: 1.1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                            />
                            
                            {/* Overlay UI */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-2 h-2 bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/50 group-hover:text-brand-yellow font-bold border border-brand-offwhite/20 px-2 py-1 bg-brand-navy/20 backdrop-blur-sm">
                                        View Dossier
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
                
                {/* Recruitment Card / Empty State */}
                <AnimatedSection delay={300}>
                    <Link to="/contact" className="group relative block aspect-[3/4] overflow-hidden bg-brand-offwhite border-2 border-brand-navy hover:border-brand-purple hover:bg-brand-purple/5 transition-all duration-300 flex flex-col items-center justify-center text-center p-12">
                         <div className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-navy/40 mb-4 group-hover:text-brand-purple">Open Slot</div>
                         <h3 className="text-5xl font-black uppercase tracking-tight text-brand-navy/20 group-hover:text-brand-purple transition-colors">
                             Strategic<br/>Partner
                         </h3>
                         <div className="mt-8 font-mono text-xs uppercase font-bold bg-brand-navy text-brand-offwhite px-6 py-3 tracking-widest group-hover:bg-brand-purple transition-colors">
                             Apply Now
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
