import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 1. CINEMATIC REVEAL LOADER (Inverted: Big Solid -> Small Logo) ---
const ProjectReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            // Fade out the small logo at the end of the sequence
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.4, ease: "easeOut" }} 
            onAnimationComplete={onComplete}
        >
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <mask id="logo-mask">
                        {/* 1. Black Background = Transparent (Reveals the Page) */}
                        <rect x="0" y="0" width="100" height="100" fill="black" />
                        
                        {/* 2. White Shapes = Opaque (Shows the Overlay Color) */}
                        <g transform="translate(50 50)">
                            <motion.g
                                initial={{ scale: 60 }} // Start Huge (Covers Screen)
                                animate={{ scale: 1 }}  // Shrink to Logo Size
                                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            >
                                {/* Left Pill */}
                                <rect x="-12" y="-40" width="10" height="80" rx="5" fill="white" />
                                
                                {/* Right Pill */}
                                <rect x="2" y="-40" width="10" height="80" rx="5" fill="white" />

                                {/* GAP FILLER: Ensures total coverage at start, then splits open */}
                                <motion.rect 
                                    x="-2" y="-40" width="4" height="80" fill="white"
                                    initial={{ scaleX: 1 }}
                                    animate={{ scaleX: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </motion.g>
                        </g>
                    </mask>
                </defs>

                {/* The Visible Overlay Layer (Brand Off-White) */}
                <rect 
                    x="0" y="0" width="100" height="100" 
                    fill="#F7F7F7" 
                    mask="url(#logo-mask)" 
                />
            </svg>
        </motion.div>
    );
};

// --- 2. IMAGE COMPONENTS ---

// Type A: The "Cinema" Image (Full Width, Parallax, High Impact)
const CinemaImage: React.FC<{ src: string }> = ({ src }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); 
    
    return (
        <div ref={ref} className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden relative shadow-2xl my-12">
            <motion.div style={{ y, scale: 1.1 }} className="w-full h-full">
                <img src={src} className="w-full h-full object-cover" alt="" />
            </motion.div>
        </div>
    );
};

// Type B: The "Scatter" Image (Smaller, Static Scroll, Float Hover)
const ScatterImage: React.FC<{ src: string; align: 'left' | 'right' }> = ({ src, align }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`w-3/4 md:w-2/3 aspect-[4/5] md:aspect-square overflow-hidden relative shadow-lg bg-brand-navy/5 ${align === 'right' ? 'self-end' : 'self-start'}`}
        >
            <motion.div 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.6 }}
                className="w-full h-full"
            >
                <img src={src} className="w-full h-full object-cover" alt="" />
            </motion.div>
        </motion.div>
    );
};

// --- 3. STICKY SCROLL SECTION (Rhythmic Layout) ---
const StickyScrollSection: React.FC<{ 
    title: string; 
    text: string; 
    images: string[]; 
    align?: 'left' | 'right' 
}> = ({ title, text, images, align = 'left' }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="container mx-auto px-6 md:px-8 py-32 relative">
            <div className={`flex flex-col md:flex-row gap-16 md:gap-32 relative items-start ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* STICKY TEXT COLUMN */}
                <div className="md:w-1/3 md:sticky md:top-0 md:h-screen flex flex-col justify-center py-12 md:py-0 z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-8 block border-l-2 border-brand-purple pl-4">
                            {title}
                        </span>
                        <p className="font-body text-xl md:text-3xl leading-tight font-light text-brand-navy">
                            {text}
                        </p>
                    </motion.div>
                </div>

                {/* SCROLLING IMAGE STREAM (Rhythmic Grid) */}
                <div className="md:w-2/3 flex flex-col gap-24 py-12 md:py-32 w-full">
                    {images.map((img, i) => {
                        // RHYTHM LOGIC: 0=Cinema, 1=Left, 2=Right
                        const position = i % 3;
                        if (position === 0) {
                            return <CinemaImage key={i} src={img} />;
                        } else {
                            return <ScatterImage key={i} src={img} align={position === 1 ? 'left' : 'right'} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); 
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-brand-navy">
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img src={project.imageUrl} className="w-full h-full object-cover opacity-60" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-navy/90" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    <span className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-bold mb-8 block">
                        Case Study {project.id.toString().padStart(2, '0')}
                    </span>
                    <h1 className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-offwhite mb-12 mix-blend-overlay opacity-90">
                        {project.title}
                    </h1>
                    
                    <div className="grid grid-cols-3 max-w-2xl mx-auto border-t border-brand-offwhite/30 pt-8 gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-brand-offwhite/80">
                        <div><span className="block text-brand-purple font-bold mb-2">Client</span>{project.client}</div>
                        <div><span className="block text-brand-purple font-bold mb-2">Role</span>{project.role}</div>
                        <div><span className="block text-brand-purple font-bold mb-2">Year</span>{project.year}</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ProcessGallery: React.FC<{ images: string[] }> = ({ images }) => {
    if (!images || images.length === 0) return null;
    return (
        <div className="py-32 bg-brand-navy text-brand-offwhite relative z-20">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-32 border-b border-brand-offwhite/10 pb-8 flex flex-col md:flex-row justify-between md:items-end gap-8">
                    <h3 className="font-sans text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                        The<br/><span className="text-brand-purple">Mess.</span>
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 text-right">
                        Raw Output // Archive 01-{images.length}
                    </span>
                </div>
                
                <div className="columns-1 md:columns-3 gap-4 space-y-4">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid overflow-hidden mb-4"
                        >
                            <img src={img} className="w-full h-auto object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700" alt="" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const NextProject: React.FC<{ project: any }> = ({ project }) => (
    <Link to={`/work/${project.slug}`} className="block relative h-screen overflow-hidden group bg-brand-navy z-20">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-1000 ease-out">
            <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-offwhite z-10 p-8 text-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4 block text-brand-yellow">Next Case File</span>
                <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform duration-1000 ease-[0.19,1,0.22,1]">
                    {project.title}
                </h2>
                <div className="mt-12 overflow-hidden">
                    <span className="inline-block font-mono text-sm uppercase tracking-widest border-b border-brand-yellow pb-1 text-brand-yellow transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        Open Dossier
                    </span>
                </div>
            </motion.div>
        </div>
    </Link>
);

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isRevealing, setIsRevealing] = useState(true); 
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

  useEffect(() => {
      window.scrollTo(0, 0);
      setIsRevealing(true);
  }, [slug]);

  if (currentIndex === -1) return (
      <div className="min-h-screen flex items-center justify-center bg-brand-navy text-brand-offwhite">
          <h1 className="text-4xl font-mono uppercase">Case File Missing</h1>
      </div>
  );
  
  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  
  const { goal, gap, gamble, gain, processImages } = project.story || {
      goal: project.description,
      gap: "",
      gamble: "",
      gain: "",
      processImages: []
  };

  // --- IMAGE LOGIC ---
  const details = project.detailImages || [];
  // Use all visuals available, looping if necessary to fill the rhythm
  const allVisuals = details.length > 0 ? details : [project.imageUrl];
  
  const chunkSize = Math.ceil(allVisuals.length / 3);
  
  const goalImages = allVisuals.slice(0, chunkSize);
  const gapImages = allVisuals.slice(chunkSize, chunkSize * 2);
  const gambleImages = allVisuals.slice(chunkSize * 2);

  return (
    <>
      <AnimatePresence>
        {isRevealing && <ProjectReveal onComplete={() => setIsRevealing(false)} />}
      </AnimatePresence>

      <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
        
        <ProjectHero project={project} />
        
        <StickyScrollSection 
            title="01 / The Goal" 
            text={goal} 
            images={goalImages.length > 0 ? goalImages : [project.imageUrl]} 
            align="left"
        />

        {gap && (
            <StickyScrollSection 
                title="02 / The Gap" 
                text={gap} 
                images={gapImages.length > 0 ? gapImages : [project.imageUrl]} 
                align="right"
            />
        )}

        {gamble && (
            <StickyScrollSection 
                title="03 / The Gamble" 
                text={gamble} 
                images={gambleImages.length > 0 ? gambleImages : [project.imageUrl]} 
                align="left"
            />
        )}

        {gain && (
            <div className="min-h-[60vh] flex items-center justify-center bg-brand-navy text-brand-offwhite">
                <div className="container mx-auto px-6 md:px-8 text-center">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block">04 / The Gain</span>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.9]">
                        {gain}
                    </h2>
                </div>
            </div>
        )}

        <ProcessGallery images={processImages} />

        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;