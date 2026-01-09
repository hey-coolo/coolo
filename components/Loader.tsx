import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onEnter: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  // Canvas Refs & State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 1; 
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.strokeStyle = '#3A0888'; // Brand Purple
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Capture the pointer to ensure we get events even outside the canvas boundaries
    canvas.setPointerCapture(e.pointerId);

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
    ctx?.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // Clear the scaled context
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw start for next line
    ctx.beginPath();
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `coolo-intel-capture-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-offwhite text-brand-navy overflow-hidden cursor-crosshair"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }}
    >
        {/* Layer 0: Background Grid */}
        <div className="absolute inset-0 studio-grid pointer-events-none opacity-10 z-0"></div>
        
        {/* Layer 1: Interactive Whiteboard Canvas (Z-10) */}
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 w-full h-full touch-none"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
        />

        {/* Layer 2: Decorative Frames & HUD (Z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-12 flex flex-col justify-between select-none overflow-hidden">
            <div className="flex justify-between items-start">
                 {/* Top Left */}
                 <div className="w-8 h-8 border-l-2 border-t-2 border-brand-navy/20 relative">
                     <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest opacity-40 whitespace-nowrap font-bold">sys_boot_v2.0</span>
                 </div>
                 {/* Top Right */}
                 <div className="w-8 h-8 border-r-2 border-t-2 border-brand-navy/20"></div>
            </div>

            {/* Bottom HUD with Fix for mobile overlap */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 w-full">
                 <div className="flex justify-between w-full md:w-auto items-end gap-4">
                    {/* Bottom Left Decoration */}
                    <div className="w-8 h-8 border-l-2 border-b-2 border-brand-navy/20 flex-shrink-0"></div>
                    
                    {/* Responsive HUD Controls */}
                    <div className="pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-1">
                        <button 
                            onClick={clearCanvas}
                            data-cursor-text="CLEAR"
                            className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-brand-navy/40 hover:text-brand-purple transition-colors font-bold flex items-center gap-2 group whitespace-nowrap"
                        >
                            <span className="w-3 md:w-4 h-[1px] bg-current opacity-20 group-hover:w-8 transition-all"></span>
                            RESET_BUFFER
                        </button>
                        <button 
                            onClick={downloadSketch}
                            data-cursor-text="SAVE"
                            className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-brand-navy/40 hover:text-brand-purple transition-colors font-bold flex items-center gap-2 group whitespace-nowrap"
                        >
                            <span className="w-3 md:w-4 h-[1px] bg-current opacity-20 group-hover:w-8 transition-all"></span>
                            CAPTURE_FRAME
                        </button>
                    </div>
                 </div>

                 {/* Bottom Right Decoration */}
                 <div className="w-8 h-8 border-r-2 border-b-2 border-brand-navy/20 relative hidden sm:block">
                     <span className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-widest opacity-40 whitespace-nowrap text-right font-bold">ready_to_engage</span>
                 </div>
            </div>
        </div>
        
        {/* Footer Info (Z-20) */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 w-full text-center z-20 pointer-events-none">
             <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-navy/30 font-bold">
                 Est. 2024 &bull; Mount Maunganui
             </span>
        </div>

        {/* Layer 3: Main Content (Z-30) */}
        <div className="relative z-30 flex flex-col items-center pointer-events-none select-none p-4 max-w-full">
            
            {/* SVG Logotype Animation */}
            <div className="w-[85vw] md:w-[40vw] max-w-lg aspect-[3/1] relative mb-6 md:mb-8">
                <svg viewBox="0 0 300 100" className="w-full h-full">
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="font-sans font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter"
                        fill="transparent"
                        stroke="#0F0328"
                        strokeWidth="1.5"
                        strokeDasharray="1000"
                        strokeDashoffset={1000 - (progress * 10)}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                    >
                        COOLO
                    </text>
                    <text
                         x="50%"
                         y="50%"
                         dominantBaseline="middle"
                         textAnchor="middle"
                         className="font-sans font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter"
                         fill="#0F0328"
                         stroke="none"
                         style={{ 
                             opacity: isReady ? 1 : 0,
                             transition: 'opacity 0.5s ease-out'
                         }}
                    >
                        COOLO
                    </text>
                </svg>
            </div>
       {/* Hint Text - Visible Earlier */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-brand-purple/50 font-bold"
            >
                [ Use pen or cursor to sketch ]
            </motion.div>
        </div>
      
            {/* Button Container */}
            <div className="flex flex-col items-center pointer-events-auto min-h-[80px]">
                {!isReady ? (
                    <div className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-navy/40 animate-pulse font-bold">
                        System Loading... {progress}%
                    </div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={onEnter}
                        className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] font-bold bg-brand-navy text-brand-offwhite px-6 sm:px-8 md:px-10 py-4 hover:bg-brand-purple hover:scale-105 transition-all duration-300 shadow-xl whitespace-nowrap"
                    >
                        ENTER NOW
                    </motion.button>
                )}
            </div>
      </motion.div>
  );
};

export default Loader;
