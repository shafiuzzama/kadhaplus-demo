import { Leaf } from "lucide-react";

// Seamless scrolling values ticker (deep-green band).
export default function Marquee({ items }: { items: string[] }) {
  const Group = () => (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-12">
          <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.22em] text-cream-100/90">
            {t}
          </span>
          <Leaf className="h-4 w-4 shrink-0 text-brass-400" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden bg-herbal-900 py-5">
      <div className="flex w-max animate-marquee">
        <Group />
        <Group />
      </div>
    </div>
  );
}
