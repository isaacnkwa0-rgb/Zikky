'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
  className?: string;
  iconOnly?: boolean;
  color?: string;
}

export default function AddToCartButton({ product, className, iconOnly, color = '#00C5DC' }: Props) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (iconOnly) {
    return (
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className={`p-2 rounded-xl text-white flex-shrink-0 disabled:opacity-40 transition-colors ${className ?? ''}`}
        style={{ background: added ? '#52BD4A' : color }}
        aria-label="Add to cart"
      >
        {added ? <Check size={14} /> : <ShoppingCart size={14} />}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className ?? ''}`}
      style={{ background: added ? '#52BD4A' : color }}
    >
      {added ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
    </button>
  );
}
