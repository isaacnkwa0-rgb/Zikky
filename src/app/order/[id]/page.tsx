import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Package, MapPin, Phone, Mail } from 'lucide-react';

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: Number(params.id) },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#52BD4A' }}>
            <CheckCircle size={32} color="#fff" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-500 mt-1">Thank you, {order.name}. Your payment was successful.</p>
        </div>

        {/* Order card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Order meta */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-gray-400 font-medium">Order Reference</p>
              <p className="text-sm font-mono font-bold text-gray-800">{order.reference}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Package size={16} /> Items Ordered
            </h2>
            <ul className="flex flex-col gap-4">
              {order.items.map(item => (
                <li key={item.id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden relative flex-shrink-0">
                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity} × {fmt(item.price)}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800">{fmt(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
              <span className="text-sm font-bold text-gray-700">Total Paid</span>
              <span className="text-base font-extrabold text-gray-900">{fmt(order.total)}</span>
            </div>
          </div>

          {/* Delivery info */}
          <div className="px-6 py-5">
            <h2 className="text-sm font-bold text-gray-700 mb-4">Delivery Details</h2>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>{order.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-gray-400 flex-shrink-0" />
                <span>{order.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-gray-400 flex-shrink-0" />
                <span>{order.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="flex-1 py-3 rounded-xl font-semibold text-white text-center text-sm"
            style={{ background: '#00C5DC' }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-white border border-gray-200 text-center text-sm hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          A confirmation email will be sent to {order.email}
        </p>
      </div>
    </div>
  );
}
