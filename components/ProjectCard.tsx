import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  year: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, category, imageSrc, year }) => {
  return (
    <motion.a 
      href={`/work/${id}`}
      className="block group w-full cursor-pointer"
      whileHover="hover"
      initial="initial"
    >
      <div className="relative overflow-hidden w-full aspect-[4/5] bg-[#1a1a1a]">
        <motion.img 
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-cover origin-center"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.05 }
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Dark overlay on hover */}
        <motion.div 
          className="absolute inset-0 bg-black/20"
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="flex justify-between items-start mt-6 w-full">
        <div>
          <h3 className="font-display text-3xl md:text-4xl tracking-tight m-0 text-[#f0f0f0] group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-[#f0f0f0]/60 mt-2">
            {category}
          </p>
        </div>
        <span className="font-mono text-xs text-[#f0f0f0]/40 pt-2">
          {year}
        </span>
      </div>
    </motion.a>
  );
};

export default ProjectCard;