import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-black border-b border-gray-200 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1920px] mx-auto">
        
        {/* Brand Identity */}
        <Link 
          href="/" 
          aria-label="COOLO Home" 
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <BrandLogo className="h-8 w-auto text-black fill-current" />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-bold">
          <Link href="/work" className="hover:opacity-50 transition-opacity">
            The Work
          </Link>
          <Link href="/studio" className="hover:opacity-50 transition-opacity">
            The Studio (US)
          </Link>
          <Link href="/toolbox" className="hover:opacity-50 transition-opacity">
            Toolbox
          </Link>
          <Link href="/journal" className="hover:opacity-50 transition-opacity">
            Studio Log
          </Link>
          <Link href="/contact" className="text-[#8B5CF6] hover:opacity-80 transition-opacity">
            Brief Us
          </Link>
        </nav>

        {/* Mobile Toggle (Visual Shell) */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle Menu"
        >
          <span className="block w-6 h-[2px] bg-black"></span>
          <span className="block w-6 h-[2px] bg-black"></span>
        </button>

      </div>
    </header>
  );
};

export default Header;