
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { JOURNAL_POSTS, TEAM_MEMBERS } from '../constants'; 
import { motion } from 'framer-motion';

const JournalListPage: React.FC = () => (
    <div className="bg-brand-offwhite min-h-screen pt-32">
        <div className="container mx-auto px-8">
            <AnimatedSection>
                <header className="py-24 md:py-48 max-w-6xl relative">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.4em] text-xs font-black mb-6 block">Intel / Journal</span>
                    <h1 className="text-brand-navy text-8xl md:text-[12vw] font-black uppercase tracking-tight leading-[0.85]">
                        The Brain<br/><span className="text-brand-purple italic">Dump.</span>
                    </h1>
                    <p className="font-body text-2xl md:text-4xl text-brand-navy/60 mt-16 leading-tight max-w-4xl font-light">
                        Musings on the intersection of brand strategy, kinetic design, and the slow burn of clarity.
                    </p>
                    
                     {/* System Marker */}
                    <div className="absolute top-24 right-0 hidden lg:block text-right">
                        <div className="font-mono text-[10px] uppercase font-bold text-brand-purple/40 tracking-[0.3em]">Status: Online</div>
                        <div className="font-mono text-[10px] uppercase font-bold text-brand-purple/40 tracking-[0.3em] mt-1">Ref: {JOURNAL_POSTS.length} Entries</div>
                    </div>
                </header>
            </AnimatedSection>

            <section className="pb-48">
                <div className="border-t border-brand-navy/10">
                    {JOURNAL_POSTS.map((post, index) => (
                        <AnimatedSection key={post.slug} delay={index * 100}>
                            <Link to={`/journal/${post.slug}`} className="group relative block py-16 border-b border-brand-navy/10 transition-colors duration-500 hover:bg-brand-navy">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
                                    <div className="lg:col-span-2">
                                        <span className="font-mono text-xs text-brand-purple font-bold tracking-widest group-hover:text-brand-yellow transition-colors">{post.date}</span>
                                    </div>
                                    <div className="lg:col-span-7">
                                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-brand-navy group-hover:text-brand-offwhite transition-colors duration-300">
                                            {post.title}
                                        </h2>
                                        <p className="font-body text-xl text-brand-navy/60 mt-6 max-w-2xl group-hover:text-brand-offwhite/60 transition-colors">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="lg:col-span-3 flex flex-col items-end justify-between h-full">
                                         <div className="flex flex-wrap gap-2 justify-end">
                                            {post.tags?.map(tag => (
                                                <span key={tag} className="font-mono text-[9px] uppercase border border-brand-navy/20 px-2 py-1 text-brand-navy/40 group-hover:border-brand-offwhite/20 group-hover:text-brand-offwhite/40 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                         </div>
                                         <span className="hidden lg:block font-mono text-[10px] uppercase tracking-widest text-brand-purple font-bold group-hover:text-brand-yellow transition-colors mt-8">
                                            Read Entry &rarr;
                                         </span>
                                    </div>
                                </div>
                                
                                {/* Hover Image Reveal */}
                                <div className="hidden lg:block absolute top-1/2 right-12 -translate-y-1/2 w-64 aspect-video opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 overflow-hidden bg-brand-navy border border-brand-offwhite/10 rotate-3 group-hover:rotate-0 transform transition-transform">
                                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover grayscale opacity-60" />
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        </div>
    </div>
);

const JournalPostPage: React.FC<{ slug: string }> = ({ slug }) => {
    const post = JOURNAL_POSTS.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-navy text-brand-offwhite">
                <div className="text-center">
                    <h1 className="text-6xl font-black uppercase tracking-tight">Entry_Missing</h1>
                    <Link to="/journal" className="font-mono uppercase text-brand-yellow mt-8 block tracking-widest text-xs">Return to Intel &rarr;</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-brand-offwhite min-h-screen pt-32 pb-48">
            <AnimatedSection>
                <div className="container mx-auto px-8">
                    <header className="py-24 max-w-5xl border-b border-brand-navy/10">
                        <div className="flex flex-wrap gap-6 mb-8 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-purple">
                            <span>{post.date}</span>
                            <span className="text-brand-navy/20">/</span>
                            <span>{post.readTime}</span>
                            <span className="text-brand-navy/20">/</span>
                            <span>Auth: {post.author}</span>
                        </div>
                        <h1 className="text-7xl md:text-[10vw] font-black uppercase tracking-tight leading-[0.9] text-brand-navy">
                            {post.title}
                        </h1>
                    </header>
                </div>
            </AnimatedSection>

            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-16">
                    <div className="lg:col-span-4 space-y-12">
                         <AnimatedSection delay={200}>
                            <div className="sticky top-32">
                                <div className="aspect-[4/5] bg-brand-navy overflow-hidden mb-8">
                                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-1000" />
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-mono text-[10px] uppercase text-brand-navy/40 tracking-widest font-bold mb-2">Subject Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags?.map(tag => (
                                                <span key={tag} className="font-mono text-[10px] uppercase bg-brand-navy/5 text-brand-navy px-3 py-1 font-bold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-mono text-[10px] uppercase text-brand-navy/40 tracking-widest font-bold mb-2">Synopsis</h4>
                                        <p className="font-body text-sm leading-relaxed text-brand-navy/70">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                         </AnimatedSection>
                    </div>

                    <div className="lg:col-span-7 lg:col-start-6">
                         <AnimatedSection delay={300}>
                             <article className="prose prose-xl prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-black prose-p:font-body prose-p:text-brand-navy/80 prose-p:leading-relaxed prose-p:font-light max-w-none">
                                {post.content.split('\n').map((paragraph, index) => (
                                    <p key={index} className={paragraph.length === 1 ? 'hidden' : 'mb-8'}>{paragraph}</p>
                                ))}
                             </article>
                             
                             <div className="mt-32 pt-16 border-t border-brand-navy/10 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-brand-purple rounded-full overflow-hidden">
                                        <img 
                                            src={TEAM_MEMBERS.franco.imageUrl} 
                                            className="w-full h-full object-cover" 
                                            alt="Franco"
                                        />
                                    </div>
                                    <div className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy">
                                        Franco <span className="text-brand-navy/40">/ Creative Director</span>
                                     </div>
                                </div>
                                <Link to="/journal" className="font-mono text-xs uppercase font-bold tracking-[0.2em] text-brand-purple hover:text-brand-yellow transition-colors bg-brand-navy py-3 px-6 hover:bg-brand-navy/90">
                                    Return to Intel
                                </Link>
                             </div>
                         </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    );
}

const JournalPage: React.FC = () => {
  const { slug } = useParams();

  return (
    <>
      {slug ? <JournalPostPage slug={slug} /> : <JournalListPage />}
    </>
  );
};

export default JournalPage;
