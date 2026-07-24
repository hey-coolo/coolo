import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, QA_DATA } from '../constants';
import ProjectCard from '../components/ProjectCard';
import { ArrowDown, ArrowRight } from 'lucide-react';

const BrandHero: React.FC = () => {
    const [isStudioHovered, setIsStudioHovered] = useState(false);

    return (
        <section className="relative h-[100svh] pt-32 pb-8 bg-[#F8F8F9] text-[#0A0A0A] flex flex-col justify-between overflow-hidden selection:bg-[#8B84D7] selection:text-white">
            {/* Top Metadata */}
            <div className="absolute top-28 md:top-32 w-full px-6 md:px-12 flex justify-between items-start font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 font-bold pointer-events-none">
                <span className="max-w-[150px] md:max-w-none">© 2026 COOLO. HUMANS IN THE MACHINE.</span>
                <span className="hidden md:block">ARTWORK: CONCEPT PLAYGROUND</span>
            </div>

            {/* Core Typography Statement */}
            <div className="container mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center w-full mt-12 md:mt-0">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="text-[12.5vw] lg:text-[10.5vw] font-black uppercase leading-[0.85] tracking-tighter w-full text-left flex flex-col items-start"
                >
                    <span className="block">YOUR BUSINESS IS BETTER THAN IT</span>
                    <span className="block">CURRENTLY LOOKS, AND YOU <span className="text-[#8B84D7]">JUST</span></span>
                    <span className="block relative z-20">
                        <span className="text-[#8B84D7]">FOUND </span>
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
                                THE STUDIO
                                <span className="absolute left-0 bottom-[10%] w-full h-[3px] md:h-[6px] bg-current"></span>
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
                                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 text-[#8B84D7] hover:text-[#0A0A0A] transition-colors font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase whitespace-nowrap z-0"
                                    >
                                        [@] FOLLOW US
                                    </motion.a>
                                )}
                            </AnimatePresence>
                        </div>
                        {' '}TO FIX THAT.
                    </span>
                </motion.h1>
            </div>

            {/* Bottom Grid Row */}
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 items-end gap-12 md:gap-0 pb-4 relative z-10">
                <div className="hidden md:block">
                    {/* Empty left column to respect 12-col grid alignment */}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex flex-col items-center opacity-40 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold w-full mx-auto"
                >
                    <span className="mb-4">SCROLL TO DISCOVER</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 rounded-full border border-[#0A0A0A] flex items-center justify-center"
                    >
                        <ArrowDown size={14} />
                    </motion.div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex md:justify-end"
                >
                    <p className="max-w-[280px] md:max-w-[320px] font-mono text-[10px] md:text-[11px] uppercase tracking-widest font-bold opacity-90 leading-[1.8] md:text-left">
                        GOOD BUSINESSES FREQUENTLY LOOK AND SOUND WORSE THAN THE ACTUAL VALUE THEY CREATE.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const RealityCheck: React.FC = () => {
    return (
        <section className="py-32 md:py-48 bg-[#8B84D7] text-white px-6 md:px-12 flex flex-col items-center justify-center min-h-[80vh] text-center selection:bg-[#0A0A0A] selection:text-white">
            <div className="container mx-auto flex flex-col items-center">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-16 md:mb-24 block"
                >
                    THE REALITY CHECK
                </motion.span>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-[4.5rem] uppercase tracking-tighter leading-[1.05] max-w-5xl font-light"
                >
                    WE BRIDGE THAT GAP, <strong className="font-black">TURNING YOUR BUSINESS IDEAS</strong> AND EXPERTISE INTO A CLEAR <strong className="font-black">STRATEGIC CREATIVE DIRECTION</strong> AND <strong className="font-black">BRAND EXPERIENCE</strong>.
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-24 md:mt-32 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold opacity-80 max-w-md leading-loose"
                >
                    THIS ISN'T SOME OVERNIGHT MAGIC TRICK. IT TAKES ACTUAL TIME AND GIVING A SH*T.
                </motion.p>
                
                <div className="mt-16 md:mt-24 opacity-50">
                    <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mx-auto">
                        <ArrowDown size={14} />
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

    const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.05, 1, 1, 0.05]);
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
            <h3 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black uppercase tracking-tighter leading-[0.85] mb-12 lg:mb-16">
                {step.title}
            </h3>
            
            <div className="font-mono space-y-8">
                <div className="space-y-4">
                    <h4 className="text-xs md:text-sm uppercase font-bold tracking-widest leading-relaxed text-[#8B84D7] lg:text-white">
                        {step.sub1}
                    </h4>
                    <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest leading-relaxed text-white/90">
                        {step.sub2}
                    </p>
                </div>
                
                <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-white/50 leading-[2] max-w-xl">
                    {step.p}
                </p>
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
            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row relative items-start">
                
                {/* Sticky Left Column: Animated Numbers */}
                <div className="sticky top-[10vh] lg:top-0 h-[20vh] lg:h-screen w-full lg:w-5/12 flex flex-col justify-end lg:justify-center z-20 bg-[#0A0A0A]/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none pb-8 lg:pb-0 border-b border-white/5 lg:border-none">
                    <div className="flex flex-col items-start lg:pl-4">
                        <div className="flex items-baseline gap-6 md:gap-10 font-black uppercase tracking-tighter leading-none select-none py-4 overflow-hidden">
                            {[1, 2, 3].map((num) => (
                                <motion.span 
                                    key={num}
                                    layout
                                    animate={{ 
                                        fontSize: activeStep === num ? 'clamp(6rem, 22vw, 15rem)' : 'clamp(2.5rem, 5vw, 4rem)',
                                        opacity: activeStep === num ? 1 : 0.3,
                                    }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                                    className="origin-bottom text-white inline-block"
                                >
                                    {num}
                                </motion.span>
                            ))}
                        </div>
                        
                        <div className="flex gap-3 mt-4 lg:mt-8 ml-2">
                            {[1, 2, 3].map((num) => (
                                <motion.div 
                                    key={num}
                                    layout
                                    className={`rounded-full border border-white transition-colors duration-500 ${activeStep === num ? 'bg-white w-2.5 h-2.5' : 'bg-transparent w-2 h-2 opacity-30'}`} 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scrollable Right Column: Content */}
                <div className="w-full lg:w-7/12 flex flex-col relative z-10 lg:pl-8">
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
        <section className="bg-white text-[#0A0A0A] py-24 md:py-32 text-left selection:bg-[#8B84D7] selection:text-white">
            <div className="container mx-auto px-6 md:px-12">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="text-[13vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.85]"
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
        <section className="relative bg-[#0A0A0A] selection:bg-[#8B84D7] selection:text-white">
            <Link to={`/work/${featuredProject.slug}`} className="block relative h-[80vh] md:h-[120vh] w-full group overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform ease-out"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/10 transition-colors duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-transparent opacity-100" />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col p-6 md:p-12 items-center justify-between text-center pt-16 md:pt-24 pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full flex flex-col items-center"
                    >
                        <h3 className="font-display text-lg md:text-xl lg:text-2xl font-black uppercase tracking-widest text-white leading-[1.1] mb-6">
                            BRAND VOICE, LOGOTYPE & MARK SYSTEM, ART DIRECTION, CONTENT CREATION.
                        </h3>
                        <span className="font-mono text-[#8B84D7] uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold px-6 py-2 backdrop-blur-md">
                            [ {featuredProject.category} ]
                        </span>
                    </motion.div>
                    
                    <div className="w-full flex justify-center pb-8 md:pb-16 pointer-events-auto">
                        <h2 className="text-[16vw] md:text-[18vw] leading-[0.75] font-black uppercase tracking-tighter text-white transition-transform duration-700 group-hover:text-[#8B84D7]">
                            {featuredProject.title}
                        </h2>
                    </div>
                </div>
            </Link>
        </section>
    );
};

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-white px-6 md:px-12 py-32 md:py-48 relative z-40 overflow-hidden selection:bg-[#8B84D7] selection:text-white">
             <div className="container mx-auto">
                <div className="flex flex-col items-center mb-24 md:mb-32 text-center">
                     <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black uppercase tracking-tighter text-[#0A0A0A] leading-[0.85]">
                        WHAT WE'VE DONE
                     </h2>
                </div>

                {/* White background, highly staggered vertical misalignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
                    {PROJECTS.slice(1, 5).map((project, index) => (
                        <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-48' : 'md:-mt-12'}`}>
                             <ProjectCard project={project} className="aspect-[4/5] md:aspect-[4/3] w-full shadow-md hover:shadow-2xl transition-shadow duration-500" />
                             <div className="mt-8 flex flex-col items-start pt-6">
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-[#0A0A0A]">{project.title}</h3>
                                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#8B84D7] font-bold mt-2 block">{project.category}</span>
                             </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-32 md:mt-48 flex justify-center md:justify-end w-full">
                    <Link to="/work" className="font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold border-b-2 border-[#0A0A0A] text-[#0A0A0A] pb-1 hover:text-[#8B84D7] hover:border-[#8B84D7] transition-colors duration-300 flex items-center gap-3">
                        SEE MORE WORK <ArrowRight size={14} className="stroke-[3]" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

const FAQSection: React.FC = () => {
    const faqs = QA_DATA[0].questions; 
    return (
        <section className="py-32 md:py-48 bg-[#F8F8F9] relative z-40 selection:bg-[#8B84D7] selection:text-white text-left">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-[11vw] md:text-[8.5vw] font-black uppercase tracking-tighter text-[#0A0A0A] leading-[0.85] mb-32">WHAT THEY'VE SAID</h2>
                <div className="max-w-5xl" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="mb-24 flex flex-col md:flex-row gap-8 md:gap-24" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <div className="md:w-1/4">
                                <div className="mb-6">
                                    <ArrowDown size={48} strokeWidth={1.5} className="text-[#0A0A0A]" />
                                </div>
                            </div>
                            <div className="md:w-3/4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="font-mono text-xs md:text-sm text-[#0A0A0A] leading-[2] font-bold uppercase tracking-widest mb-8" itemProp="text">
                                    "{faq.a}"
                                </p>
                                <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#0A0A0A] font-black" itemProp="name">
                                    {faq.q}
                                </h3>
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
        <section className="bg-[#FFD100] text-[#0A0A0A] flex flex-col justify-between min-h-[100svh] pt-32 pb-16 px-6 md:px-12 selection:bg-[#0A0A0A] selection:text-white relative z-40">
            <div className="container mx-auto flex-grow flex flex-col justify-center">
                <h2 className="text-[14vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.82] w-full">
                    <span className="block">THINK WE SHOULD</span>
                    <span className="block ml-[10%] md:ml-[20%]">LOOK AT YOUR</span>
                    <span className="block">BUSINESS?</span>
                </h2>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end mt-16 md:mt-0">
                <div className="md:col-span-6 lg:col-span-4 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold leading-[1.8] space-y-6">
                    <p>TELL US WHAT YOU'RE BUILDING AND WHERE THINGS CURRENTLY FEEL DISCONNECTED.</p>
                    <p className="opacity-70">IF IT SOUNDS LIKE SOMETHING WE CAN ACTUALLY SOLVE, WE'LL LET YOU KNOW. IF NOT, WE WON'T WASTE YOUR TIME. WE'LL GIVE YOU HONEST FEEDBACK AND POINT YOU IN THE RIGHT DIRECTION.</p>
                </div>
                <div className="md:col-span-6 lg:col-span-8 flex md:justify-end">
                    <Link to="/contact" className="bg-white text-[#0A0A0A] px-16 py-6 font-mono text-[10px] md:text-xs uppercase tracking-widest font-black hover:bg-[#0A0A0A] hover:text-white transition-colors duration-300 whitespace-nowrap">
                        BRIEF US
                    </Link>
                </div>
            </div>
        </section>
    );
};

const StudioTools: React.FC = () => {
    return (
        <section className="bg-[#8B84D7] text-white pt-32 pb-8 px-6 md:px-12 overflow-hidden flex flex-col justify-between min-h-[100svh] selection:bg-[#0A0A0A] selection:text-white relative z-40">
            <div className="container mx-auto z-10 relative flex-grow flex flex-col">
                <div className="max-w-3xl mb-24 md:mb-32">
                    <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold mb-8">WE DON'T SELL THIS STUFF Á LA CARTE.</h3>
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold opacity-90 leading-[1.8] max-w-2xl">
                        YOU CANNOT BUY A STANDALONE LOGO OR A QUICK WEBSITE FROM US. WE DON'T SELL INDIVIDUAL SERVICES. BUT WHEN WE AGREE TO BUILD THE BRAND FOR YOUR BUSINESS, THESE ARE THE ACTUAL, PHYSICAL SKILLS WE BRING TO THE TABLE TO MAKE IT HAPPEN.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-16">
                    <div className="space-y-16 md:space-y-24">
                        <div>
                            <h4 className="mb-4 text-[#0A0A0A]">BRAND SYSTEMS</h4>
                            <ul className="text-white/80 space-y-1">
                                <li>POSITIONING,</li>
                                <li>VISUAL IDENTITY,</li>
                                <li>GUIDELINES.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 text-[#0A0A0A]">CONTENT & ASSETS</h4>
                            <ul className="text-white/80 space-y-1">
                                <li>BRAND VOICE,</li>
                                <li>LOOK & FEEL,</li>
                                <li>IMAGE DIRECTION,</li>
                                <li>VIDEO & MOTION,</li>
                                <li>SOCIALS ASSETS.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="space-y-16 md:space-y-24">
                        <div>
                            <h4 className="mb-4 text-[#0A0A0A]">WEB EXPERIENCES</h4>
                            <ul className="text-white/80 space-y-1">
                                <li>CUSTOM WEB EXPERIENCES,</li>
                                <li>CONTENT/COPY,</li>
                                <li>REACT/WEBFLOW BUILD.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 text-[#0A0A0A]">SPECIALIST EXECUTION</h4>
                            <ul className="text-white/80 space-y-1">
                                <li>3D PRODUCT VISUALIZATION,</li>
                                <li>ADVERTISING READY RENDERS,</li>
                                <li>ANIMATION DESIGN.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        <div>
                            <h4 className="mb-4 text-[#0A0A0A]">CREATIVE DIRECTION</h4>
                            <ul className="text-white/80 space-y-1">
                                <li>CAMPAIGN THINKING,</li>
                                <li>ART DIRECTION,</li>
                                <li>CONCEPT DEVELOPMENT.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 text-[#0A0A0A]">PRINT</h4>
                            <ul className="text-white/80 space-y-1">
                                <li>HIGH-QUALITY PRODUCTION PRINT,</li>
                                <li>PACKAGING DESIGN & DIE-LINES,</li>
                                <li>SIGNAGE DESIGN,</li>
                                <li>COLLATERAL TOUCHPOINTS,</li>
                                <li>MARKETING COLLATERAL.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Giant Bleeding Footer Typography */}
            <div className="w-full flex flex-col items-center justify-end mt-auto pt-16 relative z-0 pointer-events-none">
                <h2 className="text-[18vw] md:text-[18vw] font-black uppercase tracking-tighter leading-[0.75] text-white/90 whitespace-nowrap translate-y-[22%]">
                    <span className="block text-left ml-[10vw]">THE TOOLS WE USE</span>
                    <span className="block text-left">TO BUILD IT.</span>
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
    <div className="w-full bg-[#F8F8F9]">
      <Helmet>
        <title>COOLO | Shaping Brands With Character</title>
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
  );
};

export default HomePage;