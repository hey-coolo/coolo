import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { PROJECTS, PROJECT_CATEGORIES } from '../constants';
import { ProjectCategory } from '../types';
import AnimatedSection from '../components/AnimatedSection';

const WorkPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    if (activeCategory === 'Featured') return PROJECTS.filter(p => p.featured);
    return PROJECTS.filter(project => project.category === activeCategory || project.tags.includes(activeCategory));
  }, [activeCategory]);

  // High-performance cursor tracking for the floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 relative">
      <div className="container mx-auto px-8">
        
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl relative z-10">
            <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-6 block">Output / Case Studies</span>
            <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9]">
              The Craft<br/><span className="text-brand-purple italic">Archives.</span>
            </h1>
            <p className="font-body text-2xl md:text-5xl text-brand-navy/60 mt-16 leading-tight max-w-4xl font-light">
              Where high-end strategy meets technical precision. Exploring the outer limits of digital and physical brand storytelling.
            </p>
            
            <div className="absolute top-24 right-0 hidden lg:block text-right">
                <div className="font-mono text-[10px] uppercase font-bold text-brand-purple/40 tracking-[0.3em]">Status: Global Reach</div>
                <div className="font-mono text-[10px] uppercase font-bold text-brand-purple/40 tracking-[0.3em] mt-1">Ref: {filteredProjects.length} Entries Found</div>
            </div>
          </header>
        </AnimatedSection>

        <div className="mb-16 border-y border-brand-navy/10 py-4 overflow-hidden relative group z-10">
            <div className="flex animate-marquee whitespace-nowrap">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <span key={i} className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-brand-purple/40 mx-12">
                        Build Note: Case files and imagery currently in beta // Full technical calibration in progress &bull;
                    </span>
                ))}
            </div>
        </div>

        <section className="pb-48 relative z-10">
          <div className="flex flex-wrap gap-x-12 gap-y-6 mb-24 border-b border-brand-navy/10 pb-8">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`transition-all duration-500 font-mono text-[10px] uppercase tracking-[0.4em] relative group pb-2 ${
                  activeCategory === category
                    ? 'text-brand-navy font-black'
                    : 'text-brand-navy/30 hover:text-brand-navy'
                }`}
              >
                {category}
                {activeCategory === category && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-brand-yellow"></span>
                )}
              </button>
            ))}
          </div>

          {/* EDITORIAL LIST REVEAL (Artivo Style) */}
          <div className="flex flex-col border-t border-brand-navy/10">
            {filteredProjects.map((project, index) => (
              <Link 
                key={project.id} 
                to={`/work/${project.slug}`}
                onMouseEnter={() => setHoveredProject(project.slug)}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor-text="VIEW"
                className="group block border-b border-brand-navy/10 py-12 md:py-16 transition-colors duration-500 hover:bg-brand-navy px-4 md:px-8 -mx-4 md:-mx-8"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center relative z-10">
                    <div className="flex items-baseline gap-6 md:gap-12">
                        <span className="font-mono text-sm text-brand-navy/30 group-hover:text-brand-yellow font-bold transition-colors duration-300">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-brand-navy group-hover:text-brand-offwhite transition-all duration-500 group-hover:translate-x-4">
                            {project.title}
                        </h2>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center gap-8 md:gap-16">
                        <span className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 group-hover:text-brand-offwhite/80 transition-colors duration-300">
                            {project.category}
                        </span>
                        <span className="font-mono text-xs uppercase font-bold text-brand-navy/30 group-hover:text-brand-purple transition-colors duration-300 hidden md:block">
                            {project.year}
                        </span>
                    </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* FLOATING CURSOR IMAGE */}
      <AnimatePresence>
        {hoveredProject && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                className="fixed top-0 left-0 w-[280px] md:w-[400px] aspect-[4/5] pointer-events-none z-0 overflow-hidden shadow-2xl mix-blend-difference hidden md:block"
            >
                <img 
                    src={filteredProjects.find(p => p.slug === hoveredProject)?.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover grayscale contrast-125"
                />
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WorkPage;