import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const DownArrow: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 42 }) => (
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
                e.stopPropagation(); 
                setZIndex(100);
            }}
            onDragEnd={() => setZIndex(10 + Math.floor(Math.random() * 5))}
            className="absolute w-[220px] md:w-[380px] aspect-[4/5] shadow-2xl cursor-grab active:cursor-grabbing group overflow-hidden border border-brand-navy/5 bg-white"
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
                opacity: 0.85, 
                transition: { duration: 1, delay: Math.random() * 0.5 } 
            }}

            whileHover={{ 
                opacity: 1, 
                scale: initialPos.s * 1.02, 
                zIndex: 110,
                transition: { duration: 0.2 }

            }}
            whileDrag={{ 
                scale: initialPos.s * 1.05, 
                rotate: 0, 
                opacity: 1,
                boxShadow: "0 40px 80px rgba(15,3,40,0.2)"
            }}

        >

            <img 
                src={img} 
                className="w-full h-full object-cover pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt="" 
            />
        </motion.div>
    );
};

const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    const baseImages = project.detailImages || [project.imageUrl];
    const images = [...baseImages, ...baseImages, ...baseImages, ...baseImages, ...baseImages].slice(0, 32); 
    const positions = Array.from({ length: 32 }).map((_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        rotate: Math.random() * 20 - 10,
        s: 0.8 + Math.random() * 0.5
    }));

    return (
        <div className="relative h-screen w-full overflow-hidden bg-brand-offwhite">
            <motion.div 
                className="absolute w-[300vw] h-[300vh] top-[-100vh] left-[-100vw] cursor-move z-10"
                drag
                dragConstraints={{ left: -1800, right: 900, top: -1800, bottom: 900 }}
                dragElastic={0.05}
            >
                <div className="absolute inset-0 bg-transparent z-0" />

                {images.map((img, i) => (
                    <IndividualDraggable 
                        key={i} 
                        img={img} 
                        initialPos={positions[i]} 
                    />
                ))}
            </motion.div>

            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-50 p-6">
                <div className="text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-6 block text-brand-purple"
                    >

                        Case Study {project.id.toString().padStart(2, '0')}

                    </motion.span>
                  
                    <div className="pointer-events-auto inline-block">
                        <motion.h1 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            className="text-[16vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-navy break-words max-w-[95vw] select-all"
                        >
    
                            {project.title}
                        </motion.h1>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 font-mono text-[10px] md:text-sm uppercase tracking-widest text-brand-navy/40 font-bold">
                        <span>{project.year}</span>
                        <span className="opacity-20">//</span>
                        <span>{project.category}</span>
                    </div>
                </div>
                <div className="absolute bottom-12 flex flex-col items-center gap-4 pointer-events-none">
                    <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-brand-navy/30 font-bold bg-white/50 backdrop-blur-sm px-4 py-2">
                        [ TOSS IMAGES TO EXPLORE ]
                    </span>
                </div>
            </div>
        </div>
    )
}

const NarrativeSection: React.FC<{ 
    step: string, 
    title: string, 
    content: string, 
    images?: string[], 
    isDark?: boolean 
}> = ({ step, title, content, images, isDark }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

    return (
        <section ref={ref} className={`py-32 md:py-48 overflow-hidden ${isDark ? 'bg-brand-navy text-brand-offwhite' : 'bg-brand-offwhite text-brand-navy'}`}>
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4 lg:sticky lg:top-32 lg:h-max">
                        <motion.div style={{ opacity, y }}>
                            <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-bold block mb-4 text-brand-purple`}>
                                {step}
                            </span>
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12 break-words">
                                {title}
                            </h2>
                            {step.includes("01") && (
                                <div className="mt-8">
                                    <DownArrow className="text-brand-purple" />
                                </div>
                            )}
                        </motion.div>
                    </div>
                    <div className="lg:col-span-8">
                        <motion.p 
                            style={{ opacity }}
                            className={`font-body text-xl md:text-4xl leading-tight font-light mb-16 break-words ${isDark ? 'text-brand-offwhite/80' : 'text-brand-navy/80'}`}
                        >
                            {content}
                        </motion.p>
                        
                        {images && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {images.map((img, i) => (
                                    <div key={i} className={`overflow-hidden shadow-2xl ${i % 2 === 1 ? 'md:mt-16' : ''} bg-brand-navy/5`}>
                                        <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

const ProcessGallery: React.FC<{ images: string[], onImageSelect: (img: string) => void }> = ({ images, onImageSelect }) => {
    // Duplicate images for the "messy" volume feel
    const displayImages = [...images, ...images].slice(0, 8); 

    return (
        <section className="py-32 md:py-48 bg-brand-offwhite relative z-10">
            <div className="container mx-auto px-6 md:px-8">
                
                {/* Header */}
                <div className="mb-24 md:mb-32 max-w-3xl">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block">
                        Visual Audit // Raw Process
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.9]">
                        The Messy Middle
                    </h2>
                </div>

                {/* MASONRY LAYOUT */}
                <div className="columns-1 md:columns-2 gap-8 md:gap-12 space-y-8 md:space-y-12">
                    {displayImages.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i % 2 === 0 ? 0 : 0.2 }}
                            onClick={() => onImageSelect(img)}
                            className="relative break-inside-avoid cursor-pointer group mb-8 md:mb-12"
                        >
                            {/* CHANGE: Removed 'bg-white', 'p-2', and 'md:p-4'.
                                Added 'overflow-hidden' to keep corners sharp or clean.
                            */}
                            <div className="shadow-2xl bg-brand-navy/5 overflow-hidden">
                                <img 
                                    src={img} 
                                    // 'w-full h-auto' ensures original ratio with NO cropping
                                    className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
                                    alt="Process detail" 
                                />
                                
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-1">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-navy/60">
                                    Fig. {i + 1}
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-purple">
                                    [View Full Res]
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

 useEffect(() => {
  if (!selectedImage) return;

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedImage(null);
  };

  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', handleEsc);

  return () => {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleEsc);
  };
}, [selectedImage]);

  if (currentIndex === -1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite text-brand-navy overflow-hidden">
        <div className="text-center p-6">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight">Missing_Data</h1>
            <Link to="/work" className="font-mono uppercase text-brand-purple mt-8 block tracking-widest text-xs">Return to Archives &rarr;</Link>
        </div>
      </div>
    );
  }
  
  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const story = project.story || {
      goal: project.challenge || "Define the mission.",
      gap: "The messy middle where strategy meets execution.",
      gamble: "The pivot point. The risk we took.",
      gain: project.outcome || "The impact.",
      processImages: project.detailImages?.slice(0,3) || []
  };

  return (
    <div className="bg-brand-offwhite text-brand-navy min-h-screen">
      <ProjectHero project={project} />
      <NarrativeSection 
        step="01 The Goal"
        title="Call to Adventure"
        content={story.goal}
        isDark={false}
      />

      <ProcessGallery images={story.processImages} onImageSelect={setSelectedImage} />
 
      <NarrativeSection 
        step="02 The Gap"
        title="The Struggle"
        content={story.gap}
        isDark={true}
      />

      <NarrativeSection 
        step="03 The Gamble"
        title="The Pivot"
        content={story.gamble}
        images={project.detailImages?.slice(0, 2)}
        isDark={false}
      />

      <section className="py-24 md:py-48 bg-brand-yellow text-brand-navy overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold mb-8 block">04 The Gain / Impact</span>
              <h2 className="text-3xl md:text-5xl lg:text-[4vw] font-black uppercase tracking-tighter leading-[1.1] max-w-4xl mx-auto break-words">
                  {story.gain}
              </h2>
             
              <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-brand-navy/10 pt-12">
                  <div className="text-center">
                      <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Role</div>
                      <div className="font-bold text-lg md:text-xl uppercase">{project.role}</div>
                  </div>
                  <div className="text-center">
                      <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Year</div>
                      <div className="font-bold text-lg md:text-xl">{project.year}</div>
                  </div>
                  <div className="text-center md:col-span-2">
                      <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Stack</div>
                      <div className="font-bold text-lg md:text-xl flex flex-wrap justify-center gap-4">
                          {project.tags.map(t => <span key={t} className="uppercase tracking-widest">{t}</span>)}
                      </div>
                  </div>
              </div>
          </div>
      </section>

        
      <section className="bg-brand-navy py-48 md:py-64 relative overflow-hidden group">
        <Link to={`/work/${nextProject.slug}`} className="block relative z-10 text-center p-6">
            <span className="font-mono text-brand-offwhite/50 uppercase tracking-[0.5em] text-[10px] md:text-xs font-black">Next Case File</span>
            <h3 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter text-brand-offwhite mt-8 md:mt-12 transition-transform duration-1000 group-hover:scale-95 group-hover:text-brand-yellow break-words">
                {nextProject.title} &rarr;
            </h3>
        </Link>
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             <img src={nextProject.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
      </section>

      {/* GLOBAL MODAL - Truly fixed to the viewport eyes */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[99999] bg-brand-navy/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
               <motion.div 
                    initial={{ scale: 0.85, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 30 }}
                    transition={{ type: 'spring', damping: 35, stiffness: 250 }}
                    className="relative w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative flex flex-col items-center">
                        <img 
                            src={selectedImage} 
                            className="w-auto h-auto max-w-[90vw] max-h-[80vh] shadow-[0_60px_180px_rgba(0,0,0,0.8)] border border-white/5 block mx-auto" 
                            alt="High Res Detail" 
                        />
                       <div className="w-full max-w-[90vw] mt-8 flex flex-col md:flex-row justify-between items-center gap-6 px-4">
                            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/40 font-bold">
                                Source Inspection // Studio Capture Protocol
                            </div>
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="font-mono text-[11px] uppercase tracking-widest text-brand-yellow font-black border-b-2 border-brand-yellow pb-1 hover:text-brand-offwhite hover:border-brand-offwhite transition-all"
                            >

                                CLOSE_DOSS_ [ESC]
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
   </div>
  );
};

export default ProjectPage;
