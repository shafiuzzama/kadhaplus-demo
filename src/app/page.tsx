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
  FlaskConical,
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

/* ── Real product photography ──────────────────────────────────────────── */
const IMG = "/images/kadhaplus";

// The six product / lifestyle / infographic images.
const PHOTO_PAIR = [
  { src: `${IMG}/box-and-sachet.png`, label: "The Pack", note: "Box + single sachet", span: true },
  { src: `${IMG}/lifestyle-model.png`, label: "Everyday Wellness", note: "A daily respiratory ritual", span: false },
];
const INFO_QUARTET = [
  { src: `${IMG}/ingredients-17-herbs.png`, caption: "17 Traditional Herbs" },
  { src: `${IMG}/how-to-prepare.png`, caption: "Ready in Minutes" },
  { src: `${IMG}/sachet-features.png`, caption: "A Clean Label" },
  { src: `${IMG}/box-back-details.png`, caption: "Honest, On the Pack" },
];

// The four sachet images (user-specified roles).
const SACHETS = [
  { src: `${IMG}/sachet-front.png`, label: "Front View", fit: "contain" },
  { src: `${IMG}/sachet-back.png`, label: "Back Packaging", fit: "contain" },
  { src: `${IMG}/sachet-with-cup.png`, label: "With Prepared Kadha", fit: "cover" },
  { src: `${IMG}/sachets-multiple.png`, label: "Multiple Sachets", fit: "cover" },
];

const GALLERY = [
  `${IMG}/lifestyle-model.png`,
  `${IMG}/sachet-with-cup.png`,
  `${IMG}/box-and-sachet.png`,
  `${IMG}/sachets-multiple.png`,
  `${IMG}/sachet-front.png`,
  `${IMG}/sachet-back.png`,
];

const CLAIMS = [
  { icon: Leaf, label: "17 Powerful Herbs" },
  { icon: Ban, label: "No Added Sugar" },
  { icon: FlaskConical, label: "No Preservatives" },
  { icon: Droplets, label: "No Artificial Colours" },
  { icon: Sparkles, label: "1000+ ORAC Value" },
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
      <section
        id="product"
        className="relative overflow-hidden bg-gradient-to-b from-mint-100 to-cream-50 py-16 sm:py-24"
      >
        <Sprig className="pointer-events-none absolute -left-10 top-10 h-48 w-48 text-herbal-900/5" />
        <Sprig className="pointer-events-none absolute -right-12 bottom-6 h-56 w-56 rotate-180 text-herbal-900/5" />
        <div className="container-px relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="absolute inset-6 -z-10 rounded-[2.5rem] bg-leaf-100/50 blur-2xl" />
            <div className="group relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-soft ring-1 ring-herbal-100">
              <Image
                src={`${IMG}/sachet-with-cup.png`}
                alt="KadhaPlus sachet beside a freshly prepared cup of kadha"
                fill
                priority
                sizes="(min-width:1024px) 512px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-herbal-700 shadow-sm backdrop-blur">
                <Leaf className="h-3.5 w-3.5" /> Bestseller
              </span>
            </div>
          </Reveal>

          <div>
            <span className="eyebrow mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Meet the Product
            </span>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95] tracking-wide text-herbal-900">
              The ritual, <span className="text-leaf-500">in a sachet</span>
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
              {site.product.name} — a traditional blend of 17 powerful herbs,
              crafted for your daily immunity and wellness. Try a single 4&nbsp;g
              sachet, or save with the 5-sachet combo pack.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {CLAIMS.slice(0, 3).map((c) => (
                <span key={c.label} className="chip">
                  <c.icon className="h-3.5 w-3.5 text-herbal-600" />
                  {c.label}
                </span>
              ))}
            </div>
            <div className="mt-7">
              <BuyBox variants={variants} />
            </div>
          </div>
        </div>
      </section>

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

      {/* ═══════════ SECTION A · THE EDIT (6 images) ═══════════ */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeading
            eyebrow="The KadhaPlus Edit"
            title="Everything About KadhaPlus, In One Look"
            subtitle="From the pack in your hand to the 17 herbs inside it — here's the whole story in pictures."
          />

          {/* two feature photos */}
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {PHOTO_PAIR.map((p, i) => (
              <Reveal
                key={p.src}
                delay={i * 0.08}
                className={p.span ? "lg:col-span-2" : ""}
              >
                <figure className="group relative h-64 overflow-hidden rounded-3xl shadow-card ring-1 ring-herbal-100 sm:h-80 lg:h-[380px]">
                  <Image
                    src={p.src}
                    alt={p.note}
                    fill
                    sizes={p.span ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 100vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-herbal-950/75 via-herbal-950/5 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
                      {p.label}
                    </p>
                    <p className="mt-1 font-display text-2xl tracking-wide text-white">
                      {p.note}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* four infographic cards */}
          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {INFO_QUARTET.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.06}>
                <figure className="group h-full overflow-hidden rounded-3xl border border-herbal-100 bg-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.caption}
                      fill
                      sizes="(min-width:1024px) 25vw, 50vw"
                      className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                  </div>
                  <figcaption className="border-t border-herbal-100 bg-white px-4 py-3.5 text-center text-sm font-semibold text-herbal-900">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION B · CLOSER LOOK (4 sachet images) ═══════════ */}
      <section className="relative overflow-hidden bg-herbal-950 py-16 text-cream-50 sm:py-24">
        <Sprig className="pointer-events-none absolute -left-12 top-10 h-64 w-64 text-brass-400/10" />
        <Sprig className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rotate-180 text-brass-400/10" />
        <div className="container-px relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-light mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Up Close
            </span>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95] tracking-wide text-white">
              A Closer Look at <span className="text-brass-300">Every Sachet</span>
            </h2>
            <p className="mt-4 leading-relaxed text-cream-100/75">
              Front, back, freshly brewed and by the handful — the single-serve
              sachet designed to fit your day.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {SACHETS.map((s, i) => (
              <Reveal key={s.src} delay={i * 0.07}>
                <figure className="group relative overflow-hidden rounded-3xl bg-white shadow-glow ring-1 ring-white/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.src}
                      alt={s.label}
                      fill
                      sizes="(min-width:640px) 45vw, 100vw"
                      className={`transition-transform duration-700 group-hover:scale-105 ${
                        s.fit === "contain"
                          ? "object-contain p-4"
                          : "object-cover"
                      }`}
                    />
                  </div>
                  <figcaption className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-herbal-950/80 px-3 py-1.5 text-xs font-semibold text-cream-50 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-brass-300" />
                      {s.label}
                    </span>
                  </figcaption>
                </figure>
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
              Tulasi, Shunthi, Dalchini, Maricha, Haridra and more — the warming
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

      {/* ═══════════ COMMUNITY GALLERY ═══════════ */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeading
            eyebrow="#KadhaPlusRitual"
            title="Join the KadhaPlus Ritual"
            subtitle="A warm cup, a calmer day. Share your moment and be part of the KadhaPlus community."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY.map((src, i) => (
              <Reveal key={src} delay={i * 0.05}>
                <Link
                  href="/product"
                  className="group relative block aspect-square overflow-hidden rounded-2xl ring-1 ring-herbal-100"
                >
                  <Image
                    src={src}
                    alt="KadhaPlus moment"
                    fill
                    sizes="(min-width:1024px) 16vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-herbal-950/0 transition-colors duration-300 group-hover:bg-herbal-950/40">
                    <Leaf className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
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
