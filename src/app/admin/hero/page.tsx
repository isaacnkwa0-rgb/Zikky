'use client';
import { useState, useEffect, useRef } from 'react';
import { Pencil, Trash2, Plus, ChevronUp, ChevronDown, ToggleLeft, ToggleRight, Upload } from 'lucide-react';

interface Slide {
  id: number;
  label: string;
  headlineMain: string;
  headlineAccent: string;
  sub: string;
  cta: string;
  href: string;
  bg: string;
  fadeColor: string;
  accentColor: string;
  labelBg: string;
  btnBg: string;
  btnHover: string;
  btnShadow: string;
  image: string;
  imageAlt: string;
  order: number;
  active: boolean;
}

const empty: Omit<Slide, 'id' | 'order' | 'active'> = {
  label: '', headlineMain: '', headlineAccent: '', sub: '', cta: 'Shop now', href: '/collections',
  bg: '#00C5DC', fadeColor: 'rgba(0,197,220,0.95)', accentColor: '#1a1f36',
  labelBg: '#1a1f36', btnBg: '#52BD4A', btnHover: '#3E9638',
  btnShadow: 'rgba(82,189,74,0.45)', image: '', imageAlt: '',
};

export default function HeroAdmin() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [form, setForm] = useState<typeof empty>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const res = await fetch('/api/hero-slides');
    setSlides(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function save() {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/hero-slides/${editId}` : '/api/hero-slides';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setShowForm(false);
    setEditId(null);
    setForm(empty);
    load();
  }

  async function remove(id: number) {
    if (!confirm('Delete this slide?')) return;
    await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' });
    load();
  }

  async function toggle(slide: Slide) {
    await fetch(`/api/hero-slides/${slide.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !slide.active }),
    });
    load();
  }

  async function move(slide: Slide, dir: -1 | 1) {
    const idx = slides.findIndex(s => s.id === slide.id);
    const other = slides[idx + dir];
    if (!other) return;
    await Promise.all([
      fetch(`/api/hero-slides/${slide.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: other.order }) }),
      fetch(`/api/hero-slides/${other.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: slide.order }) }),
    ]);
    load();
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const { url } = await res.json();
    setForm(f => ({ ...f, image: url }));
    setUploading(false);
  }

  function startEdit(slide: Slide) {
    const { id, order, active, ...rest } = slide;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hero Slides</h1>
          <p className="text-sm text-gray-400">Manage homepage hero banners</p>
        </div>
        <button
          onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white"
          style={{ background: '#00C5DC' }}
        >
          <Plus size={15} /> Add Slide
        </button>
      </div>

      {/* Slide list */}
      <div className="flex flex-col gap-3 mb-8">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
            {/* Colour swatch */}
            <div className="w-10 h-10 rounded-lg flex-shrink-0 border border-gray-200" style={{ background: slide.bg }} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{slide.label}</p>
              <p className="text-xs text-gray-400 truncate">{slide.headlineMain}{slide.headlineAccent}</p>
            </div>

            {/* Active badge */}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slide.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              {slide.active ? 'Active' : 'Hidden'}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button onClick={() => move(slide, -1)} disabled={idx === 0} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronUp size={14} /></button>
              <button onClick={() => move(slide, 1)} disabled={idx === slides.length - 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronDown size={14} /></button>
              <button onClick={() => toggle(slide)} className="p-1.5 rounded hover:bg-gray-100">
                {slide.active ? <ToggleRight size={16} style={{ color: '#52BD4A' }} /> : <ToggleLeft size={16} className="text-gray-400" />}
              </button>
              <button onClick={() => startEdit(slide)} className="p-1.5 rounded hover:bg-gray-100"><Pencil size={14} className="text-gray-500" /></button>
              <button onClick={() => remove(slide.id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 size={14} className="text-red-400" /></button>
            </div>
          </div>
        ))}
        {slides.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No slides yet. Add one above.</p>}
      </div>

      {/* Form panel */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">{editId ? 'Edit Slide' : 'New Slide'}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([ ['label','Label'], ['headlineMain','Headline (main)'], ['headlineAccent','Headline (accent)'],
                  ['sub','Subtitle'], ['cta','Button text'], ['href','Link URL'], ['imageAlt','Image alt text'] ] as [keyof typeof form, string][]).map(([key, label]) => (
                <div key={key} className={key === 'sub' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  <input
                    value={form[key] as string}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00C5DC]"
                  />
                </div>
              ))}

              {/* Colour pickers */}
              {([ ['bg','Background colour'], ['accentColor','Headline accent colour'], ['labelBg','Label badge colour'],
                  ['btnBg','Button colour'], ['btnHover','Button hover colour'] ] as [keyof typeof form, string][]).map(([key, label]) => (
                <div key={key} className="flex items-center gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <input
                      type="color"
                      value={form[key] as string}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                    />
                  </div>
                </div>
              ))}

              {/* Image upload */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Slide Image</label>
                <div className="flex items-center gap-3">
                  <input
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://... or upload below"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00C5DC]"
                  />
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Upload size={13} /> {uploading ? 'Uploading…' : 'Upload'}
                  </button>
                </div>
                {form.image && <img src={form.image} alt="preview" className="mt-2 h-20 rounded-lg object-cover" />}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="px-5 py-2 rounded-lg text-sm font-bold text-white" style={{ background: '#00C5DC' }}>
                {editId ? 'Save Changes' : 'Create Slide'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
