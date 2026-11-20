import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Quote,
  ShieldCheck,
  Sparkles,
  Ban,
  Droplets,
  Wind,
  CupSoda,
  PackageCheck,
} from "lucide-react";
import { site } from "@/lib/site";
import { VARIANTS } from "@/lib/catalog";
import { features, traditionalIngredients, whyTrust, faqs } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import BuyBox, { type BuyVariant } from "@/components/store/BuyBox";
import { Sprig } from "@/components/product/PackArt";
import KadhaHeroBanner from "@/components/KadhaHeroBanner";
import BrandExperience from "@/components/BrandExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "KadhaPlus — Instant Herbal Kadha | 17-Herb Kadha Sachets",
  description:
    "KadhaPlus Instant Herbal Kadha — a traditional blend of 17 herbs in convenient single-serve sachets. Try a 4 g sachet at ₹20 or the 5-sachet combo pack at ₹100.",
  path: "/",
  absoluteTitle: true,
});

/* ── Final product packaging (user-supplied) ───────────────────────────── */
const IMG = "/images/kadhaplus";

// The four supplied packaging photographs, for the "Packaging" gallery.
const PACK_SHOTS = [
  { src: `${IMG}/pack-box-open.webp`, label: "The Combo Box", note: "Open box · 5 sachets", span: true, aspect: "aspect-[16/10]" },
  { src: `${IMG}/pack-box-closed.webp`, label: "Pack of 5", note: "₹100 · 20 g total", span: false, aspect: "aspect-[16/10]" },
  { src: `${IMG}/stick-front.webp`, label: "Single Sachet — Front", note: "4 g · ₹20", span: false, aspect: "aspect-[3/4]" },
  { src: `${IMG}/stick-back.webp`, label: "Single Sachet — Back", note: "17 herbs, on the pack", span: false, aspect: "aspect-[3/4]" },
];

const CLAIMS = [
  { icon: Leaf, label: "17 Herbal Ingredients" },
  { icon: Ban, label: "No Added Preservatives" },
  { icon: Sparkles, label: "100% Herbal" },
  { icon: ShieldCheck, label: "Builds Natural Immunity" },
  { icon: PackageCheck, label: "Ayurvedic Product" },
];

// Benefits printed on the pack (used in the dark band).
const PACK_BENEFITS = [
  { icon: Wind, title: "Throat & Respiratory Health", desc: "Warming herbs traditionally taken to support the throat and easy breathing." },
  { icon: Droplets, title: "Cough & Cold Comfort", desc: "A soothing herbal kadha for seasonal cough-and-cold days." },
  { icon: ShieldCheck, title: "Natural Immunity", desc: "A daily ritual of 17 herbs to support your body's defences." },
];

const featureIcons = [Sparkles, PackageCheck, CupSoda, Leaf];

export default function HomePage() {
  const variants: BuyVariant[] = VARIANTS.map((v) => ({
    id: v.id,
    name: v.name,
    price: v.price,
    mrp: v.mrp,
    stock: v.stock,
    sachets: v.sachets,
    isDefault: v.isDefault,
  }));

  return (
    <>
      {/* SEO: single descriptive H1 for the image-led hero (visually hidden). */}
      <h1 className="sr-only">
        KadhaPlus Instant Herbal Kadha — a traditional blend of 17 herbs in
        convenient single-serve sachets
      </h1>

      {/* ═══════════ HERO ═══════════ */}
      <KadhaHeroBanner />

      {/* ═══════════ CLAIMS BAR ═══════════ */}
      <section className="border-y border-herbal-100 bg-white">
        <div className="container-px">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 sm:gap-x-12">
            {CLAIMS.map((c) => (
              <li
                key={c.label}
                className="flex items-center gap-2 text-sm font-semibold tracking-wide text-herbal-800"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-leaf-100 text-herbal-600">
                  <c.icon className="h-4 w-4" />
                </span>
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ PRODUCT SHOWCASE ═══════════ */}
      <section id="product" className="bg-cream-50 py-16 sm:py-24">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="group relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_34px_70px_-38px_rgba(20,45,30,0.4)]">
              <Image
                src={`${IMG}/pack-box-open.webp`}
                alt="KadhaPlus combo pack — open box with all five 4 g sachets"
                fill
                priority
                sizes="(min-width:1024px) 512px, 100vw"
                className="object-contain p-7 transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-herbal-800 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white">
                Bestseller · Combo Pack
              </span>
              {/* single-sachet visual */}
              <div className="absolute bottom-4 right-4 w-24 rounded-xl bg-white/95 p-2 ring-1 ring-black/[0.06] backdrop-blur sm:w-28">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={`${IMG}/stick-front.webp`}
                    alt="KadhaPlus single 4 g sachet"
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                <p className="pt-1 text-center text-[11px] font-semibold text-herbal-800">
                  Single · ₹20
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-navy">
              Meet the Product
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.1rem)] font-semibold leading-[1.05] text-herbal-900">
              The ritual, in a sachet.
            </h2>
            <span className="mt-5 block h-px w-14 bg-brass-400" />
            <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
              {site.product.name} — a traditional blend of 17 powerful herbs,
              crafted for your daily immunity and wellness. Try a single 4&nbsp;g
              sachet, or save with the 5-sachet combo pack.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              {CLAIMS.slice(0, 3).map((c) => (
                <span
                  key={c.label}
                  className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-herbal-800"
                >
                  <c.icon className="h-3.5 w-3.5 text-leaf-600" />
                  {c.label}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <BuyBox variants={variants} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ THE KADHAPLUS EXPERIENCE ═══════════ */}
      <BrandExperience />

      {/* ═══════════ WHY KADHAPLUS ═══════════ */}
      <section className="section bg-cream-50">
        <div className="container-px">
          <SectionHeading
            eyebrow="Why KadhaPlus"
            title="A Familiar Ritual, Made Effortless"
            subtitle="Everything we love about traditional kadha, thoughtfully adapted for modern life."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => {
              const Icon = featureIcons[i] ?? Leaf;
              return (
                <Reveal key={f.title} delay={i * 0.07}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-herbal-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-herbal-200 hover:shadow-soft">
                    <Sprig className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 text-leaf-500/10 transition-transform duration-500 group-hover:rotate-12" />
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf-100 to-mint-100 text-herbal-600 transition-colors group-hover:from-herbal-600 group-hover:to-herbal-700 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-xl tracking-wide text-herbal-900">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION A · THE PACKAGING ═══════════ */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeading
            eyebrow="The Packaging"
            title="Premium Packaging, Inside & Out"
            subtitle="From the five-sachet combo box to the single-serve stick — the real KadhaPlus pack, photographed up close."
          />

          {/* the two boxes */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {PACK_SHOTS.slice(0, 2).map((p, i) => (
              <Reveal key={p.src} delay={i * 0.08}>
                <figure className="group h-full overflow-hidden rounded-3xl border border-herbal-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className={`relative overflow-hidden ${p.aspect}`}>
                    <Image
                      src={p.src}
                      alt={p.label}
                      fill
                      sizes="(min-width:640px) 48vw, 100vw"
                      className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-2 border-t border-herbal-100 px-5 py-4">
                    <span className="font-semibold text-herbal-900">{p.label}</span>
                    <span className="text-xs text-ink-muted">{p.note}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* the single sachet + shop card */}
          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {PACK_SHOTS.slice(2).map((p, i) => (
              <Reveal key={p.src} delay={i * 0.07}>
                <figure className="group h-full overflow-hidden rounded-3xl border border-herbal-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className={`relative overflow-hidden ${p.aspect}`}>
                    <Image
                      src={p.src}
                      alt={p.label}
                      fill
                      sizes="(min-width:640px) 24vw, 50vw"
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-2 border-t border-herbal-100 px-4 py-3.5">
                    <span className="text-sm font-semibold text-herbal-900">{p.label}</span>
                    <span className="hidden text-xs text-ink-muted sm:inline">{p.note}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
            <Reveal delay={0.21} className="col-span-2">
              <Link
                href="/product"
                className="group flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-herbal-600 to-herbal-800 p-6 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <Sprig className="h-10 w-10 text-brass-300/60" />
                <div className="mt-6">
                  <p className="font-display text-2xl leading-tight tracking-wide">
                    Shop the pack
                  </p>
                  <p className="mt-1 text-sm text-mint-100/80">
                    Single ₹20 · Combo ₹100
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-200">
                    Buy now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION B · BENEFITS (dark band) ═══════════ */}
      <section className="relative overflow-hidden bg-herbal-950 py-16 text-cream-50 sm:py-24">
        <Sprig className="pointer-events-none absolute -left-12 top-10 h-64 w-64 text-brass-400/10" />
        <Sprig className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rotate-180 text-brass-400/10" />
        <div className="container-px relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-light mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Why a Cup a Day
            </span>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95] tracking-wide text-white">
              Made for <span className="text-brass-300">Everyday Comfort</span>
            </h2>
            <p className="mt-4 leading-relaxed text-cream-100/75">
              The benefits printed on the pack — simple, honest and wellness-first.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {PACK_BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors duration-300 hover:bg-white/[0.07]">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf-400 to-herbal-600 text-white">
                    <b.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl tracking-wide text-white">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-100/70">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link href="/product" className="btn-leaf">
              Explore the full product
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ HOW TO PREPARE ═══════════ */}
      <section className="section bg-cream-50">
        <div className="container-px">
          <SectionHeading
            eyebrow="How to Prepare"
            title="Your Kadha in Three Simple Steps"
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { t: "Empty 1 sachet", d: "Tip one 4 g sachet of KadhaPlus into your cup." },
              { t: "Add hot water", d: "Pour in 150–200 ml of hot water." },
              { t: "Stir & enjoy", d: "Stir well and enjoy your kadha warm." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-herbal-100 bg-white p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-herbal-600 to-herbal-700 font-display text-2xl text-white shadow-soft">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl tracking-wide text-herbal-900">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ INGREDIENTS TEASER ═══════════ */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Traditional Inspiration
            </span>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95] tracking-wide text-herbal-900">
              Powered by <span className="text-leaf-500">17 Herbs</span>
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
              Tulsi, Adrak, Mulethi, Giloy, Ashwagandha and more — the 17 warming
              herbs long loved in traditional Indian kadha, exactly as printed on
              the pack.
            </p>
            <Link href="/ingredients" className="btn-outline mt-6">
              Explore ingredients
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {traditionalIngredients.slice(0, 6).map((ing, i) => (
              <Reveal key={ing.name} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-herbal-100 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-50">
                    <Leaf className="h-5 w-5 text-herbal-600" />
                  </span>
                  <p className="font-display text-base tracking-wide text-herbal-900">
                    {ing.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HERITAGE STORY ═══════════ */}
      <section className="relative overflow-hidden bg-herbal-900 py-20 text-cream-50 sm:py-28">
        <Sprig className="pointer-events-none absolute -left-10 top-6 h-56 w-56 text-brass-400/10" />
        <Sprig className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rotate-180 text-brass-400/10" />
        <div className="container-px relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-10 w-10 text-brass-400" />
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] tracking-wide text-cream-50">
              Dadi Maa Ka Nuskha, A Modern Way
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-cream-100/75">
              Kadha has warmed Indian homes for generations. KadhaPlus carries
              that same wisdom into today&apos;s pace of life — the familiar
              warmth of traditional kadha, packed into a single-serve sachet so
              the ritual is always within reach.
            </p>
            <p className="mt-8 font-serif text-xl italic text-brass-300">
              &ldquo;{site.philosophy}&rdquo;
            </p>
            <Link href="/about" className="btn-leaf mt-8">
              Read our story
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ TRUST ═══════════ */}
      <section className="section bg-cream-50">
        <div className="container-px">
          <SectionHeading
            eyebrow="Our Promise"
            title="Built on Trust & Transparency"
            subtitle="KadhaPlus is a herbal wellness product — and we describe it honestly as exactly that."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {whyTrust.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-herbal-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf-100 to-mint-100 text-herbal-600">
                    <w.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg tracking-wide text-herbal-900">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {w.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-ink-muted">
            <ShieldCheck className="h-4 w-4 text-herbal-600" />
            Wellness-oriented messaging only — no unverified medical claims. See
            our{" "}
            <Link href="/disclaimer" className="underline">
              Disclaimer
            </Link>
            .
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="section bg-gradient-to-b from-mint-100 to-cream-50">
        <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQs"
              title="Good to Know"
              subtitle="For safety and suitability questions we rely only on verified, manufacturer-approved information."
            />
            <Link href="/product" className="btn-primary mt-6">
              Shop KadhaPlus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <Accordion items={faqs.slice(0, 5)} />
            <Reveal className="mt-6">
              <Link href="/faqs" className="btn-ghost">
                View all FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
