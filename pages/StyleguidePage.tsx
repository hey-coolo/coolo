import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import SmoothScroll from '../components/SmoothScroll';
import Button from '../components/Button';

export default function StyleguidePage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f0] font-mono selection:bg-[#f4f4f0] selection:text-[#0a0a0a] pb-32">
        {/* HEADER */}
        <header className="px-6 py-12 md:p-12 border-b border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-col gap-2 text-xs tracking-widest text-zinc-400 uppercase">
              <span>COOLO®</span>
              <span>INTERNAL VISUAL OPERATING SYSTEM</span>
              <span>MOUNT MAUNGANUI / NZ</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] tracking-widest text-zinc-500 block mb-4 uppercase">Hidden Route: /styleguide</span>
              <h1 className="font-['Shoulder'] text-6xl md:text-9xl leading-[0.8] uppercase tracking-tighter">
                Style<br />Guide
              </h1>
            </div>
          </div>
        </header>

        {/* CORE PRINCIPLES */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              00 - Core Principles
            </div>
            <div className="md:col-span-8 flex flex-col gap-12 font-['Shoulder'] text-3xl md:text-5xl uppercase leading-none tracking-tight">
              <p className="max-w-3xl">
                "If a change improves technical responsiveness but damages the composition, do not make the change."
              </p>
              <p className="max-w-3xl text-zinc-400">
                "If a mathematically consistent spacing system conflicts with the visual reference, prioritise the visual reference."
              </p>
              <p className="max-w-3xl text-zinc-600">
                "If a perfectly clean CSS implementation produces a visually weaker result, prioritise the visual result."
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* 01 - COMPOSITION */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              01 - Composition
            </div>
            <div className="md:col-span-8">
              <p className="text-sm max-w-md mb-16 leading-relaxed text-zinc-300">
                Composition is the highest priority. The overall visual relationship between elements is more important than whether each individual element is technically perfectly aligned. Does the composition feel right?
              </p>
              
              {/* Demonstration of asymmetrical grid and visual tension */}
              <div className="grid grid-cols-12 gap-4 relative">
                <div className="col-span-12 md:col-span-7 bg-zinc-900 aspect-video flex items-center justify-center p-8">
                  <span className="font-['Shoulder'] text-4xl text-zinc-600 uppercase">Visual Mass</span>
                </div>
                <div className="col-span-10 md:col-span-4 md:col-start-9 bg-zinc-800 aspect-square mt-[-10%] md:mt-24 flex items-end p-6 z-10">
                  <span className="text-xs tracking-widest text-zinc-400">OFFSET TENSION</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 02 - TYPOGRAPHY */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              02 - Typography
            </div>
            <div className="md:col-span-8 flex flex-col gap-16">
              <p className="text-sm max-w-md leading-relaxed text-zinc-300">
                Typography must be treated as a structural part of the composition. Do not automatically reduce type size simply to make text fit more neatly. Allow text to break naturally.
              </p>

              <div>
                <span className="text-[10px] text-zinc-500 block mb-4 uppercase tracking-widest">Display Typography (Shoulder)</span>
                <h2 className="font-['Shoulder'] text-7xl md:text-[11vw] leading-[0.85] tracking-tighter uppercase mb-6">
                  Brands with<br />Perspective.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <span className="text-[10px] text-zinc-500 block mb-4 uppercase tracking-widest">Section Heading (Shoulder)</span>
                  <h3 className="font-['Shoulder'] text-4xl md:text-6xl leading-[0.9] tracking-tight uppercase">
                    Cultural<br />Context
                  </h3>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block mb-4 uppercase tracking-widest">Body Copy (Space Mono)</span>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    We operate between a design studio and an independent publication. Information should be delivered with editorial pacing, maintaining intentional whitespace and unexpected hierarchy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 03 - SCALE */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              03 - Scale
            </div>
            <div className="md:col-span-8 flex flex-col md:flex-row items-end justify-between gap-12">
              <div className="w-full md:w-3/5">
                <h2 className="font-['Shoulder'] text-8xl md:text-[12vw] leading-[0.8] tracking-tighter uppercase">
                  Huge
                </h2>
              </div>
              <div className="w-full md:w-1/5 pb-2 md:pb-6">
                <p className="text-[10px] tracking-widest text-zinc-400 uppercase">
                  Scale creates hierarchy. Do not normalize scale simply to make the design more consistent. Contrast is intentional.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 04 - SPACING */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              04 - Spacing
            </div>
            <div className="md:col-span-8">
              <p className="text-sm max-w-md mb-24 leading-relaxed text-zinc-300">
                Visual reference takes priority over mathematical consistency. Let the page breathe in the exact places the design dictates to create rhythm.
              </p>
              
              <div className="flex flex-col gap-32">
                <div className="h-px w-full bg-zinc-800 relative">
                  <span className="absolute top-2 left-0 text-[10px] text-zinc-500 uppercase">Intentional Void</span>
                </div>
                <div className="flex justify-end">
                  <p className="text-sm max-w-xs text-zinc-300 text-right">
                    Empty space is a component. It carries visual weight. Do not trim spacing to "save scroll".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 05 - POSITIONING */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              05 - Positioning
            </div>
            <div className="md:col-span-8">
              <div className="relative w-full h-96 bg-zinc-900 overflow-hidden">
                <div className="absolute top-8 left-8 text-xs tracking-widest text-zinc-500">GRID LOGIC</div>
                <div className="absolute bottom-12 right-12 md:right-1/3 max-w-xs">
                  <p className="text-sm text-zinc-300">
                    Do not automatically centre elements. If an element is intentionally offset or positioned unusually, document that as part of the visual language.
                  </p>
                </div>
                <div className="absolute top-1/3 right-8 font-['Shoulder'] text-5xl uppercase text-zinc-700">
                  Float
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 06 - IMAGE TREATMENT */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              06 - Image Treatment
            </div>
            <div className="md:col-span-8">
              <p className="text-sm max-w-md mb-12 leading-relaxed text-zinc-300">
                The correct treatment is the one that preserves the intended composition. Respect precise cropping and aspect ratios over uniform containers.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="col-span-2 aspect-[4/5] bg-zinc-800 relative overflow-hidden group">
                  <img src="/assets/cases/franca-austral/Hero.webp" alt="Franca Austral Reference" className="object-cover w-full h-full opacity-60 grayscale group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute bottom-4 left-4 text-[10px] tracking-widest text-zinc-50 uppercase bg-black/50 px-2 py-1">Full Bleed / Contained</span>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
                  <div className="aspect-square bg-zinc-900 relative">
                     <img src="/assets/cases/franca-austral/detail-1.webp" alt="Detail Reference" className="object-cover w-full h-full opacity-60 grayscale" />
                  </div>
                  <div className="aspect-video bg-zinc-900 relative">
                    <img src="/assets/cases/franca-austral/detail-2.webp" alt="Detail Reference" className="object-cover w-full h-full opacity-60 grayscale" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 07 - COLOUR */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              07 - Colour
            </div>
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-32 bg-[#0a0a0a] border border-zinc-800 rounded-sm"></div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase">Primary Dark / #0A0A0A</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-32 bg-[#f4f4f0] border border-zinc-200 rounded-sm"></div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase">Primary Light / #F4F4F0</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-32 bg-zinc-900 border border-zinc-800 rounded-sm"></div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase">Surface Dark / Zinc 900</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-32 bg-zinc-500 border border-zinc-800 rounded-sm"></div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase">Neutral / Zinc 500</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 08 - DECORATIVE DETAILS */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              08 - Decorative Details
            </div>
            <div className="md:col-span-8 flex flex-col items-start gap-12">
              <p className="text-sm max-w-md leading-relaxed text-zinc-300">
                Decorative details are the lowest priority. Do not add decorative elements simply to make a page look more complete.
              </p>
              
              <Button>
                Primary Interaction
              </Button>
            </div>
          </div>
</AnimatedSection>

        {/* 09 - RESPONSIVE ART DIRECTION */}
        <AnimatedSection className="px-6 py-24 md:p-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              09 - Responsive Art Direction
            </div>
            <div className="md:col-span-8">
              <h3 className="font-['Shoulder'] text-5xl uppercase mb-6 tracking-tight">Do not simply scale down.</h3>
              <p className="text-sm max-w-md leading-relaxed text-zinc-300">
                Responsive design does not mean simply scaling the desktop design down. The existing visual language must be preserved across breakpoints. If a technically correct responsive solution damages the composition, it is not the correct solution. Different viewport sizes may require entirely different compositions.
              </p>
            </div>
          </div>
</AnimatedSection>

        {/* 10 - VISUAL QA CHECKLIST */}
<AnimatedSection className="px-6 py-24 md:p-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest text-zinc-500 uppercase">
              10 - Visual QA Checklist
            </div>
            <div className="md:col-span-8">
              <ul className="flex flex-col gap-8">
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-zinc-900 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">01 / Composition</span>
                  <span className="text-sm text-zinc-200">Does the overall composition feel the same?</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-zinc-900 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">02 / Typography</span>
                  <span className="text-sm text-zinc-200">Does the typography have the same visual weight, scale and rhythm?</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-zinc-900 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">03 / Scale</span>
                  <span className="text-sm text-zinc-200">Do the largest and smallest elements create the same hierarchy?</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-zinc-900 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">04 / Spacing</span>
                  <span className="text-sm text-zinc-200">Does the page breathe in the same places?</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-zinc-900 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">05 / Positioning</span>
                  <span className="text-sm text-zinc-200">Are elements positioned and aligned with the same visual intention?</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-zinc-900 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">06 / Image Treatment</span>
                  <span className="text-sm text-zinc-200">Are the crop, scale and subject positioning correct?</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-zinc-900 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">07 / Colour</span>
                  <span className="text-sm text-zinc-200">Are the colour relationships and contrast preserved?</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-baseline gap-2 pb-4">
                  <span className="w-48 text-[10px] tracking-widest text-zinc-500 uppercase">08 / Decorative Details</span>
                  <span className="text-sm text-zinc-200">Are the details supporting the composition without overwhelming it?</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </SmoothScroll>
  );
}