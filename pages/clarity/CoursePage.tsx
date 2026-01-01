
import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { COURSE_MODULES } from '../../constants';
import { Link } from 'react-router-dom';

const CoursePage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen pt-48 pb-48">
      <div className="container mx-auto px-8">
        <AnimatedSection className="max-w-4xl">
          <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold">Online Course</span>
          <h1 className="text-7xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy mt-8">
            Franco Brand<br/><span className="text-brand-purple">Formula.</span>
          </h1>
          <p className="font-body text-3xl text-brand-navy/70 mt-12 leading-tight">
            Structured lectures, worksheets, critique prompts, and community Q&A. For small-to-mid brands and teams ready to do the work.
          </p>
        </AnimatedSection>

        <div className="mt-48 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 border-l-4 border-brand-purple p-8 h-max sticky top-48 bg-white shadow-xl">
                <h3 className="text-3xl font-black uppercase text-brand-navy leading-none">Enrollment</h3>
                <p className="font-mono text-brand-purple mt-4 uppercase font-bold tracking-widest">OPEN FOR REGISTRATION</p>
                <div className="mt-8 font-body text-brand-navy/60 text-lg">
                    Access the exact templates and logic we use for $4k consulting sprints.
                </div>
                <button className="w-full mt-12 bg-brand-navy text-brand-offwhite font-mono font-bold uppercase py-6 hover:bg-brand-purple transition-all">Join Course — $400</button>
            </div>
            
            <div className="lg:col-span-8 space-y-12">
                {COURSE_MODULES.map((item) => (
                    <AnimatedSection key={item.mod}>
                        <div className="flex gap-12 items-start border-b border-brand-navy/5 pb-12">
                            <span className="font-mono text-5xl font-black text-brand-purple/20">{item.mod}</span>
                            <div>
                                <h4 className="text-5xl font-black uppercase tracking-tight leading-none text-brand-navy">{item.title}</h4>
                                <p className="font-body text-xl text-brand-navy/60 mt-4 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>

        <section className="mt-48 p-12 md:p-24 border-2 border-brand-navy bg-brand-navy text-brand-offwhite text-center">
            <AnimatedSection>
                <h2 className="text-5xl font-black uppercase tracking-tight mb-8">Need Higher Resolution?</h2>
                <p className="font-body text-2xl opacity-70 max-w-2xl mx-auto mb-12">
                    The course is great for DIY. But if you want us to audit your brand and build the roadmap for you, upgrade to the Consulting Sprint.
                </p>
                <Link to="/clarity/consulting" className="inline-block border-b-2 border-brand-yellow pb-1 font-mono text-brand-yellow uppercase tracking-widest font-bold hover:text-white transition-colors">
                    View Consulting Sprint Details &rarr;
                </Link>
            </AnimatedSection>
        </section>
      </div>
    </div>
  );
};

export default CoursePage;
