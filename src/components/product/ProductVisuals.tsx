import Image from "next/image";
import { site } from "@/lib/site";
import { SachetArt, Emblem, Sprig } from "./PackArt";

export { SachetArt } from "./PackArt";

/* ============================================================================
   Premium product visuals: box faces (front / side / back / top), a refined
   3D box mockup, the standing sachet, the 5-sachet fan and the hero scene.
   ========================================================================== */

function Rule({ w = "40cqw" }: { w?: string }) {
  return (
    <div className="flex items-center justify-center gap-[2cqw]" style={{ width: w }}>
      <span className="h-px flex-1 bg-brass-400" />
      <span className="h-[1.4cqw] w-[1.4cqw] rotate-45 bg-brass-500" />
      <span className="h-px flex-1 bg-brass-400" />
    </div>
  );
}

/* ---------------- Box: FRONT face ---------------- */
export function BoxFront({ priority = false }: { priority?: boolean }) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[2cqw] bg-cream-50 px-[10cqw] pb-[7cqw] pt-[9cqw] text-center"
      style={{ containerType: "inline-size" }}
    >
      <div className="absolute inset-x-0 top-0 h-[2.4cqw] bg-clay-500" />
      <div className="absolute inset-x-0 bottom-0 h-[6cqw] bg-herbal-900" />
      <div className="pointer-events-none absolute inset-[4cqw] rounded-[1.5cqw] border border-brass-400/70" />
      <div className="pointer-events-none absolute inset-[5.4cqw] rounded-[1.2cqw] border border-herbal-900/10" />

      <Image
        src="/images/logo.jpg"
        alt={`${site.name} logo`}
        width={300}
        height={100}
        priority={priority}
        className="relative h-[9cqw] w-auto object-contain"
      />
      <div className="relative mt-[3.5cqw]">
        <Rule w="34cqw" />
      </div>
      <p className="relative mt-[3.5cqw] text-[3cqw] font-semibold uppercase tracking-[0.3em] text-herbal-700">
        Instant Herbal Kadha Granules
      </p>

      <Emblem className="relative mt-[5cqw] w-[36cqw]" />

      <p className="relative mt-[5cqw] font-serif text-[15cqw] font-semibold leading-[0.85] tracking-tight text-herbal-900">
        Classic
      </p>
      <p className="relative mt-[1.5cqw] font-serif text-[6.5cqw] font-medium uppercase tracking-[0.4em] text-clay-500">
        Kadha
      </p>

      <div className="relative mt-auto flex flex-col items-center">
        <Rule w="30cqw" />
        <p className="mt-[3cqw] text-[3cqw] font-semibold uppercase tracking-[0.3em] text-brass-600">
          Pack of 5 Sachets
        </p>
      </div>
    </div>
  );
}

/* ---------------- Box: SIDE panel ---------------- */
export function BoxSidePanel() {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-cream-100 py-[8cqw]"
      style={{ containerType: "inline-size" }}
    >
      <div className="absolute inset-x-0 top-0 h-[4cqw] bg-clay-500" />
      <div className="absolute inset-x-0 bottom-0 h-[4cqw] bg-herbal-900" />
      <Emblem className="w-[40cqw]" />
      <p
        className="font-serif text-[11cqw] font-medium uppercase tracking-[0.3em] text-herbal-900"
        style={{ writingMode: "vertical-rl" }}
      >
        Classic&nbsp;Kadha
      </p>
      <Sprig className="h-[16cqw] w-[16cqw] text-brass-500" />
    </div>
  );
}

/* ---------------- Box: TOP panel ---------------- */
export function BoxTopPanel() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-cream-100"
      style={{ containerType: "inline-size" }}
    >
      <div className="absolute inset-x-0 top-0 h-[10%] bg-herbal-900" />
      <Image
        src="/images/logo.jpg"
        alt=""
        width={300}
        height={100}
        className="h-[9cqw] w-auto object-contain"
      />
    </div>
  );
}

/* ---------------- Box: BACK panel ---------------- */
export function BoxBackPanel() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2cqw] bg-cream-50 px-[8cqw] py-[8cqw]"
      style={{ containerType: "inline-size" }}
    >
      <div className="absolute inset-x-0 top-0 h-[2.4cqw] bg-clay-500" />
      <div className="flex items-center justify-center">
        <Image src="/images/logo.jpg" alt="" width={300} height={100} className="h-[7cqw] w-auto object-contain" />
      </div>

      <div className="mt-[5cqw]">
        <p className="text-[3.4cqw] font-semibold uppercase tracking-[0.2em] text-herbal-800">
          How to Prepare
        </p>
        <div className="mt-[1.5cqw] h-px w-[20cqw] bg-brass-400" />
        <p className="mt-[2cqw] text-[3cqw] leading-relaxed text-ink-soft">
          Empty one sachet into a cup. Prepare as directed on pack. Stir well and
          enjoy warm.
        </p>
      </div>

      <div className="mt-[5cqw]">
        <p className="text-[3.4cqw] font-semibold uppercase tracking-[0.2em] text-herbal-800">
          Ingredients
        </p>
        <div className="mt-[1.5cqw] h-px w-[20cqw] bg-brass-400" />
        <p className="mt-[2cqw] text-[3cqw] leading-relaxed text-ink-muted">
          [Full verified ingredient list from approved formulation]
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between pt-[4cqw]">
        <div className="text-[2.7cqw] leading-tight text-ink-muted">
          <p>Net Wt. [__] g</p>
          <p>Mfg/Mktd by [__]</p>
          <p>Lic/FSSAI No.: [__]</p>
          <p>Batch/Exp: [__]</p>
        </div>
        <div className="flex h-[11cqw] items-end gap-[0.7cqw]">
          {[3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2].map((w, i) => (
            <span key={i} className="block h-full bg-herbal-900" style={{ width: `${w * 0.7}cqw` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Refined 3D box mockup ---------------- */
export function ProductBox3D({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`[perspective:1800px] ${className}`}>
      <div className="relative aspect-[4/5] [transform-style:preserve-3d] [transform:rotateX(4deg)_rotateY(-17deg)]">
        {/* top */}
        <div className="absolute left-0 top-0 h-[20%] w-full origin-top overflow-hidden rounded-t-[4px] [transform:rotateX(90deg)]">
          <div className="h-full w-full [transform:rotate(180deg)]">
            <BoxTopPanel />
          </div>
        </div>
        {/* right side */}
        <div className="absolute right-0 top-0 h-full w-[22%] origin-right overflow-hidden [transform:rotateY(90deg)]">
          <BoxSidePanel />
        </div>
        {/* front */}
        <div className="relative h-full w-full overflow-hidden rounded-[6px] shadow-[0_50px_90px_-35px_rgba(22,45,25,0.55)] ring-1 ring-black/5">
          <BoxFront priority={priority} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-black/10 to-transparent" />
        </div>
        {/* floor shadow */}
        <div className="absolute -bottom-6 left-1/2 h-8 w-[76%] -translate-x-1/2 rounded-[100%] bg-herbal-950/20 blur-xl [transform:translateZ(-30px)]" />
      </div>
    </div>
  );
}

/* ---------------- Standing sachet ---------------- */
export function SachetStanding({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`[perspective:1400px] ${className}`}>
      <div className="relative aspect-[1/3.3] [transform:rotateY(-10deg)_rotateX(2deg)]">
        <SachetArt className="h-full w-full" priority={priority} />
        <div className="pointer-events-none absolute inset-0 rounded-[2.5cqw] bg-gradient-to-l from-black/10 via-transparent to-white/10" />
        <div className="absolute -bottom-4 left-1/2 h-5 w-[78%] -translate-x-1/2 rounded-[100%] bg-herbal-950/20 blur-lg" />
      </div>
    </div>
  );
}

/* ---------------- 5 sachets fanned ---------------- */
export function SachetFan({ className = "" }: { className?: string }) {
  const rotations = [-16, -8, 0, 8, 16];
  const offsets = [42, 15, 0, 15, 42];
  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="-mx-[3%] w-[22%] max-w-[130px] transition-transform duration-500 hover:-translate-y-3"
          style={{
            transform: `rotate(${rotations[i]}deg) translateY(${offsets[i]}px)`,
            zIndex: 10 - Math.abs(i - 2),
          }}
        >
          <SachetArt className="aspect-[1/3.3]" detail={false} />
        </div>
      ))}
    </div>
  );
}

/* ---------------- Hero composition ---------------- */
export function HeroComposition() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* soft ambient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-100/80 blur-3xl" />
        <div className="absolute bottom-6 left-6 h-40 w-40 rounded-full bg-leaf-100/50 blur-3xl" />
      </div>

      {/* subtle botanical accents */}
      <Sprig className="absolute -left-2 top-2 h-12 w-12 -rotate-12 text-brass-300/70" />
      <Sprig className="absolute -right-1 bottom-6 h-10 w-10 rotate-[200deg] text-brass-300/70" />

      {/* box */}
      <div className="relative ml-[8%] w-[70%] animate-float">
        <ProductBox3D priority />
      </div>

      {/* standing sachet, leaning in front-left */}
      <div className="absolute -left-1 bottom-0 w-[23%] sm:left-2">
        <SachetStanding priority />
      </div>

      {/* one sachet resting, lower-right */}
      <div className="absolute bottom-3 right-2 w-[19%] rotate-[18deg] origin-bottom">
        <SachetArt className="aspect-[1/3.3]" detail={false} />
      </div>
    </div>
  );
}

/* Back-compat exports */
export const ProductBox = ProductBox3D;
export function Sachet({ className = "" }: { src?: string; className?: string }) {
  return <SachetArt className={className} detail={false} />;
}
