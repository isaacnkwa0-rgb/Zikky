import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const support = [
  { label: 'Contact Us', href: '/pages/contact' },
  { label: 'Track Your Order', href: '/account' },
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: 'Product Grading Explained', href: '/pages/grading' },
  { label: 'Delivery Information', href: '/pages/delivery' },
  { label: 'Warranty & Return Policy', href: '/pages/returns' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'Twitter / X',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.638 5.903-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Facebook',
    href: '#',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'TikTok',
    href: '#',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#fff', color: '#374151', marginTop: '40px', borderTop: '1px solid #e5e7eb' }}>

      {/* ── Newsletter card ── */}
      <div className="container-main pt-16">
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">

          {/* Two-tone layout — stacks on mobile */}
          <div className="flex flex-col sm:flex-row">

            {/* Left cyan panel */}
            <div
              className="flex flex-col items-center justify-center text-center px-6 py-6 sm:w-2/5"
              style={{ background: '#00C5DC' }}
            >
              <p className="text-white font-extrabold text-lg sm:text-xl leading-tight mb-1">
                Get the best deals first.
              </p>
              <p className="text-white/80 text-sm mt-1">
                Exclusive offers, restocks &amp; tech news — straight to your inbox.
              </p>
            </div>

            {/* Right form panel */}
            <form
              className="flex flex-col sm:flex-row items-center gap-3 flex-1 px-6 py-6 sm:px-8"
              style={{ background: '#f0fdf4', borderTop: '3px solid #52BD4A' }}
              action="#"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:flex-1 text-sm text-gray-700 outline-none rounded-lg"
                style={{ border: '1.5px solid #e5e7eb', background: '#fff', height: '48px', padding: '0 16px' }}
              />
              <button
                type="submit"
                className="w-full sm:w-auto flex-shrink-0 text-sm font-bold text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ background: '#52BD4A', height: '44px', padding: '0 28px' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main columns ── */}
      <div className="container-main pt-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">

          {/* Contact Us */}
          <div>
            <h4 className="font-bold text-sm mb-5 pb-2" style={{ color: '#00C5DC', borderBottom: '2px solid #52BD4A' }}>
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={15} style={{ color: '#52BD4A', flexShrink: 0 }} />
                <a href="tel:09033723931" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  09033723931
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} style={{ color: '#52BD4A', flexShrink: 0 }} />
                <a href="mailto:Info@zikkygadgets.com" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Info@zikkygadgets.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} style={{ color: '#52BD4A', marginTop: '2px', flexShrink: 0 }} />
                <span className="text-gray-600 font-medium pb-2">226 Oron Rd, Uyo, Akwa Ibom State</span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-10 pt-8 border-t border-gray-100">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-75"
                  style={{ background: 'linear-gradient(135deg, #00C5DC 0%, #4A4FCC 50%, #52BD4A 100%)' }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Service & Support */}
          <div>
            <h4 className="font-bold text-sm mb-5 pb-2" style={{ color: '#00C5DC', borderBottom: '2px solid #52BD4A' }}>
              Service &amp; Support
            </h4>
            <ul className="space-y-3">
              {support.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid #e5e7eb', background: '#f9fafb', padding: '14px 0' }}>
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-gray-400">
            © 2025{' '}
            <span className="font-semibold" style={{ color: '#00C5DC' }}>Zikky Gadgets</span>
            {' '}— Nigerian Tech Marketplace. All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
