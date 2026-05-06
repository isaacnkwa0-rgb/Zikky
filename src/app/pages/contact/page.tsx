import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const metadata = { title: 'Contact Us — Zikky Gadgets' };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-2">We&apos;re here to help — reach us through any of the channels below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Contact details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Get in Touch</h2>

            <a href="tel:09033723931" className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0fdf4' }}>
                <Phone size={18} style={{ color: '#52BD4A' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone</p>
                <p className="text-sm font-bold text-gray-800 group-hover:underline">09033723931</p>
                <p className="text-xs text-gray-400 mt-0.5">Mon – Sat, 9 am – 6 pm</p>
              </div>
            </a>

            <a href="https://wa.me/2348123076694" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0fdf4' }}>
                <MessageCircle size={18} style={{ color: '#25D366' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">WhatsApp</p>
                <p className="text-sm font-bold text-gray-800 group-hover:underline">08123076694</p>
                <p className="text-xs text-gray-400 mt-0.5">Chat with us anytime</p>
              </div>
            </a>

            <a href="mailto:Info@zikkygadgets.com" className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0fdf4' }}>
                <Mail size={18} style={{ color: '#52BD4A' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                <p className="text-sm font-bold text-gray-800 group-hover:underline">Info@zikkygadgets.com</p>
                <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0fdf4' }}>
                <MapPin size={18} style={{ color: '#52BD4A' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Store Address</p>
                <p className="text-sm font-bold text-gray-800">226 Oron Rd, Uyo</p>
                <p className="text-xs text-gray-400 mt-0.5">Akwa Ibom State, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Quick message card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Send a Message</h2>
            <form className="flex flex-col gap-4" action={`https://wa.me/2348123076694`}>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Chisom Eze"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-green-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-green-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-green-400 bg-gray-50 resize-none"
                />
              </div>
              <a
                href="https://wa.me/2348123076694"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-white font-bold text-sm text-center transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                Send via WhatsApp
              </a>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
