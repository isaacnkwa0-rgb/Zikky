export const dynamic = 'force-dynamic';

import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import MarqueeSection from '@/components/MarqueeSection';
import PromoBanners from '@/components/PromoBanners';
import { getHeroSlides, getPromoBanners, getCategories, getProducts } from '@/lib/data';

export default async function HomePage() {
  const [heroSlides, promoBanners, categories, allProducts] = await Promise.all([
    getHeroSlides(),
    getPromoBanners(),
    getCategories(),
    getProducts(),
  ]);

  const featured   = allProducts.filter(p => p.featured);
  const mobiles    = allProducts.filter(p => p.category?.slug === 'mobile-phones');
  const gaming     = allProducts.filter(p => p.category?.slug === 'gaming');
  const headphones = allProducts.filter(p => p.category?.slug === 'headphones');
  const laptops    = allProducts.filter(p => p.category?.slug === 'laptops' || p.category?.slug === 'macbook');

  return (
    <>
      <HeroSection slides={heroSlides} />
      <CategoryGrid categories={categories} />

      {featured.length > 0 && (
        <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <MarqueeSection title="Featured Products" products={featured} viewAllHref="/shop" />
        </div>
      )}

      <PromoBanners banners={promoBanners} />

      {mobiles.length > 0 && (
        <div style={{ paddingTop: '40px' }}>
          <MarqueeSection title="Mobile Phones" products={mobiles} viewAllHref="/shop?category=mobile-phones" />
        </div>
      )}

      {gaming.length > 0 && (
        <div style={{ paddingTop: '40px' }}>
          <MarqueeSection title="Gaming" products={gaming} viewAllHref="/shop?category=gaming" />
        </div>
      )}

      {headphones.length > 0 && (
        <div style={{ paddingTop: '40px' }}>
          <MarqueeSection title="Headphones" products={headphones} viewAllHref="/shop?category=headphones" />
        </div>
      )}

      {laptops.length > 0 && (
        <div style={{ paddingTop: '40px' }}>
          <MarqueeSection title="Laptops & MacBooks" products={laptops} viewAllHref="/shop?category=laptops" />
        </div>
      )}

      {allProducts.length > 0 && (
        <div style={{ paddingTop: '40px' }}>
          <MarqueeSection title="All Products" products={allProducts} viewAllHref="/shop" />
        </div>
      )}
    </>
  );
}
