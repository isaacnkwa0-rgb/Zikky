'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
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
}

const fallbackSlides: Slide[] = [
  {
    label: 'New & Used Tech',
    headlineMain: 'Premium tech at ',
    headlineAccent: 'lower prices.',
    sub: 'Shop smartphones, gaming, audio and more — new & refurbished, all fully tested.',
    cta: 'Shop now',
    href: '/collections',
    bg: '#00C5DC',
    fadeColor: 'rgba(0,197,220,0.95)',
    accentColor: '#1a1f36',
    labelBg: '#1a1f36',
    btnBg: '#52BD4A',
    btnHover: '#3E9638',
    btnShadow: 'rgba(82,189,74,0.45)',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    imageAlt: 'Smartphones',
  },
  {
    label: 'Gaming & Consoles',
    headlineMain: 'Play more, ',
    headlineAccent: 'pay less.',
    sub: 'PlayStation, Xbox, Nintendo — guaranteed, tested and ready to ship across Nigeria.',
    cta: 'Explore gaming',
    href: '/collections/consoles',
    bg: '#52BD4A',
    fadeColor: 'rgba(82,189,74,0.95)',
    accentColor: '#1a1f36',
    labelBg: '#1a1f36',
    btnBg: '#00C5DC',
    btnHover: '#00A8BC',
    btnShadow: 'rgba(0,197,220,0.45)',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=600&fit=crop',
    imageAlt: 'PlayStation 5',
  },
];

function HeroButton({ slide }: { slide: Slide }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={slide.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-block self-start font-bold text-white transition-all duration-200"
      style={{
        background: hovered ? slide.btnHover : slide.btnBg,
        fontSize: '12px',
        padding: '8px 20px',
        borderRadius: '10px',
        marginTop: '14px',
        letterSpacing: '0.03em',
        boxShadow: hovered
          ? `0 6px 18px ${slide.btnShadow}`
          : `0 3px 10px ${slide.btnShadow}`,
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {slide.cta} →
    </Link>
  );
}

export default function HeroSection({ slides: slidesProp }: { slides?: Slide[] }) {
  const slides = (slidesProp && slidesProp.length > 0) ? slidesProp : fallbackSlides;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: slide.bg, transition: 'background 0.7s ease', marginBottom: '40px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Mobile: stacked, centred ── */}
      <div className="md:hidden relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-4">
        <span
          className="text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
          style={{ background: slide.labelBg, letterSpacing: '0.12em' }}
        >
          {slide.label}
        </span>
        <h1 className="text-2xl font-extrabold leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
          <span className="text-white">{slide.headlineMain}</span>
          <span style={{ color: slide.accentColor }}>{slide.headlineAccent}</span>
        </h1>
        <p className="text-white/85 text-xs leading-relaxed mt-3 max-w-xs">
          {slide.sub}
        </p>
        <div className="flex justify-center w-full">
          <HeroButton slide={slide} />
        </div>

        <div className="relative w-full rounded-xl overflow-hidden mt-14" style={{ height: '200px' }}>
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            style={{ mixBlendMode: 'luminosity', opacity: 0.9 }}
            priority
          />
        </div>
      </div>

      {/* ── Desktop: side-by-side ── */}
      <div className="hidden md:flex relative z-10 items-stretch w-full" style={{ minHeight: '340px' }}>

        {/* Left text */}
        <div
          className="flex flex-col justify-center w-[48%] py-12"
          style={{ paddingLeft: '80px', paddingRight: '32px' }}
        >
          <span
            className="self-start text-[9px] font-bold uppercase text-white px-3 py-1 rounded-full mb-5"
            style={{ background: slide.labelBg, letterSpacing: '0.12em' }}
          >
            {slide.label}
          </span>
          <h1
            className="text-4xl lg:text-5xl font-extrabold leading-tight"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.12)' }}
          >
            <span className="text-white">{slide.headlineMain}</span>
            <span style={{ color: slide.accentColor }}>{slide.headlineAccent}</span>
          </h1>
          <p className="text-white/85 text-sm leading-relaxed mt-4" style={{ maxWidth: '340px' }}>
            {slide.sub}
          </p>
          <HeroButton slide={slide} />
        </div>

        {/* Right image */}
        <div className="flex-1 relative overflow-hidden">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover object-center"
            sizes="52vw"
            style={{ mixBlendMode: 'luminosity', opacity: 0.88 }}
            priority
          />
          <div
            className="absolute inset-y-0 left-0 w-24 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${slide.fadeColor}, transparent)` }}
          />
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? '18px' : '6px',
              height: '6px',
              background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
