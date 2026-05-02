'use client';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type OrderItem = { id: number; name: string; price: number; quantity: number; image: string };

type Order = {
  id: number;
  reference: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  paidAt: string | null;
  createdAt: string;
  items: OrderItem[];
};

const STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  async function load() {
    const res = await fetch('/api/orders');
    setOrders(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">{orders.length} total</p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">No orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Row */}
              <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                <button
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown size={16} className={`transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">{order.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{order.reference}</p>
                </div>

                <div className="hidden sm:block text-sm text-gray-500 min-w-[160px]">
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-extrabold text-gray-900">{fmt(order.total)}</p>
                  <p className="text-xs text-gray-400">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                </div>

                <select
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 cursor-pointer outline-none ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s} className="bg-white text-gray-800 font-normal">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>

                <p className="text-xs text-gray-400 hidden lg:block">
                  {new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Expanded items */}
              {expanded === order.id && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delivery Address</p>
                      <p className="text-sm text-gray-700">{order.address}</p>
                    </div>
                    {order.paidAt && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Paid At</p>
                        <p className="text-sm text-gray-700">{new Date(order.paidAt).toLocaleString('en-NG')}</p>
                      </div>
                    )}
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b border-gray-200">
                        <th className="text-left pb-2 font-semibold">Item</th>
                        <th className="text-right pb-2 font-semibold">Qty</th>
                        <th className="text-right pb-2 font-semibold">Price</th>
                        <th className="text-right pb-2 font-semibold">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map(item => (
                        <tr key={item.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-2 text-gray-800">{item.name}</td>
                          <td className="py-2 text-right text-gray-500">{item.quantity}</td>
                          <td className="py-2 text-right text-gray-500">{fmt(item.price)}</td>
                          <td className="py-2 text-right font-semibold text-gray-800">{fmt(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
