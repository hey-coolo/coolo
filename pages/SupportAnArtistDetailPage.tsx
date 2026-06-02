import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowLeft } from 'lucide-react';
import { Drop, DropVariant } from '../types';

const SIZE_GUIDE_DATA = [
  { size: 'XS', l: '68.6', w: '42', c: '78.7-86.4' },
  { size: 'S', l: '71.1', w: '45.7', c: '86.4-94' },
  { size: 'M', l: '73.7', w: '50.8', c: '96.5-104.1' },
  { size: 'L', l: '76.2', w: '55.9', c: '106.7-114.3' },
  { size: 'XL', l: '78.7', w: '61', c: '116.8-124.5' },
  { size: '2XL', l: '81.3', w: '66', c: '127-134.6' },
  { size: '3XL', l: '83.8', w: '71.1', c: '137.2-144.8' }
];

const SupportAnArtistDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [drop, setDrop] = useState<Drop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<DropVariant | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

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
              <div className="text-center p-8 border-2 border-red-500 bg-red-50 text-red-700 max-w-lg font-mono">
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
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12">
            <Link to="/support-an-artist" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-brand-navy/50 hover:text-brand-purple transition-colors">
                <ArrowLeft size={14} /> Back to Collection
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* LEFT: Lookbook Image (Just the main one for now) */}
            <div className="lg:col-span-7 space-y-6 md:space-y-12">
                <AnimatedSection>
                    <div className="w-full bg-white border border-brand-navy/5 overflow-hidden shadow-sm">
                        {drop.imageUrl && <img src={drop.imageUrl} alt={drop.title} className="w-full h-auto object-cover" />}
                    </div>
                </AnimatedSection>
            </div>

            {/* RIGHT: Sticky Product Information */}
            <div className="lg:col-span-5 relative">
                <div className="lg:sticky lg:top-32 space-y-10">
                    <AnimatedSection delay={100}>
                        <div className="border-b border-brand-navy/10 pb-8">
                            <span className={`font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-6 inline-block ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-white'}`}>
                                {drop.status}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-navy leading-[0.9] mb-4">
                                {drop.title.replace(/_/g, ' ')}
                            </h1>
                            <div className="text-3xl font-sans font-bold text-brand-navy">
                                ${selectedVariant ? selectedVariant.price : drop.price} <span className="text-lg text-brand-navy/40">NZD</span>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={150}>
                        <div className="font-body text-lg leading-relaxed text-brand-navy/80 font-light">
                            {drop.longDescription || drop.description}
                        </div>
                    </AnimatedSection>

                    {/* Sizing / Variants */}
                    {hasMultipleOptions && (
                        <AnimatedSection delay={200}>
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy/50">Select Option</span>
                                    <button 
                                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                                        className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-purple hover:text-brand-navy transition-colors border-b border-brand-purple pb-0.5"
                                    >
                                        {showSizeGuide ? 'Close Guide' : 'Size Guide'}
                                    </button>
                                </div>

                                {showSizeGuide && (
                                    <div className="mb-6 p-6 border border-brand-navy/10 bg-white font-mono text-xs text-brand-navy/80 leading-relaxed shadow-sm">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-brand-navy/20 uppercase tracking-widest text-[9px] text-brand-navy/50">
                                                        <th className="py-2">Size</th>
                                                        <th className="py-2">Length (cm)</th>
                                                        <th className="py-2">Width (cm)</th>
                                                        <th className="py-2">Chest (cm)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {SIZE_GUIDE_DATA.map((row) => (
                                                        <tr key={row.size} className="border-b border-brand-navy/5 last:border-0 text-[11px] font-bold">
                                                            <td className="py-2 text-brand-purple">{row.size}</td>
                                                            <td className="py-2">{row.l}</td>
                                                            <td className="py-2">{row.w}</td>
                                                            <td className="py-2">{row.c}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="mt-4 text-[9px] uppercase tracking-widest text-brand-navy/40">Measurements are provided by Printful. Items run true to size.</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-3">
                                    {drop.variants?.map(variant => (
                                        <button 
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            disabled={!variant.available}
                                            className={`py-4 px-2 font-mono text-xs uppercase font-bold border transition-all ${
                                                !variant.available ? 'opacity-30 cursor-not-allowed border-brand-navy/10' :
                                                selectedVariant?.id === variant.id ? 'bg-brand-navy text-white border-brand-navy' : 'border-brand-navy/20 bg-transparent text-brand-navy hover:border-brand-navy'
                                            }`}
                                        >
                                            {variant.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    <AnimatedSection delay={250}>
                        <div className="pt-6 border-t border-brand-navy/10">
                            <button 
                                onClick={handleCheckout}
                                disabled={drop.status !== 'Live'}
                                className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-black text-sm tracking-widest py-6 hover:bg-brand-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
                            >
                                {drop.status === 'Live' ? 'ADD TO CART — FUND ARTIST' : 'OUT OF STOCK'}
                            </button>
                            <p className="text-center font-mono text-[9px] uppercase tracking-widest text-brand-navy/40 mt-6">
                                Secure Checkout. Global Shipping.
                            </p>
                        </div>
                    </AnimatedSection>

                    {drop.features && drop.features.length > 0 && (
                        <AnimatedSection delay={300}>
                            <div className="bg-white border border-brand-navy/5 p-8 mt-12">
                                <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy mb-6">Specifications</h4>
                                <ul className="space-y-3">
                                    {drop.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand-navy/60">
                                            <span className="w-1.5 h-1.5 bg-brand-purple rounded-full shrink-0"></span>
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