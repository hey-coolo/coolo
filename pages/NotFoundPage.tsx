import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-brand-navy rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-brand-purple rounded-full blur-[100px]"></div>
        </div>

      <div className="container mx-auto px-8 relative z-10">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block border border-brand-navy/20 bg-brand-navy/5 px-4 py-1 rounded-full mb-8">
                <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[10px] font-bold">
                Error Code: 404
                </span>
            </div>
            
            <h1 className="text-9xl md:text-[18vw] font-black uppercase tracking-tighter leading-[0.8] text-brand-navy mb-8 select-none">
              Signal<br/><span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #3A0888' }}>Lost.</span>
            </h1>
            
            <p className="font-body text-2xl md:text-3xl text-brand-navy/70 leading-tight max-w-2xl mx-auto mb-16">
              You've drifted into the void. This page has been scrubbed, moved, or never existed in this timeline.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <Link 
                to="/" 
                className="inline-block bg-brand-navy text-brand-offwhite font-mono uppercase font-bold px-12 py-5 hover:bg-brand-purple transition-all duration-300 shadow-[8px_8px_0px_0px_#FCC803] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                Return to Base
                </Link>
                <Link 
                to="/contact" 
                className="inline-block border-b-2 border-brand-navy pb-1 font-mono text-xs uppercase font-bold text-brand-navy tracking-widest hover:text-brand-purple hover:border-brand-purple transition-all"
                >
                Report Broken Link
                </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NotFoundPage;