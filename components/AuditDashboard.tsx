import React from 'react';
import { AuditResult } from '../types';

interface AuditDashboardProps {
  result: AuditResult;
  onReset: () => void;
}

const AuditDashboard: React.FC<AuditDashboardProps> = ({ result, onReset }) => {
  const pillars = result.pillars || [];
  const hardQuestions = result.hardQuestions || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 animate-[fadeIn_0.5s_ease-out]">
      
      {/* BRAND REPORT HEADER */}
      <div className="flex flex-col md:flex-row border-t-2 border-brand-navy mb-8">
        <div className="p-4 border-r border-brand-navy/10 md:w-32 flex items-center justify-center">
            <span className="text-[10px] tracking-widest uppercase rotate-0 md:-rotate-90 whitespace-nowrap opacity-50">
                Reality Check v2.0
            </span>
        </div>
        <div className="p-4 md:p-8 flex-grow">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-brand-navy">
                {result.verdict}
            </h1>
            <div className="h-1 w-24 bg-brand-purple mb-4"></div>
            <p className="text-xs md:text-sm font-mono opacity-60 uppercase tracking-widest text-brand-navy">
                Automated Strategic Analysis
            </p>
        </div>
        <div className="p-4 md:p-8 md:w-64 border-l border-brand-navy/10 flex flex-col justify-center items-center md:items-end bg-brand-navy/5">
            <span className="text-xs font-bold tracking-widest mb-1 opacity-50 text-brand-navy">OVERALL RATING</span>
            <div className="flex items-baseline text-brand-navy">
                <span className="text-6xl md:text-7xl font-bold leading-none">
                    {result.totalScore}
                </span>
                <span className="text-xl opacity-50 ml-2 font-light">/10</span>
            </div>
        </div>
      </div>

      {/* PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 border-2 border-brand-navy">
        {pillars.length > 0 ? (
          pillars.map((pillar, idx) => (
            <div 
                key={idx} 
                className="group relative border-b md:border-b-0 md:border-r border-brand-navy/10 last:border-r-0 p-6 flex flex-col justify-between min-h-[320px] hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300"
            >
              <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-5xl font-bold opacity-20 group-hover:opacity-100 transition-opacity">
                        {pillar.pillar}
                    </span>
                    <div className="border border-current px-2 py-1 text-sm font-mono font-bold">
                        {pillar.score}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.2em] mb-4 uppercase border-b border-current pb-2 inline-block">
                    {pillar.name}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-80 font-medium">
                    {pillar.critique}
                  </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-5 p-12 text-center opacity-50">No data available.</div>
        )}
      </div>

      {/* FOOTER ACTION AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-x-2 border-b-2 border-brand-navy mt-8 md:mt-0">
        
        {/* HARD QUESTIONS */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-brand-navy/10">
          <h3 className="text-xs font-bold tracking-widest mb-8 opacity-50 uppercase text-brand-navy">
            Hard Questions to Answer
          </h3>
          <ul className="space-y-6">
            {hardQuestions.map((q, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-xs border border-brand-navy/30 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1 text-brand-navy">
                      {i + 1}
                  </span>
                  <span className="text-lg leading-tight font-medium text-brand-navy">{q}</span>
                </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center bg-brand-navy/5 relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-xs font-mono mb-4 opacity-50 text-brand-navy">SCORE BELOW 8.0?</p>
                <h3 className="text-3xl font-bold mb-8 uppercase max-w-sm mx-auto text-brand-navy">
                    Stop Guessing.<br/>Start Revealing.
                </h3>
                <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
                    <a 
                        href="/contact" 
                        className="bg-brand-navy text-brand-offwhite py-4 px-6 font-bold tracking-widest hover:bg-brand-purple transition-colors uppercase text-sm"
                    >
                        Work With Coolo
                    </a>
                    <button 
                        onClick={onReset}
                        className="text-xs tracking-widest underline decoration-brand-navy/30 hover:decoration-brand-navy text-brand-navy opacity-60 hover:opacity-100 transition-all uppercase"
                    >
                        Run Another Audit
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;