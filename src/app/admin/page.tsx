import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Image as ImageIcon, LayoutGrid, Tag, Package, ShoppingBag } from 'lucide-react';

export default async function AdminDashboard() {
  const [slideCount, bannerCount, categoryCount, productCount, orderCount] = await Promise.all([
    prisma.heroSlide.count({ where: { active: true } }),
    prisma.promoBanner.count({ where: { active: true } }),
    prisma.category.count({ where: { active: true } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
  ]);

  const cards = [
    { label: 'Orders', count: orderCount, href: '/admin/orders', color: '#F59E0B', icon: ShoppingBag },
    { label: 'Products', count: productCount, href: '/admin/products', color: '#4A4FCC', icon: Package },
    { label: 'Hero Slides', count: slideCount, href: '/admin/hero', color: '#00C5DC', icon: ImageIcon },
    { label: 'Promo Banners', count: bannerCount, href: '/admin/banners', color: '#52BD4A', icon: LayoutGrid },
    { label: 'Categories', count: categoryCount, href: '/admin/categories', color: '#8B5CF6', icon: Tag },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-400 mb-8">Welcome back, Admin.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map(({ label, count, href, color, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color }}>
              <Icon size={22} color="#fff" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-800">{count}</p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
