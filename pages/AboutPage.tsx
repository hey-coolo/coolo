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
        <div className="pt-40 pb-24">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[72px]">
            <AnimatedSection>
              <header className="mb-12">
                <h1 className="h1 text-brand-navy mb-8">
                  WE'RE THE HUMANS<span className="text-brand-yellow">.</span>
                </h1>
                <div className="w-full aspect-[21/9] md:aspect-[2.5/1] overflow-hidden bg-brand-navy/10 relative">
                  <img 
                    src="/assets/images/wearethehumans.jpg" 
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
        <div className="bg-brand-navy py-32 text-brand-offwhite">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[72px]">
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
              
              {/* Sticky Heading */}
              <div className="md:col-span-4 mb-16 md:mb-0">
                <AnimatedSection>
                  <h2 className="h2 text-brand-offwhite sticky top-32">
                    JUST<br/>PEOPLE
                  </h2>
                </AnimatedSection>
              </div>

              {/* Bespoke Editorial Collage (8 Columns) */}
              <div className="md:col-span-8">
                
                {/* Yellow highlight text box */}
                <AnimatedSection delay={100}>
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-6 mb-24 md:mb-32">
                    <div className="md:col-start-3 md:col-span-6">
                      <div className="body-dense text-brand-yellow text-right md:text-left">
                        <p className="mb-8">
                          COOLO IS A BOUTIQUE CREATIVE AND BRAND STUDIO OPERATING OUT OF MOUNT MAUNGANUI, NZ.
                        </p>
                        <p>
                          WE PARTNER WITH FOUNDERS, MARKETING TEAMS, AND VISIONARY ENTREPRENEURS TO HELP THEIR BUSINESSES TRANSITION FROM IMPROVISED GROWTH INTO AN INTENTIONAL, UNDENIABLE MARKET PRESENCE.
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Collage Rows */}
                <div className="flex flex-col gap-24 md:gap-32">
                  
                  {/* Collage Row 1: Large Image */}
                  <AnimatedSection delay={200}>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                      <div className="md:col-start-2 md:col-span-7">
                        <div className="w-full aspect-video bg-white/5 overflow-hidden border border-white/10">
                          <img src="/assets/team/gallery/ariana01.webp" alt="Studio Culture" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2564&auto=format&fit=crop'; }} />
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                  
                  {/* Collage Row 2: Text */}
                  <AnimatedSection delay={300}>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                      <div className="md:col-start-3 md:col-span-6">
                        <div className="p2 text-brand-offwhite/80 text-xl md:text-2xl">
                          <p>
                            Most brands don't have a design problem. <strong className="font-bold text-brand-offwhite">They have a clarity problem.</strong> That's where we start. We are here to help clarify what you do and how you say it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Collage Row 3: Left Images, Right Text */}
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-start">
                    <div className="md:col-span-4 flex flex-col gap-6">
                      <AnimatedSection delay={200}>
                        <div className="w-4/5 aspect-square bg-white/5 overflow-hidden border border-white/10">
                          <img src="/assets/team/gallery/franco03.webp" alt="Creative Process" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2564&auto=format&fit=crop'; }} />
                        </div>
                      </AnimatedSection>
                      <AnimatedSection delay={300}>
                        <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden border border-white/10 ml-0 md:ml-6">
                          <img src="/assets/team/gallery/ariana03.webp" alt="Studio Work" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2564&auto=format&fit=crop'; }} />
                        </div>
                      </AnimatedSection>
                    </div>
                    <div className="md:col-span-4 md:pt-24">
                      <AnimatedSection delay={400}>
                        <div className="p2 text-brand-offwhite/80 text-xl md:text-2xl">
                          <p>
                            In a digital landscape cluttered with fleeting trends and templated aesthetics, we believe in building systems that endure. Our philosophy is pretty simple: keep it functional, keep it intentional, and cut out the noise.
                          </p>
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>

                  {/* Collage Row 4: Left Text, Right Images */}
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-start">
                    <div className="md:col-span-3">
                      <AnimatedSection delay={200}>
                        <div className="p2 text-brand-offwhite/80 text-xl md:text-2xl sticky top-32">
                          <p>
                            We build brands that feel like a breath of fresh air. Ultimately understandable and completely authentic to who you are. We don't use templates.
                          </p>
                        </div>
                      </AnimatedSection>
                    </div>
                    <div className="md:col-span-5 flex flex-col gap-6">
                      <AnimatedSection delay={300}>
                        <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden border border-white/10">
                          <img src="/assets/team/gallery/ariana02.webp" alt="Team Brainstorming" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2564&auto=format&fit=crop'; }} />
                        </div>
                      </AnimatedSection>
                      <div className="grid grid-cols-2 gap-6">
                        <AnimatedSection delay={400}>
                          <div className="w-full aspect-square bg-white/5 overflow-hidden border border-white/10">
                            <img src="/assets/team/gallery/franco01.webp" alt="Office Detail" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2564&auto=format&fit=crop'; }} />
                          </div>
                        </AnimatedSection>
                        <AnimatedSection delay={500}>
                          <div className="w-full aspect-[3/4] bg-white/5 overflow-hidden border border-white/10">
                            <img src="/assets/team/gallery/franco04.webp" alt="Studio Inspiration" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2564&auto=format&fit=crop'; }} />
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
                <h2 className="h1 text-brand-yellow">
                  CO-FOUNDERS <span className="text-brand-offwhite">+</span>
                </h2>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* TEAM MEMBERS (Light Section) */}
        <div className="bg-brand-offwhite py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[72px]">
            
            <div className="flex flex-col gap-32 md:gap-48">
              {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <AnimatedSection key={slug} delay={index * 150}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Alternating Layout */}
                      <div className={`md:col-span-10 ${isEven ? 'md:col-start-3' : 'md:col-start-1'} flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-end gap-6`}>
                        
                        {/* Vertical Title */}
                        <div className="hidden md:block w-12 shrink-0 pb-16">
                          <span 
                            className="h3 text-brand-navy/60 whitespace-nowrap"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            {member.title}
                          </span>
                        </div>

                        {/* Image Block & Name */}
                        <div className="flex-1 w-full">
                           <div className={`flex ${isEven ? 'justify-start' : 'justify-end'} mb-6`}>
                              <Link to={`/team/${slug}`} className="hover:text-brand-purple transition-colors">
                                <h3 className="h1 m-0 text-brand-navy">
                                  {member.name}
                                </h3>
                              </Link>
                           </div>
                           
                           <Link to={`/team/${slug}`} className="block w-full aspect-[4/3] bg-brand-navy/5 overflow-hidden group relative border border-brand-navy/10">
                              <motion.img 
                                  initial={{ scale: 1.1 }}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                                  src={member.imageUrl} 
                                  alt={member.name} 
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100" 
                              />
                              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:hidden">
                                 <span className="h4 text-brand-yellow">
                                   {member.title}
                                 </span>
                              </div>
                           </Link>
                        </div>

                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}

              {/* RECRUITMENT SLOT */}
              <AnimatedSection delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <Link to="/join" className="md:col-span-10 md:col-start-2 group relative block aspect-video md:aspect-[21/9] overflow-hidden bg-white border border-brand-navy/20 hover:bg-brand-navy transition-colors duration-500 flex flex-col justify-center items-center text-center p-12">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:16px_16px] group-hover:bg-[radial-gradient(#F8F8F9_1px,transparent_1px)] transition-colors"></div>
        
                    <div className="relative z-10 flex flex-col items-center">
                      <h3 className="h2 text-brand-navy mb-4 group-hover:text-brand-offwhite transition-colors m-0">
                        JOIN THE TEAM
                      </h3>
                      <p className="body-dense text-brand-navy/60 group-hover:text-brand-offwhite/60 mt-4">
                        SEEKING SENIOR CREATIVES & TALENT
                      </p>
                      <span className="inline-block mt-8 border-b-2 border-brand-purple pb-1 h4 text-brand-purple group-hover:text-brand-yellow group-hover:border-brand-yellow transition-all">
                        SUBMIT PORTFOLIO
                      </span>
                    </div>
                  </Link>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </div>

        {/* VALUES / PRINCIPLES */}
        <section className="py-32 bg-brand-offwhite border-t border-brand-navy/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[72px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {[
                  { t: "Deep Clarity", d: "If people don't understand you quickly, they move on. We fix that." },
                  { t: "Design Power", d: "Your visuals should carry weight, not decoration." },
                  { t: "Soulful Logic", d: "Strategy connects what you do to how people perceive you." },
                  { t: "The Slow Burn", d: "We build brands that still make sense in 3 years, not just today." }
              ].map((val, i) => (
                  <AnimatedSection key={val.t} delay={i * 100} className="md:col-span-6 lg:col-span-3 h-full">
                      <div className="border border-brand-navy/20 p-10 h-full bg-white hover:bg-brand-navy hover:text-brand-offwhite transition-colors duration-500 group flex flex-col">
                          <span className="body-dense text-brand-purple group-hover:text-brand-yellow mb-8 block transition-colors">Principle 0{i + 1}</span>
                          <h3 className="h2 mb-6">{val.t}</h3>
                          <p className="p2 opacity-70 group-hover:opacity-100 transition-opacity mt-auto">{val.d}</p>
                      </div>
                  </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* DROP THE LINK (Yellow Block) */}
        <div className="bg-brand-yellow py-32 text-brand-navy border-t border-brand-navy/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[72px]">
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-7">
                  <h2 className="h1 m-0">
                    DROP<br/>THE<br/>LINK.
                  </h2>
                </div>
                <div className="md:col-span-5 body-dense">
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
          <div className="max-w-[1440px] mx-auto px-6 md:px-[72px] text-center">
            <AnimatedSection>
              <h2 className="h2 mb-16">
                THE BULLSH*T FILTER
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] bg-brand-navy/50 mb-16 relative overflow-hidden">
                <img 
                  src="/assets/images/drops-hero.jpg" 
                  alt="The Filter" 
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop'; }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="max-w-3xl mx-auto body-dense text-brand-offwhite/80 text-left md:text-center">
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
          <div className="bg-brand-yellow py-32 text-brand-navy">
            <div className="max-w-[1440px] mx-auto px-6 md:px-[72px]">
              <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-9">
                    <h2 className="h2 m-0 max-w-4xl">
                      THINK WE SHOULD LOOK AT YOUR BUSINESS?
                    </h2>
                  </div>
                  <div className="md:col-span-3 text-left md:text-right mt-8 md:mt-0">
                    <Link to="/contact" className="inline-block px-10 py-6 bg-white text-brand-navy h4 hover:bg-brand-navy hover:text-brand-offwhite transition-colors border border-brand-navy/10 m-0">
                      START HERE
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* CTA 2: Purple */}
          <div className="bg-brand-purple py-32 text-brand-offwhite">
            <div className="max-w-[1440px] mx-auto px-6 md:px-[72px]">
              <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-9">
                    <h2 className="h2 m-0 max-w-4xl text-brand-offwhite/80 hover:text-brand-offwhite transition-colors">
                      PREFER TO SEE SOME WORK FIRST, ISN'T IT?
                    </h2>
                  </div>
                  <div className="md:col-span-3 text-left md:text-right mt-8 md:mt-0">
                    <Link to="/work" className="inline-block h4 border-b-[3px] border-brand-offwhite/30 pb-1 hover:border-brand-offwhite transition-colors m-0">
                      SEE THE WORK +
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default AboutPage;