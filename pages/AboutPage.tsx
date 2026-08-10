pages/AboutPage.tsx
FULL FILE
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const HeroSection = () => (
  <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px] pt-32 pb-16 md:pb-24">
    <AnimatedSection>
      <header className="pt-12 pb-16">
        <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase tracking-tighter leading-[0.85] text-brand-navy mt-0 mb-8 md:mb-12">
          WE'RE THE HUMANS<span className="text-brand-yellow">.</span>
        </h1>
        <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden bg-brand-navy/10 relative">
          <img 
            src="/assets/images/wearethehumans.jpg" 
            alt="COOLO Studio Team" 
            className="w-full h-full object-cover object-center" 
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
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 mb-16 md:mb-24">
          <div className="md:col-span-6">
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.85]">
              JUST<br />PEOPLE
            </h2>
          </div>
          <div className="md:col-start-7 md:col-span-6 text-brand-yellow font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] uppercase tracking-widest font-bold leading-relaxed">
            <p className="mb-8">
              COOLO IS A BOUTIQUE CREATIVE AND BRAND STUDIO OPERATING OUT OF MOUNT MAUNGANUI, NZ.
            </p>
            <p>
              WE PARTNER WITH FOUNDERS, MARKETING TEAMS, AND VISIONARY ENTREPRENEURS TO HELP THEIR BUSINESSES TRANSITION FROM IMPROVISED GROWTH INTO AN INTENTIONAL, UNDENIABLE MARKET PRESENCE.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 items-start">
        <div className="md:col-span-4 md:col-start-2 flex flex-col gap-6">
          <AnimatedSection delay={200}>
            <div className="aspect-[3/4] w-full bg-white/5 border border-white/10 overflow-hidden">
              <img 
                src="/assets/team/gallery/ariana01.webp" 
                alt="Studio Culture" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2564&auto=format&fit=crop'; }} 
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <div className="font-mono text-[clamp(0.75rem,1vw,0.875rem)] text-brand-offwhite/60 uppercase leading-relaxed font-bold tracking-widest">
              Good design is clear. Great design is weird. We lean into the weird to build things that people actually remember.
            </div>
          </AnimatedSection>
        </div>

        <div className="md:col-span-6 md:col-start-7 flex flex-col md:mt-32">
          <AnimatedSection delay={400}>
            <div className="aspect-[16/10] w-full bg-white/5 border border-white/10 overflow-hidden">
              <img 
                src="/assets/team/gallery/franco03.webp" 
                alt="Creative Process" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2564&auto=format&fit=crop'; }} 
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={500} className="self-end w-3/4 md:w-2/3 -mt-12 md:-mt-24 z-10 relative">
            <div className="aspect-square w-full bg-white/5 border-4 border-brand-navy overflow-hidden">
              <img 
                src="/assets/team/gallery/ariana03.webp" 
                alt="Design Process" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2564&auto=format&fit=crop'; }} 
              />
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="pt-32 md:pt-48">
        <AnimatedSection>
          <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase tracking-tighter text-brand-yellow leading-[0.85]">
            CO-FOUNDERS <span className="text-brand-offwhite">+</span>
          </h2>
        </AnimatedSection>
      </div>
    </div>
  </div>
);

const CoFoundersCards = () => (
  <div className="bg-brand-offwhite py-24 md:py-32">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 md:gap-y-0">
        
        {/* Ariana */}
        <div className="md:col-span-6 flex flex-col relative md:pr-8">
          <AnimatedSection delay={150}>
            <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
              <div className="font-mono text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-widest uppercase text-brand-navy/60 md:rotate-180 md:[writing-mode:vertical-rl] md:text-right whitespace-nowrap">
                STUDIO MANAGER
              </div>
              <div className="w-full flex-1">
                <Link to="/team/ariana" className="hover:text-brand-purple transition-colors block mb-4 md:mb-6">
                  <h3 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-none tracking-tighter text-brand-navy">
                    ARIANA
                  </h3>
                </Link>
                <Link to="/team/ariana" className="block w-full aspect-[4/5] bg-brand-navy/5 relative overflow-hidden border border-brand-navy/10 group">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    src="/assets/team/ariana.webp"
                    alt="Ariana - Studio Manager"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2564&auto=format&fit=crop'; }}
                  />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Franco */}
        <div className="md:col-span-6 flex flex-col relative md:pl-8 md:mt-64">
          <AnimatedSection delay={300}>
            <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
              <div className="font-mono text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-widest uppercase text-brand-navy/60 md:rotate-180 md:[writing-mode:vertical-rl] md:text-right whitespace-nowrap">
                CREATIVE DIRECTOR
              </div>
              <div className="w-full flex-1">
                <Link to="/team/franco" className="hover:text-brand-purple transition-colors block mb-4 md:mb-6">
                  <h3 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-none tracking-tighter text-brand-navy">
                    FRANCO
                  </h3>
                </Link>
                <Link to="/team/franco" className="block w-full aspect-[4/5] bg-brand-navy/5 relative overflow-hidden border border-brand-navy/10 group">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    src="/assets/team/franco.webp"
                    alt="Franco - Creative Director"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2564&auto=format&fit=crop'; }}
                  />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </div>
  </div>
);

const DropTheLink = () => (
  <div className="w-full bg-brand-yellow text-brand-navy py-24 md:py-40 border-t border-brand-navy/20">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
          <div className="md:col-span-6">
            <h2 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase tracking-tighter leading-[0.85] m-0">
              DROP<br />THE<br />LINK.
            </h2>
          </div>
          <div className="md:col-start-7 md:col-span-6 font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] uppercase tracking-widest font-bold leading-relaxed text-left md:text-right flex flex-col justify-end">
            <p className="max-w-md ml-auto mb-8">
              We look at a lot of portfolios, brands, and websites. If you're building something interesting, send it over. We're always looking for the next cultural shift.
            </p>
            <div className="flex flex-col gap-4 items-start md:items-end">
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
);

const BullshitFilter = () => (
  <div className="w-full bg-brand-navy text-brand-offwhite py-24 md:py-40">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <AnimatedSection>
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-center mb-16 md:mb-24">
          THE BULLSH*T FILTER
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 mb-16 md:mb-24">
          <div className="col-span-1 md:col-start-3 md:col-span-8 aspect-[16/10] bg-brand-navy/50 relative overflow-hidden border border-brand-offwhite/10">
            <img 
              src="/assets/images/bs-img.png" 
              alt="Rubber duck in a glass bowl" 
              className="w-full h-full object-cover" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop'; }}
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
          <div className="col-span-1 md:col-start-4 md:col-span-6 font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] tracking-widest text-center text-brand-offwhite/80 font-bold uppercase leading-relaxed">
            <p>
              We don't do generic. We don't do templated. We run everything through a rigorous internal filter to ensure every experience we ship is undeniably premium, highly crafted, and strictly COOLO.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

const BusinessCTA = () => (
  <div className="w-full bg-brand-yellow text-brand-navy py-24 md:py-32">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <AnimatedSection>
        <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.85] tracking-tighter mb-16 md:mb-24 md:w-5/6">
          THINK WE SHOULD LOOK AT YOUR BUSINESS?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 items-end gap-y-12">
          <div className="md:col-span-6 font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] font-bold uppercase tracking-widest max-w-sm">
            <p>Fill out our project inquiry form and tell us what you're building. We'll be in touch.</p>
          </div>
          <div className="md:col-start-10 md:col-span-3 flex justify-start md:justify-end">
            <Link 
              to="/contact" 
              className="bg-white text-brand-navy px-10 py-6 font-mono font-bold uppercase text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest hover:bg-brand-navy hover:text-brand-offwhite transition-colors inline-block text-center whitespace-nowrap border border-brand-navy/10"
            >
              START HERE
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

const WorkFooterCTA = () => (
  <div className="w-full bg-brand-purple text-brand-offwhite py-24 md:py-32">
    <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[32px] lg:px-[72px]">
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 items-end">
          <div className="md:col-span-9">
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-brand-offwhite/80 hover:text-brand-offwhite transition-colors">
              PREFER TO SEE SOME<br />WORK FIRST, ISN'T IT?
            </h2>
          </div>
          <div className="md:col-start-10 md:col-span-3 flex justify-start md:justify-end pb-2 md:pb-4">
            <Link 
              to="/work" 
              className="font-mono text-[clamp(0.875rem,1.2vw,1.125rem)] tracking-widest font-bold uppercase border-b-2 border-brand-offwhite/30 pb-1 hover:border-brand-offwhite transition-colors flex items-center gap-4 whitespace-nowrap"
            >
              SEE THE WORK <span className="text-2xl leading-none font-sans font-light">+</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>
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
      "description": "A boutique creative and brand studio based in Mount Maunganui, New Zealand, specializing in brand strategy and digital design."
    }
  };

  return (
    <PageTransition>
      <div className="bg-brand-offwhite w-full overflow-hidden selection:bg-brand-yellow selection:text-brand-navy">
        <Helmet>
          <title>About Us | COOLO Studio</title>
          <meta name="description" content="Learn about COOLO Studio, our design philosophy, and how we help businesses transition from improvised to intentional brand strategies." />
          <link rel="canonical" href="https://coolo.co.nz/about" />
          <script type="application/ld+json">
            {JSON.stringify(aboutSchema)}
          </script>
        </Helmet>

        <HeroSection />
        <JustPeopleAndHeader />
        <CoFoundersCards />
        <DropTheLink />
        <BullshitFilter />
        <BusinessCTA />
        <WorkFooterCTA />
      </div>
    </PageTransition>
  );
};

export default AboutPage;