import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Cpu, Zap, Disc, Coffee, Anchor, PenTool, Linkedin, Instagram, Mail } from 'lucide-react';

// --- 1. LOCAL DATA (The Fun Stuff) ---
const MEMBER_EXTRAS: Record<string, any> = {
  franco: {
    class: "Visual Architect",
    level: "Lvl. 90",
    status: "RENDERING_SOMETHING",
    signatureMove: "Eyeballing symmetry",
    linkedin: "https://www.linkedin.com/in/whatthefranco/",
    loadout: [
      { icon: <Cpu size={16} />, name: "Any Design Software" },
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

// Helper to fix paths (removes 'public' so Vite serves it correctly)
const cleanPath = (path: string) => path.replace(/^public\//, '/');

const InfiniteMarquee = ({ images }: { images: string[] }) => {
    // Quadruple images to ensure seamless loop on large screens
    const loopImages = [...images, ...images, ...images, ...images];

    return (
        <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden opacity-30 mix-blend-multiply pointer-events-none select-none">
            {/* Top Row - Left */}
            <motion.div 
                className="flex gap-8 mb-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
                {loopImages.map((img, i) => (
                    <div key={`t-${i}`} className="w-[40vh] aspect-[3/4] flex-shrink-0 grayscale contrast-125">
                        <img src={cleanPath(img)} className="w-full h-full object-cover" alt="" />
                    </div>
                ))}
            </motion.div>

            {/* Bottom Row - Right (Offset) */}
            <motion.div 
                className="flex gap-8 ml-[-50%]"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            >
                {loopImages.map((img, i) => (
                    <div key={`b-${i}`} className="w-[40vh] aspect-[3/4] flex-shrink-0 grayscale contrast-125">
                        <img src={cleanPath(img)} className="w-full h-full object-cover" alt="" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const StatBar = ({ label, value }: { label: string, value: number }) => (
    <div className="mb-6">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest mb-2 text-brand-navy/60">
            <span className="font-bold text-brand-navy">{label}</span>
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

const LoadoutItem = ({ icon, name }: { icon: React.ReactNode, name: string }) => (
    <div className="flex items-center gap-3 p-3 border border-brand-navy/10 bg-white hover:border-brand-purple transition-colors">
        <div className="text-brand-purple">{icon}</div>
        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-brand-navy">
            {name}
        </span>
    </div>
);

const LinkRow = ({ label, href, icon, external = false }: { label: string, href: string, icon: React.ReactNode, external?: boolean }) => (
    <a 
        href={href} 
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-center justify-between py-5 border-b border-brand-navy/10 group hover:pl-2 transition-all cursor-pointer"
    >
        <div className="flex items-center gap-4">
            <div className="text-brand-navy/30 group-hover:text-brand-navy transition-colors">{icon}</div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-brand-navy">
                {label}
            </span>
        </div>
        <ArrowUpRight size={16} className="text-brand-navy/20 group-hover:text-brand-purple transition-colors" />
    </a>
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
            <h1 className="text-6xl font-black uppercase text-brand-navy">Signal Lost</h1>
            <Link to="/team" className="font-mono uppercase underline mt-4 block text-brand-purple">Return to Roster</Link>
        </div>
      </div>
    );
  }

  const member = TEAM_MEMBERS[memberSlug];
  const extras = MEMBER_EXTRAS[memberSlug] || MEMBER_EXTRAS['franco'];
  
  // Navigation Logic
  const memberKeys = Object.keys(TEAM_MEMBERS);
  const currentIndex = memberKeys.indexOf(memberSlug);
  const nextSlug = memberKeys[(currentIndex + 1) % memberKeys.length];
  const nextMember = TEAM_MEMBERS[nextSlug];

  return (
    <div className="bg-[#EAEAEA] min-h-screen pt-0 pb-0 overflow-x-hidden selection:bg-brand-purple selection:text-white">
      
      {/* --- 1. HERO: ENDLESS BROADCAST --- */}
      <div className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-[#EAEAEA] overflow-hidden border-b-2 border-brand-navy">
          {/* Background Loop */}
          <InfiniteMarquee images={extras.galleryImages} />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay pointer-events-none z-10"></div>

          {/* Foreground Type */}
          <div className="relative z-20 text-center mix-blend-hard-light px-4">
              <h1 className="text-[18vw] font-black uppercase tracking-tighter leading-[0.8] text-brand-navy select-none">
                  {member.name}
              </h1>
              <div className="mt-6 md:mt-10">
                  <span className="inline-block bg-brand-navy text-white px-4 py-2 font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold shadow-[4px_4px_0px_#FCC803]">
                      {member.title}
                  </span>
              </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-navy/60 animate-pulse bg-white/50 px-2 py-1">
                  Live Feed Active &bull; Scroll for Dossier
              </span>
          </div>
      </div>

      {/* --- 2. BACK NAV --- */}
      <div className="container mx-auto px-6 md:px-8 -mt-8 relative z-30">
          <Link to="/team" className="inline-flex items-center gap-2 bg-white border-2 border-brand-navy px-6 py-3 font-mono text-xs uppercase font-bold text-brand-navy hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-[6px_6px_0px_#0F0328]">
              <ArrowLeft size={14} /> Back to The Humans
          </Link>
      </div>

      {/* --- 3. EDITORIAL PROFILE (New Main Section) --- */}
      <section className="py-24 md:py-32 border-b-2 border-brand-navy/10">
          <div className="container mx-auto px-6 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                  
                  {/* LEFT: THE MAIN PORTRAIT (Magazine Style) */}
                  <div className="relative">
                      <div className="aspect-[3/4] bg-brand-navy overflow-hidden border-2 border-brand-navy shadow-[12px_12px_0px_rgba(15,3,40,0.1)] group">
                          <img 
                              src={member.imageUrl} 
                              alt={member.name} 
                              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000 ease-out"
                          />
                          
                          {/* Photo Metadata */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white font-mono text-[10px] uppercase tracking-widest flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <span>RAW_FILE</span>
                              <span>MOUNT_MAUNGANUI_NZ</span>
                          </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-brand-navy/40">
                          <span>Fig 01. Profile</span>
                          <span>{extras.class}</span>
                      </div>
                  </div>

                  {/* RIGHT: THE NARRATIVE (Editorial Typography) */}
                  <div className="flex flex-col justify-center h-full pt-8 lg:pt-0">
                      <div className="mb-12">
                          <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold mb-4 block">
                              // Identity Confirmed
                          </span>
                          
                          {/* Render paragraphs with styling */}
                          {member.bio.map((paragraph, index) => (
                              <p 
                                  key={index} 
                                  className={`
                                      ${index === 0 
                                          ? 'font-body text-3xl md:text-4xl leading-tight font-light text-brand-navy mb-10' 
                                          : 'font-body text-xl leading-relaxed text-brand-navy/80 mb-6 max-w-xl'
                                      }
                                  `}
                              >
                                  {paragraph}
                              </p>
                          ))}
                      </div>

                      {/* Signature Move Block */}
                      <div className="p-8 border-l-4 border-brand-purple bg-white shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2 block font-bold">
                              Signature Move
                          </span>
                          <h4 className="text-3xl font-black uppercase text-brand-navy tracking-tight leading-none">
                              {extras.signatureMove}
                          </h4>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* --- 4. THE TECH SPECS (Grid) --- */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                  
                  {/* Column 1: Stats */}
                  <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8 border-b border-brand-navy/10 pb-2">
                          01 / Attributes
                      </h3>
                      {extras.stats.map((s: any) => (
                          <StatBar key={s.label} label={s.label} value={s.val} />
                      ))}
                  </div>

                  {/* Column 2: Loadout */}
                  <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8 border-b border-brand-navy/10 pb-2">
                          02 / Daily Loadout
                      </h3>
                      <div className="flex flex-col gap-2">
                          {extras.loadout.map((item: any, i: number) => (
                              <LoadoutItem key={i} icon={item.icon} name={item.name} />
                          ))}
                      </div>
                  </div>

                  {/* Column 3: Comms */}
                  <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold mb-8 border-b border-brand-navy/10 pb-2">
                          03 / Connect
                      </h3>
                      <div className="flex flex-col">
                          <LinkRow 
                              label="LinkedIn Profile" 
                              href={extras.linkedin} 
                              icon={<Linkedin size={18} />} 
                              external 
                          />
                          {member.instagram && (
                              <LinkRow 
                                  label="Instagram Feed" 
                                  href={`https://instagram.com/${member.instagram}`} 
                                  icon={<Instagram size={18} />} 
                                  external 
                              />
                          )}
                          <div className="mt-8">
                              <Link to="/contact" className="flex w-full items-center justify-center gap-3 bg-brand-navy text-white py-4 font-mono text-xs uppercase font-bold hover:bg-brand-purple transition-all shadow-[4px_4px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803]">
                                  <Mail size={16} /> Call-in for a Project
                              </Link>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* --- 5. NEXT FOOTER --- */}
      <Link to={`/team/${nextSlug}`} className="block border-t-2 border-brand-navy bg-[#EAEAEA] group hover:bg-brand-navy hover:text-white transition-colors duration-500 py-32">
          <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
              <div>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 block">Next Operator</span>
                  <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-none group-hover:translate-x-6 transition-transform duration-500">
                      {nextMember.name}
                  </h2>
              </div>
              <div className="hidden md:block opacity-20 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={80} />
              </div>
          </div>
      </Link>

    </div>
  );
};

export default TeamMemberPage;