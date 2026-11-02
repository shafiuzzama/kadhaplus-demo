"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";
import { rupees } from "@/lib/money";
import PageHeader from "@/components/ui/PageHeader";

export default function CartPage() {
  const { cart, setQty, removeItem, loadingCart } = useStore();

  return (
    <>
      <PageHeader eyebrow="Your Cart" title="Shopping Cart" />
      <section className="section">
        <div className="container-px">
          {cart.items.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-herbal-100 bg-white p-12 text-center shadow-card">
              <ShoppingBag className="h-12 w-12 text-herbal-200" />
              <p className="text-ink-soft">
                {loadingCart ? "Loading your cart…" : "Your cart is empty."}
              </p>
              <Link href="/product" className="btn-primary">
                Shop KadhaPlus
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {cart.items.map((it) => (
                  <div
                    key={it.id}
                    className="flex gap-4 rounded-2xl border border-herbal-100 bg-white p-4"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-mint-100 font-display text-2xl text-herbal-700">
                      K+
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-herbal-900">{it.name}</p>
                          <p className="text-sm text-ink-muted">{it.variantName}</p>
                        </div>
                        <button
                          onClick={() => removeItem(it.id)}
                          aria-label="Remove"
                          className="text-ink-muted hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-xl border border-herbal-200 p-1">
                          <button
                            onClick={() => setQty(it.id, it.quantity - 1)}
                            aria-label="Decrease"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg hover:bg-herbal-50"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {it.quantity}
                          </span>
                          <button
                            onClick={() => setQty(it.id, it.quantity + 1)}
                            aria-label="Increase"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg hover:bg-herbal-50"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-bold text-herbal-900">
                          {rupees(it.lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="h-fit rounded-3xl border border-herbal-100 bg-white p-6 shadow-card">
                <h2 className="font-display text-2xl tracking-wide text-herbal-900">
                  Order Summary
                </h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-semibold">{rupees(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Shipping</span>
                    <span className="text-ink-muted">
                      {cart.subtotal >= 49900 ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                </div>
                <div className="my-4 h-px bg-herbal-100" />
                <div className="flex justify-between">
                  <span className="font-semibold text-herbal-900">Total</span>
                  <span className="text-xl font-bold text-herbal-900">
                    {rupees(cart.subtotal)}
                  </span>
                </div>
                <Link href="/checkout" className="btn-primary mt-6 w-full">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/product" className="btn-ghost mt-2 w-full">
                  Continue shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
