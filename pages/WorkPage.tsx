import React, { useState, useMemo } from 'react';
import { PROJECTS, PROJECT_CATEGORIES } from '../constants';
import { ProjectCategory } from '../types';
import ProjectCard from '../components/ProjectCard';
import AnimatedSection from '../components/AnimatedSection';

const WorkPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    if (activeCategory === 'Featured') return PROJECTS.filter(p => p.featured);
    return PROJECTS.filter(project => project.category === activeCategory || project.tags.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl relative">
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

        <div className="mb-16 border-y border-brand-navy/10 py-4 overflow-hidden relative group">
            <div className="flex animate-marquee whitespace-nowrap">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <span key={i} className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-brand-purple/40 mx-12">
                        Build Note: Case files and imagery currently in beta // Full technical calibration in progress &bull;
                    </span>
                ))}
            </div>
        </div>

        <section className="pb-48">
          <div className="flex flex-wrap gap-x-12 gap-y-6 mb-32 border-b border-brand-navy/10 pb-8">
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

          {/* EDITORIAL STAGGERED GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-32">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-32' : ''}`}>
                  <ProjectCard project={project} className="aspect-[4/5] w-full" />
                  <div className="mt-6 flex justify-between items-start border-t border-brand-navy/10 pt-4">
                      <div>
                          <h3 className="text-3xl font-black uppercase tracking-tight leading-none text-brand-navy">{project.title}</h3>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold mt-2 block">{project.category}</span>
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold opacity-40 text-brand-navy">{project.year}</span>
                  </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkPage;