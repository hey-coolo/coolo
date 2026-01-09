import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import BrandLogo from './BrandLogo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const location = useLocation();
  
  const isHome = location.pathname === '/';
  // Force logo visibility if menu is open, otherwise follow scroll rules
  const showLogo = !isHome || isScrolled || isOpen; 
  // Force dark text if menu is open (since menu background is dark/navy), otherwise follow home rules
  const isLightText = isHome && !isScrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-brand-offwhite/95 backdrop-blur-md border-b border-brand-navy/5 shadow-sm' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center relative z-50">
        
        {/* Logo */}
        <div className={`transition-all duration-500 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <Link to="/" className="block w-32" onClick={() => setIsOpen(false)}>
                 <BrandLogo 
                    className="w-full h-auto" 
                    // If menu is open, force light color (for navy bg), otherwise use existing logic
                    color={isOpen ? '#F7F7F7' : (isLightText ? '#F7F7F7' : '#0F0328')} 
                 />
            </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative group font-bold ${
                isLightText ? 'text-brand-offwhite hover:text-brand-yellow drop-shadow-sm' : 'text-brand-navy hover:text-brand-purple'
              } ${isActive ? (isLightText ? '!text-brand-yellow' : '!text-brand-purple underline decoration-2 underline-offset-4') : ''}`}
            >
              {({ isActive }) => (
                <>
                  {link.name.toUpperCase()}
                  {!isActive && <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-yellow group-hover:w-full transition-all duration-300`}></span>}
                </>
              )}
            </NavLink>
          ))}
          <div className="flex items-center space-x-4">
              <span className={`font-mono text-[9px] uppercase tracking-widest opacity-40 px-3 py-1.5 border border-current rounded-md font-bold transition-opacity hover:opacity-100 ${isLightText ? 'text-brand-offwhite border-brand-offwhite/30' : 'text-brand-navy border-brand-navy/10 bg-brand-navy/5'}`}>
                  V2.0_ALPHA
              </span>
              <Link to="/contact" className={`font-mono text-[10px] uppercase tracking-[0.2em] px-8 py-3 transition-all duration-500 font-bold border ${isLightText ? 'border-brand-offwhite text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-navy drop-shadow-sm' : 'bg-brand-purple text-brand-offwhite border-brand-purple hover:bg-brand-yellow hover:text-brand-navy hover:border-brand-yellow shadow-xl'}`}>
                Inquire
              </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle Button (Replaces the "Inquire" link on mobile) */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden z-50 p-2 focus:outline-none transition-colors duration-300 ${isOpen ? 'text-brand-offwhite' : (isLightText ? 'text-brand-offwhite' : 'text-brand-navy')}`}
            aria-label="Toggle Menu"
        >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 bg-brand-navy z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
            >
                {NAV_LINKS.map((link, i) => (
                    <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (i * 0.1) }}
                    >
                        <NavLink 
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `font-black text-4xl uppercase tracking-tighter transition-colors ${
                                isActive ? 'text-brand-yellow' : 'text-brand-offwhite hover:text-brand-yellow'
                            }`}
                        >
                            {link.name}
                        </NavLink>
                    </motion.div>
                ))}
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex flex-col items-center gap-6"
                >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-offwhite/50 border border-brand-offwhite/20 px-3 py-1 rounded">
                        V2.0_ALPHA
                    </span>
                    <Link 
                        to="/contact" 
                        onClick={() => setIsOpen(false)}
                        className="font-mono text-sm uppercase tracking-widest px-12 py-4 border-2 border-brand-offwhite text-brand-offwhite font-bold hover:bg-brand-offwhite hover:text-brand-navy transition-all"
                    >
                        Start Project
                    </Link>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
