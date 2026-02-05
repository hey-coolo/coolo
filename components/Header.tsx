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
  
  // Logic: 
  // 1. If Menu is OPEN -> Logo is WHITE (because bg is Navy)
  // 2. If Scrolled -> Logo is DARK (because bg is white)
  // 3. If Home & Top -> Logo is WHITE (because bg is image/dark)
  const logoColor = isOpen ? '#F7F7F7' : (isHome && !isScrolled ? '#F7F7F7' : '#0F0328');

  // Text Logic:
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
    <>
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-brand-offwhite/95 backdrop-blur-md border-b border-brand-navy/5 shadow-sm' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center relative z-50">
        
        {/* Logo */}
        <div className="relative z-[60]">
            <Link to="/" className="block w-20 md:w-24" onClick={() => setIsOpen(false)}>
                 <BrandLogo 
                    className="w-full h-auto" 
                    color={logoColor}
                 />
            </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <div key={link.name} className="relative group">
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative font-bold block py-4 ${
                    isLightText ? 'text-brand-offwhite hover:text-brand-yellow drop-shadow-sm' : 'text-brand-navy hover:text-brand-purple'
                  } ${isActive ? (isLightText ? '!text-brand-yellow' : '!text-brand-purple underline decoration-2 underline-offset-4') : ''}`}
                >
                  {link.name.toUpperCase()}
                </NavLink>

                {/* Desktop Dropdown */}
                {link.subLinks && (
                    <div className="absolute left-0 pt-2 w-48 hidden group-hover:block">
                        <div className="bg-brand-navy border border-brand-offwhite/10 shadow-xl py-2">
                            {link.subLinks.map((sub) => (
                                <Link 
                                    key={sub.name}
                                    to={sub.path}
                                    className="block px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-brand-offwhite hover:bg-brand-purple hover:text-white transition-colors"
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          ))}
          <div className="flex items-center space-x-4 ml-6">
              <span className={`font-mono text-[9px] uppercase tracking-widest opacity-40 px-3 py-1.5 border border-current rounded-md font-bold transition-opacity hover:opacity-100 ${isLightText ? 'text-brand-offwhite border-brand-offwhite/30' : 'text-brand-navy border-brand-navy/10 bg-brand-navy/5'}`}>
                  V2.1_BETA
              </span>
              <Link to="/contact" className={`font-mono text-[10px] uppercase tracking-[0.2em] px-8 py-3 transition-all duration-500 font-bold border ${isLightText ? 'border-brand-offwhite text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-navy drop-shadow-sm' : 'bg-brand-purple text-brand-offwhite border-brand-purple hover:bg-brand-yellow hover:text-brand-navy hover:border-brand-yellow shadow-xl'}`}>
                Inquire
              </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden z-[60] p-2 focus:outline-none transition-colors duration-300 ${
                // If menu is open, button must be white. If we are on dark home banner, button must be white.
                isOpen || (isHome && !isScrolled) ? 'text-brand-offwhite' : 'text-brand-navy'
            }`}
            aria-label="Toggle Menu"
        >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="fixed inset-0 bg-brand-navy z-50 flex flex-col items-center justify-center space-y-6 md:hidden px-8 overflow-y-auto py-20"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-purple rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-yellow rounded-full blur-[100px]"></div>
                </div>

                <div className="flex flex-col items-center gap-8 relative z-10 w-full">
                    {NAV_LINKS.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (i * 0.05), duration: 0.5, ease: "easeOut" }}
                            className="w-full text-center"
                        >
                            <NavLink 
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `block font-black text-4xl uppercase tracking-tighter transition-colors mb-2 ${
                                    isActive ? 'text-brand-yellow' : 'text-brand-offwhite hover:text-brand-yellow'
                                }`}
                            >
                                {link.name}
                            </NavLink>
                            
                            {/* Mobile Sublinks */}
                            {link.subLinks && (
                                <div className="flex flex-col gap-2 mb-4">
                                    {link.subLinks.map(sub => (
                                        <Link 
                                            key={sub.name}
                                            to={sub.path}
                                            onClick={() => setIsOpen(false)}
                                            className="font-mono text-xs uppercase tracking-widest text-brand-offwhite/50 hover:text-brand-white"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                    
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex flex-col items-center gap-8 w-full border-t border-brand-offwhite/10 pt-12"
                    >
                        <span className="font-mono text-[9px] uppercase tracking-widest text-brand-offwhite/50 border border-brand-offwhite/20 px-3 py-1 rounded">
                            V2.0_ALPHA
                        </span>
                        <Link 
                            to="/contact" 
                            onClick={() => setIsOpen(false)}
                            className="w-full max-w-xs text-center font-mono text-sm uppercase tracking-widest px-8 py-5 border-2 border-brand-yellow text-brand-yellow font-bold hover:bg-brand-yellow hover:text-brand-navy transition-all"
                        >
                            Start Project
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;