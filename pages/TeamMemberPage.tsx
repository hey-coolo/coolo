import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Cpu, Zap, Disc, Coffee, Anchor, PenTool, Linkedin, Instagram, Mail, Move } from 'lucide-react';

// --- 1. CONFIG & DATA ---
const MEMBER_EXTRAS: Record<string, any> = {
  franco: {
    class: "Visual Architect",
    level: "Lvl. 90",
    status: "RENDERING_SOMETHING",
    signatureMove: "Eyeballing symmetry",
    linkedin: "https://www.linkedin.com/in/whatthefranco/",
    loadout: [
      { icon: <Cpu size={16} />, name: "Cinema 4D" },
      { icon: <Zap size={16} />, name: "Octane" },
      { icon: <Disc size={16} />, name: "Daft Punk" },
      { icon: <Coffee size={16} />, name: "Black Coffee" }
    ],
    stats: [
      { label: "Vision", val: 98 },
      { label: "Chaos", val: 80 },
      { label: "Technical", val: 92 },
      { label: "Patience", val: 72 }
    ],
    // These files will be loaded from /assets/team/gallery/
    galleryImages: [
        'public/assets/team/gallery/franco01.webp', 
        'public/assets/team/gallery/franco02.webp',
        'public/assets/team/gallery/franco03.webp', 
        'public/assets/team/gallery/franco04.webp'  
    ]
  },
  ariana: {
    class: "Ops Commander",
    level: "Lvl. 91",
    status: "FOLLOWING_YOU",
    signatureMove: "Containing chaos",
    linkedin: "https://www.linkedin.com/in/arianaarmando/",
    loadout: [
      { icon: <Anchor size={16} />, name: "Logic" },
      { icon: <PenTool size={16} />, name: "Too Many Post-it Notes" },
      { icon: <Disc size={16} />, name: "00s Indie Rock" },
      { icon: <Coffee size={16} />, name: "Long Black" }
    ],
    stats: [
      { label: "Order", val: 88 },
      { label: "Execution", val: 95 },
      { label: "Client Love", val: 98 },
      { label: "BS Tolerance", val: 75 }
    ],
    galleryImages: [
        'public/assets/team/gallery/ariana01.webp',
        'public/assets/team/gallery/ariana02.webp',
        'public/assets/team/gallery/ariana03.webp',
        'public/assets/team/gallery/ariana04.webp'
    ]
  }
};

// --- 2. COMPONENTS ---

const ScatteredPhoto = ({ src, index, total }: { src: string, index: number, total: number }) => {
    // Generate deterministic "random" positions based on index
    const randomRotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 15 + 5);
    const randomX = Math.random() * 60 - 30; // +/- 30% offset
    const randomY = Math.random() * 60 - 30;
    
    return (
        <motion.div
            drag
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
            whileHover={{ scale: 1.1, zIndex: 100, cursor: "grab" }}
            whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 100 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            animate={{ opacity: 1, y: randomY, x: randomX, rotate: randomRotation }}
            transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
            className="absolute top-1/2 left-1/2 w-48 md:w-64 aspect-[3/4] bg-white p-2 shadow-2xl origin-center"
            style={{ 
                marginTop: `${(index - total/2) * 20}px`, // Spread vertically slightly
                marginLeft: `${(index - total/2) * 40}px`, // Spread horizontally
            }}
        >
            <div className="w-full h-full overflow-hidden bg-brand-navy relative">
                <img 
                    src={`/assets/team/gallery/${src}`} 
                    alt="Evidence" 
                    className="w-full h-full object-cover grayscale pointer-events-none"
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x800/EAEAEA/0F0328?text=NO+SIGNAL';
                    }}
                />
                {/* Tape Overlay */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 rotate-2 backdrop-blur-sm"></div>
            </div>
            <div className="absolute bottom-2 right-2 font-mono text-[8px] uppercase tracking-widest text-brand-navy/50">
                REF_0{index + 1}
            </div>
        </motion.div>
    );
};

const StatRow = ({ label, value }: { label: string, value: number }) => (
    <div className="flex items-center justify-between py-3 border-b-2 border-brand-navy/10 group hover:bg-white transition-colors px-2 -mx-2">
        <span className="font-mono text-xs uppercase tracking-widest font-bold text-brand-navy">{label}</span>
        <div className="flex items-center gap-4">
            <div className="w-24 h-2 bg-brand-navy/10 relative overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="absolute top-0 left-0 h-full bg-brand-purple"
                />
                {/* Glitch Line */}
                <div className="absolute top-0 right-0 h-full w-[2px] bg-brand-yellow"></div>
            </div>
            <span className="font-mono text-xs font-bold w-8 text-right">{value}</span>
        </div>
    </div>
);

const LinkBlock = ({ label, href, icon, external = false }: { label: string, href: string, icon: React.ReactNode, external?: boolean }) => (
    <a 
        href={href} 
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block border-2 border-brand-navy bg-white p-6 hover:bg-brand-navy hover:text-white transition-all group relative overflow-hidden"
    >
        <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="text-brand-purple group-hover:text-brand-yellow transition-colors">{icon}</div>
                <span className="font-mono text-sm uppercase tracking-widest font-bold">{label}</span>
            </div>
            <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
        </div>
        {/* Hover Noise */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity pointer-events-none"></div>
    </a>
);

const TeamMemberPage: React.FC = () => {
  const { memberSlug } = useParams<{ memberSlug: string }>();
  const containerRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [memberSlug]);

  if (!memberSlug || !(memberSlug in TEAM_MEMBERS)) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAEAEA]">
        <div className="text-center">
            <h1 className="text-6xl font-black uppercase text-brand-navy">Agent Missing</h1>
            <Link to="/team" className="font-mono uppercase underline mt-8 block text-brand-purple">Return to Roster</Link>
        </div>
      </div>
    );
  }

  const member = TEAM_MEMBERS[memberSlug];
  const extras = MEMBER_EXTRAS[memberSlug] || MEMBER_EXTRAS['franco'];
  
  // Next Member Logic
  const memberKeys = Object.keys(TEAM_MEMBERS);
  const currentIndex = memberKeys.indexOf(memberSlug);
  const nextIndex = (currentIndex + 1) % memberKeys.length;
  const nextSlug = memberKeys[nextIndex];
  const nextMember = TEAM_MEMBERS[nextSlug];

  return (
    <div className="bg-[#EAEAEA] min-h-screen pt-24 pb-0 overflow-x-hidden selection:bg-brand-yellow selection:text-brand-navy">
      
      {/* --- 1. HERO: THE SCATTERED DESK --- */}
      <div className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b-2 border-brand-navy bg-[#EAEAEA]">
          
          {/* Background Grid */}
          <div className="absolute inset-0 studio-grid opacity-10 pointer-events-none"></div>

          {/* The Big Type (Behind the photos) */}
          <div className="relative z-0 text-center pointer-events-none select-none mix-blend-difference text-brand-navy/10">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.5em] font-bold block mb-4">
                  {extras.class}
              </span>
              <h1 className="text-[18vw] font-black uppercase leading-[0.8] tracking-tighter">
                  {member.name}
              </h1>
          </div>

          {/* The Photos (Draggable) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
              {extras.galleryImages && extras.galleryImages.map((img: string, i: number) => (
                  <ScatteredPhoto 
                    key={i} 
                    src={img} 
                    index={i} 
                    total={extras.galleryImages.length} 
                  />
              ))}
          </div>

          {/* Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="bg-brand-navy text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 animate-pulse">
                  <Move size={10} /> Drag items to clear view
              </span>
          </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-20 -mt-12">
          <Link to="/team" className="inline-flex items-center gap-2 bg-white border-2 border-brand-navy px-6 py-3 font-mono text-xs uppercase font-bold text-brand-navy hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-[4px_4px_0px_#0F0328]">
              <ArrowLeft size={14} /> Return to Humans
          </Link>
      </div>

      {/* --- 2. THE DOSSIER (SWISS BRUTAL) --- */}
      <div className="container mx-auto px-6 md:px-8 py-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* LEFT: INTEL */}
              <div className="lg:col-span-8">
                  <div className="mb-16">
                      <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-none mb-12">
                          Identity<br/><span className="text-brand-purple">Confirmed.</span>
                      </h2>
                      <div className="font-body text-2xl md:text-3xl leading-tight text-brand-navy/90 font-light space-y-8">
                          {member.bio.map((p, i) => (
                              <p key={i}>{p}</p>
                          ))}
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                      <div className="bg-white border-2 border-brand-navy p-8 relative">
                          <span className="absolute top-0 right-0 bg-brand-navy text-white px-2 py-1 font-mono text-[9px] uppercase tracking-widest">Ability</span>
                          <h4 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 mb-2">Signature Move</h4>
                          <p className="text-2xl font-black uppercase text-brand-navy leading-none">{extras.signatureMove}</p>
                      </div>
                      <div className="bg-white border-2 border-brand-navy p-8 relative">
                          <span className="absolute top-0 right-0 bg-brand-purple text-white px-2 py-1 font-mono text-[9px] uppercase tracking-widest">Fuel</span>
                          <h4 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 mb-2">System Input</h4>
                          <div className="flex items-center gap-3">
                              <Coffee className="text-brand-navy" />
                              <p className="text-2xl font-black uppercase text-brand-navy leading-none">Black Coffee</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* RIGHT: DATA */}
              <div className="lg:col-span-4 space-y-12">
                  
                  {/* Stats Block */}
                  <div className="border-t-4 border-brand-navy pt-6">
                      <h3 className="font-black text-2xl uppercase text-brand-navy mb-6">Attributes</h3>
                      <div className="space-y-1">
                          {extras.stats.map((s: any, i: number) => (
                              <StatRow key={i} label={s.label} value={s.val} />
                          ))}
                      </div>
                  </div>

                  {/* Loadout Block */}
                  <div className="border-t-4 border-brand-navy pt-6">
                      <h3 className="font-black text-2xl uppercase text-brand-navy mb-6">Loadout</h3>
                      <div className="flex flex-wrap gap-2">
                          {extras.loadout.map((item: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 border border-brand-navy/20 px-3 py-2 bg-white">
                                  <span className="text-brand-purple">{item.icon}</span>
                                  <span className="font-mono text-[10px] uppercase font-bold">{item.name}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Comms Block */}
                  <div className="border-t-4 border-brand-navy pt-6">
                      <h3 className="font-black text-2xl uppercase text-brand-navy mb-6">Comms</h3>
                      <div className="flex flex-col gap-4">
                          <LinkBlock 
                              label="LinkedIn Profile" 
                              href={extras.linkedin} 
                              icon={<Linkedin size={20} />} 
                              external 
                          />
                          {member.instagram && (
                              <LinkBlock 
                                  label="Instagram Feed" 
                                  href={`https://instagram.com/${member.instagram}`} 
                                  icon={<Instagram size={20} />} 
                                  external 
                              />
                          )}
                          <div className="pt-4 border-t border-brand-navy/10">
                              <Link to="/contact" className="block bg-brand-navy text-white text-center py-4 font-mono uppercase font-bold text-sm hover:bg-brand-purple transition-all">
                                  Deploy on Project
                              </Link>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>

      {/* --- 3. NEXT HUMAN (FOOTER) --- */}
      <Link to={`/team/${nextSlug}`} className="block border-t-2 border-brand-navy bg-white hover:bg-brand-navy hover:text-white transition-colors duration-500 group py-24">
          <div className="container mx-auto px-6 md:px-8">
              <div className="flex justify-between items-center">
                  <div>
                      <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2 block">Next Human</span>
                      <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-300">
                          {nextMember.name}
                      </h2>
                  </div>
                  <ArrowLeft size={48} className="rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
          </div>
      </Link>

    </div>
  );
};

export default TeamMemberPage;