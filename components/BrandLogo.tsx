import React from 'react';

// Use the paths to your uploaded images
const LOGO_LIGHT = '/logo-light.png'; 
const LOGO_DARK = '/logo-dark.png';

interface BrandLogoProps {
  className?: string;
  color?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-32", color = "#0F0328" }) => {
  // Check if we need the light logo based on the requested color
  const isLight = color === '#F7F7F7' || color === '#ffffff' || color === 'white';

  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={isLight ? LOGO_LIGHT : LOGO_DARK} 
        alt="COOLO Logo"
        className="w-full h-full object-contain transition-all duration-300"
        // Fallback to text if images fail to load
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `<span class="font-sans font-black text-2xl tracking-tighter leading-none" style="color: ${color}">COOLO</span>`;
        }}
      />
    </div>
  );
};

export default BrandLogo;
