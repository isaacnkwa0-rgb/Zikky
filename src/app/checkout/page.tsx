'use client';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { ShoppingBag } from 'lucide-react';

declare global {
  interface Window {
    PaystackPop: {
      setup?: (opts: Record<string, unknown>) => { openIframe: () => void } | null;
      newTransaction?: (opts: Record<string, unknown>) => void;
      new(): { newTransaction: (opts: Record<string, unknown>) => void };
    };
  }
}

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

export default function CheckoutPage() {
  const { items, total, clear } = useCartStore();
  const [hydrated, setHydrated] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  const cartItems = hydrated ? items : [];
  const cartTotal = hydrated ? total() : 0;

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function valid() {
    return form.name.trim() && form.email.trim() && form.phone.trim() && form.address.trim() && cartItems.length > 0;
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!valid()) return;

    if (!paystackReady || !window.PaystackPop) {
      setError('Payment system is still loading. Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    setError('');

    const ref = `ZKY-${Date.now()}`;

    // Paystack validates callbacks with Object.prototype.toString — async functions
    // return '[object AsyncFunction]' not '[object Function]', so must use a plain wrapper.
    const callback = function(response: { reference: string }) {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: response.reference,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          total: cartTotal,
          items: cartItems.map(i => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Order creation failed');
          return res.json();
        })
        .then(order => {
          clear();
          router.push(`/order/${order.id}`);
        })
        .catch(() => {
          setError('Payment received but order failed. Please contact support.');
          setLoading(false);
        });
    };

    const opts = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '',
      email: form.email,
      amount: cartTotal * 100,
      ref,
      currency: 'NGN',
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: form.name },
          { display_name: 'Phone', variable_name: 'phone', value: form.phone },
        ],
      },
      onClose: function() { setLoading(false); },
      callback,    // v1
      onSuccess: callback,   // v2
      onCancel: function() { setLoading(false); }, // v2
    };

    try {
      if (typeof window.PaystackPop.setup === 'function') {
        // v1 API
        const handler = window.PaystackPop.setup(opts);
        if (!handler) throw new Error('PaystackPop.setup returned no handler');
        handler.openIframe();
      } else {
        // v2 API
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const paystack = new (window.PaystackPop as any)();
        paystack.newTransaction(opts);
      }
    } catch (err) {
      console.error('Paystack error:', err);
      setError(err instanceof Error ? err.message : 'Could not open payment. Please refresh the page and try again.');
      setLoading(false);
    }
  }

  if (hydrated && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium mb-4">Your cart is empty</p>
          <a href="/shop" className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold inline-block" style={{ background: '#00C5DC' }}>
            Shop Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setPaystackReady(true)}
        onError={() => setError('Failed to load payment system. Please refresh the page.')}
      />

      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <form onSubmit={handlePay} className="lg:col-span-3 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-bold text-gray-800 mb-5">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name *</span>
                    <input
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email *</span>
                    <input
                      type="email"
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone *</span>
                    <input
                      type="tel"
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="08012345678"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Delivery Address *</span>
                    <textarea
                      rows={3}
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 resize-none"
                      value={form.address}
                      onChange={e => set('address', e.target.value)}
                      placeholder="House number, street, city, state…"
                      required
                    />
                  </label>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>}

              <button
                type="submit"
                disabled={loading || !valid()}
                className="w-full py-4 rounded-xl font-bold text-white text-base disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                style={{ background: '#00C5DC' }}
              >
                {loading ? 'Opening payment…' : `Pay ${fmt(cartTotal)} with Paystack`}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Secured by Paystack · 256-bit SSL encryption
              </p>
            </form>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h2 className="text-base font-bold text-gray-800 mb-5">Order Summary</h2>
                <ul className="flex flex-col gap-4 mb-5">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden relative flex-shrink-0">
                        {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 flex-shrink-0">{fmt(item.price * item.quantity)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span><span>{fmt(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span><span className="text-green-600 font-medium">Calculated after payment</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-gray-900 mt-2 pt-2 border-t border-gray-100">
                    <span>Total</span><span>{fmt(cartTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
