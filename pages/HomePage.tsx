// pages/HomePage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, QA_DATA } from '../constants';
import ProjectCard from '../components/ProjectCard';
import { ArrowDown, ArrowRight } from 'lucide-react';

// Premium Custom Easings
const easeOutExpo = [0.16, 1, 0.3, 1]; // Snappy deceleration
const easeInOutExpo = [0.76, 0, 0.24, 1]; // Heavy, architectural glide

// Architectural Detail Component
const Crosshair: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`absolute w-3 h-3 flex items-center justify-center opacity-30 pointer-events-none ${className}`}>
        <div className="absolute w-full h-[1px] bg-[#0A0A0A]"></div>
        <div className="absolute w-[1px] h-full bg-[#0A0A0A]"></div>
    </div>
);

const InitialLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div 
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: easeInOutExpo, delay: 1.5 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] text-[#F8F8F9] flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="overflow-hidden">
                <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: easeOutExpo }}
                    className="block font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
                >
                    SYSTEM BOOTING
                </motion.span>
            </div>
            <div className="overflow-hidden mt-4">
                <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
                    className="block font-display text-[8vw] md:text-[4vw] font-black uppercase tracking-tighter leading-none"
                >
                    HUMANS IN THE MACHINE.
                </motion.span>
            </div>
        </motion.div>
    );
};

const BrandHero: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => {
    const [isStudioHovered, setIsStudioHovered] = useState(false);

    const containerVariants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: "120%" },
        show: { y: "0%", transition: { duration: 1.2, ease: easeOutExpo } }
    };

    return (
        <section className="relative min-h-[100svh] pt-32 pb-12 bg-[#F8F8F9] text-[#0A0A0A] flex flex-col justify-between selection:bg-[#8B84D7] selection:text-white border-b border-[#0A0A0A]/10">
            {/* Architectural Grid & Crosshairs */}
            <Crosshair className="bottom-0 left-6 md:left-12 translate-y-1/2 -translate-x-1/2 z-20" />
            <Crosshair className="bottom-0 right-6 md:right-12 translate-y-1/2 translate-x-1/2 z-20" />

            {/* Top Metadata */}
            <div className="px-6 md:px-12 flex justify-between items-start font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold pointer-events-none relative z-10">
                <div className="overflow-hidden">
                    <motion.span 
                        initial={{ y: "100%" }} animate={isLoaded ? { y: "0%" } : { y: "100%" }} transition={{ duration: 1, ease: easeOutExpo, delay: 0.5 }}
                        className="block leading-[2] opacity-60"
                    >
                        © 2026 COOLO.<br/>HUMANS IN THE MACHINE.
                    </motion.span>
                </div>
                <div className="hidden md:block overflow-hidden">
                    <motion.span 
                        initial={{ y: "100%" }} animate={isLoaded ? { y: "0%" } : { y: "100%" }} transition={{ duration: 1, ease: easeOutExpo, delay: 0.6 }}
                        className="block opacity-60"
                    >
                        STATUS: <span className="text-[#8B84D7] opacity-100">BOOKINGS OPEN</span>
                    </motion.span>
                </div>
            </div>

            {/* Core Typography Statement */}
            <div className="px-6 md:px-12 flex-grow flex flex-col justify-center w-full mt-24 md:mt-16">
                <motion.h1 
                    variants={containerVariants}
                    initial="hidden"
                    animate={isLoaded ? "show" : "hidden"}
                    className="font-display text-[14vw] lg:text-[11.5vw] font-black uppercase leading-[0.8] tracking-tighter w-full text-left flex flex-col items-start"
                >
                    <div className="overflow-hidden py-2 -my-2"><motion.span variants={itemVariants} className="block">YOUR BUSINESS IS</motion.span></div>
                    <div className="overflow-hidden py-2 -my-2 w-full"><motion.span variants={itemVariants} className="block md:indent-[10vw]">BETTER THAN IT</motion.span></div>
                    <div className="overflow-hidden py-2 -my-2"><motion.span variants={itemVariants} className="block text-[#8B84D7]">CURRENTLY LOOKS.</motion.span></div>
                    <div className="overflow-hidden py-2 -my-2 w-full"><motion.span variants={itemVariants} className="block md:indent-[20vw] mt-4 md:mt-0">AND YOU JUST</motion.span></div>
                    <div className="overflow-hidden py-2 -my-2">
                        <motion.span variants={itemVariants} className="block relative z-20">
                            FOUND <span className="text-[#8B84D7]">THE </span>
                            <div 
                                className="relative inline-block"
                                onMouseEnter={() => setIsStudioHovered(true)}
                                onMouseLeave={() => setIsStudioHovered(false)}
                            >
                                <a 
                                    href="https://instagram.com/coolo.co"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#8B84D7] relative z-10 transition-colors duration-300 hover:text-[#0A0A0A]"
                                >
                                    STUDIO
                                    <span className="absolute left-0 bottom-[15%] w-full h-[2px] md:h-[4px] bg-current transform origin-left transition-transform duration-500 ease-out scale-x-100"></span>
                                </a>
                                
                                {/* Hover Badge */}
                                <AnimatePresence>
                                    {isStudioHovered && (
                                        <motion.a 
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            transition={{ duration: 0.3, ease: easeOutExpo }}
                                            href="https://instagram.com/coolo.co" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="absolute left-1/2 -translate-x-1/2 top-full mt-4 text-[#8B84D7] hover:text-[#0A0A0A] transition-colors font-mono text-[9px] font-bold tracking-widest uppercase whitespace-nowrap z-0"
                                        >
                                            [@] FOLLOW US
                                        </motion.a>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.span>
                    </div>
                    <div className="overflow-hidden py-2 -my-2 w-full"><motion.span variants={itemVariants} className="block md:indent-[5vw]">TO FIX THAT.</motion.span></div>
                </motion.h1>
            </div>

            {/* Bottom Grid Row */}
            <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 items-end gap-12 md:gap-0 pb-4 relative z-10 mt-16 md:mt-0 border-t border-[#0A0A0A]/10 pt-4">
                <Crosshair className="top-0 left-1/4 -translate-y-1/2 -translate-x-1/2 hidden md:block" />
                
                <div className="md:col-span-1 hidden md:block overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }} animate={isLoaded ? { y: "0%" } : { y: "100%" }} transition={{ duration: 1, ease: easeOutExpo, delay: 0.8 }}
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-8 h-8 rounded-full border border-[#0A0A0A] flex items-center justify-center opacity-40"
                        >
                            <ArrowDown size={14} />
                        </motion.div>
                    </motion.div>
                </div>
                <div className="md:col-span-3 flex md:justify-end md:border-l border-[#0A0A0A]/10 md:pl-12 overflow-hidden">
                    <motion.p 
                        initial={{ y: "100%" }} animate={isLoaded ? { y: "0%" } : { y: "100%" }} transition={{ duration: 1, ease: easeOutExpo, delay: 0.7 }}
                        className="max-w-[320px] font-mono text-[10px] uppercase tracking-widest font-bold opacity-70 leading-[2] md:text-right"
                    >
                        GOOD BUSINESSES FREQUENTLY LOOK AND SOUND WORSE THAN THE ACTUAL VALUE THEY CREATE.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

const RealityCheck: React.FC = () => {
    return (
        <section className="py-32 md:py-48 bg-white text-[#0A0A0A] px-6 md:px-12 border-b border-[#0A0A0A]/10 selection:bg-[#8B84D7] selection:text-white relative">
            {/* Background Grid Lines for Architectural Feel */}
            <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
                <div className="w-full max-w-[1440px] h-full grid grid-cols-4 md:grid-cols-12 gap-6 opacity-[0.03]">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full border-r border-[#0A0A0A] hidden md:block"></div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 relative z-10">
                <div className="lg:col-span-4 lg:border-r border-[#0A0A0A]/10 lg:pr-12">
                    <div className="sticky top-32 overflow-hidden">
                        <motion.span 
                            initial={{ y: "100%" }}
                            whileInView={{ y: "0%" }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: easeOutExpo }}
                            className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 block"
                        >
                            01 / THE CENTRAL THESIS
                        </motion.span>
                    </div>
                </div>
                <div className="lg:col-span-8 lg:pl-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: easeOutExpo }}
                        className="font-display text-[9vw] lg:text-[6.5vw] uppercase tracking-tighter leading-[0.85] font-black"
                    >
                        IF A BRAND STRATEGY CANNOT BE EXPLAINED IN THE EVERYDAY LANGUAGE OF A BUSINESS OWNER, IT ISN'T A STRATEGY. IT IS AN INVOICE.
                    </motion.h2>
                    <div className="overflow-hidden mt-16 md:mt-24 pt-8 border-t border-[#0A0A0A]/10">
                        <motion.p 
                            initial={{ y: "100%" }}
                            whileInView={{ y: "0%" }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, ease: easeOutExpo, delay: 0.2 }}
                            className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#8B84D7] max-w-sm leading-[2]"
                        >
                            REAL CREATIVE DIRECTION SOLVES PHYSICAL AND DIGITAL PROBLEMS. IT DOESN'T JUST SOUND SMART IN A KEYNOTE.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StepContent = ({ step, setActiveStep }: { step: any, setActiveStep: (id: number) => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 75%", "end 25%"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.1, 1, 1, 0.1]);
    const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);

    useEffect(() => {
        if (isInView) {
            setActiveStep(step.id);
        }
    }, [isInView, step.id, setActiveStep]);

    return (
        <motion.div 
            ref={ref} 
            style={{ opacity, y }}
            className="min-h-[80vh] lg:min-h-screen flex flex-col justify-center py-20 lg:py-24"
        >
            <h3 className="font-display text-[12vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] mb-16">
                {step.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono border-t border-white/10 pt-12 relative">
                <Crosshair className="-top-1.5 left-1/2 -translate-x-1/2 hidden md:block bg-white" />
                <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest leading-[2] text-[#8B84D7] mb-4">
                        {step.sub1}
                    </h4>
                    <p className="text-[10px] uppercase font-bold tracking-widest leading-[2] text-white/90">
                        {step.sub2}
                    </p>
                </div>
                <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 leading-[2]">
                        {step.p}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const ProcessSteps: React.FC = () => {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        {
            id: 1,
            title: "PULLING THE IDEAS OUT OF YOUR HEAD.",
            sub1: "STRIPPING THE JARGON.",
            sub2: "WE FIND THE BARE BONES OF YOUR BRAND.",
            p: "BUSINESS OWNERS FEEL A QUIET RESENTMENT. THEY PAY PREMIUM RETAINERS FOR 'STRATEGY' AND RECEIVE A PDF OF BUZZWORDS THAT FIXES NOTHING. WE DON'T DO THAT. WE SIT IN THE MESS WITH YOU, ASK THE HARD QUESTIONS, AND DRAG YOUR REAL VALUE OUT OF YOUR HEAD. NO BLOATED INTELLECTUAL FRAMEWORKS. JUST HONEST CLARITY."
        },
        {
            id: 2,
            title: "SOLVING PHYSICAL AND DIGITAL PROBLEMS.",
            sub1: "THE BRAND OPERATING SYSTEM.",
            sub2: "ASSETS THAT ACTUALLY TRANSLATE INTO THE REAL WORLD.",
            p: "COMPLEX AGENCY LANGUAGE IS A SHIELD FOR GENERIC WORK. ONCE WE HAVE CLARITY, WE DESIGN THE ACTUAL SYSTEM: YOUR BRAND IDENTITY, VISUAL LANGUAGE, CUSTOM WEBSITE, AND SALES ASSETS. SO YOU AREN'T LEFT WITH THE SAME FUNCTIONAL DESIGN PROBLEMS YOU HAD BEFORE YOU SPENT THE MONEY."
        },
        {
            id: 3,
            title: "PROTECTING THE WORK FROM THE GENERIC.",
            sub1: "THE FIREWALL.",
            sub2: "COMPLEXITY IS USUALLY HIDING A LACK OF TASTE.",
            p: "YOU NEED TO STAY FOCUSED ON RUNNING YOUR BUSINESS. WE ACT AS YOUR CREATIVE DIRECTION PARTNER AND FIREWALL, MANAGING THE EXECUTION AND KEEPING EVERYTHING CONSISTENT. WE ENSURE THE MOST VALUABLE CREATIVE SOLUTIONS REMAIN THE ONES THAT FEEL OBVIOUS ONCE YOU SEE THEM."
        }
    ];

    return (
        <section className="bg-[#0A0A0A] text-white relative selection:bg-[#8B84D7] selection:text-white pb-24 lg:pb-0 border-b border-white/10">
            <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 relative items-start">
                
                {/* Sticky Left Column: Animated Numbers & Progress */}
                <div className="lg:col-span-4 sticky top-[10vh] lg:top-0 h-[15vh] lg:h-screen flex flex-col justify-end lg:justify-center z-20 bg-[#0A0A0A]/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-white/5 lg:border-none lg:border-r lg:border-white/10 lg:pr-12">
                    <div className="flex flex-col items-start relative w-full">
                        {/* Progress Line */}
                        <div className="absolute left-0 top-0 h-full w-[1px] bg-white/10 hidden lg:block">
                            <motion.div 
                                className="w-full bg-[#8B84D7]"
                                animate={{ height: `${(activeStep / steps.length) * 100}%` }}
                                transition={{ duration: 0.6, ease: easeOutExpo }}
                            />
                        </div>

                        <div className="flex lg:pl-8 items-baseline gap-6 md:gap-8 font-display font-black uppercase tracking-tighter leading-none select-none py-4 overflow-hidden">
                            {[1, 2, 3].map((num) => (
                                <motion.span 
                                    key={num}
                                    layout
                                    animate={{ 
                                        fontSize: activeStep === num ? 'clamp(6rem, 18vw, 15rem)' : 'clamp(2rem, 5vw, 4rem)',
                                        opacity: activeStep === num ? 1 : 0.2,
                                        y: activeStep === num ? 0 : 10
                                    }}
                                    transition={{ duration: 0.8, ease: easeOutExpo }}
                                    className="origin-bottom text-white inline-block"
                                >
                                    {num}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scrollable Right Column: Content */}
                <div className="lg:col-span-8 flex flex-col relative z-10 lg:pl-12">
                    {steps.map((step) => (
                        <StepContent key={step.id} step={step} setActiveStep={setActiveStep} />
                    ))}
                </div>

            </div>
        </section>
    );
};

const ShowcaseIntro: React.FC = () => {
    return (
        <section className="bg-white text-[#0A0A0A] pt-32 pb-16 px-6 md:px-12 selection:bg-[#8B84D7] selection:text-white">
            <div className="flex flex-col items-start">
                <div className="overflow-hidden mb-12">
                    <motion.span 
                        initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, ease: easeOutExpo }}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 block"
                    >
                        02 / SELECTED WORK
                    </motion.span>
                </div>
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1, ease: easeOutExpo }}
                    className="font-display text-[15vw] md:text-[13vw] font-black uppercase tracking-tighter leading-[0.8]"
                >
                    WHAT IT ACTUALLY<br />LOOKS LIKE.
                </motion.h2>
            </div>
        </section>
    );
};

const FeatureSpotlight: React.FC = () => {
    const featuredProject = PROJECTS[0]; 
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Parallax & Curtain logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const yTransform = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <section className="bg-white px-6 md:px-12 pb-24 selection:bg-[#8B84D7] selection:text-white">
            <Link to={`/work/${featuredProject.slug}`} className="block group">
                <div 
                    ref={containerRef}
                    className="relative w-full h-[60vh] md:h-[100vh] overflow-hidden bg-[#F8F8F9] border border-[#0A0A0A]/10"
                >
                    {/* Curtain Reveal */}
                    <motion.div 
                        initial={{ height: "100%" }}
                        whileInView={{ height: "0%" }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.4, ease: easeInOutExpo }}
                        className="absolute inset-0 bg-[#0A0A0A] z-20 origin-top"
                    />

                    <motion.img 
                        style={{ y: yTransform }}
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1.1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.8, ease: easeOutExpo }}
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-[0.19,1,0.22,1] group-hover:scale-[1.15]"
                    />
                    <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A] bg-white px-4 py-2 font-bold shadow-sm z-30 overflow-hidden">
                        <motion.div initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }} viewport={{ once: true }}>
                            FEATURED — 001
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-start pt-8 border-t border-[#0A0A0A]/10 relative">
                    <Crosshair className="-top-1.5 left-1/4 -translate-x-1/2 hidden md:block bg-white" />
                    <div className="md:col-span-8">
                        <h2 className="font-display text-[12vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:text-[#8B84D7] transition-colors duration-500">
                            {featuredProject.title}
                        </h2>
                    </div>
                    <div className="md:col-span-4 flex flex-col md:text-right font-mono text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] leading-[2]">
                        <span className="text-[#8B84D7] mb-2">{featuredProject.category}</span>
                        <span className="opacity-70">BRAND VOICE, LOGOTYPE & MARK SYSTEM, ART DIRECTION, CONTENT CREATION.</span>
                    </div>
                </div>
            </Link>
        </section>
    );
};

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-[#F8F8F9] px-6 md:px-12 py-32 border-t border-[#0A0A0A]/10 selection:bg-[#8B84D7] selection:text-white relative">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12 lg:gap-x-24 relative z-10">
                {PROJECTS.slice(1, 5).map((project, index) => (
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        key={project.id} 
                        className={`md:col-span-6 ${index % 2 === 1 ? 'md:mt-48' : ''} group`}
                    >
                         <div className="overflow-hidden border border-[#0A0A0A]/10 relative bg-[#0A0A0A]">
                             {/* Grid Image Curtain */}
                             <motion.div 
                                 variants={{
                                     hidden: { height: "100%" },
                                     show: { height: "0%", transition: { duration: 1.2, ease: easeInOutExpo } }
                                 }}
                                 className="absolute inset-0 bg-[#0A0A0A] z-20 origin-top"
                             />
                             <motion.div 
                                 variants={{
                                     hidden: { scale: 1.2 },
                                     show: { scale: 1, transition: { duration: 1.6, ease: easeOutExpo } }
                                 }}
                                 className="transition-transform duration-[1.5s] ease-[0.19,1,0.22,1] group-hover:scale-105"
                             >
                                 <ProjectCard project={project} className="aspect-[4/5] w-full" />
                             </motion.div>
                         </div>
                         <div className="mt-6 flex flex-col items-start pt-6 border-t border-[#0A0A0A]/10 relative">
                            <Crosshair className="-top-1.5 right-0 bg-[#F8F8F9]" />
                            <h3 className="font-display text-[8vw] md:text-[4vw] font-black uppercase tracking-tighter leading-none text-[#0A0A0A] group-hover:text-[#8B84D7] transition-colors duration-500">
                                {project.title}
                            </h3>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/60 font-bold mt-3 block">
                                {project.category}
                            </span>
                         </div>
                    </motion.div>
                ))}
             </div>
            
             <div className="mt-32 md:mt-48 border-t border-[#0A0A0A] pt-8 flex justify-between items-center relative z-10">
                 <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">THE ARCHIVE</span>
                 <Link to="/work" className="group font-mono text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#8B84D7] transition-colors duration-300 flex items-center gap-4">
                     SEE ALL WORK 
                     <motion.span 
                         className="inline-block"
                         whileHover={{ x: 5 }}
                         transition={{ duration: 0.3, ease: easeOutExpo }}
                     >
                         <ArrowRight size={14} className="stroke-[3]" />
                     </motion.span>
                 </Link>
             </div>
        </section>
    )
}

const FAQSection: React.FC = () => {
    const faqs = QA_DATA[0].questions; 
    return (
        <section className="py-32 md:py-48 bg-white border-t border-[#0A0A0A]/10 selection:bg-[#8B84D7] selection:text-white">
            <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                <div className="lg:col-span-4 lg:border-r border-[#0A0A0A]/10 lg:pr-12 relative">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 block mb-12 lg:mb-0">
                        03 / INFORMATION
                    </span>
                    <h2 className="font-display text-[12vw] lg:text-[7vw] font-black uppercase tracking-tighter text-[#0A0A0A] leading-[0.85] lg:sticky lg:top-32 mt-8 lg:mt-32">
                        THE HARD<br/>QUESTIONS.
                    </h2>
                </div>
                <div className="lg:col-span-8 flex flex-col" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="py-12 px-0 lg:px-12 border-b border-[#0A0A0A]/10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 group hover:bg-[#F8F8F9] transition-colors duration-500 relative" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <Crosshair className="-bottom-1.5 left-0 hidden lg:block bg-white" />
                            <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-widest text-[#8B84D7] font-black transition-transform duration-500 group-hover:translate-x-2" itemProp="name">
                                {faq.q}
                            </div>
                            <div className="md:col-span-8 font-mono text-[10px] md:text-[11px] text-[#0A0A0A] leading-[2] font-bold uppercase tracking-widest opacity-80" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <span itemProp="text">{faq.a}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BriefUsCTA: React.FC = () => {
    return (
        <section className="bg-[#FFD100] text-[#0A0A0A] py-32 md:py-48 px-6 md:px-12 selection:bg-[#0A0A0A] selection:text-[#FFD100] border-t border-[#0A0A0A]/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-end relative z-10">
                <div className="lg:col-span-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: easeOutExpo }}
                        className="font-display text-[15vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.8]"
                    >
                        <span className="block">THINK WE SHOULD</span>
                        <span className="block lg:indent-[10vw]">LOOK AT YOUR</span>
                        <span className="block">BUSINESS?</span>
                    </motion.h2>
                </div>

                <div className="lg:col-span-4 flex flex-col items-start lg:items-end font-mono text-[10px] uppercase tracking-widest font-bold leading-[2] space-y-12">
                    <p className="max-w-[320px] lg:text-right opacity-80 pt-8 border-t border-[#0A0A0A]/20 relative">
                        <Crosshair className="-top-1.5 right-0 bg-[#FFD100]" />
                        TELL US WHAT YOU'RE BUILDING AND WHERE IT FEELS DISCONNECTED. IF IT'S A PROBLEM WE CAN FIX, WE'LL TELL YOU. IF IT'S NOT, WE WON'T WASTE YOUR TIME WITH A PDF OF BUZZWORDS. WE'LL POINT YOU IN THE RIGHT DIRECTION.
                    </p>
                    <Link to="/contact" className="group relative overflow-hidden inline-flex items-center justify-center border-2 border-[#0A0A0A] text-[#0A0A0A] px-12 py-5 font-black transition-transform duration-500 hover:scale-105 w-full lg:w-auto">
                        <span className="relative z-10 group-hover:text-[#FFD100] transition-colors duration-500">BRIEF US</span>
                        <motion.div 
                            className="absolute inset-0 bg-[#0A0A0A] z-0 origin-bottom"
                            initial={{ scaleY: 0 }}
                            whileHover={{ scaleY: 1 }}
                            transition={{ duration: 0.5, ease: easeOutExpo }}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const StudioTools: React.FC = () => {
    return (
        <section className="bg-[#8B84D7] text-[#0A0A0A] pt-32 px-6 md:px-12 overflow-hidden selection:bg-[#0A0A0A] selection:text-[#8B84D7]">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-12 font-mono text-[10px] uppercase tracking-widest font-bold mb-32 relative z-10">
                <div className="lg:col-span-1 lg:border-r border-[#0A0A0A]/20 lg:pr-12 relative">
                    <Crosshair className="top-1/2 -right-1.5 bg-[#8B84D7] hidden lg:block" />
                    <span className="block border-b border-[#0A0A0A]/20 pb-4 mb-8">DISCLAIMER</span>
                    <p className="leading-[2] opacity-80">
                        WE DON'T SELL THIS STUFF Á LA CARTE. YOU CANNOT BUY A STANDALONE LOGO OR A QUICK WEBSITE FROM US. WE DON'T SELL INDIVIDUAL SERVICES. BUT WHEN WE AGREE TO BUILD THE BRAND FOR YOUR BUSINESS, THESE ARE THE ACTUAL, PHYSICAL SKILLS WE BRING TO THE TABLE TO MAKE IT HAPPEN.
                    </p>
                </div>

                <div className="space-y-16 lg:pl-4">
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/20 pb-4 mb-4 text-[#0A0A0A]">BRAND SYSTEMS</h4>
                        <ul className="opacity-70 space-y-2">
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">POSITIONING,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">VISUAL IDENTITY,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">GUIDELINES.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/20 pb-4 mb-4 text-[#0A0A0A]">CONTENT & ASSETS</h4>
                        <ul className="opacity-70 space-y-2">
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">BRAND VOICE,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">LOOK & FEEL,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">IMAGE DIRECTION,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">VIDEO & MOTION,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">SOCIALS ASSETS.</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-16 lg:border-l border-[#0A0A0A]/20 lg:pl-12 relative">
                    <Crosshair className="top-1/4 -left-1.5 bg-[#8B84D7] hidden lg:block" />
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/20 pb-4 mb-4 text-[#0A0A0A]">WEB EXPERIENCES</h4>
                        <ul className="opacity-70 space-y-2">
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">CUSTOM WEB EXPERIENCES,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">CONTENT/COPY,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">REACT/WEBFLOW BUILD.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/20 pb-4 mb-4 text-[#0A0A0A]">SPECIALIST EXECUTION</h4>
                        <ul className="opacity-70 space-y-2">
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">3D PRODUCT VISUALIZATION,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">ADVERTISING READY RENDERS,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">ANIMATION DESIGN.</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-16 lg:border-l border-[#0A0A0A]/20 lg:pl-12">
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/20 pb-4 mb-4 text-[#0A0A0A]">CREATIVE DIRECTION</h4>
                        <ul className="opacity-70 space-y-2">
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">CAMPAIGN THINKING,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">ART DIRECTION,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">CONCEPT DEVELOPMENT.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/20 pb-4 mb-4 text-[#0A0A0A]">PRINT</h4>
                        <ul className="opacity-70 space-y-2">
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">HIGH-QUALITY PRODUCTION PRINT,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">PACKAGING DESIGN & DIE-LINES,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">SIGNAGE DESIGN,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">COLLATERAL TOUCHPOINTS,</li>
                            <li className="hover:opacity-100 transition-opacity hover:translate-x-1 duration-300 transform">MARKETING COLLATERAL.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Giant Bleeding Footer Typography - Infinite Marquee */}
            <div className="w-full flex justify-start -mb-[3%] relative z-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    <h2 className="font-display text-[25vw] lg:text-[20vw] font-black uppercase tracking-tighter leading-none text-[#0A0A0A] pr-8">
                        THE TOOLS. THE TOOLS. THE TOOLS.
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div className="w-full bg-[#F8F8F9]">
      <Helmet>
        <title>COOLO | Shaping Brands With Character</title>
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>
      
      <AnimatePresence>
          {!isLoaded && <InitialLoader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <BrandHero isLoaded={isLoaded} />
      <RealityCheck />
      <ProcessSteps />
      <ShowcaseIntro />
      <FeatureSpotlight />
      <ShowcaseGrid />
      <FAQSection />
      <BriefUsCTA />
      <StudioTools />
    </div>
  );
};

export default HomePage;