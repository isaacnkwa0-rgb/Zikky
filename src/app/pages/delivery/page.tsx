import { Truck, Clock, MapPin, Phone } from 'lucide-react';

export const metadata = { title: 'Delivery Information — Zikky Gadgets' };

const zones = [
  {
    zone: 'Within Uyo',
    time: 'Same day or next day',
    fee: '₦500 – ₦1,000',
    note: 'Orders placed before 3 pm are usually delivered same day.',
  },
  {
    zone: 'Other Akwa Ibom Towns',
    time: '1–2 business days',
    fee: '₦1,000 – ₦2,000',
    note: 'Covers Eket, Ikot Ekpene, Oron, Abak, and surrounding towns.',
  },
  {
    zone: 'Nationwide (Nigeria)',
    time: '2–5 business days',
    fee: 'Calculated at checkout',
    note: 'We ship to all 36 states via GIG Logistics, DHL, and other reliable couriers.',
  },
];

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Delivery Information</h1>
          <p className="text-gray-500 mt-2">Fast, reliable delivery across Akwa Ibom and all of Nigeria.</p>
        </div>

        {/* Delivery zones */}
        <div className="flex flex-col gap-4 mb-10">
          {zones.map(z => (
            <div key={z.zone} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0fdf4' }}>
                  <Truck size={18} style={{ color: '#52BD4A' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{z.zone}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock size={13} style={{ color: '#00C5DC' }} /> {z.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={13} style={{ color: '#52BD4A' }} /> {z.fee}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{z.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important notes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Important Notes</h2>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              Delivery times are business days (Monday – Saturday). Public holidays may cause delays.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              Orders are dispatched within 24 hours of payment confirmation.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              You will receive a tracking number via WhatsApp or email once your order is shipped.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              Please ensure your delivery address and phone number are correct at checkout to avoid delays.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500 flex-shrink-0">•</span>
              For bulk or large orders, please contact us before placing your order so we can arrange the best delivery option.
            </li>
          </ul>
        </div>

        {/* Store pickup */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-3">Store Pickup</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Prefer to pick up in person? Visit us at <strong>226 Oron Road, Uyo, Akwa Ibom State</strong>. Store hours are Monday to Saturday, 9 am – 6 pm. Call ahead on <strong>09033723931</strong> to confirm stock availability before visiting.
          </p>
        </div>

        <div className="rounded-2xl p-6 text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="text-sm text-gray-600 mb-1">Need help with your delivery?</p>
          <p className="text-xs text-gray-400 mb-4">Call or WhatsApp us — we&apos;re happy to assist.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:09033723931"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: '#52BD4A' }}
            >
              <Phone size={14} /> Call Us
            </a>
            <a
              href="https://wa.me/2348123076694"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
