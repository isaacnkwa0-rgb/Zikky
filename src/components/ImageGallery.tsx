'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  main: string;
  extra: string[];
  name: string;
}

export default function ImageGallery({ main, extra, name }: Props) {
  const all = [main, ...extra].filter(Boolean);
  const [selected, setSelected] = useState(0);

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
      </div>

      {/* Thumbnail strip — only shown when there are multiple images */}
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
