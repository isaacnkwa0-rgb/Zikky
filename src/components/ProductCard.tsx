'use client';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/products';

const badgeColors: Record<string, string> = {
  SALE: '#ef4444',
  NEW: '#52BD4A',
  HOT: '#f97316',
  SAVE: '#4A4FCC',
};

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);

  return (
    <div className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '3/4' }}>

      {/* Full-bleed image */}
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 200px"
      />

      {/* Badge */}
      {product.badge && (
        <span
          className="absolute top-3 left-3 z-20 text-[10px] font-bold text-white px-2 py-0.5 rounded"
          style={{ background: badgeColors[product.badge] ?? '#374151' }}
        >
          {product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={() => setWished(v => !v)}
        className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:scale-110 transition-transform"
        aria-label="Toggle wishlist"
      >
        <Heart size={14} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
      </button>

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-x-0 bottom-0 z-10"
        style={{ height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
      />

      {/* Text on gradient */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center text-center px-3 pb-3">
        <p className="text-white text-[13px] font-semibold leading-snug line-clamp-2 drop-shadow">{product.name}</p>
        <div className="flex items-baseline justify-center gap-2 mt-1">
          <span className="text-white font-bold text-sm drop-shadow">₦{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-white/60 text-xs line-through">₦{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
