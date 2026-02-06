import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Zap, Disc, PenTool, Coffee, Anchor, Linkedin, Instagram, ArrowUpRight, Camera } from 'lucide-react';

// --- 1. LOCAL DATA (The Fun Stuff) ---
const MEMBER_EXTRAS: Record<string, any> = {
  franco: {
    class: "Visual Architect",
    level: "Lvl. 99",
    status: "HEAVY_RENDERING",
    signatureMove: "The No-Magic Deconstruction",
    linkedin: "https://www.linkedin.com/in/whatthefranco/",
    loadout: [
      { icon: <Cpu size={18} />, name: "Cinema 4D" },
      { icon: <Zap size={18} />, name: "Octane" },
      { icon: <Disc size={18} />, name: "90s Hip Hop" },
      { icon: <Coffee size={18} />, name: "Black Coffee" }
    ],
    stats: [
      { label: "Vision", val: 98 },
      { label: "Chaos", val: 85 },
      { label: "Technical", val: 92 },
      { label: "Patience", val: 40 }
    ],
    // The code expects these files to exist in /public/assets/team/gallery/
    galleryImages: [
        'franco01.webp',
        'franco02.webp',
        'franco03.webp',
        'franco04.webp'
    ]
  },
  ariana: {
    class: "Ops Commander",
    level: "Lvl. 99",
    status: "SYSTEM_OPTIMAL",
    signatureMove: "Chaos Containment Field",
    linkedin: "https://www.linkedin.com/in/arianaarmando/",
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
    ],
    galleryImages: [
        'ariana01.webp',
        'ariana02.webp',
        'ariana03.webp',
        'ariana04.webp'
    ]
  }
};

// --- 2. COMPONENTS ---

const StatBar = ({ label, value }: { label: string, value: number }) => (
    <div className="mb-6">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest mb-2 text-brand-navy">
            <span className="font-bold">{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-1 w-full bg-brand-navy/10">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-brand-purple"
            />
        </div>
    </div>
);

const LoadoutItem = ({ icon, name }: { icon: React.ReactNode, name: string }) => (
    <div className="flex items-center gap-4 p-4 border border-brand-navy/10 bg-white hover:border-brand-purple transition-colors group">
        <div className="text-brand-navy/60 group-hover:text-brand-purple transition-colors">
            {icon}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy">
            {name}
        </span>
    </div>
);

const TeamMemberPage: React.FC = () => {
  const { memberSlug } = useParams<{ memberSlug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [memberSlug]);

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
  const extras = MEMBER_EXTRAS[memberSlug] || MEMBER_EXTRAS['franco'];
  
  // Navigation Logic
  const memberKeys = Object.keys(TEAM_MEMBERS);
  const currentIndex = memberKeys.indexOf(memberSlug);
  const nextIndex = (currentIndex + 1) % memberKeys.length;
  const nextSlug = memberKeys[nextIndex];
  const nextMember = TEAM_MEMBERS[nextSlug];

  return (
    <div className="bg-[#EAEAEA] min-h-screen pt-32 pb-0 overflow-x-hidden">
      
      <div className="container mx-auto px-6 md:px-8">
        
        {/* --- 1. HEADER & HERO --- */}
        <div className="mb-24">
            <Link to="/team" className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-brand-navy/40 hover:text-brand-purple transition-colors mb-12">
                <ArrowLeft size={14} /> Back to Humans
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
                <div className="lg:col-span-8">
                    <span className="inline-block bg-brand-purple text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest font-bold mb-6">
                        {extras.class}
                    </span>
                    <h1 className="text-8xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] text-brand-navy mb-8">
                        {member.name}
                    </h1>
                    <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-brand-navy/60 max-w-lg leading-relaxed">
                        Status: <span className="text-brand-navy font-bold">{extras.status}</span> <br/>
                        Clearance: {extras.level}
                    </p>
                </div>
                {/* Hero Image - The "Mugshot" */}
                <div className="lg:col-span-4">
                    <div className="aspect-[3/4] bg-brand-navy relative overflow-hidden grayscale contrast-125">
                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full h-[2px] bg-brand-navy/10 mb-24"></div>

        {/* --- 2. INTEL & LOADOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
            
            {/* Bio Section */}
            <div className="lg:col-span-7">
                <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8">
                    // Transmission Log
                </h3>
                <div className="space-y-8">
                    {member.bio.map((p, i) => (
                        <p key={i} className="font-body text-2xl md:text-3xl leading-tight text-brand-navy font-light">
                            {p}
                        </p>
                    ))}
                </div>
                
                {/* Signature Move */}
                <div className="mt-16 p-8 bg-white border-l-4 border-brand-purple">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2 block">Special Ability</span>
                    <h4 className="text-2xl font-black uppercase text-brand-navy tracking-tight">{extras.signatureMove}</h4>
                </div>
            </div>

            {/* Stats & Tools */}
            <div className="lg:col-span-5 space-y-16">
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8 border-b border-brand-navy/10 pb-2">
                        Attributes
                    </h3>
                    {extras.stats.map((s: any) => (
                        <StatBar key={s.label} label={s.label} value={s.val} />
                    ))}
                </div>

                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8 border-b border-brand-navy/10 pb-2">
                        Daily Loadout
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {extras.loadout.map((item: any, i: number) => (
                            <LoadoutItem key={i} icon={item.icon} name={item.name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* --- 3. VISUAL EVIDENCE (The Gallery) --- */}
        <div className="mb-32">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-brand-navy leading-none">
                    Visual<br/>Evidence.
                </h2>
                {member.instagram && (
                    <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 font-mono text-xs uppercase font-bold text-brand-purple hover:text-brand-navy transition-colors">
                        <Instagram size={14} /> Follow Signal <ArrowUpRight size={14} />
                    </a>
                )}
            </div>

            {/* Gallery Grid - Clean, large, impactful */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {extras.galleryImages && extras.galleryImages.map((imgName: string, i: number) => (
                    <div key={i} className="aspect-[4/5] bg-brand-navy/5 overflow-hidden relative group">
                        {/* Note: Path assumes files are in /public/assets/team/gallery/ */}
                        <img 
                            src={`/assets/team/gallery/${imgName}`} 
                            alt={`Evidence ${i}`} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            onError={(e) => {
                                // Fallback if file doesn't exist yet
                                e.currentTarget.src = 'https://placehold.co/600x800/EAEAEA/0F0328?text=NO+SIGNAL';
                            }}
                        />
                        <div className="absolute top-4 right-4 bg-brand-navy text-white px-2 py-1 font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            IMG_0{i+1}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- 4. ACTION BAR (LinkedIn & Contact) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-y-2 border-brand-navy mb-32">
            <a 
                href={extras.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col justify-center items-center py-16 px-8 bg-brand-navy hover:bg-[#0077B5] transition-colors duration-300 text-white"
            >
                <Linkedin size={48} className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-mono text-sm uppercase tracking-widest font-bold">Connect on Network</h3>
            </a>
            <Link 
                to="/contact" 
                className="group flex flex-col justify-center items-center py-16 px-8 bg-white hover:bg-brand-purple hover:text-white transition-colors duration-300 border-l-0 md:border-l-2 border-brand-navy"
            >
                <div className="mb-6 font-mono text-4xl group-hover:rotate-12 transition-transform">⚡</div>
                <h3 className="font-mono text-sm uppercase tracking-widest font-bold text-brand-navy group-hover:text-white">Deploy on Project</h3>
            </Link>
        </div>

      </div>

      {/* --- NEXT OPERATOR FOOTER --- */}
      <Link to={`/team/${nextSlug}`} className="block bg-white group hover:bg-brand-yellow transition-colors duration-500 border-t-2 border-brand-navy">
          <div className="container mx-auto px-8 py-24 flex justify-between items-center">
              <div>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 block text-brand-navy">Next Operative</span>
                  <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-brand-navy group-hover:translate-x-6 transition-transform duration-500">
                      {nextMember.name}
                  </h2>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-full border-2 border-brand-navy items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <span className="font-mono text-2xl font-bold">→</span>
              </div>
          </div>
      </Link>

    </div>
  );
};

export default TeamMemberPage;