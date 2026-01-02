
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import BrandLogo from './assets/logos/logo.svg';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Logic: On Home, hide logo until scrolled. On other pages, always show.
  const showLogo = !isHome || isScrolled;
  
  // Logic: On Home at top, text is white (over image). When scrolled (or other pages), text is navy.
  const isLightText = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20); // Lower threshold for quicker switch
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-brand-offwhite/95 backdrop-blur-md border-b border-brand-navy/5 shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        
        {/* Logo - Hidden on Home Top, Visible otherwise */}
        <div className={`transition-all duration-500 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <Link to="/" className="block w-32">
                 <BrandLogo 
                    className="w-full h-auto" 
                    color={isLightText ? '#F7F7F7' : '#0F0328'} 
                 />
            </Link>
        </div>
        
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
                  {link.name}
                  {!isActive && <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-yellow group-hover:w-full transition-all duration-300`}></span>}
                </>
              )}
            </NavLink>
          ))}
          <Link to="/contact" className={`font-mono text-[10px] uppercase tracking-[0.2em] px-8 py-3 transition-all duration-500 font-bold border ${isLightText ? 'border-brand-offwhite text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-navy drop-shadow-sm' : 'bg-brand-purple text-brand-offwhite border-brand-purple hover:bg-brand-yellow hover:text-brand-navy hover:border-brand-yellow shadow-xl'}`}>
            Inquire
          </Link>
        </nav>

        <Link to="/contact" className={`md:hidden font-mono text-[10px] uppercase px-4 py-2 font-bold tracking-widest ${isLightText ? 'bg-brand-offwhite text-brand-navy shadow-lg' : 'bg-brand-navy text-brand-offwhite'}`}>
            Inquire
        </Link>
      </div>
    </header>
  );
};

export default Header;
