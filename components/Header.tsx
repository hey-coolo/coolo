import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { state } = useCart();

    const isDarkBg = location.pathname === '/' || location.pathname === '/work';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Work', path: '/work' },
        { name: 'Studio', path: '/about' },
        { name: 'Clarity', path: '/clarity' },
        { name: 'Design Power', path: '/design-power' },
        { name: 'Partnership', path: '/partnership' },
        { name: 'Journal', path: '/journal' }
    ];

    const textColorClass = isScrolled 
        ? 'text-brand-navy' 
        : (isDarkBg ? 'text-brand-offwhite' : 'text-brand-navy');

    const headerBgClass = isScrolled
        ? 'bg-brand-offwhite/95 backdrop-blur-md shadow-sm border-b border-brand-navy/10'
        : 'bg-transparent border-b border-transparent';

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}>
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo - Left */}
                <Link to="/" className="relative z-50 shrink-0" aria-label="COOLO Home">
                    <BrandLogo 
                        className={`h-6 w-auto transition-colors duration-300 ${isScrolled || mobileMenuOpen ? 'text-brand-navy' : textColorClass}`} 
                    />
                </Link>

                {/* Desktop Navigation - Center */}
                <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-mono text-[10px] uppercase tracking-widest font-bold transition-colors hover:text-brand-yellow ${textColorClass}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions - Right */}
                <div className="hidden lg:flex items-center gap-6 shrink-0">
                    <button 
                        className={`relative font-mono text-[10px] uppercase tracking-widest font-bold hover:text-brand-yellow transition-colors ${textColorClass}`}
                        aria-label="Cart"
                    >
                        [ Cart: {state.items.length} ]
                    </button>
                    
                    <Link 
                        to="/contact" 
                        className={`font-mono text-[10px] uppercase tracking-widest font-bold border pb-1 transition-all ${
                            isScrolled || !isDarkBg 
                                ? 'border-brand-navy text-brand-navy hover:text-brand-yellow hover:border-brand-yellow' 
                                : 'border-brand-offwhite text-brand-offwhite hover:text-brand-yellow hover:border-brand-yellow'
                        }`}
                    >
                        Inquire Now
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="lg:hidden relative z-50 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className="w-6 flex flex-col gap-1.5">
                        <span className={`block h-[1.5px] w-full transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7.5px] bg-brand-navy' : `bg-current ${textColorClass}`}`}></span>
                        <span className={`block h-[1.5px] w-full transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0 bg-brand-navy' : `bg-current ${textColorClass}`}`}></span>
                        <span className={`block h-[1.5px] w-full transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7.5px] bg-brand-navy' : `bg-current ${textColorClass}`}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-brand-offwhite z-40 flex flex-col justify-center px-8"
                    >
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div 
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                >
                                    <Link
                                        to={link.path}
                                        className="text-4xl font-black uppercase tracking-tighter text-brand-navy hover:text-brand-purple"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (navLinks.length * 0.05) }}
                                className="mt-8 pt-8 border-t border-brand-navy/10 flex flex-col gap-4"
                            >
                                <button className="text-left font-mono text-xs uppercase tracking-widest font-bold text-brand-navy">
                                    [ Cart: {state.items.length} ]
                                </button>
                                <Link to="/contact" className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple">
                                    Inquire Now &rarr;
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;