'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Image as ImageIcon, LayoutGrid, Tag, Package, ShoppingBag, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/hero', label: 'Hero Slides', icon: ImageIcon },
  { href: '/admin/banners', label: 'Promo Banners', icon: LayoutGrid },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router, pathname]);

  if (pathname === '/admin/login') return <>{children}</>;

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar — z-[60] keeps it above any fixed modal overlays in page content */}
      <aside className="relative z-[60] w-56 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <Image src="/logo.png" alt="Zikky" width={40} height={40} className="object-contain" />
          <div>
            <p className="text-sm font-bold text-gray-800">Zikky</p>
            <p className="text-[10px] text-gray-400 font-medium">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? '#00C5DC' : 'transparent',
                  color: active ? '#fff' : '#374151',
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
