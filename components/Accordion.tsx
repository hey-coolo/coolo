import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-dark/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-6 group"
      >
        <h3 className="font-sans font-medium text-xl md:text-2xl text-brand-dark group-hover:text-brand-muted transition-colors duration-300">{title}</h3>
        <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
          <span className={`absolute h-px w-4 bg-brand-dark transition-transform duration-300 ease-out-circ ${isOpen ? 'rotate-180' : 'rotate-0'}`}></span>
          <span className={`absolute w-px h-4 bg-brand-dark transition-transform duration-300 ease-out-circ ${isOpen ? 'scale-y-0' : 'scale-y-100'}`}></span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
            <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="overflow-hidden"
            >
                <div className="pb-6 pr-12 font-body text-brand-muted text-lg">
                {children}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;