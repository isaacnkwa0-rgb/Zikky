'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, ToggleLeft, ToggleRight, Upload, X } from 'lucide-react';
import Image from 'next/image';

type Category = { id: number; name: string; slug: string };

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  images: string;
  categoryId: number | null;
  category: { name: string; slug: string } | null;
  badge: string | null;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  active: boolean;
  order: number;
};

type FormState = {
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string;
  imageSlots: [string, string, string];
  categoryId: string;
  badge: string;
  stock: string;
  rating: string;
  reviews: string;
  featured: boolean;
};

const EMPTY: FormState = {
  name: '', slug: '', description: '', price: '', originalPrice: '',
  imageSlots: ['', '', ''],
  categoryId: '', badge: '', stock: '0', rating: '0', reviews: '0', featured: false,
};

function slugify(t: string) {
  return t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

function parseImages(raw: string): string[] {
  try { return JSON.parse(raw); } catch { return []; }
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Product | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function load() {
    const [pRes, cRes] = await Promise.all([fetch('/api/products?admin=1'), fetch('/api/categories')]);
    const [p, c] = await Promise.all([pRes.json(), cRes.json()]);
    setProducts(Array.isArray(p) ? p : []);
    setCategories(Array.isArray(c) ? c : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm({ ...EMPTY, imageSlots: ['', '', ''] });
    setModal({ open: true, editing: null });
  }

  function openEdit(p: Product) {
    const extra = parseImages(p.images);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: String(p.price),
      originalPrice: p.originalPrice != null ? String(p.originalPrice) : '',
      imageSlots: [p.image ?? '', extra[0] ?? '', extra[1] ?? ''],
      categoryId: p.categoryId != null ? String(p.categoryId) : '',
      badge: p.badge ?? '',
      stock: String(p.stock),
      rating: String(p.rating),
      reviews: String(p.reviews),
      featured: p.featured,
    });
    setModal({ open: true, editing: p });
  }

  function closeModal() { setModal({ open: false, editing: null }); }

  function setSlot(idx: number, url: string) {
    setForm(f => {
      const slots = [...f.imageSlots] as [string, string, string];
      slots[idx] = url;
      return { ...f, imageSlots: slots };
    });
  }

  async function uploadImage(file: File, slotIdx: number) {
    setUploadingSlot(slotIdx);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    setUploadingSlot(null);
    setSlot(slotIdx, data.url as string);
  }

  async function save() {
    setSaving(true);
    try {
      const extra = form.imageSlots.slice(1).filter(Boolean);
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name.trim()),
        description: form.description.trim(),
        price: parseInt(form.price) || 0,
        originalPrice: form.originalPrice ? parseInt(form.originalPrice) : null,
        image: form.imageSlots[0].trim(),
        images: JSON.stringify(extra),
        categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        badge: form.badge.trim() || null,
        stock: parseInt(form.stock) || 0,
        rating: parseFloat(form.rating) || 0,
        reviews: parseInt(form.reviews) || 0,
        featured: form.featured,
      };
      let res;
      if (modal.editing) {
        res = await fetch(`/api/products/${modal.editing.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, active: true }),
        });
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${res.status}`);
      }
      closeModal();
      load();
    } catch (err) {
      alert('Failed to save: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setDeleteConfirm(null);
    load();
  }

  async function toggle(p: Product) {
    await fetch(`/api/products/${p.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !p.active }),
    });
    load();
  }

  async function move(p: Product, dir: 'up' | 'down') {
    const sorted = [...products].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex(x => x.id === p.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const swap = sorted[swapIdx];
    await Promise.all([
      fetch(`/api/products/${p.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: swap.order }) }),
      fetch(`/api/products/${swap.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: p.order }) }),
    ]);
    load();
  }

  const sorted = [...products].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: '#00C5DC' }}>
          <Plus size={15} /> Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : sorted.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">No products yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Stock</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Featured</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Active</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Order</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Main image + thumbnail strip */}
                      <div className="flex gap-1 flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative">
                          {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />}
                        </div>
                        {parseImages(p.images).slice(0, 2).map((img, j) => (
                          <div key={j} className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative hidden sm:block">
                            <Image src={img} alt="" fill className="object-cover" unoptimized />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{p.name}</p>
                        {p.badge && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-700">{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell text-xs">{p.category?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">{fmt(p.price)}</p>
                    {p.originalPrice && <p className="text-xs text-gray-400 line-through">{fmt(p.originalPrice)}</p>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    {p.featured ? <span className="text-yellow-500 text-xs font-semibold">★ Yes</span> : <span className="text-gray-300 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggle(p)}>
                      {p.active ? <ToggleRight size={22} style={{ color: '#00C5DC' }} /> : <ToggleLeft size={22} className="text-gray-300" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => move(p, 'up')} disabled={i === 0} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronUp size={14} /></button>
                      <button onClick={() => move(p, 'down')} disabled={i === sorted.length - 1} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronDown size={14} /></button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={14} /></button>
                      {deleteConfirm === p.id ? (
                        <span className="flex items-center gap-1 text-xs">
                          <button onClick={() => remove(p.id)} className="px-2 py-1 bg-red-500 text-white rounded-md">Yes</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-gray-100 rounded-md">No</button>
                        </span>
                      ) : (
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Trash2 size={14} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {modal.editing ? 'Edit Product' : 'Add Product'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Name */}
              <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Name *</span>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                  placeholder="e.g. iPhone 15 Pro Max"
                />
              </label>

              {/* Slug */}
              <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Slug *</span>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-cyan-400"
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="e.g. iphone-15-pro-max"
                />
              </label>

              {/* ── Image slots ── */}
              <div className="sm:col-span-2 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Product Images <span className="text-gray-400 normal-case font-normal">(slot 1 = main image)</span>
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {([0, 1, 2] as const).map(idx => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      {/* Preview */}
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200">
                        {form.imageSlots[idx] ? (
                          <>
                            <Image src={form.imageSlots[idx]} alt={`Image ${idx + 1}`} fill className="object-cover" unoptimized />
                            <button
                              onClick={() => setSlot(idx, '')}
                              className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                            >
                              <X size={10} />
                            </button>
                            {idx === 0 && (
                              <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-cyan-500 text-white px-1.5 py-0.5 rounded">MAIN</span>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-300">
                            <Upload size={20} />
                            <span className="text-[10px]">{idx === 0 ? 'Main' : `Image ${idx + 1}`}</span>
                          </div>
                        )}
                        {uploadingSlot === idx && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                            <p className="text-xs text-gray-500">Uploading…</p>
                          </div>
                        )}
                      </div>

                      {/* URL input */}
                      <input
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-cyan-400 w-full"
                        value={form.imageSlots[idx]}
                        onChange={e => setSlot(idx, e.target.value)}
                        placeholder="Paste URL…"
                      />

                      {/* Upload button */}
                      <label className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload size={11} />
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) uploadImage(file, idx);
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Price (₦) *</span>
                <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. 450000" />
              </label>

              {/* Original Price */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Original Price (₦)</span>
                <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} placeholder="e.g. 520000" />
              </label>

              {/* Category */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Category</span>
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                  <option value="">— None —</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </label>

              {/* Badge */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Badge</span>
                <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="e.g. New, Hot Deal, Refurb" />
              </label>

              {/* Stock */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Stock</span>
                <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
              </label>

              {/* Rating */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Rating (0–5)</span>
                <input type="number" step="0.1" min="0" max="5" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} />
              </label>

              {/* Reviews */}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Review Count</span>
                <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                  value={form.reviews} onChange={e => setForm(f => ({ ...f, reviews: e.target.value }))} />
              </label>

              {/* Description */}
              <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Description</span>
                <textarea rows={3} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400 resize-none"
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short product description…" />
              </label>

              {/* Featured */}
              <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-cyan-500" />
                <span className="text-sm text-gray-700">Featured on homepage</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving || !form.name.trim() || !form.price}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50" style={{ background: '#00C5DC' }}>
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
