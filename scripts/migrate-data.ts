// @ts-nocheck
import 'dotenv/config';
import Database from 'better-sqlite3';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const sqlite = new Database('./zikky.db');
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const neon = new PrismaClient({ adapter });

async function main() {
  console.log('Reading from local SQLite...');

  const heroSlides = sqlite.prepare('SELECT * FROM HeroSlide').all();
  const promoBanners = sqlite.prepare('SELECT * FROM PromoBanner').all();
  const categories = sqlite.prepare('SELECT * FROM Category').all();
  const products = sqlite.prepare('SELECT * FROM Product').all();
  const orders = sqlite.prepare('SELECT * FROM "Order"').all();
  const orderItems = sqlite.prepare('SELECT * FROM OrderItem').all();

  console.log(`Found: ${heroSlides.length} slides, ${promoBanners.length} banners, ${categories.length} categories, ${products.length} products, ${orders.length} orders`);

  console.log('Clearing Neon tables...');
  await neon.orderItem.deleteMany();
  await neon.order.deleteMany();
  await neon.product.deleteMany();
  await neon.category.deleteMany();
  await neon.promoBanner.deleteMany();
  await neon.heroSlide.deleteMany();

  const bool = (v) => v === 1 || v === true;

  console.log('Inserting hero slides...');
  for (const s of heroSlides) {
    await neon.heroSlide.create({ data: { ...s, active: bool(s.active), createdAt: new Date(s.createdAt), updatedAt: new Date(s.updatedAt) } });
  }

  console.log('Inserting promo banners...');
  for (const b of promoBanners) {
    await neon.promoBanner.create({ data: { ...b, active: bool(b.active), createdAt: new Date(b.createdAt), updatedAt: new Date(b.updatedAt) } });
  }

  console.log('Inserting categories...');
  for (const c of categories) {
    await neon.category.create({ data: { ...c, active: bool(c.active), createdAt: new Date(c.createdAt), updatedAt: new Date(c.updatedAt) } });
  }

  console.log('Inserting products...');
  for (const p of products) {
    await neon.product.create({ data: { ...p, active: bool(p.active), featured: bool(p.featured), createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt) } });
  }

  console.log('Inserting orders...');
  for (const o of orders) {
    await neon.order.create({ data: { ...o, createdAt: new Date(o.createdAt), updatedAt: new Date(o.updatedAt), paidAt: o.paidAt ? new Date(o.paidAt) : null } });
  }

  console.log('Inserting order items...');
  for (const i of orderItems) {
    await neon.orderItem.create({ data: { ...i } });
  }

  console.log('✅ All data migrated to Neon!');
}

main().catch(console.error).finally(() => neon.$disconnect());
