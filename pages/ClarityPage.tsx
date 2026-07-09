import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Target, ShieldCheck, Eye, Terminal } from 'lucide-react';

const ClarityPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const frameworks = [
    {
      step: "01",
      tag: "DISCOVERY MATRIX",
      title: "Core Brand Realignment",
      desc: "Deconstructing current position channels to uncover the absolute operational clarity of your value offering."
    },
    {
      step: "02",
      tag: "AUDIENCE MODEL",
      title: "Archetype Extraction",
      desc: "Mapping specific user profiles to isolate high-value behavioral paths and direct communication avenues."
    },
    {
      step: "03",
      tag: "ARCHITECTURAL BLUEPRINT",
      title: "Strategic Architecture",
      desc: "Assembling a complete visual playbook specifying verbal posture, typography mechanics, and tonal foundations."
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-brand-navy text-white overflow-hidden studio-grid">
      <Helmet>
        <title>Clarity & Brand Strategy Sessions | COOLO</title>
        <meta name="description" content="Translate raw vision into pure competitive positioning. Our corporate clarity sprint systems map structural brand values to premium digital outputs." />
      </Helmet>

      {/* Decorative Ambient Aura Accent */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-44 pb-32">
        
        {/* Dynamic Editorial Breadcrumb Area */}
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
            <span>Service Leg 01 / Strategy Sessions</span>
          </Link>
        </motion.div>

        {/* Recalibrated Responsive Header Scale for Cross-Device Legibility */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="border-b border-white/5 pb-16 mb-24"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white max-w-5xl select-text">
            Brand Strategy<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-offwhite to-brand-lavender">Core Building</span> &<br />
            Positioning Alignment<span className="text-brand-yellow">.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
            <div className="lg:col-span-4 font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold flex items-center gap-2">
              <Terminal size={12} />
              <span>[ CLARITY VECTORS // PROTOCOL 01 ]</span>
            </div>
            <div className="lg:col-span-8">
              <p className="font-body text-lg md:text-xl font-light leading-relaxed text-white/70 max-w-2xl">
                We eliminate structural translation errors between what a founder intends and what the market perceives. This strategy track strips away arbitrary decoration to isolate your true competitive baseline.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Framework Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {frameworks.map((fw) => (
            <div 
              key={fw.step} 
              className="bg-platform-dark/30 border border-white/5 p-8 rounded-sm backdrop-blur-md flex flex-col justify-between group hover:border-brand-purple/50 transition-colors duration-400"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span className="font-mono text-xs text-brand-purple group-hover:text-brand-yellow transition-colors font-bold">// {fw.step}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 bg-white/5 px-2.5 py-0.5 rounded-full">{fw.tag}</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">{fw.title}</h3>
                <p className="font-body text-sm font-light text-white/60 leading-relaxed">{fw.desc}</p>
              </div>
              <div className="pt-8 mt-12 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white">System Anchor Active</span>
                <Target size={12} className="text-brand-yellow" />
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Value Prop Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-platform-dark/20 border border-white/5 p-8 md:p-16 rounded-sm mb-32">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-yellow font-bold block mb-4">// CORE ALIGNMENT</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Imposing Coherence On Complex Entities.
            </h2>
          </div>
          <div className="lg:col-span-7 font-body text-base font-light text-white/70 space-y-6">
            <p className="leading-relaxed">
              Improvised brands bleed market share because their visual messaging feels disjointed. Through systematic sprint windows, we consolidate your strategic assets into a pristine, high-contrast platform profile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-mono text-[11px] text-white/90">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-purple" />
                <span>Playbook Deployment Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-brand-purple" />
                <span>Prismatic Market Testing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-2">Next Phase</span>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Ready to extract absolute clarity?</h3>
          </div>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 bg-white text-brand-navy pr-12 pl-10 py-4.5 font-mono text-xs uppercase font-black border border-white hover:bg-transparent hover:text-white transition-all duration-300 transform-gpu"
          >
            <span>Initiate Strategy Sprint</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ClarityPage;