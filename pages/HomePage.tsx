import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS, QA_DATA } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import { ArrowUpRight, Layers, Terminal } from 'lucide-react';

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
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {trail.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.5, rotate: item.rotation }}
                        animate={{ opacity: 1, scale: item.scale, rotate: item.rotation }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute w-[140px] md:w-[260px] aspect-[4/5] shadow-2xl origin-center"
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
                            className="w-full h-full object-cover" 
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
            
            <motion.div 
                style={{ 
                    x: useTransform(springX, [-0.5, 0.5], [80, -80]), 
                    y: useTransform(springY, [-0.5, 0.5], [80, -80]) 
                }}
                className="absolute inset-0 z-10 pointer-events-none opacity-20"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-purple/5 blur-[120px] rounded-full" />
            </motion.div>

            <div className="container mx-auto px-6 md:px-8 relative z-30 flex-grow flex flex-col justify-center pointer-events-none">
                <div className="relative mb-16 md:mb-28">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        className="flex flex-col text-[14vw] md:text-[12.5vw] font-black uppercase leading-[0.85] tracking-tighter text-white break-words select-all pointer-events-auto"
                    >
                        <span>SHAPING BRANDS</span>
                        <span className="flex items-baseline mt-2 md:mt-4 ml-[12vw] md:ml-[24vw] relative">
                            <span className="pointer-events-auto">WITH CHARACTER</span>
                        </span>
                    </motion.h1>
                </div>

                <div className="mt-auto pointer-events-auto">
                    <div className="text-center mb-6">
                        <span className="font-mono text-[9px] uppercase tracking-[0.5em] opacity-40 font-bold text-white">
                            [ MOVE CURSOR TO REVEAL ]
                        </span>
                    </div>

                    <div className="w-full h-[1px] bg-white/10 mb-8 md:mb-10"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start text-white/80 font-mono">
                        <div className="bg-platform-dark/40 border border-white/5 p-6 rounded-sm backdrop-blur-md">
                            <span className="text-brand-yellow uppercase tracking-[0.2em] text-[10px] font-bold block mb-3 md:mb-4">Est. 2024</span>
                            <div className="text-[10px] uppercase tracking-widest leading-loose font-bold opacity-70">
                                MOUNT MAUNGANUI<br/>NEW ZEALAND
                            </div>
                        </div>

                        <div className="bg-platform-dark/40 border border-white/5 p-6 rounded-sm backdrop-blur-md md:text-center">
                             <span className="text-brand-purple uppercase tracking-[0.2em] text-[10px] font-bold block mb-3 md:mb-4">The Senior Unit</span>
                             <p className="text-[10px] uppercase tracking-widest font-bold leading-relaxed opacity-70 max-w-xs mx-auto">
                                A boutique creative and brand studio helping businesses transition from improvised to intentional.
                             </p>
                        </div>

                        <div className="bg-platform-dark/40 border border-white/5 p-6 rounded-sm backdrop-blur-md md:text-right">
                            <span className="text-brand-lavender uppercase tracking-[0.2em] text-[10px] font-bold block mb-3 md:mb-4">Status:</span>
                             <div className="flex items-center md:justify-end gap-3">
                                 <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse shadow-[0_0_8px_rgba(252,200,3,0.6)]"></span>
                                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Currently Booking Q2/Q3 Projects</span>
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
    const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -50]);
    const scale1 = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

    const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [50, 0, -50]);
    const scale2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0.95, 1, 0.95]);

    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [50, 0, -50]);
    const scale3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [0.95, 1, 0.95]);

    const opacity4 = useTransform(scrollYProgress, [0.68, 0.85, 1], [0, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.68, 0.85], [50, 0]);
    const scale4 = useTransform(scrollYProgress, [0.68, 0.85], [0.95, 1]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-brand-navy">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-8">
                
                <div className="absolute top-12 md:top-24 left-6 md:left-12 font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold z-20 flex items-center gap-2">
                    <Terminal size={12} className="text-brand-yellow" />
                    <span>01 // NARRATIVE LOG TRACK</span>
                </div>

                <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center h-full">
                    
                    <motion.div style={{ opacity: opacity1, y: y1, scale: scale1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <h2 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center">
                            <span>EVERY FOUNDER</span>
                            <span className="kinetic-text">HAS A VISION.</span>
                        </h2>
                    </motion.div>

                    <motion.div style={{ opacity: opacity2, y: y2, scale: scale2 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <h2 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center">
                            <span>NOT EVERY VISION</span>
                            <span className="kinetic-text">BECOMES A BRAND.</span>
                        </h2>
                    </motion.div>

                    <motion.div style={{ opacity: opacity3, y: y3, scale: scale3 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <h2 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center">
                            <span>THAT'S WHERE WE</span>
                            <span className="kinetic-text">COME IN.</span>
                        </h2>
                    </motion.div>

                    <motion.div style={{ opacity: opacity4, y: y4, scale: scale4 }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto mt-16 md:mt-0">
                        <h2 className="text-[10vw] md:text-[5rem] lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center">
                            <span>STRATEGY. DESIGN.</span>
                            <span className="text-brand-yellow">DIRECTION. CONTENT.</span>
                        </h2>
                        
                        <p className="mt-8 font-body text-xl md:text-2xl font-light text-white/70 max-w-4xl leading-relaxed mx-auto">
                            We work alongside founders to shape brands from the inside out—clarifying what they stand for, designing how they're seen, and crafting the creative that helps people understand, remember and choose them.
                        </p>
                        
                        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link to="/contact" className="inline-block border border-white bg-white text-brand-navy px-12 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-transparent hover:text-white transition-all duration-300">
                                Inquire Now
                            </Link>
                            <Link to="/about" className="inline-block border border-white/20 px-12 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all duration-300 text-white">
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
                            className="group relative flex flex-col justify-between min-h-[60vh] md:min-h-[70vh] border-b lg:border-b-0 lg:border-r border-white/5 p-8 md:p-12 overflow-hidden hover:bg-platform-dark/40 transition-colors duration-500 neon-glow-border"
                        >
                            <Link to={leg.path} className="absolute inset-0 z-0" aria-label={`View ${leg.title}`} />

                            <div className="relative z-10 pointer-events-none">
                                <div className="flex justify-between items-start mb-12">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">
                                        0{index + 1}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-50 group-hover:opacity-100 transition-opacity text-white">
                                        {leg.visual}
                                    </span>
                                </div>
                                
                                <div className="mb-8 relative">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors block mb-2">
                                        {prefix}
                                    </span>
                                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white break-words">
                                        {mainTitle}
                                        <span className="text-brand-purple group-hover:text-brand-yellow transition-colors">.</span>
                                    </h2>
                                </div>
                                
                                <p className="font-body text-xl md:text-2xl text-white/60 group-hover:text-white transition-colors max-w-sm leading-relaxed">
                                    {leg.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 pt-12 border-t border-white/5 mt-auto flex flex-col items-start gap-8">
                                <p className="font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 text-white pointer-events-none">
                                    {leg.hoverText}
                                </p>
                                
                                <Link to="/contact" className="pointer-events-auto bg-white text-brand-navy px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-white border border-white transition-all duration-300">
                                    Inquire Now
                                </Link>

                                <Link to={leg.path} className="pointer-events-auto inline-block font-mono text-sm uppercase font-bold tracking-widest border-b-2 border-brand-purple group-hover:border-brand-yellow pb-1 group-hover:text-brand-yellow transition-colors text-brand-purple mt-2">
                                    More Info
                                </Link>
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
        <section className="relative bg-brand-navy overflow-hidden group">
            <Link to={`/work/${featuredProject.slug}`} className="block relative min-h-screen md:min-h-[120vh]">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                    />
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
                            <span className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
                                Featured Case Study
                            </span>
                            <h2 className="text-[15vw] leading-[0.85] font-black uppercase tracking-tighter text-white mb-8 group-hover:text-brand-yellow transition-colors duration-500">
                                {featuredProject.title}
                            </h2>
                            
                            <div className="flex flex-col md:flex-row gap-12 border-t border-white/10 pt-8 text-white/80">
                                <div className="max-w-xl">
                                    <p className="font-body text-xl font-light opacity-80 line-clamp-3 md:line-clamp-4 leading-relaxed">
                                        {featuredProject.description}
                                    </p>
                                </div>
                                <div className="mt-auto ml-auto">
                                    <span className="font-mono text-sm uppercase tracking-widest border-b-2 border-brand-yellow pb-2 text-brand-yellow font-bold">
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
            <div className="container mx-auto px-8 relative z-10">
                <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                        Output.
                     </h2>
                     <div className="hidden md:block font-mono text-xs uppercase tracking-widest text-right opacity-80">
                        Select a capability<br/>to explore
                     </div>
                </div>

                <div className="flex flex-col">
                    {capabilities.map((cap, index) => (
                        <Link 
                            key={index}
                            to={cap.link}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-white/5 py-12 md:py-16 flex flex-col md:flex-row justify-between md:items-center transition-colors hover:bg-white/[0.01]"
                        >
                            <div className="flex items-baseline gap-8 md:gap-16">
                                <span className="font-mono text-sm md:text-base text-brand-purple group-hover:text-brand-yellow font-bold transition-colors">/{cap.id}</span>
                                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 ease-out text-white leading-[0.85]">
                                    {cap.title}
                                </h3>
                            </div>
                            <div className="mt-4 md:mt-0 pl-[calc(2rem+14px)] md:pl-0">
                                <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity text-white">
                                    {cap.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="mt-16 md:mt-24 max-w-2xl border-t border-white/10 pt-8">
                    <p className="font-body text-lg opacity-80">
                        We build custom visual systems using industry-standard platforms like <a href="https://webflow.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow transition-colors">Webflow</a> and <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow transition-colors">Stripe</a>, ensuring your brand performs securely and as well as it looks.
                    </p>
                </div>
            </div>

            <motion.div
                className="pointer-events-none fixed top-0 left-0 w-[300px] h-[400px] z-50 hidden md:block overflow-hidden bg-brand-yellow mix-blend-normal"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    opacity: hoveredIndex !== null ? 1 : 0,
                    scale: hoveredIndex !== null ? 1 : 0.5,
                    rotate: hoveredIndex !== null ? -5 : 0
                }}
                transition={{ duration: 0.2, ease: "linear" }}
            >                
            </motion.div>
        </section>
    );
}

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-brand-navy px-6 md:px-8 py-32 relative z-40 border-b border-white/5 overflow-hidden">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                        Selected<br/>Works
                     </h2>
                     <Link to="/work" className="font-mono text-sm uppercase tracking-widest font-bold border-2 border-white/10 px-8 py-3 hover:bg-white hover:text-brand-navy transition-all text-white">
                        View Full Archive
                     </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-24">
                    {PROJECTS.slice(1, 8).map((project, index) => (
                        <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-24' : ''}`}>
                             <ProjectCard project={project} className="aspect-[4/3] w-full" />
                             <div className="mt-6 flex justify-between items-start border-t border-white/5 pt-4">
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-white">{project.title}</h3>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold mt-2 block">{project.category}</span>
                                </div>
                                <span className="font-mono text-[10px] uppercase font-bold opacity-40 text-white">{project.year}</span>
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
        <section className="py-24 bg-brand-navy border-b border-white/5 relative z-40">
            <div className="container mx-auto px-6 md:px-8">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85] mb-16">Frequently Asked Questions</h2>
                <div className="max-w-4xl" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="mb-10 border-b border-white/5 pb-10" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4" itemProp="name">
                                {faq.q}
                            </h3>
                            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed" itemProp="text">
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
        <section className="py-24 relative z-40 bg-brand-navy overflow-hidden">
             <div className="container mx-auto px-8">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">Studio Thoughts</h2>
                    <Link to="/journal" className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple hover:text-white">View All Entries &rarr;</Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-white/5">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} className="group block border-r border-b border-t border-white/5 p-8 hover:bg-white/[0.01] transition-all duration-300 text-white">
                             <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-4 group-hover:text-brand-yellow text-white">{post.date}</span>
                             <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6 text-white group-hover:text-brand-yellow transition-colors min-h-[3em]">{post.title}</h3>
                             <p className="font-body text-xl font-light opacity-60 leading-relaxed line-clamp-3 group-hover:opacity-80 text-white">
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