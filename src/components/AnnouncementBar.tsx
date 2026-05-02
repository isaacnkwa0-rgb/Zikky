'use client';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="relative flex items-center justify-center text-xs sm:text-sm text-white text-center"
      style={{
        background: 'linear-gradient(90deg, #00C5DC 0%, #4A4FCC 50%, #52BD4A 100%)',
        padding: '8px 44px 8px 16px',
        minHeight: '36px',
      }}
    >
      <span className="font-semibold tracking-wide leading-snug">
        <span className="hidden sm:inline">30 Day Return on used products &nbsp;|&nbsp; </span>
        Free Delivery within Uyo
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
