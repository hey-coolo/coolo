import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../components/Header';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>COOLO | Brands With A Point of View</title>
        <meta 
          name="description" 
          content="We bridge the gap, turning your complex ideas and expertise into a clear strategic direction and brand experience." 
        />
      </Head>

      <Header />

      <main className="relative min-h-screen bg-[#0A0A0A] text-white w-full overflow-hidden selection:bg-[#FFC800] selection:text-black">
        <section className="relative w-full h-screen pt-[100px] pb-12 px-6 md:px-10 flex flex-col justify-between">
          
          {/* Background Plate */}
          <div className="absolute inset-0 z-0 bg-black">
            <Image
              src="/assets/cases/surfboard-v001/detail-5.jpg"
              alt="Surfboard Concept - COOLO Case Study"
              fill
              priority
              quality={100}
              className="object-cover opacity-80 object-center"
              sizes="100vw"
            />
            {/* Subtle gradient to ensure text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
          </div>

          {/* Architecture Container */}
          <div className="relative z-10 flex flex-col justify-between h-full w-full max-w-[1920px] mx-auto">

            {/* Top Metadata */}
            <div className="flex justify-between items-start font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-200">
              <p>&copy; 2026 COOLO. HUMANS IN THE MACHINE.</p>
              <p className="text-right">ARTWORK: CONCEPT PLAYGROUND</p>
            </div>

            {/* Core Editorial Statement */}
            <div className="flex flex-col items-center justify-center flex-1 text-center w-full px-2 mt-8">
              <h1 className="font-shoulder text-6xl md:text-[100px] lg:text-[140px] xl:text-[160px] leading-[0.85] uppercase tracking-[-0.01em]">
                YOUR BUSINESS IS BETTER THAN IT<br />
                CURRENTLY LOOKS, AND YOU <span className="text-[#FFC800]">JUST</span><br />
                <span className="text-[#FFC800]">FOUND THE STUDIO</span> TO FIX THAT.
              </h1>
              
              <a 
                href="https://instagram.com/coolo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-[#FFC800] text-xs uppercase tracking-widest mt-10 md:mt-12 flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <span className="text-[14px] leading-none">&#8599;</span> FOLLOW US
              </a>
            </div>

            {/* Footer Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 w-full items-end gap-8 font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-200">
              
              {/* Layout Spacer */}
              <div className="hidden md:block"></div>

              {/* Scroll Affordance */}
              <div className="flex flex-col items-center justify-end pb-2">
                <span className="mb-4 text-[10px] text-gray-300">SCROLL TO DISCOVER</span>
                <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center transition-transform hover:translate-y-1 cursor-pointer">
                  <span className="text-gray-400 text-sm">&#8595;</span>
                </div>
              </div>

              {/* Informational Anchor */}
              <div className="flex justify-center md:justify-end">
                <p className="max-w-[420px] text-left leading-[1.6] text-gray-300">
                  GOOD BUSINESSES FREQUENTLY LOOK AND SOUND WORSE
                  THAN THE ACTUAL VALUE THEY CREATE. WE BRIDGE THAT
                  GAP, TURNING YOUR COMPLEX IDEAS AND EXPERTISE INTO
                  A CLEAR STRATEGIC DIRECTION AND BRAND EXPERIENCE.
                </p>
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </>
  );
}