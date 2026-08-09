import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const [trigger, setTrigger] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // Ensure we only use createPortal on the client side after mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Retrigger the animation sequence and lock scroll on every route change
    useEffect(() => {
        setTrigger(prev => prev + 1);
        
        // Force scroll to top on route change
        window.scrollTo(0, 0);

        // Lock body scroll during the loader animation
        document.body.style.overflow = 'hidden';
        
        const timeout = setTimeout(() => {
            document.body.style.overflow = '';
        }, 1300); // 0.5s blink delay + 0.8s slide up duration

        return () => {
            clearTimeout(timeout);
            document.body.style.overflow = '';
        };
    }, [location.pathname]);

    const overlayContent = (
        <motion.div
            key={`overlay-${trigger}`}
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{ 
                delay: 0.5, 
                duration: 0.8, 
                ease: [0.19, 1, 0.22, 1] 
            }}
            className="fixed top-0 left-0 w-screen h-[100vh] h-[100dvh] z-[9999] bg-[#0A0A0A] flex items-center justify-center pointer-events-none origin-top"
        >
            <motion.div
                key={`text-${trigger}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{ 
                    duration: 0.4, 
                    times: [0, 0.25, 0.5, 0.75, 1],
                    ease: "linear" 
                }}
                className="font-mono text-[#F8F8F9] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex flex-col items-center gap-6"
            >
                <span className="w-2 h-2 bg-[#8B84D7]"></span>
                HUMANS IN THE MACHINE
            </motion.div>
        </motion.div>
    );

    return (
        <>
            {isMounted ? createPortal(overlayContent, document.body) : null}
            {children}
        </>
    );
};

export default PageTransition;