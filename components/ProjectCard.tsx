
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

  const mouseX = useSpring(x, { stiffness: 40, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 30 });

  const moveX = useTransform(mouseX, [-0.5, 0.5], ["-3%", "3%"]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], ["-3%", "3%"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
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
      className={`group relative block overflow-hidden bg-brand-navy/5 border border-brand-navy/5 ${className} cursor-none transition-shadow hover:shadow-2xl`}
    >
      <motion.div 
        className="h-full w-full"
        style={{ x: moveX, y: moveY, scale: 1.05 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <img 
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-opacity duration-700 opacity-90 group-hover:opacity-100"
          onError={(e) => {
             e.currentTarget.style.opacity = '0.5';
          }}
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors duration-500 z-10 pointer-events-none" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex justify-between items-end">
                <div className="bg-brand-navy p-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-yellow font-bold block mb-2">
                        {project.category}
                    </span>
                    <h3 className="text-3xl font-black uppercase text-brand-offwhite leading-none tracking-tight">
                        {project.title}
                    </h3>
                </div>
                <div className="hidden md:flex w-16 h-16 bg-brand-yellow text-brand-navy items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
            </div>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 font-mono text-[8px] uppercase tracking-[0.4em] text-brand-navy/40 pointer-events-none z-20 font-bold">
        REF_0{project.id}
      </div>
    </Link>
  );
};

export default ProjectCard;
