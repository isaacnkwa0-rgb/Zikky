'use client';
import { useState, useEffect, useRef } from 'react';
import { Pencil, Trash2, Plus, ChevronUp, ChevronDown, ToggleLeft, ToggleRight, Upload } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  sub: string;
  href: string;
  image: string;
  cta: string;
  order: number;
  active: boolean;
}

const empty = { title: '', sub: '', href: '', image: '', cta: 'Shop Now' };

export default function BannersAdmin() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const res = await fetch('/api/promo-banners');
    setBanners(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function save() {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/promo-banners/${editId}` : '/api/promo-banners';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setShowForm(false);
    setEditId(null);
    setForm(empty);
    load();
  }

  async function remove(id: number) {
    if (!confirm('Delete this banner?')) return;
    await fetch(`/api/promo-banners/${id}`, { method: 'DELETE' });
    load();
  }

  async function toggle(banner: Banner) {
    await fetch(`/api/promo-banners/${banner.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !banner.active }),
    });
    load();
  }

  async function move(banner: Banner, dir: -1 | 1) {
    const idx = banners.findIndex(b => b.id === banner.id);
    const other = banners[idx + dir];
    if (!other) return;
    await Promise.all([
      fetch(`/api/promo-banners/${banner.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: other.order }) }),
      fetch(`/api/promo-banners/${other.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: banner.order }) }),
    ]);
    load();
  }

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setForm(f => ({ ...f, image: data.url }));
    } catch (err) {
      alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploading(false);
    }
  }

  function startEdit(b: Banner) {
    setForm({ title: b.title, sub: b.sub, href: b.href, image: b.image, cta: b.cta });
    setEditId(b.id);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Promo Banners</h1>
          <p className="text-sm text-gray-400">Manage the 3 promo cards below Back in Stock</p>
        </div>
        <button
          onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white"
          style={{ background: '#52BD4A' }}
        >
          <Plus size={15} /> Add Banner
        </button>
      </div>

      {banners.length >= 3 && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4">
          Recommended: keep 3 banners for the best layout. Currently showing {banners.filter(b => b.active).length} active.
        </p>
      )}

      <div className="flex flex-col gap-3 mb-8">
        {banners.map((b, idx) => (
          <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
            {b.image && <img src={b.image} alt={b.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0 border border-gray-100" />}
            {!b.image && <div className="w-16 h-12 rounded-lg bg-gray-100 flex-shrink-0 border border-gray-200" />}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{b.title}</p>
              <p className="text-xs text-gray-400 truncate">{b.sub}</p>
            </div>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              {b.active ? 'Active' : 'Hidden'}
            </span>

            <div className="flex items-center gap-1">
              <button onClick={() => move(b, -1)} disabled={idx === 0} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronUp size={14} /></button>
              <button onClick={() => move(b, 1)} disabled={idx === banners.length - 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronDown size={14} /></button>
              <button onClick={() => toggle(b)} className="p-1.5 rounded hover:bg-gray-100">
                {b.active ? <ToggleRight size={16} style={{ color: '#52BD4A' }} /> : <ToggleLeft size={16} className="text-gray-400" />}
              </button>
              <button onClick={() => startEdit(b)} className="p-1.5 rounded hover:bg-gray-100"><Pencil size={14} className="text-gray-500" /></button>
              <button onClick={() => remove(b.id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 size={14} className="text-red-400" /></button>
            </div>
          </div>
        ))}
        {banners.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No banners yet. Add one above.</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">{editId ? 'Edit Banner' : 'New Banner'}</h2>

            <div className="flex flex-col gap-4">
              {([ ['title','Title'], ['sub','Subtitle'], ['href','Link URL'], ['cta','Button text'] ] as [keyof typeof form, string][]).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  <input
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#52BD4A]"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Image</label>
                <div className="flex items-center gap-3">
                  <input
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://... or upload"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#52BD4A]"
                  />
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border border-gray-300 hover:bg-gray-50 disabled:opacity-50">
                    <Upload size={13} /> {uploading ? 'Uploading…' : 'Upload'}
                  </button>
                </div>
                {form.image && <img src={form.image} alt="preview" className="mt-2 h-20 rounded-lg object-cover" />}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="px-5 py-2 rounded-lg text-sm font-bold text-white" style={{ background: '#52BD4A' }}>
                {editId ? 'Save Changes' : 'Create Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
