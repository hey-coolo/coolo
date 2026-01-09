
// Added React import to define the React namespace used in React.FC
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import BrandLogo from './BrandLogo';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Skew from 0deg (normal) to -20deg (italic) as the footer enters the viewport.
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

        {/* Technical Disclosure / Alpha Status */}
        <div className="mt-32 max-w-4xl mx-auto border-2 border-brand-purple/20 p-8 md:p-12 relative overflow-hidden bg-white/50 backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-purple"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="font-mono text-[10px] uppercase font-black text-brand-purple px-2 py-1 bg-brand-purple/5 border border-brand-purple/20 whitespace-nowrap">
                    Protocol Status: 2.0_Alpha
                </div>
                <div className="space-y-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed text-brand-navy/60 font-bold">
                        This interface is currently live for testing and calibration purposes. 
                        The case studies, technical imagery, and copy provided do not yet fully reflect the studio's real-world output or the final "Senior Unit" protocol. 
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed text-brand-navy/40">
                        We believe in continuous improvement and the logic of public builds. High-fidelity assets are currently undergoing final rendering and will replace these placeholders shortly.
                    </p>
                </div>
            </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-24 pt-8 border-t border-brand-navy/10 flex flex-col md:flex-row justify-between items-center text-brand-navy/60 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <div className="flex space-x-8 order-2 md:order-1 mt-12 md:mt-0 items-center">
             <div className="w-24 opacity-50">
                <BrandLogo />
             </div>
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="hidden md:inline">&bull; STRATEGY & EXECUTION</span>
          </div>
          <div className="flex space-x-12 order-1 md:order-2">
             <Link to="/journal" className="hover:text-brand-purple transition-colors">Journal</Link>
             <a href="https://instagram.com/coolo.co" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition-colors">Instagram</a>
             <a href="https://linkedin.com/company/coolo" className="hover:text-brand-purple transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
