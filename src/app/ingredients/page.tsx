import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Info } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Placeholder from "@/components/ui/Placeholder";
import { traditionalIngredients } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "The traditional herbs and spices that inspire KadhaPlus. The complete verified ingredient list is printed on approved packaging.",
};

export default function IngredientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ingredients"
        title="Inspired by familiar herbs & spices"
        subtitle="KadhaPlus draws on the herbs and spices traditionally associated with Indian kadha. The complete, verified ingredient list is printed on the approved product packaging."
      />

      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto mb-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-leaf-200 bg-leaf-50/60 p-5 text-sm">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
            <p className="text-ink-soft">
              The herbs shown below reflect the <strong>traditional inspiration</strong>{" "}
              behind kadha and are shared for context only. They are not a
              statement of the final recipe. Always refer to the ingredient list
              on your pack.
            </p>
          </Reveal>

          <SectionHeading
            eyebrow="Traditional Inspiration"
            title="Herbs & spices behind kadha"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {traditionalIngredients.map((ing, i) => (
              <Reveal key={ing.name} delay={i * 0.05}>
                <div className="card h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-herbal-900">
                    {ing.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{ing.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-cream-50 to-mint-100">
        <div className="container-px mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Verified Product Information"
            title="The official ingredient list"
            subtitle="We never fabricate ingredients, quantities or nutritional information. The confirmed details below come only from manufacturer-approved sources."
          />
          <div className="mt-10 space-y-3">
            <Placeholder label="Complete ingredient list" />
            <Placeholder label="Allergen information" />
            <Placeholder label="Nutritional information (if applicable)" />
            <Placeholder label="Added flavours / preservatives disclosure" />
          </div>
          <p className="mt-6 text-center text-sm text-ink-muted">
            Have a specific question about ingredients?{" "}
            <Link href="/contact" className="font-medium text-herbal-600 underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
