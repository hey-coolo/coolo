import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS, PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
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
        <div className="bg-[#F8F8F9] pt-32 pb-32 text-[#0A0A0A] selection:bg-[#8B84D7] selection:text-white min-h-screen">
            <Helmet>
                <title>Studio | COOLO</title>
                <meta name="description" content="Learn about COOLO Studio, our design philosophy, and how we help businesses transition from improvised to intentional brand strategies." />
                <link rel="canonical" href="https://coolo.co.nz/about" />
                <script type="application/ld+json">
                {JSON.stringify(aboutSchema)}
                </script>
            </Helmet>

            <div className="container mx-auto px-6 md:px-12">
                
                {/* EDITORIAL MASTHEAD HERO */}
                <AnimatedSection>
                    <header className="pt-8 pb-24 md:pb-32 w-full">
                        {/* Top metadata line */}
                        <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest border-b border-[#0A0A0A]/20 pb-4 mb-12 md:mb-24">
                            <span className="w-1/3">003</span>
                            <span className="w-1/3 text-center">STUDIO</span>
                            <span className="w-1/3 text-right">COOLO</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                            <div className="lg:col-span-5">
                                <div className="bg-[#0A0A0A] p-8 md:p-12 lg:p-16 flex items-center justify-center aspect-square md:aspect-auto h-full border border-[#0A0A0A]/10">
                                    {/* Inner image frame matching floppy disk vibe */}
                                    <div className="w-full h-full relative overflow-hidden bg-[#1A1A1A] max-w-sm mx-auto aspect-square">
                                        <img src={PROJECTS[0].imageUrl} className="w-full h-full object-cover grayscale opacity-80 hover:scale-105 transition-transform duration-1000" alt="Studio" />
                                        <div className="absolute bottom-4 right-4 bg-white text-[#0A0A0A] font-display font-black text-xl px-2 py-1 leading-none uppercase tracking-tighter">
                                            Idea<br/>Gang
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-7 flex flex-col justify-between h-full pt-8 lg:pt-0">
                                <div className="flex gap-4 font-mono text-[10px] uppercase mb-16 lg:mb-0 justify-end lg:justify-start">
                                    <span className="border border-[#0A0A0A]/20 rounded-full px-4 py-1.5 hover:bg-[#0A0A0A] hover:text-[#F8F8F9] transition-colors cursor-default">.Loading...</span>
                                    <span className="border border-[#0A0A0A]/20 rounded-full px-4 py-1.5 hover:bg-[#0A0A0A] hover:text-[#F8F8F9] transition-colors cursor-default">.Introduction</span>
                                </div>

                                <div className="font-display font-black text-[15vw] lg:text-[8vw] leading-[0.8] tracking-tighter text-[#0A0A0A]">
                                    <div className="flex gap-2 text-[#0A0A0A] mb-6 md:mb-8">
                                        <ArrowRight className="w-12 h-12 lg:w-20 lg:h-20 stroke-[3]" />
                                        <ArrowRight className="w-12 h-12 lg:w-20 lg:h-20 stroke-[3]" />
                                        <ArrowRight className="w-12 h-12 lg:w-20 lg:h-20 stroke-[3]" />
                                    </div>
                                    <div className="uppercase">BY.COOLO®</div>
                                    <div className="uppercase">STUDIO</div>
                                </div>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                {/* BLOCK 01: THE REALITY CHECK */}
                <AnimatedSection>
                    <section className="relative py-24 md:py-32 border-t border-[#0A0A0A]">
                        {/* Tiny crosshairs */}
                        <div className="absolute top-[-5px] left-0 text-[#0A0A0A] text-[10px] leading-none">+</div>
                        <div className="absolute top-[-5px] right-0 text-[#0A0A0A] text-[10px] leading-none">+</div>

                        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-24 gap-8">
                            <h2 className="font-display font-black uppercase text-[15vw] lg:text-[9vw] leading-[0.8] tracking-tighter">
                                <span className="block">THE REALITY</span>
                                <span className="block">_CHECK</span>
                            </h2>
                            <span className="font-display font-black text-[15vw] lg:text-[9vw] leading-[0.8] tracking-tighter text-[#0A0A0A]">
                                /01
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                            <div className="lg:col-span-4 flex justify-start lg:justify-center">
                                {/* Custom Outline Quote Icon */}
                                <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 stroke-[#FF4500] fill-none stroke-[3]">
                                    <path d="M 25,45 L 25,80 L 45,80 L 45,45 L 35,20 L 25,20 L 30,45 Z M 65,45 L 65,80 L 85,80 L 85,45 L 75,20 L 65,20 L 70,45 Z" strokeLinejoin="miter" strokeLinecap="square" />
                                </svg>
                            </div>
                            <div className="lg:col-span-8 flex flex-col gap-16 lg:gap-24 lg:pr-12 pt-4">
                                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                    <span className="font-mono text-[10px] text-[#0A0A0A]/40 border border-[#0A0A0A]/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</span>
                                    <p className="font-body text-2xl md:text-3xl lg:text-4xl text-[#0A0A0A]/80 leading-tight">
                                        Most brands don't have a design problem. They have a clarity problem. At COOLO, we take the complex ideas in your head, figure out exactly what matters, and build a brand system that makes it impossible to ignore.
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:ml-24">
                                    <span className="font-mono text-[10px] text-[#0A0A0A]/40 border border-[#0A0A0A]/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</span>
                                    <p className="font-body text-2xl md:text-3xl lg:text-4xl text-[#0A0A0A]/80 leading-tight">
                                        In a digital landscape cluttered with noise, we build systems that endure. Our philosophy is simple: keep it functional, keep it intentional, and give your business a voice that people can actually see, feel, and remember.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* BLOCK 02: DOUBLE TROUBLE (TEAM) */}
                <AnimatedSection>
                    <section className="relative py-24 md:py-32 border-t border-[#0A0A0A]">
                        <div className="absolute top-[-5px] left-0 text-[#0A0A0A] text-[10px] leading-none">+</div>
                        <div className="absolute top-[-5px] right-0 text-[#0A0A0A] text-[10px] leading-none">+</div>

                        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-24 gap-8">
                            <h2 className="font-display font-black uppercase text-[15vw] lg:text-[9vw] leading-[0.8] tracking-tighter">
                                <span className="block">DOUBLE</span>
                                <span className="block">_TROUBLE</span>
                            </h2>
                            <span className="font-display font-black text-[15vw] lg:text-[9vw] leading-[0.8] tracking-tighter text-[#0A0A0A]">
                                /02
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 border-b border-[#0A0A0A]/10 pb-16">
                            {Object.entries(TEAM_MEMBERS).map(([slug, member]) => (
                                <Link to={`/team/${slug}`} key={slug} className="flex flex-col group cursor-pointer">
                                    <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[#0A0A0A] mb-6 relative">
                                        <img src={member.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100" alt={member.name} />
                                        
                                        {/* Embedded secondary image mimicking reference */}
                                        <div className="absolute bottom-4 left-4 border border-white/20 bg-black/40 backdrop-blur-sm p-1.5 w-16 h-20 overflow-hidden hidden md:block">
                                            <img src={PROJECTS[0].gallery[1]} className="w-full h-full object-cover grayscale" alt="detail" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end font-mono text-[10px] uppercase tracking-widest">
                                        <div>
                                            <span className="block font-bold text-[#0A0A0A]">{member.name}</span>
                                            <span className="block text-[#0A0A0A]/50">{member.title}</span>
                                        </div>
                                        <div className="flex gap-3 text-[#0A0A0A]/40 font-bold">
                                            <span className="hover:text-[#8B84D7] transition-colors">IG</span>
                                            <span className="hover:text-[#8B84D7] transition-colors">IN</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {/* Recruitment Slot */}
                            <Link to="/join" className="flex flex-col group cursor-pointer">
                                <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-white mb-6 relative flex items-center justify-center border border-[#0A0A0A]/10 hover:bg-[#0A0A0A] transition-colors duration-500">
                                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:16px_16px] group-hover:bg-[radial-gradient(#F8F8F9_1px,transparent_1px)] transition-colors"></div>
                                    <div className="font-display text-8xl text-[#0A0A0A]/20 group-hover:text-[#F8F8F9] transition-colors relative z-10">?</div>
                                </div>
                                <div className="flex justify-between items-end font-mono text-[10px] uppercase tracking-widest">
                                    <div>
                                        <span className="block font-bold text-[#0A0A0A]">You?</span>
                                        <span className="block text-[#0A0A0A]/50">Join The Team</span>
                                    </div>
                                    <div className="flex gap-3 text-[#0A0A0A]/40 font-bold">
                                        <span className="hover:text-[#8B84D7] transition-colors">CV</span>
                                        <span className="hover:text-[#8B84D7] transition-colors">PF</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>
                </AnimatedSection>

                {/* BLOCK 03: STUDIO TOOLS */}
                <AnimatedSection>
                    <section className="relative py-24 md:py-32 border-t border-[#0A0A0A]">
                        <div className="absolute top-[-5px] left-0 text-[#0A0A0A] text-[10px] leading-none">+</div>
                        <div className="absolute top-[-5px] right-0 text-[#0A0A0A] text-[10px] leading-none">+</div>

                        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-24 gap-8">
                            <h2 className="font-display font-black uppercase text-[15vw] lg:text-[9vw] leading-[0.8] tracking-tighter">
                                <span className="block">STUDIO</span>
                                <span className="block">_TOOLS</span>
                            </h2>
                            <span className="font-display font-black text-[15vw] lg:text-[9vw] leading-[0.8] tracking-tighter text-[#0A0A0A]">
                                /03
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 font-mono text-[10px] uppercase tracking-widest font-bold">
                            <div className="space-y-16">
                                <div>
                                    <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">BRAND SYSTEMS</h4>
                                    <ul className="text-[#0A0A0A]/60 space-y-2">
                                        <li className="hover:text-[#8B84D7] transition-colors">POSITIONING,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">VISUAL IDENTITY,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">GUIDELINES.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-16">
                                <div>
                                    <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">WEB EXPERIENCES</h4>
                                    <ul className="text-[#0A0A0A]/60 space-y-2">
                                        <li className="hover:text-[#8B84D7] transition-colors">CUSTOM WEB EXPERIENCES,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">CONTENT/COPY,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">REACT/WEBFLOW BUILD.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-16">
                                <div>
                                    <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">CREATIVE DIRECTION</h4>
                                    <ul className="text-[#0A0A0A]/60 space-y-2">
                                        <li className="hover:text-[#8B84D7] transition-colors">CAMPAIGN THINKING,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">ART DIRECTION,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">CONCEPT DEVELOPMENT.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-16">
                                <div>
                                    <h4 className="border-b border-[#0A0A0A]/30 pb-4 mb-4 text-[#0A0A0A]">SPECIALIST</h4>
                                    <ul className="text-[#0A0A0A]/60 space-y-2">
                                        <li className="hover:text-[#8B84D7] transition-colors">3D VISUALIZATION,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">ANIMATION DESIGN,</li>
                                        <li className="hover:text-[#8B84D7] transition-colors">PACKAGING.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

            </div>
        </div>
    </PageTransition>
  );
};

export default AboutPage;