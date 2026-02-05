import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import { TeamMember } from '../types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Crosshair, Cpu, Zap, Disc, PenTool, Coffee, Anchor } from 'lucide-react';

// --- 1. LOCAL "FUN" DATA (EXTENDING THE CMS) ---
// This injects the "MDQ/Video Game" personality without needing a backend change yet.
const MEMBER_EXTRAS: Record<string, any> = {
  franco: {
    class: "Visual Architect",
    level: "Lvl. 99",
    status: "HEAVY_RENDERING",
    signatureMove: "The No-Magic Deconstruction",
    loadout: [
      { icon: <Cpu size={18} />, name: "Cinema 4D" },
      { icon: <Zap size={18} />, name: "Octane" },
      { icon: <Disc size={18} />, name: "90s Hip Hop" },
      { icon: <Coffee size={18} />, name: "Flat White" }
    ],
    stats: [
      { label: "Vision", val: 98 },
      { label: "Chaos", val: 85 },
      { label: "Technical", val: 92 },
      { label: "Patience", val: 40 }
    ]
  },
  ariana: {
    class: "Ops Commander",
    level: "Lvl. 99",
    status: "SYSTEM_OPTIMAL",
    signatureMove: "Chaos Containment Field",
    loadout: [
      { icon: <Anchor size={18} />, name: "Logic" },
      { icon: <PenTool size={18} />, name: "Strategy" },
      { icon: <Disc size={18} />, name: "Indie Pop" },
      { icon: <Coffee size={18} />, name: "Long Black" }
    ],
    stats: [
      { label: "Order", val: 100 },
      { label: "Execution", val: 95 },
      { label: "Client Love", val: 100 },
      { label: "BS Tolerance", val: 10 }
    ]
  }
};

// --- 2. COMPONENTS ---

const StatBar = ({ label, value, delay }: { label: string, value: number, delay: number }) => (
    <div className="mb-4">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest mb-1 text-brand-navy/60">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-3 w-full bg-brand-navy/10 border border-brand-navy/20 p-[1px]">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1, delay: delay, ease: "circOut" }}
                className="h-full bg-brand-purple relative"
            >
                {/* Glitch decoration on the bar */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-brand-yellow"></div>
            </motion.div>
        </div>
    </div>
);

const InventoryItem = ({ icon, name }: { icon: React.ReactNode, name: string }) => (
    <div className="aspect-square border border-brand-navy/20 bg-white flex flex-col items-center justify-center gap-2 group hover:border-brand-purple hover:bg-brand-purple/5 transition-colors cursor-help">
        <div className="text-brand-navy group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <span className="font-mono text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2">
            {name}
        </span>
    </div>
);

const TeamMemberPage: React.FC = () => {
  const { memberSlug } = useParams<{ memberSlug: string }>();
  
  if (!memberSlug || !(memberSlug in TEAM_MEMBERS)) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAEAEA]">
        <div className="text-center">
            <h1 className="text-6xl font-black uppercase text-brand-navy">Agent Missing</h1>
            <Link to="/about" className="font-mono uppercase underline mt-8 block text-brand-purple">Return to Base</Link>
        </div>
      </div>
    );
  }

  const member = TEAM_MEMBERS[memberSlug];
  const extras = MEMBER_EXTRAS[memberSlug] || MEMBER_EXTRAS['franco']; // Fallback
  
  // Logic for "Next Member" (Circular)
  const memberKeys = Object.keys(TEAM_MEMBERS);
  const currentIndex = memberKeys.indexOf(memberSlug);
  const nextIndex = (currentIndex + 1) % memberKeys.length;
  const nextSlug = memberKeys[nextIndex];
  const nextMember = TEAM_MEMBERS[nextSlug];

  return (
    <div className="bg-[#EAEAEA] min-h-screen pt-24 md:pt-32 pb-0 overflow-x-hidden selection:bg-brand-yellow selection:text-brand-navy">
      
      {/* --- KINETIC BACKGROUND --- */}
      <div className="fixed top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.03] pointer-events-none select-none overflow-hidden z-0">
          <div className="whitespace-nowrap text-[30vw] font-black uppercase leading-none text-brand-navy animate-marquee">
              {member.name} {member.name} {member.name}
          </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- NAV BAR --- */}
        <div className="flex justify-between items-center mb-12 md:mb-24 border-b-2 border-brand-navy/10 pb-6">
            <Link to="/about" className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-brand-navy hover:text-brand-purple transition-colors group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Return to Roster</span>
            </Link>
            <div className="font-mono text-[10px] uppercase tracking-widest bg-brand-navy text-white px-2 py-1">
                OPERATIVE: {String(currentIndex + 1).padStart(2, '0')}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* --- LEFT: VISUALS (The Mugshot) --- */}
            <div className="lg:col-span-5 sticky top-32">
                <div className="relative border-2 border-brand-navy bg-brand-navy shadow-[12px_12px_0px_#0F0328]">
                    {/* The Image */}
                    <div className="relative aspect-[3/4] overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700 group">
                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                        
                        {/* Overlay UI */}
                        <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none flex flex-col justify-between p-4">
                            <div className="flex justify-between">
                                <Crosshair className="text-white opacity-50 animate-spin-slow" size={24} />
                                <span className="font-mono text-[9px] text-white bg-red-600 px-1 animate-pulse">LIVE FEED</span>
                            </div>
                            <div className="font-mono text-[9px] text-white/70 uppercase tracking-widest text-right">
                                CAM_A // 12mm<br/>
                                ISO 400
                            </div>
                        </div>
                    </div>

                    {/* The Label */}
                    <div className="bg-white border-t-2 border-brand-navy p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-brand-navy relative z-10">
                            {member.name}
                        </h1>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="font-mono text-[10px] uppercase bg-brand-purple text-white px-2 py-1 font-bold">{extras.class}</span>
                            <span className="font-mono text-[10px] uppercase border border-brand-navy/20 px-2 py-1 font-bold text-brand-navy/60">{extras.level}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT: DATA (The Dossier) --- */}
            <div className="lg:col-span-7 bg-[#EAEAEA]/80 backdrop-blur-sm">
                
                {/* 1. Status Block */}
                <div className="mb-12 border-b-2 border-brand-navy pb-12">
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold mb-4 block">Current Status</span>
                    <div className="text-3xl md:text-5xl font-black uppercase text-brand-navy leading-none tracking-tight">
                        "{extras.status}"
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* 2. Bio Stream */}
                    <div className="md:col-span-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 font-bold mb-4 block border-b border-brand-navy/10 pb-2">
                            [01] Transmission Log
                        </span>
                        <div className="space-y-6">
                            {member.bio.map((p, i) => (
                                <p key={i} className="font-body text-xl leading-relaxed text-brand-navy/90">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* 3. Stats (The RPG Element) */}
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 font-bold mb-6 block border-b border-brand-navy/10 pb-2">
                            [02] Attributes
                        </span>
                        <div className="pr-4">
                            {extras.stats.map((s: any, i: number) => (
                                <StatBar key={s.label} label={s.label} value={s.val} delay={i * 0.1} />
                            ))}
                        </div>
                    </div>

                    {/* 4. Loadout (The Inventory) */}
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 font-bold mb-6 block border-b border-brand-navy/10 pb-2">
                            [03] Loadout
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                            {extras.loadout.map((item: any, i: number) => (
                                <InventoryItem key={i} icon={item.icon} name={item.name} />
                            ))}
                        </div>
                        
                        <div className="mt-8">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-purple font-bold mb-2 block">Special Ability</span>
                            <div className="border border-brand-purple/20 bg-brand-purple/5 p-3">
                                <span className="font-black text-brand-navy uppercase text-sm block">{extras.signatureMove}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Comms Button */}
                <div className="mt-12">
                    <Link to="/contact" className="block w-full bg-brand-navy text-white font-mono text-xl uppercase font-bold py-6 text-center hover:bg-brand-purple transition-all shadow-[8px_8px_0px_#FCC803] hover:shadow-none hover:translate-x-1 hover:translate-y-1 group">
                        Initiate Comms with {member.name}
                    </Link>
                    <div className="mt-4 flex justify-between items-center px-2">
                        <span className="font-mono text-[9px] uppercase text-brand-navy/40">Secure Line // Encrypted</span>
                        {member.instagram && (
                            <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noreferrer" className="font-mono text-[9px] uppercase text-brand-navy hover:text-brand-purple font-bold underline">
                                @{member.instagram}
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* --- NEXT OPERATOR FOOTER --- */}
      <Link to={`/team/${nextSlug}`} className="block mt-24 md:mt-32 border-t-2 border-brand-navy bg-white group hover:bg-brand-navy hover:text-white transition-colors duration-500">
          <div className="container mx-auto px-8 py-16 flex justify-between items-center">
              <div>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2 block">Next Human</span>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-300">
                      {nextMember.name}
                  </h2>
              </div>
              <div className="hidden md:block font-mono text-sm font-bold uppercase tracking-widest">
                  Select &rarr;
              </div>
          </div>
      </Link>

    </div>
  );
};

export default TeamMemberPage;