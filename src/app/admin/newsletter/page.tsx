'use client';
import { useEffect, useState } from 'react';
import { Mail, Users, Send, Trash2 } from 'lucide-react';

interface Subscriber { id: number; email: string; createdAt: string; }

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/newsletter');
    if (res.ok) setSubscribers(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    setResult(null);
    try {
      const html = body
        .split('\n')
        .map(line => line.trim() ? `<p style="margin:0 0 12px">${line}</p>` : '')
        .join('');

      const fullHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
          <div style="margin-bottom:24px">
            <img src="https://zikkygadgets.com/logo.png" alt="Zikky Gadgets" height="60" />
          </div>
          ${html}
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="font-size:12px;color:#9ca3af;margin:0">
            You received this email because you subscribed to Zikky Gadgets updates.<br/>
            <a href="https://zikkygadgets.com" style="color:#52BD4A">Visit our store</a>
          </p>
        </div>
      `;

      const res = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, html: fullHtml }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, msg: `Sent to ${data.sent} subscriber${data.sent === 1 ? '' : 's'}!` });
        setSubject('');
        setBody('');
      } else {
        setResult({ ok: false, msg: data.error ?? 'Failed to send' });
      }
    } catch {
      setResult({ ok: false, msg: 'Network error. Try again.' });
    }
    setSending(false);
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Newsletter</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Subscribers list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} style={{ color: '#52BD4A' }} />
            <h2 className="font-bold text-gray-800">Subscribers</h2>
            <span className="ml-auto text-sm font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: '#52BD4A' }}>
              {subscribers.length}
            </span>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : subscribers.length === 0 ? (
            <p className="text-sm text-gray-400">No subscribers yet.</p>
          ) : (
            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
              {subscribers.map(s => (
                <div key={s.id} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                  <Mail size={13} className="text-gray-300 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate flex-1">{s.email}</span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">
                    {new Date(s.createdAt).toLocaleDateString('en-NG')}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              const csv = 'Email,Date\n' + subscribers.map(s => `${s.email},${new Date(s.createdAt).toLocaleDateString()}`).join('\n');
              const a = document.createElement('a');
              a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
              a.download = 'subscribers.csv';
              a.click();
            }}
            className="mt-4 w-full py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Compose */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Send size={18} style={{ color: '#00C5DC' }} />
            <h2 className="font-bold text-gray-800">Send Newsletter</h2>
          </div>

          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. New Arrivals This Week 🎉"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-green-400 bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Message</label>
              <textarea
                rows={8}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Write your newsletter here. Each line becomes a paragraph."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-green-400 bg-gray-50 resize-none"
                required
              />
            </div>

            {result && (
              <p className={`text-sm font-semibold ${result.ok ? 'text-green-600' : 'text-red-500'}`}>{result.msg}</p>
            )}

            <button
              type="submit"
              disabled={sending || subscribers.length === 0}
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: '#52BD4A' }}
            >
              <Send size={15} />
              {sending ? 'Sending…' : `Send to ${subscribers.length} subscriber${subscribers.length === 1 ? '' : 's'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
