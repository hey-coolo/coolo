import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll state for subtle background transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'Playbook', path: '/playbook' },
    { name: 'Journal', path: '/journal' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-coolo-dark/90 backdrop-blur-md py-4' : 'bg-transparent py-8'
        } px-6 md:px-12 flex justify-between items-center text-white`}
      >
        {/* Brand Identity */}
        <Link 
          to="/" 
          className="relative z-50 transition-opacity hover:opacity-70 focus:outline-none" 
          aria-label="COOLO Studio Home"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <BrandLogo />
        </Link>

        {/* Desktop Navigation - Space Mono */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-mono text-xs uppercase tracking-widest transition-opacity hover:opacity-100 ${
                location.pathname === link.path ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 font-mono text-xs uppercase tracking-widest focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-white hover:opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;