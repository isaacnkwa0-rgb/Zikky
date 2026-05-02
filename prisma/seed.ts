// @ts-nocheck
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? 'file:./zikky.db' });
const prisma = new PrismaClient({ adapter });

async function upsertHeroSlide(data) {
  return prisma.heroSlide.upsert({
    where: { id: data.id ?? 0 },
    update: data,
    create: data,
  });
}

async function main() {
  // Hero slides — use label as logical key via findFirst
  const slides = [
    {
      label: 'New & Used Tech',
      headlineMain: 'Premium tech at ',
      headlineAccent: 'lower prices.',
      sub: 'Shop smartphones, gaming, audio and more — new & refurbished, all fully tested.',
      cta: 'Shop now',
      href: '/shop',
      bg: '#00C5DC',
      fadeColor: 'rgba(0,197,220,0.95)',
      accentColor: '#1a1f36',
      labelBg: '#1a1f36',
      btnBg: '#52BD4A',
      btnHover: '#3E9638',
      btnShadow: 'rgba(82,189,74,0.45)',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
      imageAlt: 'Smartphones',
      order: 0,
      active: true,
    },
    {
      label: 'Gaming & Consoles',
      headlineMain: 'Play more, ',
      headlineAccent: 'pay less.',
      sub: 'PlayStation, Xbox, Nintendo — guaranteed, tested and ready to ship across Nigeria.',
      cta: 'Explore gaming',
      href: '/shop?category=gaming',
      bg: '#52BD4A',
      fadeColor: 'rgba(82,189,74,0.95)',
      accentColor: '#1a1f36',
      labelBg: '#1a1f36',
      btnBg: '#00C5DC',
      btnHover: '#00A8BC',
      btnShadow: 'rgba(0,197,220,0.45)',
      image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=600&fit=crop',
      imageAlt: 'PlayStation 5',
      order: 1,
      active: true,
    },
  ];

  for (const s of slides) {
    const existing = await prisma.heroSlide.findFirst({ where: { label: s.label } });
    if (!existing) await prisma.heroSlide.create({ data: s });
  }

  // Promo banners
  const banners = [
    {
      title: 'Mobile Phones Under ₦150,000',
      sub: "Genuine quality smartphones at prices you'll love.",
      href: '/shop?category=mobile-phones',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=500&fit=crop',
      cta: 'Shop Now',
      order: 0,
      active: true,
    },
    {
      title: 'Refurbished Mobile Phones',
      sub: 'Like-new devices, tested — backed by our 12-month warranty.',
      href: '/shop?category=mobile-phones',
      image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=500&fit=crop',
      cta: 'Shop Now',
      order: 1,
      active: true,
    },
    {
      title: 'Gaming Consoles',
      sub: 'PlayStation, Xbox & Nintendo — find your next gaming obsession.',
      href: '/shop?category=gaming',
      image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=500&fit=crop',
      cta: 'Shop Now',
      order: 2,
      active: true,
    },
  ];

  for (const b of banners) {
    const existing = await prisma.promoBanner.findFirst({ where: { title: b.title } });
    if (!existing) await prisma.promoBanner.create({ data: b });
  }

  // Categories
  const categories = [
    { name: 'Mobile Phones', slug: 'mobile-phones', icon: '📱', count: '1,500+', order: 0, active: true },
    { name: 'Laptops', slug: 'laptops', icon: '💻', count: '600+', order: 1, active: true },
    { name: 'Speakers', slug: 'speakers', icon: '🔊', count: '380+', order: 2, active: true },
    { name: 'Smart Watches', slug: 'smart-watches', icon: '⌚', count: '450+', order: 3, active: true },
    { name: 'Accessories', slug: 'accessories', icon: '🖱️', count: '800+', order: 4, active: true },
    { name: 'Gaming', slug: 'gaming', svgKey: 'playstation', count: '320+', order: 5, active: true },
    { name: 'Chargers', slug: 'chargers', icon: '⚡', count: '280+', order: 6, active: true },
    { name: 'Headphones', slug: 'headphones', icon: '🎧', count: '420+', order: 7, active: true },
    { name: 'Powerbanks', slug: 'powerbanks', icon: '🔋', count: '260+', order: 8, active: true },
    { name: 'Tablets', slug: 'tablets', icon: '📟', count: '340+', order: 9, active: true },
    { name: 'Apple', slug: 'apple', svgKey: 'apple', count: '650+', order: 10, active: true },
    { name: 'MacBook', slug: 'macbook', icon: '🖥️', count: '190+', order: 11, active: true },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // Products
  const cats = await prisma.category.findMany({ select: { id: true, slug: true } });
  const catId = (slug) => cats.find(c => c.slug === slug)?.id ?? null;

  const products = [
    {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'Apple iPhone 15 Pro Max with titanium design, A17 Pro chip, and 48MP camera system.',
      price: 980000,
      originalPrice: 1100000,
      image: 'https://images.unsplash.com/photo-1696446702074-f3bde14d2e0e?w=600&h=600&fit=crop',
      categoryId: catId('mobile-phones'),
      badge: 'Hot Deal',
      stock: 8,
      rating: 4.9,
      reviews: 124,
      featured: true,
      active: true,
      order: 0,
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Samsung Galaxy S24 Ultra with S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
      price: 850000,
      originalPrice: 950000,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop',
      categoryId: catId('mobile-phones'),
      badge: 'New',
      stock: 12,
      rating: 4.8,
      reviews: 89,
      featured: true,
      active: true,
      order: 1,
    },
    {
      name: 'PlayStation 5 Console',
      slug: 'playstation-5-console',
      description: 'Sony PS5 with ultra-high speed SSD, ray tracing, and 4K gaming up to 120fps.',
      price: 520000,
      originalPrice: 600000,
      image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=600&fit=crop',
      categoryId: catId('gaming'),
      badge: 'In Stock',
      stock: 5,
      rating: 4.9,
      reviews: 210,
      featured: true,
      active: true,
      order: 2,
    },
    {
      name: 'MacBook Pro 14" M3',
      slug: 'macbook-pro-14-m3',
      description: 'Apple MacBook Pro 14-inch with M3 chip, 18GB RAM, and 18-hour battery life.',
      price: 1450000,
      originalPrice: 1600000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
      categoryId: catId('macbook'),
      badge: null,
      stock: 4,
      rating: 4.9,
      reviews: 67,
      featured: true,
      active: true,
      order: 3,
    },
    {
      name: 'AirPods Pro 2nd Gen',
      slug: 'airpods-pro-2nd-gen',
      description: 'Apple AirPods Pro with Active Noise Cancellation, Transparency mode, and MagSafe charging.',
      price: 180000,
      originalPrice: 220000,
      image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&h=600&fit=crop',
      categoryId: catId('headphones'),
      badge: 'Hot Deal',
      stock: 20,
      rating: 4.7,
      reviews: 156,
      featured: true,
      active: true,
      order: 4,
    },
    {
      name: 'Apple Watch Series 9',
      slug: 'apple-watch-series-9',
      description: 'Apple Watch Series 9 with S9 chip, Double Tap gesture, and Always-On Retina display.',
      price: 320000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop',
      categoryId: catId('smart-watches'),
      badge: 'New',
      stock: 15,
      rating: 4.8,
      reviews: 93,
      featured: false,
      active: true,
      order: 5,
    },
    {
      name: 'JBL Flip 6 Bluetooth Speaker',
      slug: 'jbl-flip-6',
      description: 'JBL Flip 6 with bold JBL Original Pro Sound, IP67 waterproof, and 12-hour battery.',
      price: 65000,
      originalPrice: 80000,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      categoryId: catId('speakers'),
      badge: 'Sale',
      stock: 30,
      rating: 4.6,
      reviews: 204,
      featured: false,
      active: true,
      order: 6,
    },
    {
      name: 'Anker 65W GaN Charger',
      slug: 'anker-65w-gan-charger',
      description: 'Anker Nano Pro 65W dual-port GaN charger — charges MacBook, iPhone and iPad simultaneously.',
      price: 22000,
      originalPrice: 28000,
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop',
      categoryId: catId('chargers'),
      badge: 'Best Seller',
      stock: 50,
      rating: 4.7,
      reviews: 318,
      featured: false,
      active: true,
      order: 7,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log('✅ Database seeded');
}

main().catch(console.error).finally(() => prisma.$disconnect());
