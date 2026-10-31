import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="h-display text-3xl sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
