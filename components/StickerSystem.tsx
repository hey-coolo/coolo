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
  '/assets/logos/logo-dark.svg', // Mixing in your existing logo
];

interface Sticker {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale: number; // Added Scale
}

const StickerSystem: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const constraintsRef = useRef(null);

  // 1. Load Persisted Stickers
  useEffect(() => {
    const saved = localStorage.getItem('coolo_stickers_scatter_v3');
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
    localStorage.setItem('coolo_stickers_scatter_v3', JSON.stringify(stickers));
  }, [stickers]);

  const scatterConfetti = () => {
    // Blast 5 stickers at once
    const BATCH_SIZE = 5;
    const newBatch: Sticker[] = [];

    for (let i = 0; i < BATCH_SIZE; i++) {
        // Pick random asset
        const randomSrc = STICKER_ASSETS[Math.floor(Math.random() * STICKER_ASSETS.length)];
        
        // Random placement (Spread across most of the screen)
        const randomX = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1);
        const randomY = Math.random() * (window.innerHeight * 0.8) + (window.innerHeight * 0.1);
        
        // Chaotic rotation (-45 to 45 deg)
        const randomRot = (Math.random() * 90) - 45; 
        
        // Varied sizes (0.7x to 1.3x) - Keeps it dynamic
        const randomScale = 0.7 + Math.random() * 0.6; 

        newBatch.push({
            id: Date.now() + i, 
            src: randomSrc,
            x: randomX,
            y: randomY,
            rotation: randomRot,
            scale: randomScale,
        });
    }

    setStickers(prev => [...prev, ...newBatch]);
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
      {/* z-[999] ensures it is ON TOP of the Header (usually z-50) and all text */}
      {/* pointer-events-none on the container allows clicking THROUGH empty space */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[999] overflow-hidden mix-blend-normal">
        <AnimatePresence>
            {stickers.map((sticker) => (
            <motion.div
                key={sticker.id}
                drag
                dragMomentum={false} 
                // "Pop" Entrance Animation with Rotation and Scale
                initial={{ scale: 0, opacity: 0, rotate: sticker.rotation + 180 }}
                animate={{ scale: sticker.scale, opacity: 1, rotate: sticker.rotation, x: sticker.x, y: sticker.y }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                
                // Hover Effects
                whileHover={{ scale: sticker.scale * 1.1, cursor: 'grab', zIndex: 1000 }}
                whileDrag={{ scale: sticker.scale * 1.2, cursor: 'grabbing', zIndex: 1000 }}
                
                // pointer-events-auto re-enables clicking specifically on the sticker
                className="absolute pointer-events-auto select-none group origin-center"
                
                // Double click to remove if it's blocking content
                onDoubleClick={() => removeSticker(sticker.id)}
            >
                <div className="relative">
                    {/* Delete Hint (Visible on Hover) */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-navy text-brand-offwhite rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 scale-75 shadow-md pointer-events-auto cursor-pointer"
                    >
                        <X size={10} />
                    </button>

                    <img 
                        src={sticker.src} 
                        alt="sticker" 
                        // Sizing
                        className="w-32 md:w-48 h-auto pointer-events-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
                        draggable={false}
                    />
                </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* --- THE TRIGGER (Circular FAB) --- */}
      {/* z-[1000] ensures the button is always clickable above the stickers */}
      <div className="fixed bottom-8 left-8 z-[1000] flex flex-col items-center gap-4 group">
        
        {/* Clear Button (Hidden unless hovering) */}
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
        
        {/* Helper Tooltip */}
        <span className="font-mono text-[9px] uppercase tracking-widest bg-brand-navy text-brand-offwhite px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity absolute left-16 bottom-4 whitespace-nowrap pointer-events-none rounded-sm">
            Click to Scatter / Dbl Click to Delete
        </span>

      </div>
    </>
  );
};

export default StickerSystem;