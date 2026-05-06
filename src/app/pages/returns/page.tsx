import { ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

export const metadata = { title: 'Warranty & Return Policy — Zikky Gadgets' };

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Warranty &amp; Return Policy</h1>
          <p className="text-gray-500 mt-2">We stand behind every product we sell. Your satisfaction is our priority.</p>
        </div>

        {/* Warranty */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={22} style={{ color: '#52BD4A' }} />
            <h2 className="text-lg font-bold text-gray-900">Warranty Coverage</h2>
          </div>

          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <div className="rounded-xl p-4" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <p className="font-semibold text-gray-800 mb-1">Brand New Products</p>
              <p>Covered by the manufacturer&apos;s standard warranty (typically 12 months). Warranty terms vary by brand. Contact the manufacturer directly or visit our store for warranty claims.</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
              <p className="font-semibold text-gray-800 mb-1">Grade A (Like New) — Refurbished</p>
              <p>Covered by a <strong>12-month Zikky Warranty</strong> against manufacturing defects and hardware failure.</p>
            </div>
            <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
              <p className="font-semibold text-gray-800 mb-1">Grade B (Good) — Refurbished</p>
              <p>Covered by a <strong>6-month Zikky Warranty</strong> against hardware defects.</p>
            </div>
            <div className="rounded-xl p-4 bg-orange-50 border border-orange-100">
              <p className="font-semibold text-gray-800 mb-1">Grade C (Fair) — Refurbished</p>
              <p>Covered by a <strong>3-month Zikky Warranty</strong> against hardware defects.</p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Warranty Does Not Cover</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Physical damage caused after purchase (cracked screens, liquid damage)</li>
              <li>• Damage from unauthorised repairs or modifications</li>
              <li>• Normal wear and tear (battery degradation over time)</li>
              <li>• Loss or theft</li>
            </ul>
          </div>
        </div>

        {/* Returns */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw size={22} style={{ color: '#00C5DC' }} />
            <h2 className="text-lg font-bold text-gray-900">Return Policy</h2>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            You may return an item within <strong>7 days</strong> of delivery if it meets the conditions below.
          </p>

          <div className="space-y-3 mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Eligible for Return</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Item is faulty or damaged on arrival</li>
                <li>• Item is significantly different from its description</li>
                <li>• Wrong item was delivered</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Not Eligible for Return</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Change of mind after purchase</li>
                <li>• Item has been used and shows signs of damage caused by the buyer</li>
                <li>• Item is returned after 7 days of delivery</li>
                <li>• Missing original packaging where required</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-gray-50 border border-gray-100 text-sm text-gray-600 leading-relaxed">
            <strong>How to Return:</strong> Contact us within 7 days via WhatsApp (<strong>08123076694</strong>) or email (<strong>Info@zikkygadgets.com</strong>) with your order details, photos of the item, and a description of the issue. Our team will respond within 24 hours with next steps.
          </div>
        </div>

        {/* Refunds */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={22} style={{ color: '#52BD4A' }} />
            <h2 className="text-lg font-bold text-gray-900">Refunds</h2>
          </div>
          <ul className="text-sm text-gray-600 space-y-3">
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0 mt-0.5">•</span>
              Approved refunds are processed within <strong>3–5 business days</strong> after we receive and inspect the item.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0 mt-0.5">•</span>
              Refunds are issued via bank transfer to the account details you provide.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0 mt-0.5">•</span>
              In some cases, we may offer an exchange or store credit instead of a cash refund, where agreed.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0 mt-0.5">•</span>
              Delivery fees are non-refundable unless the return is due to our error.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl p-6 text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="text-sm font-semibold text-gray-700">Have a warranty claim or return request?</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Reach us on WhatsApp for the fastest response.</p>
          <a
            href="https://wa.me/2348123076694"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
