import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { Drop } from '../types';
import { Helmet } from 'react-helmet-async';

const AboutPage: React.FC = () => {
  const [featuredDrop, setFeaturedDrop] = useState<Drop | null>(null);

  useEffect(() => {
    // Fetch the latest product from the store to feature on the About page
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Grab the first live drop
          const liveDrop = data.find((d: Drop) => d.status === 'Live') || data[0];
          setFeaturedDrop(liveDrop);
        }
      })
      .catch(err => console.error("Error fetching featured drop:", err));
  }, []);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "COOLO Studio",
      "url": "https://coolo.co.nz",
      "logo": "https://coolo.co.nz/assets/logos/logo-dark.svg",
      "description": "A boutique creative and brand studio based in Mount Maunganui, New Zealand, specializing in brand strategy and digital design."
    }
  };

  return (
    <div className="bg-brand-offwhite pt-32">
      <Helmet>
        <title>About Us | COOLO Studio</title>
        <meta name="description" content="Learn about COOLO Studio, our design philosophy, and how we help businesses transition from improvised to intentional brand strategies." />
        <link rel="canonical" href="https://coolo.co.nz/about" />
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-8">
        
        {/* Header / Origin Story */}
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl relative">
            <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black block">Identity & Essence</span>
            </div>
            <h1 className="text-brand-navy text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] mt-8">
              Humans in<br/><span className="text-brand-purple italic">the Machine</span>
            </h1>
          </header>
        </AnimatedSection>

        {/* Narrative / History */}
        <section className="pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-brand-navy/10 pt-24">
            <div className="lg:col-span-5">
                <h2 className="text-4xl font-black uppercase tracking-tight text-brand-navy leading-none sticky top-32">
                    Calibrating<br/>The Signal.
                </h2>
            </div>
            <div className="lg:col-span-7 space-y-12 text-xl md:text-2xl font-light text-brand-navy/80 leading-relaxed">
                <AnimatedSection delay={100}>
                    <p>
                        Most brands don't have a design problem. <strong className="font-bold text-brand-navy">They have a clarity problem.</strong> That's where we start. We are here to help clarify what you do and how you say it. COOLO is a boutique creative and brand studio operating out of the coastal hub of <a href="https://www.bayofplentynz.com/places/mount-maunganui/" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-purple transition-colors">Mount Maunganui, New Zealand</a>. We partner with founders, marketing teams, and visionary entrepreneurs to help their businesses transition from improvised growth into an intentional, undeniable market presence.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                    <p>
                        In a digital landscape cluttered with fleeting trends and templated aesthetics, we believe in building systems that endure. Our philosophy is pretty simple: keep it functional, keep it intentional, and cut out the noise. We build brands that feel like a breath of fresh air. Ultimately understandable and completely authentic to who you are. We bring this exact rigor to how we structure brands today. We don't use templates. Our mission is to help you fix what's not fully landing: your message, your positioning, and how your brand actually shows up in the wild.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={300}>
                    <p>
                        We don't just decorate businesses; we clarify their purpose. This process begins with our foundational <Link to="/clarity" className="underline hover:text-brand-purple transition-colors">Brand Strategy & Clarity</Link> sprints, where we align your internal vision with your external messaging. Once the strategy is locked, we execute through our <Link to="/design-power" className="underline hover:text-brand-purple transition-colors">Design Power</Link> services—translating strategy into high-fidelity visual identities, scalable websites, and motion graphics that demand attention.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={400}>
                    <p>
                        Our team deliberately remains boutique. By limiting the volume of clients we take on at any given time, we ensure that every project receives senior-level strategic oversight and uncompromising creative dedication. We are fully invested in the commercial success and cultural resonance of the brands we partner with. Whether you are looking to undergo a complete brand overhaul, launch a new digital product, or simply refine your current market positioning, we have the tools and the taste to get you there. We invite you to explore our <Link to="/work" className="underline hover:text-brand-purple transition-colors">Selected Works</Link> to see our methodology in action.
                    </p>
                </AnimatedSection>
            </div>
        </section>

        {/* Values / The Principles */}
        <section className="py-32 border-t-2 border-brand-navy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {[
                    { t: "Deep Clarity", d: "If people don't understand you quickly, they move on. We fix that." },
                    { t: "Design Power", d: "Your visuals should carry weight, not decoration." },
                    { t: "Soulful Logic", d: "Strategy connects what you do to how people perceive you." },
                    { t: "The Slow Burn", d: "We build brands that still make sense in 3 years, not just today." }
                ].map((val, i) => (
                    <AnimatedSection key={val.t} delay={i * 100} className="h-full">
                        <div className="border-r-2 border-bottom-2 border-brand-navy p-12 h-full hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 group">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow font-bold mb-4 block">Principle 0{i + 1}</span>
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-6">{val.t}</h3>
                            <p className="font-body text-lg opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">{val.d}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>

    <div className="container mx-auto px-8">
        {/* The Crew / Team CMS Integration */}
        <section className="py-48 relative">
            <AnimatedSection>
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-4 block">The Crew</span>
                        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                            The Humans
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-brand-navy/60 leading-relaxed text-right">
                        You'll work directly with us. No handoffs.<br/>Clear thinking and honest feedback.
                    </p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Existing Team Members */}
                {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => (
                    <AnimatedSection key={slug} delay={index * 150}>
                        <Link to={`/team/${slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-brand-navy border-2 border-brand-navy">
                            <motion.img 
                                initial={{ scale: 1.1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                            />
                            
                            {/* Overlay UI */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-2 h-2 bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-offwhite/50 group-hover:text-brand-yellow font-bold border border-brand-offwhite/20 px-2 py-1 bg-brand-navy/20 backdrop-blur-sm">
                                        View Profile
                                    </span>
                                </div>
                                
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-brand-purple group-hover:text-brand-yellow mb-2 block font-bold transition-colors">
                                        {member.title}
                                    </span>
                                    <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none text-brand-offwhite">
                                        {member.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}

                {/* 2. RECRUITMENT SLOT */}
                <AnimatedSection delay={300}>
                     <Link to="/join" className="group relative block aspect-[3/4] overflow-hidden bg-brand-offwhite border-2 border-brand-navy/10 hover:border-brand-purple transition-colors duration-500 flex flex-col justify-center items-center text-center p-12">
        
                        {/* Technical Background Pattern */}
                       <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3A0888_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
                        <div className="relative z-10">
                          <div className="w-24 h-24 rounded-full border-2 border-brand-navy/10 flex items-center justify-center mx-auto mb-8 group-hover:border-brand-purple group-hover:scale-110 transition-all duration-500">
                             <svg className="w-8 h-8 text-brand-navy/40 group-hover:text-brand-purple transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
             
                         <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-brand-navy mb-4 group-hover:text-brand-purple transition-colors">
                          Join<br/>The Team
                         </h3>
             
                         <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 max-w-xs mx-auto leading-relaxed">
                             Seeking Senior Creatives<br/>& Talent
                         </p>

                         <span className="inline-block mt-8 border-b-2 border-brand-purple pb-1 font-mono text-xs uppercase font-bold text-brand-purple tracking-widest group-hover:text-brand-navy group-hover:border-brand-navy transition-all">
                          Submit Portfolio
                         </span>
                       </div>
                  </Link>
                </AnimatedSection>
                
            </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;