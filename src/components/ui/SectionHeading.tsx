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
  const centered = align === "center";
  return (
    <Reveal
      className={`flex max-w-2xl flex-col ${
        centered ? "mx-auto items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95] tracking-wide text-herbal-900">
        {title}
      </h2>
      {centered && (
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-8 bg-brass-400" />
          <span className="h-1.5 w-1.5 rotate-45 bg-brass-500" />
          <span className="h-px w-8 bg-brass-400" />
        </div>
      )}
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
