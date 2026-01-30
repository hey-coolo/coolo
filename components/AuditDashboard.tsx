import React from 'react';
import { Link } from 'react-router-dom';
import { AuditResult } from '../types';

interface AuditDashboardProps {
  result: AuditResult;
  onReset: () => void;
}

const AuditDashboard: React.FC<AuditDashboardProps> = ({ result, onReset }) => {
  const pillars = result.pillars || [];
  const hardQuestions = result.hardQuestions || [];

  return (
    <div className="w-full max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      
      {/* BRAND REPORT HEADER */}
      <div className="flex flex-col md:flex-row border-t-2 border-brand-navy mb-12">
        <div className="p-4 border-r-0 md:border-r-2 border-brand-navy md:w-32 flex items-center justify-center bg-brand-navy text-brand-offwhite">
            <span className="text-[10px] tracking-widest uppercase rotate-0 md:-rotate-90 whitespace-nowrap font-bold">
                Reality Check v2.0
            </span>
        </div>
        <div className="p-8 md:p-12 flex-grow bg-white border-x-2 md:border-x-0 border-b-2 md:border-b-0 border-brand-navy">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-brand-navy">
                {result.verdict}
            </h1>
            <div className="h-1 w-24 bg-brand-purple mb-4"></div>
            <p className="text-xs md:text-sm font-mono opacity-60 uppercase tracking-widest text-brand-navy">
                Automated Strategic Analysis
            </p>
        </div>
        <div className="p-8 md:p-12 md:w-72 border-l-2 border-brand-navy flex flex-col justify-center items-center md:items-end bg-brand-yellow text-brand-navy">
            <span className="text-xs font-bold tracking-widest mb-1 opacity-50 uppercase">Overall Rating</span>
            <div className="flex items-baseline">
                <span className="text-7xl font-black leading-none tracking-tighter">
                    {result.totalScore}
                </span>
                <span className="text-xl opacity-50 ml-1 font-bold">/10</span>
            </div>
        </div>
      </div>

      {/* PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 border-2 border-brand-navy bg-white shadow-[12px_12px_0px_0px_#0F0328]">
        {pillars.length > 0 ? (
          pillars.map((pillar, idx) => (
            <div 
                key={idx} 
                className="group relative border-b-2 md:border-b-0 md:border-r-2 border-brand-navy last:border-r-0 p-6 flex flex-col justify-between min-h-[350px] hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300"
            >
              <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-6xl font-black opacity-10 group-hover:opacity-100 group-hover:text-brand-yellow transition-all duration-300">
                        {pillar.pillar}
                    </span>
                    <div className="border-2 border-current px-2 py-1 text-sm font-mono font-bold group-hover:text-brand-yellow group-hover:border-brand-yellow">
                        {pillar.score}
                    </div>
                  </div>
                  <h3 className="text-sm font-black tracking-widest mb-4 uppercase border-b-2 border-current pb-2 inline-block group-hover:border-brand-yellow">
                    {pillar.name}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-80 font-medium group-hover:opacity-100">
                    {pillar.critique}
                  </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-5 p-12 text-center opacity-50 font-mono">DATA_CORRUPTION // No data available.</div>
        )}
      </div>

      {/* FOOTER ACTION AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        
        {/* HARD QUESTIONS */}
        <div className="p-8 md:p-12 border-2 border-brand-navy bg-white">
          <h3 className="text-xs font-bold tracking-widest mb-8 text-brand-purple uppercase">
            Hard Questions to Answer
          </h3>
          <ul className="space-y-6">
            {hardQuestions.map((q, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-xs border border-brand-navy/30 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1 text-brand-navy font-bold">
                      {i + 1}
                  </span>
                  <span className="text-lg leading-tight font-bold text-brand-navy">{q}</span>
                </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center bg-brand-navy text-brand-offwhite relative overflow-hidden border-2 border-brand-navy shadow-[12px_12px_0px_0px_#FCC803]">
            <div className="relative z-10">
                <p className="text-xs font-mono mb-4 text-brand-yellow uppercase tracking-widest">Score below 8.0?</p>
                <h3 className="text-4xl font-black mb-8 uppercase tracking-tight leading-none">
                    Stop Guessing.<br/>Start Revealing.
                </h3>
                <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
                    <Link 
                        to="/contact" 
                        className="bg-brand-yellow text-brand-navy py-4 px-6 font-mono font-bold tracking-widest hover:bg-white transition-colors uppercase text-sm border-2 border-brand-navy"
                    >
                        Fix The Signal
                    </Link>
                    <button 
                        onClick={onReset}
                        className="text-xs tracking-widest underline decoration-brand-offwhite/30 hover:decoration-brand-yellow hover:text-brand-yellow opacity-60 hover:opacity-100 transition-all uppercase font-mono mt-4"
                    >
                        Run Another Audit
                    </button>
                </div>
            </div>
            
            {/* Background Vibe */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;