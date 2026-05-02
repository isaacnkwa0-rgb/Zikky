'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, ToggleLeft, ToggleRight } from 'lucide-react';

type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  svgKey: string | null;
  count: string;
  order: number;
  active: boolean;
};

type FormState = { name: string; slug: string; icon: string; svgKey: string; count: string };

const EMPTY: FormState = {
  name: '', slug: '', icon: '', svgKey: '', count: '0',
};

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function CategoriesAdmin() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Category | null }>({ open: false, editing: null });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function load() {
    const res = await fetch('/api/categories');
    setCats(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm({ ...EMPTY });
    setModal({ open: true, editing: null });
  }

  function openEdit(cat: Category) {
    setForm({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon ?? '',
      svgKey: cat.svgKey ?? '',
      count: cat.count,
    });
    setModal({ open: true, editing: cat });
  }

  function closeModal() {
    setModal({ open: false, editing: null });
  }

  async function save() {
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || slugify(form.name.trim()),
      icon: form.icon.trim() || null,
      svgKey: form.svgKey.trim() || null,
      count: form.count.trim() || '0',
    };
    if (modal.editing) {
      await fetch(`/api/categories/${modal.editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      const nextOrder = cats.length;
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, order: nextOrder, active: true }),
      });
    }
    setSaving(false);
    closeModal();
    load();
  }

  async function remove(id: number) {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    setDeleteConfirm(null);
    load();
  }

  async function toggle(cat: Category) {
    await fetch(`/api/categories/${cat.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !cat.active }),
    });
    load();
  }

  async function move(cat: Category, dir: 'up' | 'down') {
    const sorted = [...cats].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex(c => c.id === cat.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const swap = sorted[swapIdx];
    await Promise.all([
      fetch(`/api/categories/${cat.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: swap.order }) }),
      fetch(`/api/categories/${swap.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: cat.order }) }),
    ]);
    load();
  }

  const sorted = [...cats].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">{cats.length} total</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ background: '#00C5DC' }}
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Slug</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Count</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Active</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Order</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((cat, i) => (
                <tr key={cat.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl w-8 text-center">{cat.icon || '📦'}</span>
                      <span className="font-medium text-gray-800">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell font-mono text-xs">{cat.slug}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{cat.count}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggle(cat)}>
                      {cat.active
                        ? <ToggleRight size={22} style={{ color: '#00C5DC' }} />
                        : <ToggleLeft size={22} className="text-gray-300" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => move(cat, 'up')} disabled={i === 0} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30">
                        <ChevronUp size={14} />
                      </button>
                      <button onClick={() => move(cat, 'down')} disabled={i === sorted.length - 1} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30">
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500">
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === cat.id ? (
                        <span className="flex items-center gap-1 text-xs">
                          <button onClick={() => remove(cat.id)} className="px-2 py-1 bg-red-500 text-white rounded-md">Yes</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-gray-100 rounded-md">No</button>
                        </span>
                      ) : (
                        <button onClick={() => setDeleteConfirm(cat.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400">
                          <Trash2 size={14} />
                        </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {modal.editing ? 'Edit Category' : 'Add Category'}
            </h2>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Name *</span>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#00C5DC' } as React.CSSProperties}
                  value={form.name}
                  onChange={e => setForm(f => ({
                    ...f,
                    name: e.target.value,
                    slug: f.slug || slugify(e.target.value),
                  }))}
                  placeholder="e.g. Mobile Phones"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Slug *</span>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2"
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="e.g. mobile-phones"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Emoji Icon</span>
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
                    value={form.icon}
                    onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                    placeholder="e.g. 📱"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">SVG Key</span>
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2"
                    value={form.svgKey}
                    onChange={e => setForm(f => ({ ...f, svgKey: e.target.value }))}
                    placeholder="e.g. apple"
                  />
                  <span className="text-[10px] text-gray-400">Built-in: apple, playstation</span>
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Product Count</span>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
                  value={form.count}
                  onChange={e => setForm(f => ({ ...f, count: e.target.value }))}
                  placeholder="e.g. 500+"
                />
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={save}
                disabled={saving || !form.name.trim()}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: '#00C5DC' }}
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
