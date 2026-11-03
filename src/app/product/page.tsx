import type { Metadata } from "next";
import Link from "next/link";
import { Check, Package, Boxes, Leaf, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Placeholder from "@/components/ui/Placeholder";
import ProductCard from "@/components/ProductCard";
import BuyBox, { type BuyVariant } from "@/components/store/BuyBox";
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
import { VARIANTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Our Product",
  description:
    "KadhaPlus Classic Kadha — instant herbal kadha granules. Buy a single sachet or a pack of 5. Add to cart or buy now.",
};

const highlights = [
  "Instant herbal kadha granules",
  "Inspired by traditional Indian kadha",
  "Convenient single-serve sachets",
  "Ready in a cup — just follow the pack",
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

              <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
                Each sachet carries the comforting character of classic kadha in
                an instant granule format. Buy a single sachet to try, or save
                with the premium box of five.
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-ink-soft">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-leaf-500 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-7">
              <BuyBox variants={variants} />
            </div>
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
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            <ProductCard
              tag="Starter"
              title="Individual Sachet"
              desc="One single-serve sachet of instant herbal kadha granules — try it first."
              price={site.product.sachetPriceLabel}
              cta="How to prepare"
              href="/how-to-prepare"
            >
              <div className="w-20">
                <SachetArt detail={false} className="aspect-[1/3.3]" />
              </div>
            </ProductCard>
            <ProductCard
              tag="Best Value"
              featured
              title="Classic Kadha Box"
              desc="A premium box of 5 single-serve sachets — the comfort of classic kadha, anytime."
              price={site.product.priceLabel}
              cta="See ingredients"
              href="/ingredients"
              delay={0.08}
            >
              <div className="w-28">
                <ProductBox3D />
              </div>
            </ProductCard>
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
