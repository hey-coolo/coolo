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
      title: "Pulling the ideas out of your head.",
      description: "Find the actual value. A no-BS blueprint of exactly what you need to do, and how to actually sell it.",
      cta: "Explore Discovery +"
    },
    {
      id: 2,
      title: "Building the assets that make it real.",
      description: "Turn strategy into an engine. You get the tactical tools you need to actually sell your vision.",
      cta: "Explore Design +"
    },
    {
      id: 3,
      title: "Protecting your time and sanity.",
      description: "Keep the momentum going. We run the machine so you can step back into being the human driving it.",
      cta: "Explore Production +"
    }
  ];

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#111] text-[#f4f4f0] selection:bg-[#eab308] selection:text-[#111] font-mono">
        <Header />

        <main>
          {/* HERO SECTION */}
          <section className="relative min-h-screen flex flex-col justify-end pt-32 pb-12 px-6 md:px-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full z-0 opacity-40 mix-blend-luminosity pointer-events-none">
              <img 
                src="/image_294b65.jpg" 
                alt="Coolo Studio Art Direction - Surfboard" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent" />
            </div>
            
            <AnimatedSection className="relative z-10 w-full max-w-[1440px] mx-auto">
              <div className="flex flex-col gap-6 md:gap-12">
                <div className="flex justify-between items-end text-[10px] md:text-xs uppercase tracking-widest font-mono text-[#f4f4f0]/70 border-b border-[#f4f4f0]/20 pb-6">
                  <span>Coolo®</span>
                  <span className="hidden md:inline-block">Brand Design Studio</span>
                  <span>Mount Maunganui / NZ</span>
                </div>
                
                <h1 className="font-shoulder text-[11vw] sm:text-8xl lg:text-[8vw] leading-[0.85] uppercase tracking-tighter mt-4">
                  <span className="block text-[#f4f4f0]">Your business is better than it</span>
                  <span className="block text-[#f4f4f0]">currently looks, and you <span className="text-[#eab308]">just</span></span>
                  <span className="block text-[#eab308]">found the studio <span className="text-[#f4f4f0]">to fix that.</span></span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 md:mt-24">
                  <div className="md:col-span-8 flex items-end">
                    <p className="font-mono text-xs uppercase tracking-widest opacity-50 flex items-center gap-3">
                      <span>Scroll to explore</span>
                      <span className="animate-bounce">↓</span>
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="font-mono text-xs md:text-sm leading-relaxed uppercase text-[#f4f4f0]/80">
                      Your businesses frequently look and sound worse than the actual value they create. We rescue that gap, translating your complex ideas and expertise into a clear strategic direction and brand experience.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* THE REALITY CHECK (INTERACTIVE PROCESS) */}
          <section className="bg-[#f4f4f0] text-[#111] py-32 px-6 md:px-12 border-t border-[#111]">
            <div className="max-w-[1440px] mx-auto">
              <AnimatedSection>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                  <h2 className="font-shoulder text-7xl md:text-9xl uppercase tracking-tighter leading-[0.85]">
                    The Reality<br/>Check.
                  </h2>
                  <p className="font-mono text-xs md:text-sm uppercase max-w-xs md:text-right leading-relaxed">
                    A three-step methodology to extract, build, and scale your brand's true perspective.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="flex flex-col md:flex-row w-full h-[75vh] md:h-[65vh] gap-2 md:gap-4 transition-all duration-500">
                  {processSteps.map((step) => {
                    const isActive = activeStep === step.id;
                    const isHovered = hoveredStep === step.id;
                    
                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        onMouseEnter={() => setHoveredStep(step.id)}
                        onMouseLeave={() => setHoveredStep(null)}
                        className={`relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#111] text-[#f4f4f0] overflow-hidden flex flex-col group
                          ${isActive ? 'flex-grow basis-[60%] md:basis-[70%]' : 'basis-[15%] md:basis-[15%]'} 
                          ${isHovered && !isActive ? 'md:basis-[20%] bg-[#1a1a1a]' : ''}
                        `}
                      >
                        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between h-full">
                          {/* Number */}
                          <div className={`font-shoulder text-5xl md:text-7xl transition-colors duration-500 ${isActive ? 'text-[#eab308]' : 'text-[#f4f4f0]/30 group-hover:text-[#f4f4f0]/60'}`}>
                            {step.id}
                          </div>

                          {/* Collapsed State Title (Vertical on Desktop, Horizontal on Mobile) */}
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 md:-rotate-90 whitespace-nowrap pointer-events-none ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                            <span className="font-shoulder text-3xl md:text-5xl uppercase tracking-tighter text-[#f4f4f0]/50">
                              Step {step.id}
                            </span>
                          </div>

                          {/* Expanded Content */}
                          <div 
                            className={`flex flex-col gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100
                              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}
                            `}
                          >
                            <h3 className="font-shoulder text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] max-w-2xl">
                              {step.title}
                            </h3>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-4 border-t border-[#f4f4f0]/20 pt-8">
                              <p className="font-mono text-sm uppercase leading-relaxed max-w-md text-[#f4f4f0]/80">
                                {step.description}
                              </p>
                              <a href="/services" className="inline-block font-mono text-xs uppercase tracking-widest border border-[#eab308] text-[#eab308] px-6 py-3 hover:bg-[#eab308] hover:text-[#111] transition-colors">
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
          <section className="bg-[#111] text-[#f4f4f0] py-32 px-6 md:px-12 border-t border-[#f4f4f0]/10">
            <div className="max-w-[1440px] mx-auto">
              <AnimatedSection className="flex flex-col items-center mb-24">
                <h2 className="font-shoulder text-6xl md:text-9xl uppercase tracking-tighter text-center mb-8">
                  What it actually<br/>looks like.
                </h2>
                <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-center text-[#f4f4f0]/60 max-w-3xl">
                  Brand Voice, Logotype & Mark System, Art Direction, Content Creation.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                {/* Case 1 */}
                <AnimatedSection className="group cursor-pointer">
                  <div className="w-full aspect-[4/5] md:aspect-square bg-[#1a1a1a] overflow-hidden relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f0]/5 group-hover:bg-transparent transition-colors duration-500 z-10">
                      <span className="font-shoulder text-6xl md:text-8xl uppercase tracking-tighter text-[#f4f4f0] mix-blend-difference opacity-80 group-hover:opacity-100 transition-opacity">UNMPLYNMT</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest border-b border-[#f4f4f0]/20 pb-4">
                    <span>Fashion Brand Identity</span>
                    <span className="text-[#eab308]">Open Case ↗</span>
                  </div>
                </AnimatedSection>

                {/* Case 2 & 3 wrapper to stagger */}
                <div className="flex flex-col gap-6 md:gap-12 md:pt-32">
                  <AnimatedSection className="group cursor-pointer">
                    <div className="w-full aspect-[4/3] bg-[#1a1a1a] overflow-hidden relative mb-6">
                      <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f0]/5 group-hover:bg-transparent transition-colors duration-500 z-10">
                        <span className="font-shoulder text-5xl md:text-7xl uppercase tracking-tighter text-[#f4f4f0] mix-blend-difference opacity-80 group-hover:opacity-100 transition-opacity">PABLO CREATIVE</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest border-b border-[#f4f4f0]/20 pb-4">
                      <span>Agency Rebrand</span>
                      <span className="text-[#eab308]">Open Case ↗</span>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection className="group cursor-pointer">
                    <div className="w-full aspect-[16/9] bg-[#1a1a1a] overflow-hidden relative mb-6">
                      <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f0]/5 group-hover:bg-transparent transition-colors duration-500 z-10">
                        <span className="font-shoulder text-5xl md:text-7xl uppercase tracking-tighter text-[#f4f4f0] mix-blend-difference opacity-80 group-hover:opacity-100 transition-opacity">SURFBOARD VOOS</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest border-b border-[#f4f4f0]/20 pb-4">
                      <span>Concept / Art Direction</span>
                      <span className="text-[#eab308]">Open Case ↗</span>
                    </div>
                  </AnimatedSection>
                </div>
              </div>

              <AnimatedSection className="mt-24 flex justify-center">
                <a href="/work" className="inline-flex items-center justify-center h-16 px-12 bg-[#f4f4f0] text-[#111] font-mono text-sm uppercase tracking-widest hover:bg-[#eab308] transition-colors">
                  See More Work
                </a>
              </AnimatedSection>
            </div>
          </section>

          {/* WHAT THEY'VE SAID (TESTIMONIALS) */}
          <section className="bg-[#f4f4f0] text-[#111] py-32 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto">
              <AnimatedSection className="mb-20">
                <h2 className="font-shoulder text-6xl md:text-9xl uppercase tracking-tighter leading-[0.85]">
                  What They've<br/>Said.
                </h2>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t border-[#111]/20 pt-16">
                <AnimatedSection>
                  <div className="text-4xl text-[#eab308] mb-8 font-shoulder">"</div>
                  <p className="font-mono text-sm md:text-base uppercase leading-loose mb-12">
                    Definitely worth it. Coolo and Franco possesses a rare combination of creative vision and strategic thinking. His ability to collaborate, lead, and deliver exceptional work allowed us to elevate our projects to new heights.
                  </p>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest">
                    — Ben Parkinson, Creative Director, Pablo Creative
                  </p>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="text-4xl text-[#eab308] mb-8 font-shoulder">"</div>
                  <p className="font-mono text-sm md:text-base uppercase leading-loose mb-12">
                    Working with Franco means working with absolute discipline. He translated complex ideas into compelling visual narratives that made a significant commercial impact on our campaigns.
                  </p>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest">
                    — Joel Cogger, Senior Creative Designer, Integrity
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* YELLOW CTA */}
          <section className="bg-[#eab308] text-[#111] py-32 px-6 md:px-12">
            <AnimatedSection className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <h2 className="font-shoulder text-7xl md:text-[8vw] uppercase tracking-tighter leading-[0.85] max-w-4xl">
                Think we should<br/>look at your<br/>business?
              </h2>
              <div className="flex flex-col items-start md:items-end gap-8 pb-4">
                <p className="font-mono text-sm max-w-sm md:text-right uppercase leading-relaxed font-bold">
                  Let's sit down and figure out exactly what needs to be built.
                </p>
                <a href="/contact" className="inline-flex items-center justify-center h-16 px-10 bg-[#111] text-[#eab308] font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-[#111] transition-colors">
                  Start Here →
                </a>
              </div>
            </AnimatedSection>
          </section>

          {/* THE TOOLS WE USE */}
          <section className="bg-[#111] text-[#f4f4f0] py-32 px-6 md:px-12 border-b border-[#f4f4f0]/10">
            <AnimatedSection className="max-w-[1440px] mx-auto">
               <h2 className="font-shoulder text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85] mb-20 text-center md:text-left">
                The tools we use<br/>to build it.
              </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs md:text-sm uppercase tracking-widest text-[#f4f4f0]/60 border-t border-[#f4f4f0]/20 pt-12">
                 <div className="flex flex-col gap-4">
                   <span className="text-[#f4f4f0]">Design</span>
                   <span>Figma / Creative Suite</span>
                 </div>
                 <div className="flex flex-col gap-4">
                   <span className="text-[#f4f4f0]">Development</span>
                   <span>React / Next.js / Tailwind</span>
                 </div>
                 <div className="flex flex-col gap-4">
                   <span className="text-[#f4f4f0]">Deployment</span>
                   <span>Vercel / Shopify / Stripe</span>
                 </div>
                 <div className="flex flex-col gap-4">
                   <span className="text-[#f4f4f0]">Foundation</span>
                   <span>Strategy / Copywriting / Direction</span>
                 </div>
               </div>
            </AnimatedSection>
          </section>

          {/* FAQ SECTION */}
          <section className="bg-[#111] text-[#f4f4f0] py-32 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
              <AnimatedSection className="md:col-span-5">
                <h2 className="font-shoulder text-5xl md:text-7xl uppercase tracking-tighter leading-[0.85]">
                  Frequent<br/>Assumptions.
                </h2>
              </AnimatedSection>
              
              <div className="md:col-span-7 flex flex-col gap-4">
                <Accordion title="CAN WE JUST GET A LOGO?">
                  <div className="font-mono text-sm uppercase leading-relaxed pt-4 pb-8 text-[#f4f4f0]/70">
                    NO. WE BUILD SYSTEMS, NOT ONE-OFF PRETTY PICTURES. A LOGO WITHOUT STRATEGY IS JUST DECORATION.
                  </div>
                </Accordion>
                
                <Accordion title="HOW MUCH DOES THIS COST?">
                  <div className="font-mono text-sm uppercase leading-relaxed pt-4 pb-8 text-[#f4f4f0]/70">
                    IF YOU'RE LOOKING FOR CHEAP, GO TO FIVERR. IF YOU WANT AN ENGINE THAT DRIVES REVENUE, LET'S TALK. WE SCOPE BASED ON THE VALUE AND ARSENAL YOU REQUIRE.
                  </div>
                </Accordion>
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