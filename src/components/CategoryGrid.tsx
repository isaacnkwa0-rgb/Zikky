import Link from 'next/link';

type Category = {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  svgKey?: string | null;
  count: string;
};

const svgIcons: Record<string, React.ReactNode> = {
  apple: (
    <svg viewBox="0 0 814 1000" width="34" height="34" fill="#1d1d1f">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.1 0 541.8c0-207.1 138.9-316.6 274.8-316.6 71 0 130.4 46.4 174.9 46.4 42.7 0 109.6-49.9 192.7-49.9zm-191-150.3c33.9-40.8 58.2-97.6 58.2-154.4 0-7.8-.6-15.7-2-22.8-55.4 2-121.3 36.8-161.6 82.3-31.2 35.5-61.6 93.1-61.6 151.7 0 8.5 1.3 17 1.9 19.5 3.2.5 8.5 1.3 13.7 1.3 49.9 0 112-33.2 151.4-77.6z" />
    </svg>
  ),
  playstation: (
    <svg viewBox="0 0 64 64" width="38" height="38" fill="none">
      <rect x="4" y="18" width="56" height="28" rx="14" fill="#2d2d2f" />
      <rect x="16" y="28" width="3" height="8" rx="1.5" fill="#e5e7eb" />
      <rect x="13" y="31" width="9" height="3" rx="1.5" fill="#e5e7eb" />
      <circle cx="44" cy="30" r="1.8" fill="#e5e7eb" />
      <circle cx="49" cy="34" r="1.8" fill="#e5e7eb" />
      <circle cx="39" cy="34" r="1.8" fill="#e5e7eb" />
      <circle cx="44" cy="38" r="1.8" fill="#e5e7eb" />
      <ellipse cx="26" cy="40" rx="5" ry="2.5" fill="#3d3d3f" />
      <ellipse cx="38" cy="40" rx="5" ry="2.5" fill="#3d3d3f" />
    </svg>
  ),
};

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-main">

        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest">Shop by Category</h2>
          <Link href="/shop" className="text-xs font-semibold hover:underline mt-1.5" style={{ color: '#52BD4A' }}>
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-5">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl group-hover:bg-gray-200 group-hover:shadow-md transition-all duration-200">
                {cat.svgKey ? svgIcons[cat.svgKey] : <span>{cat.icon}</span>}
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-green-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
