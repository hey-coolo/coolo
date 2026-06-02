import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Header';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    // CRITICAL FIX: We do NOT clear the cart state here anymore. 
    // We let Stripe process safely. The global webhook or success landing handles fulfillment synchronization.

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/support-an-artist?success=true`,
      },
    });

    if (submitError) {
      setError(submitError.message || "An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-6 border border-brand-navy/10 shadow-sm">
        <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple mb-4">1. Shipping Details</h3>
        <AddressElement options={{ mode: 'shipping' }} />
      </div>

      <div className="bg-white p-6 border border-brand-navy/10 shadow-sm">
        <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple mb-4">2. Payment</h3>
        <PaymentElement />
      </div>

      {error && <div className="text-red-500 font-mono text-xs font-bold uppercase p-4 border border-red-500 bg-red-50">{error}</div>}

      <button 
        disabled={isProcessing || !stripe || !elements} 
        className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-black tracking-widest py-6 hover:bg-brand-purple transition-colors shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none disabled:opacity-50"
      >
        {isProcessing ? 'Processing Securely...' : 'Authorize and Pay Order'}
      </button>
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, removeFromCart } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const total = getCartTotal();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cart.length === 0) return;

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to initialize checkout token");
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
          console.error("Error creating PaymentIntent", err);
          setApiError(err.message);
      });
  }, [cart]);

  if (cart.length === 0) {
      return (
          <div className="bg-brand-offwhite min-h-screen flex flex-col font-sans text-brand-navy">
              <Header />
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center pt-48">
                  <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Your Basket is Empty.</h1>
                  <p className="font-mono text-xs uppercase tracking-widest text-brand-navy/60 mb-8">Go grab some drops to activate this terminal.</p>
                  <Link to="/support-an-artist" className="bg-brand-navy text-brand-offwhite px-8 py-4 font-mono text-xs uppercase font-black tracking-widest hover:bg-brand-purple transition-colors">
                      Browse Collection
                  </Link>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-brand-offwhite min-h-screen flex flex-col font-sans text-brand-navy pb-32">
      <Header />
      <main className="container mx-auto px-6 md:px-12 pt-32 md:pt-48 flex-grow max-w-[1400px]">
        
        <div className="mb-12 border-b border-brand-navy/10 pb-6 flex justify-between items-center">
            <Link to="/support-an-artist" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-brand-navy/50 hover:text-brand-purple transition-colors">
                <ArrowLeft size={14} /> Back to Collection
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* LEFT: Complete Cart Items Ledger */}
            <div className="lg:col-span-5 space-y-8">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-8">
                  Checkout.
                </h1>
                
                <div className="bg-white border-2 border-brand-navy p-8 shadow-[8px_8px_0px_#0F0328] space-y-6">
                    {cart.map((item) => (
                        <div key={item.variantId} className="flex items-center gap-6 border-b border-brand-navy/5 pb-6 last:border-0 last:pb-0 relative group">
                            <div className="w-20 h-20 bg-brand-navy/5 overflow-hidden flex-shrink-0 border border-brand-navy/10">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-grow min-w-0 pr-8">
                                <h3 className="font-sans text-lg font-black uppercase leading-tight truncate">{item.title.replace(/_/g, ' ')}</h3>
                                <p className="font-mono text-[9px] uppercase tracking-widest text-brand-navy/50 mt-1">Option: {item.variantTitle}</p>
                                <p className="font-mono text-[9px] uppercase tracking-widest font-black text-brand-purple mt-1">QTY: {item.quantity}</p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <span className="font-mono text-sm font-bold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                                <button 
                                    onClick={() => removeFromCart(item.variantId)}
                                    className="text-brand-navy/30 hover:text-red-500 transition-colors"
                                    title="Remove item"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="border-t-2 border-brand-navy pt-6 flex justify-between items-center font-sans text-3xl font-black uppercase">
                        <span>Total</span>
                        <span>${total.toFixed(2)} NZD</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: Stripe Payment Elements Hook */}
            <div className="lg:col-span-7 w-full">
                {apiError ? (
                    <div className="p-8 border-2 border-red-500 bg-red-50 text-red-700 font-mono text-sm shadow-[6px_6px_0px_#0F0328]">
                        <h3 className="font-bold uppercase text-lg mb-2">Checkout Interrupted</h3>
                        <p>{apiError}</p>
                    </div>
                ) : clientSecret && stripePromise ? (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#3A0888', colorBackground: '#ffffff', colorText: '#0F0328', fontFamily: '"Space Mono", monospace' } } }}>
                        <CheckoutForm />
                    </Elements>
                ) : (
                    <div className="h-64 flex items-center justify-center border-2 border-brand-navy/10 border-dashed bg-white shadow-sm">
                        <span className="font-mono text-xs uppercase tracking-widest text-brand-navy/50 font-bold animate-pulse">Initializing Secure Gateway...</span>
                    </div>
                )}
            </div>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;