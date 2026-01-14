
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import { TeamMember } from '../types';

const TeamMemberPage: React.FC = () => {
  const { memberSlug } = useParams<{ memberSlug: string }>();
  
  if (!memberSlug || !(memberSlug in TEAM_MEMBERS)) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
        <div className="text-center">
            <h1 className="text-6xl font-black uppercase text-brand-navy">Agent Missing</h1>
            <Link to="/team" className="font-mono uppercase underline mt-8 block text-brand-purple">Back to Unit</Link>
        </div>
      </div>
    );
  }

  const member: TeamMember = TEAM_MEMBERS[memberSlug];

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32">
      <div className="container mx-auto px-8">
        <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-24">
                <div className="lg:col-span-5">
                    <div className="sticky top-32 aspect-[4/5] bg-brand-navy overflow-hidden">
                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] mb-4 block font-bold">Dossier / {member.title}</span>
                    <h1 className="text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                        {member.name}
                    </h1>
                    
                    <div className="mt-16 space-y-8 max-w-2xl">
                        {member.bio.map((p, i) => (
                            <p key={i} className="font-body text-xl md:text-2xl text-brand-navy/90 leading-relaxed">
                                {p}
                            </p>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-wrap items-center gap-12">
                        {member.instagram && (
                            <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-4">
                                <span className="font-mono text-sm uppercase text-brand-purple tracking-widest font-bold">IG: @{member.instagram}</span>
                                <div className="w-12 h-[2px] bg-brand-purple group-hover:w-24 transition-all duration-500"></div>
                            </a>
                        )}
                        <Link to="/contact" className="font-mono text-sm uppercase text-brand-navy underline decoration-brand-yellow decoration-4 underline-offset-8 font-bold tracking-widest">Connect Directly</Link>
                    </div>
                </div>
            </div>
        </AnimatedSection>

        <section className="py-24 border-t border-brand-navy/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <Link to="/team" className="font-mono uppercase text-sm text-brand-lavender hover:text-brand-navy transition-colors tracking-widest font-bold">
                &larr; Back to Studio
            </Link>
            <span className="text-4xl font-black uppercase text-brand-purple tracking-tighter">COOLO SENIOR UNIT 0{Object.keys(TEAM_MEMBERS).indexOf(memberSlug) + 1}</span>
        </section>
      </div>
    </div>
  );
};

export default TeamMemberPage;
