import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, JOURNAL_POSTS, QA_DATA } from '../constants';
import ProjectCard from '../components/ProjectCard';
import { ArrowDown } from 'lucide-react';

const BrandHero: React.FC = () => {
    const [isStudioHovered, setIsStudioHovered] = useState(false);

    return (
        <section className="relative min-h-[100svh] pt-32 pb-8 bg-[#F8F8F9] text-brand-navy flex flex-col justify-between overflow-hidden selection:bg-[#8B84D7] selection:text-white">
            {/* Top Metadata */}
            <div className="w-full px-6 md:px-12 flex justify-between items-start font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 font-bold pointer-events-none">
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
                                className="text-[#8B84D7] relative z-10 transition-colors duration-300 hover:text-brand-navy"
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
                                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 text-[#8B84D7] hover:text-brand-navy transition-colors font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase whitespace-nowrap z-0"
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
                        className="w-8 h-8 rounded-full border border-brand-navy flex items-center justify-center"
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
        <section className="py-32 md:py-48 bg-[#8B84D7] text-white px-6 md:px-12 flex flex-col items-center justify-center min-h-[80vh] text-center selection:bg-brand-navy selection:text-white">
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
    
    // Smooth fade in and out mapping strictly to the center viewport intersection
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
                
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-white/60 leading-[2] max-w-xl">
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
        <section className="bg-brand-navy text-white relative selection:bg-[#8B84D7] selection:text-white pb-24 lg:pb-0">
            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row relative items-start">
                
                {/* Sticky Left Column: Animated Numbers */}
                <div className="sticky top-[10vh] lg:top-0 h-[20vh] lg:h-screen w-full lg:w-1/2 flex flex-col justify-end lg:justify-center z-20 bg-brand-navy/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none pb-8 lg:pb-0 border-b border-white/5 lg:border-none">
                    <div className="flex flex-col items-start">
                        <div className="flex items-baseline gap-4 md:gap-8 font-black uppercase tracking-tighter leading-none select-none">
                            {[1, 2, 3].map((num) => (
                                <motion.span 
                                    key={num}
                                    layout
                                    animate={{ 
                                        fontSize: activeStep === num ? 'clamp(6rem, 22vw, 18rem)' : 'clamp(2rem, 5vw, 4rem)',
                                        opacity: activeStep === num ? 1 : 0.2,
                                    }}
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.7 }}
                                    className="origin-bottom text-white"
                                >
                                    {num}
                                </motion.span>
                            ))}
                        </div>
                        
                        <div className="flex gap-3 mt-6 lg:mt-8 ml-2">
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
                <div className="w-full lg:w-1/2 flex flex-col relative z-10 lg:pl-12">
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
        <section className="bg-white text-brand-navy py-32 md:py-48 text-center selection:bg-brand-purple selection:text-white border-t border-brand-navy/10">
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
        <section className="relative bg-brand-navy pt-24 md:pt-32 selection:bg-[#8B84D7] selection:text-white">
            <div className="container mx-auto px-6 md:px-12 text-center text-white mb-16 md:mb-24">
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-2xl md:text-3xl lg:text-[2.5rem] font-black uppercase tracking-tighter max-w-5xl mx-auto leading-[1.1] md:leading-[1.05]"
                >
                    BRAND VOICE, LOGOTYPE & MARK SYSTEM, ART DIRECTION, CONTENT CREATION.
                </motion.h3>
            </div>

            <Link to={`/work/${featuredProject.slug}`} className="block relative h-[70vh] md:h-[110vh] w-full group overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform ease-out"
                    />
                    <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent opacity-100" />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col p-6 md:p-12 items-center justify-between text-center pt-24 md:pt-32 pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-auto mb-8 md:mb-12 pointer-events-auto"
                    >
                        <span className="font-mono text-white uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold px-6 py-2 backdrop-blur-md border border-white/20 bg-brand-navy/20">
                            [ {featuredProject.category} ]
                        </span>
                    </motion.div>
                    
                    <div className="w-full flex justify-center pb-8 md:pb-16 pointer-events-auto">
                        <h2 className="text-[16vw] md:text-[18vw] leading-[0.75] font-black uppercase tracking-tighter text-white transition-transform duration-700 group-hover:text-brand-yellow">
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
        <section className="bg-white px-6 md:px-12 py-32 md:py-48 relative z-40 border-b border-brand-navy/10 overflow-hidden selection:bg-brand-purple selection:text-white">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32 gap-8">
                     <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter text-brand-navy leading-[0.85]">
                        WHAT WE'VE<br/>DONE.
                     </h2>
                </div>

                {/* White background, highly staggered vertical misalignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
                    {PROJECTS.slice(1, 8).map((project, index) => (
                        <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-48' : 'md:-mt-12'}`}>
                             <ProjectCard project={project} className="aspect-[4/5] md:aspect-[3/4] w-full shadow-xl hover:shadow-2xl transition-shadow duration-500" />
                             <div className="mt-8 flex justify-between items-start border-t border-brand-navy/10 pt-6">
                                <div className="text-left">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none text-brand-navy">{project.title}</h3>
                                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#8B84D7] font-bold mt-3 block">{project.category}</span>
                                </div>
                                <span className="font-mono text-[10px] md:text-xs uppercase font-bold opacity-40 text-brand-navy">{project.year}</span>
                             </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-32 md:mt-48 flex justify-center md:justify-end w-full">
                    <Link to="/work" className="font-mono text-xs uppercase tracking-widest font-bold border border-brand-navy/20 text-brand-navy px-12 py-5 hover:bg-brand-navy hover:text-white transition-colors duration-300">
                        View Full Archive &rarr;
                    </Link>
                </div>
            </div>
        </section>
    )
}

const FAQSection: React.FC = () => {
    const faqs = QA_DATA[0].questions; 
    return (
        <section className="py-32 bg-brand-navy border-b border-white/5 relative z-40 selection:bg-[#8B84D7] selection:text-white text-left">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85] mb-24">WHAT<br/>THEY'VE<br/>SAID.</h2>
                <div className="max-w-4xl" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="mb-12 border-b border-white/10 pb-12 flex flex-col md:flex-row gap-8 md:gap-16" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <div className="md:w-1/3">
                                <h3 className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#8B84D7] font-bold" itemProp="name">
                                    {faq.q}
                                </h3>
                            </div>
                            <div className="md:w-2/3" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="font-body text-lg md:text-xl text-white/80 leading-relaxed" itemProp="text">
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
        <section className="py-32 relative z-40 bg-brand-yellow overflow-hidden text-left selection:bg-brand-navy selection:text-white">
             <div className="container mx-auto px-6 md:px-12">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85] max-w-2xl">THINK WE SHOULD LOOK AT YOUR BUSINESS?</h2>
                    <Link to="/contact" className="font-mono text-xs uppercase tracking-widest font-bold bg-white text-brand-navy px-12 py-5 hover:bg-brand-navy hover:text-white transition-colors duration-300">
                        INQUIRE NOW
                    </Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-brand-navy/10 mt-24 md:mt-32">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} className="group block border-r border-b border-t border-brand-navy/10 p-8 md:p-12 hover:bg-white/20 transition-colors duration-300 text-brand-navy">
                             <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 block mb-6 text-brand-navy transition-colors">{post.date}</span>
                             <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-brand-navy transition-colors min-h-[3em]">{post.title}</h3>
                             <p className="font-body text-lg md:text-xl font-medium opacity-80 leading-relaxed line-clamp-3 text-brand-navy transition-opacity">
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
      <LatestIntel />
    </div>
  );
};

export default HomePage;