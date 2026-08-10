import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const [logoError, setLogoError] = useState(false);

  return (
    <footer ref={containerRef} className="bg-brand-navy text-brand-offwhite relative z-50 overflow-hidden border-t border-brand-offwhite/10">
      
      {/* --- TOP GRID SECTION --- */}
      <div className="container mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            
            {/* Left: CTA */}
            <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-12">
                <span className="font-mono text-[10px] uppercase text-brand-yellow tracking-widest mb-6 block font-bold">
                    Ready to evolve?
                </span>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-brand-offwhite leading-[0.85] mb-10">
                    ENTER THE<br/>STUDIO.
                </h3>
                <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-4 font-mono text-sm md:text-base uppercase tracking-widest font-bold text-brand-offwhite hover:text-brand-yellow transition-colors group"
                >
                    hey@coolo.co.nz
                    <span className="transform group-hover:translate-x-2 transition-transform text-xl leading-none font-light">→</span>
                </Link>
            </div>

            {/* Right: Metadata Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                
                {/* Directory */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-mono text-[10px] uppercase text-brand-offwhite/40 tracking-widest font-bold">Directory</h4>
                    <ul className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
                        <li><Link to="/work" className="hover:text-brand-yellow transition-colors">Work</Link></li>
                        <li><Link to="/clarity" className="hover:text-brand-yellow transition-colors">Creative Strategy</Link></li>
                        <li><Link to="/design-power" className="hover:text-brand-yellow transition-colors">Visual Design</Link></li>
                        <li><Link to="/about" className="hover:text-brand-yellow transition-colors">The Studio</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-mono text-[10px] uppercase text-brand-offwhite/40 tracking-widest font-bold">Social</h4>
                    <ul className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
                        <li><a href="https://instagram.com/coolo.co" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Instagram ↗</a></li>
                        <li><a href="https://linkedin.com/company/coolo" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">LinkedIn ↗</a></li>
                    </ul>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-mono text-[10px] uppercase text-brand-offwhite/40 tracking-widest font-bold">Live Status</h4>
                    <div className="flex flex-col gap-4">
                        <TimeDisplay />
                        <MusicTicker />
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-offwhite/60">Accepting Projects</span>
                        </div>
                    </div>
                </div>

                {/* Coordinates */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-mono text-[10px] uppercase text-brand-offwhite/40 tracking-widest font-bold">Coordinates</h4>
                    <p className="font-mono text-xs uppercase tracking-widest leading-relaxed text-brand-offwhite/80">
                        Mount Maunganui,<br/>
                        New Zealand.<br/>
                        Earthlings.
                    </p>
                </div>

            </div>
        </div>
      </div>

      {/* --- COPYRIGHT BAR --- */}
      <div className="container mx-auto px-6 md:px-12 border-t border-brand-offwhite/10 pt-8 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/40 font-bold">
              © {new Date().getFullYear()} COOLO Studio.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/40 font-bold">
              Built by Humans in the Machine.
          </p>
      </div>

      {/* --- MASSIVE LOGO BLOCK --- */}
      <div className="w-full bg-brand-yellow text-brand-navy pt-12 pb-8 md:pt-16 md:pb-12 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center selection:bg-brand-navy selection:text-brand-yellow">
          {!logoError ? (
            <img 
                src="/assets/logos/logo-dark.svg" 
                alt="COOLO" 
                className="w-full h-auto object-contain block"
                onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-[26vw] md:text-[27vw] font-black uppercase tracking-tighter leading-[0.75] whitespace-nowrap">
                COOLO
            </span>
          )}
      </div>

    </footer>
  );
};

export default Footer;