import { CheckCircle } from 'lucide-react';

export const metadata = { title: 'Product Grading Explained — Zikky Gadgets' };

const grades = [
  {
    label: 'Brand New',
    color: '#52BD4A',
    badge: 'NEW',
    description: 'Sealed in original manufacturer packaging. Never opened or used. Comes with full manufacturer warranty and all original accessories.',
    points: [
      'Factory sealed box',
      'All original accessories included',
      'Full manufacturer warranty',
      'Zero cosmetic wear',
    ],
  },
  {
    label: 'Grade A (Like New)',
    color: '#00C5DC',
    badge: 'A',
    description: 'A pre-owned device in excellent condition. May show very light signs of use that are barely noticeable. Fully tested and certified to work like new.',
    points: [
      'Minimal to no visible scratches',
      'Fully functional — all features tested',
      '12-month Zikky warranty',
      'May not include original box',
    ],
  },
  {
    label: 'Grade B (Good)',
    color: '#f59e0b',
    badge: 'B',
    description: 'A pre-owned device with light cosmetic wear such as minor scratches. Fully operational. Ideal for buyers who prioritise value over aesthetics.',
    points: [
      'Light scratches on body or screen',
      'All core functions working perfectly',
      '6-month Zikky warranty',
      'No original box or accessories',
    ],
  },
  {
    label: 'Grade C (Fair)',
    color: '#f97316',
    badge: 'C',
    description: 'A pre-owned device with noticeable cosmetic wear but fully functional. Suitable for budget-conscious buyers who need a working device.',
    points: [
      'Visible scratches or dents',
      'Screen may have minor marks',
      '3-month Zikky warranty',
      'Sold as-is on cosmetics',
    ],
  },
];

export default function GradingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Product Grading Explained</h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Every product on Zikky Gadgets is graded before listing so you always know exactly what you&apos;re buying.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {grades.map(grade => (
            <div key={grade.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-5" style={{ borderLeft: `4px solid ${grade.color}` }}>
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0"
                  style={{ background: grade.color }}
                >
                  {grade.badge}
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-gray-900">{grade.label}</h2>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{grade.description}</p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {grade.points.map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: grade.color }} />
                    <span className="text-xs text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-2">Our Testing Process</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Every pre-owned device goes through a thorough inspection covering screen quality, battery health, cameras, speakers, charging port, buttons, and connectivity (Wi-Fi, Bluetooth, cellular). Only devices that pass our checks are listed for sale. The grade reflects cosmetic condition only — all devices are guaranteed to function correctly.
          </p>
        </div>

        <div className="mt-6 rounded-2xl p-6 text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="text-sm text-gray-600">Have questions about a specific product&apos;s condition?</p>
          <a
            href="https://wa.me/2348123076694"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            Ask on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
