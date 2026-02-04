import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResourceDelivery from '../../components/emails/ResourceDelivery';

import { FREE_RESOURCES, Resource } from '../../constants';

const FreeResourcesPage: React.FC = () => {
  const [selectedRes, setSelectedRes] = useState<Resource | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleAction = (res: Resource) => {
    // FIX: If ID is '01' (Reality Check), go straight to tool.
    if (res.id === '01') {
        navigate('/audit');
        return;
    }
    
    // Default flow for other resources
    setSelectedRes(res);
    setStatus('idle');
    setEmail('');
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRes || !email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email, 
            resourceId: selectedRes.id,
            resourceName: selectedRes.title
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to server.');
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-offwhite">
      <div className="container mx-auto px-8">
        <h1 className="text-8xl font-black uppercase mb-12">Free Game.</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FREE_RESOURCES.map((res) => (
            <div key={res.id} className="border-2 border-brand-navy p-12 bg-white hover:shadow-[8px_8px_0px_0px_#0F0328] transition-all">
               <span className="font-mono text-xs font-black text-brand-purple mb-4 block">{res.type}</span>
               <h3 className="text-4xl font-black uppercase mb-4">{res.title}</h3>
               <p className="font-body text-brand-navy/60 mb-8">{res.description}</p>
               <button 
                onClick={() => handleAction(res)}
                className="w-full bg-brand-navy text-brand-offwhite py-4 font-mono font-black uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-navy transition-colors"
               >
                 {res.action}
               </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedRes && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-navy/90 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedRes(null)}
          >
            <div 
              className="bg-white p-12 max-w-lg w-full relative border-4 border-brand-yellow"
              onClick={(e) => e.stopPropagation()}
            >
              {status === 'success' ? (
                <div className="text-center">
                    <h3 className="text-4xl font-black uppercase mb-4">Check your inbox.</h3>
                    <p className="mb-8">We've sent the {selectedRes.type.toLowerCase()} to {email}.</p>
                    <button 
                        onClick={() => setSelectedRes(null)}
                        className="bg-brand-navy text-brand-offwhite px-8 py-3 font-mono font-black uppercase"
                    >
                        Close
                    </button>
                </div>
              ) : (
                  <>
                    <h3 className="text-3xl font-black uppercase mb-2">Get the {selectedRes.type}</h3>
                    <p className="mb-8 text-sm opacity-60">Enter your email to receive this resource immediately.</p>
                    
                    <form onSubmit={handleDownload} className="space-y-4">
                        <input 
                            type="email" 
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-brand-navy p-4 font-mono focus:outline-none focus:border-brand-purple"
                            required
                        />
                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-brand-yellow text-brand-navy py-4 font-mono font-black uppercase tracking-widest hover:bg-brand-navy hover:text-brand-offwhite transition-colors"
                        >
                            {status === 'loading' ? 'Sending...' : 'Send It'}
                        </button>
                        {status === 'error' && (
                            <p className="text-red-500 font-mono text-xs text-center">{message}</p>
                        )}
                    </form>
                  </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreeResourcesPage;