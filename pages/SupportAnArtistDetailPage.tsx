import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowLeft } from 'lucide-react';
import { Drop, DropVariant } from '../types';

const SupportAnArtistDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [drop, setDrop] = useState<Drop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<DropVariant | null>(null);

  useEffect(() => {
      window.scrollTo(0, 0);
      
      const fetchProduct = async () => {
          setIsLoading(true);
          try {
              const res = await fetch(`/api/products?id=${slug}&t=${Date.now()}`);
              const data = await res.json();

              if (!res.ok) throw new Error(data.error || `API returned ${res.status}`);
              
              if (data && data.slug) {
                  setDrop(data);
                  if (data.variants && data.variants.length > 0) {
                      const firstAvailable = data.variants.find((v: DropVariant) => v.available);
                      if (firstAvailable) setSelectedVariant(firstAvailable);
                  }
              } else {
                  throw new Error("Invalid payload format");
              }
          } catch (error: any) {
              setErrorMsg(error.message);
          } finally {
              setIsLoading(false);
          }
      };

      if (slug) fetchProduct();
  }, [slug]);

  const handleCheckout = () => {
      if (drop?.variants && drop.variants.length > 0 && !selectedVariant) {
          alert("Please select an option.");
          return;
      }
      
      navigate('/checkout', {
          state: {
              slug: drop?.slug,
              title: drop?.title,
              variantTitle: selectedVariant?.title,
              price: selectedVariant?.price || drop?.price,
              variantId: selectedVariant?.id,
              imageUrl: drop?.imageUrl
          }
      });
  };

  if (isLoading) {
      return (
          <div className="min-h-screen pt-48 flex justify-center bg-brand-offwhite">
              <span className="font-mono uppercase tracking-widest font-bold text-brand-navy/50 animate-pulse">Syncing data...</span>
          </div>
      );
  }

  if (errorMsg || !drop) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
              <div className="text-center p-8 border-2 border-red-500 bg-red-50 text-red-700 max-w-lg font-mono shadow-[8px_8px_0px_#0F0328]">
                  <h1 className="text-2xl font-black uppercase tracking-tight mb-4">Product Offline</h1>
                  <p>{errorMsg}</p>
                  <Link to="/support-an-artist" className="uppercase underline mt-8 block tracking-widest text-xs">Return to Catalog</Link>
              </div>
          </div>
      );
  }

  const hasMultipleOptions = drop.variants && drop.variants.length > 1;

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        
        {/* Back Navigation */}
        <div className="mb-12 border-b border-brand-navy/10 pb-6">
            <Link to="/support-an-artist" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-brand-navy/50 hover:text-brand-purple transition-colors">
                <ArrowLeft size={14} /> Back to Collection
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LEFT: Lookbook Image */}
            <div className="lg:col-span-6 space-y-6">
                <AnimatedSection>
                    <div className="w-full bg-white border border-brand-navy/10 flex items-center justify-center p-8 md:p-16">
                        {drop.imageUrl && (
                            <img 
                                src={drop.imageUrl} 
                                alt={drop.title} 
                                className="w-full h-auto object-contain max-w-[500px]" 
                            />
                        )}
                    </div>
                </AnimatedSection>
            </div>

            {/* RIGHT: Product Info & Commerce Engine */}
            <div className="lg:col-span-6 relative">
                <div className="lg:sticky lg:top-32 space-y-10">
                    
                    {/* Header Block */}
                    <AnimatedSection delay={100}>
                        <div className="border-b border-brand-navy/10 pb-8">
                            <span className={`font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-6 inline-block shadow-sm ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-brand-offwhite'}`}>
                                {drop.status}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85] mb-6">
                                {drop.title}
                            </h1>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl md:text-5xl font-sans font-black text-brand-navy">
                                    ${selectedVariant ? selectedVariant.price : drop.price}
                                </span>
                                <span className="font-mono text-sm tracking-widest text-brand-navy/40 font-bold mb-1">
                                    NZD
                                </span>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Description */}
                    <AnimatedSection delay={150}>
                        <div className="font-body text-lg leading-relaxed text-brand-navy/70 font-light">
                            {drop.longDescription || drop.description}
                        </div>
                    </AnimatedSection>

                    {/* Variants / Sizing Grid */}
                    {hasMultipleOptions && (
                        <AnimatedSection delay={200}>
                            <div>
                                <div className="flex justify-between items-end mb-4 border-b border-brand-navy/5 pb-2">
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/50">
                                        Select Option
                                    </span>
                                </div>

                                {/* Buttons */}
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                    {drop.variants?.map(variant => (
                                        <button 
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            disabled={!variant.available}
                                            className={`py-4 px-2 font-mono text-xs uppercase font-bold border-2 transition-all duration-300 ${
                                                !variant.available 
                                                ? 'opacity-30 cursor-not-allowed border-brand-navy/10 bg-brand-navy/5 text-brand-navy/50' 
                                                : selectedVariant?.id === variant.id 
                                                    ? 'bg-brand-navy text-brand-offwhite border-brand-navy shadow-[4px_4px_0px_#FCC803] translate-x-[-2px] translate-y-[-2px]' 
                                                    : 'border-brand-navy/10 bg-white text-brand-navy hover:border-brand-navy hover:bg-brand-navy/5'
                                            }`}
                                        >
                                            {variant.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Add to Cart Engine */}
                    <AnimatedSection delay={250}>
                        <div className="pt-8">
                            <button 
                                onClick={handleCheckout}
                                disabled={drop.status !== 'Live'}
                                className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-black text-sm tracking-[0.2em] py-6 hover:bg-brand-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[8px_8px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FCC803] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
                            >
                                {drop.status === 'Live' ? 'ADD TO CART — FUND ARTIST' : 'OUT OF STOCK'}
                            </button>
                            <p className="text-center font-mono text-[9px] uppercase tracking-widest text-brand-navy/40 mt-6">
                                Secure Checkout. Global Shipping.
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* Specifications */}
                    {drop.features && drop.features.length > 0 && (
                        <AnimatedSection delay={300}>
                            <div className="bg-white border border-brand-navy/10 p-8 mt-12 shadow-sm">
                                <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy mb-6 border-b border-brand-navy/10 pb-4">
                                    Specifications
                                </h4>
                                <ul className="space-y-4">
                                    {drop.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-4 font-mono text-xs uppercase tracking-widest text-brand-navy/70 font-bold">
                                            <span className="w-1.5 h-1.5 bg-brand-purple shrink-0 mt-1"></span>
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