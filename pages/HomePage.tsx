import React, { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Image as DreiImage, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
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

// --- 3D COMPONENTS ---

// Helper to generate random points on a sphere surface
function getSpherePoint(radius: number) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    
    // Convert spherical to cartesian
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    return [x, y, z] as [number, number, number];
}

const FloatingImage3D = ({ img, position, rotation }: { img: string, position: [number, number, number], rotation: [number, number, number] }) => {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Subtle floating independent of the group rotation
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={meshRef} position={position} rotation={rotation}>
                <DreiImage 
                    url={img} 
                    scale={hovered ? [4.5, 6] : [3, 4]} // Scale up on hover
                    transparent 
                    opacity={hovered ? 1 : 0.7}
                    onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
                    side={THREE.DoubleSide}
                />
            </group>
        </Float>
    );
};

const ImageRing = () => {
    const groupRef = useRef<THREE.Group>(null);

    // 1. Gather and shuffle images
    const images = useMemo(() => {
        const all = PROJECTS.flatMap(p => [p.imageUrl, ...(p.detailImages || [])]).filter(Boolean);
        // Shuffle
        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
        }
        return all.slice(0, 30); // Use top 30 images
    }, []);

    // 2. Generate positions on a sphere
    const items = useMemo(() => {
        return images.map((img) => {
            const radius = 12 + Math.random() * 4; // Random radius between 12 and 16
            const position = getSpherePoint(radius);
            
            // Look at center (0,0,0) roughly
            const dummy = new THREE.Vector3(...position);
            const look = dummy.clone().normalize().multiplyScalar(radius + 1); // target slightly outside
            const matrix = new THREE.Matrix4();
            matrix.lookAt(dummy, new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0));
            const euler = new THREE.Euler();
            euler.setFromRotationMatrix(matrix);
            
            return {
                img,
                position,
                rotation: [euler.x, euler.y, euler.z] as [number, number, number]
            };
        });
    }, [images]);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Slow continuous rotation of the entire ring
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {items.map((item, i) => (
                <FloatingImage3D 
                    key={i} 
                    img={item.img} 
                    position={item.position} 
                    rotation={item.rotation} 
                />
            ))}
        </group>
    );
};

const BrandHero: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set((e.clientX / innerWidth) - 0.5);
        mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            className="relative h-screen flex flex-col bg-brand-offwhite text-brand-navy overflow-hidden"
        >
            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 22], fov: 45 }} dpr={[1, 2]}>
                    {/* Lighting */}
                    <ambientLight intensity={0.8} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={1} />
                    
                    {/* The Content */}
                    <ImageRing />
                    
                    {/* Environment for better reflections/lighting */}
                    <Environment preset="city" />
                    
                    {/* Controls: Auto-rotate OFF so user drag feels better, or keep auto-rotate on OrbitControls */}
                    <OrbitControls 
                        enablePan={false} 
                        enableZoom={true} 
                        minDistance={10} 
                        maxDistance={40}
                        zoomSpeed={0.5}
                        rotateSpeed={0.5}
                        dampingFactor={0.05}
                    />
                </Canvas>
            </div>

            {/* Studio Grid Overlay */}
            <div className="absolute inset-0 studio-grid pointer-events-none opacity-[0.03] z-0"></div>
            
            {/* Central Content (Overlay) - Needs pointer-events-none to allow drag on canvas */}
            <div className="container mx-auto px-6 md:px-8 relative z-20 flex-grow flex flex-col justify-center pointer-events-none h-full">
                <div className="relative flex flex-col justify-center h-full">
                    {/* Top Content */}
                    <div className="flex flex-col justify-center items-center mt-[-10vh]">
                        <div className="pointer-events-auto inline-block mix-blend-multiply">
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                                className="text-[14vw] md:text-[12.5vw] font-black uppercase leading-[0.8] tracking-tighter text-brand-navy break-words select-all text-center"
                            >
                                BRAND STRATEGY
                            </motion.h1>
                        </div>
                        
                        <div className="flex justify-center items-baseline mt-2 md:mt-4 relative mix-blend-multiply">
                            <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                                className="text-brand-purple font-serif italic font-light text-[12vw] md:text-[11vw] leading-none mr-4 md:mr-8"
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

                    {/* Bottom Hint */}
                    <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
                        <span className="font-mono text-[9px] uppercase tracking-[0.5em] opacity-60 font-bold text-brand-navy bg-brand-offwhite/50 px-4 py-2 backdrop-blur-sm rounded-full">
                            [ DRAG & ZOOM TO EXPLORE ]
                        </span>
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
                            <div className="mt-14 md:mt-20">
                                <DownArrow className="text-brand-purple" size={42} />
                            </div>
                        </div>
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
