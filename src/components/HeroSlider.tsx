"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Check,
} from "lucide-react";
import {
  ProductBox3D,
  SachetStanding,
  SachetFan,
} from "@/components/product/ProductVisuals";
import { Sprig, Emblem } from "@/components/product/PackArt";

type Visual = "box" | "standing" | "fan";
type Slide = {
  key: string;
  eyebrow: string;
  titleA: string;
  accent: string;
  titleB?: string;
  sub: string;
  badges: string[];
  cta: { label: string; href: string };
  visual: Visual;
  tone: "cream" | "green" | "mint";
  /** Optional background photo — drop a file in /public/images and set the path
   *  (e.g. "/images/hero-ritual.jpg") to use a real lifestyle/model image. */
  image?: string;
};

const SLIDES: Slide[] = [
  {
    key: "ritual",
    eyebrow: "Inspired by Traditional Kadha",
    titleA: "The Kadha Ritual,",
    accent: "Reimagined",
    titleB: "for Today.",
    sub: "Dadi maa ka nuskha — the warm comfort of traditional Indian kadha, now in a single, convenient instant sachet.",
    badges: ["100% Herbal", "Single-Serve", "Ready in Minutes"],
    cta: { label: "Shop the Ritual", href: "/product" },
    visual: "box",
    tone: "cream",
  },
  {
    key: "seasonal",
    eyebrow: "Seasonal & Sinus Wellness",
    titleA: "Soothing Warmth for the",
    accent: "Sniffly Season",
    sub: "A comforting herbal ritual inspired by tradition — for cough, cold, fever, throat & nasal comfort when the weather turns.",
    badges: ["Cough & Cold Comfort", "Throat & Nasal", "Warm & Soothing"],
    cta: { label: "Discover KadhaPlus", href: "/product" },
    visual: "standing",
    tone: "green",
  },
  {
    key: "pure",
    eyebrow: "Herbal Wellness",
    titleA: "Herbal Goodness,",
    accent: "No Compromise",
    sub: "Made with herbal ingredients inspired by classic kadha. Gentle, everyday wellness you can feel good about.",
    badges: ["No Side Effects", "Caffeine-Free", "No Artificial Colours"],
    cta: { label: "Explore the Range", href: "/product" },
    visual: "fan",
    tone: "mint",
  },
];

const toneBg: Record<Slide["tone"], string> = {
  cream: "bg-gradient-to-br from-cream-100 via-cream-50 to-mint-100",
  green: "bg-gradient-to-br from-herbal-800 via-herbal-900 to-herbal-950",
  mint: "bg-gradient-to-br from-mint-100 via-cream-50 to-leaf-50",
};

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const slide = SLIDES[index];
  const dark = slide.tone === "green";

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* animated background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.key + "-bg"}
          className={`absolute inset-0 -z-10 ${toneBg[slide.tone]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {slide.image && (
            <Image
              src={slide.image}
              alt=""
              fill
              priority
              className="object-cover"
            />
          )}
          {slide.image && (
            <div
              className={`absolute inset-0 ${
                dark ? "bg-herbal-950/60" : "bg-cream-50/55"
              }`}
            />
          )}
          <div className="absolute inset-0 leaf-texture opacity-60" />
          <Sprig
            className={`absolute -left-10 top-16 h-44 w-44 ${
              dark ? "text-brass-400/10" : "text-herbal-900/[0.04]"
            }`}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container-px relative grid min-h-[560px] items-center gap-8 py-12 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        {/* text */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={dark ? "eyebrow-light mb-6" : "eyebrow mb-6"}>
                <Leaf className="h-3.5 w-3.5" />
                {slide.eyebrow}
              </span>
              <h1
                className={`font-display text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.92] tracking-wide ${
                  dark ? "text-cream-50" : "text-herbal-900"
                }`}
              >
                {slide.titleA}{" "}
                <span className="text-clay-400">{slide.accent}</span>
                {slide.titleB ? <> {slide.titleB}</> : null}
              </h1>
              <p
                className={`mt-5 max-w-lg leading-relaxed ${
                  dark ? "text-cream-100/80" : "text-ink-soft"
                }`}
              >
                {slide.sub}
              </p>

              {/* benefit badges */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {slide.badges.map((b) => (
                  <span
                    key={b}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                      dark
                        ? "bg-white/10 text-cream-50 ring-1 ring-white/15"
                        : "bg-white text-herbal-700 ring-1 ring-herbal-100"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5 text-leaf-400" />
                    {b}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={slide.cta.href} className="btn-primary">
                  {slide.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className={
                    dark
                      ? "btn inline-flex border border-white/25 text-cream-50 hover:bg-white/10"
                      : "btn-outline"
                  }
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* product visual */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div
            className={`relative aspect-[4/5] arch-top overflow-hidden ring-1 ${
              dark
                ? "bg-cream-50/10 ring-brass-400/20"
                : "bg-gradient-to-b from-herbal-800 via-herbal-900 to-herbal-950 ring-brass-400/20 shadow-glow"
            }`}
          >
            <Sprig className="absolute -right-6 bottom-4 h-44 w-44 text-brass-400/10" />
            <div className="absolute left-1/2 top-[14%] h-[72%] w-[86%] -translate-x-1/2 arch-top border border-brass-400/25" />
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key + "-vis"}
                className="absolute inset-0 flex items-end justify-center pb-10"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
              >
                {slide.visual === "box" && (
                  <div className="w-[62%] animate-float">
                    <ProductBox3D priority />
                  </div>
                )}
                {slide.visual === "standing" && (
                  <div className="w-[34%] animate-float">
                    <SachetStanding priority />
                  </div>
                )}
                {slide.visual === "fan" && (
                  <SachetFan className="w-full max-w-sm pb-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute -left-3 top-6 flex h-24 w-24 items-center justify-center rounded-full bg-cream-50 shadow-soft ring-1 ring-brass-200">
            <Emblem className="w-16" />
          </div>
        </div>
      </div>

      {/* arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className={`absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition-colors sm:flex ${
          dark ? "bg-white/10 text-cream-50 hover:bg-white/20" : "bg-white/70 text-herbal-700 hover:bg-white"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className={`absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition-colors sm:flex ${
          dark ? "bg-white/10 text-cream-50 hover:bg-white/20" : "bg-white/70 text-herbal-700 hover:bg-white"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? dark
                  ? "w-7 bg-brass-300"
                  : "w-7 bg-herbal-600"
                : dark
                  ? "w-2 bg-white/40"
                  : "w-2 bg-herbal-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
