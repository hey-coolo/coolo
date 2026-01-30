import React, { useEffect, useState } from 'react';

const MESSAGES = [
  "DEPLOYING SEARCH AGENTS...",
  "READING META TAGS...",
  "ANALYZING VIBE...",
  "JUDGING TYPOGRAPHY...",
  "SCROLLING BIO...",
  "DETECTING CRINGE...",
  "CALCULATING SCORE...",
  "ALMOST DONE..."
];

const ScanningOverlay: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-brand-navy flex flex-col items-center justify-center font-mono text-brand-offwhite cursor-wait">
      <div className="w-64 md:w-96 border-t-2 border-brand-offwhite/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-brand-yellow animate-[loading_2s_linear_infinite]" />
      </div>
      
      <div className="text-xl md:text-3xl font-black uppercase tracking-tight mb-4 animate-pulse text-brand-yellow text-center">
        {MESSAGES[msgIndex]}
      </div>
      
      <div className="text-xs opacity-50 font-mono tracking-widest text-center">
        [[ LIVE SEARCH GROUNDING ACTIVE ]]<br/>
        DO NOT CLOSE WINDOW
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(15,3,40,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default ScanningOverlay;