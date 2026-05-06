import { Package, Phone, MessageCircle } from 'lucide-react';

export const metadata = { title: 'Track Your Order — Zikky Gadgets' };

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">

        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#f0fdf4' }}>
          <Package size={30} style={{ color: '#52BD4A' }} />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Track Your Order</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          To get a real-time update on your order, contact us directly with your <strong>order number</strong> or the <strong>phone number</strong> you used at checkout. Our team will send you your tracking details right away.
        </p>

        <div className="flex flex-col gap-4 mb-10">
          <a
            href="https://wa.me/2348123076694"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={18} />
            Track via WhatsApp — 08123076694
          </a>
          <a
            href="tel:09033723931"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#52BD4A' }}
          >
            <Phone size={18} />
            Call Us — 09033723931
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">When contacting us, have ready:</h2>
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              Your order number (found in your confirmation message)
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              The phone number or email used during checkout
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              The name of the product(s) ordered
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
