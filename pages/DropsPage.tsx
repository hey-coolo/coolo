import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { DROPS } from '../constants';
import { Drop } from '../types';

const DropCard: React.FC<{ drop: Drop }> = ({ drop }) => {
    return (
        <Link to={`/drops/${drop.slug}`} className="block group bg-white border border-brand-dark/10 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-brand-dark/10 hover:-translate-y-1">
            <div className="overflow-hidden aspect-square relative">
                <img src={drop.imageUrl} alt={drop.title} className="w-full h-full object-cover transition-transform duration-500 ease-custom-ease group-hover:scale-105" />
                 <span className="absolute top-4 right-4 font-mono text-xs uppercase text-brand-light bg-brand-dark px-2 py-1 rounded">
                    {drop.status}
                </span>
            </div>
            <div className="p-6 border-t border-brand-dark/10">
                <h2 className="font-sans text-xl font-bold uppercase tracking-tight">{drop.title}</h2>
                <p className="font-mono text-sm text-brand-muted mt-2">{drop.description}</p>
            </div>
        </Link>
    );
};


const DropsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <AnimatedSection>
        <section className="py-24 md:py-48 text-center">
          <h1 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter">
            Our Playground
          </h1>
          <p className="font-body text-lg md:text-xl mt-8 max-w-3xl mx-auto text-brand-muted">
            Beyond client work, we build our own stuff. Drops are standalone mini-brands, creative experiments, and limited-run products where we explore new ideas.
          </p>
        </section>
      </AnimatedSection>

      <section className="pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DROPS.map((drop, index) => (
                <AnimatedSection key={drop.slug} delay={index * 150}>
                    <DropCard drop={drop} />
                </AnimatedSection>
            ))}
        </div>
      </section>
    </div>
  );
};

export default DropsPage;