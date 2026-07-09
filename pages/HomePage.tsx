import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS, QA_DATA } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import { ArrowUpRight, Zap, Shield, Sparkles, Activity, Layers, Terminal } from 'lucide-react';

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

            if (dist > 95) {
                const nextImage = allImages[trailCount.current % allImages.length];
                const id = trailCount.current++;
                
                const relativeX = clientX - rect.left;
                const relativeY = clientY - rect.top;

                const newItem: TrailItem = {
                    id,
                    x: relativeX,
                    y: relativeY,
                    rotation: Math.random() * 16 - 8,
                    scale: 0.7 + Math.random() * 0.3,
                    img: nextImage
                };

                setTrail(prev => [...prev, newItem]);
                lastPos.current = { x: clientX, y: clientY };

                setTimeout(() => {
                    setTrail(prev => prev.filter(i => i.id !== id));
                }, 1100);
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
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {trail.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.4, rotate: item.rotation, y: 15 }}
                        animate={{ opacity: 0.85, scale: item.scale, rotate: item.rotation, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, y: -20, transition: { duration: 0.4 } }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="absolute w-[160px] md:w-[280px] aspect-[4/5] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 rounded-sm p-1 bg-brand-navy overflow-hidden origin-center"
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
                            className="w-full h-full object-cover rounded-xs" 
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

    const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
    const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set((e.clientX / innerWidth) - 0.5);
        mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col pt-40 pb-20 bg-brand-navy text-white overflow-hidden border-b border-white/5"
        >
            <ImageTrail containerRef={sectionRef} />

            <div className="absolute inset-0 studio-grid pointer-events-none z-0"></div>
            
            {/* Ambient Platform Lighting Fields */}
            <motion.div 
                style={{ 
                    x: useTransform(springX, [-0.5, 0.5], [80, -80]), 
                    y: useTransform(springY, [-0.5, 0.5], [80, -80]) 
                }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] bg-brand-purple/20 blur-[140px] rounded-full mix-blend-screen pointer-events-none z-0 animate-ambient-pulse"
            />

            <div className="container mx-auto px-6 md:px-12 relative z-20 flex-grow flex flex-col justify-center pointer-events-none">
                
                {/* Premium Pill Badge Overlay */}
                <div className="flex items-center mb-8 pointer-events-auto w-max mx-auto md:mx-0">
                    <div className="inline-flex items-center gap-2 bg-platform-dark border border-brand-purple/40 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-widest text-brand-offwhite uppercase">
                        <Sparkles size={12} className="text-brand-yellow" />
                        <span>AI SPRINT ENGINE GROUNDED v2.1</span>
                    </div>
                </div>

                <div className="relative mb-20 md:mb-28">
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                        className="flex flex-col text-[13vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter text-white break-words select-all pointer-events-auto"
                    >
                        <span>SHAPING BRANDS</span>
                        <span className="flex flex-wrap items-baseline mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-offwhite to-brand-lavender ml-[4vw] md:ml-[16vw]">
                            WITH CHARACTER.
                        </span>
                    </motion.h1>
                </div>

                <div className="mt-auto pointer-events-auto">
                    <div className="text-center mb-8">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-30 font-bold text-white block animate-pulse">
                            [ DRAG MOUSE ACROSS SPACE TO DEPLOY MATRIX ]
                        </span>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-white/70 font-mono">
                        <div className="bg-platform-dark/30 border border-white/5 rounded-sm p-6 backdrop-blur-md">
                            <span className="text-brand-yellow uppercase tracking-[0.2em] text-[10px] font-black block mb-2">// COORDINATES</span>
                            <div className="text-[11px] uppercase tracking-widest leading-relaxed text-white/90">
                                MOUNT MAUNGANUI &bull; BAY OF PLENTY<br/>NEW ZEALAND &bull; EARTH
                            </div>
                        </div>

                        <div className="bg-platform-dark/30 border border-white/5 rounded-sm p-6 backdrop-blur-md md:text-center">
                             <span className="text-brand-purple uppercase tracking-[0.2em] text-[10px] font-black block mb-2">// PROTOCOL EXECUTED</span>
                             <p className="text-[11px] uppercase tracking-widest leading-relaxed text-white/90 max-w-xs mx-auto">
                                Boutique creative asset system shifting entities from improvised to intentional architecture.
                             </p>
                        </div>

                        <div className="bg-platform-dark/30 border border-white/5 rounded-sm p-6 backdrop-blur-md md:text-right">
                            <span className="text-brand-lavender uppercase tracking-[0.2em] text-[10px] font-black block mb-2">// STATE ENGINE</span>
                             <div className="flex items-center md:justify-end gap-2.5 mt-1">
                                 <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></span>
                                 <span className="text-[11px] uppercase tracking-[0.2em] font-black text-white">READY TO ENGAGE // Q3 ARCHIVE</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const NarrativeScroll: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -40]);
    const scale1 = useTransform(scrollYProgress, [0, 0.22], [1, 0.96]);

    const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [40, 0, -40]);
    const scale2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0.96, 1, 0.96]);

    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [40, 0, -40]);
    const scale3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [0.96, 1, 0.96]);

    const opacity4 = useTransform(scrollYProgress, [0.68, 0.85, 1], [0, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.68, 0.85], [40, 0]);
    const scale4 = useTransform(scrollYProgress, [0.68, 0.85], [0.96, 1]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-brand-navy">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12">
                <div className="absolute inset-0 studio-grid pointer-events-none opacity-40"></div>
                
                <div className="absolute top-16 left-6 md:left-12 font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-bold z-20 flex items-center gap-2">
                    <Terminal size={12} className="text-brand-yellow" />
                    <span>01 // TRANSMISSION LOG</span>
                </div>

                <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center h-full">
                    
                    <motion.div style={{ opacity: opacity1, y: y1, scale: scale1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <h2 className="text-[11vw] md:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center">
                            <span>EVERY FOUNDER</span>
                            <span className="kinetic-text">HAS A VISION.</span>
                        </h2>
                    </motion.div>

                    <motion.div style={{ opacity: opacity2, y: y2, scale: scale2 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <h2 className="text-[11vw] md:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center">
                            <span>NOT EVERY VISION</span>
                            <span className="kinetic-text">BECOMES A BRAND.</span>
                        </h2>
                    </motion.div>

                    <motion.div style={{ opacity: opacity3, y: y3, scale: scale3 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <h2 className="text-[11vw] md:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center">
                            <span>THAT'S WHERE WE</span>
                            <span className="kinetic-text">COME IN.</span>
                        </h2>
                    </motion.div>

                    <motion.div style={{ opacity: opacity4, y: y4, scale: scale4 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto mt-12 md:mt-0">
                        <h2 className="text-[9vw] md:text-[5rem] lg:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center mb-8">
                            <span>STRATEGY. DESIGN.</span>
                            <span className="text-brand-yellow">DIRECTION. CONTENT.</span>
                        </h2>
                        
                        <p className="font-body text-lg md:text-xl font-light text-white/70 max-w-3xl leading-relaxed mx-auto mb-12">
                            We work alongside founders to shape brands from the inside out—clarifying what they stand for, designing how they're seen, and crafting the creative layout vectors that force audiences to understand and remember.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-brand-navy font-mono text-xs uppercase font-black py-4 px-10 border border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-xl">
                                Inquire Now
                            </Link>
                            <Link to="/about" className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 text-white font-mono text-xs uppercase font-bold py-4 px-10 hover:bg-white/5 transition-all duration-300">
                                More About Us
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

const ServiceRouter: React.FC = () => {
    return (
        <section className="bg-brand-navy border-t border-b border-white/5 relative z-40 overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-3">
                {SERVICE_LEGS.map((leg, index) => {
                    const titleParts = leg.title.match(/^(We help you)\s+(.*)$/i);
                    const prefix = titleParts ? titleParts[1] : 'We help you';
                    const mainTitle = titleParts ? titleParts[2] : leg.title;

                    return (
                        <div 
                            key={leg.id}
                            className="group relative flex flex-col justify-between min-h-[55vh] md:min-h-[65vh] border-b lg:border-b-0 lg:border-r border-white/5 p-8 md:p-12 overflow-hidden hover:bg-platform-dark/60 transition-colors duration-500 neon-glow-border"
                        >
                            <Link to={leg.path} className="absolute inset-0 z-0" aria-label={`View ${leg.title}`} />
                            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative z-10 pointer-events-none">
                                <div className="flex justify-between items-start mb-16">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-black text-brand-purple group-hover:text-brand-yellow transition-colors">
                                        // 0{index + 1}
                                    </span>
                                    <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-2.5 py-0.5 font-mono text-[9px] text-white/40">
                                        <Layers size={10} />
                                        <span>{leg.visual.split(',')[0]}</span>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-white/60 block mb-1">
                                        {prefix}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white break-words">
                                        {mainTitle}<span className="text-brand-purple group-hover:text-brand-yellow transition-colors">.</span>
                                    </h2>
                                </div>
                                
                                <p className="font-body text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                                    {leg.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 pt-8 border-t border-white/5 mt-auto flex flex-col items-start gap-6">
                                <p className="font-mono text-[11px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity text-white/60 group-hover:text-white/90 pointer-events-none">
                                    {leg.hoverText}
                                </p>
                                
                                <div className="flex items-center justify-between w-full pointer-events-auto">
                                    <Link to="/contact" className="bg-white/5 hover:bg-white text-white hover:text-brand-navy font-mono text-[11px] uppercase font-bold py-2.5 px-5 border border-white/10 rounded-sm transition-all duration-300">
                                        Inquire Now
                                    </Link>
                                    <Link to={leg.path} className="inline-flex items-center gap-1 font-mono text-[11px] uppercase font-bold text-brand-purple group-hover:text-brand-yellow transition-colors py-2">
                                        <span>Details</span>
                                        <ArrowUpRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
        </section>
    )
}

const FeatureSpotlight: React.FC = () => {
    const featuredProject = PROJECTS[0]; 

    return (
        <section className="relative bg-brand-navy overflow-hidden border-b border-white/5 group">
            <Link to={`/work/${featuredProject.slug}`} className="block relative min-h-screen md:min-h-[110vh]">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover opacity-45 group-hover:opacity-30 transition-opacity duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16">
                    <div className="container mx-auto px-4">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-mono text-[10px] uppercase font-bold px-3 py-1 mb-4 rounded-full">
                                <Activity size={10} />
                                <span>CRITICAL SPEC_01 // FEATURED LOG SYSTEM</span>
                            </div>
                            <h2 className="text-[13vw] leading-[0.85] font-black uppercase tracking-tighter text-white mb-8 group-hover:text-brand-yellow transition-colors duration-500">
                                {featuredProject.title}
                            </h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-8 text-white/70">
                                <div className="lg:col-span-8">
                                    <p className="font-body text-base md:text-lg font-light opacity-80 leading-relaxed max-w-3xl line-clamp-3">
                                        {featuredProject.description}
                                    </p>
                                </div>
                                <div className="lg:col-span-4 flex justify-end items-end">
                                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-white/20 rounded-full px-5 py-2.5 hover:bg-white hover:text-brand-navy transition-colors font-bold text-white">
                                        <span>Open Case File</span>
                                        <ArrowUpRight size={14} />
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

const CapabilityList: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const capabilities = [
        { 
            id: '01', 
            title: 'Strategy', 
            desc: 'Positioning, Messaging, Brand Playbook, & Roadmaps', 
            link: '/clarity'
        },
        { 
            id: '02', 
            title: 'Identity', 
            desc: 'Visual Systems, Logos, Brand Guidelines, Colour, & Typography,', 
            link: '/design-power'
        },
        { 
            id: '03', 
            title: 'Digital', 
            desc: 'Web Design, Webflow Dev, Content Strategy, & Campaign Creative', 
            link: '/design-power'
        },
        { 
            id: '04', 
            title: 'Visuals', 
            desc: 'Motion Design, 3D Product Vis, GFX & Kinetic Type', 
            link: '/design-power'
        }
    ];

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section 
            className="bg-brand-navy text-white py-32 relative z-40 overflow-hidden border-b border-white/5" 
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
                <div className="mb-20 flex items-end justify-between border-b border-white/10 pb-6">
                     <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                        Output.
                     </h2>
                     <div className="font-mono text-[10px] uppercase tracking-widest text-right text-white/40 hidden sm:block">
                        MATRIX CAPABILITIES SYSTEM<br/>SELECT HOVER TO RUN PREVIEW
                     </div>
                </div>

                <div className="flex flex-col">
                    {capabilities.map((cap, index) => (
                        <Link 
                            key={index}
                            to={cap.link}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-white/5 py-10 md:py-12 flex flex-col md:flex-row justify-between md:items-center transition-colors hover:bg-white/[0.02]"
                        >
                            <div className="flex items-baseline gap-6 md:gap-12">
                                <span className="font-mono text-xs text-brand-purple group-hover:text-brand-yellow font-bold transition-colors">// {cap.id}</span>
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter group-hover:translate-x-3 transition-transform duration-300 ease-out text-white">
                                    {cap.title}
                                </h3>
                            </div>
                            <div className="mt-3 md:mt-0 pl-10 md:pl-0">
                                <span className="font-mono text-xs uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-opacity">
                                    {cap.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="mt-24 max-w-3xl border-t border-white/10 pt-8">
                    <p className="font-body text-base font-light text-white/60 leading-relaxed">
                        We build custom, scalable visual architectures utilizing specialized integrations via <a href="https://webflow.com" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">Webflow</a> and secure enterprise transaction logic from <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">Stripe</a>, optimizing deployment integrity.
                    </p>
                </div>
            </div>

            <motion.div
                className="pointer-events-none fixed top-0 left-0 w-[240px] h-[320px] z-50 hidden lg:block overflow-hidden bg-brand-purple border border-brand-yellow/30 shadow-[0_40px_8px_rgba(0,0,0,0.7)]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: 'radial-gradient(circle at center, #3A0888 0%, #050114 100%)'
                }}
                animate={{
                    opacity: hoveredIndex !== null ? 0.35 : 0,
                    scale: hoveredIndex !== null ? 1 : 0.6,
                    rotate: hoveredIndex !== null ? -6 : 0
                }}
                transition={{ duration: 0.25, ease: "linear" }}
            >
                <div className="absolute inset-0 studio-grid opacity-20" />
            </motion.div>
        </section>
    );
}

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-brand-navy px-6 md:px-12 py-32 relative z-40 border-b border-white/5 overflow-hidden">
             <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-24 gap-6">
                     <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                        Selected<br/>Works
                     </h2>
                     <Link to="/work" className="w-max font-mono text-xs uppercase tracking-widest font-black border border-white/10 bg-white/5 rounded-sm px-8 py-3.5 hover:bg-white hover:text-brand-navy transition-all text-white">
                        View Full Archive
                     </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-28">
                    {PROJECTS.slice(1, 8).map((project, index) => (
                        <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-24' : ''}`}>
                             <ProjectCard project={project} className="aspect-[4/3] w-full border border-white/5 rounded-sm shadow-xl" />
                             <div className="mt-6 flex justify-between items-start border-t border-white/5 pt-4">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-white">{project.title}</h3>
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-purple font-bold mt-2 block">// {project.category}</span>
                                </div>
                                <span className="font-mono text-[10px] uppercase font-bold text-white/30">{project.year}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const FAQSection: React.FC = () => {
    const faqs = QA_DATA[0].questions; 
    return (
        <section className="py-32 bg-brand-navy border-b border-white/5 relative z-40">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                <div className="inline-flex items-center gap-2 bg-brand-purple/20 border border-brand-purple/40 text-brand-lavender font-mono text-[9px] uppercase font-bold px-3 py-1 mb-4 rounded-full">
                    <Shield size={10} />
                    <span>SYSTEM VERIFICATION INDEX</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-16">Frequently Asked Questions</h2>
                <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-platform-dark/20 border border-white/5 rounded-sm p-6 backdrop-blur-md" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-3" itemProp="name">
                                {faq.q}
                            </h3>
                            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="font-body text-sm md:text-base text-white/60 leading-relaxed font-light" itemProp="text">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LatestIntel: React.FC = () => {
    return (
        <section className="py-32 relative z-40 bg-brand-navy overflow-hidden">
             <div className="container mx-auto px-8 max-w-7xl">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-16 gap-4">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">Studio Thoughts</h2>
                    <Link to="/journal" className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple hover:text-brand-yellow transition-colors">// View All Entries &rarr;</Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-white/5">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} className="group block border-r border-b border-t border-white/5 p-8 hover:bg-white/[0.01] transition-all duration-300 relative">
                             <div className="absolute top-0 left-0 w-[2px] h-0 bg-brand-purple group-hover:h-full transition-all duration-300" />
                             <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-4">{post.date}</span>
                             <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-6 text-white group-hover:text-brand-yellow transition-colors min-h-[2.5em]">{post.title}</h3>
                             <p className="font-body text-sm font-light text-white/50 leading-relaxed line-clamp-3">
                                 {post.excerpt}
                             </p>
                        </Link>
                    ))}
                 </div>
             </div>
        </section>
    )
}

const HomePage: React.FC = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "COOLO Co.",
    "url": "https://coolo.co.nz",
    "logo": "https://coolo.co.nz/assets/logos/logo-dark.svg",
    "description": "Boutique creative and brand studio focused on helping businesses communicate with clarity, confidence, coherence, and soul.",
    "sameAs": [
      "https://instagram.com/coolo.co",
      "https://linkedin.com/company/coolo"
    ]
  };

  return (
    <div className="bg-brand-navy">
      <Helmet>
        <title>COOLO | Shaping Brands With Character</title>
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>
      
      <BrandHero />
      <NarrativeScroll />
      <ServiceRouter />
      <FeatureSpotlight />
      <CapabilityList />
      <ShowcaseGrid />
      <FAQSection />
      <LatestIntel />
    </div>
  );
};

export default HomePage;