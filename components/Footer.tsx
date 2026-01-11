import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

// --- STUDIO RADIO PLAYLIST ---
const TRACKS = [
    "Aphex Twin - #3", 
    "MF DOOM - Rhymes Like Dimes",
    "Tame Impala - Nangs",
    "Fred again.. - Delilah",
    "Khruangbin - Texas Sun",
    "Radiohead - Weird Fishes",
    "Kaytranada - 10%"
];

const MusicTicker = () => {
    const track = useMemo(() => TRACKS[Math.floor(Math.random() * TRACKS.length)], []);
    
    return (
        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-help group">
            {/* Equalizer Animation */}
            <div className="flex gap-[2px] items-end h-3">
                <motion.div animate={{ height: [4, 10, 6] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-[2px] bg-brand-yellow group-hover:bg-brand-purple" />
                <motion.div animate={{ height: [8, 3, 12] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[2px] bg-brand-yellow group-hover:bg-brand-purple" />
                <motion.div animate={{ height: [10, 5, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-brand-yellow group-hover:bg-brand-purple" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest whitespace-nowrap text-brand-offwhite">
                ON AIR: {track}
            </span>
        </div>
    );
};

const TimeDisplay = () => {
    const [time, setTime] = useState("");
    
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Create NZ time string manually to avoid hydration mismatch
            const nzTime = now.toLocaleTimeString('en-NZ', { 
                hour: '2-digit', 
                minute: '2-digit', 
                timeZone: 'Pacific/Auckland',
                hour12: false
            });
            setTime(nzTime);
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    if (!time) return <span className="font-mono text-[10px] opacity-0">00:00</span>;

    return <div className="font-mono text-[10px] font-bold opacity-80 text-brand-offwhite">{time} NZT</div>;
}

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [emailText, setEmailText] = useState("hey@coolo.co.nz");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  const handleCopyEmail = () => {
      navigator.clipboard.writeText("hey@coolo.co.nz");
      setEmailText("SAVED TO CLIPBOARD.");
      setTimeout(() => setEmailText("hey@coolo.co.nz"), 2000);
  };

  return (
    <footer ref={containerRef} className="bg-brand-navy text-brand-offwhite relative z-50 overflow-hidden border-t-2 border-brand-offwhite/10">
      
      {/* 1. THE BIG STATEMENT */}
      <div className="relative border-b border-brand-offwhite/10">
          <div className="container mx-auto px-6 md:px-8 py-24 md:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                  <div className="max-w-2xl">
                      <span className="font-mono text-brand-yellow uppercase tracking-[0.3em] text-xs font-bold mb-8 block">
                          End of Page / Start of Project
                      </span>
                      <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.85] text-brand-offwhite">
                          Ready to<br/>
                          <span className="text-brand-purple">make noise?</span>
                      </h2>
                  </div>
                  
                  <div className="flex flex-col items-start lg:items-end gap-8">
                        <button 
                            onClick={handleCopyEmail}
                            className="text-2xl md:text-4xl font-mono font-bold hover:text-brand-yellow transition-colors underline decoration-2 underline-offset-8 decoration-brand-purple"
                        >
                            {emailText}
                        </button>
                        
                        <Link 
                            to="/contact" 
                            className="bg-brand-offwhite text-brand-navy font-mono text-sm uppercase font-black px-12 py-5 hover:bg-brand-yellow hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(252,200,3,1)]"
                        >
                            Start A Project &rarr;
                        </Link>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. THE GRID */}
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 border-b border-brand-offwhite/10">
          {/* SITEMAP */}
          <div className="border-r border-brand-offwhite/10 py-12 pr-8">
              <h4 className="font-mono text-[9px] uppercase text-brand-offwhite/40 tracking-widest font-bold mb-6">Directory</h4>
              <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
                  <li><Link to="/work" className="hover:text-brand-yellow transition-colors">Selected Work</Link></li>
                  <li><Link to="/clarity" className="hover:text-brand-yellow transition-colors">The Brains</Link></li>
                  <li><Link to="/design-power" className="hover:text-brand-yellow transition-colors">The Craft</Link></li>
                  <li><Link to="/about" className="hover:text-brand-yellow transition-colors">Studio</Link></li>
              </ul>
          </div>

          {/* SOCIALS */}
          <div className="md:border-r border-brand-offwhite/10 py-12 px-0 md:px-8">
              <h4 className="font-mono text-[9px] uppercase text-brand-offwhite/40 tracking-widest font-bold mb-6">Social</h4>
              <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
                  <li><a href="https://instagram.com/coolo.co" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Instagram ↗</a></li>
                  <li><a href="https://linkedin.com/company/coolo" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">LinkedIn ↗</a></li>
              </ul>
          </div>

          {/* LIVE STATUS */}
          <div className="border-r border-brand-offwhite/10 py-12 px-8 col-span-2 md:col-span-1 border-t md:border-t-0 border-r-0 md:border-r">
              <h4 className="font-mono text-[9px] uppercase text-brand-offwhite/40 tracking-widest font-bold mb-6">Live Status</h4>
              <div className="space-y-4">
                  <TimeDisplay />
                  <MusicTicker />
                  <div className="flex items-center gap-2 mt-4">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-brand-offwhite/60">Accepting Projects</span>
                  </div>
              </div>
          </div>

          {/* LOCATION */}
          <div className="py-12 px-0 md:px-8 col-span-2 md:col-span-1 border-t md:border-t-0">
              <h4 className="font-mono text-[9px] uppercase text-brand-offwhite/40 tracking-widest font-bold mb-6">Coordinates</h4>
              <p className="font-mono text-xs uppercase tracking-widest leading-relaxed text-brand-offwhite/80">
                  Mount Maunganui,<br/>
                  New Zealand.<br/>
                  Earth.
              </p>
          </div>
      </div>

      {/* 3. THE MASSIVE LOGO FOOTER */}
      <div className="w-full overflow-hidden border-t border-brand-offwhite/5 pt-4">
          <motion.div 
            style={{ y }}
            className="w-full flex justify-center items-end"
          >
             {/* This SVG renders the word "COOLO" edge-to-edge.
                It uses the 'Big Shoulders Display' font geometry.
             */}
             <h1 className="text-[28vw] leading-[0.75] font-black tracking-tighter text-brand-offwhite select-none pointer-events-none mix-blend-overlay opacity-30 translate-y-4">
                COOLO
             </h1>
          </motion.div>
      </div>
      
      {/* 4. COPYRIGHT BAR */}
      <div className="bg-brand-dark border-t border-brand-offwhite/10 py-4">
          <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
              <p className="font-mono text-[9px] uppercase tracking-widest text-brand-offwhite/30">
                  © {new Date().getFullYear()} COOLO Studio.
              </p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-brand-offwhite/30">
                  Built by Humans.
              </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;