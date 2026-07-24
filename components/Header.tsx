import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import BrandLogo from './BrandLogo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null); 
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedMenu(null); 
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleSubMenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <>
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        isScrolled ? 'py-4 bg-brand-navy/85 backdrop-blur-md border-b border-white/5 shadow-lg' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-50">
        
        {/* Logo Configuration */}
        <div className="relative z-[60]">
            <Link to="/" className="block w-20 md:w-24" onClick={() => setIsOpen(false)}>
                 <BrandLogo 
                    className="w-full h-auto brightness-0 invert" 
                 />
            </Link>
        </div>
        
        {/* Desktop Interface Tracks */}
        <nav className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <div key={link.name} className="relative group">
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 relative font-bold block py-4 text-white/60 hover:text-brand-yellow ${isActive ? '!text-brand-yellow border-b-2 border-brand-yellow' : ''}`}
                >
                  {link.name.toUpperCase()}
                </NavLink>

                {/* Sub-menu Navigation Matrix */}
                {link.subLinks && (
                    <div className="absolute left-0 pt-2 w-52 hidden group-hover:block">
                        <div className="bg-platform-dark border border-white/10 shadow-2xl py-2 rounded-sm backdrop-blur-md">
                            {link.subLinks.map((sub) => (
                                <Link 
                                    key={sub.name}
                                    to={sub.path}
                                    className="block px-4 py-2.5 font-mono text-[9px] uppercase tracking-widest text-white/70 hover:bg-brand-purple hover:text-white transition-colors"
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          ))}
          <div className="flex items-center space-x-6 ml-6">
              <Link to="/contact" className="font-mono text-[10px] uppercase tracking-[0.2em] px-6 py-2.5 transition-all duration-300 font-bold bg-white text-brand-navy hover:bg-brand-purple hover:text-white border border-white">
                Inquire Now
              </Link>
          </div>
        </nav>

        {/* Mobile Command Toggle Box */}
        <div className="flex items-center gap-4 md:hidden z-[60]">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 focus:outline-none transition-colors text-white"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>
    </header>

      {/* Full-Screen Matrix Interface Deck */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="fixed inset-0 bg-brand-navy z-50 flex flex-col items-center justify-center space-y-6 md:hidden px-8 overflow-y-auto py-20"
            >
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-purple rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-yellow rounded-full blur-[100px]"></div>
                </div>

                <div className="flex flex-col items-center gap-6 relative z-10 w-full mt-12">
                    {NAV_LINKS.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (i * 0.04), duration: 0.4, ease: "easeOut" }}
                            className="w-full flex flex-col items-center"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <NavLink 
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `block font-black text-3xl uppercase tracking-tight transition-colors ${isActive ? 'text-brand-yellow' : 'text-brand-offwhite hover:text-brand-yellow'}`}
                                >
                                    {link.name}
                                </NavLink>
                                
                                {link.subLinks && (
                                    <button 
                                        onClick={() => toggleSubMenu(link.name)}
                                        className="text-brand-offwhite/50 hover:text-brand-yellow p-2"
                                    >
                                        <ChevronDown 
                                            size={20} 
                                            className={`transition-transform duration-300 ${expandedMenu === link.name ? 'rotate-180 text-brand-yellow' : ''}`}
                                        />
                                    </button>
                                )}
                            </div>
                            
                            <AnimatePresence>
                                {link.subLinks && expandedMenu === link.name && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden w-full"
                                    >
                                        <div className="flex flex-col items-center gap-3 py-4 mt-2 border-t border-white/5 w-3/4 mx-auto">
                                            {link.subLinks.map(sub => (
                                                <Link 
                                                    key={sub.name}
                                                    to={sub.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 flex flex-col items-center gap-8 w-full border-t border-white/5 pt-8"
                    >
                        <Link 
                            to="/contact" 
                            onClick={() => setIsOpen(false)}
                            className="w-full max-w-xs text-center font-mono text-xs uppercase tracking-widest px-8 py-4 border border-brand-yellow text-brand-yellow font-bold bg-transparent hover:bg-brand-yellow hover:text-brand-navy transition-all"
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