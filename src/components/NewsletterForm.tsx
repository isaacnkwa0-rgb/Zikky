'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else if (res.status === 409) {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 px-6 py-6 sm:px-8" style={{ background: '#f0fdf4', borderTop: '3px solid #52BD4A' }}>
        <p className="text-sm font-bold text-green-700">You&apos;re subscribed! Thanks for joining. 🎉</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 flex-1 px-6 py-6 sm:px-8"
      style={{ background: '#f0fdf4', borderTop: '3px solid #52BD4A' }}
    >
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full sm:flex-1 text-sm text-gray-700 outline-none rounded-lg"
        style={{ border: '1.5px solid #e5e7eb', background: '#fff', height: '48px', padding: '0 16px' }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto flex-shrink-0 text-sm font-bold text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ background: '#52BD4A', height: '44px', padding: '0 28px' }}
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'duplicate' && <p className="text-xs text-amber-600 w-full sm:w-auto">Already subscribed!</p>}
      {status === 'error' && <p className="text-xs text-red-500 w-full sm:w-auto">Something went wrong. Try again.</p>}
    </form>
  );
}
