import type { Metadata } from "next";
import Link from "next/link";
import { Check, Package, Boxes, Leaf, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Placeholder from "@/components/ui/Placeholder";
import {
  ProductBox3D,
  SachetFan,
  SachetArt,
  SachetStanding,
  BoxFront,
  BoxSidePanel,
  BoxBackPanel,
} from "@/components/product/ProductVisuals";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Product",
  description:
    "KadhaPlus Classic Kadha — instant herbal kadha granules. ₹20 per sachet, or a pack of 5 for ₹89. Front, side and back packaging views.",
};

const highlights = [
  "Instant herbal kadha granules",
  "Inspired by traditional Indian kadha",
  "Convenient single-serve sachets",
  "Ready in a cup — just follow the pack",
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Product"
        title="Meet KadhaPlus Classic Kadha"
        subtitle="The warmth of traditional kadha as an instant herbal beverage — premium packaging, by the sachet or the pack of five."
      />

      {/* Overview */}
      <section className="section">
        <div className="container-px grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative flex justify-center">
            <div className="absolute inset-0 -z-10 rounded-full bg-spice-100/60 blur-2xl" />
            <div className="w-full max-w-sm">
              <ProductBox3D priority />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow mb-4">
                <Leaf className="h-3.5 w-3.5" />
                {site.product.category}
              </span>
              <h2 className="h-display text-3xl sm:text-4xl">
                {site.product.shortName}
              </h2>

              {/* quiet pricing */}
              <div className="mt-5 flex items-center gap-5 text-sm text-ink-soft">
                <span>
                  <span className="font-display text-2xl font-semibold text-herbal-800">
                    {site.product.sachetPriceLabel}
                  </span>{" "}
                  / sachet
                </span>
                <span className="h-5 w-px bg-herbal-200" />
                <span>
                  <span className="font-display text-2xl font-semibold text-herbal-800">
                    {site.product.priceLabel}
                  </span>{" "}
                  / pack of 5
                </span>
              </div>

              <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
                Each sachet carries the comforting character of classic kadha in
                an instant granule format. Buy a single sachet to try, or save
                with the premium box of five.
              </p>

              <ul className="mt-6 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-ink-soft">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf-500 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/how-to-prepare" className="btn-primary">
                  How to prepare
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/ingredients" className="btn-outline">
                  View ingredients
                </Link>
              </div>
              <p className="mt-4 text-xs text-ink-muted">
                Prices shown here on the website ({site.product.sachetPriceLabel}{" "}
                per sachet · {site.product.priceLabel} per pack) may not be
                printed on the packaging.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Buy options */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px">
          <SectionHeading
            eyebrow="Choose Your Pack"
            title="Two ways to enjoy KadhaPlus"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal>
              <div className="card flex h-full flex-col items-center p-8 text-center">
                <div className="w-20">
                  <SachetArt detail={false} className="aspect-[1/3.3]" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-herbal-900">
                  Individual Sachet
                </h3>
                <p className="mt-1 text-sm text-ink-muted">Single-serve · try it first</p>
                <p className="mt-4 font-display text-3xl font-semibold text-herbal-800">
                  {site.product.sachetPriceLabel}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="card relative flex h-full flex-col items-center p-8 text-center ring-2 ring-herbal-500">
                <span className="absolute -top-3 rounded-full bg-herbal-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Best Value
                </span>
                <div className="w-28">
                  <ProductBox3D />
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold text-herbal-900">
                  Classic Kadha Box
                </h3>
                <p className="mt-1 text-sm text-ink-muted">Pack of 5 sachets</p>
                <p className="mt-4 font-display text-3xl font-semibold text-herbal-800">
                  {site.product.priceLabel}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery: packaging views */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Product Gallery"
            title="Every angle of the packaging"
            subtitle="Front, side and back panels, the individual sachet, the full pack of five, and a 3D box view."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GalleryCard label="Front View" note="Box front panel">
              <div className="w-44">
                <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-soft ring-1 ring-black/5">
                  <BoxFront />
                </div>
              </div>
            </GalleryCard>

            <GalleryCard label="Side Panel" note="Box profile">
              <div className="w-20">
                <div className="aspect-[1/2.4] overflow-hidden rounded-xl shadow-soft ring-1 ring-black/5">
                  <BoxSidePanel />
                </div>
              </div>
            </GalleryCard>

            <GalleryCard label="Back Panel" note="Info & ingredients">
              <div className="w-44">
                <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-soft ring-1 ring-black/5">
                  <BoxBackPanel />
                </div>
              </div>
            </GalleryCard>

            <GalleryCard label="Individual Sachet" note="Single-serve pack">
              <div className="w-24">
                <SachetStanding />
              </div>
            </GalleryCard>

            <GalleryCard label="All 5 Sachets" note="What's inside the box" wide>
              <SachetFan className="w-full max-w-md pb-6 pt-2" />
            </GalleryCard>

            <GalleryCard label="3D Box Mockup" note="Classic Kadha" dark>
              <div className="w-40">
                <ProductBox3D />
              </div>
            </GalleryCard>
          </div>
        </div>
      </section>

      {/* Packaging details + placeholders */}
      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Packaging" title="Packaging details" />
            <div className="mt-6 space-y-4">
              <div className="card flex items-start gap-4 p-5">
                <Package className="mt-0.5 h-6 w-6 shrink-0 text-spice-600" />
                <div>
                  <p className="font-semibold text-herbal-900">Individual sachet</p>
                  <p className="text-sm text-ink-soft">
                    Single-serve pack of instant herbal kadha granules —{" "}
                    {site.product.sachetPriceLabel} each.
                  </p>
                </div>
              </div>
              <div className="card flex items-start gap-4 p-5">
                <Boxes className="mt-0.5 h-6 w-6 shrink-0 text-spice-600" />
                <div>
                  <p className="font-semibold text-herbal-900">Outer box</p>
                  <p className="text-sm text-ink-soft">
                    A premium cardboard box containing exactly{" "}
                    {site.product.sachetCount} sachets — {site.product.priceLabel}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Verified Information"
              title="Printed on approved packaging"
            />
            <div className="mt-6 space-y-3">
              <Placeholder label="Net quantity & sachet weight" />
              <Placeholder label="Complete ingredient list / formulation" />
              <Placeholder label="Usage instructions & water quantity" />
              <Placeholder label="Manufacturer & licence details (FSSAI / AYUSH as applicable)" />
              <Placeholder label="Batch number & expiry information" />
              <Placeholder label="Warnings & precautions" />
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              We do not fabricate product data. The above is confirmed only from
              manufacturer-approved packaging. See our{" "}
              <Link href="/disclaimer" className="underline">
                Disclaimer
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryCard({
  label,
  note,
  children,
  wide = false,
  dark = false,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
  wide?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal className={wide ? "md:col-span-2 lg:col-span-2" : ""}>
      <figure
        className={`card flex h-full flex-col items-center justify-between overflow-hidden p-8 ${
          dark ? "bg-herbal-950 text-mint-100" : ""
        }`}
      >
        <div className="flex w-full flex-1 items-center justify-center py-2">
          {children}
        </div>
        <figcaption className="mt-6 text-center">
          <p className={`font-semibold ${dark ? "text-white" : "text-herbal-900"}`}>
            {label}
          </p>
          <p className={`text-sm ${dark ? "text-mint-100/70" : "text-ink-muted"}`}>
            {note}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}
