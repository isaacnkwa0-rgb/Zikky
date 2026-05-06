'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      category: 'Orders & Payment',
      items: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept bank transfers, card payments, and cash on delivery within Uyo. All online payments are processed securely via Paystack.',
        },
        {
          q: 'Can I pay on delivery?',
          a: 'Yes, cash on delivery is available for customers within Uyo and its environs. For orders outside Uyo, full payment is required before dispatch.',
        },
        {
          q: 'How do I place an order?',
          a: 'Simply browse our shop, add items to your cart, and proceed to checkout. You can also order directly via WhatsApp on 08123076694.',
        },
        {
          q: 'Will I get a receipt for my order?',
          a: 'Yes. An order confirmation is sent to your email or WhatsApp once your payment is confirmed.',
        },
      ],
    },
    {
      category: 'Delivery & Shipping',
      items: [
        {
          q: 'How long does delivery take?',
          a: 'Within Uyo: same day or next day. Other Akwa Ibom locations: 1–2 business days. Nationwide: 2–5 business days depending on the courier.',
        },
        {
          q: 'Do you deliver outside Akwa Ibom?',
          a: 'Yes, we ship nationwide across Nigeria using reliable courier services. Delivery fees are calculated at checkout based on your location.',
        },
        {
          q: 'How do I track my order?',
          a: 'Once your order is dispatched, you will receive a tracking number via WhatsApp or email. You can also contact us directly on 09033723931 for updates.',
        },
      ],
    },
    {
      category: 'Products & Warranty',
      items: [
        {
          q: 'Are your products original?',
          a: 'Yes. All products sold on Zikky Gadgets are 100% genuine. We source directly from authorised distributors and trusted suppliers.',
        },
        {
          q: 'What does "graded" or "refurbished" mean?',
          a: 'Graded products are pre-owned devices that have been thoroughly tested, cleaned, and certified to work perfectly. Grade A means like-new with minimal or no signs of use. See our Product Grading page for full details.',
        },
        {
          q: 'Do your products come with a warranty?',
          a: 'Yes. Brand new products carry the manufacturer\'s standard warranty. Refurbished/graded products come with our 3–12 month Zikky warranty depending on the grade.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      items: [
        {
          q: 'Can I return a product?',
          a: 'Yes. Items can be returned within 7 days of delivery if they are faulty, damaged, or significantly different from the description. The item must be in its original condition.',
        },
        {
          q: 'How do I initiate a return?',
          a: 'Contact us via WhatsApp (08123076694) or email (Info@zikkygadgets.com) with your order details and the reason for the return. Our team will guide you through the process.',
        },
        {
          q: 'How long does a refund take?',
          a: 'Refunds are processed within 3–5 business days after we receive and inspect the returned item.',
        },
      ],
    },
  ];

  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-500 mt-2">Everything you need to know about shopping with Zikky Gadgets.</p>
        </div>

        <div className="flex flex-col gap-10">
          {faqs.map(section => (
            <div key={section.category}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: '#00C5DC', borderColor: '#52BD4A' }}>
                {section.category}
              </h2>
              <div className="flex flex-col gap-2">
                {section.items.map(item => {
                  const id = item.q;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                        onClick={() => setOpen(isOpen ? null : id)}
                      >
                        <span className="text-sm font-semibold text-gray-800">{item.q}</span>
                        <ChevronDown size={16} className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4">
                          <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl p-6 text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="text-sm font-semibold text-gray-700">Still have questions?</p>
          <p className="text-sm text-gray-500 mt-1 mb-4">Our team is happy to help via WhatsApp or phone.</p>
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
