"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useStore } from "./StoreProvider";
import { rupees } from "@/lib/money";

export type BuyVariant = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  stock: number;
  sachets: number;
  isDefault: boolean;
};

export default function BuyBox({ variants }: { variants: BuyVariant[] }) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [selectedId, setSelectedId] = useState(
    (variants.find((v) => v.isDefault) ?? variants[0])?.id,
  );
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState<null | "cart" | "buy">(null);

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];
  const inStock = selected && selected.stock > 0;
  const save = selected ? selected.mrp - selected.price : 0;

  async function handleAdd() {
    if (!inStock) return;
    setBusy("cart");
    await addToCart(selected.id, qty, true);
    setBusy(null);
  }
  async function handleBuyNow() {
    if (!inStock) return;
    setBusy("buy");
    await addToCart(selected.id, qty, false);
    router.push("/checkout");
  }

  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(20,45,30,0.3)] sm:p-7">
      {/* variant options */}
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Choose your pack
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {variants.map((v) => {
          const active = v.id === selectedId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedId(v.id)}
              className={`relative rounded-lg border p-4 text-left transition-all ${
                active
                  ? "border-herbal-800 bg-herbal-50/60"
                  : "border-black/10 hover:border-herbal-400"
              }`}
            >
              {active && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-herbal-800 text-white">
                  <Check className="h-3 w-3" />
                </span>
              )}
              <p className="text-sm font-semibold text-herbal-900">{v.name}</p>
              <p className="mt-1 text-xs text-ink-muted">
                {v.sachets} sachet{v.sachets > 1 ? "s" : ""}
              </p>
              <p className="mt-2">
                <span className="text-lg font-bold text-herbal-900">
                  {rupees(v.price)}
                </span>
                {v.mrp > v.price && (
                  <span className="ml-2 text-xs text-ink-muted line-through">
                    {rupees(v.mrp)}
                  </span>
                )}
              </p>
            </button>
          );
        })}
      </div>

      {/* price + quantity */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-herbal-900">
              {rupees(selected.price * qty)}
            </span>
            {save > 0 && (
              <span className="rounded-full bg-leaf-100 px-2 py-0.5 text-xs font-semibold text-herbal-700">
                Save {rupees(save * qty)}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-muted">Inclusive of all taxes</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-black/10 p-1">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-herbal-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center font-semibold">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(selected.stock || 10, q + 1))}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-herbal-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          disabled={!inStock || busy !== null}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-herbal-800 px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-herbal-900 disabled:opacity-50"
        >
          <ShoppingBag className="h-[18px] w-[18px]" />
          {busy === "cart" ? "Adding…" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!inStock || busy !== null}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#122b47] disabled:opacity-50"
        >
          {busy === "buy" ? "…" : "Buy Now"}
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted">
        {inStock ? (
          <>In stock · Free delivery over ₹499</>
        ) : (
          <span className="text-red-600">Currently out of stock</span>
        )}
      </p>
    </div>
  );
}
