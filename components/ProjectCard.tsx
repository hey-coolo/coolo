
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoother springs for subtle effect
  const mouseX = useSpring(x, { stiffness: 40, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 30 });

  // Parallax movement for image (subtle)
  const moveX = useTransform(mouseX, [-0.5, 0.5], ["-3%", "3%"]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], ["-3%", "3%"]);
  
  // Parallax for text/label
  const labelMoveX = useTransform(mouseX, [-0.5, 0.5], ["1%", "-1%"]);
  const labelMoveY = useTransform(mouseY, [-0.5, 0.5], ["1%", "-1%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    // Calculate normalized position (-0.5 to 0.5)
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link 
      to={`/work/${project.slug}`} 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="CASE STUDY"
      className={`group relative block overflow-hidden bg-brand-navy ${className} cursor-none`}
    >
      <motion.div 
        className="h-full w-full"
        style={{ x: moveX, y: moveY, scale: 1.1 }} // Start slightly scaled up for parallax room
        whileHover={{ scale: 1.15 }} // Scale up more on hover
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <img 
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-opacity duration-700 opacity-90 group-hover:opacity-100"
        />
      </motion.div>
      
      {/* Dark overlay on hover to pop text (dims the image) */}
      <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/60 transition-colors duration-500 z-10 pointer-events-none mix-blend-multiply" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
        <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
            <div className="flex justify-between items-end">
                <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-yellow font-bold block mb-3">
                        {project.category} &bull; {project.year}
                    </span>
                    <h3 className="text-5xl md:text-7xl font-black uppercase text-brand-offwhite leading-[0.8] tracking-tighter">
                        {project.title}
                    </h3>
                </div>
                <div className="hidden md:flex w-20 h-20 border border-brand-offwhite/20 items-center justify-center text-brand-offwhite group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors duration-300">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
            </div>
        </div>
      </div>
      
      {/* Structural Labeling with reverse parallax - reveals on hover as well */}
      <motion.div 
        style={{ x: labelMoveX, y: labelMoveY }}
        className="absolute top-8 left-8 font-mono text-[9px] uppercase tracking-[0.4em] text-brand-offwhite/50 pointer-events-none z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        0{project.id} // ARCHIVE_REF
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
