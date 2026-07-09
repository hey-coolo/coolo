import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ServicesPage: React.FC = () => {
  const creativeMethodServices = [
    'Brand Strategy & Positioning', 
    'Logo & Visual Identity Systems', 
    'Comprehensive Brand Guidelines',
    'Campaign Concepts & Art Direction',
    'Web Design & Webflow Development',
    'UI/UX Design',
    '3D Renders & Visualizations', 
    'Motion Design & Short-form Video'
  ];
  
  const noMagicTiers = [
      { title: 'Freebies', price: '$0', description: "Downloadable worksheets and guides to kickstart your brand thinking.", cta: "Download Worksheet", link: "/journal" },
      { title: 'Mini-Workbook', price: '$30', description: "A tactical guide with exercises to define your brand's core messaging.", comingSoon: true },
      { title: 'Online Course', price: '$400', description: "A comprehensive course on our brand strategy and storytelling framework.", comingSoon: true },
      { title: 'Private Consulting', price: '$4,000+', description: "1:1 brand strategy sessions and roadmap development.", cta: "Inquire Now", link: "/contact" }
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <AnimatedSection>
        <section className="py-24 md:py-48 text-center">
          <h1 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter">
            From Insight to Impact
          </h1>
          <p className="font-body text-lg md:text-xl mt-8 max-w-3xl mx-auto text-brand-muted">
            We build lasting brands by separating our process into two core offerings: strategy and execution.
          </p>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="no-magic" className="py-24 md:py-32 border-t border-brand-dark/20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <h2 className="font-sans text-4xl font-bold uppercase tracking-tight sticky top-24">The No Magic Formula™</h2>
                     <p className="font-body text-xl text-brand-muted mt-6 lg:max-w-xs">
                        Strategy & Insight. There's no universal “magic formula.” Every brand must find its own identity. We provide a tiered system to help you find yours.
                    </p>
                </div>
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {noMagicTiers.map((tier) => (
                          <div key={tier.title} className="bg-white border border-brand-dark/10 p-8 rounded-lg flex flex-col h-full">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                                <h3 className="font-sans text-2xl font-bold">{tier.title}</h3>
                                <div className="flex items-center space-x-4 mt-2 sm:mt-0 shrink-0">
                                  {tier.comingSoon && <span className="font-mono text-xs uppercase text-brand-dark bg-brand-dark/10 px-2 py-1 rounded">Coming Soon</span>}
                                  <span className="font-mono text-lg text-brand-dark">{tier.price}</span>
                                </div>
                            </div>
                            <p className="font-body mt-4 text-brand-muted max-w-2xl flex-grow">{tier.description}</p>
                            
                            <div className="mt-6">
                                {tier.cta && tier.link && !tier.comingSoon && (
                                    tier.title === 'Freebies' ? (
                                         <a href={tier.link} className="inline-flex items-center justify-center font-mono text-sm uppercase bg-brand-accent text-brand-dark px-6 py-3 font-bold hover:opacity-80 transition-opacity duration-300">
                                            {tier.cta} <DownloadIcon />
                                        </a>
                                    ) : (
                                        <Link to={tier.link} className="inline-block font-mono text-sm uppercase text-brand-dark hover:text-brand-accent transition-colors duration-300">
                                            {tier.cta} &rarr;
                                        </Link>
                                    )
                                )}
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection>
        <section id="creative-method" className="py-24 md:py-32 border-t border-brand-dark/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                     <h2 className="font-sans text-4xl font-bold uppercase tracking-tight sticky top-24">The Creative Method™</h2>
                </div>
                <div className="md:col-span-2">
                    <p className="font-body text-xl text-brand-muted mb-12">
                       Execution & Storytelling. This is where strategy becomes tangible. We bring your brand to life through compelling visuals, digital experiences, and unforgettable storytelling.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 font-body text-xl">
                        {creativeMethodServices.map((service) => (
                            <p key={service}>{service}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default ServicesPage;