
import React from 'react';

// Use a static path relative to index.html to avoid module resolution errors
// when a bundler is not configured to handle .svg imports.
const logoSrc = 'assets/logos/logo.svg';

interface BrandLogoProps {
  className?: string;
  color?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-32", color = "#0F0328" }) => {
  // Logic: 
  // The default logo.svg should be BLACK or NAVY.
  // If the requested color is light (e.g. #F7F7F7), we invert it to white.
  // If the requested color is dark, we leave it as is.
  
  const isLight = color === '#F7F7F7' || color === '#ffffff' || color === 'white';

  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={logoSrc} 
        alt="coolo_full logo"
        className="w-full h-full object-contain transition-all duration-300"
        style={{
            // If the requested color is light, invert the dark logo to make it white.
            // This assumes the source logo.svg is dark.
            filter: isLight ? 'brightness(0) invert(1)' : 'none'
        }}
      />
    </div>
  );
};

export default BrandLogo;
