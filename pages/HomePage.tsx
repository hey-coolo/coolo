import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Assuming you have a basic header
import Footer from '../components/Footer'; // Assuming you have a basic footer
import AnimatedSection from '../components/AnimatedSection';
import SmoothScroll from '../components/SmoothScroll';
import ProjectCard from '../components/ProjectCard';

const HomePage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) return <div className="min-h-screen bg-[#0a0a0a]" />;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] selection:bg-[#f0f0f0] selection:text-[#0a0a0a] overflow-hidden">
        <Header />

        <main>
          {/* HERO SECTION */}
          <section className="relative w-full min-h-[90vh] flex flex-col justify-end pt-32 pb-12 px-6 md:px-12 lg:px-20">
            <AnimatedSection className="w-full flex flex-col md:flex-row justify-between items-end border-b border-[#f0f0f0]/20 pb-8">
              <div className="w-full md:w-3/4">
                <h1 className="font-display text-[15vw] md:text-[11vw] leading-[0.85] tracking-tighter uppercase m-0">
                  We Create<br />
                  Brands With<br />
                  A Point Of View.
                </h1>
              </div>
              
              <div className="hidden md:flex flex-col items-end text-right w-1/4 pb-4">
                <p className="font-mono text-xs md:text-sm uppercase leading-relaxed tracking-wider text-[#f0f0f0]/70">
                  COOLO®<br />
                  Brand Design Studio<br />
                  Mount Maunganui / NZ
                </p>
              </div>
            </AnimatedSection>
          </section>

          {/* STUDIO MANIFESTO */}
          <section className="py-32 px-6 md:px-12 lg:px-20 w-full">
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4 flex justify-start">
                <span className="font-mono text-xs uppercase tracking-widest text-[#f0f0f0]/60">
                  [ 01 — The Studio ]
                </span>
              </div>
              <div className="md:col-span-8 lg:col-span-7">
                <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight m-0">
                  Operating at the intersection of cultural insight and strict design discipline. We build digital and physical experiences that demand attention.
                </h2>
                <div className="mt-12">
                  <a 
                    href="/about" 
                    className="font-mono text-sm uppercase tracking-widest border-b border-[#f0f0f0] pb-1 hover:text-[#f0f0f0]/60 hover:border-[#f0f0f0]/60 transition-colors duration-300"
                  >
                    Discover our perspective
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* SELECTED WORK - ASYMMETRICAL GRID */}
          <section className="py-24 px-6 md:px-12 lg:px-20 w-full bg-[#111111]">
            <AnimatedSection className="flex justify-between items-end border-b border-[#f0f0f0]/20 pb-8 mb-20">
              <h2 className="font-display text-6xl md:text-8xl tracking-tight uppercase m-0">Selected Work</h2>
              <span className="font-mono text-xs uppercase tracking-widest text-[#f0f0f0]/60 hidden md:block mb-2">
                [ 2024 — 2026 ]
              </span>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12 lg:gap-x-20">
              
              {/* Project 01 - Offset Left */}
              <AnimatedSection className="md:col-span-7 md:col-start-1">
                <ProjectCard 
                  id="franca-austral"
                  title="Franca Austral"
                  category="Brand Identity & Digital"
                  imageSrc="/assets/cases/franca-austral/Hero.webp"
                  year="2025"
                />
              </AnimatedSection>

              {/* Project 02 - Offset Right & Down */}
              <AnimatedSection className="md:col-span-6 md:col-start-7 md:mt-48">
                <ProjectCard 
                  id="johneys-dumpling"
                  title="Johney's Dumpling House"
                  category="Visual Identity & Packaging"
                  imageSrc="/assets/cases/johneys-dumpling-house/Hero.webp"
                  year="2024"
                />
              </AnimatedSection>

            </div>

            <AnimatedSection className="w-full flex justify-center mt-32">
              <a 
                href="/work" 
                className="inline-block font-mono text-sm uppercase tracking-widest border border-[#f0f0f0]/30 px-8 py-4 hover:bg-[#f0f0f0] hover:text-[#0a0a0a] transition-all duration-300"
              >
                View Full Archive
              </a>
            </AnimatedSection>
          </section>

          {/* CAPABILITIES LIST */}
          <section className="py-32 px-6 md:px-12 lg:px-20 w-full border-b border-[#f0f0f0]/20">
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#f0f0f0]/60">
                  [ 02 — Capabilities ]
                </span>
              </div>
              <div className="md:col-span-8 lg:col-span-8">
                <ul className="w-full flex flex-col m-0 p-0 list-none">
                  {['Brand Strategy', 'Creative Direction', 'Visual Identity', 'Digital Experiences'].map((item, i) => (
                    <li key={i} className="w-full border-t border-[#f0f0f0]/20 py-8 flex justify-between items-center group cursor-pointer">
                      <span className="font-display text-4xl md:text-6xl tracking-tight text-[#f0f0f0]/80 group-hover:text-[#f0f0f0] transition-colors duration-300">
                        {item}
                      </span>
                      <span className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        →
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </section>

        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default HomePage;