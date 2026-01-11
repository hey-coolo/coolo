import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- Components ---

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-brand-purple origin-left z-[100]"
            style={{ scaleX: scrollYProgress }}
        />
    );
};

const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    return (
        <div className="relative min-h-[80vh] flex flex-col justify-center items-center bg-brand-offwhite overflow-hidden pt-32 pb-16">
            <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-bold mb-6 block"
                >
                    Case Study {project.id.toString().padStart(2, '0')}
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-brand-navy mb-8"
                >
                    {project.title}
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 font-mono text-xs uppercase tracking-widest text-brand-navy/60"
                >
                    <span>{project.client}</span>
                    <span>{project.role}</span>
                    <span>{project.year}</span>
                </motion.div>
            </div>

            {/* Hero Image / Background Element */}
             <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            >
                 <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
            </motion.div>
        </div>
    );
};

const VisualSection: React.FC<{ image: string, caption?: string, align?: 'left' | 'right' | 'center' }> = ({ image, caption, align = 'center' }) => {
    return (
        <div className={`py-12 md:py-24 container mx-auto px-6 md:px-8 flex ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`}>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className={`w-full ${align === 'center' ? 'md:w-full' : 'md:w-3/4 lg:w-2/3'}`}
            >
                <div className="overflow-hidden bg-brand-navy/5 shadow-2xl">
                    <motion.img 
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        src={image} 
                        alt={caption || ""} 
                        className="w-full h-auto object-cover" 
                    />
                </div>
                {caption && <p className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mt-4">{caption}</p>}
            </motion.div>
        </div>
    );
}

const TextSection: React.FC<{ title: string, text: string }> = ({ title, text }) => (
    <div className="py-24 container mx-auto px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{title}</span>
            <p className="font-body text-2xl md:text-4xl leading-tight font-light text-brand-navy">
                {text}
            </p>
        </div>
    </div>
);

const GalleryGrid: React.FC<{ images: string[] }> = ({ images }) => {
    if (!images || images.length === 0) return null;
    return (
        <div className="py-24 bg-brand-navy text-brand-offwhite">
            <div className="container mx-auto px-6 md:px-8">
                <h3 className="font-sans text-6xl font-black uppercase tracking-tight mb-16">Process<br/>Archive</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="aspect-square bg-brand-offwhite/5 overflow-hidden relative group"
                        >
                            <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" alt="" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const NextProject: React.FC<{ project: any }> = ({ project }) => (
    <Link to={`/work/${project.slug}`} className="block relative h-[60vh] overflow-hidden group bg-brand-navy">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-700">
            <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-offwhite z-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4">Next Case File</span>
            <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">
                {project.title}
            </h2>
        </div>
    </Link>
);

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

  if (currentIndex === -1) return <div>Project not found</div>;
  
  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  
  // Destructure story or provide defaults
  const { goal, gap, gamble, gain, processImages } = project.story || {
      goal: project.description,
      gap: "",
      gamble: "",
      gain: "",
      processImages: []
  };

  return (
    <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
      <ScrollProgress />
      <ProjectHero project={project} />
      
      {/* 01: The Setup */}
      <TextSection title="01 / The Brief" text={goal} />
      
      {/* Visuals - Hero Image */}
      <VisualSection image={project.imageUrl} caption="Primary Visual System" />

      {/* 02: The Conflict */}
      {gap && <TextSection title="02 / The Friction" text={gap} />}

      {/* Visuals - Details (Alternating) */}
      {project.detailImages && project.detailImages.length > 0 && (
          <>
            <VisualSection image={project.detailImages[0]} align="left" caption="Detail 01" />
            {project.detailImages[1] && <VisualSection image={project.detailImages[1]} align="right" caption="Detail 02" />}
          </>
      )}

      {/* 03: The Solution */}
      {gamble && <TextSection title="03 / The Pivot" text={gamble} />}

      {/* Full Width Impact Visual */}
      {project.detailImages && project.detailImages[2] && (
          <div className="py-12">
              <img src={project.detailImages[2]} className="w-full h-[80vh] object-cover" alt="" />
          </div>
      )}

      {/* 04: The Result */}
      {gain && (
          <div className="py-32 container mx-auto px-6 md:px-8 text-center">
              <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-6 block">04 / Impact</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none text-brand-navy">
                  {gain}
              </h2>
          </div>
      )}

      {/* Process Gallery (Grid) */}
      <GalleryGrid images={processImages} />

      {/* Next Project Nav */}
      <NextProject project={nextProject} />
    </div>
  );
};

export default ProjectPage;