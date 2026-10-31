import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about KadhaPlus — what it is, what's in the box, pricing, preparation, ingredients and safety.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        subtitle="For medical suitability and safety questions, we rely only on verified, manufacturer-approved information and never make assumptions."
      />

      <section className="section">
        <div className="container-px mx-auto max-w-3xl">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>

          <Reveal className="mt-10 rounded-3xl bg-herbal-950 p-8 text-center text-mint-100 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-white">
              Still have a question?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-mint-100/75">
              Our team is happy to help with anything we haven&apos;t covered
              here.
            </p>
            <Link href="/contact" className="btn-leaf mt-6">
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
