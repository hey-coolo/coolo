import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DROPS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';

const DropDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const drop = DROPS.find(d => d.slug === slug);

  const [mainImage, setMainImage] = useState(drop?.imageUrl || '');

  if (!drop) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col justify-center">
        <h1 className="text-4xl font-bold">Drop Not Found</h1>
        <Link to="/drops" className="mt-4 inline-block text-brand-muted hover:underline">Back to Drops</Link>
      </div>
    );
  }

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <AnimatedSection>
        <section className="py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4 sticky top-24 h-max">
              <div className="aspect-square bg-brand-dark/5 overflow-hidden rounded-lg">
                <img src={mainImage} alt={drop.title} className="w-full h-full object-cover"/>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {drop.galleryImages?.map((img, index) => (
                   <div 
                     key={index} 
                     className={`aspect-square bg-brand-dark/5 overflow-hidden cursor-pointer border-2 transition-colors rounded-md ${mainImage === img ? 'border-brand-accent' : 'border-transparent'}`}
                     onClick={() => handleThumbnailClick(img)}
                    >
                     <img src={img} alt={`${drop.title} thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
                   </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <p className="font-mono text-base text-brand-muted">{drop.category}</p>
              <h1 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tighter my-4">{drop.title}</h1>
              <div className="flex justify-between items-center my-6 font-mono text-xl">
                <span>{drop.price}</span>
                <span>{drop.status}</span>
              </div>
              <p className="font-body text-xl text-brand-muted leading-relaxed my-8">{drop.longDescription}</p>

              {drop.features && (
                <div className="my-8 py-8 border-t border-brand-dark/20">
                    <h3 className="font-mono text-base uppercase text-brand-muted mb-4">Features</h3>
                    <ul className="list-disc list-inside font-body text-lg space-y-2 text-brand-muted">
                        {drop.features.map(feature => <li key={feature}>{feature}</li>)}
                    </ul>
                </div>
              )}
              
              <button disabled={drop.status !== 'Live'} className="w-full mt-8 bg-brand-accent text-brand-dark font-mono font-bold uppercase tracking-wider py-5 px-8 transition-colors duration-300 text-lg hover:opacity-80 disabled:bg-brand-dark/10 disabled:text-brand-dark/40 disabled:cursor-not-allowed">
                {drop.status === 'Coming Soon' ? 'Get Notified' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default DropDetailPage;