import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (!overlayRef.current || !textRef.current) return;

        const tl = gsap.timeline();

        // Reset state on route change
        gsap.set(overlayRef.current, { yPercent: 0 });
        gsap.set(textRef.current, { opacity: 0 });

        // The "HUMANS IN THE MACHINE" blink/fill sequence
        tl.to(textRef.current, {
            opacity: 1,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            ease: "steps(1)"
        })
        .to(textRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: "none"
        })
        .to(textRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut"
        })
        .to(overlayRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut"
        });

    }, [location.pathname]);

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center pointer-events-none origin-top"
            >
                <div
                    ref={textRef}
                    className="font-mono text-[#F8F8F9] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex flex-col items-center gap-6 opacity-0"
                >
                    <span className="w-2 h-2 bg-[#8B84D7] animate-pulse"></span>
                    Humans In The Machine
                </div>
            </div>
            {children}
        </>
    );
};

export default PageTransition;