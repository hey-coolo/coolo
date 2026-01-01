
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';

// --- 1. Structural Grid Hero ---
const TandemHero: React.FC = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -200]);

    return (
        <section className="relative min-h-screen flex flex-col pt-32 bg-brand-offwhite text-brand-navy overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="container mx-auto h-full border-x border-brand-navy/10 relative">
                    <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-brand-navy/10 hidden md:block"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-brand-navy/10 hidden md:block"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 flex-grow flex flex-col justify-center">
                <div className="mb-12">
                    {/* Removed mix-blend-multiply for sharper contrast */}
                    <motion.h1 style={{ y: y1 }} className="text-[18vw] md:text-[15.5vw] font-black uppercase leading-[0.85] tracking-tight text-brand-navy">
                        STRATEGY
                    </motion.h1>
                    <div className="flex justify-between items-center overflow-hidden">
                        <motion.h1 style={{ y: y2 }} className="text-[18vw] md:text-[15.5vw] font-black uppercase leading-[0.85] tracking-tight text-brand-navy text-right ml-auto">
                            EXECUTION
                        </motion.h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t-2 border-brand-navy pt-8">
                    <div className="hidden md:block">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold block mb-2 text-brand-purple">Est. 2024</span>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/80">Mount Maunganui<br/>New Zealand</p>
                    </div>
                    <div className="md:text-center">
                         <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold block mb-2 text-brand-purple">The Senior Unit</span>
                         <p className="font-body text-sm max-w-xs mx-auto text-brand-navy/90 font-medium">
                            We replace agency bloat with surgical precision. Two experts. One system.
                         </p>
                    </div>
                    <div className="md:text-right">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold block mb-2 text-brand-purple">Status</span>
                         <div className="flex items-center justify-end gap-2">
                             <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse"></span>
                             <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/80">Accepting Partners</span>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- 2. Split Screen Manifesto ---
const SplitManifesto: React.FC = () => {
    return (
        <section className="border-t-2 border-brand-navy bg-brand-offwhite relative z-20">
            <div className="container mx-auto border-x border-brand-navy/10">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* Left: Sticky Header */}
                    <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-brand-navy/10 flex flex-col justify-between">
                        <div>
                            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block">01 / The Thesis</span>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] text-brand-navy">
                                No Magic.<br/>
                                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #0F0328' }}>Just Logic.</span>
                            </h2>
                        </div>
                        <div className="hidden lg:block">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="animate-bounce text-brand-navy">
                                <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                            </svg>
                        </div>
                    </div>

                    {/* Right: Scrolling Narrative */}
                    <div className="p-8 md:p-16 space-y-32">
                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy">
                                Most agencies sell you <span className="bg-brand-yellow px-2 font-bold text-brand-navy">mystery</span>. They hide behind jargon and "proprietary processes" to justify the billable hours.
                            </p>
                        </AnimatedSection>
                        
                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy">
                                We sell <span className="text-brand-purple font-bold">clarity</span>. We believe that if you can't explain your strategy on a napkin, you don't have one.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy">
                                We are the <span className="border-b-4 border-brand-navy font-bold">Operators</span>. We don't just design the car; we build the engine and hand you the keys.
                            </p>
                        </AnimatedSection>

                        <div className="pt-16">
                             <Link to="/about" className="inline-block border-2 border-brand-navy px-12 py-6 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300 text-brand-navy">
                                 Read the Protocol
                             </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// --- 3. Service Legs (Restored) ---
const ServiceRouter: React.FC = () => {
    return (
        <section className="bg-brand-offwhite border-b-2 border-brand-navy relative z-20">
             <div className="grid grid-cols-1 lg:grid-cols-3">
                {SERVICE_LEGS.map((leg, index) => {
                    // Logic to split "I Need" from the rest of the title
                    const titleParts = leg.title.match(/^(I Need)\s+(.*)$/i);
                    const prefix = titleParts ? titleParts[1] : 'I Need';
                    const mainTitle = titleParts ? titleParts[2] : leg.title;

                    return (
                        <Link 
                            key={leg.id}
                            to={leg.path}
                            className="group relative block min-h-[70vh] border-b lg:border-b-0 lg:border-r border-brand-navy/10 p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:bg-brand-lavender transition-colors duration-500"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">
                                        0{index + 1}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-50 group-hover:opacity-100 transition-opacity text-brand-navy group-hover:text-brand-offwhite">
                                        {leg.visual}
                                    </span>
                                </div>
                                
                                {/* Title Block with Split Hierarchy */}
                                <div className="mb-8 relative">
                                    {/* "I Need" - Small, Purple (Yellow on Hover) */}
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors block mb-2">
                                        {prefix}
                                    </span>
                                    
                                    {/* Main Word - Big, Navy (White on Hover) */}
                                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] text-brand-navy group-hover:text-brand-offwhite transition-colors break-words">
                                        {mainTitle}
                                        <span className="text-brand-purple group-hover:text-brand-yellow transition-colors">.</span>
                                    </h2>
                                </div>
                                
                                {/* Subtitle turns white for contrast against lavender */}
                                <p className="font-body text-xl md:text-2xl text-brand-navy/60 group-hover:text-brand-offwhite/90 transition-colors max-w-sm leading-relaxed">
                                    {leg.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 pt-12 border-t border-brand-navy/10 group-hover:border-brand-offwhite/20 mt-auto">
                                <p className="font-mono text-xs uppercase tracking-widest mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 text-brand-navy group-hover:text-brand-offwhite">
                                    {leg.hoverText}
                                </p>
                                <span className="inline-block font-mono text-sm uppercase font-bold tracking-widest border-b-2 border-brand-purple group-hover:border-brand-yellow pb-1 group-hover:text-brand-yellow transition-colors text-brand-purple">
                                    Initiate Protocol
                                </span>
                            </div>
                        </Link>
                    );
                })}
             </div>
        </section>
    )
}

// --- 4. Capability List (Editorial Style) ---
const CapabilityList: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const capabilities = [
        { 
            id: '01', 
            title: 'Strategy', 
            desc: 'Positioning, Messaging, & Roadmaps', 
            img: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?auto=format&fit=crop&q=80&w=800',
            link: '/clarity'
        },
        { 
            id: '02', 
            title: 'Identity', 
            desc: 'Visual Systems, Logos, & Typography', 
            img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
            link: '/firepower'
        },
        { 
            id: '03', 
            title: 'Digital', 
            desc: 'Webflow Development & UI/UX', 
            img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            link: '/firepower'
        },
        { 
            id: '04', 
            title: 'Motion', 
            desc: '3D Visualization & Kinetic Type', 
            img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800',
            link: '/firepower'
        }
    ];

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section 
            className="bg-brand-navy text-brand-offwhite py-32 relative overflow-hidden" 
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-8 relative z-10">
                <div className="mb-24 flex items-end justify-between border-b border-brand-offwhite/20 pb-8">
                     <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tight leading-[0.9]">
                        Output.
                     </h2>
                     <div className="hidden md:block font-mono text-xs uppercase tracking-widest text-right opacity-80">
                        Select a discipline<br/>to explore
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
                                <span className="font-mono text-sm md:text-base text-brand-purple group-hover:text-brand-yellow font-bold transition-colors">/{cap.id}</span>
                                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out text-brand-offwhite">
                                    {cap.title}
                                </h3>
                            </div>
                            <div className="mt-4 md:mt-0 pl-[calc(2rem+14px)] md:pl-0">
                                {/* Increased opacity for better readability against dark bg */}
                                <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity text-brand-offwhite">
                                    {cap.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Floating Image Reveal */}
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
                {hoveredIndex !== null && (
                    <img 
                        src={capabilities[hoveredIndex].img} 
                        alt="" 
                        className="w-full h-full object-cover grayscale contrast-125"
                    />
                )}
            </motion.div>
        </section>
    );
}

// --- 5. Showcase (Clean Grid) ---
const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-brand-offwhite px-4 md:px-8 py-32 relative z-10 border-b-2 border-brand-navy">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                     <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.9]">
                        Selected<br/>Works
                     </h2>
                     <Link to="/work" className="font-mono text-sm uppercase tracking-widest font-bold border-2 border-brand-navy px-8 py-3 hover:bg-brand-navy hover:text-brand-offwhite transition-all text-brand-navy">
                        View Full Archive
                     </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-24">
                    {PROJECTS.slice(0, 4).map((project, index) => (
                        <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-24' : ''}`}>
                             <ProjectCard project={project} className="aspect-[4/3] w-full" />
                             <div className="mt-6 flex justify-between items-start border-t border-brand-navy/10 pt-4">
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight leading-none text-brand-navy">{project.title}</h3>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold mt-2 block">{project.category}</span>
                                </div>
                                <span className="font-mono text-[10px] uppercase font-bold opacity-40 text-brand-navy">{project.year}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- 6. Journal / Latest Intel ---
const LatestIntel: React.FC = () => {
    return (
        <section className="py-24 relative z-20 bg-brand-offwhite">
             <div className="container mx-auto px-8">
                 <div className="flex justify-between items-end mb-16">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-brand-navy">Latest Intel</h3>
                    <Link to="/journal" data-cursor-text="INTEL" className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple hover:text-brand-navy">View All Entries &rarr;</Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-brand-navy/10">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} data-cursor-text="READ" className="group block border-r border-b border-t border-brand-navy/10 p-8 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300">
                             <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-4 group-hover:text-brand-yellow text-brand-navy group-hover:text-brand-offwhite">{post.date}</span>
                             <h4 className="text-3xl font-black uppercase tracking-tight leading-none mb-6 text-brand-navy group-hover:text-brand-offwhite min-h-[3em]">{post.title}</h4>
                             <p className="font-body text-sm opacity-60 leading-relaxed line-clamp-3 group-hover:opacity-80 text-brand-navy group-hover:text-brand-offwhite">
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
  return (
    <div className="bg-brand-offwhite">
      <TandemHero />
      <SplitManifesto />
      <ServiceRouter />
      <CapabilityList />
      <ShowcaseGrid />
      <LatestIntel />
    </div>
  );
};

export default HomePage;
