"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/* ================= EDIT HERE ================= */

const AUTOPLAY_MS = 6000;

type Slide = {
  id: string;
  /** Banner image in /public/images (2000×667, text baked in). */
  image: string;
  alt: string;
  /** Where the banner links to when clicked. */
  href: string;
};

const slides: Slide[] = [
  {
    id: "everyday",
    image: "/images/hero-1.webp",
    alt: "KadhaPlus — Traditional Kadha for Everyday Wellness. A blend of time-tested herbs in a ready-to-make sachet.",
    href: "/product",
  },
  {
    id: "immunity",
    image: "/images/hero-2.webp",
    alt: "KadhaPlus — Your Daily Immunity Kadha. A herbal blend to help you stay protected, comfortable and active every day.",
    href: "/product",
  },
  {
    id: "premium",
    image: "/images/hero-3.webp",
    alt: "KadhaPlus — Herbs in One Premium Kadha. A traditional herbal blend crafted for your everyday wellness.",
    href: "/product",
  },
];

/* ================= ICONS ================= */

const Chevron = ({ d }: { d: "l" | "r" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d === "l" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
  </svg>
);

/* ================= SLIDER ================= */

export default function KadhaHeroBanner() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const touchX = useRef<number | null>(null);
  const multi = slides.length > 1;
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);

  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    if (!multi || paused || reduce) return;
    const t = setTimeout(() => go(i + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, multi, paused, reduce, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="KadhaPlus highlights"
      className="relative overflow-hidden bg-[#fbf6e6]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="grid">
        {slides.map((s, idx) => {
          const on = idx === i;
          return (
            <Link
              key={s.id}
              href={s.href}
              tabIndex={on ? 0 : -1}
              aria-hidden={!on}
              aria-label={s.alt}
              className={`col-start-1 row-start-1 block transition-opacity duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#2a6a35] ${
                on ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
              }`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                width={2000}
                height={667}
                priority={idx === 0}
                sizes="100vw"
                className="h-auto w-full"
              />
            </Link>
          );
        })}
      </div>

      {/* arrows */}
      {multi && (["l", "r"] as const).map((d) => (
        <button
          key={d}
          type="button"
          aria-label={d === "l" ? "Previous slide" : "Next slide"}
          onClick={() => go(i + (d === "l" ? -1 : 1))}
          className={`absolute top-1/2 z-40 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#14403a] shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2a6a35] md:grid ${d === "l" ? "left-4" : "right-4"}`}
        >
          <Chevron d={d} />
        </button>
      ))}

      {/* dots */}
      {multi && (
      <div role="tablist" aria-label="Choose slide" className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-2 sm:bottom-5">
        {slides.map((s, n) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={n === i}
            aria-label={`Go to slide ${n + 1}`}
            onClick={() => go(n)}
            className={`h-2.5 rounded-full shadow transition-all ${n === i ? "w-9 bg-[#14403a]" : "w-2.5 bg-[#14403a]/40"}`}
          />
        ))}
      </div>
      )}
    </section>
  );
}
