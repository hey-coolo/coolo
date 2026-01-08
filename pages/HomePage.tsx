
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';

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

const IndividualDraggable: React.FC<{ img: string; initialPos: { top: string; left: string; rotate: number; s: number } }> = ({ img, initialPos }) => {
    const [zIndex, setZIndex] = useState(10);
    
    return (
        <motion.div 
            drag
            dragMomentum={true}
            dragTransition={{ power: 0.2, timeConstant: 200 }}
            onDragStart={(e) => {
                e.stopPropagation(); // Prevent parent global drag from firing
                setZIndex(100);
            }}
            onDragEnd={() => setZIndex(10 + Math.floor(Math.random() * 5))}
            className="absolute w-[180px] md:w-[320px] aspect-[4/5] shadow-2xl cursor-grab active:cursor-grabbing group overflow-hidden"
            style={{ 
                top: initialPos.top, 
                left: initialPos.left, 
                zIndex: zIndex
            }}
            initial={{ 
                rotate: initialPos.rotate, 
                scale: initialPos.s, 
                opacity: 0 
            }}
            animate={{ 
                opacity: 0.35, 
                transition: { duration: 1, delay: Math.random() * 0.5 } 
            }}
            whileHover={{ 
                opacity: 1, 
                scale: initialPos.s * 1.05, 
                zIndex: 110,
                transition: { duration: 0.3 }
            }}
            whileDrag={{ 
                scale: initialPos.s * 1.1, 
                rotate: 0, 
                opacity: 1,
                boxShadow: "0 50px 100px rgba(0,0,0,0.3)"
            }}
        >
            <img 
                src={img} 
                className="w-full h-full object-cover pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt="Studio Output" 
            />
            <div className="absolute inset-0 border border-white/10 pointer-events-none" />
        </motion.div>
    );
};

const HybridGallery: React.FC = () => {
    const allImages = PROJECTS.flatMap(p => [p.imageUrl, ...(p.detailImages || [])]).slice(0, 20);
    
    const positions = [
        { top: '5%', left: '5%', rotate: -5, s: 0.9 },
        { top: '12%', left: '60%', rotate: 8, s: 1.1 },
        { top: '45%', left: '10%', rotate: -3, s: 1.0 },
        { top: '38%', left: '75%', rotate: 6, s: 0.85 },
        { top: '75%', left: '15%', rotate: -7, s: 1.2 },
        { top: '70%', left: '85%', rotate: 4, s: 0.95 },
        { top: '0%', left: '35%', rotate: 2, s: 1.05 },
        { top: '55%', left: '40%', rotate: -4, s: 0.9 },
        { top: '22%', left: '82%', rotate: 5, s: 1.15 },
        { top: '88%', left: '8%', rotate: -6, s: 1.0 },
        { top: '18%', left: '-5%', rotate: 3, s: 0.8 },
        { top: '62%', left: '92%', rotate: -5, s: 1.1 },
        { top: '32%', left: '38%', rotate: 7, s: 0.9 },
        { top: '92%', left: '55%', rotate: -2, s: 1.2 },
        { top: '-8%', left: '65%', rotate: 4, s: 0.95 },
        { top: '40%', left: '20%', rotate: 2, s: 1.05 },
        { top: '10%', left: '80%', rotate: -3, s: 0.85 },
        { top: '85%', left: '40%', rotate: 5, s: 1.1 },
        { top: '65%', left: '-10%', rotate: -4, s: 0.9 },
        { top: '20%', left: '110%', rotate: 6, s: 1.0 },
    ];

    return (
        <motion.div 
            className="absolute w-[300vw] h-[300vh] top-[-100vh] left-[-100vw] cursor-move z-10"
            drag
            dragConstraints={{ left: -1800, right: 900, top: -1800, bottom: 900 }}
            dragElastic={0.05}
        >
            {/* Global Drag Surface (the "sheet") */}
            <div className="absolute inset-0 bg-transparent z-0" />

            {/* Individual Movable Elements */}
            {allImages.map((img, i) => (
                <IndividualDraggable 
                    key={i} 
                    img={img} 
                    initialPos={positions[i] || { top: '50%', left: '50%', rotate: 0, s: 1 }} 
                />
            ))}
        </motion.div>
    );
};

const BrandHero: React.FC = () => {
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
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col pt-32 pb-16 bg-brand-offwhite text-brand-navy overflow-hidden"
        >
            {/* Immersive Gallery Layer */}
            <HybridGallery />

            {/* Studio Grid Overlay */}
            <div className="absolute inset-0 studio-grid pointer-events-none opacity-[0.03] z-20"></div>
            
            {/* Interactive Light */}
            <motion.div 
                style={{ 
                    x: useTransform(springX, [-0.5, 0.5], [100, -100]), 
                    y: useTransform(springY, [-0.5, 0.5], [100, -100]) 
                }}
                className="absolute inset-0 z-21 pointer-events-none opacity-20"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-purple/5 blur-[120px] rounded-full" />
            </motion.div>

            {/* Central Content */}
            <div className="container mx-auto px-6 md:px-8 relative z-30 flex-grow flex flex-col justify-center pointer-events-none">
                <div className="relative mb-16 md:mb-32">
                    <div className="pointer-events-auto inline-block">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            className="text-[14vw] md:text-[12.5vw] font-black uppercase leading-[0.8] tracking-tighter text-brand-navy break-words select-all"
                        >
                            BRAND STRATEGY
                        </motion.h1>
                    </div>
                    
                    <div className="flex justify-start items-baseline mt-2 md:mt-4 ml-[12vw] md:ml-[24vw] relative">
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                            className="text-brand-purple font-serif italic font-light text-[12vw] md:text-[11vw] leading-none absolute -left-[1em] top-[-0.05em] pointer-events-none"
                        >
                            &
                        </motion.span>
                        <div className="pointer-events-auto inline-block">
                            <motion.h1 
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                                className="text-[14vw] md:text-[12.5vw] font-black uppercase leading-[0.8] tracking-tighter text-brand-navy break-words select-all"
                            >
                                DESIGN POWER
                            </motion.h1>
                        </div>
                    </div>
                </div>

                {/* Meta Footer Section */}
                <div className="mt-auto pointer-events-auto">
                    {/* Drag hint relocated above the line */}
                    <div className="text-center mb-6">
                        <span className="font-mono text-[9px] uppercase tracking-[0.5em] opacity-40 font-bold text-brand-navy">
                            [ DRAG TO EXPLORE ]
                        </span>
                    </div>

                    <div className="w-full h-[1.5px] bg-brand-navy/80 mb-8 md:mb-10"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start text-brand-navy">
                        <div className="font-mono">
                            <span className="text-brand-purple uppercase tracking-[0.2em] text-[10px] font-bold block mb-3 md:mb-4">Est. 2024</span>
                            <div className="text-[10px] uppercase tracking-widest leading-loose font-bold opacity-70">
                                MOUNT MAUNGANUI<br/>NEW ZEALAND
                            </div>
                        </div>

                        <div className="md:text-center font-mono">
                             <span className="text-brand-purple uppercase tracking-[0.2em] text-[10px] font-bold block mb-3 md:mb-4">The Senior Unit</span>
                             <p className="text-[10px] uppercase tracking-widest font-bold leading-relaxed opacity-70 max-w-xs mx-auto">
                                A specialized senior unit for ambitious founders and agencies. Two experts. One system.
                             </p>
                        </div>

                        <div className="md:text-right font-mono">
                            <span className="text-brand-purple uppercase tracking-[0.2em] text-[10px] font-bold block mb-3 md:mb-4">Status</span>
                             <div className="flex items-center md:justify-end gap-3">
                                 <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse shadow-[0_0_8px_rgba(252,200,3,0.6)]"></span>
                                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Accepting Partners</span>
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
        <section className="border-t-2 border-brand-navy bg-brand-offwhite relative z-40 overflow-hidden">
            <div className="container mx-auto border-x border-brand-navy/10">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-brand-navy/10 flex flex-col justify-between">
                        <div>
                            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block">01 / The Thesis</span>
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.95] text-brand-navy break-words">
                                No Magic.<br/>
                                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1.5px #0F0328' }}>High-Res Logic.</span>
                            </h2>
                            {/* Adjusted Down Arrow size and position */}
                            <div className="mt-14 md:mt-20">
                                <DownArrow className="text-brand-purple" size={42} />
                            </div>
                        </div>
                        {/* Dots removed as requested */}
                    </div>

                    <div className="p-8 md:p-16 space-y-16 md:space-y-32">
                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy break-words">
                                Great taste is a discipline. We help ambitious organizations strip away the noise to uncover their <span className="text-brand-purple font-bold">soul</span> and express it with absolute precision.
                            </p>
                        </AnimatedSection>
                        
                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy break-words">
                                We sell <span className="text-brand-purple font-bold">clarity</span>. We believe that if you can't explain your strategy on a napkin, you don't have one worth executing.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection>
                            <p className="text-3xl md:text-5xl font-light leading-tight text-brand-navy break-words">
                                We provide the <span className="text-brand-purple font-bold">Design Power</span>. We don't just design the car; we build the engine and hand you the keys to drive it.
                            </p>
                        </AnimatedSection>

                        <div className="pt-8 md:pt-16">
                             <Link to="/about" className="inline-block border-2 border-brand-navy px-8 md:px-12 py-5 md:py-6 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300 text-brand-navy">
                                 Read the Protocol
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
        <section className="bg-brand-offwhite border-b-2 border-brand-navy relative z-40 overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-3">
                {SERVICE_LEGS.map((leg, index) => {
                    const titleParts = leg.title.match(/^(I Need)\s+(.*)$/i);
                    const prefix = titleParts ? titleParts[1] : 'I Need';
                    const mainTitle = titleParts ? titleParts[2] : leg.title;

                    return (
                        <Link 
                            key={leg.id}
                            to={leg.path}
                            className="group relative block min-h-[60vh] md:min-h-[70vh] border-b lg:border-b-0 lg:border-r border-brand-navy/10 p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:bg-brand-lavender transition-colors duration-500"
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
                                
                                <div className="mb-8 relative">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors block mb-2">
                                        {prefix}
                                    </span>
                                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-brand-navy group-hover:text-brand-offwhite transition-colors break-words">
                                        {mainTitle}
                                        <span className="text-brand-purple group-hover:text-brand-yellow transition-colors">.</span>
                                    </h2>
                                </div>
                                
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
            link: '/design-power'
        },
        { 
            id: '03', 
            title: 'Digital', 
            desc: 'Webflow Development & UI/UX', 
            img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            link: '/design-power'
        },
        { 
            id: '04', 
            title: 'Motion', 
            desc: '3D Visualization & Kinetic Type', 
            img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200',
            link: '/design-power'
        }
    ];

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section 
            className="bg-brand-navy text-brand-offwhite py-32 relative z-40 overflow-hidden" 
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-8 relative z-10">
                <div className="mb-24 flex items-end justify-between border-b border-brand-offwhite/20 pb-8">
                     <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9]">
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
                                <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity text-brand-offwhite">
                                    {cap.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
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

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-brand-offwhite px-6 md:px-8 py-32 relative z-40 border-b-2 border-brand-navy overflow-hidden">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.9]">
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

const LatestIntel: React.FC = () => {
    return (
        <section className="py-24 relative z-40 bg-brand-offwhite overflow-hidden">
             <div className="container mx-auto px-8">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
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
      <BrandHero />
      <SplitManifesto />
      <ServiceRouter />
      <CapabilityList />
      <ShowcaseGrid />
      <LatestIntel />
    </div>
  );
};

export default HomePage;
