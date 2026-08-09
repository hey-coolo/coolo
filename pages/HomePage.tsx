import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, QA_DATA } from '../constants';
import ProjectCard from '../components/ProjectCard';
import { ArrowDown, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const BrandHero: React.FC = () => {
    const [isStudioHovered, setIsStudioHovered] = useState(false);

    return (
        <section className="relative min-h-[100svh] pt-32 pb-12 bg-[#F8F8F9] text-[#0A0A0A] flex flex-col justify-between selection:bg-[#8B84D7] selection:text-white">
            {/* Top Metadata */}
            <div className="px-6 md:px-12 flex justify-between items-start font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold pointer-events-none">
                <span className="block leading-[2] opacity-60">© 2026 COOLO.<br/>HUMANS IN THE MACHINE.</span>
                <span className="hidden md:block opacity-60">STATUS: <span className="text-[#8B84D7] opacity-100">BOOKINGS OPEN</span></span>
            </div>

            {/* Core Typography Statement */}
            <div className="px-6 md:px-12 flex-grow flex flex-col justify-center w-full mt-24 md:mt-16">
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
            <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 items-end gap-12 md:gap-0 pb-4 relative z-10 mt-16 md:mt-0">
                <div className="md:col-span-1 hidden md:block">
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 rounded-full border border-[#0A0A0A] flex items-center justify-center opacity-40"
                    >
                        <ArrowDown size={14} />
                    </motion.div>
                </div>
                <div className="md:col-span-3 flex md:justify-end">
                    <p className="max-w-[320px] font-mono text-[10px] uppercase tracking-widest font-bold opacity-70 leading-[2] md:text-right">
                        GOOD BUSINESSES FREQUENTLY LOOK AND SOUND WORSE THAN THE ACTUAL VALUE THEY CREATE.
                    </p>
                </div>
            </div>
        </section>
    );
};

const RealityCheck: React.FC = () => {
    // Editorial line-by-line reveal animation configuration
    const lineVariants = {
        hidden: { y: "110%", rotate: 2 },
        visible: (i: number) => ({
            y: "0%",
            rotate: 0,
            transition: {
                delay: i * 0.1,
                duration: 1,
                ease: [0.19, 1, 0.22, 1] // GSAP-style Expo.easeOut
            }
        })
    };

    return (
        <section className="pt-32 pb-32 md:pt-48 md:pb-48 bg-[#F8F8F9] text-[#0A0A0A] px-6 md:px-12 selection:bg-[#8B84D7] selection:text-white">
            <div className="border-t-[3px] border-[#0A0A0A] pt-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                
                {/* Metadata Column */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold block"
                    >
                        01 / THE REALITY CHECK
                    </motion.span>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="hidden lg:block mt-auto max-w-[220px]"
                    >
                        <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#8B84D7] leading-[2]">
                            This isn't some overnight magic trick. It takes actual time and giving a sh*t.
                        </p>
                    </motion.div>
                </div>

                {/* Editorial Typography Column */}
                <div className="lg:col-span-8">
                    <h2 className="font-display text-[11vw] lg:text-[7.5vw] uppercase tracking-tighter leading-[0.85] font-black flex flex-col">
                        <span className="overflow-hidden pb-2"><motion.span custom={0} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="block origin-bottom-left">WE BRIDGE THAT GAP,</motion.span></span>
                        <span className="overflow-hidden pb-2"><motion.span custom={1} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="block origin-bottom-left">TURNING YOUR BUSINESS</motion.span></span>
                        <span className="overflow-hidden pb-2"><motion.span custom={2} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="block origin-bottom-left">IDEAS AND EXPERTISE</motion.span></span>
                        <span className="overflow-hidden pb-2"><motion.span custom={3} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="block origin-bottom-left text-[#8B84D7]">INTO A CLEAR STRATEGIC</motion.span></span>
                        <span className="overflow-hidden pb-2"><motion.span custom={4} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="block origin-bottom-left">CREATIVE DIRECTION</motion.span></span>
                        <span className="overflow-hidden pb-2"><motion.span custom={5} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="block origin-bottom-left">AND BRAND EXPERIENCE.</motion.span></span>
                    </h2>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="block lg:hidden mt-16"
                    >
                        <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#8B84D7] leading-[2]">
                            This isn't some overnight magic trick. It takes actual time and giving a sh*t.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ProcessSteps: React.FC = () => {
    const steps = [
        {
            id: 1,
            title: "PULLING THE IDEAS OUT OF YOUR HEAD.",
            sub1: "FIND THE ACTUAL VALUE.",
            sub2: "A BLUEPRINT OF EXACTLY WHAT YOU NEED TO DO.",
            p: "Most founders are sitting on a goldmine of expertise, but they're too buried in the daily grind to explain it clearly. We sit in the mess with you, ask the uncomfortable questions, and drag your real value out of your head so we can build a clear, honest blueprint of where to go next."
        },
        {
            id: 2,
            title: "BUILDING THE ASSETS THAT MAKE IT REAL.",
            sub1: "TURN STRATEGY INTO AN ENGINE.",
            sub2: "YOU GET THE TACTICAL TOOLS YOU NEED.",
            p: "A great strategy is completely useless if you don't have the tools to sell it. Once we have clarity, we design the actual system. Your brand identity, visual language, custom website, and sales assets. So your business looks, sounds, and feels as professional as the work you do."
        },
        {
            id: 3,
            title: "PROTECTING YOUR TIME AND SANITY.",
            sub1: "KEEP THE MOMENTUM GOING.",
            sub2: "WE RUN THE MACHINE FOR YOU.",
            p: "You need to stay focused on running your business, not micromanaging freelancers. Once the system is built, we act as your creative direction partner and firewall—managing execution, keeping everything consistent, and making sure your brand scales as you grow."
        }
    ];

    return (
        <section className="bg-white text-[#0A0A0A] selection:bg-[#8B84D7] selection:text-white pb-32">
            {steps.map((step, index) => {
                const isEven = index % 2 !== 0;
                
                return (
                    <div key={step.id} className="border-t-[3px] border-[#0A0A0A] grid grid-cols-1 lg:grid-cols-12 min-h-[75vh]">
                        
                        {/* GIANT NUMBER COLUMN - Alternates Left/Right on Desktop */}
                        <div className={`lg:col-span-6 flex items-center justify-center bg-[#F8F8F9] overflow-hidden border-b-[3px] lg:border-b-0 border-[#0A0A0A] py-24 lg:py-0 ${isEven ? 'lg:order-2 lg:border-l-[3px]' : 'lg:order-1 lg:border-r-[3px]'}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20%" }}
                                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <span className="font-display text-[45vw] lg:text-[30vw] leading-[0.75] font-black tracking-tighter text-[#0A0A0A] block">
                                    0{step.id}
                                </span>
                            </motion.div>
                        </div>

                        {/* STRUCTURED DATA COLUMN */}
                        <div className={`lg:col-span-6 p-8 lg:p-16 flex flex-col justify-center bg-white ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20%" }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-black text-[#8B84D7] mb-8 block">
                                    Phase 0{step.id}
                                </span>
                                
                                <h3 className="font-display text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-16">
                                    {step.title}
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-[#0A0A0A]/20 pt-8">
                                    <div className="md:col-span-5 font-mono text-[10px] uppercase tracking-widest leading-[2]">
                                        <strong className="block text-[#0A0A0A] font-black mb-2">{step.sub1}</strong>
                                        <span className="text-[#8B84D7] font-bold">{step.sub2}</span>
                                    </div>
                                    <div className="md:col-span-7">
                                        <p className="font-body text-lg lg:text-xl text-[#0A0A0A]/80 leading-relaxed">
                                            {step.p}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                );
            })}
        </section>
    );
};

const ShowcaseIntro: React.FC = () => {
    return (
        <section className="bg-white text-[#0A0A0A] pt-32 pb-16 px-6 md:px-12 selection:bg-[#8B84D7] selection:text-white border-t-[3px] border-[#0A0A0A]">
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
        <section className="bg-[#F8F8F9] px-6 md:px-12 py-32 border-t-[3px] border-[#0A0A0A] selection:bg-[#8B84D7] selection:text-white">
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
        <section className="py-32 md:py-48 bg-white border-t-[3px] border-[#0A0A0A] selection:bg-[#8B84D7] selection:text-white">
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
        <section className="bg-[#FFD100] text-[#0A0A0A] py-32 md:py-48 px-6 md:px-12 selection:bg-[#0A0A0A] selection:text-[#FFD100]">
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
                    <Link to="/contact" className="inline-flex items-center justify-center border-2 border-[#0A0A0A] text-[#0A0A0A] px-12 py-5 font-black hover:bg-[#0A0A0A] hover:text-[#FFD100] transition-colors duration-300 w-full lg:w-auto">
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
    </PageTransition>
  );
};

export default HomePage;