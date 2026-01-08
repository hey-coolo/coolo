import React from 'react';

// Root-relative path for reliability in static hosting
const logoSrc = './assets/logos/logo.svg';

interface BrandLogoProps {
  className?: string;
  color?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-32", color = "#0F0328" }) => {
  const isLight = color === '#F7F7F7' || color === '#ffffff' || color === 'white';

  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={logoSrc} 
        alt="COOLO Logo"
        className="w-full h-full object-contain transition-all duration-300"
        style={{
            filter: isLight ? 'brightness(0) invert(1)' : 'none'
        }}
        // Fallback to stylized text if SVG fails to load
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<span class="font-sans font-black text-2xl tracking-tighter leading-none">COOLO</span>';
        }}
      />
    </div>
  );
};

export default BrandLogo;