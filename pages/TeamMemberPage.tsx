import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Cpu, Zap, Disc, PenTool, Coffee, Anchor, Linkedin, Instagram, Mail } from 'lucide-react';

// --- 1. LOCAL DATA (The Fun Stuff) ---
const MEMBER_EXTRAS: Record<string, any> = {
  franco: {
    class: "Visual Architect",
    level: "Lvl. 99",
    status: "HEAVY_RENDERING",
    signatureMove: "The No-Magic Deconstruction",
    linkedin: "https://www.linkedin.com/in/whatthefranco/",
    loadout: [
      { icon: <Cpu size={16} />, name: "Cinema 4D" },
      { icon: <Zap size={16} />, name: "Octane" },
      { icon: <Disc size={16} />, name: "90s Hip Hop" },
      { icon: <Coffee size={16} />, name: "Black Coffee" }
    ],
    stats: [
      { label: "Vision", val: 98 },
      { label: "Chaos", val: 85 },
      { label: "Technical", val: 92 },
      { label: "Patience", val: 40 }
    ],
    // These files must exist in public/assets/team/gallery/
    galleryImages: [
        '/public/assets/team/gallery/franco01.webp',
        '/public/assets/team/gallery/franco02.webp',
        '/public/assets/team/gallery/franco03.webp',
        '/public/assets/team/gallery/franco04.webp'
    ]
  },
  ariana: {
    class: "Ops Commander",
    level: "Lvl. 99",
    status: "SYSTEM_OPTIMAL",
    signatureMove: "Chaos Containment Field",
    linkedin: "https://www.linkedin.com/in/arianaarmando/",
    loadout: [
      { icon: <Anchor size={16} />, name: "Logic" },
      { icon: <PenTool size={16} />, name: "Strategy" },
      { icon: <Disc size={16} />, name: "Indie Pop" },
      { icon: <Coffee size={16} />, name: "Long Black" }
    ],
    stats: [
      { label: "Order", val: 100 },
      { label: "Execution", val: 95 },
      { label: "Client Love", val: 100 },
      { label: "BS Tolerance", val: 10 }
    ],
    galleryImages: [
        '/public/assets/team/gallery/ariana01.webp',
        '/public/assets/team/gallery/ariana02.webp',
        '/public/assets/team/gallery/ariana03.webp',
        '/public/assets/team/gallery/ariana04.webp'
    ]
  }
};

// --- 2. COMPONENTS ---

const InfiniteGallery = ({ images }: { images: string[] }) => {
  // Quadruple images to ensure seamless loop on large screens
  const loopImages = [...images, ...images, ...images, ...images];

  return (
    <div className="w-full overflow-hidden border-y-2 border-brand-navy bg-brand-navy py-0 relative z-0 mt-8 mb-16">
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10"></div>
        
        <motion.div 
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                duration: 30, // Adjust speed here (higher = slower)
                ease: "linear", 
                repeat: Infinity 
            }}
        >
            {loopImages.map((img, i) => (
                <div key={i} className="relative w-[60vw] md:w-[25vw] aspect-[3/4] flex-shrink-0 border-r-2 border-brand-navy grayscale contrast-125 hover:grayscale-0 transition-all duration-500 group">
                    <img 
                        src={`/assets/team/gallery/${img}`} 
                        alt={`Gallery ${i}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback purely for dev if files aren't uploaded yet
                            e.currentTarget.src = 'https://placehold.co/600x800/0F0328/FFFFFF?text=NO+SIGNAL';
                        }}
                    />
                    <div className="absolute top-4 left-4 bg-brand-navy/90 text-white px-2 py-1 font-mono text-[9px] uppercase tracking-widest backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        RAW_0{i+1}
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
  );
};

const LinkRow = ({ label, href, icon, external = false }: { label: string, href: string, icon: React.ReactNode, external?: boolean }) => (
    <a 
        href={href} 
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-center justify-between py-6 border-b border-brand-navy/10 group hover:bg-white transition-all cursor-pointer px-2 -mx-2"
    >
        <div className="flex items-center gap-4">
            <div className="text-brand-navy/40 group-hover:text-brand-purple transition-colors">
                {icon}
            </div>
            <span className="font-mono text-sm md:text-base uppercase tracking-widest font-bold text-brand-navy group-hover:translate-x-2 transition-transform duration-300">
                {label}
            </span>
        </div>
        <ArrowUpRight size={18} className="text-brand-navy/20 group-hover:text-brand-purple group-hover:rotate-45 transition-all duration-300" />
    </a>
);

const InternalLinkRow = ({ label, to, icon }: { label: string, to: string, icon: React.ReactNode }) => (
    <Link 
        to={to} 
        className="flex items-center justify-between py-6 border-b border-brand-navy/10 group hover:bg-white transition-all cursor-pointer px-2 -mx-2"
    >
        <div className="flex items-center gap-4">
            <div className="text-brand-navy/40 group-hover:text-brand-purple transition-colors">
                {icon}
            </div>
            <span className="font-mono text-sm md:text-base uppercase tracking-widest font-bold text-brand-navy group-hover:translate-x-2 transition-transform duration-300">
                {label}
            </span>
        </div>
        <ArrowUpRight size={18} className="text-brand-navy/20 group-hover:text-brand-purple group-hover:rotate-45 transition-all duration-300" />
    </Link>
);

const LoadoutBadge = ({ icon, name }: { icon: React.ReactNode, name: string }) => (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-brand-navy/10 shadow-sm hover:border-brand-purple transition-colors cursor-help">
        <div className="text-brand-purple">{icon}</div>
        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-brand-navy">{name}</span>
    </div>
);

const StatBar = ({ label, value }: { label: string, value: number }) => (
    <div className="mb-6">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest mb-2 text-brand-navy/60">
            <span className="font-bold">{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-1 w-full bg-brand-navy/10">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-brand-navy"
            />
        </div>
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
            <Link to="/team" className="font-mono uppercase underline mt-8 block text-brand-purple">Return to Roster</Link>
        </div>
      </div>
    );
  }

  const member = TEAM_MEMBERS[memberSlug];
  const extras = MEMBER_EXTRAS[memberSlug] || MEMBER_EXTRAS['franco'];
  
  // Navigation
  const memberKeys = Object.keys(TEAM_MEMBERS);
  const currentIndex = memberKeys.indexOf(memberSlug);
  const nextIndex = (currentIndex + 1) % memberKeys.length;
  const nextSlug = memberKeys[nextIndex];
  const nextMember = TEAM_MEMBERS[nextSlug];

  return (
    <div className="bg-[#EAEAEA] min-h-screen pt-32 pb-0 overflow-x-hidden selection:bg-brand-purple selection:text-white">
      
      <div className="container mx-auto px-6 md:px-8">
        {/* Nav */}
        <Link to="/team" className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-brand-navy/40 hover:text-brand-purple transition-colors mb-12">
            <ArrowLeft size={14} /> Back to Humans
        </Link>
      </div>

      {/* --- 1. HERO: INFINITE LOOP --- */}
      <InfiniteGallery images={extras.galleryImages} />

      <div className="container mx-auto px-6 md:px-8">
        
        {/* --- 2. IDENTITY HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 border-b-2 border-brand-navy/10 pb-12">
            <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-brand-purple text-white px-2 py-1 font-bold">
                        {extras.class}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest border border-brand-navy/20 px-2 py-1 font-bold text-brand-navy/60">
                        {extras.level}
                    </span>
                </div>
                <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] text-brand-navy mb-8">
                    {member.name}
                </h1>
            </div>
            <div className="lg:col-span-4 lg:text-right flex flex-col justify-end">
                <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 leading-relaxed">
                    Current Status: <span className="text-brand-navy font-bold animate-pulse">{extras.status}</span> <br/>
                    Location: Mount Maunganui
                </p>
            </div>
        </div>

        {/* --- 3. INTELLIGENCE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
            
            {/* Left Column: Bio & Ability */}
            <div className="lg:col-span-7 space-y-12">
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-6">
                        // Transmission Log
                    </h3>
                    {member.bio.map((p, i) => (
                        <p key={i} className="font-body text-xl md:text-2xl leading-relaxed text-brand-navy font-light mb-6">
                            {p}
                        </p>
                    ))}
                </div>
                
                <div className="p-8 bg-white border border-brand-navy/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-2 block font-bold">Special Ability</span>
                    <h4 className="text-3xl font-black uppercase text-brand-navy tracking-tight leading-none">{extras.signatureMove}</h4>
                </div>
            </div>

            {/* Right Column: Stats, Loadout, Links */}
            <div className="lg:col-span-5 space-y-16">
                
                {/* Stats */}
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8 border-b border-brand-navy/10 pb-2">
                        Attributes
                    </h3>
                    {extras.stats.map((s: any) => (
                        <StatBar key={s.label} label={s.label} value={s.val} />
                    ))}
                </div>

                {/* Loadout */}
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8 border-b border-brand-navy/10 pb-2">
                        Daily Loadout
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {extras.loadout.map((item: any, i: number) => (
                            <LoadoutBadge key={i} icon={item.icon} name={item.name} />
                        ))}
                    </div>
                </div>

                {/* Link List */}
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-4">
                        // Connect & Deploy
                    </h3>
                    <div className="flex flex-col border-t border-brand-navy/10">
                        <LinkRow 
                            label="LinkedIn Profile" 
                            href={extras.linkedin} 
                            icon={<Linkedin size={20} />} 
                            external 
                        />
                        {member.instagram && (
                            <LinkRow 
                                label="Instagram Feed" 
                                href={`https://instagram.com/${member.instagram}`} 
                                icon={<Instagram size={20} />} 
                                external 
                            />
                        )}
                        <InternalLinkRow 
                            label="Deploy on Project" 
                            to="/contact" 
                            icon={<Mail size={20} />} 
                        />
                    </div>
                </div>

            </div>
        </div>

      </div>

      {/* --- NEXT OPERATOR FOOTER --- */}
      <Link to={`/team/${nextSlug}`} className="block border-t-2 border-brand-navy bg-white group hover:bg-brand-navy hover:text-white transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-8 py-24 flex justify-between items-center">
              <div>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 block">Next Human</span>
                  <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-6 transition-transform duration-500">
                      {nextMember.name}
                  </h2>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-full border-2 border-current items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-2xl font-bold">→</span>
              </div>
          </div>
      </Link>

    </div>
  );
};

export default TeamMemberPage;