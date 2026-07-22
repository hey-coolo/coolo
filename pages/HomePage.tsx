import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import AnimatedSection from '../components/AnimatedSection';

const heroImages = [
  '/assets/cases/franca-austral/Hero.webp',
  '/assets/cases/johneys-dumpling-house/Hero.webp',
  '/assets/cases/franca-austral/detail-3.webp',
  '/assets/cases/franca-austral/detail-4.webp'
];

const processSteps = [
  {
    id: 1,
    title: "PULLING THE IDEAS\nOUT OF YOUR HEAD.",
    subtitle: "FIND THE ACTUAL VALUE. A\nNO-BS BLUEPRINT OF EXACTLY\nWHAT YOU NEED TO DO, AND\nHOW TO ACTUALLY SELL IT.",
    description: "MOST FOUNDERS ARE SITTING ON A GOLDMINE OF EXPERTISE, BUT THEY'RE TOO BURIED IN THE DAILY GRIND TO EXPLAIN IT CLEARLY. WE SIT IN THE MESS WITH YOU, ASK THE UNCOMFORTABLE QUESTIONS, AND DRAG YOUR REAL VALUE OUT OF YOUR HEAD SO WE CAN BUILD A CLEAR, HONEST BLUEPRINT OF WHERE TO GO NEXT.",
  },
  {
    id: 2,
    title: "BUILDING THE ASSETS THAT\nMAKE IT REAL.",
    subtitle: "TURN STRATEGY INTO AN\nENGINE. YOU GET THE\nTACTICAL TOOLS YOU NEED TO\nACTUALLY SELL YOUR VISION.",
    description: "A GREAT STRATEGY IS COMPLETELY USELESS IF YOU DON'T HAVE THE TOOLS TO SELL IT. ONCE WE HAVE CLARITY, WE DESIGN THE ACTUAL SYSTEM, YOUR BRAND IDENTITY, VISUAL LANGUAGE, CUSTOM WEBSITE, AND SALES ASSETS, SO YOUR BUSINESS LOOKS, SOUNDS, AND FEELS AS PROFESSIONAL AS THE WORK YOU DO.",
  },
  {
    id: 3,
    title: "PROTECTING YOUR\nTIME AND SANITY.",
    subtitle: "KEEP THE MOMENTUM GOING.\nWE RUN THE MACHINE SO YOU\nCAN STEP BACK INTO BEING\nTHE HUMAN DRIVING IT.",
    description: "YOU NEED TO STAY FOCUSED ON RUNNING YOUR BUSINESS, NOT MICROMANAGING FREELANCERS. ONCE THE SYSTEM IS BUILT, WE ACT AS YOUR CREATIVE DIRECTION PARTNER AND FIREWALL MANAGING EXECUTION, KEEPING EVERYTHING CONSISTENT, AND MAKING SURE YOUR BRAND SCALES AS YOU GROW.",
  }
];

const HomePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [currentHeroImage, setCurrentHeroImage] = useState<number>(0);

  // Rotative Background Image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getBarStyles = (stepId: number, activeId: number) => {
    const isActive = stepId === activeId;
    return {
      height: isActive ? '100%' : '50%',
      backgroundColor: isActive ? '#050505' : '#8d8d95',
      color: '#ffffff'
    };
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f4f4f0] text-[#0a0a0a] selection:bg-[#ffc800] selection:text-[#0a0a0a]">
        <Header />

        <main>
          {/* HERO SECTION */}
          <section className="relative min-h-[100svh] flex flex-col pt-24 pb-8 px-6 md:px-12 bg-[#111] overflow-hidden">
            {/* Background Slider */}
            {heroImages.map((src, idx) => (
              <div 
                key={src}
                className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${idx === currentHeroImage ? 'opacity-40' : 'opacity-0'}`}
              >
                <img 
                  src={src} 
                  alt="Coolo Studio Design" 
                  className="w-full h-full object-cover object-center mix-blend-luminosity"
                />
              </div>
            ))}
            
            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col h-full flex-grow">
              
              {/* Top Meta */}
              <div className="flex justify-between items-start font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#f4f4f0] pt-4">
                <span>© 2026 COOLO. HUMANS IN THE MACHINE.</span>
                <span>ARTWORK: CONCEPT PLAYGROUND</span>
              </div>

              {/* Main Headline */}
              <div className="mt-20 md:mt-32 w-full flex flex-col items-center">
                <h1 className="font-shoulder font-black text-[12vw] md:text-[10.5vw] leading-[0.8] uppercase tracking-tighter text-[#f4f4f0] text-center w-full">
                  <span className="block">YOUR BUSINESS IS BETTER THAN IT</span>
                  <span className="block">CURRENTLY LOOKS, AND YOU <span className="text-[#ffcc00]">JUST</span></span>
                  <span className="block mt-1">
                    <span className="text-[#ffcc00]">FOUND THE </span>
                    <span className="relative inline-block border-b-[4px] md:border-b-[8px] border-[#ffcc00] text-[#ffcc00] cursor-pointer group pb-1 md:pb-2">
                      STUDIO
                      <a 
                        href="https://instagram.com/coolo.co.nz" 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#ffcc00] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
                      >
                        ↘ FOLLOW US
                      </a>
                    </span>
                    <span className="text-[#f4f4f0]"> TO FIX THAT.</span>
                  </span>
                </h1>
              </div>

              {/* Bottom Elements */}
              <div className="mt-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full pb-8">
                <div className="md:col-span-6 lg:col-span-7"></div>
                <div className="md:col-span-6 lg:col-span-5 flex justify-end">
                  <p className="font-mono text-[9px] md:text-[11px] uppercase tracking-widest text-[#f4f4f0] max-w-[420px] leading-loose text-justify">
                    GOOD BUSINESSES FREQUENTLY LOOK AND SOUND WORSE THAN THE ACTUAL VALUE THEY CREATE. WE BRIDGE THAT GAP, TURNING YOUR COMPLEX IDEAS AND EXPERTISE INTO A CLEAR STRATEGIC DIRECTION AND BRAND EXPERIENCE.
                  </p>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-widest text-[#f4f4f0] gap-3">
                <span>SCROLL TO DISCOVER</span>
                <span className="border border-[#f4f4f0] rounded-full p-1 h-6 w-6 flex items-center justify-center">↓</span>
              </div>

            </div>
          </section>

          {/* THE REALITY CHECK (HEADER) */}
          <section className="bg-[#f4f4f0] text-[#0a0a0a] pt-32 pb-16 px-6 md:px-12">
            <div className="max-w-[1600px] mx-auto flex flex-col items-center">
              <AnimatedSection>
                <h2 className="font-shoulder font-black text-[13vw] md:text-[11vw] uppercase tracking-tighter leading-[0.8] text-center">
                  THE REALITY CHECK
                </h2>
              </AnimatedSection>
              <AnimatedSection className="mt-12 text-center max-w-2xl">
                <p className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-6">
                  THIS ISN'T SOME OVERNIGHT MAGIC TRICK. IT TAKES ACTUAL TIME AND GIVING A SH*T.
                </p>
                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest leading-loose text-[#0a0a0a]/80">
                  WE ALL HAVE ACCESS TO MORE DESIGN TOOLS THAN EVER NOW, BUT LESS CLARITY THAN AS WELL. WE'RE HERE TO FIX THE GAP BETWEEN HOW GOOD YOU ACTUALLY ARE AND HOW GOOD YOU CURRENTLY SHOW UP TO THE WORLD.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* PROCESS INTERACTION (BAR CHART) */}
          <section className="bg-[#f4f4f0] text-[#0a0a0a] pb-32 px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1600px] mx-auto w-full">
              <AnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end min-h-[500px]">
                
                {/* Bars */}
                <div className="lg:col-span-5 flex items-end h-[350px] md:h-[500px] gap-4 md:gap-6 flex-shrink-0 order-2 lg:order-1">
                  {processSteps.map((step) => (
                    <div
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      onMouseEnter={() => setActiveStep(step.id)}
                      className="w-24 md:w-36 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col items-center justify-start pt-6 md:pt-10 overflow-hidden relative group"
                      style={getBarStyles(step.id, activeStep)}
                    >
                      <span className="font-shoulder font-black text-7xl md:text-[8vw] leading-none">
                        {step.id}
                      </span>
                      {activeStep === step.id && (
                        <div className="absolute bottom-6 transition-opacity duration-300">
                          <span className="font-mono text-[8px] uppercase tracking-widest border-b border-current pb-0.5">
                            MORE INFO
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Active Content Block */}
                <div className="lg:col-span-7 h-full flex flex-col justify-start pt-8 order-1 lg:order-2">
                  <div className="flex flex-col gap-8 lg:pl-8 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeStep}>
                    <h3 className="font-shoulder font-black text-[11vw] lg:text-[7.5vw] uppercase tracking-tighter leading-[0.8] whitespace-pre-line">
                      {processSteps[activeStep - 1].title}
                    </h3>
                    <div className="lg:ml-auto max-w-lg mt-8 lg:mt-16">
                      <p className="font-shoulder font-black text-3xl md:text-[2.5vw] uppercase tracking-tighter leading-[0.9] whitespace-pre-line mb-6">
                        {processSteps[activeStep - 1].subtitle}
                      </p>
                      <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest leading-loose text-[#0a0a0a] text-justify">
                        {processSteps[activeStep - 1].description}
                      </p>
                    </div>
                  </div>
                </div>

              </AnimatedSection>
            </div>
          </section>

          {/* WHAT IT ACTUALLY LOOKS LIKE */}
          <section className="bg-[#f4f4f0] text-[#0a0a0a] pb-32 px-6 md:px-12 border-t border-[#0a0a0a]/20">
            <div className="max-w-[1600px] mx-auto pt-32">
              <AnimatedSection className="flex flex-col items-center mb-16">
                <h2 className="font-shoulder font-black text-[13vw] md:text-[11vw] uppercase tracking-tighter leading-[0.8] text-center mb-12">
                  WHAT IT ACTUALLY<br/>LOOKS LIKE.
                </h2>
              </AnimatedSection>

              {/* UNMPLYNMT HERO CASE */}
              <AnimatedSection className="w-full flex flex-col group cursor-pointer relative mb-16 md:mb-32">
                <div className="w-full bg-[#111] relative overflow-hidden flex flex-col aspect-[4/3] md:aspect-[21/9]">
                  <div className="absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-1000 bg-[#222] mix-blend-multiply">
                    <img src="/assets/cases/franca-austral/detail-4.webp" alt="UNMPLYNMT Case Study" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-between h-full py-16 px-6 text-center">
                    <h3 className="font-shoulder font-black text-4xl md:text-[4vw] text-[#f4f4f0] uppercase tracking-tighter leading-[0.85] max-w-5xl mx-auto drop-shadow-xl mt-4">
                      BRAND VOICE, LOGOTYPE & MARK SYSTEM, ART DIRECTION, CONTENT CREATION.
                    </h3>
                    
                    <div className="flex flex-col items-center gap-2 mt-auto w-full">
                      <span className="font-mono text-[9px] md:text-[10px] text-[#f4f4f0] font-bold uppercase tracking-widest drop-shadow-md">
                        [ FASHION BRAND IDENTITY ]
                      </span>
                      <h2 className="font-shoulder font-black text-[18vw] leading-[0.75] text-[#f4f4f0] uppercase tracking-tighter w-full text-center drop-shadow-2xl">
                        UNMPLYNMT
                      </h2>
                    </div>
                  </div>
                </div>
                
                {/* Floating Open Case Hover Element (Centered Overlapping Bottom) */}
                <div className="w-full flex justify-center -mt-16 md:-mt-32 relative z-20">
                  <div className="w-64 md:w-96 aspect-[4/3] relative overflow-hidden group-hover:-translate-y-4 transition-transform duration-700 shadow-2xl">
                    <img src="/assets/cases/franca-austral/detail-4.webp" alt="Thumbnail" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0a0a0a]/40 flex items-center justify-center">
                      <span className="font-mono text-[10px] md:text-[11px] text-[#f4f4f0] font-bold border-b border-[#f4f4f0] pb-0.5 uppercase tracking-widest">
                        OPEN CASE
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* WHAT WE'VE DONE Header */}
              <AnimatedSection className="flex flex-col items-center mb-16 mt-32">
                <h2 className="font-shoulder font-black text-[10vw] md:text-[7vw] uppercase tracking-tighter leading-[0.8]">
                  WHAT WE'VE DONE
                </h2>
              </AnimatedSection>

              {/* OTHER CASES GRID */}
              <div className="flex flex-col gap-16 md:gap-32 max-w-6xl mx-auto w-full">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
                  {/* PABLO CREATIVE */}
                  <AnimatedSection className="flex flex-col gap-4 group cursor-pointer">
                    <div className="w-full aspect-[4/3] bg-[#e5e5e5] overflow-hidden relative mb-2">
                      <img src="/assets/cases/franca-austral/detail-1.webp" alt="Pablo Creative" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">PABLO CREATIVE</h3>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#0a0a0a]/60 leading-loose mt-2">
                        Associate Creative Direction, Design Execution, Art Assistance<br/>
                        Year: 2022<br/>
                        Scope: Associate Creative Direction, Design Execution, Art Assistance<br/>
                        Sector: Graphic Design Studio
                      </p>
                    </div>
                  </AnimatedSection>

                  {/* INTEGRITY */}
                  <AnimatedSection className="flex flex-col gap-4 group cursor-pointer md:mt-32">
                    <div className="w-full aspect-[16/9] bg-[#e5e5e5] overflow-hidden relative mb-2">
                       <img src="/assets/cases/franca-austral/detail-2.webp" alt="Integrity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">INTEGRITY</h3>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#0a0a0a]/60 leading-loose mt-2">
                        Mid-Weight Design<br/>
                        Year: 2022<br/>
                        Scope: Mid-Weight Designer<br/>
                        Sector: Fundraising Marketing Non-for-profit
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
                
                {/* SURFBOARD V001 */}
                <AnimatedSection className="flex flex-col gap-4 group cursor-pointer w-full">
                   <div className="w-full aspect-[21/9] bg-[#111] overflow-hidden relative mb-2">
                     <img src="/assets/cases/franca-austral/Hero.webp" alt="Surfboard V001" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
                   </div>
                   <div className="flex flex-col gap-2">
                     <h3 className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">SURFBOARD V001</h3>
                     <p className="font-mono text-[9px] uppercase tracking-widest text-[#0a0a0a]/60">Concept Playground</p>
                   </div>
                </AnimatedSection>

              </div>

              <AnimatedSection className="mt-32 flex justify-end max-w-6xl mx-auto w-full">
                <a href="/work" className="font-shoulder font-black text-4xl md:text-6xl uppercase tracking-tighter border-b-[3px] border-[#0a0a0a] pb-1 hover:text-[#ffc800] hover:border-[#ffc800] transition-colors flex items-center gap-4">
                  SEE MORE WORK <span className="font-mono font-normal text-3xl mb-1">→</span>
                </a>
              </AnimatedSection>
            </div>
          </section>

          {/* WHAT THEY'VE SAID (TESTIMONIALS) */}
          <section className="bg-[#f4f4f0] text-[#0a0a0a] py-32 px-6 md:px-12 border-t-2 border-[#0a0a0a]/10">
            <div className="max-w-[1600px] mx-auto">
              
              <AnimatedSection className="mb-24">
                <h2 className="font-shoulder font-black text-[13vw] md:text-[10vw] uppercase tracking-tighter leading-[0.8]">
                  WHAT THEY'VE SAID
                </h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                {/* Arrow Column */}
                <AnimatedSection className="md:col-span-5 flex justify-center md:justify-start md:pl-24 pt-8">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="md:w-20 md:h-20">
                    <line x1="12" y1="3" x2="12" y2="20"></line>
                    <polyline points="19 13 12 20 5 13"></polyline>
                  </svg>
                </AnimatedSection>

                {/* Quotes Column */}
                <div className="md:col-span-7 flex flex-col gap-24">
                  <AnimatedSection className="max-w-2xl">
                    <p className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest leading-loose text-justify mb-6">
                      "DEFINITELY WORTH IT. COOLO AND FRANCO POSSESSES A RARE COMBINATION OF CREATIVE VISION AND STRATEGIC THINKING. HIS ABILITY TO COLLABORATE, LEAD, AND DELIVER EXCEPTIONAL WORK ALLOWED US TO ELEVATE OUR PROJECTS TO NEW HEIGHTS."
                    </p>
                    <p className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
                      BEN PARKINSON, OWNER & CREATIVE DIRECTOR, PABLO CREATIVE
                    </p>
                  </AnimatedSection>

                  <AnimatedSection className="max-w-2xl">
                    <p className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest leading-loose text-justify mb-6">
                      "WORKING WITH FRANCO MEANS WORKING WITH ABSOLUTE DISCIPLINE. HE TRANSLATED COMPLEX IDEAS INTO COMPELLING VISUAL NARRATIVES THAT MADE A SIGNIFICANT COMMERCIAL IMPACT ON OUR CAMPAIGNS."
                    </p>
                    <p className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
                      JOEL COGGER, SENIOR CREATIVE & DESIGNER, INTEGRITY
                    </p>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>

          {/* YELLOW CTA */}
          <section className="bg-[#ffcc33] text-[#0a0a0a] py-32 px-6 md:px-12 border-t-2 border-[#0a0a0a]">
            <div className="max-w-[1600px] mx-auto flex flex-col min-h-[65vh] justify-between">
              <AnimatedSection>
                <h2 className="font-shoulder font-black text-[15vw] md:text-[13vw] uppercase tracking-tighter leading-[0.8] max-w-6xl">
                  THINK WE SHOULD<br/>LOOK AT YOUR<br/>BUSINESS?
                </h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-24 md:mt-32 items-end">
                <AnimatedSection className="md:col-span-8 lg:col-span-6 flex flex-col gap-6 max-w-md">
                  <p className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-loose">
                    TELL US WHAT YOU'RE BUILDING AND WHERE THINGS CURRENTLY FEEL DISCONNECTED.
                  </p>
                  <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest leading-loose text-justify">
                    IF IT SOUNDS LIKE SOMETHING WE CAN ACTUALLY SOLVE, WE'LL LET YOU KNOW. IF NOT, WE WON'T WASTE YOUR TIME. WE'LL GIVE YOU HONEST FEEDBACK AND POINT YOU IN THE RIGHT DIRECTION.
                  </p>
                </AnimatedSection>

                <AnimatedSection className="md:col-span-4 lg:col-span-6 flex justify-start md:justify-end pb-2">
                  <a href="/contact" className="inline-flex items-center justify-center h-16 px-16 bg-[#f4f4f0] text-[#0a0a0a] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-[40px] shadow-sm">
                    BRIEF US
                  </a>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* THE TOOLS WE USE (PURPLE) */}
          <section className="bg-[#7e7ab8] text-[#f4f4f0] py-32 px-6 md:px-12 min-h-screen flex flex-col justify-between border-t-2 border-[#0a0a0a]">
            <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col flex-grow">
               
               <AnimatedSection className="mb-24 max-w-4xl">
                 <h3 className="font-mono text-[11px] md:text-[13px] font-bold uppercase tracking-widest mb-6">
                   WE DON'T SELL THIS STUFF Á LA CARTE.
                 </h3>
                 <p className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest leading-[2] text-justify">
                   YOU CANNOT BUY A STANDALONE LOGO OR A QUICK WEBSITE FROM US. WE DON'T SELL INDIVIDUAL SERVICES. BUT WHEN WE AGREE TO BUILD THE BRAND FOR YOUR BUSINESS, THESE ARE THE ACTUAL, PHYSICAL SKILLS WE BRING TO THE TABLE TO MAKE IT HAPPEN.
                 </p>
               </AnimatedSection>

               <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-x-16 md:gap-y-24 font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-32 mt-12">
                 <div className="flex flex-col gap-3">
                   <h4 className="font-bold">BRAND SYSTEMS</h4>
                   <p className="opacity-80 leading-[2]">POSITIONING,<br/>VISUAL IDENTITY,<br/>GUIDELINES.</p>
                 </div>
                 <div className="flex flex-col gap-3">
                   <h4 className="font-bold">WEB EXPERIENCES</h4>
                   <p className="opacity-80 leading-[2]">CUSTOM WEB EXPERIENCES,<br/>CONTENT/COPY,<br/>REACT/WEBFLOW BUILD.</p>
                 </div>
                 <div className="flex flex-col gap-3">
                   <h4 className="font-bold">CREATIVE DIRECTION</h4>
                   <p className="opacity-80 leading-[2]">CAMPAIGN THINKING,<br/>ART DIRECTION,<br/>CONCEPT DEVELOPMENT.</p>
                 </div>
                 <div className="flex flex-col gap-3">
                   <h4 className="font-bold">CONTENT & ASSETS</h4>
                   <p className="opacity-80 leading-[2]">BRAND VOICE,<br/>LOOK & FEEL,<br/>IMAGE DIRECTION,<br/>VIDEO & MOTION,<br/>SOCIALS ASSETS.</p>
                 </div>
                 <div className="flex flex-col gap-3">
                   <h4 className="font-bold">SPECIALIST EXECUTION</h4>
                   <p className="opacity-80 leading-[2]">3D PRODUCT VISUALIZATION,<br/>ADVERTISING READY RENDERS.<br/>ANIMATION DESIGN.</p>
                 </div>
                 <div className="flex flex-col gap-3">
                   <h4 className="font-bold">PRINT</h4>
                   <p className="opacity-80 leading-[2]">HIGH-QUALITY PRODUCTION PRINT,<br/>PACKAGING DESIGN & DIE-LINES,<br/>SIGNAGE DESIGN,<br/>COLLATERAL TOUCHPOINTS,<br/>MARKETING COLLATERAL.</p>
                 </div>
               </AnimatedSection>

               <AnimatedSection className="mt-auto">
                 <h2 className="font-shoulder font-black text-[16vw] md:text-[15vw] uppercase tracking-tighter leading-[0.8] w-full pt-12 text-[#f4f4f0] opacity-90">
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