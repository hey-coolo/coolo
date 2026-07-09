import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Terminal, CheckCircle2 } from 'lucide-react';
import { SERVICE_LEGS } from '../constants';

const ServicesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-brand-navy text-white overflow-hidden studio-grid pt-44 pb-32">
      <Helmet>
        <title>Studio Services & Capabilities | COOLO</title>
        <meta name="description" content="Explore our core services matrix. From comprehensive brand alignment sprints to Webflow product infrastructure deployment." />
      </Helmet>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Adjusted Display Title To Prevent Screen Scale Breakage */}
        <div className="border-b border-white/5 pb-16 mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-purple font-bold block mb-4">
            [ STUDIO DEPLOYMENT ARCHITECTURE ]
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white max-w-4xl">
            Our Core Studio<br />
            Capabilities Matrix<span className="text-brand-yellow">.</span>
          </h1>
          <p className="mt-8 font-body text-lg md:text-xl font-light text-white/60 max-w-2xl leading-relaxed">
            We deliver tailored operational assets across three critical axes of growth. No templates, no generic corporate structures—just premium customized workflows.
          </p>
        </div>

        {/* Dynamic Grid Layout for Original Constants Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {SERVICE_LEGS.map((service, idx) => (
            <div 
              key={service.id}
              className="bg-platform-dark/20 border border-white/5 rounded-sm p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <span className="font-mono text-xs text-brand-purple font-bold">// 0{idx + 1}</span>
                  <span className="font-mono text-[9px] text-white/40 tracking-wider uppercase font-bold">{service.visual.split(',')[0]}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
                  {service.title}
                </h2>
                <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
                  {service.subtitle}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-auto">
                <Link 
                  to={service.path}
                  className="w-full inline-flex items-center justify-between font-mono text-[11px] uppercase tracking-widest font-bold text-white hover:text-brand-yellow transition-colors group"
                >
                  <span>Explore Protocol Details</span>
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-brand-purple group-hover:text-brand-yellow" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Infrastructure Framework */}
        <div className="bg-platform-dark/30 border border-white/5 p-8 md:p-12 rounded-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Terminal size={16} className="text-brand-yellow" />
              <span>Production Pipeline Standards</span>
            </h3>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              Every digital asset designed by COOLO is built on zero-latency visual framework layers. We enforce absolute code maintainability, complete semantic accessibility compliance, and pixel-perfect rendering across mobile, desktop, and tablet screen form factors.
            </p>
          </div>
          <Link 
            to="/contact" 
            className="w-full lg:w-auto text-center bg-brand-purple hover:bg-brand-yellow text-white hover:text-brand-navy font-mono text-xs uppercase font-black py-4 px-10 rounded-xs transition-colors duration-300 whitespace-nowrap"
          >
            Start Digital Intake
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;