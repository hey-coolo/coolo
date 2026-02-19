import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { AuditResult } from '../types';

interface AuditDashboardProps {
  result: AuditResult;
  onReset: () => void;
}

const AuditDashboard: React.FC<AuditDashboardProps> = ({ result, onReset }) => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    // Helper function for the brutalist footer
    const addFooter = (doc: jsPDF, pageNum: number) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0); 
        doc.text("COOLO.CO.NZ", margin, pageHeight - 15);
        doc.text("HEY@COOLO.CO.NZ", pageWidth - margin, pageHeight - 15, { align: "right" });
        doc.text(`--- PAGE ${pageNum} ---`, pageWidth / 2, pageHeight - 15, { align: "center" });
    };

    let pageNum = 1;

    // --- PAGE 1: COVER & VERDICT ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("COOLO_FREE BRAND AUDIT", margin, margin);
    
    doc.setFontSize(40);
    doc.text("REALITY", margin, 45);
    doc.text("CHECK.", margin, 60);

    doc.setLineWidth(1);
    doc.line(margin, 70, pageWidth - margin, 70);

    doc.setFontSize(14);
    doc.text("THE VERDICT:", margin, 90);
    doc.setFont("helvetica", "normal");
    const splitVerdict = doc.splitTextToSize(result.verdict, pageWidth - margin * 2);
    doc.text(splitVerdict, margin, 100);

    let yPos = 100 + (splitVerdict.length * 7) + 15;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("THE VIBE SCORE:", margin, yPos);
    doc.setFontSize(50);
    doc.text(`${result.totalScore} / 10`, margin, yPos + 18);

    addFooter(doc, pageNum);

    // --- PAGE 2: PILLARS ---
    doc.addPage();
    pageNum++;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("COOLO_FREE BRAND AUDIT // PILLARS", margin, margin);
    
    yPos = 40;
    result.pillars.forEach((p) => {
        // Page break logic if pillars run too long
        if (yPos > pageHeight - 40) {
            addFooter(doc, pageNum);
            doc.addPage();
            pageNum++;
            yPos = 40;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("COOLO_FREE BRAND AUDIT // PILLARS", margin, margin);
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`${p.pillar.toUpperCase()} — ${p.name.toUpperCase()} [ ${p.score}/10 ]`, margin, yPos);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const splitCritique = doc.splitTextToSize(p.critique, pageWidth - margin * 2);
        doc.text(splitCritique, margin, yPos + 8);
        
        yPos += 8 + (splitCritique.length * 5) + 15;
        
        doc.setLineWidth(0.2);
        doc.line(margin, yPos - 10, pageWidth - margin, yPos - 10);
    });

    addFooter(doc, pageNum);

    // --- PAGE 3: HARD TRUTHS ---
    doc.addPage();
    pageNum++;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("COOLO_FREE BRAND AUDIT // THE HARD TRUTHS", margin, margin);
    
    doc.setFontSize(24);
    doc.text("THE HARD QUESTIONS.", margin, 40);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Read your answers back. If it feels messy, that's normal.", margin, 50);
    doc.text("If you don't know the answers to these, you're guessing.", margin, 56);

    yPos = 75;
    result.hardQuestions.forEach((q, i) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        const splitQ = doc.splitTextToSize(`0${i+1} / ${q.toUpperCase()}`, pageWidth - margin * 2);
        doc.text(splitQ, margin, yPos);
        yPos += (splitQ.length * 6) + 12;
    });

    // Final CTA at the bottom of the last page
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CLARITY TAKES WORK.", margin, yPos + 10);

    addFooter(doc, pageNum);

    // Save the styled doc
    doc.save(`coolo-reality-check.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto pt-12">
      {/* Score Header */}
      <div className="flex flex-col md:flex-row border-2 border-brand-navy bg-white mb-8 shadow-[12px_12px_0px_0px_#0F0328]">
        <div className="bg-brand-navy text-brand-offwhite p-8 md:p-12 flex-grow">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-none">{result.verdict}</h2>
            <p className="font-mono text-xs uppercase tracking-widest mt-6 opacity-60">Deep Dive Analysis // System Active</p>
        </div>
        
        <div className="bg-brand-yellow p-8 md:p-12 text-center border-t-2 md:border-t-0 md:border-l-2 border-brand-navy min-w-[200px] md:min-w-[280px] flex flex-col justify-center flex-shrink-0">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest block mb-2">The Vibe Score</span>
            <div className="text-5xl md:text-6xl lg:text-7xl font-black leading-none flex justify-center items-baseline gap-1">
              {result.totalScore}
              <span className="text-lg md:text-xl opacity-60">/10</span>
            </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 border-2 border-brand-navy bg-white mb-12">
        {result.pillars.map((p, i) => (
          <div key={i} className="p-8 border-b-2 lg:border-b-0 lg:border-r-2 last:border-0 border-brand-navy group hover:bg-brand-navy/5 transition-colors">
            <div className="flex justify-between items-start">
              <span className="font-mono text-5xl opacity-10 font-black">{p.pillar}</span>
              <div className="font-mono font-black text-xl text-brand-navy">
                {p.score}<span className="text-sm opacity-40">/10</span>
              </div>
            </div>
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
                   <span className="font-mono text-[10px] uppercase tracking-widest text-brand-yellow">Rough numbers? Score below 8.0?</span>
                   <h3 className="text-4xl md:text-5xl font-black uppercase mt-4 mb-8 leading-[0.9]">Stop Guessing.<br/>Do the Work.</h3>
               </div>
               
               <div className="w-full flex flex-col gap-4 mt-auto">
                 <button 
                  onClick={() => navigate('/contact')} 
                  className="bg-brand-yellow text-brand-navy px-10 py-5 font-black uppercase tracking-widest hover:bg-brand-offwhite transition-all w-full"
                 >
                     Talk to the Humans
                 </button>
                 <button 
                  onClick={handleDownloadPDF} 
                  className="border-2 border-brand-yellow text-brand-yellow px-10 py-5 font-black uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-navy transition-all w-full"
                 >
                     Download Summary
                 </button>
               </div>
               
               <button onClick={onReset} className="mt-8 font-mono text-[10px] uppercase underline opacity-40 hover:opacity-100 transition-opacity">Scrub & Restart</button>
          </div>
      </div>
    </div>
  );
};

export default AuditDashboard;