import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';

const DownArrow: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => (
    <motion.div 
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={className}
    >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
    </motion.div>
);

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
        return PROJECTS.flatMap(p => [p.imageUrl, ...(p.detailImages || [])]).filter(Boolean);
    }, []);

    useEffect(() => {
        const handleMove = (clientX: number, clientY: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            if (
                clientX < rect.left || clientX > rect.right || 
                clientY < rect.top || clientY > rect.bottom
            ) return;

            const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y);

            if (dist > 90) {
                const nextImage = allImages[trailCount.current % allImages.length];
                const id = trailCount.current++;
                
                const relativeX = clientX - rect.left;
                const relativeY = clientY - rect.top;

                const newItem: TrailItem = {
                    id,
                    x: relativeX,
                    y: relativeY,
                    rotation: Math.random() * 12 - 6,
                    scale: 0.8 + Math.random() * 0.2,
                    img: nextImage
                };

                setTrail(prev => [...prev, newItem]);
                lastPos.current = { x: clientX, y: clientY };

                setTimeout(() => {
                    setTrail(prev => prev.filter(i => i.id !== id));
                }, 1200);
            }
        };

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [allImages, containerRef]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {trail.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.6, rotate: item.rotation }}
                        animate={{ opacity: 0.85, scale: item.scale, rotate: item.rotation }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                        className="absolute w-[200px] md:w-[320px] aspect-[4/5] overflow-hidden origin-center rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-brand-dark"
                        style={{ left: item.x, top: item.y, x: "-50%", y: "-50%" }}
                    >
                        <img src={item.img} alt="" className="w-full h-full object-cover" />
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

    const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set((e.clientX / innerWidth) - 0.5);
        mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-16 bg-cyber-bg overflow-hidden"
        >
            <div className="absolute inset-0 studio-grid pointer-events-none z-0"></div>
            <ImageTrail containerRef={sectionRef} />

            <motion.div 
                style={{ 
                    x: useTransform(springX, [-0.5, 0.5], [60, -60]), 
                    y: useTransform(springY, [-0.5, 0.5], [60, -60]) 
                }}
                className="absolute w-[70vw] h-[70vw] blur-glow rounded-full z-0 top-1/4 left-1/4 pointer-events-none"
            />

            <div className="container mx-auto px-6 md:px-12 relative z-20 flex-grow flex flex-col justify-center pointer-events-none w-full">
                <div className="max-w-7xl mx-auto w-full text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                    >
                        <div className="font-mono text-xs tracking-[0.3em] text-brand-purple uppercase font-bold">
                            // BOUTIQUE BRAND EXPERIMENTAL LAB
                        </div>
                        <h1 className="text-[10vw] md:text-[7vw] font-extrabold tracking-tight text-white leading-[0.95] max-w-5xl">
                            We transform emerging ideas into high-resolution visual systems.
                        </h1>
                        <p className="font-body text-lg md:text-2xl text-slate-400 font-light max-w-3xl pt-6 leading-relaxed">
                            A specialized creative cell built for visionary operators. No bloated agency management teams. Direct accountability, refined aesthetic clarity, and uncompromising execution rules.
                        </p>
                    </motion.div>
                </div>

                <div className="mt-auto w-full max-w-7xl mx-auto pt-16 flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-white/5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 gap-6">
                    <div>
                        <span className="text-brand-purple block mb-1">// COORDINATES</span>
                        MT MAUNGANUI, NEW ZEALAND
                    </div>
                    <div>
                        <span className="text-brand-purple block mb-1">// SYSTEM METRIC</span>
                        SYS_BOOT_V1.2 // RE-ENGAGED
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        <span className="text-slate-300 font-bold">ACCEPTING STRATEGIC SPOTS</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

const SplitManifesto: React.FC = () => {
    return (
        <section className="bg-cyber-bg border-t border-white/5 relative z-30 py-24 md:py-40">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.2em] text-xs font-bold mb-4 block">// THE MANIFESTO</span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            Design is only validation when backed by absolute truth.
                        </h2>
                    </div>

                    <div className="lg:col-span-7 space-y-12 md:space-y-20 font-light text-slate-400 text-xl md:text-3xl leading-relaxed">
                        <AnimatedSection>
                            <p>
                                Most teams chase contemporary cosmetic design cycles. We execute frameworks around <span className="text-white font-medium">functional logic</span>, filtering subjective feedback loops into structural business equity.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection>
                            <p>
                                If your brand positioning strategy cannot cleanly map out onto a simple interface canvas, you don't own an operational thesis. You own a temporary masking dynamic.
                            </p>
                        </AnimatedSection>
                        <div className="pt-6">
                            <Link to="/about" className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white border border-white/10 hover:border-brand-purple px-8 py-4 rounded-full bg-white/[0.02] transition-colors duration-300">
                                Verify Architecture Details <DownArrow className="rotate-[-90deg] text-brand-purple" size={14} />
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
        <section className="bg-cyber-bg border-t border-white/5 relative z-30">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
                {SERVICE_LEGS.map((leg, index) => (
                    <Link 
                        key={leg.id}
                        to={leg.path}
                        className="group relative block p-8 md:p-16 flex flex-col justify-between min-h-[50vh] hover:bg-white/[0.01] transition-colors duration-500"
                    >
                        <div className="space-y-12">
                            <div className="flex justify-between items-center font-mono text-xs text-slate-600">
                                <span>METRIC_0{index + 1}</span>
                                <span className="text-[10px] tracking-widest uppercase border border-white/10 px-2 py-1 rounded-sm">{leg.visual.split(',')[0]}</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight group-hover:text-brand-purple transition-colors duration-300">
                                    {leg.title.replace("Stop using generic templates", "Tasteful Visual Systems")}
                                </h3>
                                <p className="font-body text-base text-slate-400 font-light leading-relaxed">
                                    {leg.hoverText}
                                </p>
                            </div>
                        </div>

                        <div className="pt-12 flex items-center justify-between font-mono text-xs text-brand-purple group-hover:text-white transition-colors">
                            <span>EXPLORE INTERFACE</span>
                            <span className="transform group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

const FeatureSpotlight: React.FC = () => {
    const featuredProject = PROJECTS[0]; 

    return (
        <section className="relative bg-brand-dark overflow-hidden group border-t border-white/5 z-30">
            <Link to={`/work/${featuredProject.slug}`} className="block relative min-h-[80vh] md:min-h-[100vh]">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-25 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-cyber-bg/40 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-20">
                    <div className="container mx-auto max-w-7xl w-full">
                        <div className="max-w-4xl space-y-6">
                            <span className="font-mono text-brand-purple uppercase tracking-[0.2em] text-xs font-bold block">
                                // ARCHIVAL RECORDED WORK_01
                            </span>
                            <h2 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white leading-none">
                                {featuredProject.title}
                            </h2>
                            <p className="font-body text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                                {featuredProject.description}
                            </p>
                            <div className="pt-4">
                                <span className="inline-flex font-mono text-xs uppercase tracking-widest text-white border-b border-brand-purple pb-1 font-bold group-hover:border-white transition-colors">
                                    Deconstruct Case Architecture &rarr;
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    );
};

const CapabilityList: React.FC = () => {
    const capabilities = [
        { id: '01', title: 'Strategy Architecture', desc: 'Surgical Positioning, Value Messaging Systems, & Technical Core Playbooks', link: '/clarity' },
        { id: '02', title: 'Identity Engines', desc: 'Visual Telemetry systems, Distinct Mark systems, Layout Systems, & Typography Strategy', link: '/design-power' },
        { id: '03', title: 'Digital Gateways', desc: 'Custom Micro-Interactions, Structured Performance Webflow & Framer System Engineering', link: '/design-power' },
        { id: '04', title: 'Kinetic Assets', desc: '3D High-Res Product Visualization, Dynamic Lighting Models, Motion Systems', link: '/design-power' }
    ];

    return (
        <section className="bg-cyber-bg border-t border-white/5 py-24 md:py-40 relative z-30">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 gap-4">
                     <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        Operational Outputs.
                     </h2>
                     <span className="font-mono text-xs uppercase tracking-widest text-slate-500">// CAPABILITY FIELDS</span>
                </div>

                <div className="flex flex-col border-t border-white/5">
                    {capabilities.map((cap, index) => (
                        <Link 
                            key={index}
                            to={cap.link}
                            className="group border-b border-white/5 py-8 md:py-12 flex flex-col lg:flex-row justify-between lg:items-center gap-4 hover:bg-white/[0.005] transition-colors duration-300"
                        >
                            <div className="flex items-center gap-6 md:gap-12">
                                <span className="font-mono text-xs text-brand-purple font-bold">/{cap.id}</span>
                                <h3 className="text-2xl md:text-4xl font-medium text-white transition-transform duration-300 group-hover:translate-x-2">
                                    {cap.title}
                                </h3>
                            </div>
                            <span className="font-body text-sm md:text-base text-slate-400 font-light max-w-xl lg:text-right">
                                {cap.desc}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-cyber-bg border-t border-white/5 py-24 md:py-40 relative z-30">
             <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-20 gap-6">
                     <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        Selected Cases
                     </h2>
                     <Link to="/work" className="inline-flex font-mono text-xs uppercase tracking-widest text-white border border-white/10 hover:border-brand-purple px-6 py-3 rounded-full transition-colors bg-white/[0.01]">
                        Archival Log Database
                     </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
                    {PROJECTS.slice(1, 7).map((project, index) => (
                        <div key={project.id} className={`space-y-6 ${index % 2 === 1 ? 'md:translate-y-16' : ''}`}>
                             <div className="overflow-hidden rounded-lg border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                                 <ProjectCard project={project} className="aspect-[4/3] w-full" />
                             </div>
                             <div className="flex justify-between items-start pt-2 font-mono">
                                <div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">{project.title}</h3>
                                    <span className="text-[10px] uppercase tracking-widest text-brand-purple font-bold mt-1 block">{project.category}</span>
                                </div>
                                <span className="text-[11px] text-slate-600 font-bold">{project.year}</span>
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
        <section className="py-24 bg-cyber-bg border-t border-white/5 relative z-30">
             <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                 <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-6">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Studio Intelligence</h3>
                    <Link to="/journal" className="font-mono text-xs uppercase tracking-widest text-brand-purple hover:text-white transition-colors font-bold">Show Matrix &rarr;</Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5 rounded-lg overflow-hidden bg-white/[0.01]">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} className="group block p-8 hover:bg-white/[0.01] transition-all duration-300 space-y-6">
                             <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block">{post.date}</span>
                             <h4 className="text-2xl font-semibold text-white group-hover:text-brand-purple transition-colors duration-300 leading-tight min-h-[2.5em]">
                                 {post.title}
                             </h4>
                             <p className="font-body text-sm text-slate-400 font-light leading-relaxed line-clamp-3 pt-2">
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
    <div className="bg-cyber-bg min-h-screen">
      <BrandHero />
      <SplitManifesto />
      <ServiceRouter />
      <FeatureSpotlight />
      <CapabilityList />
      <ShowcaseGrid />
      <LatestIntel />
    </div>
  );
};

export default HomePage;