import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';

// --- UTILITY COMPONENTS ---

// 1. Smooth Parallax Image Component
// This creates that "floating" reveal effect you wanted.
const ParallaxImage: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // The image moves slightly faster/slower than scroll to create depth
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <div ref={ref} className={`overflow-hidden relative ${className}`}>
            <motion.div style={{ y, scale }} className="w-full h-full">
                <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
            </motion.div>
        </div>
    );
};

// 2. Sticky Scroll Section
// Keeps text fixed on one side while images scroll on the other.
const StickySection: React.FC<{ title: string; text: string; image?: string; align?: 'left' | 'right' }> = ({ title, text, image, align = 'left' }) => {
    return (
        <div className="min-h-screen container mx-auto px-6 md:px-8 py-24 md:py-32 flex flex-col md:flex-row gap-16 md:gap-32 relative">
            
            {/* TEXT SIDE (Sticky) */}
            <div className={`md:w-1/3 flex flex-col justify-center ${align === 'right' ? 'md:order-2' : 'md:order-1'}`}>
                <div className="md:sticky md:top-32">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
                        {title}
                    </span>
                    <p className="font-body text-xl md:text-3xl leading-tight font-light text-brand-navy">
                        {text}
                    </p>
                </div>
            </div>

            {/* IMAGE SIDE (Scrolling) */}
            <div className={`md:w-2/3 ${align === 'right' ? 'md:order-1' : 'md:order-2'}`}>
                {image && (
                    <ParallaxImage src={image} className="w-full h-[80vh] shadow-2xl bg-brand-navy/5" />
                )}
            </div>
        </div>
    );
}

const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax for Hero Background
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-brand-navy">
            {/* Background Image with Parallax */}
            <motion.div 
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <img src={project.imageUrl} className="w-full h-full object-cover opacity-60 grayscale" alt="" />
                {/* Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
            </motion.div>

            {/* Content - High Contrast (White Text) */}
            <div className="relative z-10 container mx-auto px-6 md:px-8 text-center text-brand-offwhite">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-bold mb-8 block"
                >
                    Case Study {project.id.toString().padStart(2, '0')}
                </motion.span>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter mb-12 mix-blend-overlay opacity-90"
                >
                    {project.title}
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 font-mono text-xs uppercase tracking-widest text-brand-offwhite/60"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-brand-purple font-bold">Client</span>
                        <span>{project.client}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-brand-purple font-bold">Role</span>
                        <span>{project.role}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-brand-purple font-bold">Year</span>
                        <span>{project.year}</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const GalleryGrid: React.FC<{ images: string[] }> = ({ images }) => {
    if (!images || images.length === 0) return null;
    return (
        <div className="py-32 bg-brand-navy text-brand-offwhite relative z-20">
            <div className="container mx-auto px-6 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <h3 className="font-sans text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                        Raw<br/><span className="text-brand-purple">Process.</span>
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-brand-offwhite/40 mt-8 md:mt-0 text-right">
                        Visual Audit // Unfiltered<br/>Archive 00-{images.length}
                    </p>
                </div>
                
                {/* Masonry-ish Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            className="break-inside-avoid overflow-hidden bg-brand-offwhite/5 relative group"
                        >
                            <img 
                                src={img} 
                                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
                                alt="" 
                            />
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1">
                                <span className="font-mono text-[8px] uppercase tracking-widest text-white">Ref_0{i+1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const NextProject: React.FC<{ project: any }> = ({ project }) => (
    <Link to={`/work/${project.slug}`} className="block relative h-screen overflow-hidden group bg-brand-navy z-20">
        <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
            <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-offwhite z-10 p-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-8 text-brand-yellow">Next Case File</span>
            <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] group-hover:scale-105 transition-transform duration-700">
                {project.title}
            </h2>
            <div className="mt-12 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                <span className="font-mono text-sm uppercase tracking-widest border-b border-brand-yellow pb-1 text-brand-yellow">Open Dossier</span>
            </div>
        </div>
    </Link>
);

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

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

  return (
    <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
      
      <ProjectHero project={project} />
      
      {/* 01: The Brief / Setup - Sticky Layout */}
      <StickySection 
        title="01 / The Brief" 
        text={goal} 
        image={project.detailImages?.[0] || project.imageUrl} 
        align="left"
      />

      {/* 02: The Friction - Only if 'gap' exists */}
      {gap && (
          <StickySection 
            title="02 / The Friction" 
            text={gap} 
            image={project.detailImages?.[1]} 
            align="right"
          />
      )}

      {/* 03: The Pivot - Only if 'gamble' exists */}
      {gamble && (
          <StickySection 
            title="03 / The Pivot" 
            text={gamble} 
            image={project.detailImages?.[2]} 
            align="left"
          />
      )}

      {/* 04: Impact Statement */}
      {gain && (
          <div className="py-32 md:py-48 container mx-auto px-6 md:px-8">
              <div className="max-w-4xl mx-auto text-center">
                  <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block">04 / The Impact</span>
                  <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-brand-navy">
                      {gain}
                  </h2>
              </div>
          </div>
      )}

      {/* Process Gallery (Dark Mode) */}
      <GalleryGrid images={processImages} />

      {/* Next Project */}
      <NextProject project={nextProject} />
    </div>
  );
};

export default ProjectPage;