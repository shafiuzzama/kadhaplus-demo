import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  Check,
  ShieldCheck,
  Droplets,
  Wind,
  Package,
  Boxes,
  Truck,
  RotateCcw,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGallery, {
  type GalleryImage,
} from "@/components/product/ProductGallery";
import BuyBox, { type BuyVariant } from "@/components/store/BuyBox";
import JsonLd from "@/components/seo/JsonLd";
import { VARIANTS } from "@/lib/catalog";
import {
  pageMetadata,
  productSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Instant Herbal Kadha — Single Sachet ₹20 & 5-Pack ₹100",
  description:
    "Buy KadhaPlus Instant Herbal Kadha online — 17 traditional herbs in a convenient sachet. Single 4 g sachet at ₹20 or the 5-sachet combo pack (20 g) at ₹100. 100% herbal, no added preservatives.",
  path: "/product",
  image: {
    url: "/images/kadhaplus/pack-box-open.webp",
    width: 1536,
    height: 1024,
    alt: "KadhaPlus Instant Herbal Kadha — open 5-sachet combo box",
  },
});

/* The four supplied final-packaging photographs, in gallery order. */
const GALLERY: GalleryImage[] = [
  { src: "/images/kadhaplus/pack-box-open.webp", alt: "KadhaPlus combo pack — open box with all five 4 g sachets" },
  { src: "/images/kadhaplus/pack-box-closed.webp", alt: "KadhaPlus combo pack — box of 5 sachets (₹100)" },
  { src: "/images/kadhaplus/stick-front.webp", alt: "KadhaPlus single sachet (4 g, ₹20) — front" },
  { src: "/images/kadhaplus/stick-back.webp", alt: "KadhaPlus single sachet — back panel with 17 herbs, how to use and benefits" },
];

/* Benefit claims as printed on the pack. */
const BENEFITS = [
  { icon: Wind, title: "Supports Throat & Respiratory Health", desc: "Warming herbs traditionally taken to support the throat and easy, comfortable breathing." },
  { icon: Droplets, title: "Helps Relieve Cough & Cold", desc: "A soothing herbal kadha for seasonal cough-and-cold comfort." },
  { icon: ShieldCheck, title: "Builds Natural Immunity", desc: "A daily ritual of 17 herbs to support your body's natural defences." },
  { icon: Leaf, title: "100% Herbal, No Preservatives", desc: "A clean herbal blend with no added preservatives, exactly as stated on the pack." },
];

/* All 17 herbs, exactly as printed on the pack (back panel). */
const HERBS = [
  { name: "Tulsi", sub: "Holy Basil" },
  { name: "Adrak", sub: "Ginger" },
  { name: "Mulethi", sub: "Licorice" },
  { name: "Kali Mirch", sub: "Black Pepper" },
  { name: "Pippali", sub: "Long Pepper" },
  { name: "Dalchini", sub: "Cinnamon" },
  { name: "Laung", sub: "Clove" },
  { name: "Elaichi", sub: "Cardamom" },
  { name: "Giloy", sub: "Guduchi" },
  { name: "Ashwagandha", sub: "Winter Cherry" },
  { name: "Haldi", sub: "Turmeric" },
  { name: "Saunth", sub: "Dry Ginger" },
  { name: "Ajwain", sub: "Carom" },
  { name: "Punarnava", sub: "Hogweed" },
  { name: "Vasaka", sub: "Malabar Nut" },
  { name: "Tejpatta", sub: "Bay Leaf" },
  { name: "Shankhpushpi", sub: "Herb of grace" },
];

const STEPS = [
  { n: 1, title: "Mix 1 sachet", desc: "Empty one 4 g sachet of KadhaPlus into your cup." },
  { n: 2, title: "Add hot water", desc: "Pour in about 150 ml of hot water and stir well." },
  { n: 3, title: "Drink warm", desc: "Stir until dissolved and enjoy your kadha warm." },
];

const FAQS = [
  {
    q: "What is KadhaPlus Instant Herbal Kadha?",
    a: "It's an instant version of traditional Indian kadha — a warm herbal drink made from a blend of 17 powerful herbs. Each single-serve sachet lets you prepare a fresh cup in under a minute, no boiling or measuring required.",
  },
  {
    q: "How many herbs does it contain?",
    a: "The blend is made with 17 traditional herbs — Tulsi, Adrak, Mulethi, Kali Mirch, Pippali, Dalchini, Laung, Elaichi, Giloy, Ashwagandha, Haldi, Saunth, Ajwain, Punarnava, Vasaka, Tejpatta and Shankhpushpi — exactly as printed on the pack.",
  },
  {
    q: "How do I prepare it?",
    a: "Empty one 4 g sachet into a cup, add about 150 ml of hot water, stir well and drink it warm.",
  },
  {
    q: "What's the difference between the single sachet and the combo pack?",
    a: "They are the same product in different quantities. The single sachet is 4 g (₹20). The combo pack has 5 sachets (5 × 4 g = 20 g) for ₹100.",
  },
  {
    q: "Does it contain preservatives?",
    a: "As stated on the pack, KadhaPlus is 100% herbal with no added preservatives. It is an Ayurvedic product, not a medicine.",
  },
];

export default function ProductPage() {
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
      <JsonLd
        data={[
          productSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Product", path: "/product" },
          ]),
          faqSchema(FAQS),
        ]}
      />

      {/* ============================ HERO: gallery + buy ===================== */}
      <section className="bg-cream-50 pb-16 pt-7 sm:pb-24 lg:pt-11">
        <div className="container-px">
          <nav className="mb-7 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
            <Link href="/" className="transition-colors hover:text-herbal-700">
              Home
            </Link>
            <span className="mx-2 text-ink-muted/50">/</span>
            <span className="text-herbal-800">Our Product</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <ProductGallery images={GALLERY} />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5 lg:pt-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-navy">
                  KadhaPlus · Instant Herbal Kadha
                </p>
                <h1 className="mt-4 font-serif text-[clamp(2.4rem,4.2vw,3.4rem)] font-semibold leading-[1.04] text-herbal-900">
                  Wellness, Made Simple.
                </h1>
                <span className="mt-5 block h-px w-14 bg-brass-400" />
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
                  17 carefully selected herbs, thoughtfully blended into a
                  convenient daily kadha — a calm, warming ritual for everyday
                  immunity and wellness.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {["17 Herbs", "No Added Preservatives", "100% Herbal"].map(
                    (t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-herbal-800"
                      >
                        <Leaf className="h-3.5 w-3.5 text-leaf-600" />
                        {t}
                      </span>
                    ),
                  )}
                </div>

                <div className="mt-8">
                  <BuyBox variants={variants} />
                </div>

                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/[0.08] pt-5 text-xs text-ink-muted">
                  <li className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-herbal-600" />
                    Free delivery over ₹499
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-herbal-600" />
                    Ayurvedic product
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-herbal-600" />
                    No preservatives
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ DESCRIPTION / BENEFITS ================== */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal className="order-2 lg:order-1">
              <SectionHeading
                align="left"
                eyebrow="Daily Wellness"
                title="A familiar ritual, made effortless"
              />
              <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
                KadhaPlus brings the comforting warmth of traditional Indian
                kadha into modern life. Each sachet is a thoughtfully balanced
                blend of warming herbs — the kind of wellness ritual passed down
                through generations, now ready whenever you need it.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="card p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-100 text-herbal-700">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 font-semibold text-herbal-900">
                      {b.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{b.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-soft ring-1 ring-herbal-100">
                <Image
                  src="/images/kadhaplus/lifestyle-model.png"
                  alt="Daily care for respiratory wellness with KadhaPlus"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ INGREDIENTS ============================ */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Ingredients"
            title="Powered by 17 traditional herbs"
            subtitle="Every herb in the blend, exactly as listed on the pack — nothing added, nothing hidden."
          />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-herbal-100">
                <Image
                  src="/images/kadhaplus/stick-back.webp"
                  alt="KadhaPlus sachet back panel listing all 17 herbs"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-contain p-3"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {HERBS.map((h) => (
                  <div
                    key={h.name}
                    className="rounded-2xl border border-herbal-100 bg-white p-4 text-center shadow-card"
                  >
                    <p className="font-semibold text-herbal-900">{h.name}</p>
                    <p className="text-xs text-ink-muted">{h.sub}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-ink-muted">
                All 17 herbs are listed on the pack back panel. We do not add to
                or alter the manufacturer&rsquo;s stated formulation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ HOW TO PREPARE ========================= */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px">
          <SectionHeading
            eyebrow="How to Prepare"
            title="Your kadha in three simple steps"
          />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <ol className="space-y-5">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-herbal-600 text-lg font-bold text-white">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-semibold text-herbal-900">{s.title}</p>
                      <p className="text-sm text-ink-soft">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-ink-soft shadow-card">
                <Leaf className="h-4 w-4 text-herbal-600" />
                A simple, soothing wellness ritual.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-herbal-100">
                <Image
                  src="/images/kadhaplus/stick-front.webp"
                  alt="KadhaPlus single 4 g sachet, front"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-contain p-3"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ PACKAGING INFO ========================= */}
      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Packaging"
              title="Pack & packaging details"
            />
            <div className="mt-6 space-y-4">
              <div className="card flex items-start gap-4 p-5">
                <Package className="mt-0.5 h-6 w-6 shrink-0 text-spice-600" />
                <div>
                  <p className="font-semibold text-herbal-900">
                    Single sachet — ₹20
                  </p>
                  <p className="text-sm text-ink-soft">
                    One single-serve sachet. Net weight 4 g. 100% herbal, no
                    added preservatives.
                  </p>
                </div>
              </div>
              <div className="card flex items-start gap-4 p-5">
                <Boxes className="mt-0.5 h-6 w-6 shrink-0 text-spice-600" />
                <div>
                  <p className="font-semibold text-herbal-900">
                    Combo pack — ₹100
                  </p>
                  <p className="text-sm text-ink-soft">
                    A box of 5 sachets (5 × 4 g). Net weight 20 g. MRP ₹100,
                    inclusive of all taxes.
                  </p>
                </div>
              </div>
              <div className="card flex items-start gap-4 p-5">
                <Leaf className="mt-0.5 h-6 w-6 shrink-0 text-spice-600" />
                <div>
                  <p className="font-semibold text-herbal-900">Storage</p>
                  <p className="text-sm text-ink-soft">
                    Keep in a cool &amp; dry place, away from direct sunlight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Verified Information"
              title="Confirmed from the pack"
            />
            <div className="relative mt-6 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-herbal-100">
              <Image
                src="/images/kadhaplus/stick-back.webp"
                alt="KadhaPlus sachet back panel with ingredients, directions and pack details"
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-contain p-3"
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {[
                "Net weight (4 g per sachet)",
                "MRP, inclusive of taxes",
                "Batch number",
                "Mfg. & expiry dates",
                "FSSAI licence number",
                "Ayurvedic product · Not a medicine",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-2 rounded-xl bg-herbal-50 px-3 py-2.5 text-herbal-800"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-herbal-600" />
                  {item}
                </p>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              We do not fabricate product data. Net weight, price, ingredients
              and directions are taken directly from the manufacturer packaging
              shown above. Batch, dates and licence numbers are printed on each
              individual pack. See our{" "}
              <Link href="/disclaimer" className="underline">
                Disclaimer
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ============================ BRAND STORY ============================ */}
      <section className="section bg-herbal-950 text-mint-100">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-light mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Our Story
            </span>
            <h2 className="h-display text-3xl text-white sm:text-4xl">
              Dadi maa ka nuskha, a modern way
            </h2>
            <p className="mt-5 leading-relaxed text-mint-100/80">
              Kadha has warmed Indian homes for generations — a trusted blend of
              herbs brewed with care whenever comfort was needed. KadhaPlus
              carries that same wisdom into today&rsquo;s pace of life: the
              familiar warmth of traditional kadha, thoughtfully packed into a
              single-serve sachet so the ritual is always within reach — at home,
              at work, or on the move.
            </p>
          </div>
        </div>
      </section>

      {/* ============================ FAQ =================================== */}
      <section className="section">
        <div className="container-px">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-herbal-100 overflow-hidden rounded-3xl border border-herbal-100 bg-white shadow-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-herbal-900">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-herbal-200 text-herbal-700 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SHIPPING & RETURNS ===================== */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px">
          <SectionHeading
            eyebrow="Shipping & Returns"
            title="Ordering with KadhaPlus"
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-herbal-700">
                <Truck className="h-5 w-5" />
              </span>
              <p className="mt-4 font-semibold text-herbal-900">
                Shipping & delivery
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                We deliver across India. Shipping charges and timelines are shown
                at checkout. For full details, see our{" "}
                <Link
                  href="/shipping-and-delivery"
                  className="font-medium text-herbal-700 underline"
                >
                  Shipping &amp; Delivery Policy
                </Link>
                .
              </p>
            </div>
            <div className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-herbal-700">
                <RotateCcw className="h-5 w-5" />
              </span>
              <p className="mt-4 font-semibold text-herbal-900">
                Returns & refunds
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                If something arrives damaged or incorrect, we&rsquo;re here to
                help. Please review our{" "}
                <Link
                  href="/return-and-refund"
                  className="font-medium text-herbal-700 underline"
                >
                  Return &amp; Refund Policy
                </Link>{" "}
                for how to raise a request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
