import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS, QA_DATA } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';

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

    const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set((e.clientX / innerWidth) - 0.5);
        mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col pt-32 pb-16 bg-brand-offwhite text-brand-navy overflow-hidden border-b-2 border-brand-navy"
        >
            <ImageTrail containerRef={sectionRef} />

            <div className="absolute inset-0 studio-grid pointer-events-none opacity-[0.03] z-10"></div>
            
            <motion.div 
                style={{ 
                    x: useTransform(springX, [-0.5, 0.5], [100, -100]), 
                    y: useTransform(springY, [-0.5, 0.5], [100, -100]) 
                }}
                className="absolute inset-0 z-10 pointer-events-none opacity-20"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-purple/5 blur-[120px] rounded-full" />
            </motion.div>

            <div className="container mx-auto px-6 md:px-8 relative z-30 flex-grow flex flex-col justify-center pointer-events-none">
                <div className="relative mb-8 md:mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        className="flex flex-col text-[14vw] md:text-[12.5vw] font-black uppercase leading-[0.85] tracking-tighter text-brand-navy break-words select-all md:mix-blend-difference md:text-white lg:text-brand-navy lg:mix-blend-normal pointer-events-auto"
                    >
                        <span>SHAPING BRANDS</span>
                        <span className="flex items-baseline mt-2 md:mt-4 ml-[12vw] md:ml-[24vw] relative">
                            <span className="pointer-events-auto">WITH CHARACTER</span>
                        </span>
                    </motion.h1>
                </div>

                <div className="pointer-events-auto mb-16 max-w-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/contact" className="w-full sm:w-auto inline-block text-center border-2 border-brand-navy bg-brand-navy text-brand-offwhite px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-purple hover:border-brand-purple transition-all duration-300 shadow-[4px_4px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                            Book a Project &rarr;
                        </Link>
                        <Link to="/work" className="w-full sm:w-auto inline-block text-center border-2 border-brand-navy bg-transparent text-brand-navy px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300 shadow-[4px_4px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                            View Case Files
                        </Link>
                    </div>
                </div>

                <div className="mt-auto pointer-events-auto">
                    <div className="text-center mb-6">
                        <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-70 font-bold text-brand-navy">
                            [ MOVE CURSOR TO REVEAL IMAGES ]
                        </span>
                    </div>

                    <div className="w-full h-[1.5px] bg-brand-navy/80 mb-8 md:mb-10"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start text-brand-navy">
                        <div className="font-mono">
                            <span className="text-brand-purple uppercase tracking-[0.2em] text-xs font-bold block mb-2 md:mb-3">Est. 2024</span>
                            <div className="text-xs uppercase tracking-widest leading-loose font-bold opacity-85">
                                MOUNT MAUNGANUI<br/>NEW ZEALAND
                            </div>
                        </div>

                        <div className="md:text-center font-mono">
                             <span className="text-brand-purple uppercase tracking-[0.2em] text-xs font-bold block mb-2 md:mb-3">The Senior Unit</span>
                             <p className="text-xs uppercase tracking-widest font-bold leading-relaxed opacity-85 max-w-xs mx-auto">
                                A premium brand design studio specializing in independent creative strategy, custom digital platforms, and distinctive identities.
                             </p>
                        </div>

                        <div className="md:text-right font-mono">
                            <span className="text-brand-purple uppercase tracking-[0.2em] text-xs font-bold block mb-2 md:mb-3">Status:</span>
                             <div className="flex items-center md:justify-end gap-3">
                                 <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse shadow-[0_0_8px_rgba(252,200,3,0.6)]"></span>
                                 <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-85">Booking Q2/Q3 Projects</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StudioManifesto: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-brand-offwhite text-brand-navy py-32 flex flex-col items-center justify-center overflow-hidden border-b-2 border-brand-navy">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute w-[50vw] h-[50vw] -top-12 -left-12 rounded-full bg-brand-lavender/30 blur-[120px]" />
                <div className="absolute w-[45vw] h-[45vw] bottom-0 right-0 rounded-full bg-brand-yellow/10 blur-[100px]" />
            </div>

            <div className="absolute inset-0 studio-grid pointer-events-none opacity-[0.04] z-0"></div>

            <div className="w-full flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-16 max-w-6xl mx-auto px-6 relative z-10">
                <span>// PROFILE_01</span>
                <span>COOLO Co. MANIFESTO</span>
                <span>[ NZ_2026 ]</span>
            </div>

            <div className="container mx-auto max-w-5xl px-6 relative z-10 flex flex-col items-center justify-center flex-grow">
                <div className="w-full text-center mb-8">
                    <h3 className="font-mono text-xs md:text-sm text-brand-purple uppercase tracking-[0.4em] font-bold">
                        Who We Are:
                    </h3>
                </div>

                <div className="relative text-center max-w-4xl mx-auto py-12 px-4 border border-brand-navy/5 bg-white/20 backdrop-blur-sm shadow-sm">
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-brand-navy/30" />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-brand-navy/30" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-brand-navy/30" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-brand-navy/30" />

                    <h4 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.4rem] font-black uppercase tracking-tight leading-[1.05] text-brand-navy text-left sm:text-center relative">
                        We build 
                        <span className="relative inline-block mx-3 px-4 py-1 transform -rotate-1 bg-brand-yellow text-brand-navy font-sans shadow-sm rounded-sm">
                            brands
                            <span className="absolute -top-3 -right-2 text-brand-purple font-mono text-xs font-black select-none">✦</span>
                        </span> 
                        that feel 
                        <span className="block sm:inline text-brand-purple italic font-serif font-normal my-2 sm:my-0 sm:mx-3 tracking-normal">intentional.</span> 
                        From 
                        <span className="relative inline-block mx-2 font-mono font-black tracking-tighter border-b-4 border-brand-purple pb-1">
                            identity
                        </span> 
                        to 
                        <span className="font-serif italic font-normal text-brand-navy underline decoration-brand-yellow decoration-4 underline-offset-8">execution.</span>
                    </h4>

                    <div className="absolute -top-12 left-[10%] transform -rotate-6 hidden md:flex items-center gap-2 bg-brand-purple text-brand-yellow font-mono text-[10px] uppercase tracking-widest px-4 py-2 font-bold rounded-full shadow-md border border-brand-navy/20 z-20">
                        <span>Strategy First</span>
                        <span className="text-brand-yellow animate-pulse">⊙</span>
                    </div>

                    <div className="absolute top-[45%] -right-12 transform rotate-3 hidden md:flex items-center gap-2 bg-brand-navy text-brand-offwhite font-mono text-[10px] uppercase tracking-widest px-4 py-2 font-bold rounded-sm shadow-md border border-brand-offwhite/10 z-20">
                        <span>Design with soul</span>
                        <span className="text-brand-yellow">✦</span>
                    </div>

                    <div className="absolute -bottom-8 left-[30%] transform -rotate-2 hidden md:flex items-center gap-2 bg-brand-lavender text-brand-navy font-mono text-[10px] uppercase tracking-widest px-4 py-2 font-bold rounded-full shadow-md border border-brand-navy/10 z-20">
                        <span>Built for Impact</span>
                        <span className="text-brand-purple">⌖</span>
                    </div>
                </div>

                <div className="mt-16 w-full max-w-xl text-left sm:text-center">
                    <p className="font-body text-base md:text-lg opacity-85 text-brand-navy leading-relaxed">
                        COOLO operates at the cross-section of systematic layout and uncompromised art direction. We strip away standard startup templates to ensure your digital ecosystem behaves with authentic character.
                    </p>
                </div>
            </div>

            <div className="w-full flex justify-center gap-12 font-mono text-[10px] uppercase tracking-widest opacity-40 mt-auto pb-12 relative z-10">
                <span>[ STRATEGY SYSTEM ]</span>
                <span>[ CUSTOM UI ARCHITECTURE ]</span>
                <span>[ KINETIC DIRECTION ]</span>
            </div>
        </section>
    );
};

const NarrativeScroll: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

    // CSS mesh alignment interpolation following art parameters in image_c3bca2.jpg
    const auraX1 = useTransform(smoothProgress, [0, 1], ['15%', '65%']);
    const auraY1 = useTransform(smoothProgress, [0, 1], ['25%', '75%']);
    const auraX2 = useTransform(smoothProgress, [0, 1], ['85%', '25%']);
    const auraY2 = useTransform(smoothProgress, [0, 1], ['15%', '60%']);
    const auraScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.25, 0.85]);

    // Progressive timeline frames for discrete key phrase opacity shifts
    const word0Opacity = useTransform(smoothProgress, [0, 0.12, 0.16], [1, 1, 0]);
    const word0Y = useTransform(smoothProgress, [0, 0.16], [0, -25]);

    const word1Opacity = useTransform(smoothProgress, [0.14, 0.18, 0.30, 0.34], [0, 1, 1, 0]);
    const word1Y = useTransform(smoothProgress, [0.14, 0.18, 0.30, 0.34], [25, 0, 0, -25]);

    const word2Opacity = useTransform(smoothProgress, [0.32, 0.36, 0.48, 0.52], [0, 1, 1, 0]);
    const word2Y = useTransform(smoothProgress, [0.32, 0.36, 0.48, 0.52], [25, 0, 0, -25]);

    const word3Opacity = useTransform(smoothProgress, [0.50, 0.54, 0.66, 0.70], [0, 1, 1, 0]);
    const word3Y = useTransform(smoothProgress, [0.50, 0.54, 0.66, 0.70], [25, 0, 0, -25]);

    const word4Opacity = useTransform(smoothProgress, [0.68, 0.72, 0.82, 0.86], [0, 1, 1, 0]);
    const word4Y = useTransform(smoothProgress, [0.68, 0.72, 0.82, 0.86], [25, 0, 0, -25]);

    const finalCardOpacity = useTransform(smoothProgress, [0.84, 0.90], [0, 1]);
    const finalCardY = useTransform(smoothProgress, [0.84, 0.90], [40, 0]);
    
    const activeLoopOpacity = useTransform(smoothProgress, [0, 0.82, 0.85], [1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-brand-offwhite border-b-2 border-brand-navy">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                
                {/* image_c3bca2.jpg Editorial Mesh Background Mapping (Custom Studio Tones) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
                    <motion.div 
                        className="absolute w-[65vw] h-[65vw] rounded-full bg-brand-purple/20 blur-[130px]"
                        style={{ left: auraX1, top: auraY1 }}
                    />
                    <motion.div 
                        className="absolute w-[55vw] h-[55vw] rounded-full bg-brand-yellow/15 blur-[110px]"
                        style={{ right: auraX2, bottom: auraY2 }}
                    />
                    <motion.div 
                        className="absolute w-[75vw] h-[75vw] top-1/4 left-1/4 rounded-full bg-brand-lavender/40 blur-[150px]"
                        style={{ scale: auraScale }}
                    />
                </div>

                {/* image_c3bca2.jpg Modular Edge Metadata Framework */}
                <div className="absolute top-12 left-8 right-8 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-navy/60 z-20">
                    <span>02 / THE PROGRESSION</span>
                    <span>// SYSTEM LOG</span>
                    <span>10-07-2026</span>
                </div>

                <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full z-10 px-6">
                    
                    {/* Active Mutation Cycle */}
                    <motion.div style={{ opacity: activeLoopOpacity }} className="absolute flex flex-col items-center justify-center text-center w-full pointer-events-none">
                        <h2 className="text-[11vw] md:text-[7.5rem] lg:text-[8.5rem] font-black uppercase tracking-tighter leading-[0.85] text-brand-navy flex flex-col items-center">
                            <span className="font-sans">EVERY</span>
                            <span className="font-serif italic font-normal my-2 tracking-normal text-brand-purple">FOUNDER</span>
                        </h2>
                        
                        <div className="relative h-24 md:h-36 lg:h-44 w-full flex items-center justify-center mt-4">
                            <motion.span 
                                style={{ opacity: word0Opacity, y: word0Y, WebkitTextStroke: '2px #0F0328' }} 
                                className="absolute text-transparent font-mono font-black tracking-tight text-[10vw] md:text-[6.5rem] lg:text-[7.5rem]"
                            >
                                STARTS.
                            </motion.span>

                            <motion.span 
                                style={{ opacity: word1Opacity, y: word1Y, WebkitTextStroke: '2px #0F0328' }} 
                                className="absolute text-transparent font-mono font-black tracking-tight text-[10vw] md:text-[6.5rem] lg:text-[7.5rem]"
                            >
                                STRUGGLES.
                            </motion.span>

                            <motion.span 
                                style={{ opacity: word2Opacity, y: word2Y, WebkitTextStroke: '2px #0F0328' }} 
                                className="absolute text-transparent font-mono font-black tracking-tight text-[10vw] md:text-[6.5rem] lg:text-[7.5rem]"
                            >
                                DOUBTS.
                            </motion.span>

                            <motion.span 
                                style={{ opacity: word3Opacity, y: word3Y, WebkitTextStroke: '2px #0F0328' }} 
                                className="absolute text-transparent font-mono font-black tracking-tight text-[10vw] md:text-[6.5rem] lg:text-[7.5rem]"
                            >
                                LEARNS.
                            </motion.span>

                            <motion.span 
                                style={{ opacity: word4Opacity, y: word4Y, WebkitTextStroke: '2px #0F0328' }} 
                                className="absolute text-transparent font-mono font-black tracking-tight text-[10vw] md:text-[6.5rem] lg:text-[7.5rem]"
                            >
                                GROWS.
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Final Message Resolution Display */}
                    <motion.div 
                        style={{ opacity: finalCardOpacity, y: finalCardY }}
                        className="absolute flex flex-col items-center justify-center text-center max-w-4xl px-4 pointer-events-auto"
                    >
                        <h2 className="text-[9vw] md:text-[5.5rem] lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
                            <span className="block font-sans">EVERY FOUNDER</span>
                            <span className="block text-brand-purple italic font-serif font-normal my-4 tracking-normal">DESERVES A BRAND</span>
                            <span className="block font-sans">WITH CHARACTER.</span>
                        </h2>
                        
                        <p className="mt-8 font-body text-lg md:text-2xl font-light text-brand-navy/85 max-w-3xl leading-relaxed">
                            We partner with visionary builders to construct unified narratives—clarifying foundational direction, establishing elite design footprints, and producing cinematic contents that command space.
                        </p>
                        
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl mx-auto">
                            <Link to="/contact" className="w-full sm:w-auto inline-block border-2 border-brand-navy bg-brand-navy text-brand-offwhite px-12 py-5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-purple hover:border-brand-purple transition-all duration-300 shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none text-center">
                                Inquire Now
                            </Link>
                            <Link to="/about" className="w-full sm:w-auto inline-block border-2 border-brand-navy px-12 py-5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300 text-brand-navy shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none text-center">
                                More About Us
                            </Link>
                        </div>
                    </motion.div>

                </div>

                {/* image_c3bca2.jpg Bottom Caption Context Element */}
                <div className="absolute bottom-12 right-8 hidden md:block max-w-xs font-mono text-[10px] text-right text-brand-navy/60 uppercase tracking-widest leading-relaxed">
                    The trajectory is never linear.<br/>From improvised to intentional. ↘
                </div>
            </div>
        </section>
    );
};

const ServiceRouter: React.FC = () => {
    return (
        <section className="bg-brand-offwhite border-t-2 border-b-2 border-brand-navy relative z-40 overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-3">
                {SERVICE_LEGS.map((leg, index) => {
                    const titleParts = leg.title.match(/^(We help you)\s+(.*)$/i);
                    const prefix = titleParts ? titleParts[1] : 'We help you';
                    const mainTitle = titleParts ? titleParts[2] : leg.title;

                    return (
                        <div 
                            key={leg.id}
                            className="group relative flex flex-col justify-between min-h-[60vh] md:min-h-[70vh] border-b lg:border-b-0 lg:border-r border-brand-navy/10 p-8 md:p-12 overflow-hidden hover:bg-brand-lavender transition-colors duration-500"
                        >
                            <Link to={leg.path} className="absolute inset-0 z-0" aria-label={`View ${leg.title}`} />

                            <div className="relative z-10 pointer-events-none">
                                <div className="flex justify-between items-start mb-12">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">
                                        0{index + 1}
                                    </span>
                                    <span className="font-mono text-xs uppercase tracking-widest font-bold opacity-70 group-hover:opacity-100 text-brand-navy group-hover:text-brand-offwhite">
                                        {leg.visual}
                                    </span>
                                </div>
                                
                                <div className="mb-8 relative">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors block mb-2">
                                        {prefix}
                                        </span>
                                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-brand-navy group-hover:text-brand-offwhite transition-colors break-words">
                                        {mainTitle}
                                        <span className="text-brand-purple group-hover:text-brand-yellow transition-colors">.</span>
                                    </h2>
                                </div>
                                
                                <p className="font-body text-xl md:text-2xl text-brand-navy/80 group-hover:text-brand-offwhite/90 transition-colors max-w-sm leading-relaxed">
                                    {leg.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 pt-12 border-t border-brand-navy/10 group-hover:border-brand-offwhite/20 mt-auto flex flex-col items-start gap-8">
                                <p className="font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 text-brand-navy group-hover:text-brand-offwhite pointer-events-none">
                                    {leg.hoverText}
                                </p>
                                
                                <Link to="/contact" className="pointer-events-auto bg-brand-navy text-brand-offwhite px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-purple transition-all duration-300 shadow-[4px_4px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                                    Inquire Now
                                </Link>

                                <Link to={leg.path} className="pointer-events-auto inline-block font-mono text-xs uppercase font-bold tracking-widest border-b-2 border-brand-purple group-hover:border-brand-yellow pb-1 group-hover:text-brand-yellow transition-colors text-brand-purple mt-2">
                                    More Info
                                </Link>
                            </div>
                        </div>
                    );
                })}
             </div>
        </section>
    );
};

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
                            <h2 className="text-[15vw] leading-[0.85] font-black uppercase tracking-tighter text-brand-offwhite mb-8 group-hover:text-brand-yellow transition-colors duration-500">
                                {featuredProject.title}
                            </h2>
                            
                            <div className="flex flex-col md:flex-row gap-12 border-t border-brand-offwhite/20 pt-8 text-brand-offwhite/80">
                                <div className="max-w-xl">
                                    <p className="font-body text-xl font-light opacity-85 line-clamp-3 md:line-clamp-4 leading-relaxed">
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

{/* image_c3c11f.png HIGH IMPACT BRAND YELLOW DROP SYSTEM PROMOTION BLOCK */}
const ArtistProductDrop: React.FC = () => {
    return (
        <section className="relative w-full bg-brand-yellow text-brand-navy py-24 overflow-hidden border-b-2 border-brand-navy z-40">
            {/* Continuous Marquee Ticker Loop Inspired by Premium Merch Drops */}
            <div className="absolute top-0 left-0 w-full bg-brand-navy py-3 overflow-hidden select-none flex whitespace-nowrap z-10 shadow-sm">
                <div className="animate-marquee flex gap-16 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand-yellow">
                    <span>• SUPPORT AN ARTIST SERIES DROP</span>
                    <span>• LIMITED NUMERICAL EDITIONS</span>
                    <span>• CUSTOM UTILITY DROP 2026</span>
                    <span>• COOLO EXCLUSIVE RUN</span>
                    <span>• SUPPORT AN ARTIST SERIES DROP</span>
                    <span>• LIMITED NUMERICAL EDITIONS</span>
                    <span>• CUSTOM UTILITY DROP 2026</span>
                    <span>• COOLO EXCLUSIVE RUN</span>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-8 pt-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Primary Large Statement Block mimicking image_c3c11f.png high-density font presentation */}
                    <div className="lg:col-span-8">
                        <span className="block font-mono text-xs uppercase tracking-[0.4em] font-bold text-brand-purple mb-4">
                            [ COLLECTION AVAILABILITY: LIMITED ]
                        </span>
                        <h2 className="text-[9vw] sm:text-[6.5vw] lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.85] text-brand-navy">
                            ALL OF THE SOUL.<br />
                            NONE OF THE INDUSTRIAL<br />
                            <span className="bg-brand-navy text-brand-yellow px-4 inline-block mt-2 transform -rotate-1 rounded-sm shadow-sm">FLUFF.</span>
                        </h2>
                    </div>

                    {/* Industrial Information Card Layout */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full bg-brand-offwhite/40 p-8 border border-brand-navy/10 relative backdrop-blur-sm shadow-sm">
                        <div className="absolute top-0 right-0 bg-brand-navy text-brand-yellow px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">
                            DROP_04
                        </div>
                        
                        <div className="mb-8">
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60 font-bold block mb-1">Project Objective</span>
                            <h4 className="font-sans text-xl font-black uppercase tracking-tight text-brand-navy mb-4">
                                Independent Creations
                            </h4>
                            <p className="font-body text-sm leading-relaxed text-brand-navy/90 font-medium">
                                We design bespoke apparel, curated prints, and technical hardware objects in union with contemporary artists. Every single object helps finance real independent craftsmanship.
                            </p>
                        </div>

                        <div className="border-t border-brand-navy/10 pt-6 mt-auto">
                            <Link 
                                to="/support-an-artist" 
                                className="w-full inline-block text-center bg-brand-navy text-brand-yellow border-2 border-brand-navy px-6 py-4 font-mono text-xs uppercase tracking-widest font-black hover:bg-brand-purple hover:text-brand-yellow hover:border-brand-purple transition-all duration-300 shadow-[4px_4px_0px_#0F0328]"
                            >
                                Secure The Archive &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Lower System Data Runway Array */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-brand-navy/10 mt-16 pt-8 font-mono text-[10px] font-bold text-brand-navy/70 uppercase tracking-widest">
                    <div>
                        <span className="text-brand-purple block mb-1">[ 01 ] TYPE:</span>
                        <span>Silkscreen & Garments</span>
                    </div>
                    <div>
                        <span className="text-brand-purple block mb-1">[ 02 ] VOLUME:</span>
                        <span>100 Units Worldwide</span>
                    </div>
                    <div>
                        <span className="text-brand-purple block mb-1">[ 03 ] GATEWAY:</span>
                        <span>Stripe Production Encrypted</span>
                    </div>
                    <div>
                        <span className="text-brand-purple block mb-1">[ 04 ] REVENUE:</span>
                        <span>60% Directly To Creative Creator</span>
                    </div>
                </div>
            </div>
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
            className="bg-brand-navy text-brand-offwhite py-32 relative z-40 overflow-hidden border-b-2 border-brand-navy" 
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-8 relative z-10">
                <div className="mb-24 flex items-end justify-between border-b border-brand-offwhite/20 pb-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-offwhite leading-[0.85]">
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
                            className="group relative border-b border-brand-offwhite/20 py-12 md:py-16 flex flex-col md:flex-row justify-between md:items-center transition-colors hover:bg-brand-offwhite/5"
                        >
                            <div className="flex items-baseline gap-8 md:gap-16">
                                <span className="font-mono text-xs md:text-sm text-brand-purple group-hover:text-brand-yellow font-bold transition-colors">/{cap.id}</span>
                                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 ease-out text-brand-offwhite leading-[0.85]">
                                    {cap.title}
                                </h3>
                            </div>
                            <div className="mt-4 md:mt-0 pl-[calc(2rem+14px)] md:pl-0">
                                <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-85 group-hover:opacity-100 transition-opacity text-brand-offwhite">
                                    {cap.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="mt-16 md:mt-24 max-w-2xl border-t border-brand-offwhite/20 pt-8">
                    <p className="font-body text-lg opacity-90 leading-relaxed">
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
};

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-brand-offwhite px-6 md:px-8 py-32 relative z-40 border-b-2 border-brand-navy overflow-hidden">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85]">
                        Selected<br/>Works
                     </h2>
                     <Link to="/work" className="font-mono text-xs uppercase tracking-widest font-bold border-2 border-brand-navy px-8 py-3 hover:bg-brand-navy hover:text-brand-offwhite transition-all text-brand-navy">
                        View Full Archive
                     </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-24">
                    {PROJECTS.slice(1, 8).map((project, index) => (
                        <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-24' : ''}`}>
                             <ProjectCard project={project} className="aspect-[4/3] w-full" />
                             <div className="mt-6 flex justify-between items-start border-t border-brand-navy/10 pt-4">
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-brand-navy">{project.title}</h3>
                                    <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold mt-2 block">{project.category}</span>
                                </div>
                                <span className="font-mono text-xs uppercase font-bold opacity-70 text-brand-navy">{project.year}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQSection: React.FC = () => {
    const faqs = QA_DATA[0].questions; 
    return (
        <section className="py-24 bg-white border-b-2 border-brand-navy relative z-40">
            <div className="container mx-auto px-6 md:px-8">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85] mb-16">Frequently Asked Questions</h2>
                <div className="max-w-4xl" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="mb-10 border-b border-brand-navy/10 pb-10" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-brand-navy mb-4" itemProp="name">
                                {faq.q}
                            </h3>
                            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="font-body text-lg md:text-xl text-brand-navy/95 leading-relaxed" itemProp="text">
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
        <section className="py-24 relative z-40 bg-brand-offwhite overflow-hidden">
             <div className="container mx-auto px-8">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85]">Studio Thoughts</h2>
                    <Link to="/journal" data-cursor-text="INTEL" className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple hover:text-brand-navy">View All Entries &rarr;</Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-brand-navy/10">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} data-cursor-text="READ" className="group block border-r border-b border-t border-brand-navy/10 p-8 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300">
                             <span className="font-mono text-xs uppercase tracking-widest opacity-75 block mb-4 group-hover:text-brand-yellow text-brand-navy group-hover:text-brand-offwhite">{post.date}</span>
                             <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6 text-brand-navy group-hover:text-brand-offwhite min-h-[3em]">{post.title}</h3>
                             <p className="font-body text-xl font-light opacity-85 leading-relaxed line-clamp-3 group-hover:opacity-100 text-brand-navy group-hover:text-brand-offwhite">
                                 {post.excerpt}
                             </p>
                        </Link>
                    ))}
                 </div>
             </div>
        </section>
    );
};

const HomePage: React.FC = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "COOLO Co.",
    "url": "https://coolo.co.nz",
    "logo": "hey-coolo/coolo/public/assets/logos/logo-dark.svg",
    "description": "Boutique creative and brand studio focused on helping businesses communicate with clarity, confidence, coherence, and soul.",
    "sameAs": [
      "https://instagram.com/coolo.co",
      "https://linkedin.com/company/coolo"
    ]
  };

  return (
    <div className="bg-brand-offwhite">
      <Helmet>
        <title>COOLO | Shaping Brands With Character</title>
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>
      
      <BrandHero />
      <StudioManifesto />
      <NarrativeScroll />
      <ServiceRouter />
      <FeatureSpotlight />
      <ArtistProductDrop />
      <CapabilityList />
      <ShowcaseGrid />
      <FAQSection />
      <LatestIntel />
    </div>
  );
};

export default HomePage;