import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS, PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { Drop } from '../types';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

const AboutPage: React.FC = () => {
  const [featuredDrop, setFeaturedDrop] = useState<Drop | null>(null);

  useEffect(() => {
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
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
    <PageTransition>
        <div className="bg-[#F8F8F9] pt-32 pb-32 text-[#0A0A0A] selection:bg-[#8B84D7] selection:text-white">
        <Helmet>
            <title>About Us | COOLO Studio</title>
            <meta name="description" content="Learn about COOLO Studio, our design philosophy, and how we help businesses transition from improvised to intentional brand strategies." />
            <link rel="canonical" href="https://coolo.co.nz/about" />
            <script type="application/ld+json">
            {JSON.stringify(aboutSchema)}
            </script>
        </Helmet>

        <div className="container mx-auto px-6 md:px-12">
            
            {/* EDITORIAL MASTHEAD HERO */}
            <AnimatedSection>
                <header className="py-12 md:py-24 w-full mb-16 md:mb-24">
                    <div className="flex justify-between items-end border-b border-[#0A0A0A] pb-6 mb-8">
                        <span className="font-mono text-[#8B84D7] uppercase tracking-[0.3em] text-[10px] font-black">Identity & Essence</span>
                        <span className="font-mono text-[#0A0A0A]/40 uppercase tracking-widest text-[9px] font-bold hidden md:block">EST. 2026 / MOUNT MAUNGANUI</span>
                    </div>
                    
                    <div className="flex flex-col w-full font-display font-black uppercase tracking-tighter leading-[0.85] text-[#0A0A0A]">
                        {/* Row 1 */}
                        <div className="flex items-center gap-6 w-full">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                className="text-[17vw] md:text-[14vw]"
                            >
                                HUMANS
                            </motion.h1>
                        </div>
                        {/* Row 2 with interleaved image */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full mt-2 md:mt-0">
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
                                className="w-full md:w-[30vw] h-[25vh] md:h-[10vw] overflow-hidden"
                            >
                                <img 
                                    src={PROJECTS[0].imageUrl} 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 object-center" 
                                    alt="Studio Essence" 
                                />
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                                className="text-[17vw] md:text-[14vw]"
                            >
                                IN THE
                            </motion.h1>
                        </div>
                        {/* Row 3 */}
                        <div className="flex items-center md:justify-end w-full mt-2 md:mt-0">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                                className="text-[17vw] md:text-[14vw] text-[#8B84D7]"
                            >
                                MACHINE.
                            </motion.h1>
                        </div>
                    </div>
                </header>
            </AnimatedSection>

            {/* EDITORIAL NARRATIVE GRID */}
            <section className="pb-32 border-b border-[#0A0A0A]/20">
                
                {/* Pull Quote 1 */}
                <AnimatedSection className="mb-24 md:mb-40 pt-12">
                    <h2 className="font-display text-[10vw] md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85] text-center max-w-5xl mx-auto">
                        Most brands don't have a design problem.
                        <br/><span className="text-[#8B84D7] italic pr-4">They have a clarity problem.</span>
                    </h2>
                </AnimatedSection>

                {/* Grid Section 1 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 md:mb-40">
                    <AnimatedSection className="md:col-span-3 flex flex-col pt-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#0A0A0A]/20 pb-4 mb-6 block text-[#8B84D7]">
                            The Signal
                        </span>
                        <p className="font-body text-lg md:text-xl text-[#0A0A0A]/80 leading-relaxed">
                            COOLO is a boutique creative and brand studio operating out of the coastal hub of Mount Maunganui, New Zealand. We partner with founders, marketing teams, and visionary entrepreneurs to help their businesses transition from improvised growth into an intentional, undeniable market presence.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection className="md:col-span-6" delay={100}>
                        <div className="w-full aspect-[4/5] overflow-hidden bg-[#0A0A0A]/5">
                            <img 
                                src={PROJECTS[0].gallery[0]} 
                                alt="Studio work" 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                            />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection className="md:col-span-3 flex flex-col pt-2 md:pt-48" delay={200}>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#0A0A0A]/20 pb-4 mb-6 block text-[#8B84D7]">
                            The Philosophy
                        </span>
                        <p className="font-body text-lg md:text-xl text-[#0A0A0A]/80 leading-relaxed">
                            In a digital landscape cluttered with fleeting trends and templated aesthetics, we believe in building systems that endure. Our philosophy is pretty simple: keep it functional, keep it intentional, and cut out the noise. We build brands that feel like a breath of fresh air. Ultimately understandable and completely authentic to who you are.
                        </p>
                    </AnimatedSection>
                </div>

                {/* Pull Quote 2 & Image Split */}
                <AnimatedSection className="mb-24 md:mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
                        <div className="md:col-span-7">
                            <h2 className="font-display text-[11vw] md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85]">
                                We don't just decorate businesses; 
                                <br/><span className="text-[#8B84D7] italic pr-4">we clarify their purpose.</span>
                            </h2>
                        </div>
                        <div className="md:col-span-5">
                            <div className="aspect-[4/3] md:aspect-square overflow-hidden bg-[#0A0A0A]/5">
                                <img 
                                    src={PROJECTS[1].imageUrl} 
                                    alt="Creative process" 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 object-center" 
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Grid Section 2 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    <AnimatedSection className="md:col-span-5 flex flex-col md:justify-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square overflow-hidden bg-[#0A0A0A]/5">
                                <img src={PROJECTS[0].gallery[1]} alt="Detail 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="aspect-[3/4] overflow-hidden bg-[#0A0A0A]/5 mt-12 md:mt-24">
                                <img src={PROJECTS[0].gallery[2]} alt="Detail 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection className="md:col-span-6 md:col-start-7 flex flex-col justify-center pt-12 md:pt-0">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#0A0A0A]/20 pb-4 mb-6 block text-[#8B84D7]">
                            The Execution
                        </span>
                        <p className="font-body text-xl md:text-2xl text-[#0A0A0A]/80 leading-relaxed mb-24">
                            This process begins with our foundational <Link to="/clarity" className="font-bold border-b-2 border-[#0A0A0A] hover:text-[#8B84D7] hover:border-[#8B84D7] pb-1 transition-colors">Brand Strategy & Clarity</Link> sprints, where we align your internal vision with your external messaging. Once the strategy is locked, we execute through our <Link to="/design-power" className="font-bold border-b-2 border-[#0A0A0A] hover:text-[#8B84D7] hover:border-[#8B84D7] pb-1 transition-colors">Design Power</Link> services—translating strategy into high-fidelity visual identities, scalable websites, and motion graphics that demand attention.
                        </p>
                        
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#0A0A0A]/20 pb-4 mb-6 block text-[#8B84D7]">
                            The Boutique
                        </span>
                        <p className="font-body text-xl md:text-2xl text-[#0A0A0A]/80 leading-relaxed">
                            Our team deliberately remains boutique. By limiting the volume of clients we take on at any given time, we ensure that every project receives senior-level strategic oversight and uncompromising creative dedication. We are fully invested in the commercial success and cultural resonance of the brands we partner with.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* TYPOGRAPHIC CAPABILITIES BLOCK */}
            <section className="py-32 md:py-48 border-b border-[#0A0A0A]/20 flex flex-col items-center justify-center text-center overflow-hidden">
                <AnimatedSection>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 mb-12 block">
                        Capabilities & Deliverables
                    </span>
                    
                    <div className="flex flex-col items-center font-display font-black uppercase leading-[0.85] tracking-tighter text-[#0A0A0A] w-full">
                        <motion.span whileHover={{ scale: 1.02 }} className="text-[12vw] md:text-[8vw] hover:text-[#8B84D7] transition-colors cursor-default">BRAND STRATEGY</motion.span>
                        <div className="flex items-center gap-4 md:gap-8 my-2 md:my-4">
                            <motion.span whileHover={{ scale: 1.02 }} className="text-[8vw] md:text-[6vw] hover:text-[#8B84D7] transition-colors cursor-default">VISUAL IDENTITY</motion.span>
                            <div className="hidden md:block w-32 h-16 rounded-full overflow-hidden">
                                <img src={PROJECTS[1].gallery[0]} className="w-full h-full object-cover grayscale" alt="Spacer" />
                            </div>
                        </div>
                        <motion.span whileHover={{ scale: 1.02 }} className="text-[14vw] md:text-[10vw] text-[#8B84D7] hover:text-[#0A0A0A] transition-colors cursor-default">WEB EXPERIENCES</motion.span>
                        <div className="flex items-center gap-4 md:gap-8 my-2 md:my-4">
                            <div className="hidden md:block w-24 h-12 rounded-full overflow-hidden">
                                <img src={PROJECTS[0].gallery[1]} className="w-full h-full object-cover grayscale" alt="Spacer" />
                            </div>
                            <motion.span whileHover={{ scale: 1.02 }} className="text-[10vw] md:text-[7vw] hover:text-[#8B84D7] transition-colors cursor-default">MOTION GRAPHICS</motion.span>
                        </div>
                        <motion.span whileHover={{ scale: 1.02 }} className="text-[7vw] md:text-[5vw] tracking-widest hover:text-[#8B84D7] transition-colors cursor-default">3D VISUALIZATION</motion.span>
                        <motion.span whileHover={{ scale: 1.02 }} className="text-[11vw] md:text-[8vw] hover:text-[#8B84D7] transition-colors cursor-default mt-2 md:mt-4">CONTENT CREATION</motion.span>
                    </div>
                </AnimatedSection>
            </section>

            {/* The Crew / Team CMS Integration */}
            <section className="py-32 md:py-48">
                <AnimatedSection>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div>
                            <span className="font-mono text-[#8B84D7] uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">The Crew</span>
                            <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] text-[#0A0A0A]">
                                The Humans.
                            </h2>
                        </div>
                        <p className="max-w-sm font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/70 leading-[2] md:text-right font-bold">
                            YOU'LL WORK DIRECTLY WITH US. NO HANDOFFS. CLEAR THINKING AND HONEST FEEDBACK.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 1. Existing Team Members */}
                    {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => (
                        <AnimatedSection key={slug} delay={index * 150}>
                            <Link to={`/team/${slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-[#0A0A0A] border border-[#0A0A0A]/20">
                                <motion.img 
                                    initial={{ scale: 1.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                                    src={member.imageUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                                />
                                
                                {/* Overlay UI */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent">
                                    <div className="flex justify-between items-start">
                                        <div className="w-2 h-2 bg-[#FFD100] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F8F8F9]/80 group-hover:text-[#FFD100] font-bold border border-[#F8F8F9]/20 px-3 py-1 bg-[#0A0A0A]/40 backdrop-blur-md transition-colors">
                                            VIEW PROFILE
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B84D7] group-hover:text-[#FFD100] mb-3 block font-bold transition-colors">
                                            {member.title}
                                        </span>
                                        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#F8F8F9]">
                                            {member.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}

                    {/* 2. RECRUITMENT SLOT */}
                    <AnimatedSection delay={300}>
                        <Link to="/join" className="group relative block aspect-[4/5] overflow-hidden bg-white border border-[#0A0A0A]/20 hover:bg-[#0A0A0A] transition-colors duration-500 flex flex-col justify-center items-center text-center p-12">
            
                            {/* Technical Background Pattern */}
                            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:16px_16px] group-hover:bg-[radial-gradient(#F8F8F9_1px,transparent_1px)] transition-colors"></div>
                
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center mx-auto mb-8 group-hover:border-[#8B84D7] group-hover:scale-110 transition-all duration-500 bg-[#F8F8F9] group-hover:bg-[#0A0A0A]">
                                    <svg className="w-8 h-8 text-[#0A0A0A]/40 group-hover:text-[#8B84D7] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                    
                                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#0A0A0A] mb-4 group-hover:text-[#F8F8F9] transition-colors leading-none">
                                    JOIN<br/>THE TEAM
                                </h3>
                    
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[#0A0A0A]/60 group-hover:text-[#F8F8F9]/60 max-w-xs mx-auto leading-[2] mt-4">
                                    SEEKING SENIOR CREATIVES<br/>& TALENT
                                </p>

                                <span className="inline-block mt-12 border-b border-[#8B84D7] pb-1 font-mono text-[10px] uppercase font-bold text-[#8B84D7] tracking-widest group-hover:text-[#FFD100] group-hover:border-[#FFD100] transition-all">
                                    SUBMIT PORTFOLIO
                                </span>
                            </div>
                        </Link>
                    </AnimatedSection>
                    
                </div>
            </section>

        </div>
        </div>
    </PageTransition>
  );
};

export default AboutPage;