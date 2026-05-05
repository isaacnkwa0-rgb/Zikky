export const dynamic = 'force-dynamic';

import { getProducts, getCategories } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

export const metadata = { title: 'Shop — Zikky Gadgets' };

type SearchParams = { category?: string; q?: string };

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const [allProducts, categories] = await Promise.all([
    getProducts({ categorySlug: searchParams.category, search: searchParams.q }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold" style={{ color: '#52BD4A' }}>Shop</h1>
          <p className="text-gray-500 mt-1">{allProducts.length} products {searchParams.category ? `in ${categories.find(c => c.slug === searchParams.category)?.name ?? searchParams.category}` : ''}</p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-between gap-y-3 mb-10">
          <Link
            href="/shop"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${!searchParams.category ? 'text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-cyan-400'}`}
            style={!searchParams.category ? { background: '#00C5DC' } : {}}
          >
            All
          </Link>
          {categories.map(c => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams.category === c.slug ? 'text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-cyan-400'}`}
              style={searchParams.category === c.slug ? { background: '#00C5DC' } : {}}
            >
              {c.icon && <span className="mr-1">{c.icon}</span>}{c.name}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        {allProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found.</p>
            <Link href="/shop" className="mt-4 inline-block text-sm text-cyan-500 hover:underline">Clear filter</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allProducts.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <Link href={`/products/${p.slug}`} className="group">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {p.image ? (
                      <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200 text-4xl">📦</div>
                    )}
                    {p.badge && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#00C5DC' }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-3 flex flex-col flex-1">
                  <Link href={`/products/${p.slug}`}>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 text-center">{p.name}</p>
                  </Link>
                  {p.rating > 0 && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">{p.rating.toFixed(1)} ({p.reviews})</span>
                    </div>
                  )}
                  <div className="flex-1" />
                  <div className="flex flex-col items-center gap-0.5 mt-1">
                    <p className="text-base font-extrabold text-gray-900">{fmt(p.price)}</p>
                    {p.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">{fmt(p.originalPrice)}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <AddToCartButton
                      product={{ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image, stock: p.stock }}
                      color="#52BD4A"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
