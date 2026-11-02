import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Quote,
  Star,
} from "lucide-react";
import { site } from "@/lib/site";
import prisma from "@/lib/prisma";
import {
  features,
  prepareSteps,
  traditionalIngredients,
  whyTrust,
  faqs,
} from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Marquee from "@/components/Marquee";
import BuyBox, { type BuyVariant } from "@/components/store/BuyBox";
import { ProductBox3D, SachetFan } from "@/components/product/ProductVisuals";
import { Sprig } from "@/components/product/PackArt";
import HeroSlider from "@/components/HeroSlider";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const variantRows = await prisma.variant.findMany({
    where: { product: { slug: "classic-kadha" } },
    orderBy: { price: "asc" },
  });
  const variants: BuyVariant[] = variantRows.map((v) => ({
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
      {/* ═══════════════ HERO SLIDER ═══════════════ */}
      <HeroSlider />

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <Marquee
        items={[
          "Traditional Wisdom",
          "Modern Convenience",
          "Instant Herbal Kadha",
          "Single-Serve Sachets",
          "Simple · Convenient · Familiar",
          "Rooted in Tradition",
        ]}
      />

      {/* ═══════════════ BENEFITS ═══════════════ */}
      <section className="section bg-cream-50">
        <div className="container-px">
          <SectionHeading
            eyebrow="Why KadhaPlus"
            title="A Familiar Ritual, Made Effortless"
            subtitle="Everything we love about traditional kadha, thoughtfully adapted for modern life."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="group h-full rounded-3xl border border-herbal-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-herbal-600 transition-colors group-hover:bg-herbal-600 group-hover:text-white">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl tracking-wide text-herbal-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT SPOTLIGHT ═══════════════ */}
      <section id="product" className="section bg-gradient-to-b from-mint-100 to-cream-50">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-sm arch-top overflow-hidden bg-cream-100 ring-1 ring-herbal-100">
              <div className="absolute inset-x-6 top-10 bottom-0 flex items-end justify-center">
                <div className="w-[78%]">
                  <ProductBox3D />
                </div>
              </div>
              <Sprig className="absolute left-4 top-6 h-14 w-14 text-herbal-900/10" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Meet the Product"
              title="The Ritual, In a Sachet"
            />
            <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
              {site.product.shortName} — {site.product.category.toLowerCase()}.
              Choose a single sachet to try, or the premium box of five for the
              everyday ritual.
            </p>
            <div className="mt-6">
              <BuyBox variants={variants} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ RITUAL / PREPARE ═══════════════ */}
      <section className="section bg-cream-50">
        <div className="container-px">
          <SectionHeading
            eyebrow="The Ritual"
            title="Ready in Three Simple Steps"
            subtitle="Always follow the exact instructions printed on your approved pack."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {prepareSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1} className="text-center">
                <div className="relative mx-auto w-40">
                  <div className="aspect-[3/4] arch-top overflow-hidden bg-gradient-to-b from-mint-100 to-herbal-50">
                    <div className="flex h-full items-center justify-center">
                      <s.icon className="h-12 w-12 text-herbal-600" />
                    </div>
                  </div>
                  <span className="absolute -top-3 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-herbal-700 font-display text-lg text-cream-50 ring-4 ring-cream-50">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl tracking-wide text-herbal-900">
                  {s.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INGREDIENTS ═══════════════ */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Traditional Inspiration"
              title="Herbs & Spices Behind Kadha"
              subtitle="KadhaPlus draws on herbs and spices long associated with traditional Indian kadha. The complete, verified list is printed on the approved pack."
            />
            <Link href="/ingredients" className="btn-outline mt-6">
              Explore ingredients
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {traditionalIngredients.slice(0, 6).map((ing, i) => (
              <Reveal key={ing.name} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-herbal-100 bg-white p-5 text-center">
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

      {/* ═══════════════ HERITAGE STORY (color block) ═══════════════ */}
      <section className="relative overflow-hidden bg-herbal-950 py-20 text-cream-50 sm:py-28">
        <Sprig className="absolute -left-10 top-6 h-56 w-56 text-brass-400/10" />
        <Sprig className="absolute -right-10 bottom-0 h-56 w-56 rotate-180 text-brass-400/10" />
        <div className="container-px relative">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-10 w-10 text-brass-400" />
            <Reveal>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] tracking-wide text-cream-50">
                From Generations of Wisdom to Everyday Convenience
              </h2>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-cream-100/75">
                KadhaPlus began with a simple belief — that the comforting
                wellness our grandmothers trusted shouldn&apos;t be lost to busy
                modern days. We captured the warmth of home-brewed kadha and
                offered it in a format that fits the pace of life today.
              </p>
              <p className="mt-8 font-serif text-xl italic text-brass-300">
                “{site.philosophy}”
              </p>
              <Link href="/about" className="btn-leaf mt-8">
                Read our story
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ ASSURANCE ═══════════════ */}
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
                <div className="h-full rounded-3xl border border-herbal-100 bg-white p-8 text-center">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-herbal-600">
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
            <Star className="h-4 w-4 text-brass-500" />
            Wellness-oriented messaging only — no unverified medical claims. See our{" "}
            <Link href="/disclaimer" className="underline">
              Disclaimer
            </Link>
            .
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ FAQ + CTA ═══════════════ */}
      <section className="section bg-gradient-to-b from-mint-100 to-cream-50">
        <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQs"
              title="Good to Know"
              subtitle="For safety and suitability questions we rely only on verified, manufacturer-approved information."
            />
            <div className="mt-6 hidden lg:block">
              <SachetFan className="max-w-xs pb-6 pt-2" />
            </div>
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
