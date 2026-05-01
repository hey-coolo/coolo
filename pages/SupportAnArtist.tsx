import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

// Local mock data array - move this to constants.ts when hooking up your POD backend or CMS
const ACTIVE_DROPS = [
  {
    id: '01',
    artist: 'elFranco',
    location: 'Tauranga',
    title: 'THE UNMPLYMNT',
    description: 'No mass production. No cheap blanks. Designed to be lived in, worn out, and beaten up. Made from 100% recycled industrial cotton. Brutalist typography. Zero compromises.',
    scarcity: 'STRICTLY LIMITED TO 50 UNITS. NEVER REPRINTED.',
    price: '160.00',
    currency: 'NZD',
    image: '/assets/cases/unmplymnt/Hero.webp', // Placeholder using existing asset
  },
  {
    id: '02',
    artist: 'Lariana',
    location: 'Tauranga',
    title: 'THE FLOWER POWER HOODIE',
    description: 'Built for the world. 450gsm heavyweight fleece. Drop shoulder fit with distressed screen printing. If you know, you know.',
    scarcity: 'ONLY 30 MINTED. NO RESTOCKS.',
    price: '150.00',
    currency: 'NZD',
    image: '/assets/cases/the-cartridges/Hero.webp', // Placeholder using existing asset
  }
];

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
              SUPPORT AN<br />
              ARTIST
            </h1>
            <p className="font-body text-xl md:text-2xl text-brand-muted max-w-3xl mb-10 leading-relaxed">
              Limited-run drops, designed for independent artists, backed by COOLO. You get exclusive goods. Artist get the funding to keep creating.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#active-drops" className="inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-brand-offwhite font-sans font-bold uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-brand-dark transition-colors duration-300">
                VIEW CURRENT DROPS
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
              Exposure doesn't always pays the rent.
            </h2>
            <div className="font-body text-lg md:text-xl text-brand-muted space-y-6 leading-relaxed">
              <p>
                The creative industry loves to pay artists in "reach" and "opportunities." Support An Artist is our commercial engine designed to put money directly into the hands of the people making the culture.
              </p>
              <p>
                We partner with the independent minds to launch exclusive, small-batch physical goods.
              </p>
              <p>
                When you buy here, you aren't just buying a hoodie, or a print. You are funding an independent artist.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 03: The Active Drops (E-commerce Blocks) */}
      <section id="active-drops" className="py-12 md:py-24">
        {ACTIVE_DROPS.map((drop, index) => (
          <div key={drop.id} className="px-4 py-16 md:py-24 border-b border-brand-dark/10 last:border-b-0">
            <div className="container mx-auto max-w-6xl">
              <AnimatedSection delay={index * 100}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                  {/* Product Imagery */}
                  <div className="relative group">
                    <div className="aspect-[4/5] bg-brand-dark/5 overflow-hidden">
                      <img 
                        src={drop.image} 
                        alt={drop.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Scarcity / Live Tag */}
                    <div className="absolute top-6 left-6 font-mono text-sm font-bold text-brand-dark px-3 py-1 uppercase tracking-widest">
                      LIVE DROP {drop.id}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col justify-center">
                    <div className="font-mono text-xs md:text-sm font-bold text-brand-muted mb-4 tracking-widest uppercase">
                      GUEST ARTIST {drop.id}: {drop.artist} // LOCATION: {drop.location}
                    </div>
                    <h2 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tight text-brand-dark mb-6 leading-none">
                      {drop.title}
                    </h2>
                    <div className="font-body text-lg text-brand-muted space-y-4 mb-8">
                      <p>{drop.description}</p>
                    </div>
                    
                    {/* Scarcity Injector */}
                    <div className="font-mono text-sm md:text-base font-bold text-brand-dark inline-block px-4 py-2 mb-10 w-max uppercase tracking-widest">
                      {drop.scarcity}
                    </div>

                    <div className="text-4xl font-sans font-black tracking-tight text-brand-dark mb-8">
                      ${drop.price} <span className="text-lg text-brand-muted font-normal">{drop.currency}</span>
                    </div>

                    {/* E-comm Checkout hook (Ready for Stripe / Shopify Buy Button / POD API) */}
                    <div className="space-y-4">
                      <button 
                        className="w-full py-5 bg-brand-dark text-brand-offwhite font-sans font-dark uppercase tracking-widest text-lg hover:bg-brand-offwhite hover:text-brand-dark transition-colors duration-300 flex items-center justify-center gap-3"
                        onClick={() => alert(`POD Integration Hook: Trigger checkout for ${drop.title}`)}
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
          </div>
        ))}
      </section>

      {/* Footer / Final Push */}
      <section className="py-24 md:py-32 px-4 bg-brand-accent text-brand-dark border-t border-brand-dark/10">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tight mb-8">
              ARE YOU THE NEXT ARTIST?
            </h2>
            <p className="font-body text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              We are always looking for dangerous ideas. If your work is sharp enough, we'll fund it, build it, and launch it with you.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-brand-dark text-brand-offwhite font-sans font-black uppercase tracking-widest text-lg hover:bg-black transition-colors duration-300">
              PITCH YOUR DROP
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default DropsPage;