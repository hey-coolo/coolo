import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

type ButtonVariant = 'HARD_COMMIT' | 'SOFT_EXPLORE' | 'HYPERLINK';

interface ButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  text: string;
  variant?: ButtonVariant;
  className?: string;
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ to, href, onClick, text, variant = 'HARD_COMMIT', className = '', icon = false }) => {
  
  // 1. HARD COMMIT (Primary) - "Money CTA Moves"
  // Vibe: Tactile, Heavy, Physical Launch Button.
  const hardCommitClasses = 
    "inline-flex items-center justify-center bg-brand-navy text-white font-mono text-sm uppercase font-bold py-4 px-8 border-2 border-brand-navy shadow-[4px_4px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FCC803] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

  // 2. SOFT EXPLORE (Secondary) - "Navigation"
  // Vibe: Swiss, Editorial, Clean.
  const softExploreClasses = 
    "inline-flex items-center justify-center bg-white text-brand-navy border-2 border-brand-navy font-mono text-sm uppercase font-bold py-4 px-8 hover:bg-brand-navy hover:text-white transition-colors duration-300";

  // 3. HYPERLINK (Tertiary) - "Inline / List"
  // Vibe: Minimal, Digital, Fast.
  const hyperlinkClasses = 
    "group inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase font-bold text-brand-navy hover:text-brand-purple transition-colors bg-transparent border-none p-0 shadow-none";

  const getClasses = () => {
    switch (variant) {
      case 'SOFT_EXPLORE': return `${softExploreClasses} ${className}`;
      case 'HYPERLINK': return `${hyperlinkClasses} ${className}`;
      default: return `${hardCommitClasses} ${className}`;
    }
  };

  const Icon = variant === 'HYPERLINK' ? ArrowUpRight : ArrowRight;

  const Content = () => (
    <>
      <span>{text}</span>
      {icon && (
        <Icon 
          size={variant === 'HYPERLINK' ? 16 : 18} 
          className={`
            ${variant === 'HYPERLINK' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : 'ml-2 group-hover:translate-x-1'} 
            transition-transform duration-300
          `} 
        />
      )}
    </>
  );

  if (to) return <Link to={to} className={getClasses()}><Content /></Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={getClasses()}><Content /></a>;
  
  return <button onClick={onClick} className={getClasses()}><Content /></button>;
};

export default Button;