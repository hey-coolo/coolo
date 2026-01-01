
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Skew from 0deg (normal) to -20deg (italic) as the footer enters the viewport.
  // Starts vertical, leans into the grind as you scroll down.
  const skewX = useTransform(scrollYProgress, [0, 1], ["0deg", "-20deg"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]); 
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <footer ref={containerRef} className="bg-brand-offwhite text-brand-navy overflow-hidden border-t-2 border-brand-navy relative z-10">
      <div className="container mx-auto px-8 py-24 md:py-32">
        
        {/* Main CTA */}
        <motion.div style={{ opacity }} className="flex flex-col items-center text-center">
          <span className="font-mono text-sm uppercase text-brand-purple tracking-widest mb-8">Ready to evolve?</span>
          <h2 className="text-6xl md:text-[14vw] font-black uppercase tracking-tight text-brand-navy leading-[0.85] flex flex-col md:block items-center">
            <span>START THE</span>
            <br className="hidden md:block"/>
            <motion.span 
              style={{ skewX, x, display: 'inline-block', originX: 0 }}
              className="text-brand-purple"
            >
              GRIND.
            </motion.span>
          </h2>
          <a href="mailto:hey@coolo.co.nz" className="inline-block mt-16 text-3xl md:text-5xl font-sans font-black hover:text-brand-purple transition-colors duration-300 underline decoration-brand-yellow decoration-4 underline-offset-8">
            hey@coolo.co.nz
          </a>
        </motion.div>

        {/* Footer Meta */}
        <div className="mt-24 pt-8 border-t border-brand-navy/10 flex flex-col md:flex-row justify-between items-center text-brand-navy/60 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <div className="flex space-x-8 order-2 md:order-1 mt-12 md:mt-0">
            <span>&copy; {new Date().getFullYear()} COOLO STUDIO</span>
            <span>STRATEGY &bull; EXECUTION &bull; EDUCATIONAL</span>
          </div>
          <div className="flex space-x-12 order-1 md:order-2">
             <Link to="/journal" className="hover:text-brand-purple transition-colors">Journal</Link>
             <a href="https://instagram.com/coolo.studio" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition-colors">Instagram</a>
             <a href="#" className="hover:text-brand-purple transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
