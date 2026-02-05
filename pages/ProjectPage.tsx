import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// --- 1. PRELOADER ---
const ProjectReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none bg-brand-navy"
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.0, ease: "easeOut" }} 
            onAnimationComplete={onComplete}
        >
            <div className="font-mono text-white text-xs uppercase tracking-widest animate-pulse">
                LOADING_CASE_FILE...
            </div>
        </motion.div>
    );
};

// --- 2. HERO SECTION (Video Support) ---
const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); 
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-brand-navy">
            
            {/* Background Layer: Video or Image */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                {project.videoUrl ? (
                    <video 
                        src={project.videoUrl}
                        className="w-full h-full object-cover opacity-60 grayscale contrast-125"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                    />
                ) : (
                    <img 
                        src={project.imageUrl} 
                        className="w-full h-full object-cover opacity-60 grayscale contrast-125" 
                        alt={project.title}
                        loading="eager"
                        decoding="sync"
                    />
                )}
                {/* Vintage Noise & Scanlines for Hero */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-navy/90" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block bg-brand-yellow text-brand-navy px-2 py-1 font-mono uppercase tracking-[0.2em] text-xs font-bold mb-8 shadow-md">
                        Case Study {project.id.toString().padStart(2, '0')}
                    </span>
                    <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-offwhite mb-12 mix-blend-hard-light">
                        {project.title}
                    </h1>
                    
                    {/* Dossier Data Block */}
                    <div className="inline-flex flex-col md:flex-row border-2 border-brand-offwhite/30 bg-brand-navy/50 backdrop-blur-md p-4 md:p-6 gap-8 md:gap-16 font-mono text-[10px] md:text-xs uppercase tracking-widest text-brand-offwhite">
                        <div className="text-left">
                            <span className="block text-brand-yellow font-bold mb-1">Client</span>
                            {project.client}
                        </div>
                        <div className="text-left">
                            <span className="block text-brand-yellow font-bold mb-1">Role</span>
                            {project.role}
                        </div>
                        <div className="text-left">
                            <span className="block text-brand-yellow font-bold mb-1">Year</span>
                            {project.year}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// --- 3. MODAL (SAFE MODE) ---
const ImageModal: React.FC<{ src: string | null; onClose: () => void }> = ({ src, onClose }) => {
    return ReactDOM.createPortal(
        <AnimatePresence>
            {src && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[99999] bg-brand-navy/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full h-full flex items-center justify-center pointer-events-none"
                    >
                        <div 
                            className="relative flex flex-col items-center pointer-events-auto"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <img 
                                src={src} 
                                className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain border-2 border-white shadow-2xl" 
                                alt="Full Resolution" 
                            />
                            <div className="w-full mt-6 flex justify-center">
                                <button 
                                    onClick={onClose}
                                    className="bg-brand-yellow text-brand-navy px-4 py-2 font-mono text-[11px] uppercase tracking-widest font-black hover:bg-white transition-colors"
                                >
                                    [ ESC ] CLOSE_VIEW
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

// --- 4. AGENCY BRIEF (Dossier Style) ---
const ProjectBrief: React.FC<{ project: any }> = ({ project }) => {
    const MetaRow = ({ label, value }: { label: string, value: string }) => (
        <div className="flex justify-between items-baseline border-b-2 border-brand-navy/10 py-3 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-brand-navy text-white px-1 font-bold">{label}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold text-right">{value}</span>
        </div>
    );

    return (
        <section className="py-24 md:py-32 bg-[#EAEAEA] relative z-20">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* LEFT: Title */}
                    <div className="lg:col-span-4">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.9] lg:sticky lg:top-32"
                        >
                            {project.title}
                        </motion.h2>
                    </div>

                    {/* RIGHT: Data & Desc */}
                    <div className="lg:col-span-8 flex flex-col gap-16">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            whileInView={{ opacity: 1 }} 
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-full bg-white p-8 border-2 border-brand-navy shadow-[8px_8px_0px_#000]"
                        >
                            <h4 className="font-mono text-xs uppercase tracking-[0.3em] mb-6 font-bold text-brand-purple">Mission Data</h4>
                            <MetaRow label="Client" value={project.client || "Internal"} />
                            <MetaRow label="Year" value={project.year.toString()} />
                            <MetaRow label="Scope" value={project.role} />
                            <MetaRow label="Sector" value={project.category} />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="font-body text-xl md:text-2xl text-brand-navy leading-relaxed font-medium space-y-8 max-w-3xl"
                        >
                            <p>{project.description}</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- 5. THE WORK (Main Gallery) ---
const MainGallery: React.FC<{ images: string[]; onImageClick: (src: string) => void }> = ({ images, onImageClick }) => {
    if (!images || images.length === 0) return null;

    return (
        <section className="py-24 border-t-2 border-brand-navy">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-12 flex items-center gap-4">
                    <span className="bg-brand-purple text-white px-2 py-1 font-mono text-xs uppercase tracking-widest font-bold">Visual Evidence</span>
                </div>
                
                {/* Staggered Masonry Layout */}
                <div className="columns-1 md:columns-2 gap-8 space-y-8">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="break-inside-avoid w-full group cursor-zoom-in relative mb-8"
                            onClick={() => onImageClick(img)}
                        >
                            <div className="relative overflow-hidden border-2 border-brand-navy bg-brand-navy shadow-[8px_8px_0px_#000]">
                                <img 
                                    src={img} 
                                    alt={`Output ${i}`} 
                                    className="w-full h-auto block transition-transform duration-1000 group-hover:scale-[1.02] grayscale-[20%] group-hover:grayscale-0"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            
                            <div className="mt-2 flex justify-between items-center">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-navy font-bold">Fig. 0{i + 1}</span>
                                <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-brand-purple group-hover:bg-brand-purple group-hover:text-white px-1 transition-colors">[ ENLARGE ]</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 6. QUOTE ---
const QuoteBreak: React.FC = () => (
    <section className="py-32 bg-brand-navy text-brand-offwhite">
        <div className="container mx-auto px-8 max-w-4xl text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-16 border-y border-white/20"
            >
                <p className="font-sans font-black text-3xl md:text-6xl uppercase leading-tight italic">
                    "Process over perfection. The logic determines the path."
                </p>
            </motion.div>
        </div>
    </section>
);

// --- 7. THE PROCESS ---
const ProcessGallery: React.FC<{ images: string[]; onImageClick: (src: string) => void }> = ({ images, onImageClick }) => {
    if (!images || images.length === 0) return null;
    
    return (
        <section className="py-32 bg-[#EAEAEA] border-t-2 border-brand-navy">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-24 flex flex-col md:flex-row justify-between items-end pb-8 border-b-2 border-brand-navy">
                    <div>
                        <h3 className="text-brand-navy font-black text-5xl md:text-8xl uppercase tracking-tighter leading-none">
                            Process
                        </h3>
                    </div>
                    <div className="bg-brand-navy text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest font-bold mb-2">
                        Raw Files / Sketches
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i} 
                            className="group cursor-zoom-in relative bg-white border border-brand-navy overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => onImageClick(img)}
                        >
                            <div className="aspect-square relative">
                                <img 
                                    src={img} 
                                    alt="Process" 
                                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 8. NEXT PROJECT ---
const NextProject: React.FC<{ project: any }> = ({ project }) => (
    <Link to={`/work/${project.slug}`} className="block relative h-[80vh] overflow-hidden group bg-brand-navy z-20 border-t-2 border-brand-offwhite">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-1000 ease-out">
            <img 
                src={project.imageUrl} 
                className="w-full h-full object-cover grayscale contrast-150" 
                alt={project.title}
                loading="lazy"
            />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-offwhite z-10 p-8 text-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <span className="bg-brand-purple text-white px-2 py-1 font-mono text-xs uppercase tracking-[0.2em] mb-6 inline-block font-bold">Next Case File</span>
                <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform duration-1000 ease-[0.19,1,0.22,1]">
                    {project.title}
                </h2>
                <div className="mt-12 overflow-hidden">
                    <span className="inline-block font-mono text-sm uppercase tracking-widest border-b-2 border-brand-yellow pb-1 text-brand-yellow font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

  useEffect(() => {
      window.scrollTo(0, 0);
      setIsRevealing(true);
  }, [slug]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (currentIndex === -1) return (
      <div className="min-h-screen flex items-center justify-center bg-brand-navy text-brand-offwhite">
          <h1 className="text-4xl font-mono uppercase">Case File Missing</h1>
      </div>
  );
  
  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  
  const detailImages = project.detailImages || [];
  const processImages = project.story?.processImages || [];

  return (
    <>
      <Helmet>
        <title>{project.title} | COOLO Work</title>
        <meta name="description" content={project.description.substring(0, 150)} />
        <meta property="og:title" content={`${project.title} | COOLO`} />
        <meta property="og:description" content={project.description.substring(0, 150)} />
        <meta property="og:image" content={`https://coolo.co.nz${project.imageUrl}`} />
      </Helmet>

      <AnimatePresence>
        {isRevealing && <ProjectReveal onComplete={() => setIsRevealing(false)} />}
      </AnimatePresence>

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />

      <div className="bg-[#EAEAEA] text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
        <ProjectHero project={project} />
        <ProjectBrief project={project} />
        <MainGallery images={detailImages} onImageClick={setSelectedImage} />
        <QuoteBreak />
        {processImages.length > 0 && (
            <ProcessGallery images={processImages} onImageClick={setSelectedImage} />
        )}
        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;