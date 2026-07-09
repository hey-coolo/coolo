import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS, JOURNAL_POSTS, SERVICE_LEGS, QA_DATA } from '../constants';
import ProjectCard from '../components/ProjectCard';

const BrandHero: React.FC = () => {
    // We use the first project image to inject into the brutalist typography
    const heroImage = PROJECTS[0]?.imageUrl || '';

    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 bg-brand-offwhite text-brand-navy overflow-hidden border-b-2 border-brand-navy">
            <div className="absolute inset-0 studio-grid pointer-events-none opacity-[0.04] z-0"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 flex-grow flex flex-col justify-center">
                
                {/* Brutalist Massive Typography */}
                <div className="w-full">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="font-black uppercase tracking-tighter text-brand-navy w-full"
                    >
                        <div className="flex flex-wrap items-center leading-[0.8]">
                            <span className="text-[16vw] md:text-[14vw]">SHAPING</span>
                            {heroImage && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                                    className="hidden md:block mx-[2vw] w-[18vw] h-[10vw] overflow-hidden shrink-0"
                                >
                                    <img src={heroImage} alt="Featured work" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                </motion.div>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center leading-[0.8] mt-2 md:mt-0">
                            <span className="text-[16vw] md:text-[14vw]">BRANDS</span>
                        </div>
                        <div className="flex flex-wrap items-center leading-[0.8] mt-2 md:mt-0 md:pl-[8vw]">
                            <span className="font-serif italic font-light text-brand-purple text-[17vw] md:text-[15vw] pr-[2vw]">WITH</span>
                            <span className="text-[16vw] md:text-[14vw]">CHARACTER.</span>
                        </div>
                    </motion.h1>
                </div>

                {/* Structured Editorial Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pt-8 border-t-2 border-brand-navy"
                >
                    <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-brand-purple">
                        [ Mission 1/1 ]
                    </div>
                    
                    <div className="md:col-span-2 font-body text-xl md:text-2xl font-light leading-relaxed">
                        We partner with founders to shape brands from the inside out—clarifying what they stand for, designing how they're seen, and crafting the creative that helps people recognize, remember, and trust them.
                    </div>
                    
                    <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold md:text-right flex flex-col md:items-end gap-2">
                        <span className="text-brand-purple">Status //</span>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse shadow-[0_0_8px_rgba(252,200,3,0.6)]"></span>
                            <span>Booking Q2/Q3 Projects</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

const NarrativeScroll: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -50]);
    const scale1 = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

    const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [50, 0, -50]);
    const scale2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0.95, 1, 0.95]);

    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [50, 0, -50]);
    const scale3 = useTransform(scrollYProgress, [0.45, 0.6, 0.70], [0.95, 1, 0.95]);

    const opacity4 = useTransform(scrollYProgress, [0.68, 0.85, 1], [0, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.68, 0.85], [50, 0]);
    const scale4 = useTransform(scrollYProgress, [0.68, 0.85], [0.95, 1]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-brand-offwhite">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-8">
                
                <div className="absolute top-12 md:top-24 left-6 md:left-12 font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold z-20">
                    01 / The Narrative
                </div>

                <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-full">
                    
                    <motion.div 
                        style={{ opacity: opacity1, y: y1, scale: scale1 }} 
                        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
                    >
                        <h2 className="text-[12vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] text-brand-navy flex flex-col items-center">
                            <span>EVERY FOUNDER</span>
                            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #0F0328' }}>HAS A VISION.</span>
                        </h2>
                    </motion.div>

                    <motion.div 
                        style={{ opacity: opacity2, y: y2, scale: scale2 }} 
                        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
                    >
                        <h2 className="text-[12vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] text-brand-navy flex flex-col items-center">
                            <span>NOT EVERY VISION</span>
                            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #0F0328' }}>BECOMES A BRAND.</span>
                        </h2>
                    </motion.div>

                    <motion.div 
                        style={{ opacity: opacity3, y: y3, scale: scale3 }} 
                        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
                    >
                        <h2 className="text-[12vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] text-brand-navy flex flex-col items-center">
                            <span>THAT'S WHERE WE</span>
                            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #0F0328' }}>COME IN.</span>
                        </h2>
                    </motion.div>

                    <motion.div 
                        style={{ opacity: opacity4, y: y4, scale: scale4 }} 
                        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto mt-16 md:mt-0"
                    >
                        <h2 className="text-[10vw] md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85] text-brand-navy flex flex-col items-center">
                            <span>STRATEGY. DESIGN.</span>
                            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #0F0328' }}>DIRECTION. CONTENT.</span>
                        </h2>
                        
                        <p className="mt-8 font-body text-xl md:text-2xl font-light text-brand-navy/80 max-w-4xl leading-relaxed">
                            We work alongside founders to shape brands from the inside out—clarifying what they stand for, designing how they're seen, and crafting the creative that helps people understand, remember and choose them.
                        </p>
                        
                        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link to="/contact" className="inline-block border-2 border-brand-navy bg-brand-navy text-brand-offwhite px-12 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple hover:border-brand-purple transition-all duration-300 shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none">
                                Inquire Now
                            </Link>
                            <Link to="/about" className="inline-block border-2 border-brand-navy px-12 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300 text-brand-navy shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none">
                                More About Us
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

const ServiceRouter: React.FC = () => {
    return (
        <section className="bg-brand-offwhite border-t-2 border-b-2 border-brand-navy relative z-40 overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-3">
                {SERVICE_LEGS.map((leg, index) => {
                    const titleParts = leg.title.match(/^(We help you)\s+(.*)$/i);
                    const prefix = titleParts ? titleParts[1] : 'We help you';
                    const mainTitle = titleParts ? titleParts[2] : leg.title;

                    return (
                        <div 
                            key={leg.id}
                            className="group relative flex flex-col justify-between min-h-[60vh] md:min-h-[70vh] border-b lg:border-b-0 lg:border-r border-brand-navy/10 p-8 md:p-12 overflow-hidden hover:bg-brand-lavender transition-colors duration-500"
                        >
                            <Link to={leg.path} className="absolute inset-0 z-0" aria-label={`View ${leg.title}`} />

                            <div className="relative z-10 pointer-events-none">
                                <div className="flex justify-between items-start mb-12">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors">
                                        0{index + 1}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-50 group-hover:opacity-100 transition-opacity text-brand-navy group-hover:text-brand-offwhite">
                                        {leg.visual}
                                    </span>
                                </div>
                                
                                <div className="mb-8 relative">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-brand-purple group-hover:text-brand-yellow transition-colors block mb-2">
                                        {prefix}
                                    </span>
                                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-brand-navy group-hover:text-brand-offwhite transition-colors break-words">
                                        {mainTitle}
                                        <span className="text-brand-purple group-hover:text-brand-yellow transition-colors">.</span>
                                    </h2>
                                </div>
                                
                                <p className="font-body text-xl md:text-2xl text-brand-navy/60 group-hover:text-brand-offwhite/90 transition-colors max-w-sm leading-relaxed">
                                    {leg.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 pt-12 border-t border-brand-navy/10 group-hover:border-brand-offwhite/20 mt-auto flex flex-col items-start gap-8">
                                <p className="font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 text-brand-navy group-hover:text-brand-offwhite pointer-events-none">
                                    {leg.hoverText}
                                </p>
                                
                                <Link to="/contact" className="pointer-events-auto bg-brand-navy text-brand-offwhite px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-brand-purple transition-all duration-300 shadow-[4px_4px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                                    Inquire Now
                                </Link>

                                <Link to={leg.path} className="pointer-events-auto inline-block font-mono text-sm uppercase font-bold tracking-widest border-b-2 border-brand-purple group-hover:border-brand-yellow pb-1 group-hover:text-brand-yellow transition-colors text-brand-purple mt-2">
                                    More Info
                                </Link>
                            </div>
                        </div>
                    );
                })}
             </div>
        </section>
    )
}

const FeatureSpotlight: React.FC = () => {
    const featuredProject = PROJECTS[0]; 

    return (
        <section className="relative bg-brand-navy overflow-hidden group">
            <Link to={`/work/${featuredProject.slug}`} className="block relative min-h-screen md:min-h-[120vh]">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-90" />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16">
                    <div className="container mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
                                Featured Case Study
                            </span>
                            <h2 className="text-[15vw] leading-[0.85] font-black uppercase tracking-tighter text-brand-offwhite mb-8 group-hover:text-brand-yellow transition-colors duration-500">
                                {featuredProject.title}
                            </h2>
                            
                            <div className="flex flex-col md:flex-row gap-12 border-t border-brand-offwhite/20 pt-8 text-brand-offwhite/80">
                                <div className="max-w-xl">
                                    <p className="font-body text-xl font-light opacity-80 line-clamp-3 md:line-clamp-4 leading-relaxed">
                                        {featuredProject.description}
                                    </p>
                                </div>
                                <div className="mt-auto ml-auto">
                                    <span className="font-mono text-sm uppercase tracking-widest border-b-2 border-brand-yellow pb-2 text-brand-yellow font-bold">
                                        Open Case File &rarr;
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </section>
    );
};

const CapabilityList: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const capabilities = [
        { 
            id: '01', 
            title: 'Strategy', 
            desc: 'Positioning, Messaging, Brand Playbook, & Roadmaps', 
            link: '/clarity'
        },
        { 
            id: '02', 
            title: 'Identity', 
            desc: 'Visual Systems, Logos, Brand Guidelines, Colour, & Typography,', 
            link: '/design-power'
        },
        { 
            id: '03', 
            title: 'Digital', 
            desc: 'Web Design, Webflow Dev, Content Strategy, & Campaign Creative', 
            link: '/design-power'
        },
        { 
            id: '04', 
            title: 'Visuals', 
            desc: 'Motion Design, 3D Product Vis, GFX & Kinetic Type', 
            link: '/design-power'
        }
    ];

    return (
        <section className="bg-brand-navy text-brand-offwhite py-32 relative z-40 overflow-hidden border-b-2 border-brand-navy">
            <div className="container mx-auto px-8 relative z-10">
                <div className="mb-24 flex items-end justify-between border-b border-brand-offwhite/20 pb-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-offwhite leading-[0.85]">
                        Output.
                     </h2>
                     <div className="hidden md:block font-mono text-xs uppercase tracking-widest text-right opacity-80">
                        Select a capability<br/>to explore
                     </div>
                </div>

                <div className="flex flex-col">
                    {capabilities.map((cap, index) => (
                        <Link 
                            key={index}
                            to={cap.link}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-brand-offwhite/20 py-12 md:py-16 flex flex-col md:flex-row justify-between md:items-center transition-colors hover:bg-brand-offwhite/5"
                        >
                            <div className="flex items-baseline gap-8 md:gap-16">
                                <span className="font-mono text-sm md:text-base text-brand-purple group-hover:text-brand-yellow font-bold transition-colors">/{cap.id}</span>
                                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 ease-out text-brand-offwhite leading-[0.85]">
                                    {cap.title}
                                </h3>
                            </div>
                            <div className="mt-4 md:mt-0 pl-[calc(2rem+14px)] md:pl-0">
                                <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity text-brand-offwhite">
                                    {cap.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="mt-16 md:mt-24 max-w-2xl border-t border-brand-offwhite/20 pt-8">
                    <p className="font-body text-lg opacity-80">
                        We build custom visual systems using industry-standard platforms like <a href="https://webflow.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow transition-colors">Webflow</a> and <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow transition-colors">Stripe</a>, ensuring your brand performs securely and as well as it looks.
                    </p>
                </div>
            </div>
        </section>
    );
}

const ShowcaseGrid: React.FC = () => {
    return (
        <section className="bg-brand-offwhite px-6 md:px-8 py-32 relative z-40 border-b-2 border-brand-navy overflow-hidden">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                     <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85]">
                        Selected<br/>Works
                     </h2>
                     <Link to="/work" className="font-mono text-sm uppercase tracking-widest font-bold border-2 border-brand-navy px-8 py-3 hover:bg-brand-navy hover:text-brand-offwhite transition-all text-brand-navy">
                        View Full Archive
                     </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-24">
                    {PROJECTS.slice(1, 8).map((project, index) => (
                        <div key={project.id} className={`${index % 2 === 1 ? 'md:mt-24' : ''}`}>
                             <ProjectCard project={project} className="aspect-[4/3] w-full" />
                             <div className="mt-6 flex justify-between items-start border-t border-brand-navy/10 pt-4">
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-brand-navy">{project.title}</h3>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold mt-2 block">{project.category}</span>
                                </div>
                                <span className="font-mono text-[10px] uppercase font-bold opacity-40 text-brand-navy">{project.year}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const FAQSection: React.FC = () => {
    const faqs = QA_DATA[0].questions; 
    return (
        <section className="py-24 bg-white border-b-2 border-brand-navy relative z-40">
            <div className="container mx-auto px-6 md:px-8">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85] mb-16">Frequently Asked Questions</h2>
                <div className="max-w-4xl" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <div key={i} className="mb-10 border-b border-brand-navy/10 pb-10" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-brand-navy mb-4" itemProp="name">
                                {faq.q}
                            </h3>
                            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="font-body text-lg md:text-xl text-brand-navy/80 leading-relaxed" itemProp="text">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LatestIntel: React.FC = () => {
    return (
        <section className="py-24 relative z-40 bg-brand-offwhite overflow-hidden">
             <div className="container mx-auto px-8">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85]">Studio Thoughts</h2>
                    <Link to="/journal" data-cursor-text="INTEL" className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple hover:text-brand-navy">View All Entries &rarr;</Link>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-brand-navy/10">
                    {JOURNAL_POSTS.slice(0, 3).map((post, i) => (
                        <Link key={i} to={`/journal/${post.slug}`} data-cursor-text="READ" className="group block border-r border-b border-t border-brand-navy/10 p-8 hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-300">
                             <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-4 group-hover:text-brand-yellow text-brand-navy group-hover:text-brand-offwhite">{post.date}</span>
                             <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6 text-brand-navy group-hover:text-brand-offwhite min-h-[3em]">{post.title}</h3>
                             <p className="font-body text-xl font-light opacity-60 leading-relaxed line-clamp-3 group-hover:opacity-80 text-brand-navy group-hover:text-brand-offwhite">
                                 {post.excerpt}
                             </p>
                        </Link>
                    ))}
                 </div>
             </div>
        </section>
    )
}

const HomePage: React.FC = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "COOLO Studio",
    "url": "https://coolo.co.nz",
    "logo": "https://coolo.co.nz/assets/logos/logo-dark.svg",
    "description": "Boutique creative and brand studio focused on helping businesses communicate with clarity, confidence, coherence, and soul.",
    "sameAs": [
      "https://instagram.com/coolo.co",
      "https://linkedin.com/company/coolo"
    ]
  };

  return (
    <div className="bg-brand-offwhite">
      <Helmet>
        <title>COOLO | Brand Strategy & Design Power</title>
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>
      
      <BrandHero />
      <NarrativeScroll />
      <ServiceRouter />
      <FeatureSpotlight />
      <CapabilityList />
      <ShowcaseGrid />
      <FAQSection />
      <LatestIntel />
    </div>
  );
};

export default HomePage;