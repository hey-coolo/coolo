// components/AuditDashboard.tsx
import React from 'react';
import { AuditResult } from '../types';

interface AuditDashboardProps {
  result: AuditResult;
  onReset: () => void;
}

const AuditDashboard: React.FC<AuditDashboardProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-6xl mx-auto pt-12">
      {/* Score Header */}
      <div className="flex flex-col md:flex-row border-2 border-brand-navy bg-white mb-8 shadow-[12px_12px_0px_0px_#0F0328]">
        <div className="bg-brand-navy text-brand-offwhite p-12 flex-grow">
            <h2 className="text-4xl md:text-7xl font-black uppercase leading-none">{result.verdict}</h2>
            <p className="font-mono text-xs uppercase tracking-widest mt-6 opacity-60">Deep Dive Analysis // System Active</p>
        </div>
        <div className="bg-brand-yellow p-12 text-center border-l-2 border-brand-navy min-w-[240px] flex flex-col justify-center">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest">The Vibe Score</span>
            <div className="text-9xl font-black">{result.totalScore}<span className="text-xl">/10</span></div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 border-2 border-brand-navy bg-white mb-12">
        {result.pillars.map((p, i) => (
          <div key={i} className="p-8 border-b-2 md:border-b-0 md:border-r-2 last:border-0 border-brand-navy group hover:bg-brand-navy/5 transition-colors">
            <span className="font-mono text-5xl opacity-10 font-black">{p.pillar}</span>
            <h4 className="font-black uppercase text-xs tracking-widest mt-2">{p.name}</h4>
            <p className="text-sm mt-6 text-brand-navy/70 leading-relaxed font-medium">{p.critique}</p>
          </div>
        ))}
      </div>

      {/* Questions & Action CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-brand-navy p-12 bg-white">
              <h4 className="font-mono text-[10px] uppercase font-black tracking-widest text-brand-purple mb-8">Hard Truths</h4>
              <ul className="space-y-6">
                  {result.hardQuestions.map((q, i) => (
                      <li key={i} className="flex gap-4 items-start">
                          <span className="w-6 h-6 rounded-full border border-brand-navy flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i+1}</span>
                          <p className="font-sans font-black text-xl uppercase leading-tight">{q}</p>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="bg-brand-navy text-brand-offwhite p-12 flex flex-col justify-between items-center text-center shadow-[12px_12px_0px_0px_#FCC803]">
               <div>
                   <span className="font-mono text-[10px] uppercase tracking-widest text-brand-yellow">Rough numbers?</span>
                   <h3 className="text-4xl md:text-5xl font-black uppercase mt-4 mb-8 leading-[0.9]">Stop Guessing.<br/>Fix the Signal.</h3>
               </div>
               <button className="bg-brand-yellow text-brand-navy px-10 py-5 font-black uppercase tracking-widest hover:bg-brand-offwhite transition-all w-full">
                   Talk to the Humans
               </button>
               <button onClick={onReset} className="mt-8 font-mono text-[10px] uppercase underline opacity-40 hover:opacity-100 transition-opacity">Scrub & Restart</button>
          </div>
      </div>
    </div>
  );
};

export default AuditDashboard;