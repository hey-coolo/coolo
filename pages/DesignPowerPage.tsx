import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Layers, Feathers, ShieldAlert } from 'lucide-react';

const DesignPowerPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const modules = [
    {
      num: "01",
      title: "Visual Identity Systems",
      details: ["Logo System Blueprints", "Typographic Matrices", "Color Frequency Guides", "Brand Usage Rulebooks"]
    },
    {
      num: "02",
      title: "Digital Interface Dev",
      details: ["High-Contrast UI Layouts", "Webflow Production Launch", "Responsive System Tuning", "Interaction Latency Safety"]
    },
    {
      num: "03",
      title: "Kinetic Media & Motion",
      details: ["3D Realtime Texturing", "Kinetic Type Engines", "Campaign Motion Toolkits", "Vector Assets Tuning"]
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-brand-navy text-white overflow-hidden studio-grid">
      <Helmet>
        <title>Design Power & Identity Systems | COOLO</title>
        <meta name="description" content="High-impact aesthetic execution for industry leaders. We engineering visual guidelines, advanced interface systems, and vector playbooks." />
      </Helmet>

      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-44 pb-32">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-brand-lavender hover:text-brand-yellow transition-colors group"
          >
            <ArrowLeft size={12} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Service Leg 02 / Design Systems</span>
          </Link>
        </motion.div>

        {/* Clamped and Safely Scaled Heading Blocks to Ensure Safe Multi-line Wraps */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="border-b border-white/5 pb-16 mb-24"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white max-w-5xl select-text">
            Design Power<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-offwhite to-brand-yellow">High Contrast</span> &<br />
            Visual Identity Systems<span className="text-brand-purple">.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
            <div className="lg:col-span-4 font-mono text-[10px] uppercase tracking-widest text-brand-yellow font-bold flex items-center gap-2">
              <Layers size={12} />
              <span>[ VISUAL ASSETS MATRIX // SYS_02 ]</span>
            </div>
            <div className="lg:col-span-8">
              <p className="font-body text-lg md:text-xl font-light leading-relaxed text-white/70 max-w-2xl">
                We build adaptive typographic architectures and interface environments that perform flawlessly across desktop, tablet, and mobile dimensions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modules Loop Segment */}
        <div className="space-y-6 mb-32">
          {modules.map((mod) => (
            <div key={mod.num} className="bg-platform-dark/20 border border-white/5 p-8 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:bg-platform-dark/40 transition-colors duration-300">
              <div className="lg:col-span-2 font-mono text-3xl font-black text-brand-purple">// {mod.num}</div>
              <div className="lg:col-span-5">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">{mod.title}</h3>
              </div>
              <div className="lg:col-span-5">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] text-white/60">
                  {mod.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-brand-yellow rounded-full"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Lower Call to Action Frame */}
        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-2">Launch Architecture</span>
            <h3 className="text-3xl font-black uppercase tracking-tight text-white">Require custom corporate visual setups?</h3>
          </div>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 bg-white text-brand-navy font-mono text-xs uppercase font-black py-4 px-10 border border-white hover:bg-transparent hover:text-white transition-all duration-300 transform-gpu"
          >
            <span>Deploy Design Pipeline</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DesignPowerPage;