
import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import { motion, useScroll, useTransform } from 'framer-motion';

const DraggableHero: React.FC<{ project: any }> = ({ project }) => {
    // Ensure we have enough images for the infinite feel by repeating the gallery
    const baseImages = project.detailImages || [project.imageUrl];
    const images = [...baseImages, ...baseImages, ...baseImages].slice(0, 16); 

    // Create a scattered layout for the infinite feel with more items
    const positions = [
        { top: '5%', left: '5%', rotate: -5, z: 1 },
        { top: '10%', left: '55%', rotate: 5, z: 2 },
        { top: '45%', left: '15%', rotate: -2, z: 3 },
        { top: '40%', left: '65%', rotate: 8, z: 1 },
        { top: '75%', left: '25%', rotate: -6, z: 2 },
        { top: '70%', left: '85%', rotate: 4, z: 3 },
        { top: '0%', left: '30%', rotate: 3, z: 0 },
        { top: '55%', left: '45%', rotate: -3, z: 1 },
        { top: '25%', left: '80%', rotate: 6, z: 2 },
        { top: '85%', left: '5%', rotate: -4, z: 1 },
        { top: '15%', left: '-10%', rotate: 2, z: 0 },
        { top: '65%', left: '95%', rotate: -5, z: 2 },
        { top: '35%', left: '35%', rotate: 4, z: 3 },
        { top: '90%', left: '60%', rotate: -2, z: 1 },
        { top: '-10%', left: '70%', rotate: 5, z: 0 },
        { top: '50%', left: '-5%', rotate: -3, z: 1 },
    ];

    return (
        <div className="relative h-screen w-full overflow-hidden bg-brand-offwhite cursor-move">
            {/* Draggable Canvas - Expanded size for 'infinite' feel */}
            <motion.div 
                className="absolute w-[200vw] h-[200vh] top-[-50vh] left-[-50vw]"
                drag
                dragConstraints={{ left: -1500, right: 500, top: -1500, bottom: 500 }}
                dragElastic={0.1}
                dragTransition={{ power: 0.1, timeConstant: 200 }}
            >
                {images.map((img: string, i: number) => (
                    <div 
                        key={i}
                        className="absolute w-[250px] md:w-[300px] aspect-[4/5] shadow-2xl pointer-events-none bg-gray-200"
                        style={{ 
                            top: positions[i]?.top || `${Math.random() * 80}%`, 
                            left: positions[i]?.left || `${Math.random() * 80}%`, 
                            transform: `rotate(${positions[i]?.rotate || 0}deg)`,
                            zIndex: positions[i]?.z || 1
                        }}
                    >
                        <img src={img} className="w-full h-full object-cover" alt="" />
                    </div>
                ))}
            </motion.div>

            {/* Static Overlay UI */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-50 mix-blend-difference text-brand-offwhite">
                <span className="font-mono uppercase tracking-[0.5em] text-xs font-bold mb-4">Case Study {project.id.toString().padStart(2, '0')}</span>
                <h1 className="text-[12vw] leading-[0.9] font-black uppercase tracking-tight text-center">
                    {project.title}
                </h1>
                <div className="mt-8 flex gap-8 font-mono text-sm uppercase tracking-widest">
                    <span>{project.year}</span>
                    <span>//</span>
                    <span>{project.category}</span>
                </div>
                <div className="absolute bottom-12 animate-bounce font-mono text-[10px] uppercase tracking-widest">
                    [ Drag to Explore ] &darr; Scroll for Story
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
        <section ref={ref} className={`py-32 md:py-48 ${isDark ? 'bg-brand-navy text-brand-offwhite' : 'bg-brand-offwhite text-brand-navy'}`}>
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4 sticky top-32 h-max">
                        <motion.div style={{ opacity, y }}>
                            <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-bold block mb-4 ${isDark ? 'text-brand-purple' : 'text-brand-purple'}`}>
                                {step}
                            </span>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-8">
                                {title}
                            </h2>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-8">
                        <motion.p 
                            style={{ opacity }}
                            className={`font-body text-2xl md:text-4xl leading-tight font-light mb-16 ${isDark ? 'text-brand-offwhite/80' : 'text-brand-navy/80'}`}
                        >
                            {content}
                        </motion.p>
                        
                        {images && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {images.map((img, i) => (
                                    <div key={i} className={`overflow-hidden ${i % 2 === 1 ? 'mt-16' : ''}`}>
                                        <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
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

const ProcessGallery: React.FC<{ images: string[] }> = ({ images }) => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ 
        target: scrollRef,
        offset: ["start start", "end end"] 
    });
    
    // Move from 0% to -X% where X is enough to show all images. 
    // -75% usually covers a strip of 4-5 images in a 200vh scroll.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={scrollRef} className="h-[300vh] relative bg-brand-offwhite">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                <div className="container mx-auto px-8 mb-12">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Visual Audit // Raw Process</span>
                    <h2 className="text-4xl font-black uppercase tracking-tight text-brand-navy">The Messy Middle</h2>
                </div>
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-8 px-8 w-max">
                        {images.map((img, i) => (
                            <div key={i} className="w-[400px] md:w-[600px] aspect-[4/3] bg-brand-navy/5 flex-shrink-0">
                                <img src={img} className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500" alt="Process" />
                            </div>
                        ))}
                        {/* Duplicate for visual length if needed */}
                        {images.map((img, i) => (
                            <div key={`dup-${i}`} className="w-[400px] md:w-[600px] aspect-[4/3] bg-brand-navy/5 flex-shrink-0">
                                <img src={img} className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500" alt="Process" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

  if (currentIndex === -1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite text-brand-navy">
        <div className="text-center">
            <h1 className="text-6xl font-black uppercase tracking-tight">Missing_Data</h1>
            <Link to="/work" className="font-mono uppercase text-brand-purple mt-8 block tracking-widest text-xs">Return to Archives &rarr;</Link>
        </div>
      </div>
    );
  }
  
  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  
  // Use story data or fallback text if missing (for legacy data compatibility)
  const story = project.story || {
      goal: project.challenge || "Define the mission.",
      gap: "The messy middle where strategy meets execution.",
      gamble: "The pivot point. The risk we took.",
      gain: project.outcome || "The impact.",
      processImages: project.detailImages?.slice(0,3) || []
  };

  return (
    <div className="bg-brand-offwhite text-brand-navy min-h-screen">
      
      {/* 1. Hero: Draggable Infinite Gallery */}
      <DraggableHero project={project} />

      {/* 2. Story: The Goal (Mission) */}
      <NarrativeSection 
        step="01 The Goal"
        title="Call to Adventure"
        content={story.goal}
        isDark={false}
      />

      {/* 3. Story: The Gap (Process) + Horizontal Scroll */}
      <ProcessGallery images={story.processImages} />
      <NarrativeSection 
        step="02 The Gap"
        title="The Struggle"
        content={story.gap}
        isDark={true}
      />

      {/* 4. Story: The Gamble (Solution) */}
      <NarrativeSection 
        step="03 The Gamble"
        title="The Pivot"
        content={story.gamble}
        images={project.detailImages?.slice(0, 2)}
        isDark={false}
      />

      {/* 5. Story: The Gain (Impact) */}
      <section className="py-48 bg-brand-yellow text-brand-navy">
          <div className="container mx-auto px-8 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold mb-8 block">04 The Gain / Impact</span>
              
              {/* Reduced font size for better readability as requested */}
              <h2 className="text-4xl md:text-5xl lg:text-[4vw] font-black uppercase tracking-tight leading-[1.1] max-w-4xl mx-auto">
                  {story.gain}
              </h2>
              
              <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-brand-navy/10 pt-12">
                  <div className="text-center">
                      <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Role</div>
                      <div className="font-bold text-xl">{project.role}</div>
                  </div>
                  <div className="text-center">
                      <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Year</div>
                      <div className="font-bold text-xl">{project.year}</div>
                  </div>
                  <div className="text-center md:col-span-2">
                      <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Stack</div>
                      <div className="font-bold text-xl flex flex-wrap justify-center gap-2">
                          {project.tags.map(t => <span key={t}>{t}</span>)}
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      {/* Footer: Next Case */}
      <section className="bg-brand-navy py-64 relative overflow-hidden group">
        <Link to={`/work/${nextProject.slug}`} className="block relative z-10 text-center">
            <span className="font-mono text-brand-offwhite/50 uppercase tracking-[0.5em] text-xs font-black">Next Case File</span>
            
            {/* Reduced next project title size */}
            <h3 className="text-6xl md:text-[8vw] font-black uppercase tracking-tight text-brand-offwhite mt-12 transition-transform duration-1000 group-hover:scale-95 group-hover:text-brand-purple">
                {nextProject.title} &rarr;
            </h3>
        </Link>
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             <img src={nextProject.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
