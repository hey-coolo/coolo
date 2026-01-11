import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 1. PRELOADER (DO NOT TOUCH) ---
const ProjectReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
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

// --- 2. HERO SECTION (DO NOT TOUCH) ---
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
                    <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-offwhite mb-12 mix-blend-overlay opacity-90">
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

// --- 3. NEW EDITORIAL SECTION (Clean Scrolling Gallery) ---
const EditorialSection: React.FC<{ 
    step: string; 
    title: string; 
    text: string; 
    images: string[];
    inverted?: boolean;
}> = ({ step, title, text, images, inverted = false }) => {
    if (!text) return null;

    return (
        <section className="py-24 md:py-40 border-b border-brand-navy/5">
            <div className="container mx-auto px-6 md:px-8">
                <div className={`flex flex-col ${inverted ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24`}>
                    
                    {/* TEXT COLUMN - Sticky behavior for better reading experience */}
                    <div className="md:w-1/3 flex flex-col pt-8 md:sticky md:top-32 md:h-fit">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="font-mono text-brand-purple text-xs font-bold border border-brand-purple px-2 py-1 rounded-full">
                                    {step}
                                </span>
                                <span className="font-mono text-brand-navy/40 text-xs uppercase tracking-widest">
                                    Phase
                                </span>
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-8 uppercase tracking-tight leading-[0.9]">
                                {title}
                            </h2>
                            
                            <p className="font-body text-lg md:text-xl text-brand-navy/80 leading-relaxed">
                                {text}
                            </p>
                        </motion.div>
                    </div>

                    {/* IMAGES COLUMN - Natural Aspect Ratios (No Cropping) */}
                    <div className="md:w-2/3 flex flex-col gap-12 md:gap-24">
                        {images && images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="w-full bg-brand-navy/5" 
                            >
                                {/* w-full + h-auto ensures NO cropping */}
                                <img 
                                    src={img} 
                                    alt={`${title} detail ${i}`} 
                                    className="w-full h-auto shadow-2xl block" 
                                />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

// --- 4. RESULTS SECTION (High Impact) ---
const ResultsSection: React.FC<{ gain: string }> = ({ gain }) => {
    if (!gain) return null;
    return (
        <section className="py-40 bg-brand-navy text-brand-offwhite relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50" />
             <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-12 block">
                        04 / The Outcome
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-tight max-w-5xl mx-auto text-brand-offwhite">
                        "{gain}"
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};

// --- 5. MASONRY GALLERY (For Process Images) ---
const MasonryGallery: React.FC<{ images: string[] }> = ({ images }) => {
    if (!images || images.length === 0) return null;
    
    return (
        <section className="py-32 bg-brand-offwhite border-t border-brand-navy/5">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-24">
                    <h3 className="text-brand-navy font-black text-5xl md:text-8xl uppercase tracking-tighter opacity-10">
                        Process
                    </h3>
                    <p className="font-mono text-brand-navy text-xs uppercase tracking-widest -mt-6 ml-2">
                        Archive // {images.length} Assets Found
                    </p>
                </div>

                {/* CSS Columns for true Masonry layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            className="break-inside-avoid"
                        >
                            <div className="group relative overflow-hidden bg-brand-navy/5">
                                <img 
                                    src={img} 
                                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 ease-out block" 
                                    alt="Process" 
                                />
                                <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 6. NEXT PROJECT (DO NOT TOUCH) ---
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

  // --- IMAGE LOGIC (Distribute images across sections) ---
  const details = project.detailImages || [];
  const allVisuals = details.length > 0 ? details : [project.imageUrl];
  
  // Split logic: Divide images roughly into 3 parts for the 3 sections
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
        
        {/* NEW LAYOUT: Editorial Sections */}
        
        <EditorialSection 
            step="01"
            title="The Goal" 
            text={goal} 
            images={goalImages.length > 0 ? goalImages : [project.imageUrl]} 
            inverted={false}
        />

        {gap && (
            <EditorialSection 
                step="02"
                title="The Gap" 
                text={gap} 
                images={gapImages.length > 0 ? gapImages : [project.imageUrl]} 
                inverted={true}
            />
        )}

        {gamble && (
            <EditorialSection 
                step="03"
                title="The Gamble" 
                text={gamble} 
                images={gambleImages.length > 0 ? gambleImages : [project.imageUrl]} 
                inverted={false}
            />
        )}

        <ResultsSection gain={gain} />

        {processImages && processImages.length > 0 && (
            <MasonryGallery images={processImages} />
        )}
    
        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;