import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  Check,
  ShieldCheck,
  Droplets,
  Flame,
  Wind,
  Package,
  Boxes,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Placeholder from "@/components/ui/Placeholder";
import ProductGallery, {
  type GalleryImage,
} from "@/components/product/ProductGallery";
import BuyBox, { type BuyVariant } from "@/components/store/BuyBox";
import { site } from "@/lib/site";
import { VARIANTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "KadhaPlus Instant Herbal Kadha",
  description:
    "KadhaPlus Instant Herbal Kadha — a traditional blend of 17 powerful herbs in a convenient sachet. Buy a single 4 g sachet (₹20) or the 5-sachet combo pack (₹100).",
};

/* All 10 supplied product photographs, in gallery order. */
const GALLERY: GalleryImage[] = [
  { src: "/images/kadhaplus/box-and-sachet.png", alt: "KadhaPlus Instant Herbal Kadha box with a single sachet" },
  { src: "/images/kadhaplus/sachet-with-cup.png", alt: "KadhaPlus sachet beside a freshly prepared cup of kadha" },
  { src: "/images/kadhaplus/sachets-multiple.png", alt: "Several KadhaPlus sachets presented in a wooden bowl" },
  { src: "/images/kadhaplus/sachet-front.png", alt: "Front of the KadhaPlus single sachet" },
  { src: "/images/kadhaplus/sachet-back.png", alt: "Back of the KadhaPlus sachet showing ingredients and how to prepare" },
  { src: "/images/kadhaplus/lifestyle-model.png", alt: "Daily care for respiratory wellness — KadhaPlus lifestyle" },
  { src: "/images/kadhaplus/ingredients-17-herbs.png", alt: "Powered by 17 traditional herbs — KadhaPlus ingredients" },
  { src: "/images/kadhaplus/how-to-prepare.png", alt: "How to make your KadhaPlus kadha in three steps" },
  { src: "/images/kadhaplus/sachet-features.png", alt: "KadhaPlus sachet features — 100% herbal blend, no preservatives" },
  { src: "/images/kadhaplus/box-back-details.png", alt: "KadhaPlus box back panel with ingredients and pack details" },
];

/* Benefit claims as printed on the pack. */
const BENEFITS = [
  { icon: ShieldCheck, title: "Supports Immunity", desc: "A daily herbal ritual to support your body's natural defences." },
  { icon: Droplets, title: "Soothes Throat", desc: "Warm, comforting kadha that helps soothe an irritated throat." },
  { icon: Flame, title: "Relieves Cough & Cold", desc: "Traditional warming herbs for seasonal cough and cold comfort." },
  { icon: Wind, title: "Respiratory Comfort", desc: "Promotes easy, comfortable breathing through the day." },
];

/* 8 named herbs from the pack; 9 more make up the 17-herb blend. */
const HERBS = [
  { name: "Tulasi", sub: "Holy Basil" },
  { name: "Shunthi", sub: "Dry Ginger" },
  { name: "Dalchini", sub: "Cinnamon" },
  { name: "Maricha", sub: "Black Pepper" },
  { name: "Haridra", sub: "Turmeric" },
  { name: "Pippali", sub: "Long Pepper" },
  { name: "Amalaki", sub: "Amla" },
  { name: "Yashti", sub: "Licorice" },
];

const STEPS = [
  { n: 1, title: "Empty 1 sachet", desc: "Tip one 4 g sachet of KadhaPlus into your cup." },
  { n: 2, title: "Add hot water", desc: "Pour in 150–200 ml of hot water." },
  { n: 3, title: "Stir & enjoy", desc: "Stir well and enjoy your kadha warm." },
];

const LABEL_BADGES = [
  "17 Powerful Herbs",
  "No Added Sugar",
  "1000+ ORAC Value",
  "High Antioxidant",
];

const FAQS = [
  {
    q: "What is KadhaPlus Instant Herbal Kadha?",
    a: "It's an instant version of traditional Indian kadha — a warm herbal drink made from a blend of 17 powerful herbs. Each single-serve sachet lets you prepare a fresh cup in under a minute, no boiling or measuring required.",
  },
  {
    q: "How many herbs does it contain?",
    a: "The blend is made with 17 traditional herbs, including Tulasi (Holy Basil), Shunthi (Dry Ginger), Dalchini (Cinnamon), Maricha (Black Pepper), Haridra (Turmeric), Pippali (Long Pepper), Amalaki (Amla), Yashti (Licorice) and 9 more selected herbs — exactly as printed on the pack.",
  },
  {
    q: "How do I prepare it?",
    a: "Empty one 4 g sachet into a cup, add 150–200 ml of hot water, stir well and enjoy it warm.",
  },
  {
    q: "What's the difference between the single sachet and the combo pack?",
    a: "They are the same product in different quantities. The single sachet is 4 g (₹20). The combo pack has 5 sachets (5 × 4 g = 20 g) for ₹100.",
  },
  {
    q: "Does it contain added sugar, preservatives or artificial colours?",
    a: "As stated on the pack, KadhaPlus has no added sugar, no preservatives, no added colours and no artificial flavours.",
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
      {/* ============================ HERO: gallery + buy ===================== */}
      <section className="section pt-10 sm:pt-14">
        <div className="container-px">
          <nav className="mb-6 text-sm text-ink-muted">
            <Link href="/" className="hover:text-herbal-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-herbal-800">Our Product</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <ProductGallery images={GALLERY} />
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <span className="eyebrow mb-4">
                  <Leaf className="h-3.5 w-3.5" />
                  {site.product.category}
                </span>
                <h1 className="h-display text-3xl sm:text-4xl lg:text-[2.75rem]">
                  KadhaPlus Instant Herbal Kadha
                </h1>
                <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">
                  A traditional herbal blend of 17 powerful herbs, crafted to
                  support your daily immunity and wellness — now in a convenient,
                  single-serve sachet. Ready in a cup in under a minute.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {LABEL_BADGES.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full border border-herbal-100 bg-herbal-50 px-3 py-1 text-xs font-medium text-herbal-700"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-7">
                  <BuyBox variants={variants} />
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {BENEFITS.map((b) => (
                    <li
                      key={b.title}
                      className="flex items-center gap-2.5 text-sm text-ink-soft"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-herbal-700">
                        <b.icon className="h-4 w-4" />
                      </span>
                      {b.title}
                    </li>
                  ))}
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
            subtitle="Eight of the key herbs are named on the pack; nine more selected herbs complete the 17-herb blend."
          />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-cream-50 shadow-soft ring-1 ring-herbal-100">
                <Image
                  src="/images/kadhaplus/ingredients-17-herbs.png"
                  alt="KadhaPlus is powered by 17 traditional herbs"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-contain p-2"
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
                <div className="flex flex-col items-center justify-center rounded-2xl bg-herbal-900 p-4 text-center text-mint-100">
                  <Sparkles className="h-5 w-5" />
                  <p className="mt-1 text-sm font-semibold text-white">
                    & 9 more
                  </p>
                  <p className="text-xs text-mint-100/70">potent herbs</p>
                </div>
              </div>
              <p className="mt-5 text-xs text-ink-muted">
                Key herbs printed on the pack: Tulasi, Shunthi, Dalchini,
                Maricha, Haridra, Pippali, Amalaki, Yashti and other selected
                herbs (17 herbs total). We do not add to or alter the
                manufacturer&rsquo;s stated formulation.
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
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-cream-50 shadow-soft ring-1 ring-herbal-100">
                <Image
                  src="/images/kadhaplus/how-to-prepare.png"
                  alt="How to make your KadhaPlus kadha in three steps"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-contain p-2"
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
                    One single-serve sachet. Net weight 4 g. No added sugar.
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
            <div className="relative mt-6 aspect-[5/4] w-full overflow-hidden rounded-3xl bg-cream-50 shadow-soft ring-1 ring-herbal-100">
              <Image
                src="/images/kadhaplus/box-back-details.png"
                alt="KadhaPlus box back panel with ingredients and pack details"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-contain p-2"
              />
            </div>
            <div className="mt-5 space-y-3">
              <Placeholder label="Batch number (printed on each pack)" />
              <Placeholder label="Manufacturing & expiry date (printed on each pack)" />
              <Placeholder label="Manufacturer & licence details (FSSAI / AYUSH as applicable)" />
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              We do not fabricate product data. Net weight, price, ingredients
              and preparation above are taken directly from the manufacturer
              packaging. Batch, dates and licence details are printed on each
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
