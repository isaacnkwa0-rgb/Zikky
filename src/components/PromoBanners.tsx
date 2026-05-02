import Link from 'next/link';
import Image from 'next/image';

interface Banner {
  id?: number;
  title: string;
  sub: string;
  href: string;
  image: string;
  cta: string;
}

const fallbackBanners: Banner[] = [
  {
    title: 'Mobile Phones Under ₦150,000',
    sub: "Genuine quality smartphones at prices you'll love.",
    href: '/collections/mobiles',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=500&fit=crop',
    cta: 'Shop Now',
  },
  {
    title: 'Refurbished Mobile Phones',
    sub: 'Like-new devices, tested — backed by our 12-month warranty.',
    href: '/collections/refurbished',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=500&fit=crop',
    cta: 'Shop Now',
  },
  {
    title: 'Gaming Consoles',
    sub: 'PlayStation, Xbox & Nintendo — find your next gaming obsession.',
    href: '/collections/consoles',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=500&fit=crop',
    cta: 'Shop Now',
  },
];

export default function PromoBanners({ banners: bannersProp }: { banners?: Banner[] }) {
  const banners = (bannersProp && bannersProp.length > 0) ? bannersProp : fallbackBanners;

  return (
    <section className="py-20 md:py-24">
      <div className="container-main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banners.map((b, i) => (
          <Link
            key={b.id ?? i}
            href={b.href}
            className="relative rounded-2xl overflow-hidden group block"
            style={{ minHeight: '200px' }}
          >
            <Image
              src={b.image}
              alt={b.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-x-0 bottom-0 z-10"
              style={{ height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)' }}
            />

            {/* Text — centred at bottom */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6 flex flex-col items-center text-center">
              <h3 className="text-white font-extrabold text-sm md:text-base leading-snug mb-1 drop-shadow">{b.title}</h3>
              <p className="text-white/75 text-xs leading-relaxed mb-3">{b.sub}</p>
              <span className="inline-flex items-center gap-1 bg-white text-gray-900 text-xs font-bold px-4 py-1.5 rounded-md group-hover:bg-gray-100 transition-colors">
                {b.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
