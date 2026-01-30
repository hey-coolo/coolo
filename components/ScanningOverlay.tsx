import React, { useEffect, useState } from 'react';

const MESSAGES = [
  "DEPLOYING SEARCH AGENTS...",
  "READING META TAGS...",
  "ANALYZING IMAGE ALT TEXT...",
  "JUDGING TYPOGRAPHY CHOICES...",
  "SCROLLING THROUGH BIO...",
  "DETECTING CRINGE...",
  "CALCULATING VIBE SCORE...",
  "ALMOST DONE..."
];

const ScanningOverlay: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-brand-navy flex flex-col items-center justify-center font-mono cursor-wait text-brand-offwhite">
      <div className="w-64 md:w-96 border-t-2 border-brand-offwhite mb-8 animate-pulse relative">
        <div className="absolute top-[-2px] left-0 h-[2px] bg-brand-yellow animate-[loading_20s_linear_infinite]" style={{width: '100%'}}></div>
      </div>
      
      <div className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-4 animate-bounce text-center px-4 text-brand-yellow">
        {MESSAGES[messageIndex]}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs opacity-50 font-mono tracking-widest text-brand-offwhite">
          [[ LIVE SEARCH GROUNDING ACTIVE ]]
        </div>
        <div className="text-[10px] text-red-500 font-mono animate-pulse uppercase">
           DO NOT CLOSE WINDOW
        </div>
      </div>
      
      {/* Decorative Grid Scan Line */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
         <div className="w-full h-[5px] bg-brand-purple absolute top-0 animate-[scan_3s_linear_infinite]"></div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ScanningOverlay;