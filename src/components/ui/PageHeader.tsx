import Reveal from "./Reveal";

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
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-leaf-200/30 blur-3xl" />
      <div className="container-px relative py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
          <h1 className="h-display text-4xl sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
