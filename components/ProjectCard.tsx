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

  const moveX = useTransform(mouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], ["-2%", "2%"]);
  
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
      className={`group relative block w-full overflow-hidden bg-[#F8F8F9] ${className} cursor-none`}
    >
      <motion.div 
        className="h-full w-full origin-center"
        style={{ x: moveX, y: moveY, scale: 1.05 }}
        whileHover={{ scale: 1.02 }}
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
      
      {/* Editorial Archive Badge */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-[9px] uppercase tracking-widest text-[#0A0A0A] bg-white px-3 py-1 pointer-events-none z-20 font-bold mix-blend-screen shadow-sm">
        REF_0{project.id}
      </div>
    </Link>
  );
};

export default ProjectCard;