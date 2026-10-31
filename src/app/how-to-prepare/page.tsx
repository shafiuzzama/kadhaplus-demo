import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Placeholder from "@/components/ui/Placeholder";
import { prepareSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "How to Prepare",
  description:
    "Prepare KadhaPlus in three simple steps. Always follow the exact instructions printed on your approved product packaging.",
};

export default function HowToPreparePage() {
  return (
    <>
      <PageHeader
        eyebrow="How to Prepare"
        title="Ready in three simple steps"
        subtitle="A familiar cup of comfort, prepared the easy way — always following your pack instructions."
      />

      <section className="section">
        <div className="container-px">
          <div className="relative grid gap-6 md:grid-cols-3">
            {prepareSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="card relative h-full overflow-hidden p-8">
                  <span className="absolute -right-2 -top-4 font-display text-8xl font-bold text-herbal-50">
                    {s.step}
                  </span>
                  <div className="relative">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-herbal-600 text-white">
                      <s.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-herbal-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-12 flex max-w-3xl items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-ink-soft">
              <strong className="text-amber-800">Important:</strong> We do not
              specify water quantities, preparation temperatures, or how often to
              consume KadhaPlus on this website. These details are provided on the
              approved product packaging — please follow them exactly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="From the Pack"
            title="Exact preparation details"
            subtitle="The verified preparation method is printed on your approved packaging."
          />
          <div className="mt-10 space-y-3">
            <Placeholder label="Recommended water quantity" />
            <Placeholder label="Preparation method & temperature" />
            <Placeholder label="Suggested consumption frequency" />
            <Placeholder label="Best-before / storage guidance" />
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/faqs" className="btn-primary">
              Read the FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
