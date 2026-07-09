import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values to prevent React re-renders on every mouse move
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply spring physics for that heavy, premium follow effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over interactive elements or elements with custom cursor data attributes
      const isInteractive = target.closest('a, button, input, textarea, select');
      const customCursorData = target.closest('[data-cursor]');
      const customCursorText = target.closest('[data-cursor-text]');

      if (customCursorText) {
        setCursorText(customCursorText.getAttribute('data-cursor-text') || '');
        setCursorVariant('text');
      } else if (customCursorData) {
        setCursorVariant(customCursorData.getAttribute('data-cursor') || 'hover');
      } else if (isInteractive) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide cursor when leaving window
    document.body.addEventListener('mouseleave', () => setIsVisible(false));
    document.body.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', () => setIsVisible(false));
      document.body.removeEventListener('mouseenter', () => setIsVisible(true));
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#000000',
      border: '0px solid transparent',
      mixBlendMode: 'normal' as any,
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: 'transparent',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      mixBlendMode: 'difference' as any,
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: '#000000',
      border: '0px solid transparent',
      mixBlendMode: 'normal' as any,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-white text-xs font-medium uppercase tracking-wider text-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
    >
      {cursorVariant === 'text' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="pointer-events-none select-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;