import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sticker as StickerIcon, Trash2 } from 'lucide-react';

// --- ASSETS ---
const STICKER_ASSETS = [
  '/assets/stickers/fuel coffee cup.svg',
  '/assets/stickers/sticker_creative-blur.svg',
  '/assets/stickers/sticker_digital love.svg',
  '/assets/stickers/sticker_Hello-face.svg',
  '/assets/stickers/sticker_smile coolito.svg',
  '/assets/stickers/sticker_worldwide.svg',
  '/assets/stickers/sticker_logo.svg',
  ];

interface Sticker {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const StickerSystem: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const constraintsRef = useRef(null);

  // 1. Load Persisted Stickers
  useEffect(() => {
    const saved = localStorage.getItem('coolo_stickers_scatter_v4');
    if (saved) {
      try {
        setStickers(JSON.parse(saved));
      } catch (e) {
        console.error("Sticker load fail", e);
      }
    }
  }, []);

  // 2. Save Stickers on Change
  useEffect(() => {
    localStorage.setItem('coolo_stickers_scatter_v4', JSON.stringify(stickers));
  }, [stickers]);

  const scatterConfetti = () => {
    // Randomize batch size: 5 to 8 stickers
    const batchSize = Math.floor(Math.random() * 4) + 5; 
    let spawnedCount = 0;

    // Interval to create the "machine gun" scatter effect
    const intervalId = setInterval(() => {
        if (spawnedCount >= batchSize) {
            clearInterval(intervalId);
            return;
        }

        // --- Random Generation Logic ---
        const randomSrc = STICKER_ASSETS[Math.floor(Math.random() * STICKER_ASSETS.length)];
        
        // Placement: 5% padding from edges
        const randomX = Math.random() * (window.innerWidth * 0.9) + (window.innerWidth * 0.05);
        const randomY = Math.random() * (window.innerHeight * 0.9) + (window.innerHeight * 0.05);
        
        // Rotation: -60 to +60 degrees
        const randomRot = (Math.random() * 120) - 60; 
        
        // Scale: 0.6x to 1.3x
        const randomScale = 0.6 + Math.random() * 0.7; 

        const newSticker: Sticker = {
            id: Date.now() + Math.random(), // Ensure unique ID with fast spawning
            src: randomSrc,
            x: randomX,
            y: randomY,
            rotation: randomRot,
            scale: randomScale,
        };

        setStickers(prev => [...prev, newSticker]);
        spawnedCount++;

    }, 80); // 80ms delay between pops
  };

  const removeSticker = (id: number) => {
    setStickers(prev => prev.filter(s => s.id !== id));
  };

  const clearDeck = () => {
    if(stickers.length > 0 && confirm("Scrape the deck? This removes all stickers.")) {
        setStickers([]);
    }
  };

  return (
    <>
      {/* --- THE CANVAS --- */}
      {/* z-[999] = On top of everything. mix-blend-normal ensures colors pop. */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[999] overflow-hidden mix-blend-normal">
        <AnimatePresence>
            {stickers.map((sticker) => (
            <motion.div
                key={sticker.id}
                drag
                dragMomentum={false} 
                // "Spring Pop" Entrance
                initial={{ scale: 0, opacity: 0, rotate: sticker.rotation + 180 }}
                animate={{ scale: sticker.scale, opacity: 1, rotate: sticker.rotation, x: sticker.x, y: sticker.y }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                
                // Interaction
                whileHover={{ scale: sticker.scale * 1.1, cursor: 'grab', zIndex: 1000 }}
                whileDrag={{ scale: sticker.scale * 1.2, cursor: 'grabbing', zIndex: 1000 }}
                
                className="absolute pointer-events-auto select-none group origin-center"
                onDoubleClick={() => removeSticker(sticker.id)}
            >
                <div className="relative">
                    {/* Delete Hint */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-navy text-brand-offwhite rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 scale-75 shadow-md pointer-events-auto cursor-pointer"
                    >
                        <X size={10} />
                    </button>

                    <img 
                        src={sticker.src} 
                        alt="sticker" 
                        className="w-32 md:w-48 h-auto pointer-events-none"
                        draggable={false}
                    />
                </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* --- THE TRIGGER --- */}
      <div className="fixed bottom-25 left-8 z-[1000] flex flex-col items-center gap-4 group">
        
        {/* Clear Button */}
        {stickers.length > 0 && (
            <button 
                onClick={clearDeck}
                className="w-8 h-8 rounded-full bg-brand-offwhite text-brand-navy border border-brand-navy/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-md hover:bg-red-500 hover:text-white"
                title="Clear All"
            >
                <Trash2 size={14} />
            </button>
        )}

        {/* Scatter Button */}
        <button 
          onClick={scatterConfetti}
          className="w-14 h-14 rounded-full bg-brand-purple text-brand-offwhite shadow-[4px_4px_0px_0px_#0F0328] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0F0328] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center border-2 border-brand-navy"
        >
          <StickerIcon size={24} className="group-active:rotate-12 transition-transform" />
        </button>
        
        {/* Tooltip */}
        <span className="font-mono text-[9px] uppercase tracking-widest bg-brand-navy text-brand-offwhite px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity absolute left-16 bottom-4 whitespace-nowrap pointer-events-none rounded-sm">
            Click to Scatter
        </span>

      </div>
    </>
  );
};

export default StickerSystem;