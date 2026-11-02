import Image from "next/image";
import { site } from "@/lib/site";

/* ============================================================================
   KadhaPlus premium packaging artwork — "apothecary" design system.
   Restrained palette: ivory/cream, deep forest green, muted terracotta and
   thin brass lines, with a single botanical emblem. Original design; the
   official K+ logo is placed unmodified.
   ========================================================================== */

/* A fine-line holy-basil / tulsi sprig */
export function Sprig({ className = "" }: { className?: string }) {
  const leaf = "M0 0 C -5 -7 -5 -17 0 -24 C 5 -17 5 -7 0 0 Z";
  const pairs = [
    { y: 70, s: 1 },
    { y: 56, s: 0.9 },
    { y: 43, s: 0.78 },
    { y: 31, s: 0.62 },
  ];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 86 L50 22" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {pairs.map((p, i) => (
        <g key={i}>
          <path d={leaf} transform={`translate(50 ${p.y}) rotate(38) scale(${p.s})`} fill="currentColor" />
          <path d={leaf} transform={`translate(50 ${p.y}) rotate(-38) scale(${p.s})`} fill="currentColor" />
        </g>
      ))}
      <circle cx="50" cy="20" r="2.4" fill="currentColor" />
    </svg>
  );
}

/* Circular seal: thin brass ring + botanical sprig */
export function Emblem({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle cx="50" cy="50" r="47" fill="none" stroke="#c9a86a" strokeWidth="1.1" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#163a22" strokeWidth="0.7" strokeOpacity="0.55" />
        {[...Array(28)].map((_, i) => {
          const a = (i / 28) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={50 + Math.cos(a) * 44.5}
              cy={50 + Math.sin(a) * 44.5}
              r="0.7"
              fill="#c9a86a"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Sprig className="h-[58%] w-[58%] text-herbal-800" />
      </div>
    </div>
  );
}

/* Thin rule with a centre diamond — a premium divider */
function Rule({ w = "38cqw" }: { w?: string }) {
  return (
    <div className="flex items-center justify-center gap-[2cqw]" style={{ width: w }}>
      <span className="h-px flex-1 bg-brass-400" />
      <span className="h-[1.6cqw] w-[1.6cqw] rotate-45 bg-brass-500" />
      <span className="h-px flex-1 bg-brass-400" />
    </div>
  );
}

/* ---------------- The designed individual sachet ---------------- */
export function SachetArt({
  className = "",
  priority = false,
  detail = true,
}: {
  className?: string;
  priority?: boolean;
  detail?: boolean;
}) {
  return (
    <div className={`relative select-none ${className}`}>
      <div
        className="relative h-full w-full overflow-hidden rounded-[2.5cqw] bg-cream-50 shadow-[0_16px_38px_-14px_rgba(22,58,34,0.45)] ring-1 ring-black/5"
        style={{ containerType: "inline-size" }}
      >
        {/* top & bottom accents */}
        <div className="absolute inset-x-0 top-0 h-[2.6cqw] bg-clay-500" />
        {/* inner double frame */}
        <div className="pointer-events-none absolute inset-[4.5cqw] rounded-[2cqw] border border-brass-400/70" />
        <div className="pointer-events-none absolute inset-[6cqw] rounded-[1.5cqw] border border-herbal-900/10" />
        {/* faint botanical watermark */}
        <Sprig className="pointer-events-none absolute left-1/2 top-[63%] h-[52cqw] w-[52cqw] -translate-x-1/2 text-herbal-900/[0.05]" />

        <div className="relative flex h-full flex-col items-center px-[11cqw] pb-[9cqw] pt-[10cqw] text-center">
          {/* logo */}
          <Image
            src="/images/logo.jpg"
            alt={`${site.name} logo`}
            width={300}
            height={100}
            priority={priority}
            className="h-[8cqw] w-auto object-contain"
          />

          <div className="mt-[4cqw] flex w-full justify-center">
            <Rule w="34cqw" />
          </div>

          <p className="mt-[4cqw] text-[3.3cqw] font-semibold uppercase leading-[1.4] tracking-[0.3em] text-herbal-700">
            Instant Herbal
            <br />
            Kadha Granules
          </p>

          <Emblem className="mt-[5cqw] w-[38cqw]" />

          <p className="mt-[5cqw] font-display text-[13cqw] font-semibold leading-[0.9] tracking-tight text-herbal-900">
            Classic
          </p>
          <p className="mt-[1cqw] font-display text-[6.2cqw] font-medium uppercase tracking-[0.35em] text-clay-500">
            Kadha
          </p>

          <div className="mt-auto flex w-full flex-col items-center">
            <Rule w="30cqw" />
            <p className="mt-[3cqw] text-[3cqw] italic tracking-wide text-ink-muted">
              {site.product.packagingTagline}
            </p>
            {detail && (
              <p className="mt-[2cqw] text-[2.6cqw] tracking-wide text-ink-muted/80">
                Net Wt. [__] g&nbsp;·&nbsp;Lic/FSSAI [__]
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Simplified sachet strip for the mini sachets inside the box */
export function MiniSachet({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2px] bg-cream-50 shadow-md ring-1 ring-black/10 ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="absolute inset-x-0 top-0 h-[10%] bg-clay-500" />
        <Emblem className="w-[52%]" />
        <div className="absolute inset-x-0 bottom-0 h-[16%] bg-herbal-900" />
      </div>
    </div>
  );
}
