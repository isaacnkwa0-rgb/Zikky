'use client';
import { Search, Phone, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Mobile Phones', href: '/shop?category=mobile-phones', dropdown: true },
  { label: 'Consoles', href: '/shop?category=gaming', dropdown: true },
  { label: 'Computing', href: '/shop?category=laptops', dropdown: true },
  { label: 'Tablets', href: '/shop?category=tablets', dropdown: true },
  { label: 'Headphones', href: '/shop?category=headphones', dropdown: false },
];

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const { openCart, count, total } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  const cartCount = hydrated ? count() : 0;
  const cartTotal = hydrated ? total() : 0;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">

      {/* ── Main row ── */}
      <div className="border-b border-gray-200">
        <div className="container-main flex items-center gap-3 py-3">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Zikky Gadgets"
              width={110}
              height={110}
              className="object-contain w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24"
              priority
            />
          </Link>

          {/* Desktop: search + right icons */}
          <div className="hidden md:flex flex-1 items-center gap-5 ml-3">
            <form onSubmit={handleSearch} className="flex flex-1 items-center rounded-md overflow-hidden border border-gray-300 focus-within:border-gray-400 transition-colors" style={{ maxWidth: '520px' }}>
              <input
                type="text"
                placeholder="Search for products or brands…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-gray-50"
              />
              <button type="submit" className="flex-shrink-0 px-3 py-3 text-white transition-colors" style={{ background: '#52BD4A' }}>
                <Search size={16} />
              </button>
            </form>

            <div className="flex items-center gap-5 ml-auto">
              <a href="tel:09033723931" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Phone size={18} className="text-gray-400 flex-shrink-0" />
                <div className="leading-tight">
                  <p className="text-[10px] text-gray-400 font-medium">Need help?</p>
                  <p className="text-sm font-bold text-gray-800">09033723931</p>
                </div>
              </a>
              <button
                onClick={openCart}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div className="relative">
                  <ShoppingCart size={22} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center leading-none" style={{ background: '#00C5DC' }}>
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] text-gray-400">Basket</p>
                  <p className="text-sm font-bold">{fmt(cartTotal)}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Tablet inline search (sm only) */}
          <form onSubmit={handleSearch} className="hidden sm:flex md:hidden flex-1 items-center rounded-md overflow-hidden border border-gray-300 focus-within:border-gray-400 transition-colors" style={{ marginLeft: '8px' }}>
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 px-3 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-gray-50"
            />
            <button type="submit" className="flex-shrink-0 px-3 py-3 text-white transition-colors" style={{ background: '#52BD4A' }}>
              <Search size={15} />
            </button>
          </form>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center justify-end gap-4 ml-auto">
            <button onClick={openCart} className="relative text-gray-700">
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center leading-none" style={{ background: '#00C5DC' }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              className="p-1.5 rounded text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3 mb-10">
          <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 px-3 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
            />
            <button type="submit" className="flex-shrink-0 px-3 py-3 text-white" style={{ background: '#52BD4A' }}>
              <Search size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* ── Desktop nav bar ── */}
      <nav className="hidden md:block border-b border-gray-200">
        <div className="container-main">
          <ul className="flex items-center justify-between">
            <li>
              <Link
                href="/shop"
                className="flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors whitespace-nowrap"
              >
                <Menu size={14} />
                All Products
                <ChevronDown size={12} className="text-gray-400" />
              </Link>
            </li>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors whitespace-nowrap"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={12} className="text-gray-400" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul>
            <li className="border-b border-gray-100">
              <Link href="/shop" className="flex items-center gap-2 px-5 py-4 text-sm font-semibold text-gray-800" onClick={() => setMenuOpen(false)}>
                <Menu size={15} /> All Products
              </Link>
            </li>
            {navLinks.map(link => (
              <li key={link.href} className="border-b border-gray-100">
                <Link href={link.href} className="flex items-center justify-between px-5 py-4 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className="text-gray-400" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
