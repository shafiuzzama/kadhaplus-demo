import { Leaf } from "lucide-react";

// Slim announcement bar (Vedistry-style). Brand message only — no fabricated
// discount codes or shipping claims.
export default function PromoBar() {
  return (
    <div className="bg-herbal-800 text-cream-50">
      <div className="container-px flex h-9 items-center justify-center gap-2 text-center text-[11px] font-medium tracking-[0.12em] sm:text-xs">
        <Leaf className="h-3.5 w-3.5 text-leaf-300" />
        <span className="uppercase">
          Traditional Kadha, reimagined — now in convenient instant sachets
        </span>
      </div>
    </div>
  );
}
