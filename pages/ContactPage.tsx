import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { QA_DATA } from '../constants';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vibe: '',
    message: ''
  });
  
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vibe) {
        alert("Select a vibe so we know where to start.");
        return;
    }
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('API Error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const inputClass = "bg-transparent border-b-2 border-brand-navy/20 text-brand-navy font-mono text-xl md:text-2xl focus:border-brand-purple focus:outline-none placeholder-brand-navy/30 w-full py-6 transition-all duration-300";

  return (
    <div className="bg-brand-offwhite min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="container mx-auto px-8 pt-48 pb-32 flex-grow">
        <AnimatedSection>
            <div className="max-w-3xl mx-auto">
                
                {status !== 'success' && (
                    <header className="mb-24 text-left">
                        <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold block mb-4">Conversation</span>
                        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tight text-brand-navy leading-[0.85]">
                            Let's Start<br/>Something.
                        </h1>
                        <p className="mt-8 text-xl text-brand-navy/60 max-w-xl font-medium">
                            Have a vision? A struggle? A dream? Tell us what's on your mind. Drop us a line below or grab a time on our calendar.
                        </p>
                    </header>
                )}

                <div className={`relative transition-all duration-500 mb-24 ${status === 'success' ? '' : 'bg-white border border-brand-navy/10 p-8 md:p-16 shadow-xl'}`}>
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="min-h-[60vh] flex flex-col items-center justify-center text-center border-2 border-brand-navy p-8 md:p-16 bg-white shadow-[16px_16px_0px_0px_#0F0328]"
                            >
                                <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-brand-navy">
                                    <span className="text-4xl text-brand-navy font-bold">✓</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-navy mb-4 leading-none">Talk soon.</h2>
                                <p className="font-body text-xl text-brand-navy/60 max-w-md mx-auto mb-12">
                                    Your message has hit our inbox. One of us will dive into the details and reach out within 24 hours.
                                </p>
                                <div className="bg-brand-navy/5 border-l-4 border-brand-purple p-8 text-left w-full max-w-md mx-auto font-mono">
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2">Thread Reference</p>
                                    <p className="text-xl font-bold text-brand-navy">#COOLO_{Math.floor(Math.random() * 100000)}</p>
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mt-6 mb-2">Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="font-mono text-sm font-bold text-brand-navy uppercase tracking-tighter">Thinking about your project</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="mt-12 font-mono text-xs uppercase font-black tracking-[0.2em] border-b-2 border-brand-navy pb-1 hover:text-brand-purple transition-all"
                                >
                                    Start New Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-2">
                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Your Name</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Steve Wozniak" className={inputClass} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">Email Address</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="woz@apple.com" className={inputClass} />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">What's the vibe?</label>
                                    <div className="flex flex-wrap gap-4">
                                        {['Brand New Thing', 'Leveling Up', 'Agency Partner'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setFormData({...formData, vibe: option})}
                                                className={`px-8 py-4 font-mono text-sm uppercase font-bold border-2 transition-all ${formData.vibe === option ? 'bg-brand-purple border-brand-purple text-white shadow-lg scale-105' : 'border-brand-navy/10 text-brand-navy hover:border-brand-purple hover:text-brand-purple'}`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold">The Story</label>
                                    <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us about the timeline, the struggle, or the dream..." className="w-full bg-brand-navy/5 border-0 p-8 font-body text-lg text-brand-navy placeholder-brand-navy/30 min-h-[200px] resize-y focus:ring-2 focus:ring-brand-purple transition-all" />
                                </div>

                                <div className="pt-8 border-t border-brand-navy/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <button type="submit" disabled={status === 'submitting'} className="group flex items-center gap-6 text-4xl md:text-6xl font-black uppercase text-brand-navy hover:text-brand-purple transition-colors disabled:opacity-50" >
                                        <span>{status === 'submitting' ? 'Sending...' : 'Send it'}</span>
                                        <span className="group-hover:translate-x-4 transition-transform duration-300">→</span>
                                    </button>
                                    <p className="font-mono text-[10px] uppercase text-brand-navy/40 max-w-[200px]">Humans behind the machine. We'll reply personally within 24h.</p>
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-500 font-mono text-xs uppercase font-bold tracking-widest bg-red-50 p-4 border-l-4 border-red-500">Something went wrong. Email hey@coolo.co.nz directly.</p>
                                )}
                            </form>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- CALENDAR INTEGRATION PLACEHOLDER --- */}
                <div className="mt-16 bg-brand-purple/5 border border-brand-purple/20 p-8 md:p-12 text-center rounded-sm">
                    <h3 className="text-3xl font-black uppercase mb-4 text-brand-navy">Or Book a Time</h3>
                    <p className="font-body text-lg text-brand-navy/70 mb-8 max-w-lg mx-auto">
                        Skip the forms and jump straight into a call. Find a time that works for you.
                    </p>
                    <button className="bg-brand-purple text-brand-offwhite px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy transition-colors">
                        Open Calendar
                    </button>
                </div>
            </div>
        </AnimatedSection>
        
        {/* --- FAQ SECTION (Accordion Style) --- */}
        <AnimatedSection>
            <div className="mt-40 border-t border-brand-navy/10 pt-24 max-w-5xl mx-auto">
                <header className="mb-24 text-left">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                        The Fine Print
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-brand-navy leading-[0.9]">
                        The <span className="text-brand-purple italic">Truth.</span>
                    </h2>
                    <p className="font-body text-xl md:text-2xl text-brand-navy/70 mt-8 leading-tight max-w-3xl">
                        You have questions. We have honest answers. <br/>
                        No corporate jargon. No sales fluff. Just the raw data on how we work, what we charge, and why we do it.
                    </p>
                </header>

                <div className="space-y-16">
                    {QA_DATA.map((section, i) => (
                        <div key={i} className="pt-8 border-t-2 border-brand-navy">
                            <h3 className="font-mono text-brand-navy uppercase tracking-widest text-sm font-bold mb-8">
                                {String(i + 1).padStart(2, '0')} / {section.category}
                            </h3>
                            
                            <div className="space-y-2">
                                {section.questions.map((item, j) => {
                                    const faqId = `${i}-${j}`;
                                    const isExpanded = openFaq === faqId;

                                    return (
                                        <div 
                                            key={j} 
                                            className="group border-b border-brand-navy/10 last:border-0"
                                        >
                                            <button 
                                                onClick={() => toggleFaq(faqId)}
                                                className="w-full text-left py-6 flex justify-between items-center gap-6 cursor-pointer focus:outline-none"
                                            >
                                                <h4 className={`text-2xl md:text-4xl font-black uppercase italic transition-colors duration-300 ${isExpanded ? 'text-brand-purple' : 'text-brand-navy group-hover:text-brand-purple'}`}>
                                                    "{item.q}"
                                                </h4>
                                                <span className="text-4xl text-brand-navy font-mono flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    {isExpanded ? '-' : '+'}
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pb-8 pt-2 pl-4 md:pl-8 border-l-4 border-brand-purple/50">
                                                            <p className="font-body text-lg md:text-xl leading-relaxed text-brand-navy/80">
                                                                {item.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default ContactPage;