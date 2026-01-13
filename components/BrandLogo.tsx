import React, { useState } from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  color?: string; // Accepting explicit color override if needed
}

const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', className = 'h-8' }) => {
  const [hasError, setHasError] = useState(false);

  const logoSrc = variant === 'light' 
    ? '/assets/logos/logo-light.svg' 
    : '/assets/logos/logo-dark.svg';

  if (hasError) {
    return (
      <span className="font-black text-2xl tracking-tighter">
        COOLO
      </span>
    );
  }

  return (
    <img 
      src={logoSrc} 
      alt="00 COOLO" 
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default BrandLogo;