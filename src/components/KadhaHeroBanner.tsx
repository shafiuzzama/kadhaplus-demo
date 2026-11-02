"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Poppins, Fraunces } from "next/font/google";

const sans = Poppins({ weight: ["400", "500", "600", "700", "800"], subsets: ["latin"] });
const serif = Fraunces({ weight: ["500", "600", "700"], subsets: ["latin"] });

/* ================= EDIT HERE ================= */

const AUTOPLAY_MS = 6500;

type Variant = "pack" | "ingredients" | "price";

type Slide = {
  id: string;
  variant: Variant;
  /** Optional real lifestyle photo (put in /public/images). If set, it replaces the CSS scene. */
  bgImage?: string;
  sky: string; // tailwind gradient classes for the scene
  line1: string;
  line2: string; // highlighted like Supply6
  sub: string;
  cta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    id: "classic",
    variant: "pack",
    sky: "from-[#cfe6d8] via-[#f3f1e4] to-[#fbf6e6]",
    line1: "Dadi maa ka nuskha, ab sachet me.",
    line2: "KadhaPlus Instant Kadha.",
    sub: "Jadi-bootiyon se bana herbal kadha powder. Garam paani me ghoolo, aur pyaala taiyaar.",
    cta: { label: "Shop Now", href: "#product" },
  },
  {
    id: "herbs",
    variant: "ingredients",
    sky: "from-[#f3dcae] via-[#f8ecd0] to-[#fbf6e6]",
    line1: "Mausam badle, kadha toh banta hai.",
    line2: "Tulsi, Mulethi, Adrak & more.",
    sub: "Parampara se judi jadi-bootiyon ka ek garam pyaala.",
    cta: { label: "See Ingredients", href: "#ingredients" },
  },
  {
    id: "price",
    variant: "price",
    sky: "from-[#f2c9a6] via-[#f7e3cc] to-[#fbf6e6]",
    line1: "Pack of 5 sachets, sirf ₹89.",
    line2: "₹20 ka ek sachet.",
    sub: "Na ubalna, na jhanjhat. Ghar, office ya safar me — bas garam paani chahiye.",
    cta: { label: "Order Pack of 5", href: "#product" },
  },
];

const HERBS = ["Tulsi", "Mulethi", "Adrak", "Kali Mirch", "Dalchini", "Haldi", "Elaichi", "Laung"];

/* ================= PRODUCT ART (pure CSS, no images needed) ================= */

const LeafMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 128" className={className} fill="currentColor" aria-hidden>
    <path d="M32 4c8 10 14 20 8 34 10-6 18-4 20 6-6 8-14 10-22 8 10 2 16 8 14 18-8 4-16 0-22-8-6 8-14 12-22 8-2-10 4-16 14-18-8 2-16 0-22-8 2-10 10-12 20-6C18 24 24 14 32 4Z" />
    <rect x="30.5" y="60" width="3" height="64" rx="1.5" />
  </svg>
);

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`flex items-center gap-1 font-bold ${small ? "text-[9px]" : "text-[11px]"}`}>
      <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-[#2f7d3a] text-[10px] leading-none text-[#14306b]">
        K<span className="text-[#2f7d3a]">+</span>
      </span>
      <span className="text-[#14306b]">Kadha<span className="text-[#2f7d3a]">Plus</span></span>
    </div>
  );
}

function PackBox() {
  return (
    <div className="relative flex h-[270px] w-[185px] flex-col overflow-hidden rounded-md bg-[#fbf8f0] shadow-[0_30px_40px_-18px_rgba(20,40,29,0.55)] ring-1 ring-black/5 sm:h-[340px] sm:w-[235px]">
      <div className="h-1.5 bg-[#b86b47]" />
      <div className="relative m-3 mb-0 flex flex-1 flex-col items-center rounded-sm border border-[#d9b77a]/70 pt-3">
        <BrandMark />
        <div className="mt-2 flex w-full items-center gap-1 px-4">
          <span className="h-px flex-1 bg-[#d9b77a]" />
          <span className="h-1 w-1 rotate-45 bg-[#d9b77a]" />
          <span className="h-px flex-1 bg-[#d9b77a]" />
        </div>
        <p className="mt-2 text-[6px] font-semibold tracking-[0.2em] text-[#1f3d2b] sm:text-[7px]">INSTANT HERBAL KADHA GRANULES</p>
        <div className="mt-3 grid h-14 w-14 place-items-center rounded-full border border-[#d9b77a] text-[#1f3d2b] sm:h-[72px] sm:w-[72px]">
          <LeafMark className="h-8 w-4 sm:h-10 sm:w-5" />
        </div>
      </div>
      <div className="mt-[-1px] rounded-t-[1.6rem] bg-gradient-to-b from-[#3a6a45] to-[#14281d] px-2 pb-4 pt-4 text-center">
        <div className={`${serif.className} text-[28px] font-semibold leading-none text-white sm:text-[36px]`}>Classic</div>
        <div className="mt-1 text-[10px] font-semibold tracking-[0.45em] text-[#d9b77a] sm:text-xs">KADHA</div>
        <div className="mx-auto my-2 h-px w-10 bg-[#d9b77a]/70" />
        <div className="text-[6px] font-medium tracking-[0.25em] text-white/80 sm:text-[7px]">PACK OF 5 SACHETS</div>
      </div>
    </div>
  );
}

function Sachet({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex h-[210px] w-[56px] flex-col overflow-hidden rounded-[3px] bg-[#fbf8f0] shadow-[0_24px_30px_-14px_rgba(20,40,29,0.6)] ring-1 ring-black/10 sm:h-[270px] sm:w-[70px] ${className}`}>
      {/* crimped top */}
      <div
        className="h-3 shrink-0 bg-[#e6dfcb]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 4px)" }}
      />
      <div className="flex flex-1 flex-col items-center pt-2">
        <div className="scale-75"><BrandMark small /></div>
        <LeafMark className="mt-1 h-5 w-2.5 text-[#1f3d2b]" />
        {/* green panel with vertical title */}
        <div className="mt-auto flex h-[62%] w-full items-center justify-center rounded-t-xl bg-gradient-to-b from-[#3a6a45] to-[#14281d]">
          <span
            className={`${serif.className} whitespace-nowrap text-[17px] font-semibold text-white sm:text-[21px]`}
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Classic <span className="text-[#d9b77a]">Kadha</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Cup() {
  return (
    <div className="relative" aria-hidden>
      <div className="absolute -top-14 left-1/2 flex -translate-x-1/2 gap-3">
        {[0, 0.8, 1.6].map((d) => (
          <span key={d} className="kh-steam block h-12 w-[3px] rounded-full bg-gradient-to-t from-transparent via-white/90 to-transparent blur-[2px]" style={{ animationDelay: `${d}s` }} />
        ))}
      </div>
      <div className="relative h-[62px] w-[92px] rounded-b-[2.4rem] bg-[#fbf8f0] shadow-[0_14px_20px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:h-[74px] sm:w-[110px]">
        <div className="absolute inset-x-0 -top-1.5 h-3 rounded-full bg-[#b8743a] ring-2 ring-[#fbf8f0]" />
        <div className="absolute -right-5 top-3 h-8 w-8 rounded-full border-[5px] border-[#fbf8f0]" />
      </div>
      <div className="mx-auto mt-0.5 h-2 w-[120%] -translate-x-[8%] rounded-full bg-[#ece4cf] shadow-md sm:w-[125%]" />
    </div>
  );
}

function Stage({ slide }: { slide: Slide }) {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[440px]">
      {/* soft scene: blurred leaves top-left like a sunlit branch */}
      {!slide.bgImage && (
        <>
          <div aria-hidden className="absolute -left-10 -top-6 h-40 w-56 rounded-[60%] bg-[#4f8f57]/45 blur-2xl" />
          <div aria-hidden className="absolute left-16 -top-10 h-28 w-40 rounded-[60%] bg-[#7fb77f]/45 blur-2xl" />
        </>
      )}

      {slide.variant === "pack" && (
        <>
          <div className="absolute bottom-[34px] left-[6%] z-10 sm:left-[10%]"><PackBox /></div>
          <Sachet className="absolute bottom-[30px] left-[48%] z-20 rotate-[5deg] sm:left-[52%]" />
          <div className="absolute bottom-[34px] right-[2%] z-10 hidden sm:block"><Cup /></div>
        </>
      )}

      {slide.variant === "ingredients" && (
        <>
          <Sachet className="absolute bottom-[30px] left-1/2 z-20 h-[280px] w-[88px] -translate-x-1/2 -rotate-[4deg] sm:h-[350px] sm:w-[110px]" />
          {HERBS.map((h, n) => {
            const pos = [
              "left-[2%] top-[8%]", "left-[18%] top-[40%]", "left-[4%] top-[62%]", "right-[4%] top-[6%]",
              "right-[16%] top-[36%]", "right-[2%] top-[62%]", "left-[30%] top-[2%]", "right-[32%] top-[80%]",
            ][n];
            return (
              <span
                key={h}
                className={`kh-bob absolute ${pos} z-30 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1f3d2b] shadow-lg ring-1 ring-black/5 sm:text-sm`}
                style={{ animationDelay: `${n * 0.35}s` }}
              >
                {h}
              </span>
            );
          })}
        </>
      )}

      {slide.variant === "price" && (
        <>
          <div className="absolute bottom-[34px] left-[4%] z-10 scale-90 sm:left-[8%] sm:scale-100"><PackBox /></div>
          <Sachet className="absolute bottom-[30px] left-[52%] z-20 rotate-[6deg]" />
          <div className="kh-bob absolute right-[2%] top-[8%] z-30 grid h-28 w-28 place-items-center rounded-full bg-[#1f3d2b] text-center text-white shadow-2xl ring-4 ring-[#f6d54a] sm:h-32 sm:w-32">
            <div>
              <div className={`${serif.className} text-4xl font-bold leading-none text-[#f6d54a] sm:text-5xl`}>₹20</div>
              <div className="mt-1 text-[11px] font-medium">per sachet</div>
            </div>
          </div>
        </>
      )}

      {/* table surface */}
      <div aria-hidden className="absolute inset-x-[-12%] bottom-0 z-0 h-[40px] rounded-t-xl bg-gradient-to-b from-white to-[#ece7da] shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.12)]" />
    </div>
  );
}

/* ================= SLIDER ================= */

const Chevron = ({ d }: { d: "l" | "r" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d === "l" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
  </svg>
);
const Cart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6" />
  </svg>
);

export default function KadhaHeroBanner() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);

  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(i + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduce, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="KadhaPlus highlights"
      className={`${sans.className} relative overflow-hidden bg-[#fbf6e6]`}
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
      <style>{`
        @keyframes kh-steam { 0% { opacity:0; transform: translateY(14px) } 35% { opacity:.8 } 100% { opacity:0; transform: translateY(-34px) } }
        @keyframes kh-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        .kh-steam { animation: kh-steam 3.4s ease-out infinite }
        .kh-bob { animation: kh-bob 5s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .kh-steam, .kh-bob { animation: none } }
      `}</style>

      <div className="grid">
        {slides.map((s, idx) => {
          const on = idx === i;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${slides.length}`}
              aria-hidden={!on}
              className={`relative col-start-1 row-start-1 bg-gradient-to-br ${s.sky} transition-opacity duration-700 ${on ? "visible opacity-100" : "invisible opacity-0"}`}
            >
              {s.bgImage && (
                <Image src={s.bgImage} alt="" fill priority={idx === 0} sizes="100vw" className="object-cover" />
              )}
              {/* sun glow */}
              <div aria-hidden className="absolute right-[-8%] top-[-20%] h-[70%] w-[50%] rounded-full bg-white/60 blur-3xl" />

              <div className="relative mx-auto grid max-w-[1240px] items-end gap-4 px-5 pt-10 sm:px-10 lg:min-h-[560px] lg:grid-cols-2 lg:gap-10 lg:pt-0">
                {/* product stage */}
                <div className="order-2 lg:order-1"><Stage slide={s} /></div>

                {/* text */}
                <div className="order-1 pb-4 text-center lg:order-2 lg:self-center lg:pb-16">
                  <p className={`${serif.className} mx-auto max-w-[30rem] text-2xl font-semibold leading-snug text-[#14403a] sm:text-[2.1rem]`}>
                    {s.line1}
                  </p>
                  <h1 className="mx-auto mt-3 max-w-[34rem] text-[2rem] font-extrabold leading-[1.25] text-[#2a6a35] sm:text-[2.9rem]">
                    <mark className="rounded-sm bg-[#f6d54a] px-2 text-[#2a6a35] [box-decoration-break:clone]">{s.line2}</mark>
                  </h1>
                  <p className="mx-auto mt-5 max-w-[28rem] text-base leading-relaxed text-[#3d4a41]">{s.sub}</p>

                  <Link
                    href={s.cta.href}
                    tabIndex={on ? 0 : -1}
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#14403a] px-9 py-4 text-lg font-semibold text-white shadow-[0_14px_26px_-10px_rgba(20,64,58,0.7)] transition hover:-translate-y-0.5 hover:bg-[#0f332e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a6a35]"
                  >
                    <Cart /> {s.cta.label}
                  </Link>
                  <p className="mt-4 text-xs text-[#5b665e]">Traditional herbal kadha · Medical advice ka vikalp nahi</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* arrows */}
      {(["l", "r"] as const).map((d) => (
        <button
          key={d}
          type="button"
          aria-label={d === "l" ? "Previous slide" : "Next slide"}
          onClick={() => go(i + (d === "l" ? -1 : 1))}
          className={`absolute top-1/2 z-40 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#14403a] shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2a6a35] md:grid ${d === "l" ? "left-4" : "right-4"}`}
        >
          <Chevron d={d} />
        </button>
      ))}

      {/* dots */}
      <div role="tablist" aria-label="Choose slide" className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {slides.map((s, n) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={n === i}
            aria-label={`Go to slide ${n + 1}`}
            onClick={() => go(n)}
            className={`h-2.5 rounded-full transition-all ${n === i ? "w-9 bg-[#14403a]" : "w-2.5 bg-[#14403a]/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
