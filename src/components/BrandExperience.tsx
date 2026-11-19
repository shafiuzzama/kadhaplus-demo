import Image from "next/image";
import { Leaf, Package, CupSoda } from "lucide-react";
import { Sprig } from "@/components/product/PackArt";
import Reveal from "@/components/ui/Reveal";

const IMG = "/images/kadhaplus";

const DIFFERENCE = [
  {
    icon: Leaf,
    title: "17 Herbal Ingredients",
    desc: "A blend rooted in traditional Indian kadha.",
  },
  {
    icon: Package,
    title: "Convenient 4 g Sachets",
    desc: "Single-serve and ready wherever you are.",
  },
  {
    icon: CupSoda,
    title: "Easy Preparation",
    desc: "Just add hot water, stir and enjoy warm.",
  },
];

/* Shared card frame: swipe carousel on mobile, equal 3-up grid on desktop. */
const cardBase =
  "group relative flex min-h-[460px] shrink-0 basis-[86%] snap-start flex-col overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1 sm:basis-[58%] md:basis-auto";

export default function BrandExperience() {
  return (
    <section className="bg-cream-50 py-16 sm:py-24">
      <div className="container-px">
        {/* heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-navy">
            The KadhaPlus Experience
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.05] text-herbal-900">
            Traditional Wellness, Simplified.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">
            Discover the goodness of 17 traditional herbs in a convenient instant
            kadha sachet, designed to fit effortlessly into your daily routine.
          </p>
        </Reveal>

        {/* cards */}
        <Reveal
          delay={0.08}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {/* CARD 1 — Philosophy */}
          <article
            className={`${cardBase} justify-between bg-herbal-900 p-8 text-cream-50 ring-1 ring-black/5`}
          >
            <Sprig className="pointer-events-none absolute -right-7 -top-7 h-32 w-32 text-brass-400/10" />
            <div className="relative">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brass-300">
                Our Philosophy
              </p>
              <h3 className="mt-4 font-serif text-[1.8rem] font-semibold leading-[1.12] text-white">
                Ancient Wisdom. Modern Convenience.
              </h3>
            </div>
            <div className="relative">
              <span className="mb-5 block h-px w-12 bg-brass-400/60" />
              <p className="text-[0.98rem] leading-relaxed text-cream-100/80">
                Bringing traditional herbal knowledge into a convenient daily
                format, one sachet at a time.
              </p>
            </div>
          </article>

          {/* CARD 2 — Lifestyle photography */}
          <article className={`${cardBase} ring-1 ring-black/5`}>
            <Image
              src={`${IMG}/lifestyle-kadha.webp`}
              alt="A woman enjoying a warm cup of KadhaPlus herbal kadha at home"
              fill
              sizes="(min-width:768px) 33vw, 86vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-herbal-950/75 via-herbal-950/10 to-herbal-950/5" />
            {/* real packaging, placed beside the moment */}
            <div className="absolute right-4 top-4 w-20 rounded-lg bg-white/95 p-1.5 ring-1 ring-black/[0.06] backdrop-blur sm:w-24">
              <div className="relative aspect-square">
                <Image
                  src={`${IMG}/pack-box-open.webp`}
                  alt="KadhaPlus 5-sachet box"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="relative mt-auto p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brass-200">
                Everyday Ritual
              </p>
              <p className="mt-1 font-serif text-xl leading-snug text-white">
                A warm cup, a calmer day.
              </p>
            </div>
          </article>

          {/* CARD 3 — The KadhaPlus Difference */}
          <article
            className={`${cardBase} border border-black/[0.07] bg-white p-8`}
          >
            <Sprig className="pointer-events-none absolute -right-8 bottom-[-2rem] h-40 w-40 text-herbal-900/[0.04]" />
            <p className="relative text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-navy">
              The KadhaPlus Difference
            </p>
            <h3 className="relative mt-4 font-serif text-[1.8rem] font-semibold leading-[1.12] text-herbal-900">
              Thoughtfully Made for Everyday Wellness.
            </h3>
            <span className="relative my-6 block h-px w-12 bg-brass-400" />
            <ul className="relative space-y-5">
              {DIFFERENCE.map((d) => (
                <li key={d.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-herbal-700">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-herbal-900">{d.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                      {d.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
