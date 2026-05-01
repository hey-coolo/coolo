import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const DropsPage: React.FC = () => {
  return (
    <div className="w-full bg-brand-light">
      {/* Section 01: Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 border-b border-brand-dark/10">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="font-mono text-sm md:text-base font-bold uppercase tracking-widest text-brand-dark/50 mb-6">
              [ INTERNAL LAB: LIVE ]
            </div>
            <h1 className="font-sans text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-brand-dark mb-8">
              F*CK EXPOSURE.<br />
              PAY THE TALENT.
            </h1>
            <p className="font-body text-xl md:text-2xl text-brand-muted max-w-3xl mb-10 leading-relaxed">
              The Playground is now a Patronage. Limited-run drops, designed by independent artists, backed by COOLO. You get cult-level goods. They get the funding to keep creating.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#active-drop" className="inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-brand-light font-sans font-bold uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-brand-dark transition-colors duration-300">
                VIEW THE CURRENT DROP →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 02: The Manifesto */}
      <section className="py-24 md:py-32 px-4 border-b border-brand-dark/10 bg-brand-light/50">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tight text-brand-dark mb-8">
              Exposure doesn't pay the rent.
            </h2>
            <div className="font-body text-lg md:text-xl text-brand-muted space-y-6 leading-relaxed">
              <p>
                The creative industry loves to pay artists in "reach" and "opportunities." We think that's garbage. Support An Artist is our commercial engine designed to put money directly into the hands of the people making the culture.
              </p>
              <p>
                We partner with the sharpest independent minds to launch exclusive, small-batch physical and digital goods. No middlemen. No corporate bloat. Just raw creative power translated into objects you actually want to own.
              </p>
              <p>
                When you buy here, you aren't just buying a hoodie, a print, or a digital asset. You are funding the next wave of independent art.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 03: The Active Drop (E-commerce Block) */}
      <section id="active-drop" className="py-24 md:py-32 px-4 border-b border-brand-dark/10">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Product Imagery */}
              <div className="relative group">
                <div className="aspect-[4/5] bg-brand-dark/5 overflow-hidden">
                  {/* Pulling the UNMPLYMNT hero image as the active drop placeholder */}
                  <img 
                    src="/assets/cases/unmplymnt/Hero.webp" 
                    alt="The Unmplymnt Heavyweight / Batch 01" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Scarcity / Live Tag */}
                <div className="absolute top-6 left-6 font-mono text-sm font-bold bg-brand-accent text-brand-dark px-3 py-1 uppercase tracking-widest">
                  LIVE DROP
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-center">
                <div className="font-mono text-xs md:text-sm font-bold text-brand-muted mb-4 tracking-widest uppercase">
                  GUEST ARTIST 01: [ARTIST NAME] // LOCATION: [CITY]
                </div>
                <h2 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tight text-brand-dark mb-6 leading-none">
                  THE UNMPLYMNT <br/>HEAVYWEIGHT
                </h2>
                <div className="font-body text-lg text-brand-muted space-y-4 mb-8">
                  <p>
                    No mass production. No cheap blanks. [Artist Name] designed this to be lived in, worn out, and beaten up. Made from 100% recycled industrial cotton. Brutalist typography. Zero compromises.
                  </p>
                </div>
                
                {/* Scarcity Injector */}
                <div className="font-mono text-sm md:text-base font-bold text-brand-accent bg-brand-dark inline-block px-4 py-2 mb-10 w-max uppercase tracking-widest">
                  STRICTLY LIMITED TO 100 UNITS. NEVER REPRINTED.
                </div>

                <div className="text-4xl font-sans font-black tracking-tight text-brand-dark mb-8">
                  $120.00 <span className="text-lg text-brand-muted font-normal">NZD</span>
                </div>

                {/* E-comm Checkout hook (Ready for Stripe / Shopify Buy Button / POD API) */}
                <div className="space-y-4">
                  <button 
                    className="w-full py-5 bg-brand-dark text-brand-light font-sans font-black uppercase tracking-widest text-lg hover:bg-brand-accent hover:text-brand-dark transition-colors duration-300 flex items-center justify-center gap-3"
                    onClick={() => alert('POD Integration Hook: Open checkout modal or redirect to Stripe checkout here.')}
                  >
                    FUND THE ARTIST — ADD TO CART
                  </button>
                  <p className="font-mono text-xs text-brand-muted text-center tracking-wide uppercase">
                    Secure checkout. Shipping worldwide. 100% of the artist's cut goes directly to them.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 04: The Archive / Ghost Yard */}
      <section className="py-24 md:py-32 px-4 bg-brand-dark text-brand-light">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
                THE GHOST YARD.
              </h2>
              <p className="font-body text-xl max-w-2xl text-brand-light/70 leading-relaxed">
                Previous drops. Gone forever. If you missed it, you missed it. Don't make the same mistake twice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Archive Item 1 */}
              <div className="group block relative">
                <div className="aspect-[4/3] overflow-hidden bg-brand-dark border border-brand-light/20 relative">
                  <img 
                    src="/assets/cases/the-cartridges/Hero.webp" 
                    alt="The Cartridge Series" 
                    className="w-full h-full object-cover opacity-50 grayscale transition-all duration-500 group-hover:opacity-80 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono font-bold text-2xl uppercase tracking-widest border-2 border-brand-light px-6 py-2 rotate-[-5deg]">
                      SOLD OUT
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <h3 className="font-sans text-2xl font-bold uppercase tracking-tight">The Cartridge Series</h3>
                  <span className="font-mono text-xs text-brand-light/50 uppercase tracking-widest">Archive 02</span>
                </div>
              </div>

              {/* Archive Item 2 */}
              <div className="group block relative">
                <div className="aspect-[4/3] overflow-hidden bg-brand-dark border border-brand-light/20 relative">
                  <img 
                    src="/assets/cases/franca-austral/Hero.webp" 
                    alt="Franca Austral Print" 
                    className="w-full h-full object-cover opacity-50 grayscale transition-all duration-500 group-hover:opacity-80 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono font-bold text-2xl uppercase tracking-widest border-2 border-brand-light px-6 py-2 rotate-[2deg]">
                      SOLD OUT
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <h3 className="font-sans text-2xl font-bold uppercase tracking-tight">Franca Austral Print</h3>
                  <span className="font-mono text-xs text-brand-light/50 uppercase tracking-widest">Archive 01</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer / Final Push */}
      <section className="py-24 md:py-32 px-4 bg-brand-accent text-brand-dark border-t border-brand-dark/10">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tight mb-8">
              ARE YOU THE NEXT ARTIST?
            </h2>
            <p className="font-body text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              We are always looking for dangerous ideas. If your work is sharp enough, we’ll fund it, build it, and launch it with you.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-brand-dark text-brand-light font-sans font-black uppercase tracking-widest text-lg hover:bg-black transition-colors duration-300">
              PITCH YOUR DROP
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default DropsPage;