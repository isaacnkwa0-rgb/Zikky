'use client';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

export interface MarqueeProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  badge?: string | null;
  rating: number;
  reviews: number;
  stock: number;
}

interface Props {
  title: string;
  products: MarqueeProduct[];
  viewAllHref?: string;
}

export default function MarqueeSection({ title, products, viewAllHref = '/shop' }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-10 md:py-14">
      {/* Header */}
      <div className="container-main flex items-center justify-between mb-5">
        <h2 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest">{title}</h2>
        <Link href={viewAllHref} className="text-xs font-semibold hover:underline" style={{ color: '#52BD4A' }}>
          View all →
        </Link>
      </div>

      {/* Scrollable row */}
      <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 px-4 md:px-6" style={{ width: 'max-content' }}>
          {products.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col flex-shrink-0 hover:shadow-md transition-shadow"
              style={{ width: '160px' }}
            >
              <div className="relative bg-gray-50" style={{ width: '160px', height: '160px' }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="160px"
                  unoptimized
                />
                {product.badge && (
                  <span
                    className="absolute top-2 left-2 text-[9px] font-bold text-white px-1.5 py-0.5 rounded"
                    style={{ background: '#00C5DC' }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-2.5 flex flex-col gap-1 flex-1">
                <p className="text-[11px] font-semibold text-gray-800 leading-snug line-clamp-2 flex-1">
                  {product.name}
                </p>
                <div className="flex items-center justify-between gap-1 mt-1">
                  <div>
                    <span className="text-xs font-bold text-gray-900">
                      ₦{product.price.toLocaleString('en-NG')}
                    </span>
                    {product.originalPrice && (
                      <span className="block text-[10px] text-gray-400 line-through">
                        ₦{product.originalPrice.toLocaleString('en-NG')}
                      </span>
                    )}
                  </div>
                  <AddToCartButton
                    product={{ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, stock: product.stock }}
                    iconOnly
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
