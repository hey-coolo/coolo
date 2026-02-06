import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';

// 1. Handheld Float Animation
const floatAnim = {
    y: [0, -3, 0, 2, 0],
    x: [0, 1, 0, -1, 0],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
    }
};

const DownArrow: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 40 }) => (
    <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className={className}
    >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
    </motion.div>
);

interface TrailItem {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    img: string;
}

const ImageTrail: React.FC<{ containerRef: React.RefObject<HTMLElement> }> = ({ containerRef }) => {
    const [trail, setTrail] = useState<TrailItem[]>([]);
    const lastPos = useRef({ x: 0, y: 0 });
    const trailCount = useRef(0);

    const allImages = useMemo(() => {
        const all = PROJECTS.flatMap(p => [p.imageUrl, ...(p.detailImages || [])]).filter(Boolean);
        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
        }
        return all;
    }, []);

    useEffect(() => {
        const handleMove = (clientX: number, clientY: number) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();

            if (
                clientX < rect.left || 
                clientX > rect.right || 
                clientY < rect.top || 
                clientY > rect.bottom
            ) {
                return;
            }

            const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y);

            if (dist > 80) {
                const nextImage = allImages[trailCount.current % allImages.length];
                const id = trailCount.current++;
                
                const relativeX = clientX - rect.left;
                const relativeY = clientY - rect.top;

                const newItem: TrailItem = {
                    id,
                    x: relativeX,
                    y: relativeY,
                    rotation: Math.random() * 20 - 10,
                    scale: 0.6 + Math.random() * 0.4,
                    img: nextImage
                };

                setTrail(prev => [...prev, newItem]);
                lastPos.current = { x: clientX, y: clientY };

                setTimeout(() => {
                    setTrail(prev => prev.filter(i => i.id !== id));
                }, 1000);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            handleMove(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [allImages, containerRef]);

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {trail.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.5, rotate: item.rotation }}
                        animate={{ opacity: 1, scale: item.scale, rotate: item.rotation }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute w-[140px] md:w-[260px] aspect-[4/5] shadow-2xl origin-center border border-white/20"
                        style={{
                            left: item.x,
                            top: item.y,
                            x: "-50%",
                            y: "-50%" 
                        }}
                    >
                        <img 
                            src={item.img} 
                            alt="" 
                            className="w-full h-full object-cover grayscale contrast-125" 
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

const BrandHero: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set((e.clientX / innerWidth) - 0.5);
        mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col pt-32 pb-16 bg-[#EAEAEA] text-brand-navy overflow-hidden"
        >
            <ImageTrail containerRef={sectionRef} />

            <div className="absolute inset-0 studio-grid pointer-events-none opacity-[0.05] z-10"></div>
            
            <div className="container mx-auto px-6 md:px-8 relative z-30 flex-grow flex flex-col justify-center pointer-events-none">
                <div className="relative mb-16 md:mb-32">
                    <div className="pointer-events-auto inline-block">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileInView={floatAnim}
                            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            className="text-[14vw] md:text-[12.5vw] font-black uppercase leading-[0.8] tracking-tighter text-brand-navy break-words select-all md:mix-blend-difference md:text-white lg:text-brand-navy lg:mix-blend-normal"
                        >
                            BRAND STRATEGY
                        </motion.h1>
                    </div>
                    
                    <div className="flex justify-start items-baseline mt-2 md:mt-4 ml-[12vw] md:ml-[24vw] relative">
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                            className="text-brand-purple font-serif italic font-light text-[12vw] md:text-[11vw] leading-none absolute -left-[1em] top-[-0.05em] pointer-events-none mix-blend-multiply"
                        >
                            &
                        </motion.span>
                        <div className="pointer-events-auto inline-block">
                            <motion.h1 
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileInView={floatAnim}
                                transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                                className="text-[14vw] md:text-[12.5vw] font-black uppercase leading-[0.8] tracking-tighter text-brand-navy break-words select-all md:mix-blend-difference md:text-white lg:text-brand-navy lg:mix-blend-normal"
                            >
                                DESIGN POWER
                            </motion.h1>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pointer-events-auto">
                    <div className="text-center mb-6">
                        <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-bold bg-brand-navy text-brand-offwhite px-2 py-1">
                            [ CURSOR_ACTIVE ]
                        </span>
                    </div>

                    <div className="w-full h-[2px] bg-brand-navy mb-8 md:mb-10"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start text-brand-navy">
                        <div className="font-mono">
                            <span className="bg-brand-purple text-brand-offwhite px-1 uppercase tracking-[0.1em] text-[10px] font-bold inline-block mb-3 md:mb-4">Est. 2024</span>
                            <div className="text-[10px] uppercase tracking-widest leading-loose font-bold opacity-70">
                                MOUNT MAUNGANUI<br/>NEW ZEALAND
                            </div>
                        </div>

                        <div className="md:text-center font-mono">
                             <span className="bg-brand-purple text-brand-offwhite px-1 uppercase tracking-[0.1em] text-[10px] font-bold inline-block mb-3 md:mb-4">Senior Unit</span>
                             <p className="text-[10px] uppercase tracking-widest font-bold leading-relaxed opacity-70 max-w-xs mx-auto">
                                A specialized senior unit for ambitious founders and agencies. Two experts. One system.
                             </p>
                        </div>

                        <div className="md:text-right font-mono">
                            <span className="bg-brand-purple text-brand-offwhite px-1 uppercase tracking-[0.1em] text-[10px] font-bold inline-block mb-3 md:mb-4">Status</span>
                             <div className="flex items-center md:justify-end gap-3">
                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#00FF00]"></span>
                                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Live & Rolling</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const SplitManifesto: React.FC = () => {
    return (
        <section className="border-t-2 border-brand-navy bg-[#EAEAEA] relative z-40 overflow-hidden">
            <div className="container mx-auto border-x-2 border-brand-navy/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] p-8 md:p-16 border-b lg:border-b-0 lg:border-r-2 border-brand-navy/10 flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-brand-navy text-brand-offwhite px-1 py-0.5 font-mono uppercase tracking-[0.2em] text-[10px] font-bold mb-8">01 / The Thesis</span>
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.95] text-brand-navy break-words">
                                No Magic.<br/>
                                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1.5px #0F0328' }}>High-Res Logic.</span>
                            </h2>
                            <div className="mt-14 md:mt-20">
                                <DownArrow className="text-brand-purple" size={42} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="p-8 md:p-16 space-y-16 md:space-y-32">
                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy break-words">
                                Great taste is a discipline. We help ambitious organizations strip away the noise to uncover their <span className="bg-brand-purple text-white px-1 font-bold">soul</span> and express it with absolute precision.
                            </p>
                        </AnimatedSection>
                        
                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy break-words">
                                We sell <span className="bg-brand-purple text-white px-1 font-bold">clarity</span>. We believe that if you can't explain your strategy on a napkin, you don't have one worth executing.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy break-words">
                                We provide the <span className="bg-brand-purple text-white px-1 font-bold">Design Power</span>. We don't just design the car; we build the engine and hand you the keys to drive it.
                            </p>
                        </AnimatedSection>

                        <div className="pt-8 md:pt-16">
                             {/* HARD COMMIT BUTTON */}
                             <Link to="/about" className="bg-brand-navy text-white font-mono text-sm uppercase font-bold py-4 px-8 tracking-widest shadow-[4px_4px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] transition-all border-2 border-brand-navy inline-block">
                                 Read the Manifesto
                             </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ServiceRouter: React.FC = () => {
    return (
        <section className="bg-[#EAEAEA] border-b-2 border-brand-navy relative z-40 overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-3">
                {SERVICE_LEGS.map((leg, index) => {
                    const titleParts = leg.title.match(/^(I Need)\s+(.*)$/i);
                    const prefix = titleParts ? titleParts[1] : 'I Need';
                    const mainTitle = titleParts ? titleParts[2] : leg.title;

                    return (
                        <Link 
                            key={leg.id}
                            to={leg.path}
                            className="group relative block min-h-[60vh] md:min-h-[70vh] border-b lg:border-b-0 lg:border-r-2 border-brand-navy/10 p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:bg-[#E0E0E0] transition-colors duration-500"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple bg-brand-offwhite px-1">
                                        0{index + 1}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy">
                                        [{leg.visual}]
                                    </span>
                                </div>
                                
                                <div className="mb-8 relative">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-brand-purple block mb-2">
                                        {prefix}
                                    </span>
                                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy break-words group-hover:skew-x-[-2deg] transition-transform">
                                        {mainTitle}
                                        <span className="text-brand-purple">.</span>
                                    </h2>
                                </div>
                                
                                <p className="font-body text-xl md:text-2xl text-brand-navy/60 max-w-sm leading-relaxed">
                                    {leg.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 pt-12 border-t border-brand-navy/10 mt-auto">
                                <p className="font-mono text-xs uppercase tracking-widest mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-brand-navy bg-white inline-block px-1">
                                    {leg.hoverText}
                                </p>
                                {/* SOFT EXPLORE BUTTON */}
                                <div className="block font-mono text-sm uppercase font-bold tracking-widest border-2 border-brand-navy w-full text-center py-4 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                                    Initialize
                                </div>
                            </div>
                        </Link>
                    );
                })}
             </div>
        </section>
    )
}

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-[#EAEAEA] px-6 md:px-8 py-32 relative z-40 border-b-2 border-brand-navy overflow-hidden">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.9]">
                        Selected<br/>Works
                     </h2>
                     {/* SOFT EXPLORE BUTTON */}
                     <Link to="/work" className="bg-white text-brand-navy border-2 border-brand-navy font-mono text-sm uppercase font-bold py-4 px-8 tracking-widest hover:bg-brand-navy hover:text-white transition-colors shadow-[4px_4px_0px_#000]">
                        View Full Archive
                     </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12">
                    {PROJECTS.slice(1, 8).map((project, index) => (
                        <div 
                            key={project.id} 
                            className={`relative ${index % 2 === 1 ? 'md:translate-y-32' : ''}`}
                        >
                             <ProjectCard project={project} className="aspect-[4/3] w-full shadow-2xl border-2 border-brand-navy" />
                             
                             <div className="mt-6 flex justify-between items-start border-t-2 border-brand-navy pt-4">
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight leading-none text-brand-navy">{project.title}</h3>
                                    <span className="inline-block mt-2 bg-brand-purple text-white px-1 font-mono text-[9px] uppercase tracking-widest font-bold">
                                        {project.category}
                                    </span>
                                </div>
                                <span className="font-mono text-[10px] uppercase font-bold text-brand-navy border border-brand-navy px-2 py-1">
                                    {project.year}
                                </span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const LatestIntel: React.FC = () => {
    return (
        <section className="py-24 relative z-40 bg-[#EAEAEA] overflow-hidden">
             <div className="container mx-auto px-8">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-brand-navy">Studio Thoughts</h3>
                    <Link to="/journal" className="font-mono text-xs uppercase tracking-widest font-bold bg-brand-navy text-white px-2 py-1 hover:bg-brand-purple">View All Entries &rarr;</Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} className="group block border-2 border-brand-navy p-8 bg-white hover:shadow-[8px_8px_0px_#000] transition-all duration-300">
                             <div className="border-b-2 border-brand-navy pb-4 mb-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest font-bold bg-brand-yellow text-brand-navy px-1">
                                    {post.date}
                                </span>
                             </div>
                             <h4 className="text-3xl font-black uppercase tracking-tight leading-none mb-6 text-brand-navy group-hover:text-brand-purple min-h-[3em]">
                                {post.title}
                             </h4>
                             <p className="font-mono text-xs leading-relaxed text-brand-navy/70 uppercase">
                                 // {post.excerpt}
                             </p>
                        </Link>
                    ))}
                 </div>
             </div>
        </section>
    )
}

const FeatureSpotlight: React.FC = () => {
    const featuredProject = PROJECTS[0]; 

    return (
        <section className="relative bg-brand-navy overflow-hidden group">
            <Link to={`/work/${featuredProject.slug}`} className="block relative min-h-screen md:min-h-[120vh]">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 grayscale group-hover:grayscale-0 contrast-125"
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-90" />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16">
                    <div className="container mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block bg-brand-yellow text-brand-navy px-2 py-1 font-mono uppercase tracking-[0.2em] text-xs font-bold mb-6">
                                Featured Case Study
                            </span>
                            <h2 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-offwhite mb-8 group-hover:translate-x-4 transition-transform duration-500">
                                {featuredProject.title}
                            </h2>
                            
                            <div className="flex flex-col md:flex-row gap-12 border-t-2 border-brand-offwhite pt-8 text-brand-offwhite">
                                <div className="max-w-xl">
                                    <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 uppercase tracking-widest line-clamp-3 md:line-clamp-4">
                                        {featuredProject.description}
                                    </p>
                                </div>
                                <div className="mt-auto ml-auto">
                                    {/* SOFT EXPLORE (Inverted for Dark Mode) */}
                                    <span className="font-mono text-sm uppercase tracking-widest border-2 border-brand-offwhite text-brand-offwhite px-8 py-4 font-bold hover:bg-brand-offwhite hover:text-brand-navy transition-colors block">
                                        Open Case File &rarr;
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </section>
    );
};

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#EAEAEA]">
      <BrandHero />
      <SplitManifesto />
      <ServiceRouter />
      <FeatureSpotlight />
      <ShowcaseGrid />
      <LatestIntel />
    </div>
  );
};

export default HomePage;