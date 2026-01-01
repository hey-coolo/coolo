
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { TEAM_MEMBERS } from '../constants';

const TeamPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite pt-32 min-h-screen">
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm mb-4 block">Our Senior Unit</span>
            <h1 className="text-8xl md:text-[14vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                The<br/><span className="text-brand-purple">Operatives</span>
            </h1>
            <p className="font-body text-2xl md:text-4xl text-brand-lavender mt-12 leading-[1.1] max-w-4xl">
              COOLO is a senior-only team. No bloat, no overhead, just expert hands. You get the Brains and the Engine, every time.
            </p>
          </header>
        </AnimatedSection>

        <section className="pb-48">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(TEAM_MEMBERS).map(([slug, member], index) => (
                    <AnimatedSection key={slug} delay={index * 150}>
                        <Link to={`/team/${slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-brand-navy">
                            <img 
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-100" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute bottom-12 left-12 text-brand-offwhite">
                                <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow mb-2 block">{member.title}</span>
                                <h3 className="text-7xl font-black uppercase tracking-tight leading-none">{member.name}</h3>
                                <p className="font-mono text-xs mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 tracking-widest uppercase">Explore Bio &rarr;</p>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </section>
      </div>

      <section className="bg-brand-offwhite text-brand-navy py-48 text-center border-t-2 border-brand-navy">
        <div className="container mx-auto px-8">
            <AnimatedSection>
                <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight mb-12">Looking for Firepower?</h2>
                <Link to="/contact" className="inline-block bg-brand-navy text-brand-offwhite font-sans text-4xl uppercase px-16 py-8 hover:bg-brand-purple transition-all duration-500 shadow-2xl">
                    Inquire Now
                </Link>
            </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
