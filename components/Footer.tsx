import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- STUDIO RADIO PLAYLIST ---
const TRACKS = [
    "Daft Punk - Lose Yourself to Dance", 
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

  return (
    <footer ref={containerRef} className="bg-brand-navy text-brand-offwhite relative z-50 overflow-hidden border-t-2 border-brand-offwhite/10">
      
      {/* --- ENTER THE STUDIO SECTION (Now showing globally) --- */}
      <div className="bg-brand-offwhite text-brand-navy">
        <div className="container mx-auto px-8 py-24 md:py-32">
            
            {/* Main CTA */}
            <div className="flex flex-col items-center text-center">
                <span className="font-mono text-sm uppercase text-brand-purple tracking-widest mb-8">
                    Ready to evolve?
                </span>
                <h2 className="text-6xl md:text-[14vw] font-black uppercase tracking-tight text-brand-navy leading-[0.85] flex flex-col md:block items-center">
                    <span>ENTER THE</span>
                    <br className="hidden md:block"/>
                    <span 
                        className="text-brand-purple inline-block origin-left md:ml-8" 
                        style={{ transform: 'skewX(-20deg)' }}
                    >
                        STUDIO.
                    </span>
                </h2>
                
                <Link 
                    to="/contact" 
                    className="inline-block mt-16 text-3xl md:text-5xl font-sans font-black hover:text-brand-purple transition-colors duration-300 underline decoration-brand-yellow decoration-4 underline-offset-8"
                >
                    hey@coolo.co.nz
                </Link>
            </div>

        </div>
      </div>

      {/* --- STANDARD FOOTER GRID --- */}
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 border-t border-brand-offwhite/10">
          {/* DIRECTORY */}
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

      {/* COPYRIGHT BAR */}
      <div className="bg-brand-dark border-t border-brand-offwhite/10 py-4 relative z-10">
          <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
              <p className="font-mono text-[12px] uppercase tracking-widest text-brand-offwhite/30">
                  © {new Date().getFullYear()} COOLO Studio.
              </p>
              <p className="font-mono text-[12px] uppercase tracking-widest text-brand-offwhite/30">
                  Built by Humans.
              </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;