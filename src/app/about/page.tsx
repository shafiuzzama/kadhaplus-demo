import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, Sprout, Clock3 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SachetArt, SachetStanding } from "@/components/product/ProductVisuals";
import { site } from "@/lib/site";
import { whyTrust } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "From generations of wisdom to everyday convenience — the story and philosophy behind KadhaPlus herbal wellness.",
};

const values = [
  { icon: Sprout, title: "Tradition", desc: "We honour the familiar comfort of home-brewed kadha." },
  { icon: Clock3, title: "Convenience", desc: "We adapt that ritual for modern, busy routines." },
  { icon: Heart, title: "Honesty", desc: "We communicate responsibly, without unverified claims." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="From Generations of Wisdom to Everyday Convenience"
        subtitle={site.description}
      />

      <section className="section">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Dadi Maa Ka Nuskha, Ab Ek Naye Andaaz Mein!"
            />
            <div className="prose-herbal mt-4 max-w-lg">
              <p>
                In countless Indian homes, a warm cup of kadha has been a quiet
                gesture of care — brewed with herbs and spices, and shared
                whenever comfort was needed. It is a ritual passed down through
                generations.
              </p>
              <p>
                KadhaPlus was born from a simple thought: this familiar comfort
                shouldn&apos;t fade away in busy modern life. We set out to
                capture the warmth of traditional kadha and offer it in a simple,
                convenient sachet — ready whenever you want it.
              </p>
              <p>
                Our promise is to stay true to that inspiration while
                communicating honestly. KadhaPlus is a herbal wellness product,
                and we describe it as exactly that.
              </p>
            </div>
            <Link href="/product" className="btn-primary mt-6">
              Explore our product
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-mint-100 to-spice-50" />
            <div className="grid grid-cols-2 items-center gap-6 p-6">
              <SachetStanding />
              <SachetArt className="mt-6 aspect-[1/3.3]" detail={false} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Traditional Wisdom. Modern Convenience."
            subtitle="Three simple values guide everything we do at KadhaPlus."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="card h-full p-8 text-center">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-600">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-herbal-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Our Approach"
            title="Built on trust and transparency"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyTrust.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="card h-full p-7">
                  <w.icon className="h-8 w-8 text-leaf-500" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-herbal-900">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 rounded-3xl bg-herbal-950 p-8 text-center text-mint-100 sm:p-12">
            <Leaf className="mx-auto h-8 w-8 text-leaf-400" />
            <p className="mx-auto mt-4 max-w-2xl font-display text-xl italic text-white sm:text-2xl">
              “Bringing the wisdom of traditional Indian kadha into a simple,
              convenient and modern wellness experience.”
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
