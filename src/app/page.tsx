import Link from "next/link";
import { ArrowRight, Leaf, Quote } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { site } from "@/lib/site";
import { features, prepareSteps } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "@/lib/content";
import { HeroComposition, ProductBox, SachetFan, SachetArt } from "@/components/product/ProductVisuals";
import ContactForm from "@/components/ContactForm";
import { Phone, MapPin, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mint-100 via-cream-50 to-cream-50">
        <div className="absolute inset-0 leaf-texture" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-leaf-200/40 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-herbal-100/50 blur-3xl" />

        <div className="container-px relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <span className="eyebrow mb-5">
              <Leaf className="h-3.5 w-3.5" />
              {site.tagline}
            </span>
            <h1 className="h-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              A Timeless Indian
              <br />
              Tradition, <span className="text-spice-600">Made Simple.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
              {site.name} is an instant herbal kadha beverage — the warm, familiar
              comfort of traditional Indian kadha in convenient single-serve
              granules. Just add to a cup and enjoy.
            </p>

            {/* quiet pricing line */}
            <div className="mt-7 flex items-center gap-4 text-sm text-ink-soft">
              <span>
                <span className="font-display text-lg font-semibold text-herbal-800">
                  {site.product.sachetPriceLabel}
                </span>{" "}
                / sachet
              </span>
              <span className="h-4 w-px bg-herbal-200" />
              <span>
                <span className="font-display text-lg font-semibold text-herbal-800">
                  {site.product.priceLabel}
                </span>{" "}
                / pack of 5
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/product" className="btn-primary">
                Explore Product
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn-outline">
                Discover Our Story
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative pt-8 lg:pt-0">
            <HeroComposition />
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Brand Introduction ───────────────── */}
      <section className="section">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-mint-100" />
              <div className="grid grid-cols-2 items-center gap-6 p-4">
                <SachetArt className="aspect-[1/3.3] w-full" />
                <div className="flex flex-col gap-4">
                  <div className="card flex flex-col justify-center p-6">
                    <Leaf className="h-8 w-8 text-leaf-500" />
                    <p className="mt-3 font-display text-lg font-semibold text-herbal-900">
                      Rooted in nature
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">
                      A familiar herbal ritual.
                    </p>
                  </div>
                  <div className="card flex items-center gap-3 p-5">
                    <span className="font-display text-2xl font-semibold text-herbal-800">
                      {site.product.sachetPriceLabel}
                    </span>
                    <span className="text-sm text-ink-soft">per single-serve sachet</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Our Inspiration"
              title="Rooted in Tradition. Designed for Today."
              subtitle="For generations, Indian households have turned to kadha — a warm, herbal preparation made from familiar spices and herbs. KadhaPlus brings that comforting, time-honoured ritual into a convenient single-serve sachet."
            />
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
                No elaborate preparation, no guesswork — just the familiar warmth
                of traditional kadha, reimagined for a modern pace of life. It is
                wellness that feels like home.
              </p>
              <p className="mt-6 font-display text-lg italic text-herbal-700">
                “{site.slogan}”
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── Our Product (shop) ───────────────── */}
      <section id="product" className="section bg-cream-50">
        <div className="container-px">
          <SectionHeading
            eyebrow="Meet KadhaPlus"
            title="Our Classic Kadha Range"
            subtitle="Instant herbal kadha granules — available by the single sachet or as a value pack of five."
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            <ProductCard
              tag="Starter"
              title="KadhaPlus Classic — Single Sachet"
              desc="One single-serve sachet of instant herbal kadha granules. Perfect to try."
              price={site.product.sachetPriceLabel}
            >
              <div className="w-20">
                <SachetArt className="aspect-[1/3.3]" detail={false} />
              </div>
            </ProductCard>
            <ProductCard
              tag="Bestseller"
              featured
              title="KadhaPlus Classic — Pack of 5"
              desc="A premium box of 5 single-serve sachets. The comfort of classic kadha, ready anytime."
              price={site.product.priceLabel}
              delay={0.08}
            >
              <div className="w-32">
                <ProductBox />
              </div>
            </ProductCard>
          </div>
          <Reveal className="mt-8 text-center">
            <Link href="/product" className="btn-outline">
              Explore the full product
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Why KadhaPlus ───────────────── */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Why KadhaPlus?"
            title="A familiar ritual, made effortless"
            subtitle="Everything we love about traditional kadha, thoughtfully adapted for the way we live today."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="card group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-600 transition-colors group-hover:bg-leaf-500 group-hover:text-white">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-herbal-900">
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

      {/* ───────────────── Traditional Inspiration ───────────────── */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Traditional Inspiration"
              title="The Comfort of Traditional Kadha"
              subtitle="A warm cup of kadha has long been a part of Indian homes — brewed with herbs and spices like tulsi, ginger, pepper and cloves, and shared as a gesture of care."
            />
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
                KadhaPlus is inspired by that tradition. It celebrates the warmth
                and familiarity of kadha as a comforting wellness ritual —
                without claiming to cure, treat or prevent any condition.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Tulsi", "Ginger", "Pepper", "Cloves", "Cardamom"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-herbal-100 bg-white px-4 py-2 text-sm font-medium text-herbal-700 shadow-sm"
                  >
                    <Leaf className="h-3.5 w-3.5 text-leaf-500" />
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 -z-10 rounded-full bg-leaf-200/50 blur-3xl" />
              <SachetFan className="pb-10 pt-6" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── How to Prepare ───────────────── */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="How to Prepare"
            title="Ready in three simple steps"
            subtitle="Always follow the exact instructions printed on your approved product packaging."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {prepareSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="card relative h-full overflow-hidden p-8">
                  <span className="absolute -right-2 -top-4 font-display text-7xl font-bold text-herbal-50">
                    {s.step}
                  </span>
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-herbal-600 text-white">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-herbal-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <Link href="/how-to-prepare" className="btn-ghost">
              See full preparation guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Brand Story ───────────────── */}
      <section className="section bg-herbal-950 text-mint-100">
        <div className="container-px">
          <div className="relative mx-auto max-w-4xl text-center">
            <Quote className="mx-auto h-12 w-12 text-leaf-400/60" />
            <Reveal>
              <h2 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
                From Generations of Wisdom to Everyday Convenience.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-mint-100/75">
                KadhaPlus began with a simple idea — the kind of wellness our
                grandmothers trusted shouldn&apos;t be lost to busy modern days.
                We set out to capture the familiar comfort of home-brewed kadha
                and offer it in a format that fits today&apos;s pace, without
                losing the warmth that made it special.
              </p>
              <p className="mt-6 font-display text-xl italic text-leaf-300">
                “{site.philosophy}”
              </p>
              <Link href="/about" className="btn-leaf mt-8">
                Read our story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="FAQs"
            title="Questions, answered"
            subtitle="For medical suitability and safety questions, we rely only on verified, manufacturer-approved information."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={faqs.slice(0, 6)} />
            <Reveal className="mt-6 text-center">
              <Link href="/faqs" className="btn-ghost">
                View all FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── Contact ───────────────── */}
      <section id="contact" className="section bg-gradient-to-b from-mint-100 to-cream-50">
        <div className="container-px grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact Us"
              title="We'd love to hear from you"
              subtitle="Questions about KadhaPlus, bulk enquiries, or feedback — reach out and our team will be glad to help."
            />
            <div className="mt-8 space-y-4">
              <a
                href={`tel:${site.contact.phones[0]}`}
                className="card flex items-center gap-4 p-5 transition-colors hover:border-herbal-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink-muted">Call us</span>
                  <span className="font-semibold text-herbal-900">
                    {site.contact.phones.join(" · ")}
                  </span>
                </span>
              </a>
              <div className="card flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink-muted">Email</span>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-semibold text-herbal-900 hover:text-herbal-600"
                  >
                    {site.contact.email}
                  </a>
                </span>
              </div>
              <div className="card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink-muted">Office</span>
                  <span className="font-semibold text-herbal-900">
                    {site.contact.address.lines.join(", ")}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
