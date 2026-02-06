import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';

const TeamPage: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <div className="bg-[#EAEAEA] min-h-screen pt-32 pb-0">
      <div className="container mx-auto px-6 md:px-8">
        
        {/* --- INTRO --- */}
        <AnimatedSection>
          <header className="py-24 md:py-32 mb-12">
            <span className="font-mono text-brand-purple uppercase tracking-[0.2em] text-xs font-bold block mb-6">
                Who runs the machine?
            </span>
            <h1 className="text-8xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] text-brand-navy">
                THE<br/>
                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #3A0888' }}>
                    HUMANS
                </span>
            </h1>
          </header>
        </AnimatedSection>

        {/* --- FLUID LIST LAYOUT --- */}
        <section className="border-t-2 border-brand-navy">
            {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => (
                <div key={slug} className="relative group border-b-2 border-brand-navy/10 hover:border-brand-navy transition-colors duration-500">
                    
                    <Link 
                        to={`/team/${slug}`}
                        onMouseEnter={() => setHoveredMember(slug)}
                        onMouseLeave={() => setHoveredMember(null)}
                        className="block py-16 md:py-24 relative z-20"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
                            {/* Index */}
                            <span className="font-mono text-xs md:text-sm font-bold text-brand-navy/30 group-hover:text-brand-purple transition-colors">
                                0{index + 1}
                            </span>

                            {/* Name & Role */}
                            <div className="flex-grow">
                                <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85] group-hover:translate-x-4 transition-transform duration-500">
                                    {member.name}
                                </h2>
                                <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-brand-navy/60 mt-4 group-hover:text-brand-purple transition-colors">
                                    {member.title}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="hidden md:block">
                                <span className="font-mono text-xs uppercase font-bold border border-brand-navy text-brand-navy px-4 py-2 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                                    Access Dossier
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* --- HOVER REVEAL IMAGE --- */}
                    <div className="absolute top-1/2 right-12 md:right-32 -translate-y-1/2 w-64 md:w-96 aspect-[3/4] bg-brand-navy pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rotate-3 group-hover:rotate-0 transform origin-center shadow-2xl">
                        <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale contrast-125" 
                        />
                        {/* Noise Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    </div>

                </div>
            ))}

            {/* --- JOIN THE ROSTER SLOT --- */}
            <div className="relative group border-b-2 border-brand-navy">
                <Link to="/join" className="block py-16 md:py-24">
                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
                        <span className="font-mono text-xs md:text-sm font-bold text-brand-navy/30">
                            03
                        </span>
                        <div className="flex-grow">
                            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-brand-navy/20 leading-[0.85] group-hover:text-brand-purple transition-colors duration-300">
                                YOU?
                            </h2>
                            <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-brand-navy/40 mt-4">
                                Senior Creative / Specialist
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <span className="font-mono text-xs uppercase font-bold border border-brand-navy/20 text-brand-navy/40 px-4 py-2 group-hover:border-brand-purple group-hover:text-brand-purple transition-colors">
                                Submit Portfolio
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

        </section>

      </div>
    </div>
  );
};

export default TeamPage;