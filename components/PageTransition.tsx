import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const [trigger, setTrigger] = useState(0);

    // Retrigger the animation sequence on every route change
    useEffect(() => {
        setTrigger(prev => prev + 1);
    }, [location.pathname]);

    return (
        <>
            <motion.div
                key={`overlay-${trigger}`}
                initial={{ y: "0%" }}
                animate={{ y: "-100%" }}
                transition={{ 
                    delay: 0.5, // Waits for the 0.4s blink sequence to finish
                    duration: 0.8, 
                    ease: [0.19, 1, 0.22, 1] // Smooth editorial ease-out
                }}
                className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center pointer-events-none origin-top"
            >
                <motion.div
                    key={`text-${trigger}`}
                    initial={{ opacity: 0 }}
                    // Blink 1 (0 -> 1 -> 0), Blink 2 (0 -> 1 -> 0)
                    animate={{ opacity: [0, 1, 0, 1, 0] }}
                    transition={{ 
                        duration: 0.4, 
                        times: [0, 0.25, 0.5, 0.75, 1],
                        ease: "linear" 
                    }}
                    className="font-mono text-[#F8F8F9] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex flex-col items-center gap-6"
                >
                    <span className="w-2 h-2 bg-[#f7f7f7]"></span>
                    Humans In The Machine
                </motion.div>
            </motion.div>
            {children}
        </>
    );
};

export default PageTransition;