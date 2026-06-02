import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';

// Make sure VITE_STRIPE_PUBLIC_KEY is in your .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

const CheckoutForm = ({ orderData }: { orderData: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

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

      {error && <div className="text-red-500 font-mono text-xs font-bold uppercase">{error}</div>}

      <button 
        disabled={isProcessing || !stripe || !elements} 
        className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-black tracking-widest py-6 hover:bg-brand-purple transition-colors shadow-[6px_6px_0px_#FCC803] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FCC803] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none disabled:opacity-50"
      >
        {isProcessing ? 'Processing Securely...' : `Pay $${orderData.price} NZD`}
      </button>
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const orderData = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orderData) {
      navigate('/support-an-artist');
      return;
    }

    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error creating PaymentIntent", err));
  }, [orderData, navigate]);

  if (!orderData) return null;

  return (
    <div className="bg-brand-offwhite min-h-screen flex flex-col font-sans text-brand-navy pb-32">
      <Header />
      <main className="container mx-auto px-6 md:px-12 pt-32 md:pt-48 flex-grow">
        
        <div className="mb-12">
            <Link to={`/support-an-artist/${orderData.slug}`} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-brand-navy/50 hover:text-brand-purple transition-colors">
                <ArrowLeft size={14} /> Back to Drop
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* LEFT: Order Summary */}
            <div className="lg:col-span-5 space-y-8">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-8">
                  Checkout.
                </h1>
                <div className="bg-white border-2 border-brand-navy p-8 shadow-[8px_8px_0px_#0F0328]">
                    <div className="flex items-center gap-6 mb-8 border-b border-brand-navy/10 pb-8">
                        <div className="w-24 h-24 bg-brand-navy/5 overflow-hidden flex-shrink-0">
                            <img src={orderData.imageUrl} alt={orderData.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-sans text-2xl font-black uppercase leading-none">{orderData.title}</h3>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/50 mt-2">Variant: {orderData.variantTitle}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center font-sans text-3xl font-black uppercase">
                        <span>Total</span>
                        <span>${orderData.price} NZD</span>
                    </div>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-brand-navy/40 leading-relaxed">
                    Powered by Stripe. Payments are encrypted and completely secure. COOLO does not store your credit card information.
                </p>
            </div>

            {/* RIGHT: Stripe Elements */}
            <div className="lg:col-span-7 w-full">
                {clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#3A0888', colorBackground: '#ffffff', colorText: '#0F0328', fontFamily: '"Space Mono", monospace' } } }}>
                        <CheckoutForm orderData={orderData} />
                    </Elements>
                ) : (
                    <div className="h-64 flex items-center justify-center border-2 border-brand-navy/10 border-dashed bg-white">
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