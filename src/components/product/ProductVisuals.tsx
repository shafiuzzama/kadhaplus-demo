import Image from "next/image";
import { site } from "@/lib/site";
import { KadhaCup, Herb, SachetArt, MiniSachet } from "./PackArt";

export { SachetArt } from "./PackArt";

/* ============================================================================
   Product visuals built on the original KadhaPlus packaging design (PackArt).
   Box faces (front / side / back / top), a realistic CSS 3D box mockup, the
   standing sachet, the 5-sachet fan and the hero composition.
   ========================================================================== */

/* ---------------- Box: FRONT face (full designed artwork) --------------- */
export function BoxFront({ priority = false }: { priority?: boolean }) {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5cqw] bg-cream-100"
      style={{ containerType: "inline-size" }}
    >
      {/* brand header */}
      <div className="flex items-center gap-[3cqw] px-[7cqw] pt-[6cqw]">
        <span className="inline-flex rounded-[2.2cqw] bg-white p-[1.6cqw] shadow-sm ring-1 ring-black/5">
          <Image
            src="/images/logo.jpg"
            alt={`${site.name} logo`}
            width={140}
            height={140}
            priority={priority}
            className="h-[12cqw] w-[12cqw] object-contain"
          />
        </span>
        <div className="leading-none">
          <p className="font-display text-[11cqw] font-bold tracking-tight text-herbal-800">
            Kadha<span className="text-spice-600">Plus</span>
          </p>
          <p className="mt-[1cqw] text-[3.2cqw] font-semibold uppercase tracking-[0.2em] text-spice-600">
            Herbal Wellness
          </p>
        </div>
      </div>

      {/* ribbon */}
      <div className="mx-[7cqw] mt-[4cqw] rounded-full bg-herbal-700 py-[2cqw] text-center">
        <span className="text-[4cqw] font-semibold uppercase tracking-[0.16em] text-cream-100">
          Instant Herbal Kadha Granules
        </span>
      </div>

      {/* hero cup */}
      <div className="relative mt-[3cqw] flex-1 overflow-hidden">
        <div className="absolute inset-x-[5cqw] bottom-0 top-0 rounded-t-[30cqw] bg-gradient-to-b from-spice-400 via-spice-500 to-spice-600" />
        <div className="absolute left-1/2 top-[7cqw] h-[46cqw] w-[46cqw] -translate-x-1/2 rounded-full bg-cream-100/90" />
        <div className="absolute left-1/2 top-[9cqw] h-[42cqw] w-[42cqw] -translate-x-1/2 rounded-full border-[0.7cqw] border-dashed border-white/50" />
        <KadhaCup className="absolute left-1/2 top-[8cqw] h-[42cqw] w-[42cqw] -translate-x-1/2" />

        <Herb type="leaf" className="absolute left-[8cqw] top-[8cqw] h-[13cqw] w-[13cqw] -rotate-12 drop-shadow" />
        <Herb type="anise" className="absolute right-[8cqw] top-[6cqw] h-[12cqw] w-[12cqw] rotate-12 drop-shadow" />
        <Herb type="ginger" className="absolute left-[11cqw] top-[40cqw] h-[13cqw] w-[13cqw] drop-shadow" />
        <Herb type="cardamom" className="absolute right-[10cqw] top-[42cqw] h-[11cqw] w-[11cqw] drop-shadow" />

        <div className="absolute inset-x-0 bottom-[12cqw] text-center">
          <p className="font-display text-[15cqw] font-bold leading-none text-white drop-shadow-[0_2px_2px_rgba(120,46,20,0.5)]">
            CLASSIC
          </p>
          <p className="font-display text-[9cqw] font-semibold text-cream-100">KADHA</p>
        </div>

        {/* pack badge */}
        <div className="absolute bottom-[3cqw] left-1/2 -translate-x-1/2 rounded-full bg-white px-[5cqw] py-[1.6cqw] shadow-md">
          <span className="text-[4cqw] font-bold uppercase tracking-wide text-herbal-800">
            Pack of 5 Sachets
          </span>
        </div>
      </div>

      {/* tagline */}
      <div className="bg-herbal-800 py-[2.2cqw] text-center">
        <span className="text-[3.8cqw] font-medium italic tracking-wide text-cream-100">
          {site.product.packagingTagline}
        </span>
      </div>
    </div>
  );
}

/* ---------------- Box: SIDE panel ---------------- */
export function BoxSidePanel() {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-spice-500 to-spice-700 py-[8cqw]"
      style={{ containerType: "inline-size" }}
    >
      <span className="inline-flex rounded-[3cqw] bg-white p-[2.5cqw] shadow">
        <Image src="/images/logo.jpg" alt="" width={120} height={120} className="h-[18cqw] w-[18cqw] object-contain" />
      </span>
      <p
        className="font-display text-[12cqw] font-bold uppercase tracking-[0.25em] text-white"
        style={{ writingMode: "vertical-rl" }}
      >
        Classic Kadha
      </p>
      <Herb type="leaf" className="h-[16cqw] w-[16cqw]" />
    </div>
  );
}

/* ---------------- Box: TOP panel ---------------- */
export function BoxTopPanel() {
  return (
    <div
      className="flex h-full w-full items-center justify-center gap-[3cqw] bg-herbal-800"
      style={{ containerType: "inline-size" }}
    >
      <span className="inline-flex rounded-[2cqw] bg-white p-[1.4cqw]">
        <Image src="/images/logo.jpg" alt="" width={100} height={100} className="h-[9cqw] w-[9cqw] object-contain" />
      </span>
      <span className="font-display text-[9cqw] font-bold text-cream-100">
        Kadha<span className="text-spice-400">Plus</span>
      </span>
    </div>
  );
}

/* ---------------- Box: BACK panel (info) ---------------- */
export function BoxBackPanel() {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-[2.5cqw] bg-cream-100 p-[7cqw]"
      style={{ containerType: "inline-size" }}
    >
      <p className="font-display text-[8cqw] font-bold text-herbal-800">
        Kadha<span className="text-spice-600">Plus</span> · Classic Kadha
      </p>
      <p className="mt-[1cqw] text-[3.4cqw] font-semibold uppercase tracking-widest text-spice-600">
        Instant Herbal Kadha Granules
      </p>

      <div className="mt-[4cqw] rounded-[2cqw] bg-white p-[3cqw] ring-1 ring-herbal-100">
        <p className="text-[3.6cqw] font-bold uppercase tracking-wide text-herbal-800">
          How to Prepare
        </p>
        <p className="mt-[1.5cqw] text-[3.2cqw] leading-snug text-ink-soft">
          Empty one sachet into a cup. Prepare as per directions on pack. Stir
          well and enjoy warm.
        </p>
      </div>

      <div className="mt-[3cqw] rounded-[2cqw] bg-white p-[3cqw] ring-1 ring-herbal-100">
        <p className="text-[3.6cqw] font-bold uppercase tracking-wide text-herbal-800">
          Ingredients
        </p>
        <p className="mt-[1.5cqw] text-[3.2cqw] leading-snug text-ink-muted">
          [Full verified ingredient list to be printed from approved formulation]
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between pt-[3cqw]">
        <div className="text-[2.9cqw] leading-tight text-ink-muted">
          <p className="font-semibold text-herbal-800">Net Wt. [__] g</p>
          <p>Mfg/Mktd by [__]</p>
          <p>Lic/FSSAI No.: [__]</p>
          <p>Batch/Exp: [__]</p>
        </div>
        <div className="flex h-[12cqw] items-end gap-[0.7cqw]">
          {[3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 2].map((w, i) => (
            <span key={i} className="block h-full bg-herbal-900" style={{ width: `${w * 0.7}cqw` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Realistic 3D box mockup ---------------- */
export function ProductBox3D({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`[perspective:1500px] ${className}`}>
      <div className="relative aspect-[4/5] [transform-style:preserve-3d] [transform:rotateX(6deg)_rotateY(-24deg)]">
        {/* top face */}
        <div className="absolute left-0 top-0 h-[22%] w-full origin-top overflow-hidden rounded-t-[6px] [transform:rotateX(90deg)]">
          <div className="h-full w-full [transform:rotate(180deg)]">
            <BoxTopPanel />
          </div>
        </div>
        {/* right side face */}
        <div className="absolute right-0 top-0 h-full w-[24%] origin-right overflow-hidden rounded-r-[6px] [transform:rotateY(90deg)]">
          <BoxSidePanel />
        </div>
        {/* front face */}
        <div className="relative h-full w-full overflow-hidden rounded-[8px] shadow-[0_44px_80px_-32px_rgba(120,46,20,0.6)] ring-1 ring-black/10">
          <BoxFront priority={priority} />
          {/* sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-black/15 to-transparent" />
        </div>
        {/* floor shadow */}
        <div className="absolute -bottom-7 left-1/2 h-9 w-[82%] -translate-x-1/2 rounded-[100%] bg-clay-700/25 blur-xl [transform:translateZ(-40px)]" />
      </div>
    </div>
  );
}

/* ---------------- Standing sachet (slight 3D) ---------------- */
export function SachetStanding({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`[perspective:1200px] ${className}`}>
      <div className="relative aspect-[1/3.3] [transform:rotateY(-14deg)_rotateX(3deg)]">
        <SachetArt className="h-full w-full" priority={priority} />
        <div className="pointer-events-none absolute inset-0 rounded-[3cqw] bg-gradient-to-l from-black/15 via-transparent to-white/10" />
        <div className="absolute -bottom-5 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-[100%] bg-clay-700/25 blur-lg" />
      </div>
    </div>
  );
}

/* ---------------- 5 sachets fanned ---------------- */
export function SachetFan({ className = "" }: { className?: string }) {
  const rotations = [-18, -9, 0, 9, 18];
  const offsets = [46, 16, 0, 16, 46];
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
    <div className="relative mx-auto w-full max-w-lg">
      {/* ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-6 top-6 h-64 w-64 rounded-full bg-spice-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-leaf-200/50 blur-3xl" />
      </div>

      {/* scattered herbs */}
      <Herb type="leaf" className="absolute -left-2 top-4 h-10 w-10 -rotate-12 opacity-80 sm:h-12 sm:w-12" />
      <Herb type="anise" className="absolute right-2 top-0 h-9 w-9 rotate-12 opacity-80" />
      <Herb type="cinnamon" className="absolute -left-3 bottom-24 h-10 w-10 opacity-80" />

      {/* main box */}
      <div className="relative ml-4 w-[72%] animate-float sm:ml-10">
        <ProductBox3D priority />
      </div>

      {/* standing sachet */}
      <div className="absolute -left-2 bottom-0 w-[26%] sm:left-0">
        <SachetStanding priority />
      </div>

      {/* two resting sachets */}
      <div className="absolute bottom-2 right-0 w-[20%] rotate-[14deg] origin-bottom">
        <SachetArt className="aspect-[1/3.3]" detail={false} />
      </div>
      <div className="absolute bottom-6 right-10 w-[17%] rotate-[26deg] origin-bottom opacity-95">
        <SachetArt className="aspect-[1/3.3]" detail={false} />
      </div>

      {/* cup of kadha */}
      <div className="absolute -bottom-2 left-[34%] h-24 w-24 sm:h-28 sm:w-28">
        <div className="absolute inset-0 rounded-full bg-cream-100 shadow-soft" />
        <KadhaCup className="absolute inset-0 h-full w-full p-3" />
      </div>

      {/* price badge */}
      <div className="absolute -right-1 top-2 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-spice-500 text-white shadow-glow ring-4 ring-cream-50 sm:h-24 sm:w-24">
        <span className="text-[10px] font-medium uppercase tracking-wide opacity-90">
          Pack of 5
        </span>
        <span className="text-xl font-bold leading-none sm:text-2xl">
          {site.product.priceLabel}
        </span>
        <span className="text-[10px] opacity-90">{site.product.sachetPriceLabel}/sachet</span>
      </div>
    </div>
  );
}

/* Back-compat exports used elsewhere */
export const ProductBox = ProductBox3D;
export function Sachet({ className = "" }: { src?: string; className?: string }) {
  return <SachetArt className={className} detail={false} />;
}
