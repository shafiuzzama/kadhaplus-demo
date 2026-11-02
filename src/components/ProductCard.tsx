import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

// Vedistry-style product card: tag pill, product visual on a soft panel,
// title, short description, bold price and a full-width CTA button.
export default function ProductCard({
  tag,
  title,
  desc,
  price,
  note = "MRP incl. of all taxes",
  href = "/product",
  cta = "View Product",
  featured = false,
  delay = 0,
  children,
}: {
  tag?: string;
  title: string;
  desc: string;
  price: string;
  note?: string;
  href?: string;
  cta?: string;
  featured?: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${
          featured ? "border-herbal-600 ring-1 ring-herbal-600" : "border-herbal-100"
        }`}
      >
        <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-b from-cream-50 to-mint-100 p-6">
          {tag && (
            <span className="absolute left-4 top-4 rounded-md bg-herbal-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream-50">
              {tag}
            </span>
          )}
          {children}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-sans text-base font-semibold text-herbal-900">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{desc}</p>
          <div className="mt-3">
            <span className="text-xl font-bold text-herbal-900">{price}</span>
            <span className="ml-2 text-xs text-ink-muted">{note}</span>
          </div>
          <Link
            href={href}
            className="btn mt-4 w-full bg-herbal-600 text-white hover:bg-herbal-700"
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
