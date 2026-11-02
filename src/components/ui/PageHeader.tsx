import Reveal from "./Reveal";
import { Sprig } from "@/components/product/PackArt";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-herbal-100 bg-gradient-to-b from-mint-100 to-cream-50">
      <div className="absolute inset-0 leaf-texture" />
      <Sprig className="absolute -left-8 -top-6 h-40 w-40 text-herbal-900/[0.04]" />
      <Sprig className="absolute -right-8 bottom-0 h-40 w-40 rotate-180 text-herbal-900/[0.04]" />
      <div className="container-px relative py-16 sm:py-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] tracking-wide text-herbal-900">
            {title}
          </h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-10 bg-brass-400" />
            <span className="h-1.5 w-1.5 rotate-45 bg-brass-500" />
            <span className="h-px w-10 bg-brass-400" />
          </div>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
