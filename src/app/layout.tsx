import type { Metadata } from 'next';
import './globals.css';
import SiteShell from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Free Next Day Delivery | Mobile Phones | Tablets | Laptops – Zikky Gadgets',
  description:
    'Shop top brands like Apple, Samsung, Sony, PlayStation at unbeatable prices. Free next-day delivery across Nigeria. 12-month warranty on every product.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
