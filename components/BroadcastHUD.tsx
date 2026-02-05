import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BroadcastHUD: React.FC = () => {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
        const now = new Date();
        // 90s Camcorder Time Format (00:00:00:00)
        const timeString = now.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        });
        const frames = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        setTime(`${timeString}:${frames}`);
    };
    const interval = setInterval(updateTime, 40); // Update roughly every frame
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden mix-blend-difference select-none text-[#F7F7F7]">
      {/* 1. Safe Area Border (The Viewfinder) */}
      <div className="absolute inset-2 md:inset-4 border border-white/20 rounded-xl opacity-50"></div>
      
      {/* 2. Crosshairs */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2">
         <div className="absolute w-full h-[1px] bg-white/30 top-1/2"></div>
         <div className="absolute h-full w-[1px] bg-white/30 left-1/2"></div>
      </div>

      {/* 3. Top Left: REC Status */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-3">
         <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 1.5, repeat: Infinity }} 
            className="w-3 h-3 rounded-full bg-[#FF0000] shadow-[0_0_8px_#FF0000]" 
         />
         <span className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase">REC</span>
         <span className="font-mono text-[10px] md:text-xs opacity-60 ml-2 tracking-widest hidden md:inline-block">SP MODE</span>
      </div>

      {/* 4. Top Right: Battery & Format */}
      <div className="absolute top-8 right-8 md:top-12 md:left-auto md:right-12 text-right">
         <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-2">
                 <span className="font-mono text-[10px] uppercase tracking-widest">BATTERY</span>
                 <div className="w-8 h-3 border border-white/50 p-[1px] flex">
                     <div className="w-[80%] h-full bg-white/80"></div>
                 </div>
             </div>
             <span className="font-mono text-[10px] tracking-widest opacity-50">HI-8 / 16:9</span>
         </div>
      </div>

      {/* 5. Bottom Left: Geo Data (Mount Maunganui) */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
          <div className="flex flex-col font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-70 leading-tight">
              <span>LAT: 37.6406° S</span>
              <span>LON: 176.1861° E</span>
              <span className="mt-1 text-brand-yellow/80">LOC: MOUNT_MAUNGANUI_NZ</span>
          </div>
      </div>

      {/* 6. Bottom Right: Timecode */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
          <div className="font-mono text-xl md:text-3xl font-bold tracking-widest tabular-nums leading-none">
              {time}
          </div>
          <div className="font-mono text-[9px] text-right uppercase tracking-[0.2em] opacity-50 mt-1">
              TC_GENERATOR
          </div>
      </div>
    </div>
  );
};

export default BroadcastHUD;