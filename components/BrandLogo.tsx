import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', className = 'h-8' }) => {
  const logoSrc = variant === 'light' 
    ? './assets/logos/logo-light.svg' 
    : './assets/logos/logo-dark.svg';

  return (
    <img 
      src={logoSrc} 
      alt="COOLO" 
      className={className}
      onError={(e) => {
        // Fallback to text if SVG fails to load
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement!.innerHTML = '<span class="font-black text-2xl tracking-tighter">COOLO</span>';
      }}
    />
  );
};

export default BrandLogo;