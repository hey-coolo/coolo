
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // Direct mapping for 1:1 response (no lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Switching to pointermove for stylus/tablet/touch support
    const moveCursor = (e: PointerEvent) => {
      // Direct updates for instant response
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Check for interactive elements
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer');
      setIsPointer(!!isInteractive);
      
      // Check for data-cursor-text attribute
      const textAttr = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      setCursorText(textAttr || "");
    };

    /**
     * CRITICAL: We use { capture: true } to ensure the cursor tracks the pointer
     * even when the sketching canvas has 'setPointerCapture' active.
     */
    window.addEventListener('pointermove', moveCursor, { capture: true });
    window.addEventListener('pointerdown', moveCursor, { capture: true });

    return () => {
      window.removeEventListener('pointermove', moveCursor, { capture: true });
      window.removeEventListener('pointerdown', moveCursor, { capture: true });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center overflow-hidden mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* 
        Using bg-white with mix-blend-difference:
        - On White Background -> Inverts to Black
        - On Dark Background -> Inverts to White
      */}
      <motion.div
        layout
        className="bg-white rounded-full flex items-center justify-center"
        animate={{
          width: cursorText ? 80 : (isPointer ? 16 : 10),
          height: cursorText ? 80 : (isPointer ? 16 : 10),
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="font-mono text-[10px] font-bold text-black uppercase tracking-widest text-center px-2 leading-tight"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
