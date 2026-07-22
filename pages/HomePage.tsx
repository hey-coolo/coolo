import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import AnimatedSection from '../components/AnimatedSection';
import Accordion from '../components/Accordion';

const HomePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const processSteps = [
    {
      id: 1,
      title: "PULLING THE IDEAS OUT OF YOUR HEAD.",
      description: "FIND THE ACTUAL VALUE. A NO-BS BLUEPRINT OF EXACTLY WHAT YOU NEED TO DO, AND HOW TO ACTUALLY SELL IT.",
      cta: "EXPLORE STRATEGY +"
    },
    {
      id: 2,
      title: "BUILDING THE ASSETS THAT MAKE IT REAL.",
      description: "TURN STRATEGY INTO AN ENGINE. YOU GET THE TACTICAL TOOLS YOU NEED TO ACTUALLY SELL YOUR VISION.",
      cta: "EXPLORE DESIGN +"
    },
    {
      id: 3,
      title: "PROTECTING YOUR TIME AND SANITY.",
      description: "KEEP THE MOMENTUM GOING. WE RUN THE MACHINE SO YOU CAN STEP BACK INTO BEING THE HUMAN DRIVING IT.",
      cta: "EXPLORE PRODUCTION +"
    }
  ];

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#111] text-[#f4f4f0] selection:bg-[#eab308] selection:text-[#111] font-mono">
        <Header />

        <main>
          {/* HERO SECTION */}
          <section className="relative min-h-screen flex flex-col justify-end pt-32 pb-12 px-6 md:px-12 overflow-hidden bg-[#111]">
            <div className="absolute top-0 right-0 w-full h-full z-0 opacity-60 mix-blend-luminosity pointer-events-none">
              <img 
                src="public/assets/cases/surfboard-v001/detail-5.jpg" 
                alt="Coolo Studio Art Direction - Surfboard" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
            </div>
            
            <AnimatedSection className="relative z-10 w-full max-w-[1440px] mx-auto">
              <div className="flex flex-col gap-8 md:gap-16">
                <h1 className="font-shoulder font-black text-[14vw] sm:text-8xl lg:text-[9.5vw] leading-[0.8] uppercase tracking-tighter text-[#f4f4f0]">
                  <span className="block">YOUR BUSINESS IS BETTER THAN IT</span>
                  <span className="block">CURRENTLY LOOKS, AND YOU <span className="text-[#eab308]">JUST</span></span>
                  <span className="block text-[#eab308]">FOUND THE STUDIO <span className="text-[#f4f4f0]">TO FIX THAT.</span></span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-[#f4f4f0]/20 pt-8">
                  <div className="md:col-span-8 flex flex-col gap-2">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#f4f4f0]/50">
                      COOLO® BRAND DESIGN STUDIO
                    </p>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#eab308] flex items-center gap-3">
                      <span>SCROLL TO DISCOVER</span>
                      <span className="animate-bounce">↓</span>
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="font-mono text-[10px] md:text-xs leading-relaxed uppercase tracking-widest text-[#f4f4f0]/80 text-justify">
                      YOUR BUSINESSES FREQUENTLY LOOK AND SOUND WORSE THAN THE ACTUAL VALUE THEY CREATE. WE RESCUE THAT GAP, TRANSLATING YOUR COMPLEX IDEAS AND EXPERTISE INTO A CLEAR STRATEGIC DIRECTION AND BRAND EXPERIENCE.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* THE REALITY CHECK (INTERACTIVE PROCESS) */}
          <section className="bg-[#f4f4f0] text-[#111] py-32 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto">
              <AnimatedSection>
                <div className="flex flex-col mb-16 border-b border-[#111]/20 pb-12">
                  <h2 className="font-shoulder font-black text-7xl md:text-[10vw] uppercase tracking-tighter leading-[0.8] text-[#111]">
                    THE REALITY CHECK
                  </h2>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="flex flex-col md:flex-row w-full h-auto md:h-[600px] gap-2 md:gap-4 transition-all duration-500">
                  {processSteps.map((step) => {
                    const isActive = activeStep === step.id;
                    const isHovered = hoveredStep === step.id;
                    
                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        onMouseEnter={() => setHoveredStep(step.id)}
                        onMouseLeave={() => setHoveredStep(null)}
                        className={`relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#111] text-[#f4f4f0] overflow-hidden flex flex-col group min-h-[120px] md:min-h-0
                          ${isActive ? 'flex-grow basis-[100%] md:basis-[60%]' : 'basis-auto md:basis-[20%]'} 
                          ${isHovered && !isActive ? 'md:basis-[25%] bg-[#1a1a1a]' : ''}
                        `}
                      >
                        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between h-full">
                          
                          {/* Number Header */}
                          <div className={`font-shoulder font-black text-6xl md:text-8xl transition-colors duration-500 leading-none ${isActive ? 'text-[#f4f4f0]' : 'text-[#f4f4f0]/30 group-hover:text-[#eab308]'}`}>
                            {step.id}
                          </div>

                          {/* Collapsed State Title (Vertical on Desktop, Horizontal on Mobile) */}
                          <div className={`absolute md:top-1/2 left-6 top-6 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 transition-opacity duration-300 md:-rotate-90 whitespace-nowrap pointer-events-none pl-16 md:pl-0 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                            <span className="font-shoulder font-black text-4xl md:text-6xl uppercase tracking-tighter text-[#f4f4f0]/50 group-hover:text-[#f4f4f0]">
                              STEP {step.id}
                            </span>
                          </div>

                          {/* Expanded Content */}
                          <div 
                            className={`flex flex-col gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mt-auto
                              ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-12 pointer-events-none absolute bottom-0'}
                            `}
                          >
                            <h3 className="font-shoulder font-black text-5xl md:text-[5vw] uppercase tracking-tighter leading-[0.85] max-w-3xl">
                              {step.title}
                            </h3>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-4 border-t border-[#f4f4f0]/20 pt-8">
                              <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest leading-loose max-w-md text-[#f4f4f0]/80">
                                {step.description}
                              </p>
                              <a href="/services" className="inline-block font-mono text-[10px] md:text-xs uppercase tracking-widest border border-[#f4f4f0] text-[#111] bg-[#f4f4f0] px-8 py-4 hover:bg-[#eab308] hover:border-[#eab308] transition-colors whitespace-nowrap flex-shrink-0">
                                {step.cta}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* WHAT IT ACTUALLY LOOKS LIKE */}
          <section className="bg-[#f4f4f0] text-[#111] pb-32 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto">
              <AnimatedSection className="flex flex-col items-center mb-16 pt-32 border-t border-[#111]/20">
                <h2 className="font-shoulder font-black text-6xl md:text-[8vw] uppercase tracking-tighter leading-[0.8] text-center mb-8">
                  WHAT IT ACTUALLY<br/>LOOKS LIKE.
                </h2>
                <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-center text-[#111]/70 max-w-3xl leading-relaxed">
                  BRAND VOICE, LOGOTYPE & MARK SYSTEM, ART DIRECTION, CONTENT CREATION.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Case 1 */}
                <AnimatedSection className="group cursor-pointer">
                  <div className="w-full aspect-[4/5] bg-[#111] overflow-hidden relative mb-4">
                    <div className="absolute inset-0 flex items-center justify-center bg-[#111]/80 group-hover:bg-[#111]/60 transition-colors duration-500 z-10">
                      <span className="font-shoulder font-black text-6xl md:text-[6vw] uppercase tracking-tighter text-[#f4f4f0] opacity-30 group-hover:opacity-100 transition-opacity">UNMPLYNMT</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-[#111]/20 pb-4">
                    <span>FASHION BRAND IDENTITY</span>
                    <span className="text-[#111] font-bold">OPEN CASE →</span>
                  </div>
                </AnimatedSection>

                {/* Case 2 & 3 wrapper to stagger */}
                <div className="flex flex-col gap-4 md:gap-8 md:pt-32">
                  <AnimatedSection className="group cursor-pointer">
                    <div className="w-full aspect-[4/3] bg-[#111] overflow-hidden relative mb-4">
                      <div className="absolute inset-0 flex items-center justify-center bg-[#111]/80 group-hover:bg-[#111]/60 transition-colors duration-500 z-10">
                        <span className="font-shoulder font-black text-5xl md:text-[5vw] uppercase tracking-tighter text-[#f4f4f0] opacity-30 group-hover:opacity-100 transition-opacity">PABLO CREATIVE</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-[#111]/20 pb-4">
                      <span>AGENCY REBRAND</span>
                      <span className="text-[#111] font-bold">OPEN CASE →</span>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection className="group cursor-pointer">
                    <div className="w-full aspect-[16/9] bg-[#111] overflow-hidden relative mb-4">
                      <div className="absolute inset-0 flex items-center justify-center bg-[#111]/80 group-hover:bg-[#111]/60 transition-colors duration-500 z-10">
                        <span className="font-shoulder font-black text-5xl md:text-[5vw] uppercase tracking-tighter text-[#f4f4f0] opacity-30 group-hover:opacity-100 transition-opacity text-center leading-[0.8]">SURFBOARD<br/>VOOS</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-[#111]/20 pb-4">
                      <span>CONCEPT / ART DIRECTION</span>
                      <span className="text-[#111] font-bold">OPEN CASE →</span>
                    </div>
                  </AnimatedSection>
                </div>
              </div>

              <AnimatedSection className="mt-24 flex justify-center">
                <a href="/work" className="font-mono text-xs uppercase tracking-widest font-bold border-b-2 border-[#111] pb-1 hover:text-[#eab308] hover:border-[#eab308] transition-colors">
                  SEE MORE WORK +
                </a>
              </AnimatedSection>
            </div>
          </section>

          {/* WHAT THEY'VE SAID (TESTIMONIALS) */}
          <section className="bg-[#111] text-[#f4f4f0] py-32 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto">
              <AnimatedSection className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#f4f4f0]/20 pb-12">
                <h2 className="font-shoulder font-black text-6xl md:text-[8vw] uppercase tracking-tighter leading-[0.8]">
                  WHAT THEY'VE<br/>SAID.
                </h2>
                <div className="font-shoulder text-6xl text-[#eab308] mt-8 md:mt-0">↓</div>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                <AnimatedSection>
                  <p className="font-mono text-xs md:text-sm uppercase tracking-widest leading-loose text-justify mb-10 text-[#f4f4f0]/80">
                    "DEFINITELY WORTH IT. COOLO AND FRANCO POSSESSES A RARE COMBINATION OF CREATIVE VISION AND STRATEGIC THINKING. HIS ABILITY TO COLLABORATE, LEAD, AND DELIVER EXCEPTIONAL WORK ALLOWED US TO ELEVATE OUR PROJECTS TO NEW HEIGHTS."
                  </p>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#eab308]">
                    — BEN PARKINSON, CREATIVE DIRECTOR, PABLO CREATIVE
                  </p>
                </AnimatedSection>

                <AnimatedSection>
                  <p className="font-mono text-xs md:text-sm uppercase tracking-widest leading-loose text-justify mb-10 text-[#f4f4f0]/80">
                    "WORKING WITH FRANCO MEANS WORKING WITH ABSOLUTE DISCIPLINE. HE TRANSLATED COMPLEX IDEAS INTO COMPELLING VISUAL NARRATIVES THAT MADE A SIGNIFICANT COMMERCIAL IMPACT ON OUR CAMPAIGNS."
                  </p>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#eab308]">
                    — JOEL COGGER, SENIOR CREATIVE DESIGNER, INTEGRITY
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* YELLOW CTA */}
          <section className="bg-[#eab308] text-[#111] py-32 px-6 md:px-12">
            <AnimatedSection className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <h2 className="font-shoulder font-black text-6xl md:text-[8vw] uppercase tracking-tighter leading-[0.8] max-w-4xl">
                THINK WE SHOULD<br/>LOOK AT YOUR<br/>BUSINESS?
              </h2>
              <div className="flex flex-col items-start md:items-end gap-8 pb-2">
                <p className="font-mono text-xs md:text-sm max-w-sm md:text-right uppercase tracking-widest leading-relaxed font-bold">
                  LET'S SIT DOWN AND FIGURE OUT EXACTLY WHAT NEEDS TO BE BUILT.
                </p>
                <a href="/contact" className="inline-flex items-center justify-center h-16 px-12 bg-[#111] text-[#eab308] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#111] transition-colors">
                  START HERE →
                </a>
              </div>
            </AnimatedSection>
          </section>

          {/* PURPLE TOOLS SECTION */}
          <section className="bg-[#8b85c1] text-[#111] py-32 px-6 md:px-12 border-b border-[#111]">
            <AnimatedSection className="max-w-[1440px] mx-auto flex flex-col gap-16">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-[#111]/30 pb-16 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">
                 <div>FIGMA / CREATIVE SUITE</div>
                 <div>REACT / NEXT.JS / VERCEL</div>
                 <div>STRATEGY / COPYWRITING</div>
               </div>
               <h2 className="font-shoulder font-black text-6xl md:text-[8vw] uppercase tracking-tighter leading-[0.8]">
                THE TOOLS WE USE<br/>TO BUILD IT.
              </h2>
            </AnimatedSection>
          </section>

          {/* FAQ SECTION */}
          <section className="bg-[#eab308] text-[#111] py-32 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-4">
              <Accordion title="CAN WE JUST GET A LOGO?">
                <div className="font-mono text-xs md:text-sm uppercase tracking-widest leading-loose pt-4 pb-8 max-w-4xl">
                  NO. WE BUILD SYSTEMS, NOT ONE-OFF PRETTY PICTURES. A LOGO IS JUST A SIGNATURE. WE BUILD THE FOUNDATION AND RULES SO EVERYTHING YOUR BRAND TOUCHES IS COHESIVE.
                </div>
              </Accordion>
              
              <Accordion title="HOW MUCH DOES THIS COST?">
                <div className="font-mono text-xs md:text-sm uppercase tracking-widest leading-loose pt-4 pb-8 max-w-4xl">
                  IF YOU'RE LOOKING FOR CHEAP, GO TO FIVERR. IF YOU WANT AN ENGINE THAT DRIVES REVENUE, LET'S TALK. WE SCOPE BASED ON THE EXACT BUSINESS PROBLEM WE ARE SOLVING FOR YOU.
                </div>
              </Accordion>

               <div className="border-t border-[#111]/30 mt-16 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8">
                    <p className="font-shoulder font-black text-4xl md:text-6xl uppercase tracking-tighter leading-[0.85] max-w-md">
                      COOLO IS A BRAND STRATEGY & DESIGN PRODUCTION STUDIO.
                    </p>
                  </div>
                  <div className="md:col-span-4 flex items-end">
                    <p className="font-mono text-xs uppercase tracking-widest font-bold">
                      BASED IN MOUNT MAUNGANUI,<br/>NEW ZEALAND.
                    </p>
                  </div>
               </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default HomePage;