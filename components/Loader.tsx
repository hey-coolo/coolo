import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onEnter: () => void;
}

// Brand Palette for the Sketchpad
const COLORS = [
  { name: 'Purple', hex: '#3A0888' },
  { name: 'Navy', hex: '#0F0328' },
  { name: 'Yellow', hex: '#FCC803' },
  { name: 'OffWhite', hex: '#F7F7F7' }, 
  { name: 'Red', hex: '#7670C5' },     
];

const BRUSH_SIZES = [2, 6, 12];

const Loader: React.FC<LoaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  // Tool State
  const [activeColor, setActiveColor] = useState('#3A0888');
  const [activeSize, setActiveSize] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const [showTools, setShowTools] = useState(false); 

  // Canvas Refs & State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // History for Undo (Optional future expansion)
  const [history, setHistory] = useState<ImageData[]>([]);

  // 1. Loading Simulation
  useEffect(() => {
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

  // 2. Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key.toLowerCase()) {
        case 'e': setIsEraser(prev => !prev); break;
        case '1': setActiveColor(COLORS[0].hex); setIsEraser(false); break;
        case '2': setActiveColor(COLORS[1].hex); setIsEraser(false); break;
        case '3': setActiveColor(COLORS[2].hex); setIsEraser(false); break;
        case '4': setActiveColor(COLORS[3].hex); setIsEraser(false); break;
        case '5': setActiveColor(COLORS[4].hex); setIsEraser(false); break;
        case '=': case '+': setActiveSize(s => Math.min(s + 2, 50)); break;
        case '-': setActiveSize(s => Math.max(s - 2, 2)); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 3. Auto-Load from Storage
  useEffect(() => {
    const saved = localStorage.getItem('coolo_sketch_buffer');
    if (saved && canvasRef.current) {
      const img = new Image();
      img.src = saved;
      img.onload = () => {
        canvasRef.current?.getContext('2d')?.drawImage(img, 0, 0);
      };
    }
  }, []);

  // 4. Canvas Resize Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      // Save content
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCanvas.getContext('2d')?.drawImage(canvas, 0, 0);

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Restore content
      ctx.drawImage(tempCanvas, 0, 0, canvas.width / dpr, canvas.height / dpr);
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

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    draw(e);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#F7F7F7' : activeColor;
    const pressure = e.pressure > 0 ? e.pressure : 0.5;
    ctx.lineWidth = isEraser ? activeSize * 4 : activeSize * (1 + pressure); 
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
      localStorage.setItem('coolo_sketch_buffer', canvas.toDataURL());
    }
    ctx?.closePath();
    if (ctx) ctx.globalCompositeOperation = 'source-over';
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('coolo_sketch_buffer');
  };

  const downloadSketch = (format: 'png' | 'jpg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0,19).replace(/:/g,"-");
    
    if (format === 'jpg') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tCtx = tempCanvas.getContext('2d');
      if (!tCtx) return;

      tCtx.fillStyle = '#FFFFFF';
      tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tCtx.drawImage(canvas, 0, 0);
      
      link.download = `COOLO_SKETCH_${timestamp}.jpg`;
      link.href = tempCanvas.toDataURL('image/jpeg', 0.9);
    } else {
      link.download = `COOLO_SKETCH_${timestamp}.png`;
      link.href = canvas.toDataURL('image/png');
    }
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
        
        {/* Layer 1: Canvas */}
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 w-full h-full touch-none"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
        />

        {/* Layer 2: UI Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-12 flex flex-col justify-between select-none">
            
            <div className="flex justify-between items-start">
                 <div className="pointer-events-auto">
                    <button 
                        onClick={() => setShowTools(!showTools)}
                        className="font-mono text-[10px] uppercase tracking-widest border border-brand-navy/20 px-4 py-2 bg-brand-offwhite hover:bg-brand-navy hover:text-brand-offwhite transition-all font-bold"
                    >
                        {showTools ? '[-] HIDE_TOOLS' : '[+] SHOW_TOOLS'}
                    </button>
                 </div>
                 <div className="font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">COOLO © 2026</div>
            </div>

            <AnimatePresence>
                {showTools && (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="pointer-events-auto absolute left-6 md:left-12 top-24 bg-white border border-brand-navy/10 p-4 shadow-xl flex flex-col gap-6"
                    >
                        {/* Colors */}
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[8px] uppercase tracking-widest opacity-50">Ink</span>
                            <div className="flex gap-2">
                                {COLORS.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => { setActiveColor(c.hex); setIsEraser(false); }}
                                        className={`w-6 h-6 rounded-full border border-black/10 transition-transform hover:scale-110 ${activeColor === c.hex && !isEraser ? 'ring-2 ring-brand-purple ring-offset-1' : ''}`}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Size */}
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[8px] uppercase tracking-widest opacity-50">Width</span>
                            <div className="flex items-center gap-3">
                                {BRUSH_SIZES.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setActiveSize(s)}
                                        className={`rounded-full bg-brand-navy transition-all ${activeSize === s ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-70'}`}
                                        style={{ width: s * 1.5 + 4, height: s * 1.5 + 4 }}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Eraser */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setIsEraser(!isEraser)}
                                className={`font-mono text-[9px] uppercase tracking-widest border px-2 py-1 transition-colors ${isEraser ? 'bg-brand-navy text-brand-offwhite border-brand-navy' : 'border-brand-navy/20 hover:border-brand-navy'}`}
                            >
                                Eraser {isEraser ? 'ON' : 'OFF'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom HUD */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 w-full pointer-events-auto">
                 <div className="flex gap-4">
                    <button 
                        onClick={clearCanvas}
                        className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 hover:text-red-500 transition-colors font-bold group"
                    >
                        [RESET_PAGE]
                    </button>
                 </div>

                 <div className="flex items-center gap-4 bg-white/80 backdrop-blur border border-brand-navy/10 px-4 py-2 rounded-full">
                     <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">Export:</span>
                     <button onClick={() => downloadSketch('png')} className="font-mono text-[10px] uppercase font-bold hover:text-brand-purple transition-colors">PNG</button>
                     <span className="opacity-20">|</span>
                     <button onClick={() => downloadSketch('jpg')} className="font-mono text-[10px] uppercase font-bold hover:text-brand-purple transition-colors">JPG</button>
                 </div>
            </div>
        </div>

        {/* Layer 3: Main Content (Logo + Button) */}
        <div className="relative z-30 flex flex-col items-center pointer-events-none select-none p-4 max-w-full mt-auto mb-16 md:mb-32">
            
            {/* SVG Logo Animation (RESTORED) */}
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

            {/* Entry Button */}
            <div className="flex flex-col items-center pointer-events-auto min-h-[80px]">
                {!isReady ? (
                    <div className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-navy/40 animate-pulse font-bold">
                        Loading {progress}%
                    </div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={onEnter}
                        className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] font-bold bg-brand-navy text-brand-offwhite px-6 sm:px-8 md:px-10 py-4 hover:bg-brand-purple hover:scale-105 transition-all duration-300 shadow-xl whitespace-nowrap"
                    >
                        ENTER SITE
                    </motion.button>
                )}
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-brand-purple/50 font-bold"
            >
                [ Use pen or cursor to sketch ]
            </motion.div>
        </div>
    </motion.div>
  );
};

export default Loader;