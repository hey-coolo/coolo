import React, { useEffect, ReactNode } from 'react';

// Note: To make this truly smooth, install lenis: npm install @studio-freight/lenis
// If you don't want Lenis, this component safely degrades to normal scrolling.
interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    let lenis: any;
    
    const initSmoothScroll = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis not installed. Falling back to native scroll. Run: npm i @studio-freight/lenis");
      }
    };

    initSmoothScroll();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;