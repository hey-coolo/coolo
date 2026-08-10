import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

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
      <div className="bg-brand-offwhite">
        <Helmet>
          <title>About Us | COOLO Studio</title>
          <meta name="description" content="Learn about COOLO Studio, our design philosophy, and how we help businesses transition from improvised to intentional brand strategies." />
          <link rel="canonical" href="https://coolo.co.nz/about" />
          <script type="application/ld+json">
            {JSON.stringify(aboutSchema)}
          </script>
        </Helmet>

        {/* HERO */}
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6 md:px-12">
            <AnimatedSection>
              <header className="pt-12 pb-16">
                <h1 className="text-brand-navy text-[16vw] md:text-[13vw] font-black uppercase tracking-tighter leading-[0.85] mt-0 mb-8">
                  WE'RE THE HUMANS<span className="text-brand-yellow">.</span>
                </h1>
                <div className="w-full aspect-[21/9] md:aspect-[2.5/1] overflow-hidden bg-brand-navy/10 relative">
                  <img 
                    src="/assets/team/gallery-hero.webp" 
                    alt="COOLO Studio Team" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'; }}
                  />
                </div>
              </header>
            </AnimatedSection>
          </div>
        </div>

        {/* JUST PEOPLE & NARRATIVE */}
        <div className="bg-brand-navy py-24 md:py-32 text-brand-offwhite">
          <div className="container mx-auto px-6 md:px-12">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sticky Heading */}
              <div className="lg:col-span-4">
                <AnimatedSection>
                  <h2 className="text-6xl md:text-8xl lg:text-[7vw] font-black uppercase tracking-tighter text-brand-offwhite leading-[0.85] sticky top-32">
                    JUST<br/>PEOPLE
                  </h2>
                </AnimatedSection>
              </div>

              {/* Bespoke Editorial Collage */}
              <div className="lg:col-span-8 lg:pl-12">
                
                {/* Yellow highlight text box */}
                <div className="flex justify-end mb-24 md:mb-32">
                  <AnimatedSection delay={100} className="max-w-xl text-brand-yellow font-mono text-sm md:text-base uppercase tracking-widest font-bold leading-relaxed text-right md:text-left">
                    <p className="mb-8">
                      COOLO IS A BOUTIQUE CREATIVE AND BRAND STUDIO OPERATING OUT OF MOUNT MAUNGANUI, NZ.
                    </p>
                    <p>
                      WE PARTNER WITH FOUNDERS, MARKETING TEAMS, AND VISIONARY ENTREPRENEURS TO HELP THEIR BUSINESSES TRANSITION FROM IMPROVISED GROWTH INTO AN INTENTIONAL, UNDENIABLE MARKET PRESENCE.
                    </p>
                  </AnimatedSection>
                </div>

                <div className="flex flex-col gap-24 md:gap-32">
                  
                  {/* Collage Row 1: Large Image */}
                  <AnimatedSection delay={200}>
                    <div className="w-full md:w-5/6 ml-auto aspect-video bg-white/5 overflow-hidden border border-white/10">
                      <img src="/assets/team/gallery-1.webp" alt="Studio Culture" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2564&auto=format&fit=crop'; }} />
                    </div>
                  </AnimatedSection>
                  
                  {/* Collage Row 2: Text */}
                  <AnimatedSection delay={300}>
                    <div className="w-full md:w-2/3 ml-auto font-body text-xl md:text-2xl text-brand-offwhite/80 leading-tight">
                      <p>
                        Most brands don't have a design problem. <strong className="font-bold text-brand-offwhite">They have a clarity problem.</strong> That's where we start. We are here to help clarify what you do and how you say it.
                      </p>
                    </div>
                  </AnimatedSection>

                  {/* Collage Row 3: Left Images, Right Text */}
                  <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                    <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-12">
                      <AnimatedSection delay={200}>
                        <div className="w-4/5 aspect-square bg-white/5 overflow-hidden border border-white/10">
                          <img src="/assets/team/gallery-2.webp" alt="Creative Process" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2564&auto=format&fit=crop'; }} />
                        </div>
                      </AnimatedSection>
                      <AnimatedSection delay={300}>
                        <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden border border-white/10 ml-0 md:ml-12">
                          <img src="/assets/team/gallery-3.webp" alt="Studio Work" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2564&auto=format&fit=crop'; }} />
                        </div>
                      </AnimatedSection>
                    </div>
                    <div className="w-full md:w-1/2 md:pt-24">
                      <AnimatedSection delay={400}>
                        <div className="font-body text-xl md:text-2xl text-brand-offwhite/80 leading-tight">
                          <p>
                            In a digital landscape cluttered with fleeting trends and templated aesthetics, we believe in building systems that endure. Our philosophy is pretty simple: keep it functional, keep it intentional, and cut out the noise.
                          </p>
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>

                  {/* Collage Row 4: Left Text, Right Images */}
                  <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                    <div className="w-full md:w-1/3">
                      <AnimatedSection delay={200}>
                        <div className="font-body text-xl md:text-2xl text-brand-offwhite/80 leading-tight sticky top-32">
                          <p>
                            We build brands that feel like a breath of fresh air. Ultimately understandable and completely authentic to who you are. We don't use templates.
                          </p>
                        </div>
                      </AnimatedSection>
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col gap-6 md:gap-8">
                      <AnimatedSection delay={300}>
                        <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden border border-white/10">
                          <img src="/assets/team/gallery-4.webp" alt="Team Brainstorming" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2564&auto=format&fit=crop'; }} />
                        </div>
                      </AnimatedSection>
                      <div className="flex justify-start md:justify-end gap-6 md:gap-8">
                        <AnimatedSection delay={400} className="w-1/2 md:w-1/3">
                          <div className="w-full aspect-square bg-white/5 overflow-hidden border border-white/10">
                            <img src="/assets/team/gallery-5.webp" alt="Office Detail" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2564&auto=format&fit=crop'; }} />
                          </div>
                        </AnimatedSection>
                        <AnimatedSection delay={500} className="w-1/2 md:w-1/3">
                          <div className="w-full aspect-[3/4] bg-white/5 overflow-hidden border border-white/10">
                            <img src="/assets/team/gallery-6.webp" alt="Studio Inspiration" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2564&auto=format&fit=crop'; }} />
                          </div>
                        </AnimatedSection>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* CO-FOUNDERS Header (Dark Section) */}
            <div className="pt-40 pb-16">
              <AnimatedSection>
                <h2 className="text-[14vw] md:text-[12vw] font-black uppercase tracking-tighter text-brand-yellow leading-[0.85]">
                  CO-FOUNDERS <span className="text-brand-offwhite">+</span>
                </h2>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* TEAM MEMBERS (Light Section) */}
        <div className="bg-brand-offwhite py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col max-w-6xl mx-auto">
              
              {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <AnimatedSection key={slug} delay={index * 150}>
                    <div className={`flex flex-col ${isEven ? 'items-end' : 'items-start'} mb-32 md:mb-48`}>
                      
                      {/* Typography Block */}
                      <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-end gap-4 md:gap-8 mb-6 md:mb-12`}>
                        {isEven && (
                          <span 
                            className="font-black text-2xl md:text-5xl uppercase tracking-tighter text-brand-navy/60 pb-2 md:pb-4 hidden md:block"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            {member.title}
                          </span>
                        )}
                        <Link to={`/team/${slug}`} className="hover:text-brand-purple transition-colors">
                          <h3 className="text-[18vw] md:text-[12vw] font-black uppercase tracking-tighter text-brand-navy leading-none m-0">
                            {member.name}
                          </h3>
                        </Link>
                        {!isEven && (
                          <span 
                            className="font-black text-2xl md:text-5xl uppercase tracking-tighter text-brand-navy/60 pb-2 md:pb-4 hidden md:block"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            {member.title}
                          </span>
                        )}
                      </div>

                      {/* Image Block */}
                      <Link to={`/team/${slug}`} className={`w-full md:w-3/5 aspect-[4/3] bg-brand-navy/5 overflow-hidden group relative block border border-brand-navy/10 ${isEven ? 'mr-0 md:mr-32' : 'ml-0 md:ml-32'}`}>
                        <motion.img 
                            initial={{ scale: 1.1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:hidden">
                           <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold">
                             {member.title}
                           </span>
                        </div>
                      </Link>

                    </div>
                  </AnimatedSection>
                );
              })}

              {/* RECRUITMENT SLOT */}
              <AnimatedSection delay={300}>
                <Link to="/join" className="group relative block aspect-video md:aspect-[21/9] overflow-hidden bg-white border border-brand-navy/20 hover:bg-brand-navy transition-colors duration-500 flex flex-col justify-center items-center text-center p-12">
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:16px_16px] group-hover:bg-[radial-gradient(#F8F8F9_1px,transparent_1px)] transition-colors"></div>
      
                  <div className="relative z-10 flex flex-col items-center">
                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-brand-navy mb-4 group-hover:text-brand-offwhite transition-colors leading-none">
                      JOIN THE TEAM
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-navy/60 group-hover:text-brand-offwhite/60 max-w-xs mx-auto leading-[2] mt-4">
                      SEEKING SENIOR CREATIVES & TALENT
                    </p>
                    <span className="inline-block mt-8 border-b border-brand-purple pb-1 font-mono text-[10px] uppercase font-bold text-brand-purple tracking-widest group-hover:text-brand-yellow group-hover:border-brand-yellow transition-all">
                      SUBMIT PORTFOLIO
                    </span>
                  </div>
                </Link>
              </AnimatedSection>

            </div>
          </div>
        </div>

        {/* VALUES / PRINCIPLES */}
        <section className="py-24 md:py-32 bg-brand-offwhite border-t border-brand-navy/10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                  { t: "Deep Clarity", d: "If people don't understand you quickly, they move on. We fix that." },
                  { t: "Design Power", d: "Your visuals should carry weight, not decoration." },
                  { t: "Soulful Logic", d: "Strategy connects what you do to how people perceive you." },
                  { t: "The Slow Burn", d: "We build brands that still make sense in 3 years, not just today." }
              ].map((val, i) => (
                  <AnimatedSection key={val.t} delay={i * 100} className="h-full">
                      <div className="border border-brand-navy/20 p-10 h-full bg-white hover:bg-brand-navy hover:text-brand-offwhite transition-colors duration-500 group flex flex-col">
                          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-purple group-hover:text-brand-yellow font-bold mb-8 block transition-colors">Principle 0{i + 1}</span>
                          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">{val.t}</h3>
                          <p className="font-body text-lg md:text-xl opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed mt-auto">{val.d}</p>
                      </div>
                  </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* DROP THE LINK (Yellow Block) */}
        <div className="bg-brand-yellow py-32 text-brand-navy border-t border-brand-navy/20">
          <div className="container mx-auto px-6 md:px-12">
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                <div className="md:col-span-7">
                  <h2 className="text-[15vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.8] m-0">
                    DROP<br/>THE<br/>LINK.
                  </h2>
                </div>
                <div className="md:col-span-5 md:pl-12 font-mono text-sm md:text-base uppercase tracking-widest font-bold leading-relaxed">
                  <p className="mb-8">
                    We don't just decorate businesses; we clarify their purpose. This process begins with our foundational Brand Strategy sprints, where we align your internal vision with your external messaging.
                  </p>
                  <div className="flex flex-col gap-4 items-start">
                    <Link to="/clarity" className="border-b-2 border-brand-navy hover:text-brand-purple hover:border-brand-purple transition-colors pb-1">
                      Brand Strategy & Clarity
                    </Link>
                    <Link to="/design-power" className="border-b-2 border-brand-navy hover:text-brand-purple hover:border-brand-purple transition-colors pb-1">
                      Design Power
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* THE BULLSH*T FILTER (Navy Block) */}
        <div className="bg-brand-navy py-32 text-brand-offwhite">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <AnimatedSection>
              <h2 className="text-[12vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] mb-16">
                THE BULLSH*T FILTER
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] bg-brand-navy/50 mb-16 relative overflow-hidden">
                <img 
                  src="/assets/team/gallery-filter.webp" 
                  alt="The Filter" 
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop'; }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="max-w-3xl mx-auto font-mono text-sm md:text-base tracking-widest uppercase font-bold text-brand-offwhite/80 leading-relaxed text-left md:text-center">
                <p>
                  Our team deliberately remains boutique. By limiting the volume of clients we take on at any given time, we ensure that every project receives senior-level strategic oversight and uncompromising creative dedication.
                </p>
                <p className="mt-8 text-brand-yellow">
                  We are fully invested in the commercial success and cultural resonance of the brands we partner with.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* FOOTER CTAs */}
        <div className="grid grid-cols-1">
          {/* CTA 1: Yellow */}
          <div className="bg-brand-yellow py-24 md:py-32 px-6 md:px-12 text-brand-navy">
            <AnimatedSection>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] max-w-4xl">
                  THINK WE SHOULD LOOK AT YOUR BUSINESS?
                </h2>
                <Link to="/contact" className="px-10 py-6 bg-white text-brand-navy font-bold font-mono uppercase tracking-widest text-sm hover:bg-brand-navy hover:text-brand-offwhite transition-colors whitespace-nowrap border border-brand-navy/10">
                  START HERE
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA 2: Purple */}
          <div className="bg-brand-purple py-24 md:py-32 px-6 md:px-12 text-brand-offwhite">
            <AnimatedSection>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] max-w-4xl text-brand-offwhite/80 hover:text-brand-offwhite transition-colors">
                  PREFER TO SEE SOME WORK FIRST, ISN'T IT?
                </h2>
                <Link to="/work" className="font-mono uppercase tracking-widest text-sm font-bold border-b-2 border-brand-offwhite/30 pb-1 hover:border-brand-offwhite transition-colors whitespace-nowrap mt-8 lg:mt-0">
                  SEE THE WORK +
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default AboutPage;