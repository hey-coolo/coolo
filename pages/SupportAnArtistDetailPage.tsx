import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { DROPS } from '../constants';
import { ArrowLeft } from 'lucide-react';

const SupportAnArtistDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  
  const drop = DROPS.find(d => d.slug === slug);

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [slug]);

  if (!drop) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
              <div className="text-center">
                  <h1 className="text-6xl font-black uppercase text-brand-navy tracking-tight">Product_Offline</h1>
                  <Link to="/support-an-artist" className="font-mono uppercase underline mt-8 block text-brand-purple tracking-widest text-xs">Return to Catalog</Link>
              </div>
          </div>
      );
  }

  const handleCheckout = async () => {
      if (drop.category === 'Apparel' && !selectedSize) {
          alert("Please select a size.");
          return;
      }
      setIsAdding(true);
      
      try {
          // This will hook into our API route (Step 4)
          const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ slug: drop.slug, size: selectedSize, price: drop.price })
          });
          const data = await res.json();
          if (data.url) {
              window.location.href = data.url; // Redirect to Stripe Checkout
          } else {
              alert("Checkout simulation complete. (API not fully wired)");
              setIsAdding(false);
          }
      } catch (err) {
          console.error(err);
          setIsAdding(false);
      }
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-8">
        
        {/* Back Nav */}
        <div className="mb-12">
            <Link to="/support-an-artist" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-brand-navy/50 hover:text-brand-purple transition-colors">
                <ArrowLeft size={14} /> Back to Collection
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT: Image Gallery */}
            <div className="lg:col-span-7 space-y-6">
                <AnimatedSection>
                    <div className="aspect-[4/5] md:aspect-square bg-brand-navy/5 border border-brand-navy/5 overflow-hidden">
                        <img 
                            src={drop.imageUrl} 
                            alt={drop.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </AnimatedSection>
                
                {drop.galleryImages && drop.galleryImages.length > 1 && (
                    <div className="grid grid-cols-2 gap-6">
                        {drop.galleryImages.slice(1).map((img, i) => (
                            <AnimatedSection key={i} delay={i * 100}>
                                <div className="aspect-square bg-brand-navy/5 border border-brand-navy/5 overflow-hidden">
                                    <img src={img} alt={`${drop.title} detail ${i}`} className="w-full h-full object-cover" />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                )}
            </div>

            {/* RIGHT: Sticky Product Details */}
            <div className="lg:col-span-5 relative">
                <div className="lg:sticky lg:top-32 space-y-10">
                    <AnimatedSection delay={100}>
                        <div className="border-b border-brand-navy/10 pb-8">
                            <span className={`font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-6 inline-block ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-white'}`}>
                                {drop.status}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-brand-navy leading-[0.9] mb-4">
                                {drop.title}
                            </h1>
                            <div className="text-3xl font-sans font-bold text-brand-navy">
                                ${drop.price} <span className="text-lg text-brand-navy/40">NZD</span>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={150}>
                        <div className="font-body text-lg leading-relaxed text-brand-navy/80 font-light">
                            {drop.longDescription || drop.description}
                        </div>
                    </AnimatedSection>

                    {/* Sizing (If Apparel) */}
                    {drop.category === 'Apparel' && (
                        <AnimatedSection delay={200}>
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/50">Select Size</span>
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple cursor-pointer hover:underline">Size Guide</span>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {['S', 'M', 'L', 'XL'].map(size => (
                                        <button 
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-4 font-mono text-sm uppercase font-bold border transition-all ${selectedSize === size ? 'bg-brand-navy text-white border-brand-navy' : 'border-brand-navy/20 bg-transparent text-brand-navy hover:border-brand-navy'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Add to Cart / Actions */}
                    <AnimatedSection delay={250}>
                        <div className="pt-6 border-t border-brand-navy/10">
                            <button 
                                onClick={handleCheckout}
                                disabled={drop.status !== 'Live' || isAdding}
                                className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-black text-sm tracking-widest py-6 hover:bg-brand-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
                            >
                                {isAdding ? 'PROCESSING...' : drop.status === 'Live' ? 'ADD TO CART — FUND ARTIST' : 'OUT OF STOCK'}
                            </button>
                            <p className="text-center font-mono text-[9px] uppercase tracking-widest text-brand-navy/40 mt-6">
                                Secure Checkout. Global Shipping.
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* Features / Specs */}
                    {drop.features && drop.features.length > 0 && (
                        <AnimatedSection delay={300}>
                            <div className="bg-white border border-brand-navy/5 p-8 mt-12">
                                <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy mb-6">Specifications</h4>
                                <ul className="space-y-3">
                                    {drop.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand-navy/60">
                                            <span className="w-1.5 h-1.5 bg-brand-purple rounded-full"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SupportAnArtistDetailPage;