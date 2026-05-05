import { getProductBySlug, getProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import ImageGallery from '@/components/ImageGallery';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return { title: `${product.name} — Zikky Gadgets` };
}

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={16}
          className={i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = product.categoryId
    ? (await getProducts({ categorySlug: product.category?.slug, limit: 9 })).filter(p => p.id !== product.id).slice(0, 8)
    : (await getProducts({ limit: 9 })).filter(p => p.id !== product.id).slice(0, 8);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/shop" className="flex items-center gap-1 hover:text-cyan-500 transition-colors">
            <ArrowLeft size={14} /> Shop
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-cyan-500 transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{product.name}</span>
        </nav>

        {/* Main product layout */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Image gallery */}
            <div className="relative p-4">
              {product.badge && (
                <span className="absolute top-6 left-6 z-10 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: '#00C5DC' }}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-6 right-6 z-10 text-xs font-bold px-3 py-1 rounded-full bg-red-500 text-white">
                  -{discount}%
                </span>
              )}
              <ImageGallery
                main={product.image}
                extra={(() => { try { return JSON.parse(product.images ?? '[]'); } catch { return []; } })()}
                name={product.name}
              />
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col">
              {product.category && (
                <Link href={`/shop?category=${product.category.slug}`} className="text-xs font-semibold text-cyan-500 uppercase tracking-wider hover:underline mb-2">
                  {product.category.name}
                </Link>
              )}

              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">{product.name}</h1>

              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Stars rating={product.rating} />
                  <span className="text-sm text-gray-500">{product.rating.toFixed(1)} ({product.reviews} reviews)</span>
                </div>
              )}

              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">{fmt(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through mb-0.5">{fmt(product.originalPrice)}</span>
                )}
                {discount > 0 && (
                  <span className="mb-0.5 text-sm font-bold text-red-500">Save {fmt(product.originalPrice! - product.price)}</span>
                )}
              </div>

              {product.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>
              )}

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      {product.stock < 5 ? `Only ${product.stock} left!` : 'In Stock'}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-400" />
                    <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <AddToCartButton product={{ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, stock: product.stock }} />
                <Link
                  href="/shop"
                  className="w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 text-center text-sm transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
              {product.category ? `More in ${product.category.name}` : 'You May Also Like'}
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6">Products you might be interested in</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {related.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <Link href={`/products/${p.slug}`} className="group">
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {p.image && (
                        <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                      )}
                      {p.badge && (
                        <span className="absolute top-2 left-2 text-[9px] font-bold text-white px-1.5 py-0.5 rounded" style={{ background: '#00C5DC' }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <Link href={`/products/${p.slug}`}>
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2 text-center">{p.name}</p>
                    </Link>
                    <div className="text-center">
                      <p className="text-base font-extrabold text-gray-900">{fmt(p.price)}</p>
                      {p.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">{fmt(p.originalPrice)}</p>
                      )}
                    </div>
                    <div className="mt-auto">
                      <AddToCartButton product={{ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image, stock: p.stock }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
