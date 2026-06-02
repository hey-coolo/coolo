import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Drop, DropVariant } from '../types';
import { useCart } from '../context/CartContext';

const SupportAnArtistDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [drop, setDrop] = useState<Drop | null>(null);
  const [otherDrops, setOtherDrops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<DropVariant | null>(null);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
      window.scrollTo(0, 0);
      setAddedMessage(false);
      
      const fetchProductAndCatalog = async () => {
          setIsLoading(true);
          try {
              // 1. Fetch current detail product
              const res = await fetch(`/api/products?id=${slug}&t=${Date.now()}`);
              const data = await res.json();

              if (!res.ok) throw new Error(data.error || `API returned ${res.status}`);
              
              if (data && data.slug) {
                  setDrop(data);
                  if (data.variants && data.variants.length > 0) {
                      const firstAvailable = data.variants.find((v: DropVariant) => v.available);
                      if (firstAvailable) setSelectedVariant(firstAvailable);
                  }
              }

              // 2. Fetch full catalog for the alternative recommendations grid at bottom
              const listRes = await fetch(`/api/products?t=${Date.now()}`);
              if (listRes.ok) {
                  const listData = await listRes.json();
                  if (Array.isArray(listData)) {
                      // Filter out the active item to display other products
                      setOtherDrops(listData.filter((item: any) => item.slug !== slug).slice(0, 3));
                  }
              }
          } catch (error: any) {
              setErrorMsg(error.message);
          } finally {
              setIsLoading(false);
          }
      };

      if (slug) fetchProductAndCatalog();
  }, [slug]);

  const handleAddToBasket = () => {
      if (!drop) return;
      if (drop.variants && drop.variants.length > 1 && !selectedVariant) {
          alert("Please select an option.");
          return;
      }
      
      addToCart({
          slug: drop.slug,
          title: drop.title,
          variantTitle: selectedVariant?.title || 'Standard',
          variantId: selectedVariant?.id || drop.slug,
          price: selectedVariant?.price || drop.price,
          imageUrl: drop.imageUrl,
          quantity: 1
      });

      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 3000);
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
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-32 font-sans text-brand-navy">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        
        {/* Navigation Toolbar */}
        <div className="mb-12 border-b border-brand-navy/10 pb-6 flex justify-between items-center">
            <Link to="/support-an-artist" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-brand-navy/50 hover:text-brand-purple transition-colors">
                <ArrowLeft size={14} /> Back to Collection
            </Link>
            <Link to="/support-an-artist" className="font-mono text-[10px] uppercase font-bold tracking-widest text-brand-purple hover:text-brand-navy transition-colors border-b border-brand-purple pb-0.5">
                Continue Shopping
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start pb-24">
            
            {/* LEFT: Lookbook Image */}
            <div className="lg:col-span-6 space-y-6">
                <AnimatedSection>
                    <div className="w-full bg-white border border-brand-navy/10 flex items-center justify-center p-8 md:p-16">
                        {drop.imageUrl && (
                            <img 
                                src={drop.imageUrl} 
                                alt={drop.title} 
                                className="w-full h-auto object-contain max-w-[500px] mix-blend-multiply" 
                            />
                        )}
                    </div>
                </AnimatedSection>
            </div>

            {/* RIGHT: Product Info & Basket Action Deck */}
            <div className="lg:col-span-6 relative">
                <div className="lg:sticky lg:top-32 space-y-10">
                    
                    {/* Header Block */}
                    <AnimatedSection delay={100}>
                        <div className="border-b border-brand-navy/10 pb-8">
                            <span className={`font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-6 inline-block shadow-sm ${drop.status === 'Live' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-navy text-brand-offwhite'}`}>
                                {drop.status}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-navy leading-[0.85] mb-6">
                                {drop.title.replace(/_/g, ' ')}
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
                        <div className="font-body text-sm md:text-base leading-relaxed text-brand-navy/70 font-light">
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

                    {/* Add to Basket Action */}
                    <AnimatedSection delay={250}>
                        <div className="pt-4 space-y-4">
                            <button 
                                onClick={handleAddToBasket}
                                disabled={drop.status !== 'Live'}
                                className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-black text-sm tracking-[0.2em] py-6 hover:bg-brand-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[8px_8px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FCC803] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none flex items-center justify-center gap-3"
                            >
                                <ShoppingBag size={18} />
                                {drop.status === 'Live' ? 'ADD TO BASKET — FUND ARTIST' : 'OUT OF STOCK'}
                            </button>
                            
                            <AnimatePresence>
                                {addedMessage && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-green-50 text-green-800 border border-green-200 p-4 text-center font-mono text-xs uppercase font-bold flex justify-between items-center"
                                    >
                                        <span>✓ Item secured in basket.</span>
                                        <Link to="/checkout" className="underline hover:text-brand-purple">Go to checkout &rarr;</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <p className="text-center font-mono text-[9px] uppercase tracking-widest text-brand-navy/40 mt-4">
                                Secure local gateway. Global Fulfillment.
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* Specifications */}
                    {drop.features && drop.features.length > 0 && (
                        <AnimatedSection delay={300}>
                            <div className="bg-white border border-brand-navy/10 p-8 shadow-sm">
                                <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-navy mb-6 border-b border-brand-navy/10 pb-4">
                                    Specifications
                                </h4>
                                <ul className="space-y-4">
                                    {drop.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-4 font-body text-sm text-brand-navy/80">
                                            <span className="w-1 h-1 bg-brand-navy shrink-0 mt-2 rounded-full"></span>
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

        {/* --- DYNAMIC RELATED DROPS LOOP (MORE PRODUCTS) --- */}
        {otherDrops.length > 0 && (
            <section className="border-t-2 border-brand-navy pt-24 mt-24">
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-16 gap-6">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter m-0">
                        More Drops.
                    </h2>
                    <Link to="/support-an-artist" className="font-mono text-xs uppercase font-bold border-b border-brand-navy pb-1">
                        View Entire Catalogue &rarr;
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {otherDrops.map((item, idx) => (
                        <AnimatedSection key={item.slug} delay={idx * 100}>
                            <Link to={`/support-an-artist/${item.slug}`} className="group block">
                                <div className="aspect-[4/5] bg-white border border-brand-navy/10 p-6 flex items-center justify-center overflow-hidden mb-4 group-hover:border-brand-navy transition-colors">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex justify-between items-start font-mono text-xs uppercase tracking-tight font-bold">
                                    <h4 className="truncate max-w-[70%] text-brand-navy group-hover:text-brand-purple transition-colors">{item.title.replace(/_/g, ' ')}</h4>
                                    <span className="text-brand-navy/60">${item.price}</span>
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        )}

      </div>
    </div>
  );
};

export default SupportAnArtistDetailPage;