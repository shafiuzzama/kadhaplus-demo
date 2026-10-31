import Image from "next/image";
import { site } from "@/lib/site";

/* ============================================================================
   KadhaPlus original packaging artwork — hand-built vector/CSS design.
   No stock photos are dropped into a box: the sachet and box faces below are
   an original FMCG-style label system. The official K+ logo is placed
   unmodified from /images/logo.jpg.
   ========================================================================== */

/* ---------- Illustration primitives (inline SVG) ---------- */

export function KadhaCup({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {/* steam */}
      <g
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M46 34 C40 26 52 22 46 13" />
        <path d="M60 32 C54 23 66 19 60 9" />
        <path d="M74 34 C68 26 80 22 74 13" />
      </g>
      {/* saucer shadow */}
      <ellipse cx="60" cy="104" rx="34" ry="6" fill="#000000" opacity="0.12" />
      {/* cup body (clay kulhad) */}
      <path
        d="M30 46 Q30 50 32 53 L41 92 Q44 101 60 101 Q76 101 79 92 L88 53 Q90 50 90 46 Z"
        fill="#b05a30"
      />
      <path
        d="M30 46 Q30 50 32 53 L41 92 Q44 101 60 101 L60 46 Z"
        fill="#9a4a26"
      />
      {/* rim */}
      <ellipse cx="60" cy="46" rx="30" ry="8" fill="#c56b3e" />
      <ellipse cx="60" cy="45" rx="30" ry="7.5" fill="none" stroke="#7d3a1e" strokeWidth="1.5" />
      {/* liquid */}
      <ellipse cx="60" cy="45" rx="24" ry="6" fill="#4a2a17" />
      <ellipse cx="60" cy="44.5" rx="19" ry="4.3" fill="#5c3a22" />
      {/* decorative band */}
      <path d="M36 66 L84 66" stroke="#e9b27f" strokeWidth="2.5" opacity="0.7" />
      <circle cx="47" cy="77" r="2.3" fill="#e9b27f" opacity="0.7" />
      <circle cx="60" cy="80" r="2.3" fill="#e9b27f" opacity="0.7" />
      <circle cx="73" cy="77" r="2.3" fill="#e9b27f" opacity="0.7" />
    </svg>
  );
}

type HerbType = "leaf" | "anise" | "ginger" | "cardamom" | "cinnamon" | "seeds";

export function Herb({
  type,
  className = "",
}: {
  type: HerbType;
  className?: string;
}) {
  switch (type) {
    case "leaf":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path
            d="M24 4 C10 12 8 30 20 44 C34 38 40 20 24 4 Z"
            fill="#3f8350"
          />
          <path d="M24 8 C22 22 21 34 21 42" stroke="#1f432a" strokeWidth="1.6" fill="none" />
          <path d="M23 18 L31 15 M22 26 L30 25 M21 34 L28 35" stroke="#1f432a" strokeWidth="1.2" />
        </svg>
      );
    case "anise":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <g fill="#7d3a1e">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <ellipse
                key={a}
                cx="24"
                cy="24"
                rx="4"
                ry="12"
                transform={`rotate(${a} 24 24)`}
              />
            ))}
          </g>
          <circle cx="24" cy="24" r="5" fill="#b05a30" />
        </svg>
      );
    case "ginger":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path
            d="M10 28 C8 20 16 16 22 20 C26 12 38 14 38 24 C44 26 42 36 34 36 C32 42 20 42 18 34 C10 36 8 32 10 28 Z"
            fill="#e8c79a"
          />
          <path d="M20 22 l3 3 M30 22 l3 2 M26 30 l3 2" stroke="#c99a5e" strokeWidth="1.6" />
        </svg>
      );
    case "cardamom":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <ellipse cx="24" cy="24" rx="10" ry="16" fill="#8fbf98" />
          <path d="M24 9 L24 39" stroke="#2e693d" strokeWidth="1.6" />
          <path d="M24 9 C20 14 20 34 24 39 C28 34 28 14 24 9" fill="#6aa876" opacity="0.6" />
        </svg>
      );
    case "cinnamon":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="14" y="8" width="8" height="32" rx="4" fill="#9a4a26" transform="rotate(12 18 24)" />
          <rect x="24" y="8" width="8" height="32" rx="4" fill="#b05a30" transform="rotate(-10 28 24)" />
        </svg>
      );
    default: // seeds / peppercorns
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <g fill="#4a2a17">
            <circle cx="16" cy="18" r="5" />
            <circle cx="30" cy="14" r="4.2" />
            <circle cx="24" cy="30" r="5.4" />
            <circle cx="34" cy="28" r="3.6" />
          </g>
        </svg>
      );
  }
}

/* ---------- Serrated sachet edge ---------- */
function Crimp({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      className={`block h-[2.2cqw] w-full ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <polygon
        points="0,0 100,0 100,1.2 97,4 94,1.2 91,4 88,1.2 85,4 82,1.2 79,4 76,1.2 73,4 70,1.2 67,4 64,1.2 61,4 58,1.2 55,4 52,1.2 49,4 46,1.2 43,4 40,1.2 37,4 34,1.2 31,4 28,1.2 25,4 22,1.2 19,4 16,1.2 13,4 10,1.2 7,4 4,1.2 1,4 0,1.2"
        fill={color}
      />
    </svg>
  );
}

/* ---------- The designed individual sachet ---------- */
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
        className="relative h-full w-full overflow-hidden rounded-[3cqw] shadow-[0_14px_34px_-12px_rgba(120,46,20,0.55)] ring-1 ring-black/5"
        style={{ containerType: "inline-size" }}
      >
        {/* top crimp */}
        <Crimp color="#ffecd6" />

        <div className="flex h-[calc(100%-4.4cqw)] flex-col bg-cream-100">
          {/* Brand band */}
          <div className="flex items-center gap-[3cqw] px-[6cqw] pt-[4cqw]">
            <span className="inline-flex rounded-[2.5cqw] bg-white p-[1.8cqw] shadow-sm ring-1 ring-black/5">
              <Image
                src="/images/logo.jpg"
                alt={`${site.name} logo`}
                width={120}
                height={120}
                priority={priority}
                className="h-[11cqw] w-[11cqw] object-contain"
              />
            </span>
            <span className="font-display text-[10cqw] font-bold leading-none tracking-tight text-herbal-800">
              Kadha<span className="text-spice-600">Plus</span>
            </span>
          </div>

          {/* green ribbon */}
          <div className="mx-[6cqw] mt-[3.5cqw] rounded-full bg-herbal-700 py-[1.8cqw] text-center">
            <span className="text-[4.3cqw] font-semibold uppercase tracking-[0.18em] text-cream-100">
              Instant Herbal Kadha Granules
            </span>
          </div>

          {/* hero cup area */}
          <div className="relative mt-[2cqw] flex-1 overflow-hidden bg-gradient-to-b from-spice-400 via-spice-500 to-spice-600">
            {/* cream burst */}
            <div className="absolute left-1/2 top-[6cqw] h-[52cqw] w-[52cqw] -translate-x-1/2 rounded-full bg-cream-100/90 blur-[1cqw]" />
            <div className="absolute left-1/2 top-[8cqw] h-[48cqw] w-[48cqw] -translate-x-1/2 rounded-full border-[0.8cqw] border-dashed border-white/40" />
            <KadhaCup className="absolute left-1/2 top-[7cqw] h-[48cqw] w-[48cqw] -translate-x-1/2" />

            {/* scattered herbs */}
            <Herb type="leaf" className="absolute left-[7cqw] top-[10cqw] h-[13cqw] w-[13cqw] -rotate-12 drop-shadow" />
            <Herb type="anise" className="absolute right-[7cqw] top-[8cqw] h-[12cqw] w-[12cqw] rotate-12 drop-shadow" />
            <Herb type="ginger" className="absolute left-[9cqw] bottom-[20cqw] h-[13cqw] w-[13cqw] drop-shadow" />
            <Herb type="cardamom" className="absolute right-[8cqw] bottom-[22cqw] h-[11cqw] w-[11cqw] drop-shadow" />
            <Herb type="seeds" className="absolute right-[20cqw] bottom-[15cqw] h-[9cqw] w-[9cqw] opacity-90" />

            {/* product name */}
            <div className="absolute inset-x-0 bottom-[6cqw] text-center">
              <p className="font-display text-[13cqw] font-bold leading-none text-white drop-shadow-[0_2px_2px_rgba(120,46,20,0.5)]">
                CLASSIC
              </p>
              <p className="font-display text-[8.5cqw] font-semibold leading-tight text-cream-100">
                KADHA
              </p>
            </div>
          </div>

          {/* tagline strip */}
          <div className="bg-herbal-800 py-[1.8cqw] text-center">
            <span className="text-[3.9cqw] font-medium italic tracking-wide text-cream-100">
              {site.product.packagingTagline}
            </span>
          </div>

          {/* bottom info */}
          {detail && (
            <div className="flex items-end justify-between bg-cream-100 px-[6cqw] py-[3cqw]">
              <div className="leading-tight">
                <p className="text-[3.4cqw] font-semibold text-herbal-800">
                  Net Wt. [__] g
                </p>
                <p className="text-[2.7cqw] text-ink-muted">Mfg/Mktd by [__]</p>
                <p className="text-[2.7cqw] text-ink-muted">Lic/FSSAI: [__]</p>
              </div>
              {/* mini barcode */}
              <div className="flex h-[9cqw] items-end gap-[0.6cqw]">
                {[3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 1, 2].map((w, i) => (
                  <span
                    key={i}
                    className="block h-full bg-herbal-900"
                    style={{ width: `${w * 0.7}cqw` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* bottom crimp */}
        <Crimp color="#ffecd6" flip />
      </div>
    </div>
  );
}

/* A simplified sachet strip for the mini sachets shown inside the box */
export function MiniSachet({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2px] bg-cream-100 shadow-md ring-1 ring-black/10 ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <div className="flex h-full flex-col">
        <div className="h-[18%] bg-herbal-700" />
        <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-spice-400 to-spice-600">
          <span className="font-display text-[20cqw] font-bold text-white">K+</span>
        </div>
        <div className="h-[14%] bg-herbal-800" />
      </div>
    </div>
  );
}
