'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  main: string;
  extra: string[];
  name: string;
}

export default function ImageGallery({ main, extra, name }: Props) {
  const all = [main, ...extra].filter(Boolean);
  const [selected, setSelected] = useState(0);

  function prev() { setSelected(i => (i === 0 ? all.length - 1 : i - 1)); }
  function next() { setSelected(i => (i === all.length - 1 ? 0 : i + 1)); }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
        {all[selected] ? (
          <Image
            src={all[selected]}
            alt={name}
            fill
            className="object-contain p-6 transition-opacity duration-200"
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200 text-8xl">📦</div>
        )}

        {/* Side arrows — only when multiple images */}
        {all.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {all.length > 1 && (
        <div className="flex gap-2">
          {all.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                selected === i ? 'border-cyan-400 shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image src={src} alt={`${name} view ${i + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
