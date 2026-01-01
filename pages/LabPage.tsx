
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { GoogleGenAI } from "@google/genai";
import { FAQ_DATA } from '../constants';

const LabPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'think' | 'faq'>('think');

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-48">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 max-w-5xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] mb-4 block font-bold">Studio Lab / Beta 01</span>
            <h1 className="text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
              Cognitive<br/><span className="text-brand-purple">Operatives</span>
            </h1>
            <p className="font-body text-2xl md:text-3xl text-brand-navy/70 mt-12 leading-tight">
              A sophisticated interface for brand intelligence. Leveraging 32K reasoning models for complex strategy and specialized assistants for studio clarity.
            </p>
          </header>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-navy/10 pt-12">
          {/* Navigation */}
          <div className="lg:col-span-3 space-y-4">
            {[
              { id: 'think', label: '01 Logic Engine', desc: 'Deep Reasoning Strategy' },
              { id: 'faq', label: '02 Concierge', desc: 'Interactive Studio FAQ' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`w-full text-left p-8 transition-all border-l-4 ${activeTool === tool.id ? 'border-brand-purple bg-brand-navy text-brand-offwhite' : 'border-transparent bg-brand-navy/5 text-brand-navy/40 hover:bg-brand-navy/10'}`}
              >
                <div className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-50">{tool.label}</div>
                <div className="font-sans text-2xl font-black uppercase mt-1 leading-none">{tool.desc}</div>
              </button>
            ))}
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-9 bg-white shadow-2xl min-h-[600px] border border-brand-navy/5 p-16 relative">
             <div className="absolute top-8 right-8 font-mono text-[10px] uppercase font-black text-brand-purple opacity-30">Active Session // Node_Alpha</div>
            {activeTool === 'think' && <ThinkingTool />}
            {activeTool === 'faq' && <FAQAssistantTool />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ThinkingTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReason = async () => {
    if (!query) return;
    setLoading(true);
    setResult('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: query,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          systemInstruction: "You are the COOLO Studio Brain. Specialized in high-end brand strategy, 3D design logic, and senior creative operations. Provide deep, brutally honest, and architecturally sound reasoning."
        },
      });
      setResult(response.text || 'Synthesis incomplete.');
    } catch (e) {
      setResult(`System Error: ${e instanceof Error ? e.message : 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-5xl font-black uppercase text-brand-navy tracking-tight">Logic Engine</h2>
        <p className="font-body text-brand-navy/50 mt-4 text-xl">Deploying 32,768 reasoning tokens to deconstruct your branding challenges.</p>
      </div>
      <div className="space-y-6">
        <textarea 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Present your most complex brand friction or strategic query..."
          className="w-full h-48 p-8 bg-brand-offwhite border-none focus:ring-2 focus:ring-brand-purple text-xl font-body text-brand-navy resize-none shadow-inner"
        />
        <button 
          onClick={handleReason}
          disabled={loading}
          className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-bold py-8 hover:bg-brand-purple transition-all disabled:opacity-50 text-xl tracking-widest"
        >
          {loading ? 'Processing Logic Cores...' : 'Initiate Deep Synthesis'}
        </button>
      </div>
      {result && (
        <div className="p-12 bg-brand-offwhite border-l-8 border-brand-purple whitespace-pre-wrap font-body text-lg leading-relaxed text-brand-navy shadow-inner">
          <div className="font-mono text-[10px] uppercase font-bold tracking-widest mb-6 opacity-30">Cognitive Output // Level 01 Strategy</div>
          {result}
        </div>
      )}
    </div>
  );
};

const FAQAssistantTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    setAnswer('');
    
    const faqContext = FAQ_DATA.map(cat => 
        `[${cat.category}]\n` + 
        cat.questions.map(q => `Q: ${q.q}\nA: ${q.a}`).join('\n')
    ).join('\n\n');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: `You are the COOLO Concierge. Answer questions using the studio context provided. Be professional, senior, and slightly brutalist. If unsure, suggest emailing hey@coolo.co.nz.\n\nSTUDIO DATA:\n${faqContext}`
        },
      });
      setAnswer(response.text || 'Query redirected to support.');
    } catch (e) {
      setAnswer(`Communication Error: ${e instanceof Error ? e.message : 'Timeout'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-5xl font-black uppercase text-brand-navy tracking-tight">Studio Concierge</h2>
        <p className="font-body text-brand-navy/50 mt-4 text-xl">Immediate clarity on our senior units, NZ-based operations, and the No Magic Formula™.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Query studio protocols..."
          className="flex-grow p-8 bg-brand-offwhite border-none focus:ring-2 focus:ring-brand-purple text-xl font-body text-brand-navy shadow-inner"
        />
        <button 
          onClick={handleAsk}
          disabled={loading}
          className="bg-brand-navy text-brand-offwhite font-mono uppercase font-bold px-16 py-8 hover:bg-brand-purple transition-all disabled:opacity-50 text-xl tracking-widest"
        >
          {loading ? 'Consulting...' : 'Inquire'}
        </button>
      </div>
      {answer && (
        <div className="p-12 bg-brand-yellow/5 border border-brand-yellow/20 font-body text-2xl leading-relaxed text-brand-navy relative">
            <div className="absolute top-0 left-0 w-12 h-1 bg-brand-yellow"></div>
            {answer}
        </div>
      )}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Studio Location Strategy', 'Senior-only unit logic', 'Brand OS definition', 'Partnership scale'].map((q) => (
            <button 
                key={q} 
                onClick={() => setQuery(q)}
                className="text-left p-6 font-mono text-xs uppercase tracking-[0.2em] font-black text-brand-navy/40 hover:text-brand-purple border border-brand-navy/5 hover:bg-brand-offwhite transition-all flex justify-between items-center"
            >
                {q} <span>&rarr;</span>
            </button>
        ))}
      </div>
    </div>
  );
};

export default LabPage;
