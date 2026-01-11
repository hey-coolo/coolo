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

  const skewX = useTransform(scrollYProgress, [0, 1], ["0deg", "-20deg"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]); 
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const links = {
    index: [
      { name: 'Work', path: '/work' },
      { name: 'Studio', path: '/about' },
      { name: 'Team', path: '/team' },
      { name: 'Journal', path: '/journal' },
    ],
    services: [
      { name: 'Clarity', path: '/clarity' },
      { name: 'Design Power', path: '/design-power' },
      { name: 'Partnership', path: '/partnership' },
      { name: 'FAQ', path: '/faq' },
    ],
    social: [
      { name: 'Instagram', url: 'https://instagram.com/coolo.co' },
      { name: 'LinkedIn', url: 'https://linkedin.com/company/coolo' },
      { name: 'Email', url: 'mailto:hey@coolo.co.nz' },
    ]
  };

  return (
    <footer ref={containerRef} className="bg-brand-navy text-brand-offwhite relative z-50 overflow-hidden">
      
      {/* 1. MASSIVE FULL-WIDTH YELLOW CTA SECTION */}
      {/* w-full bg-brand-yellow ensures it goes edge-to-edge */}
      <div className="w-full bg-brand-yellow py-32 md:py-48 relative overflow-hidden group text-brand-navy">
         {/* Background Texture/Noise could go here */}
         <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        <div className="container mx-auto px-6 md:px-8 relative z-10">
            <motion.div style={{ opacity }} className="flex flex-col items-center text-center">
            <span className="font-mono text-sm uppercase tracking-widest mb-8 font-black border-b-2 border-brand-navy pb-1">
                Ready to evolve?
            </span>
            
            {/* Navy Text on Yellow Background */}
            <h2 className="text-6xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.85] flex flex-col md:block items-center">
                <span>START THE</span>
                <br className="hidden md:block"/>
                <motion.span 
                style={{ skewX, x, display: 'inline-block', originX: 0 }}
                className="text-brand-purple" // Keep purple pop for "GRIND"
                >
                GRIND.
                </motion.span>
            </h2>
            
            <a 
                href="mailto:hey@coolo.co.nz" 
                className="inline-block mt-16 text-2xl md:text-4xl font-sans font-black hover:text-brand-purple transition-colors duration-300 underline decoration-brand-navy decoration-4 underline-offset-8"
            >
                hey@coolo.co.nz
            </a>
            </motion.div>
        </div>
      </div>

      {/* 2. THE NAVIGATION GRID (Dark Navy Section) */}
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 py-32">
        
        {/* Col 1: Index */}
        <div>
            <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">Index</h4>
            <ul className="space-y-4">
                {links.index.map(link => (
                    <li key={link.name}>
                        <Link to={link.path} className="font-sans text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-brand-yellow transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        {/* Col 2: Services */}
        <div>
            <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">Services</h4>
            <ul className="space-y-4">
                {links.services.map(link => (
                    <li key={link.name}>
                        <Link to={link.path} className="font-sans text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-brand-yellow transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        {/* Col 3: Network */}
        <div>
            <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">Network</h4>
            <ul className="space-y-4">
                {links.social.map(link => (
                    <li key={link.name}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-sans text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-brand-yellow transition-colors">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>

        {/* Col 4: Studio Info */}
        <div className="flex flex-col justify-between h-full">
            <div>
                <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">HQ</h4>
                <p className="font-mono text-xs leading-relaxed opacity-60">
                    Mount Maunganui,<br/>New Zealand.<br/>Earth.
                </p>
            </div>
            <div className="mt-8 md:mt-0">
                <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-2">Time</h4>
                <TimeDisplay />
            </div>
        </div>
      </div>

      {/* 3. BIG LOGO ANCHOR */}
      <div className="border-t border-brand-offwhite/10">
          <div className="container mx-auto px-6 md:px-8 py-12 md:py-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                  <div className="w-full md:w-auto">
                      <div className="w-48 md:w-96 opacity-100 mb-8 md:mb-0">
                        {/* Force light logo on dark footer */}
                        <BrandLogo color="#F7F7F7" className="w-full h-auto" />
                      </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col md:items-end gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                          &copy; {new Date().getFullYear()} COOLO Studio. All Rights Reserved.
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                          System V2.0_Alpha
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  );
};

// Simple Time Component
const TimeDisplay = () => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Pacific/Auckland' }));
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Pacific/Auckland' }));
        }, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return <div className="font-mono text-sm font-bold opacity-80">{time} NZT</div>;
}

export default Footer;