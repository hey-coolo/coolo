import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';

// --- CAMCORDER FRAME COMPONENT ---
const CamcorderFrame: React.FC<{ children: React.ReactNode; name: string; role: string }> = ({ children, name, role }) => {
    return (
        <div className="relative group overflow-hidden bg-brand-navy border-2 border-brand-navy shadow-xl hover:shadow-2xl transition-all duration-500">
            {/* 1. The Source Image */}
            <div className="relative z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform ease-out">
                {children}
            </div>

            {/* 2. Digital Noise Overlay (CSS) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            {/* 3. The Viewfinder UI */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none z-10 flex flex-col justify-between p-4">
                
                {/* Top Data */}
                <div className="flex justify-between items-start font-mono text-[10px] text-white/80 uppercase tracking-widest drop-shadow-md">
                    <div className="flex flex-col gap-1">
                        <span className="text-red-500 font-bold animate-pulse">● REC</span>
                        <span>ISO 800</span>
                    </div>
                    <div className="text-right">
                        <span>[ 16:9 ]</span>
                    </div>
                </div>

                {/* Center Focus Brackets */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white"></div>
                </div>

                {/* Bottom Data (Name Tag) */}
                <div className="mt-auto">
                    <div className="bg-brand-yellow text-brand-navy inline-block px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest mb-3 transform group-hover:-translate-y-1 transition-transform">
                        {role}
                    </div>
                    <h3 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.8] tracking-tighter drop-shadow-lg group-hover:skew-x-[-2deg] transition-transform">
                        {name}
                    </h3>
                </div>
            </div>
        </div>
    );
};

const TeamPage: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <div className="bg-[#EAEAEA] min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-8">
        
        {/* --- HEADER: KINETIC TYPOGRAPHY --- */}
        <AnimatedSection>
          <header className="py-24 md:py-32 border-b-2 border-brand-navy/10 mb-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <span className="inline-block bg-brand-purple text-white px-2 py-1 font-mono uppercase tracking-[0.2em] text-xs font-bold mb-6">
                        Live Feed / 02
                    </span>
                    <h1 className="text-8xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] text-brand-navy">
                        THE<br/>
                        <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #3A0888' }}>
                            HUMANS
                        </span>
                    </h1>
                </div>
                
                <div className="max-w-md text-right md:mb-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 leading-relaxed">
                        No Avatars. No Middlemen.<br/>
                        Just the two of us running the machine.
                    </p>
                </div>
            </div>
          </header>
        </AnimatedSection>

        {/* --- TEAM GRID: BROADCAST MONITORS --- */}
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                
                {/* 1. EXISTING MEMBERS */}
                {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => (
                    <AnimatedSection key={slug} delay={index * 150}>
                        <Link 
                            to={`/team/${slug}`}
                            onMouseEnter={() => setHoveredMember(slug)}
                            onMouseLeave={() => setHoveredMember(null)}
                            className="block group"
                        >
                            {/* Visual Monitor */}
                            <CamcorderFrame name={member.name} role={member.title}>
                                <div className="aspect-[4/5] bg-brand-navy relative">
                                    <img 
                                        src={member.imageUrl} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700" 
                                    />
                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-20"></div>
                                </div>
                            </CamcorderFrame>

                            {/* Data Stream (Bio) */}
                            <div className="mt-6 border-t-2 border-brand-navy pt-4">
                                <div className="flex justify-between items-baseline mb-4">
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple">
                                        // BIO_DATA_STREAM
                                    </span>
                                    <span className={`w-3 h-3 rounded-full ${hoveredMember === slug ? 'bg-green-500 animate-pulse' : 'bg-brand-navy/20'}`}></span>
                                </div>
                                <p className="font-body text-lg leading-tight text-brand-navy/80 line-clamp-3 group-hover:text-brand-navy transition-colors">
                                    {member.bio[0]} {member.bio[1]}
                                </p>
                                <div className="mt-4 flex items-center gap-2 group-hover:gap-4 transition-all">
                                    <span className="font-mono text-xs uppercase font-bold tracking-widest bg-brand-navy text-white px-2 py-1">
                                        OPEN PROFILE
                                    </span>
                                    <span className="text-brand-purple">→</span>
                                </div>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}

                {/* 2. RECRUITMENT SLOT (NO SIGNAL) */}
                <AnimatedSection delay={300}>
                    <Link to="/join" className="block group h-full">
                        <div className="aspect-[4/5] bg-[#1a1a1a] border-2 border-brand-navy/20 relative overflow-hidden flex flex-col justify-center items-center text-center group-hover:border-brand-purple transition-colors duration-500">
                            
                            {/* Static Noise Animation */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-pulse"></div>
                            
                            <div className="relative z-10 p-8">
                                <div className="mb-6 w-16 h-16 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mx-auto group-hover:border-brand-purple group-hover:scale-110 transition-all">
                                    <span className="text-2xl text-white/20 group-hover:text-brand-purple">+</span>
                                </div>
                                
                                <h3 className="text-4xl md:text-5xl font-black uppercase text-white/20 tracking-tighter mb-4 group-hover:text-brand-purple transition-colors">
                                    SIGNAL<br/>LOST
                                </h3>
                                
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1">
                                    Looking for Seniors
                                </span>
                            </div>

                            {/* Viewfinder UI */}
                            <div className="absolute inset-4 border border-white/10 pointer-events-none flex flex-col justify-between p-2">
                                <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase tracking-widest">
                                    <span>NO INPUT</span>
                                    <span>--:--:--</span>
                                </div>
                                <div className="text-right text-[8px] font-mono text-white/30 uppercase tracking-widest">
                                    WAITING FOR CONNECTION
                                </div>
                            </div>
                        </div>

                        {/* Data Stream (Join) */}
                        <div className="mt-6 border-t-2 border-brand-navy/20 pt-4 group-hover:border-brand-purple transition-colors">
                            <div className="flex justify-between items-baseline mb-4">
                                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/40 group-hover:text-brand-purple transition-colors">
                                    // RECRUITMENT_CHANNEL
                                </span>
                                <span className="w-3 h-3 rounded-full bg-brand-navy/10 group-hover:bg-brand-purple animate-pulse"></span>
                            </div>
                            <p className="font-body text-lg leading-tight text-brand-navy/60">
                                Are you the next human? We are looking for high-end talent to join the network.
                            </p>
                            <div className="mt-4 flex items-center gap-2 group-hover:gap-4 transition-all">
                                <span className="font-mono text-xs uppercase font-bold tracking-widest border border-brand-navy text-brand-navy px-2 py-1 group-hover:bg-brand-purple group-hover:text-white group-hover:border-brand-purple transition-colors">
                                    INITIATE UPLOAD
                                </span>
                            </div>
                        </div>
                    </Link>
                </AnimatedSection>

            </div>
        </section>

      </div>
    </div>
  );
};

export default TeamPage;