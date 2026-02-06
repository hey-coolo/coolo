import React, { useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Cpu, Zap, Disc, Coffee, Anchor, PenTool, Linkedin, Instagram, Mail } from 'lucide-react';

// --- 1. LOCAL DATA ---
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
      { icon: <Anchor size={16} />, name: "Logic" },
      { icon: <PenTool size={16} />, name: "Strategy" },
      { icon: <Disc size={16} />, name: "Indie Pop" },
      { icon: <Coffee size={16} />, name: "Long Black" }
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

const HorizontalGallery = ({ images }: { images: string[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-8 -mx-4 md:-mx-8 px-4 md:px-8">
            <div className="flex gap-4 md:gap-8 w-max">
                {images.map((img, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="relative w-[80vw] md:w-[40vw] aspect-[4/5] md:aspect-[3/4] flex-shrink-0 bg-brand-navy overflow-hidden group"
                    >
                        <img 
                            src={`/assets/team/gallery/${img}`} 
                            alt={`Gallery ${i}`}
                            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                            draggable={false}
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x1000/EAEAEA/0F0328?text=NO+SIGNAL';
                            }}
                        />
                        <div className="absolute top-4 left-4 bg-brand-navy/80 text-white px-2 py-1 font-mono text-[9px] uppercase tracking-widest backdrop-blur-sm">
                            RAW_0{i+1}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const LinkRow = ({ label, href, icon, external = false }: { label: string, href: string, icon: React.ReactNode, external?: boolean }) => (
    <a 
        href={href} 
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-center justify-between py-6 border-b border-brand-navy/10 group hover:border-brand-navy transition-colors cursor-pointer"
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
        className="flex items-center justify-between py-6 border-b border-brand-navy/10 group hover:border-brand-navy transition-colors cursor-pointer"
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
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-brand-navy/10 rounded-full">
        <div className="text-brand-purple">{icon}</div>
        <span className="font-mono text-[9px] uppercase tracking-widest font-bold">{name}</span>
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
        
        {/* --- 1. HEADER (EDITORIAL) --- */}
        <div className="mb-16 md:mb-24">
            <Link to="/team" className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-brand-navy/40 hover:text-brand-purple transition-colors mb-8">
                <ArrowLeft size={14} /> Back to Humans
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8">
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-brand-purple text-white px-2 py-1 mb-6 inline-block font-bold">
                        {extras.class}
                    </span>
                    <h1 className="text-8xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] text-brand-navy mb-8">
                        {member.name}
                    </h1>
                    <div className="flex flex-wrap gap-4">
                        {extras.loadout.map((item: any, i: number) => (
                            <LoadoutBadge key={i} icon={item.icon} name={item.name} />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-4 lg:pt-12">
                    <p className="font-body text-2xl leading-tight text-brand-navy/80 font-light">
                        {member.bio[0]}
                    </p>
                </div>
            </div>
        </div>

        {/* --- 2. HORIZONTAL HERO SCROLL (THE "HUMAN" GALLERY) --- */}
        <div className="mb-24">
            <HorizontalGallery images={extras.galleryImages} />
            <div className="flex justify-between items-center mt-4 px-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Feed
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-navy/40">
                    Scroll to View &rarr;
                </span>
            </div>
        </div>

        {/* --- 3. INTEL & CONNECTIONS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
            
            {/* Extended Bio */}
            <div className="lg:col-span-7 space-y-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8">
                    // Transmission Log
                </h3>
                {member.bio.slice(1).map((p, i) => (
                    <p key={i} className="font-body text-xl md:text-2xl leading-relaxed text-brand-navy/80 font-light">
                        {p}
                    </p>
                ))}
                
                <div className="pt-12">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2 block">Signature Move</span>
                    <h4 className="text-3xl md:text-4xl font-black uppercase text-brand-navy tracking-tight">{extras.signatureMove}</h4>
                </div>
            </div>

            {/* Link List (The Clean Stack) */}
            <div className="lg:col-span-5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8">
                    // Connect & Deploy
                </h3>
                
                <div className="flex flex-col border-t border-brand-navy/10">
                    {/* LinkedIn */}
                    <LinkRow 
                        label="LinkedIn Profile" 
                        href={extras.linkedin} 
                        icon={<Linkedin size={20} />} 
                        external 
                    />
                    
                    {/* Instagram (If exists) */}
                    {member.instagram && (
                        <LinkRow 
                            label="Visual Feed" 
                            href={`https://instagram.com/${member.instagram}`} 
                            icon={<Instagram size={20} />} 
                            external 
                        />
                    )}

                    {/* Email / Contact */}
                    <InternalLinkRow 
                        label="Deploy on Project" 
                        to="/contact" 
                        icon={<Mail size={20} />} 
                    />
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