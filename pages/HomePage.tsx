import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, QA_DATA } from '../constants';
import ProjectCard from '../components/ProjectCard';
import { ArrowDown, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const BrandHero: React.FC = () => {
    const [isStudioHovered, setIsStudioHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

    useEffect(() => {
        // Ensure we safely grab the window size on mount
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="relative min-h-[100svh] pt-32 pb-12 bg-[#F8F8F9] text-[#0A0A0A] flex flex-col justify-between selection:bg-[#8B84D7] selection:text-white overflow-hidden">
            
            {/* Cursor-Reactive Mesh Gradient Wave */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: mousePosition.x - 400, // Offset to center the blob on the cursor
                        y: mousePosition.y - 400,
                    }}
                    transition={{ delay: 0.001, duration: 1, ease: "ease-in-out" }}
                    className="absolute left-0 top-0 w-[500px] h-[500px] bg-[#8B84D7]/70 rounded-full blur-[90px] will-change-transform"
                />
                <motion.div
                    animate={{
                        x: windowSize.width - mousePosition.x - 300, // Inverse follow
                        y: windowSize.height - mousePosition.y - 300,
                    }}
                    transition={{ delay: 0.001, duration: 1.5, ease: "ease-in-out" }}
                    className="absolute left-0 top-0 w-[400px] h-[400px] bg-[#E7FF0E]/55 rounded-full blur-[80px] will-change-transform"
                />
            </div>

            {/* Top Metadata */}
            <div className="relative z-10 px-6 md:px-12 flex justify-between items-start font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold pointer-events-none">
                <span className="block leading-[2] opacity-60">© 2026 COOLO.<br/>HUMANS IN THE MACHINE.</span>
                <span className="hidden md:block opacity-60">STATUS: <span className="text-[#8B84D7] opacity-100">BOOKINGS OPEN</span></span>
            </div>

            {/* Core Typography Statement */}
            <div className="relative z-10 px-6 md:px-12 flex-grow flex flex-col justify-center w-full mt-24 md:mt-16">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="font-display text-[14vw] lg:text-[11.5vw] font-black uppercase leading-[0.8] tracking-tighter w-full text-left flex flex-col items-start"
                >
                    <span className="block">YOUR BUSINESS IS</span>
                    <span className="block md:indent-[10vw]">BETTER THAN IT</span>
                    <span className="block text-[#8B84D7]">CURRENTLY LOOKS.</span>
                    <span className="block md:indent-[20vw] mt-4 md:mt-0">AND YOU JUST</span>
                    <span className="block relative z-20">
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
                                <span className="absolute left-0 bottom-[15%] w-full h-[2px] md:h-[4px] bg-current"></span>
                            </a>
                            
                            {/* Hover Badge */}
                            <AnimatePresence>
                                {isStudioHovered && (
                                    <motion.a 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
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
                    </span>
                    <span className="block md:indent-[5vw]">TO FIX THAT.</span>
                </motion.h1>
            </div>

            {/* Bottom Grid Row */}
            <div className="relative z-10 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 items-end gap-12 md:gap-0 pb-4 mt-16 md:mt-0">
                <div className="md:col-span-1 hidden md:block">
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 rounded-full border border-[#0A0A0A] flex items-center justify-center opacity-40"
                    >
                        <ArrowDown size={16} />
                    </motion.div>
                </div>
                <div className="md:col-span-3 flex md:justify-end">
                    <p className="max-w-[320px] font-mono text-[16px] uppercase tracking-widest font-bold opacity-70 leading-[2] md:text-right">
                        GOOD BUSINESSES FREQUENTLY LOOK AND SOUND WORSE THAN THE ACTUAL VALUE THEY CREATE.
                    </p>
                </div>
            </div>
        </section>
    );
};

const RealityCheck: React.FC = () => {
    return (
        <section className="py-32 md:py-48 bg-white text-[#0A0A0A] px-6 md:px-12 border-t border-[#0A0A0A]/10 selection:bg-[#8B84D7] selection:text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                <div className="lg:col-span-4">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 block sticky top-32"
                    >
                        01 / THIS STUDIO IS RUN BY HUMANS
                    </motion.span>
                </div>
                <div className="lg:col-span-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="font-display text-[9vw] lg:text-[6.5vw] uppercase tracking-tighter leading-[0.85] font-black"
                    >   We help ambitious businesses figure out what they stand for, how they should look, and how to show up.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-16 md:mt-24 font-mono text-[16px] uppercase tracking-widest font-bold text-[#8B84D7] max-w-sm leading-[2]"
                    >
                        THIS ISN'T SOME OVERNIGHT MAGIC TRICK. IT TAKES ACTUAL TIME AND GIVING AN ACTUAL SH*T.
                    </motion.p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono border-t border-white/10 pt-12">
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
            sub1: "FIND THE ACTUAL VALUE.",
            sub2: "A BLUEPRINT OF EXACTLY WHAT YOU NEED TO DO, AND HOW TO ACTUALLY SELL IT.",
            p: "MOST FOUNDERS ARE SITTING ON A GOLDMINE OF EXPERTISE, BUT THEY'RE TOO BURIED IN THE DAILY GRIND TO EXPLAIN IT CLEARLY. WE SIT IN THE MESS WITH YOU, ASK THE UNCOMFORTABLE QUESTIONS, AND DRAG YOUR REAL VALUE OUT OF YOUR HEAD SO WE CAN BUILD A CLEAR, HONEST BLUEPRINT OF WHERE TO GO NEXT."
        },
        {
            id: 2,
            title: "BUILDING THE ASSETS THAT MAKE IT REAL.",
            sub1: "TURN STRATEGY INTO AN ENGINE.",
            sub2: "YOU GET THE TACTICAL TOOLS YOU NEED TO ACTUALLY SELL YOUR VISION.",
            p: "A GREAT STRATEGY IS COMPLETELY USELESS IF YOU DON'T HAVE THE TOOLS TO SELL IT. ONCE WE HAVE CLARITY, WE DESIGN THE ACTUAL SYSTEM. YOUR BRAND IDENTITY, VISUAL LANGUAGE, CUSTOM WEBSITE, AND SALES ASSETS. SO YOUR BUSINESS LOOKS, SOUNDS, AND FEELS AS PROFESSIONAL AS THE WORK YOU DO."
        },
        {
            id: 3,
            title: "PROTECTING YOUR TIME AND SANITY.",
            sub1: "KEEP THE MOMENTUM GOING.",
            sub2: "WE RUN THE MACHINE SO YOU CAN STEP BACK INTO BEING THE HUMAN DRIVING IT.",
            p: "YOU NEED TO STAY FOCUSED ON RUNNING YOUR BUSINESS, NOT MICROMANAGING FREELANCERS. ONCE THE SYSTEM IS BUILT, WE ACT AS YOUR CREATIVE DIRECTION PARTNER AND FIREWALL MANAGING EXECUTION, KEEPING EVERYTHING CONSISTENT, AND MAKING SURE YOUR BRAND SCALES AS YOU GROW."
        }
    ];

    return (
        <section className="bg-[#0A0A0A] text-white relative selection:bg-[#8B84D7] selection:text-white pb-24 lg:pb-0">
            <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 relative items-start">
                
                {/* Sticky Left Column: Animated Numbers */}
                <div className="lg:col-span-4 sticky top-[10vh] lg:top-0 h-[15vh] lg:h-screen flex flex-col justify-end lg:justify-center z-20 bg-[#0A0A0A]/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-white/5 lg:border-none">
                    <div className="flex flex-col items-start">
                        <div className="flex items-baseline gap-6 md:gap-8 font-display font-black uppercase tracking-tighter leading-none select-none py-4 overflow-hidden">
                            {[1, 2, 3].map((num) => (
                                <motion.span 
                                    key={num}
                                    layout
                                    animate={{ 
                                        fontSize: activeStep === num ? 'clamp(6rem, 18vw, 15rem)' : 'clamp(2rem, 5vw, 4rem)',
                                        opacity: activeStep === num ? 1 : 0.2,
                                    }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
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
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 mb-12">
                    02 / SELECTED WORK
                </span>
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
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

    return (
        <section className="bg-white px-6 md:px-12 pb-24 selection:bg-[#8B84D7] selection:text-white">
            <Link to={`/work/${featuredProject.slug}`} className="block group">
                <div className="relative w-full h-[60vh] md:h-[100vh] overflow-hidden bg-[#F8F8F9]">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.19,1,0.22,1] group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A] bg-white px-3 py-1 font-bold mix-blend-screen shadow-sm">
                        FEATURED — 001
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-start border-t border-[#0A0A0A]/10 pt-8">
                    <div className="md:col-span-8">
                        <h2 className="font-display text-[12vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:text-[#E7FF0E] transition-colors duration-500">
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
        <section className="bg-[#F8F8F9] px-6 md:px-12 py-32 border-t border-[#0A0A0A]/10 selection:bg-[#8B84D7] selection:text-white">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12 lg:gap-x-24">
                {PROJECTS.slice(1, 5).map((project, index) => (
                    <div key={project.id} className={`md:col-span-6 ${index % 2 === 1 ? 'md:mt-48' : ''}`}>
                         <ProjectCard project={project} className="aspect-[4/5] w-full" />
                         <div className="mt-6 flex flex-col items-start border-t border-[#0A0A0A]/10 pt-4">
                            <h3 className="font-display text-[8vw] md:text-[4vw] font-black uppercase tracking-tighter leading-none text-[#0A0A0A]">
                                {project.title}
                            </h3>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B84D7] font-bold mt-3 block">
                                {project.category}
                            </span>
                         </div>
                    </div>
                ))}
             </div>
            
             <div className="mt-32 md:mt-48 border-t border-[#0A0A0A] pt-8 flex justify-between items-center">
                 <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">THE ARCHIVE</span>
                 <Link to="/work" className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#8B84D7] transition-colors duration-300 flex items-center gap-4">
                     SEE ALL WORK <ArrowRight size={14} className="stroke-[3]" />
                 </Link>
             </div>
        </section>
    )
}

const FAQSection: React.FC = () => {
    const faqs = QA_DATA[0].questions; 
    return (
        <section className="py-32 md:py-48 bg-white border-t border-[#0A0A0A]/10 selection:bg-[#8B84D7] selection:text-white">
            <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                <div className="lg:col-span-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 block mb-12 lg:mb-0">
                        03 / INFORMATION
                    </span>
                    <h2 className="font-display text-[12vw] lg:text-[7vw] font-black uppercase tracking-tighter text-[#0A0A0A] leading-[0.85] lg:sticky lg:top-32 mt-8 lg:mt-32">
                        WHAT YOU<br/>MAY WONDER.
                    </h2>
                </div>
                <div className="lg:col-span-8 flex flex-col lg:border-t border-[#0A0A0A]" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="py-12 border-b border-[#0A0A0A]/10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-widest text-[#8B84D7] font-black" itemProp="name">
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
        <section className="bg-[#E7FF0E] text-[#0A0A0A] py-32 md:py-48 px-6 md:px-12 selection:bg-[#0A0A0A] selection:text-[#E7FF0E]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-end">
                <div className="lg:col-span-8">
                    <h2 className="font-display text-[15vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.8]">
                        <span className="block">THINK WE SHOULD</span>
                        <span className="block lg:indent-[10vw]">LOOK AT YOUR</span>
                        <span className="block">BUSINESS?</span>
                    </h2>
                </div>

                <div className="lg:col-span-4 flex flex-col items-start lg:items-end font-mono text-[10px] uppercase tracking-widest font-bold leading-[2] space-y-12">
                    <p className="max-w-[320px] lg:text-right opacity-80">
                        TELL US WHAT YOU'RE BUILDING AND WHERE THINGS CURRENTLY FEEL DISCONNECTED. IF IT SOUNDS LIKE SOMETHING WE CAN ACTUALLY SOLVE, WE'LL LET YOU KNOW. IF NOT, WE WON'T WASTE YOUR TIME. WE'LL GIVE YOU HONEST FEEDBACK AND POINT YOU IN THE RIGHT DIRECTION.
                    </p>
                    <Link to="/contact" className="inline-flex items-center justify-center border-2 border-[#0A0A0A] text-[#0A0A0A] px-12 py-5 font-black hover:bg-[#0A0A0A] hover:text-[#E7FF0E] transition-colors duration-300 w-full lg:w-auto">
                        BRIEF US
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
                <div className="lg:col-span-1">
                    <span className="block border-b border-[#0A0A0A] pb-4 mb-8">DISCLAIMER</span>
                    <p className="leading-[2] opacity-80">
                        WE DON'T SELL THIS STUFF Á LA CARTE. YOU CANNOT BUY A STANDALONE LOGO OR A QUICK WEBSITE FROM US. WE DON'T SELL INDIVIDUAL SERVICES. BUT WHEN WE AGREE TO BUILD THE BRAND FOR YOUR BUSINESS, THESE ARE THE ACTUAL, PHYSICAL SKILLS WE BRING TO THE TABLE TO MAKE IT HAPPEN.
                    </p>
                </div>

                <div className="space-y-16">
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">BRAND SYSTEMS</h4>
                        <ul className="opacity-70 space-y-2">
                            <li>POSITIONING,</li>
                            <li>VISUAL IDENTITY,</li>
                            <li>GUIDELINES.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">CONTENT & ASSETS</h4>
                        <ul className="opacity-70 space-y-2">
                            <li>BRAND VOICE,</li>
                            <li>LOOK & FEEL,</li>
                            <li>IMAGE DIRECTION,</li>
                            <li>VIDEO & MOTION,</li>
                            <li>SOCIALS ASSETS.</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-16">
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">WEB EXPERIENCES</h4>
                        <ul className="opacity-70 space-y-2">
                            <li>CUSTOM WEB EXPERIENCES,</li>
                            <li>CONTENT/COPY,</li>
                            <li>REACT/WEBFLOW BUILD.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">SPECIALIST EXECUTION</h4>
                        <ul className="opacity-70 space-y-2">
                            <li>3D PRODUCT VISUALIZATION,</li>
                            <li>ADVERTISING READY RENDERS,</li>
                            <li>ANIMATION DESIGN.</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-16">
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">CREATIVE DIRECTION</h4>
                        <ul className="opacity-70 space-y-2">
                            <li>CAMPAIGN THINKING,</li>
                            <li>ART DIRECTION,</li>
                            <li>CONCEPT DEVELOPMENT.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">PRINT</h4>
                        <ul className="opacity-70 space-y-2">
                            <li>HIGH-QUALITY PRODUCTION PRINT,</li>
                            <li>PACKAGING DESIGN & DIE-LINES,</li>
                            <li>SIGNAGE DESIGN,</li>
                            <li>COLLATERAL TOUCHPOINTS,</li>
                            <li>MARKETING COLLATERAL.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Giant Bleeding Footer Typography */}
            <div className="w-full flex justify-start lg:justify-center -mb-[3%] relative z-0 pointer-events-none">
                <h2 className="font-display text-[25vw] lg:text-[20vw] font-black uppercase tracking-tighter leading-none text-[#0A0A0A] whitespace-nowrap">
                    THE TOOLS.
                </h2>
            </div>
        </section>
    );
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
    <PageTransition>
        <div className="w-full bg-[#F8F8F9]">
            <Helmet>
                <title>COOLO | Human Thinking. Better Making.</title>
                <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
                </script>
            </Helmet>
            
            <BrandHero />
            <RealityCheck />
            <ProcessSteps />
            <ShowcaseIntro />
            <FeatureSpotlight />
            <ShowcaseGrid />
            <FAQSection />
            <BriefUsCTA />
            <StudioTools />
        </div>
    </PageTransition>
  );
};

export default HomePage;