import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import { PROJECTS, JOURNAL_POSTS } from '../constants';

const HeroSection: React.FC = () => {
  const featuredImage = PROJECTS[0]?.imageUrl || '/assets/images/site-preview-1.png';

  return (
    <section className="relative w-full min-h-screen flex flex-col pt-32 px-6 md:pt-40 md:px-8 pb-16 bg-brand-offwhite text-brand-navy border-b-2 border-brand-navy overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 studio-grid pointer-events-none opacity-[0.03] z-0"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 flex-grow">
        
        {/* LEFT COLUMN: Metadata & Massive Typography */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full pb-8 md:pb-12">
          <AnimatedSection delay={100}>
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest leading-relaxed max-w-[250px] font-bold opacity-80">
              <p>COOLO®</p>
              <p>Brand Design Studio</p>
              <p className="text-brand-purple">Mount Maunganui / NZ</p>
            </div>
          </AnimatedSection>

          <div className="mt-24 lg:mt-auto">
            <AnimatedSection delay={200}>
              <h1 className="font-sans text-[15vw] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 lg:mb-12">
                We Create<br />
                Brands With<br />
                A Point Of<br />
                <span className="text-brand-purple italic">View.</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="flex justify-between items-end border-t-2 border-brand-navy/20 pt-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple">Index</span>
                <span className="font-mono text-xs uppercase tracking-widest font-bold">1 / 2</span>
              </div>
              <p className="font-body text-lg md:text-xl leading-relaxed text-brand-navy/80 max-w-md font-light">
                A creative studio helping founders transform ideas into brands people recognise, trust and remember. Creativity without the noise.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-12">
              <Link to="/work" className="inline-block font-mono text-sm uppercase font-bold tracking-widest border-b-2 border-brand-navy pb-1 hover:text-brand-purple hover:border-brand-purple transition-colors">
                [ Explore Archive ]
              </Link>
            </AnimatedSection>
          </div>
        </div>

        {/* CENTER COLUMN: Visual Anchor */}
        <div className="lg:col-span-5 flex justify-center items-center mt-16 lg:mt-0 relative">
          <AnimatedSection delay={300} className="w-full max-w-[500px]">
            <div className="w-full aspect-[4/5] relative bg-brand-navy/5 overflow-hidden group border border-brand-navy/10 shadow-2xl">
              <img 
                src={featuredImage} 
                alt="COOLO Studio Editorial" 
                className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
              />
              <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
              
              <div className="absolute bottom-4 right-4 bg-brand-offwhite px-2 py-1 font-mono text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                REF_01
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* RIGHT COLUMN: Extra Nav / Metadata */}
        <div className="lg:col-span-2 hidden lg:flex flex-col justify-end items-end pb-12 text-right">
          <AnimatedSection delay={500}>
            <h3 className="font-sans text-3xl font-black uppercase mb-4 tracking-tight">About Coolo</h3>
            <p className="font-mono text-[10px] leading-relaxed uppercase tracking-widest opacity-60">
              Coolo presents brand design as a curated digital archive. This is a space for discovery, reference, and visual direction.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

const BrutalistIndex: React.FC = () => {
  return (
    <section className="bg-brand-navy text-brand-offwhite w-full min-h-screen py-32 px-6 md:px-8 relative overflow-hidden">
      
      {/* Floating Editorial Intro */}
      <div className="max-w-md md:ml-auto md:mr-24 mb-32 border-l-2 border-brand-purple pl-6">
        <AnimatedSection>
          <p className="font-mono text-xs uppercase tracking-widest leading-relaxed text-brand-offwhite/60 font-bold">
            Our projects are selected through a curated process. Prioritizing alignment with our design philosophy, cultural positioning, and visual standards.
          </p>
        </AnimatedSection>
      </div>

      {/* Oversized Typographic Number System */}
      <div className="relative w-full max-w-[1600px] mx-auto min-h-[1200px] md:min-h-[1000px]">
        
        {/* Grid Item 1 */}
        <div className="absolute top-0 left-0 md:left-[5%] w-[90%] md:w-[35%] group z-10">
          <AnimatedSection>
            <span className="font-mono text-[10px] uppercase tracking-widest mb-4 block text-brand-yellow font-bold">Strategy / NZ</span>
            <div className="font-sans text-[50vw] md:text-[30vw] leading-[0.75] font-black uppercase tracking-tighter text-brand-offwhite/10 group-hover:text-brand-offwhite transition-colors duration-500 select-none">
              1
            </div>
            <div className="bg-brand-offwhite text-brand-navy p-8 md:p-12 mt-[-15%] relative z-20 w-[90%] ml-auto border-2 border-brand-navy shadow-[12px_12px_0px_#3A0888] transform transition-transform duration-500 group-hover:-translate-y-2">
              <h4 className="font-sans text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">Brand Positioning</h4>
              <p className="font-body text-base md:text-lg leading-relaxed font-light opacity-80">
                Foundational strategy that situates a brand within a dynamic context of culture, art, and commerce. We build logic before we draw shapes.
              </p>
              <Link to="/clarity" className="inline-block mt-8 font-mono text-[10px] uppercase font-bold tracking-widest border-b-2 border-brand-navy pb-1 hover:text-brand-purple hover:border-brand-purple transition-colors">
                View Strategy Ops &rarr;
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Grid Item 2 */}
        <div className="absolute top-[32%] md:top-[25%] right-0 md:right-[10%] w-[90%] md:w-[40%] group z-20">
          <AnimatedSection delay={150}>
            <span className="font-mono text-[10px] uppercase tracking-widest mb-4 block text-right text-brand-purple font-bold">Identity / Global</span>
            <div className="font-sans text-[50vw] md:text-[30vw] leading-[0.75] font-black uppercase tracking-tighter text-brand-offwhite/10 group-hover:text-brand-offwhite transition-colors duration-500 select-none text-right">
              2
            </div>
            <div className="bg-brand-navy p-8 md:p-12 mt-[-15%] relative z-20 w-[90%] border-2 border-brand-offwhite shadow-[12px_12px_0px_#FCC803] transform transition-transform duration-500 group-hover:-translate-y-2">
              <h4 className="font-sans text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">Visual Identity</h4>
              <p className="font-body text-base md:text-lg leading-relaxed font-light text-brand-offwhite/70">
                Systems designed with architectural lines, raw typography, and controlled volumes. No seasonal rules. Just form, material, and commanding presence.
              </p>
              <Link to="/design-power" className="inline-block mt-8 font-mono text-[10px] uppercase font-bold tracking-widest border-b-2 border-brand-offwhite pb-1 hover:text-brand-yellow hover:border-brand-yellow transition-colors">
                View Design Power &rarr;
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Grid Item 3 */}
        <div className="absolute top-[68%] md:top-[60%] left-0 md:left-[35%] w-[90%] md:w-[35%] group z-30">
          <AnimatedSection delay={300}>
             <span className="font-mono text-[10px] uppercase tracking-widest mb-4 block text-brand-yellow font-bold">Digital / Web</span>
             <div className="font-sans text-[50vw] md:text-[30vw] leading-[0.75] font-black uppercase tracking-tighter text-brand-offwhite/10 group-hover:text-brand-offwhite transition-colors duration-500 select-none">
              3
            </div>
             <p className="font-body text-xl md:text-2xl leading-relaxed mt-8 text-brand-offwhite/80 font-light max-w-md relative z-20">
                Digital experiences functioning as a cultural hub. We build web spaces that prioritize editorial storytelling and technical precision over generic templates.
             </p>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
};

const EditorialGallery: React.FC = () => {
  return (
    <section className="bg-brand-offwhite py-32 px-6 md:px-8 border-b-2 border-brand-navy relative z-40">
      <div className="container mx-auto max-w-[1600px]">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-[12vw] md:text-[8rem] font-sans font-black uppercase tracking-tighter text-brand-navy leading-[0.85]">
              Visual<br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #0F0328' }}>Archive.</span>
            </h2>
            <Link to="/work" className="font-mono text-sm uppercase tracking-widest font-bold border-2 border-brand-navy px-10 py-4 hover:bg-brand-navy hover:text-brand-offwhite transition-all text-brand-navy shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803]">
              View All Projects
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {PROJECTS.slice(0, 3).map((project, index) => (
            <div 
              key={project.id} 
              className={`md:col-span-6 lg:col-span-4 ${index === 1 ? 'md:mt-32' : index === 2 ? 'md:col-span-12 lg:col-span-4 lg:mt-16' : ''}`}
            >
              <AnimatedSection delay={index * 150} className="h-full flex flex-col">
                <Link to={`/work/${project.slug}`} className="group block relative aspect-[4/5] bg-brand-navy/5 overflow-hidden border-2 border-brand-navy">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.19,1,0.22,1]"
                  />
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </Link>
                <div className="mt-6 flex justify-between items-start pt-4 border-t border-brand-navy/20">
                  <div>
                    <h3 className="font-sans text-3xl md:text-4xl font-black uppercase tracking-tight text-brand-navy leading-none mb-2">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold block">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-40 text-brand-navy">
                    {project.year}
                  </span>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JournalTicker: React.FC = () => {
  return (
    <section className="bg-brand-navy text-brand-offwhite py-32 relative z-40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b-2 border-brand-offwhite/20 pb-8">
            <h2 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter leading-[0.85]">
              Studio<br/>Thoughts
            </h2>
            <Link to="/journal" className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-yellow hover:text-brand-offwhite transition-colors border-b-2 border-brand-yellow pb-1 hover:border-brand-offwhite">
              Read the Journal &rarr;
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-2 border-l-2 border-brand-offwhite/10">
          {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 100}>
              <Link to={`/journal/${post.slug}`} className="group block border-r-2 border-b-2 border-brand-offwhite/10 p-8 md:p-12 hover:bg-brand-offwhite hover:text-brand-navy transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple group-hover:text-brand-navy/50 font-bold block mb-6 transition-colors">
                    {post.date}
                  </span>
                  <h3 className="font-sans text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.9] mb-6 group-hover:text-brand-purple transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-body text-lg font-light opacity-70 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const EditorialFooterFeature: React.FC = () => {
  return (
    <section className="w-full h-[80vh] md:h-[90vh] bg-brand-navy relative flex items-end p-6 md:p-12 overflow-hidden border-b-8 border-brand-yellow">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src={PROJECTS[1]?.imageUrl || PROJECTS[0]?.imageUrl} 
          alt="COOLO Studio Atmosphere" 
          className="w-full h-full object-cover object-center grayscale mix-blend-luminosity transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end border-b-2 border-brand-offwhite/20 pb-8">
        <div className="max-w-[300px] mb-12 md:mb-2">
          <p className="font-mono text-xs uppercase tracking-widest font-bold leading-relaxed text-brand-offwhite/60">
            For project inquiries, creative previews, or collaborative synergies, please reach out to our studio directly.
          </p>
        </div>

        <h2 className="font-sans text-[20vw] md:text-[14vw] leading-[0.75] font-black tracking-tighter uppercase text-brand-offwhite mix-blend-overlay">
          PRESS
        </h2>

        <div className="max-w-[250px] text-right hidden md:block mb-2">
          <p className="font-mono text-xs uppercase tracking-widest font-bold leading-relaxed text-brand-offwhite/60">
            Connect with our studio to schedule a private viewing or explore the new archive.
          </p>
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "COOLO Studio",
    "url": "https://coolo.co.nz",
    "logo": "https://coolo.co.nz/assets/logos/logo-dark.svg",
    "description": "A creative studio helping founders transform ideas into brands people recognise, trust and remember.",
    "sameAs": [
      "https://instagram.com/coolo.co",
      "https://linkedin.com/company/coolo"
    ]
  };

  return (
    <div className="w-full overflow-x-hidden bg-brand-offwhite text-brand-navy selection:bg-brand-yellow selection:text-brand-navy">
      <Helmet>
        <title>COOLO® | Brand Design Studio</title>
        <meta name="description" content="A creative studio helping founders transform ideas into brands people recognise, trust and remember. Based in Mount Maunganui, NZ." />
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>
      
      <HeroSection />
      <BrutalistIndex />
      <EditorialGallery />
      <JournalTicker />
      <EditorialFooterFeature />
    </div>
  );
};

export default HomePage;