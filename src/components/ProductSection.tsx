import Link from 'next/link';
import ProductCard from './ProductCard';
import type { Product } from '@/data/products';

interface Props {
  title: string;
  products: Product[];
  viewAllHref?: string;
  scrollable?: boolean;
  marquee?: boolean;
}

export default function ProductSection({ title, products, viewAllHref = '/collections', scrollable = false, marquee = false }: Props) {
  return (
    <section className="py-8">
      <div className={marquee ? '' : 'container-main'}>
        <div className={`flex flex-col items-center${marquee ? ' container-main' : ''}`} style={{ marginBottom: '28px' }}>
          <h2 className="text-xl font-bold text-gray-900 text-center">{title}</h2>
          <Link href={viewAllHref} className="text-sm font-semibold hover:underline" style={{ color: '#52BD4A', marginTop: '6px' }}>
            View all →
          </Link>
        </div>

        {marquee ? (
          <div className="marquee-track">
            <div className="marquee-inner" style={{ gap: '16px', padding: '4px 0 8px' }}>
              {[...products, ...products, ...products].map((p, i) => (
                <div key={i} style={{ width: '220px', flexShrink: 0 }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        ) : scrollable ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-snap-x -mx-4 px-4">
            {products.map(p => (
              <div key={p.id} className="flex-shrink-0 w-52 md:w-60">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
