
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS, FIREPOWER_TIERS } from '../constants';
import { Link } from 'react-router-dom';

const FirepowerPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite text-brand-navy min-h-screen pt-32 relative overflow-hidden">
       {/* Heavy side border for structure */}
      <div className="absolute top-0 right-0 w-[2px] h-full bg-brand-navy pointer-events-none"></div>
      
      <div className="container mx-auto px-8">
        <AnimatedSection>
          <header className="py-24 md:py-48 max-w-6xl">
            <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black block mb-6">Service Leg 02 / Firepower</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase tracking-tight leading-[0.9] mt-8 text-brand-navy">
              The Creative<br/><span className="text-brand-purple italic">Method™</span>
            </h1>
            <p className="font-body text-2xl md:text-5xl text-brand-navy/60 mt-16 leading-tight max-w-4xl font-light">
              From identity to campaigns, websites to product visuals. We make brands not only sound sharp but <span className="text-brand-navy font-bold">look and feel irresistible.</span>
            </p>
          </header>
        </AnimatedSection>

        <section className="py-32 border-t-2 border-brand-navy">
            <h2 className="font-mono text-brand-navy uppercase tracking-[0.3em] text-xs font-black mb-16">Scope Levels & Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l-2 border-brand-navy">
                {FIREPOWER_TIERS.map((tier, i) => (
                    <AnimatedSection key={tier.name} delay={i * 100} className="h-full">
                        <Link to={`/firepower/${tier.slug}`} className="group relative border-r-2 border-b-2 border-brand-navy p-12 h-full hover:bg-brand-navy hover:text-brand-offwhite transition-all duration-500 flex flex-col justify-between block">
                            <div>
                                <span className="font-mono text-xs uppercase text-brand-purple group-hover:text-brand-yellow font-black tracking-widest mb-4 block">{tier.name}</span>
                                <h3 className="text-4xl font-black uppercase tracking-tight leading-none mb-6 group-hover:text-brand-offwhite">
                                    {tier.focus}
                                </h3>
                                <p className="font-body text-lg text-brand-navy/60 group-hover:text-brand-offwhite/70 transition-colors mb-8 leading-relaxed">
                                    {tier.desc}
                                </p>
                            </div>
                            <div className="pt-8 border-t border-brand-navy/10 group-hover:border-brand-offwhite/20">
                                <ul className="space-y-3 mb-8">
                                    {tier.deliverables.slice(0, 3).map(d => (
                                        <li key={d} className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 bg-brand-navy group-hover:bg-brand-yellow"></span> {d}
                                        </li>
                                    ))}
                                    {tier.deliverables.length > 3 && (
                                        <li className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 opacity-50">
                                            + {tier.deliverables.length - 3} More
                                        </li>
                                    )}
                                </ul>
                                <span className="mt-4 block w-full text-center border-2 border-brand-navy text-brand-navy font-mono text-[10px] font-black uppercase py-4 tracking-widest group-hover:border-brand-yellow group-hover:text-brand-yellow hover:bg-brand-yellow/10 transition-all">
                                    View Full Scope
                                </span>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        <section className="py-48 border-t-2 border-brand-navy bg-brand-offwhite -mx-8 px-8">
             <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                 <div className="lg:col-span-4">
                     <h2 className="font-mono text-brand-navy uppercase tracking-[0.3em] text-xs font-black mb-8">Internal Playbook</h2>
                     <h3 className="text-5xl font-black uppercase tracking-tight leading-none">How We<br/>Run It.</h3>
                 </div>
                 <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                     {[
                         { step: "01 Entry", text: "Creative Brief derived from Strategy Pack. Translating logic into territories." },
                         { step: "02 Identity", text: "Exploration of routes, systemization of logo, typography, and color." },
                         { step: "03 Story", text: "Building campaign themes, tone of voice, and ad concepts." },
                         { step: "04 Digital", text: "UX wireframes aligned with Story Spine. High-fidelity Webflow build." },
                         { step: "05 Visuals", text: "Cinema4D product renders and styled photography shoots." },
                         { step: "06 Handoff", text: "Asset Pack delivery, Loom walkthroughs, and team training." }
                     ].map(s => (
                         <div key={s.step} className="border-l-2 border-brand-navy pl-8">
                             <div className="font-mono text-brand-purple font-bold uppercase tracking-widest text-xs mb-2">{s.step}</div>
                             <p className="font-body text-xl text-brand-navy/80">{s.text}</p>
                         </div>
                     ))}
                 </div>
             </div>
        </section>

        <section className="py-48 border-t-2 border-brand-navy">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
                <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight leading-none">The Proof.</h2>
                <Link to="/work" className="font-mono text-xs uppercase text-brand-navy font-black border-b-2 border-brand-navy pb-2 hover:text-brand-purple transition-colors">Archive Access &rarr;</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((p) => (
                    <ProjectCard key={p.id} project={p} className="aspect-[16/9]" />
                ))}
             </div>
        </section>
      </div>
      <div className="h-64 bg-brand-offwhite border-t-2 border-brand-navy flex items-center overflow-hidden">
         <div className="flex animate-marquee whitespace-nowrap">
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className="text-[10vw] font-black uppercase tracking-tight text-brand-navy/10 mx-16">
                    MAKE IT IRRESISTIBLE &bull; EXECUTION MATCHES INSIGHT &bull; 
                </span>
            ))}
         </div>
      </div>
    </div>
  );
};

export default FirepowerPage;
