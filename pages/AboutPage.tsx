import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';
import { TEAM_MEMBERS } from '../constants';

const HeroSection = () => (
  <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px] pt-32 pb-16 md:pb-24">
    <AnimatedSection>
      <header className="pt-12 pb-16">
        <h1 className="text-brand-navy text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase tracking-tighter leading-[0.85] mt-0 mb-6 md:mb-8">
          WE'RE THE HUMANS<span className="text-brand-yellow">.</span>
        </h1>
        <p className="font-mono text-[clamp(0.875rem,1vw,1rem)] text-brand-navy/80 font-bold tracking-widest uppercase max-w-2xl mb-10 md:mb-14 leading-relaxed">
          We help founders figure out what they actually stand for—then turn it into a brand people can understand and remember.
        </p>
        <div className="w-full aspect-[21/9] md:aspect-[2.5/1] overflow-hidden bg-brand-navy/10 relative">
          <img 
            src="/assets/images/wearethehumans.jpg" 
            alt="COOLO Studio Team" 
            className="w-full h-full object-cover object-center transition-all duration-1000" 
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'; }}
          />
        </div>
      </header>
    </AnimatedSection>
  </div>
);

const JustPeopleAndHeader = () => (
  <div className="bg-brand-navy py-24 md:py-32 text-brand-offwhite">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16">
        
        {/* Sticky Heading */}
        <div className="md:col-span-5 lg:col-span-4">
          <AnimatedSection>
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase tracking-tighter text-brand-offwhite leading-[0.85] sticky top-32">
              NO AGENCY<br/>THEATRE
            </h2>
          </AnimatedSection>
        </div>

        {/* Bespoke Editorial Collage */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-24 md:gap-32">
          
          {/* Yellow highlight text box */}
          <AnimatedSection delay={100} className="w-full lg:w-4/5 ml-auto text-brand-yellow font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] uppercase tracking-widest font-bold leading-relaxed text-left">
            <p className="mb-8">
              COOLO IS A BOUTIQUE BRAND AND CREATIVE STUDIO BASED IN MOUNT MAUNGANUI, NZ.
            </p>
            <p>
              WE WORK WITH FOUNDERS AND TEAMS WHO ARE TIRED OF WINGING IT. WE BUILD PREMIUM DIGITAL EXPERIENCES AND IDENTITIES THAT ACTUALLY DO HEAVY LIFTING FOR YOUR BUSINESS.
            </p>
          </AnimatedSection>

          {/* Collage Row 1: Large Image */}
          <AnimatedSection delay={200}>
            <div className="w-full md:w-5/6 ml-auto aspect-video bg-white/5 overflow-hidden border border-white/10">
              <img 
                src="/assets/team/gallery/ariana01.webp" 
                alt="Studio Culture" 
                className="w-full h-full object-cover transition-all duration-700" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2564&auto=format&fit=crop'; }} 
              />
            </div>
          </AnimatedSection>
          
          {/* Collage Row 2: Text */}
          <AnimatedSection delay={300}>
            <div className="w-full md:w-2/3 ml-auto font-body text-[clamp(1.25rem,2vw,1.5rem)] text-brand-offwhite/80 leading-tight">
              <p>
                Your logo probably isn't the problem. <strong className="font-bold text-brand-offwhite">Most brands don't need more design. They need more clarity.</strong> We help you figure out what you actually do and why anyone should care, before we push a single pixel.
              </p>
            </div>
          </AnimatedSection>

          {/* Collage Row 3: Left Images, Right Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-8 md:gap-12">
              <AnimatedSection delay={200}>
                <div className="w-4/5 aspect-square bg-white/5 overflow-hidden border border-white/10">
                  <img 
                    src="/assets/team/gallery/franco03.webp" 
                    alt="Creative Process" 
                    className="w-full h-full object-cover transition-all duration-700" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2564&auto=format&fit=crop'; }} 
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={300}>
                <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden border border-white/10 lg:ml-12">
                  <img 
                    src="/assets/team/gallery/ariana03.webp" 
                    alt="Studio Work" 
                    className="w-full h-full object-cover transition-all duration-700" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2564&auto=format&fit=crop'; }} 
                  />
                </div>
              </AnimatedSection>
            </div>
            <div className="lg:pt-24 flex flex-col gap-12">
              <AnimatedSection delay={400}>
                <div className="font-body text-[clamp(1.25rem,2vw,1.5rem)] text-brand-offwhite/80 leading-tight">
                  <p>
                    Stop winging it. In a sea of fleeting trends and templated aesthetics, we build systems that endure. Keep it functional, keep it intentional, and cut out the noise.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={500}>
                <div className="font-mono text-[clamp(0.75rem,1vw,0.875rem)] text-brand-offwhite/60 uppercase leading-relaxed font-bold tracking-widest">
                  Design isn't decoration. It should carry weight, make things easier to understand, and make people feel something.
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Collage Row 4: Left Text, Right Images */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <AnimatedSection delay={200}>
                <div className="font-body text-[clamp(1.25rem,2vw,1.5rem)] text-brand-offwhite/80 leading-tight lg:sticky lg:top-32">
                  <p>
                    We build brands that feel like a breath of fresh air. Ultimately understandable, distinctly yours, and strictly template-free.
                  </p>
                </div>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
              <AnimatedSection delay={300}>
                <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden border border-white/10">
                  <img 
                    src="/assets/team/gallery/ariana02.webp" 
                    alt="Team Brainstorming" 
                    className="w-full h-full object-cover transition-all duration-700" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2564&auto=format&fit=crop'; }} 
                  />
                </div>
              </AnimatedSection>
              <div className="flex gap-6 md:gap-8">
                <AnimatedSection delay={400} className="w-1/2">
                  <div className="w-full aspect-square bg-white/5 overflow-hidden border border-white/10">
                    <img 
                      src="/assets/team/gallery/franco01.webp" 
                      alt="Office Detail" 
                      className="w-full h-full object-cover transition-all duration-700" 
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2564&auto=format&fit=crop'; }} 
                    />
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={500} className="w-1/2">
                  <div className="w-full aspect-[3/4] bg-white/5 overflow-hidden border border-white/10">
                    <img 
                      src="/assets/team/gallery/franco04.webp" 
                      alt="Studio Inspiration" 
                      className="w-full h-full object-cover transition-all duration-700" 
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2564&auto=format&fit=crop'; }} 
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CO-FOUNDERS Header */}
      <div className="pt-32 md:pt-48 pb-16">
        <AnimatedSection>
          <h2 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black uppercase tracking-tighter text-brand-yellow leading-[0.85]">
            THE FOUNDERS <span className="text-brand-offwhite">+</span>
          </h2>
        </AnimatedSection>
      </div>
    </div>
  </div>
);

const CoFoundersCards = () => {
  const orderedFounders = Object.values(TEAM_MEMBERS).sort((a, b) => {
    if (a.name.toLowerCase() === 'ariana') return -1;
    if (b.name.toLowerCase() === 'ariana') return 1;
    return 0;
  });

  return (
    <div className="bg-brand-offwhite py-24 md:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 md:gap-y-0">
          
          {orderedFounders.map((member, index) => {
            const isAriana = member.name.toLowerCase() === 'ariana';
            const displayTitle = isAriana ? 'STUDIO MANAGER' : member.title;
            const isFirst = index === 0;

            return (
              <div key={member.name} className={`md:col-span-6 flex flex-col relative ${isFirst ? 'md:pr-8' : 'md:pl-8 md:mt-64'}`}>
                <AnimatedSection delay={index * 150}>
                  <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
                    <div className="font-mono text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-widest uppercase text-brand-navy/60 md:rotate-180 md:[writing-mode:vertical-rl] md:text-right whitespace-nowrap">
                      {displayTitle}
                    </div>
                    <div className="w-full flex-1">
                      <Link to={`/team/${member.name.toLowerCase()}`} className="hover:text-brand-purple transition-colors block mb-4 md:mb-6">
                        <h3 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-none tracking-tighter text-brand-navy">
                          {member.name}
                        </h3>
                      </Link>
                      <Link to={`/team/${member.name.toLowerCase()}`} className="block w-full aspect-[4/5] bg-brand-navy/5 relative overflow-hidden border border-brand-navy/10 group">
                        <motion.img
                          initial={{ scale: 1.1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                          src={member.imageUrl}
                          alt={`${member.name} - ${displayTitle}`}
                          className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:opacity-100"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2564&auto=format&fit=crop'; }}
                        />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

const Principles = () => (
  <section className="py-24 md:py-32 bg-brand-offwhite border-t border-brand-navy/10">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { t: "Get Clear", d: "If people don't get it, they move on. We fix that." },
            { t: "Make It Matter", d: "Design isn't decoration. It should do some heavy lifting." },
            { t: "Make It Make Sense", d: "Strategy connects what you do, what you say, and what people actually see." },
            { t: "Play The Long Game", d: "We're not building a brand for this week's algorithm. We build things that still make sense three years from now." }
        ].map((val, i) => (
            <AnimatedSection key={val.t} delay={i * 100} className="h-full">
                <div className="border border-brand-navy/20 p-8 md:p-10 h-full bg-white hover:bg-brand-navy hover:text-brand-offwhite transition-colors duration-500 group flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-purple group-hover:text-brand-yellow font-bold mb-8 block transition-colors">Principle 0{i + 1}</span>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-6">{val.t}</h3>
                    <p className="font-body text-lg md:text-xl opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed mt-auto">{val.d}</p>
                </div>
            </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

const DropTheLink = () => (
  <div className="bg-brand-yellow py-24 md:py-40 text-brand-navy border-t border-brand-navy/20">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 items-end">
          <div className="md:col-span-6">
            <h2 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase tracking-tighter leading-[0.85] m-0">
              DROP<br/>THE<br/>LINK.
            </h2>
          </div>
          <div className="md:col-start-7 md:col-span-6 font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] uppercase tracking-widest font-bold leading-relaxed text-left md:text-right flex flex-col justify-end">
            <p className="mb-8 max-w-md md:ml-auto">
              WE LIKE GOOD WORK AND THE PEOPLE WHO MAKE IT. WE'RE NOT ALWAYS HIRING, BUT WE'RE ALWAYS LOOKING. IF YOU'VE MADE SOMETHING WEIRD, SMART, BEAUTIFUL, OR JUST PLAIN GOOD, SEND IT OUR WAY.
            </p>
            <div className="flex justify-start md:justify-end">
              <Link to="/join" className="border-b-2 border-brand-navy hover:text-brand-purple hover:border-brand-purple transition-colors pb-1">
                GOT SOMETHING GOOD? DROP IT HERE.
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

const BullshitFilter = () => (
  <div className="bg-brand-navy py-24 md:py-40 text-brand-offwhite">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <AnimatedSection>
        <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.85] text-center mb-16 md:mb-24">
          THE BULLSH*T FILTER
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 mb-16 md:mb-24">
          <div className="md:col-start-3 md:col-span-8 aspect-video md:aspect-[21/9] bg-brand-navy/50 relative overflow-hidden border border-brand-offwhite/10">
            <img 
              src="/assets/images/bs-img.png" 
              alt="The Filter" 
              className="w-full h-full object-cover transition-all duration-1000" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop'; }}
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
          <div className="md:col-start-4 md:col-span-6 font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] tracking-widest text-center text-brand-offwhite/80 font-bold uppercase leading-relaxed">
            <p>
              We're deliberately small. Fewer clients, more attention. No disappearing after the kickoff. No passing your project down the food chain. You get us.
            </p>
            <p className="mt-8 text-brand-yellow">
              We care whether the thing actually works, not just how it looks in a case study.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

const CTAs = () => (
  <div className="grid grid-cols-1">
    {/* CTA 1: Yellow */}
    <div className="bg-brand-yellow py-24 md:py-32 text-brand-navy">
      <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 items-center gap-y-12">
            <div className="md:col-span-9">
              <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.85] m-0">
                THINK WE SHOULD TALK?
              </h2>
              <p className="font-mono text-[clamp(0.875rem,1vw,1rem)] font-bold tracking-widest uppercase mt-6 max-w-lg">
                Tell us what you're building. If it sounds like a fit, we'll be in touch.
              </p>
            </div>
            <div className="md:col-span-3 flex justify-start md:justify-end">
              <Link to="/contact" className="px-10 py-6 bg-white text-brand-navy font-bold font-mono uppercase tracking-widest text-[clamp(0.75rem,1vw,0.875rem)] hover:bg-brand-navy hover:text-brand-offwhite transition-colors whitespace-nowrap border border-brand-navy/10 text-center">
                START HERE
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>

    {/* CTA 2: Purple */}
    <div className="bg-brand-purple py-24 md:py-32 text-brand-offwhite">
      <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 items-center gap-y-12">
            <div className="md:col-span-9">
              <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.85] m-0 text-brand-offwhite/80 hover:text-brand-offwhite transition-colors">
                PREFER TO SEE THE WORK FIRST?
              </h2>
            </div>
            <div className="md:col-span-3 flex justify-start md:justify-end">
              <Link to="/work" className="font-mono uppercase tracking-widest text-[clamp(0.875rem,1.2vw,1.125rem)] font-bold border-b-2 border-brand-offwhite/30 pb-1 hover:border-brand-offwhite transition-colors whitespace-nowrap flex items-center gap-4">
                SEE THE WORK <span className="text-2xl leading-none font-sans font-light">+</span>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </div>
);

const AboutPage: React.FC = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "COOLO Studio",
      "url": "https://coolo.co.nz",
      "logo": "https://coolo.co.nz/assets/logos/logo-dark.svg",
      "description": "Learn about COOLO Studio. We help founders make their brands make sense with clear strategy and uncompromising design."
    }
  };

  return (
    <PageTransition>
      <div className="bg-brand-offwhite w-full overflow-hidden selection:bg-brand-yellow selection:text-brand-navy">
        <Helmet>
          <title>About Us | COOLO Studio</title>
          <meta name="description" content="Learn about COOLO Studio. We help founders make their brands make sense with clear strategy and uncompromising design." />
          <link rel="canonical" href="https://coolo.co.nz/about" />
          <script type="application/ld+json">
            {JSON.stringify(aboutSchema)}
          </script>
        </Helmet>

        <HeroSection />
        <JustPeopleAndHeader />
        <CoFoundersCards />
        <Principles />
        <DropTheLink />
        <BullshitFilter />
        <CTAs />
      </div>
    </PageTransition>
  );
};

export default AboutPage;