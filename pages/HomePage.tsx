import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import AnimatedSection from '../components/AnimatedSection';

const HomePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const processSteps = [
    {
      id: 1,
      title: "PULLING THE IDEAS OUT OF YOUR HEAD.",
      subtitle: "FIND THE ACTUAL VALUE. A NO-BS BLUEPRINT OF EXACTLY WHAT YOU NEED TO DO, AND HOW TO ACTUALLY SELL IT.",
      description: "MOST FOUNDERS ARE SITTING ON A GOLDMINE OF EXPERTISE, BUT THEY'RE TOO BURIED IN THE DAILY GRIND TO EXPLAIN IT CLEARLY. WE SIT IN THE MESS WITH YOU, ASK THE UNCOMFORTABLE QUESTIONS, AND DRAG YOUR REAL VALUE OUT OF YOUR HEAD SO WE CAN BUILD A CLEAR, HONEST BLUEPRINT OF WHERE TO GO NEXT.",
    },
    {
      id: 2,
      title: "BUILDING THE ASSETS THAT MAKE IT REAL.",
      subtitle: "TURN STRATEGY INTO AN ENGINE. YOU GET THE TACTICAL TOOLS YOU NEED TO ACTUALLY SELL YOUR VISION.",
      description: "A GREAT STRATEGY IS COMPLETELY USELESS IF YOU DON'T HAVE THE TOOLS TO SELL IT. ONCE WE HAVE CLARITY, WE DESIGN THE ACTUAL SYSTEM, YOUR BRAND IDENTITY, VISUAL LANGUAGE, CUSTOM WEBSITE, AND SALES ASSETS, SO YOUR BUSINESS LOOKS, SOUNDS, AND FEELS AS PROFESSIONAL AS THE WORK YOU DO.",
    },
    {
      id: 3,
      title: "PROTECTING YOUR TIME AND SANITY.",
      subtitle: "KEEP THE MOMENTUM GOING. WE RUN THE MACHINE SO YOU CAN STEP BACK INTO BEING THE HUMAN DRIVING IT.",
      description: "YOU NEED TO STAY FOCUSED ON RUNNING YOUR BUSINESS, NOT MICROMANAGING FREELANCERS. ONCE THE SYSTEM IS BUILT, WE ACT AS YOUR CREATIVE DIRECTION PARTNER AND FIREWALL MANAGING EXECUTION, KEEPING EVERYTHING CONSISTENT, AND MAKING SURE YOUR BRAND SCALES AS YOU GROW.",
    }
  ];

  const getBarHeight = (stepId: number, activeId: number) => {
    if (stepId === activeId) return 'h-full';
    if (Math.abs(stepId - activeId) === 1) return 'h-[60%]';
    return 'h-[40%]';
  };

  const getBarColor = (stepId: number, activeId: number) => {
    return stepId === activeId ? 'bg-[#0a0a0a] text-white' : 'bg-[#8d8d95] text-white';
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f4f4f0] text-[#0a0a0a] selection:bg-[#ffc800] selection:text-[#0a0a0a] font-mono">
        <Header />

        <main>
          {/* HERO SECTION */}
          <section className="relative min-h-[95vh] flex flex-col justify-end pt-32 pb-8 px-6 md:px-12 bg-[#111]">
            <div className="absolute top-0 right-0 w-full h-full z-0 opacity-70 pointer-events-none">
              <img 
                src="/image_294b65.jpg" 
                alt="Coolo Studio Surfboard" 
                className="w-full h-full object-cover object-center mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            <AnimatedSection className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col h-full justify-between">
              <div className="flex justify-between items-start font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#f4f4f0] pt-4">
                <span>© 2026 COOLO. HUMANS IN THE MACHINE.</span>
                <span>ARTWORK: CONCEPT PLAYGROUND</span>
              </div>

              <div className="mt-auto mb-16 md:mb-32">
                <h1 className="font-shoulder font-black text-[12vw] leading-[0.8] uppercase tracking-tighter text-[#f4f4f0]">
                  <span className="block">YOUR BUSINESS IS BETTER THAN IT</span>
                  <span className="block">CURRENTLY LOOKS, AND YOU <span className="text-[#ffc800]">JUST</span></span>
                  <span className="block text-[#ffc800]">FOUND THE STUDIO <span className="text-[#f4f4f0]">TO FIX THAT.</span></span>
                </h1>
                
                <div className="mt-6 flex justify-center w-full md:w-auto md:inline-block md:ml-[42vw]">
                  <a href="#follow" className="font-mono text-[10px] uppercase tracking-widest text-[#ffc800] hover:opacity-70 transition-opacity">
                    ↘ FOLLOW US
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-8">
                <div className="md:col-span-6"></div>
                <div className="md:col-span-6 flex flex-col items-center md:items-start">
                  <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#f4f4f0] max-w-md leading-relaxed text-justify md:text-left">
                    GOOD BUSINESSES FREQUENTLY LOOK AND SOUND WORSE THAN THE ACTUAL VALUE THEY CREATE. WE BRIDGE THAT GAP, TURNING YOUR COMPLEX IDEAS AND EXPERTISE INTO A CLEAR STRATEGIC DIRECTION AND BRAND EXPERIENCE.
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[#f4f4f0] gap-2 mt-8">
                <span>SCROLL TO DISCOVER</span>
                <span className="border border-[#f4f4f0] rounded-full p-1 h-6 w-6 flex items-center justify-center">↓</span>
              </div>
            </AnimatedSection>
          </section>

          {/* THE REALITY CHECK (PROCESS OVERVIEW) */}
          <section className="bg-[#f4f4f0] text-[#0a0a0a] py-32 px-6 md:px-12 min-h-screen flex flex-col">
            <div className="max-w-[1600px] mx-auto w-full flex-grow flex flex-col">
              <AnimatedSection className="flex flex-col items-center text-center mb-24">
                <h2 className="font-shoulder font-black text-[12vw] md:text-[10vw] uppercase tracking-tighter leading-[0.8]">
                  THE REALITY CHECK
                </h2>
                <div className="mt-12 max-w-2xl">
                  <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
                    THIS ISN'T SOME OVERNIGHT MAGIC TRICK. IT TAKES ACTUAL TIME AND GIVING A SH*T.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed text-[#0a0a0a]/70">
                    WE ALL HAVE ACCESS TO MORE DESIGN TOOLS THAN EVER NOW. BUT LESS CLARITY THAN AS WELL. WE'RE HERE TO FIX THE GAP BETWEEN HOW GOOD YOU ACTUALLY ARE AND HOW GOOD YOU CURRENTLY SHOW UP TO THE WORLD.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection className="flex-grow flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 flex-grow">
                  
                  {/* Visual Bar Chart Interaction */}
                  <div className="md:col-span-5 lg:col-span-4 h-[400px] md:h-[600px] flex items-end justify-center gap-4 md:gap-6">
                    {processSteps.map((step) => (
                      <div 
                        key={`bar-${step.id}`}
                        onClick={() => setActiveStep(step.id)}
                        onMouseEnter={() => setActiveStep(step.id)}
                        className={`w-24 md:w-32 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative flex flex-col items-center ${getBarHeight(step.id, activeStep)} ${getBarColor(step.id, activeStep)}`}
                      >
                        <span className="font-shoulder font-black text-7xl md:text-9xl mt-8">{step.id}</span>
                        {activeStep === step.id && (
                          <span className="font-mono text-[8px] uppercase tracking-widest absolute bottom-6 text-white border-b border-white pb-1">
                            MORE INFO
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Content */}
                  <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center h-full relative min-h-[300px]">
                    {processSteps.map((step) => (
                      <div 
                        key={`content-${step.id}`}
                        className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                          ${activeStep === step.id ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}
                        `}
                      >
                        <h3 className="font-shoulder font-black text-[8vw] md:text-[6.5vw] uppercase tracking-tighter leading-[0.8] mb-12">
                          {step.title}
                        </h3>
                        <div className="max-w-xl">
                          <p className="font-shoulder font-black text-3xl md:text-4xl uppercase tracking-tighter leading-[0.9] mb-6">
                            {step.subtitle}
                          </p>
                          <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest leading-loose text-justify text-[#0a0a0a]/80">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* WHAT IT ACTUALLY LOOKS LIKE */}
          <section className="bg-[#f4f4f0] text-[#0a0a0a] py-32 px-6 md:px-12 border-t-2 border-[#0a0a0a]/10">
            <div className="max-w-[1600px] mx-auto">
              <AnimatedSection className="flex flex-col items-center mb-24">
                <h2 className="font-shoulder font-black text-[12vw] md:text-[8vw] uppercase tracking-tighter leading-[0.8] text-center mb-12">
                  WHAT IT ACTUALLY<br/>LOOKS LIKE.
                </h2>
              </AnimatedSection>

              <div className="flex flex-col gap-24">
                {/* UNMPLYNMT Case */}
                <AnimatedSection className="w-full flex flex-col group cursor-pointer">
                  <div className="w-full h-[60vh] md:h-[80vh] bg-[#222] relative overflow-hidden flex flex-col items-center justify-center">
                    {/* Placeholder for actual case image */}
                    <div className="absolute inset-0 bg-[#333] group-hover:scale-105 transition-transform duration-1000"></div>
                    <div className="absolute top-12 left-0 w-full text-center z-10 px-4">
                       <h3 className="font-shoulder font-black text-4xl md:text-6xl text-[#f4f4f0] uppercase tracking-tighter leading-[0.8]">
                         BRAND VOICE, LOGOTYPE & MARK SYSTEM, ART<br/>DIRECTION, CONTENT CREATION.
                       </h3>
                    </div>
                    <div className="relative z-10 flex flex-col items-center mt-auto pb-12 w-full">
                       <span className="font-mono text-xs text-[#f4f4f0] uppercase tracking-widest mb-4 font-bold">[ FASHION BRAND IDENTITY ]</span>
                       <h2 className="font-shoulder font-black text-[15vw] leading-[0.7] text-[#f4f4f0] uppercase tracking-tighter w-full text-center">
                         UNMPLYNMT
                       </h2>
                    </div>
                  </div>
                  <div className="w-full flex justify-center -mt-12 relative z-20">
                     <div className="w-64 aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center shadow-2xl group-hover:-translate-y-4 transition-transform duration-500">
                        <span className="font-mono text-sm text-[#f4f4f0] font-bold border-b border-[#f4f4f0] pb-1 uppercase tracking-widest">OPEN CASE</span>
                     </div>
                  </div>
                </AnimatedSection>

                {/* Additional Cases (PABLO & SURFBOARD) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                   <AnimatedSection className="flex flex-col gap-4 group cursor-pointer">
                     <div className="w-full aspect-[4/3] bg-[#eaeaea] overflow-hidden relative">
                       <div className="absolute inset-0 bg-[#e0e0e0] group-hover:scale-105 transition-transform duration-1000"></div>
                     </div>
                     <div className="flex flex-col gap-2">
                       <h3 className="font-mono text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">PABLO CREATIVE</h3>
                       <p className="font-mono text-[10px] uppercase tracking-widest text-[#0a0a0a]/60 leading-relaxed">
                         Associate Creative Direction, Design Execution, Art Assistance<br/>
                         Year: 2022<br/>
                         Sector: Graphic Design Studio
                       </p>
                     </div>
                   </AnimatedSection>

                   <AnimatedSection className="flex flex-col gap-4 group cursor-pointer mt-0 md:mt-32">
                     <div className="w-full aspect-[4/3] bg-[#eaeaea] overflow-hidden relative">
                       <div className="absolute inset-0 bg-[#e0e0e0] group-hover:scale-105 transition-transform duration-1000"></div>
                     </div>
                     <div className="flex flex-col gap-2">
                       <h3 className="font-mono text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">INTEGRITY</h3>
                       <p className="font-mono text-[10px] uppercase tracking-widest text-[#0a0a0a]/60 leading-relaxed">
                         Mid-Weight Design<br/>
                         Year: 2022<br/>
                         Sector: Fundraising Marketing Non-for-profit
                       </p>
                     </div>
                   </AnimatedSection>
                </div>
                
                {/* Surfboard single case */}
                <AnimatedSection className="flex flex-col gap-4 group cursor-pointer mt-12">
                   <div className="w-full aspect-[21/9] bg-[#111] overflow-hidden relative">
                     <div className="absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-1000">
                        <img src="/image_294b65.jpg" className="w-full h-full object-cover" alt="Surfboard V001"/>
                     </div>
                   </div>
                   <div className="flex flex-col gap-1">
                     <h3 className="font-mono text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">SURFBOARD V001</h3>
                     <p className="font-mono text-[10px] uppercase tracking-widest text-[#0a0a0a]/60">Concept Playground</p>
                   </div>
                </AnimatedSection>
              </div>

              <AnimatedSection className="mt-32 flex justify-end">
                <a href="/work" className="font-mono text-xl font-bold uppercase tracking-widest border-b-2 border-[#0a0a0a] pb-2 hover:text-[#eab308] hover:border-[#eab308] transition-colors flex items-center gap-4">
                  SEE MORE WORK <span>→</span>
                </a>
              </AnimatedSection>
            </div>
          </section>

          {/* WHAT THEY'VE SAID (TESTIMONIALS) */}
          <section className="bg-[#f4f4f0] text-[#0a0a0a] py-32 px-6 md:px-12 border-t-2 border-[#0a0a0a]/10">
            <div className="max-w-[1600px] mx-auto">
              <AnimatedSection className="mb-24">
                <h2 className="font-shoulder font-black text-[12vw] md:text-[10vw] uppercase tracking-tighter leading-[0.8]">
                  WHAT THEY'VE SAID
                </h2>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                <div className="md:col-span-4 flex justify-center md:justify-end md:mt-24">
                  <div className="text-6xl md:text-8xl text-[#0a0a0a]">↓</div>
                </div>

                <div className="md:col-span-8 flex flex-col gap-24">
                  <AnimatedSection className="max-w-2xl">
                    <p className="font-mono text-sm md:text-base uppercase tracking-widest leading-loose text-justify mb-6">
                      "DEFINITELY WORTH IT. COOLO AND FRANCO POSSESSES A RARE COMBINATION OF CREATIVE VISION AND STRATEGIC THINKING. HIS ABILITY TO COLLABORATE, LEAD, AND DELIVER EXCEPTIONAL WORK ALLOWED US TO ELEVATE OUR PROJECTS TO NEW HEIGHTS."
                    </p>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest">
                      BEN PARKINSON, OWNER & CREATIVE DIRECTOR, PABLO CREATIVE
                    </p>
                  </AnimatedSection>

                  <AnimatedSection className="max-w-2xl md:-ml-32">
                    <p className="font-mono text-sm md:text-base uppercase tracking-widest leading-loose text-justify mb-6">
                      "WORKING WITH FRANCO MEANS WORKING WITH ABSOLUTE DISCIPLINE. HE TRANSLATED COMPLEX IDEAS INTO COMPELLING VISUAL NARRATIVES THAT MADE A SIGNIFICANT COMMERCIAL IMPACT ON OUR CAMPAIGNS."
                    </p>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest">
                      JOEL COGGER, SENIOR CREATIVE & DESIGNER, INTEGRITY
                    </p>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>

          {/* YELLOW CTA */}
          <section className="bg-[#ffc800] text-[#0a0a0a] py-32 px-6 md:px-12 border-t-2 border-[#0a0a0a]">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 min-h-[60vh]">
              <AnimatedSection className="md:col-span-12">
                <h2 className="font-shoulder font-black text-[13vw] md:text-[11vw] uppercase tracking-tighter leading-[0.8] max-w-5xl">
                  THINK WE SHOULD<br/>LOOK AT YOUR<br/>BUSINESS?
                </h2>
              </AnimatedSection>

              <AnimatedSection className="md:col-span-6 flex flex-col gap-6 mt-auto">
                <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed">
                  TELL US WHAT YOU'RE BUILDING AND WHERE THINGS CURRENTLY FEEL DISCONNECTED.
                </p>
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest leading-relaxed text-justify">
                  IF IT SOUNDS LIKE SOMETHING WE CAN ACTUALLY SOLVE, WE'LL LET YOU KNOW. IF NOT, WE WON'T WASTE YOUR TIME. WE'LL GIVE YOU HONEST FEEDBACK AND POINT YOU IN THE RIGHT DIRECTION.
                </p>
              </AnimatedSection>

              <AnimatedSection className="md:col-span-6 flex items-end justify-start md:justify-end mt-12 md:mt-auto">
                <a href="/contact" className="inline-flex items-center justify-center h-16 px-16 bg-[#f4f4f0] text-[#0a0a0a] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-lg">
                  BRIEF US
                </a>
              </AnimatedSection>
            </div>
          </section>

          {/* THE TOOLS WE USE (PURPLE) */}
          <section className="bg-[#7d79c5] text-[#f4f4f0] py-32 px-6 md:px-12 min-h-screen flex flex-col justify-between">
            <div className="max-w-[1600px] mx-auto w-full">
               
               <AnimatedSection className="mb-24 max-w-4xl">
                 <h3 className="font-mono text-sm md:text-base font-bold uppercase tracking-widest mb-8">
                   WE DON'T SELL THIS STUFF Á LA CARTE.
                 </h3>
                 <p className="font-mono text-xs md:text-sm uppercase tracking-widest leading-relaxed text-justify">
                   YOU CANNOT BUY A STANDALONE LOGO OR A QUICK WEBSITE FROM US. WE DON'T SELL INDIVIDUAL SERVICES. BUT WHEN WE AGREE TO BUILD THE BRAND FOR YOUR BUSINESS, THESE ARE THE ACTUAL, PHYSICAL SKILLS WE BRING TO THE TABLE TO MAKE IT HAPPEN.
                 </p>
               </AnimatedSection>

               <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-32">
                 <div className="flex flex-col gap-2">
                   <h4 className="font-bold mb-2">BRAND SYSTEMS</h4>
                   <p className="opacity-70 leading-relaxed">POSITIONING,<br/>VISUAL IDENTITY,<br/>GUIDELINES.</p>
                 </div>
                 <div className="flex flex-col gap-2">
                   <h4 className="font-bold mb-2">WEB EXPERIENCES</h4>
                   <p className="opacity-70 leading-relaxed">CUSTOM WEB EXPERIENCES,<br/>CONTENT/COPY,<br/>REACT/WEBFLOW BUILD.</p>
                 </div>
                 <div className="flex flex-col gap-2">
                   <h4 className="font-bold mb-2">CREATIVE DIRECTION</h4>
                   <p className="opacity-70 leading-relaxed">CAMPAIGN THINKING,<br/>ART DIRECTION,<br/>CONCEPT DEVELOPMENT.</p>
                 </div>
                 <div className="flex flex-col gap-2">
                   <h4 className="font-bold mb-2">CONTENT & ASSETS</h4>
                   <p className="opacity-70 leading-relaxed">BRAND VOICE,<br/>LOOK & FEEL,<br/>IMAGE DIRECTION,<br/>VIDEO & MOTION,<br/>SOCIALS ASSETS.</p>
                 </div>
                 <div className="flex flex-col gap-2">
                   <h4 className="font-bold mb-2">SPECIALIST EXECUTION</h4>
                   <p className="opacity-70 leading-relaxed">3D PRODUCT VISUALIZATION,<br/>ADVERTISING READY R ENDERS.<br/>ANIMATION DESIGN.</p>
                 </div>
                 <div className="flex flex-col gap-2">
                   <h4 className="font-bold mb-2">PRINT</h4>
                   <p className="opacity-70 leading-relaxed">HIGH-QUALITY PRODUCTION PRINT,<br/>PACKAGING DESIGN & DIE-LINES,<br/>SIGNAGE DESIGN,<br/>COLLATERAL TOUCHPOINTS,<br/>MARKETING COLLATERAL.</p>
                 </div>
               </AnimatedSection>

               <AnimatedSection className="mt-auto">
                 <h2 className="font-shoulder font-black text-[15vw] uppercase tracking-tighter leading-[0.8] w-full">
                  <span className="block">THE TOOLS WE USE</span>
                  <span className="block">TO BUILD IT.</span>
                </h2>
               </AnimatedSection>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default HomePage;