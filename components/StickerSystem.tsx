import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sticker as StickerIcon, Trash2 } from 'lucide-react';

// --- CONFIGURATION ---
// These point to your new SVG files in public/assets/stickers/
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
  scale: number;
}

const StickerSystem: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const constraintsRef = useRef(null);

  // 1. Load Slaps
  useEffect(() => {
    const saved = localStorage.getItem('coolo_stickers_svg');
    if (saved) {
      try {
        setStickers(JSON.parse(saved));
      } catch (e) {
        console.error("Sticker load fail", e);
      }
    }
  }, []);

  // 2. Save Slaps
  useEffect(() => {
    localStorage.setItem('coolo_stickers_svg', JSON.stringify(stickers));
  }, [stickers]);

  const addSticker = (src: string) => {
    // Randomize placement
    const randomX = Math.random() * (window.innerWidth * 0.3) + 100;
    const randomY = Math.random() * (window.innerHeight * 0.3) + 100;
    const randomRot = (Math.random() * 40) - 20; // -20 to 20 degree tilt
    const randomScale = 0.9 + Math.random() * 0.3; 

    const newSticker: Sticker = {
      id: Date.now(),
      src,
      x: randomX,
      y: randomY,
      rotation: randomRot,
      scale: randomScale,
    };

    setStickers(prev => [...prev, newSticker]);
  };

  const removeSticker = (id: number) => {
    setStickers(prev => prev.filter(s => s.id !== id));
  };

  const clearDeck = () => {
    if(confirm("Scrape the deck? This removes all stickers.")) {
        setStickers([]);
    }
  };

  return (
    <>
      {/* --- THE CANVAS (Overlay) --- */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[45] overflow-hidden mix-blend-multiply">
        {stickers.map((sticker) => (
          <motion.div
            key={sticker.id}
            drag
            dragMomentum={false} 
            initial={{ scale: 0, rotate: 0, x: sticker.x, y: sticker.y }}
            animate={{ scale: sticker.scale, rotate: sticker.rotation, x: sticker.x, y: sticker.y }}
            whileHover={{ scale: sticker.scale * 1.1, cursor: 'grab', zIndex: 100 }}
            whileDrag={{ scale: sticker.scale * 1.15, cursor: 'grabbing', zIndex: 100 }}
            className="absolute pointer-events-auto select-none group"
            onDragEnd={(_e, info) => {
                const newStickers = stickers.map(s => 
                    s.id === sticker.id ? { ...s, x: s.x + info.offset.x, y: s.y + info.offset.y } : s
                );
            }}
            onDoubleClick={() => removeSticker(sticker.id)}
          >
            <div className="relative">
                {/* Delete Button (Visible on Hover) */}
                <button 
                    onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                    className="absolute -top-4 -right-4 bg-brand-navy text-brand-offwhite rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 scale-75 shadow-md"
                >
                    <X size={12} />
                </button>

                <img 
                    src={sticker.src} 
                    alt="sticker" 
                    className="w-32 md:w-48 h-auto pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
                    draggable={false}
                />
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- THE TOOLBAR --- */}
      <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-4">
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white border-2 border-brand-navy p-6 shadow-[8px_8px_0px_0px_#0F0328] flex flex-col gap-6 max-w-[340px]"
            >
              <div className="flex justify-between items-center border-b-2 border-brand-navy/5 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple">
                      COOLO_PACK_V1.SVG
                  </span>
                  <button onClick={clearDeck} className="text-brand-navy/40 hover:text-red-500 transition-colors" title="Clear All">
                      <Trash2 size={14} />
                  </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {STICKER_ASSETS.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => addSticker(src)}
                    className="aspect-square flex items-center justify-center bg-brand-offwhite hover:bg-brand-yellow/10 transition-all border border-brand-navy/10 hover:border-brand-navy group p-2 relative overflow-hidden"
                  >
                    <img 
                        src={src} 
                        alt="sticker-thumb" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 group-hover:bg-brand-navy/5 transition-colors">
                        <span className="opacity-0 group-hover:opacity-100 font-mono text-[8px] font-bold text-brand-navy bg-white px-1 shadow-sm">ADD +</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="bg-brand-navy/5 p-3 text-center border-l-2 border-brand-purple">
                  <p className="font-mono text-[9px] uppercase tracking-tight opacity-70">
                      Drag to Slap &bull; Dbl Click to Scrap
                  </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsActive(!isActive)}
          className={`group flex items-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-widest font-black border-2 transition-all shadow-xl hover:-translate-y-1 ${
            isActive 
              ? 'bg-brand-purple text-brand-offwhite border-brand-purple' 
              : 'bg-brand-navy text-brand-offwhite border-brand-navy'
          }`}
        >
          <StickerIcon size={18} className={isActive ? "text-brand-yellow" : "text-brand-offwhite"} />
          <span>{isActive ? 'Close Pack' : 'Sticker Slap'}</span>
        </button>
      </div>
    </>
  );
};

export default StickerSystem;