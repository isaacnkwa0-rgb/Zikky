import { Star } from 'lucide-react';

const badges = [
  { icon: '🚚', label: 'Free Next Day Delivery', sub: 'On qualifying orders' },
  { icon: '🛡️', label: '12 Month Warranty', sub: 'On every product' },
  { icon: '↩️', label: '30 Day Returns', sub: 'Hassle-free returns' },
  { icon: '🔒', label: 'Secure Payment', sub: '100% protected' },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-6">
      <div className="container-main">
        {/* Trustpilot-style row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5 text-center">
          <span className="text-sm font-semibold text-gray-700">Trusted by thousands of happy customers across Nigeria</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} style={{ color: '#52BD4A', fill: i < 4 ? '#52BD4A' : '#A8E0A4' }} />
            ))}
            <span className="text-xs text-gray-500 ml-1">4.3 · 3,490 reviews</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(b => (
            <div key={b.label} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{b.label}</p>
                <p className="text-xs text-gray-500">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
