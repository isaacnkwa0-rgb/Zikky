'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: '#00C5DC' }} />
            <span className="font-bold text-gray-800">Your Cart</span>
            {count() > 0 && (
              <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: '#00C5DC' }}>
                {count()}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: '#00C5DC' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(item => (
                <li key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 relative">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.name}</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: '#00C5DC' }}>{fmt(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 self-start flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-extrabold text-gray-900">{fmt(total())}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-3.5 rounded-xl font-bold text-white text-center text-sm block"
              style={{ background: '#00C5DC' }}
            >
              Checkout — {fmt(total())}
            </Link>
            <button
              onClick={closeCart}
              className="w-full py-2.5 rounded-xl font-semibold text-gray-600 bg-white border border-gray-200 text-sm hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
