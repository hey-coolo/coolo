import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    // 1. Bypass React state for coordinates to prevent re-renders on mousemove
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // 2. Apply a tight, snappy spring for zero-latency feel
    const springConfig = { damping: 25, stiffness: 600, mass: 0.2 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactiveEl = target.closest('a, button, [data-cursor-text]');
            
            if (interactiveEl) {
                setIsHovering(true);
                const text = interactiveEl.getAttribute('data-cursor-text');
                setCursorText(text || '');
            } else {
                setIsHovering(false);
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Hide cursor on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9999] mix-blend-difference bg-brand-yellow text-brand-navy font-mono text-[8px] font-bold tracking-widest text-center"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: '-50%',
                translateY: '-50%',
                width: isHovering ? (cursorText ? '60px' : '40px') : '16px',
                height: isHovering ? (cursorText ? '60px' : '40px') : '16px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
        >
            {isHovering && cursorText && (
                <span className="opacity-100">{cursorText}</span>
            )}
        </motion.div>
    );
};

export default CustomCursor;