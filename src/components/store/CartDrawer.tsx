"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "./StoreProvider";
import { rupees } from "@/lib/money";

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, cart, setQty, removeItem } = useStore();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-herbal-100 px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-2xl tracking-wide text-herbal-900">
                <ShoppingBag className="h-5 w-5" /> Your Cart
              </h2>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-herbal-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-herbal-200" />
                <p className="text-ink-soft">Your cart is empty.</p>
                <Link href="/product" className="btn-primary" onClick={closeDrawer}>
                  Shop KadhaPlus
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {cart.items.map((it) => (
                    <div
                      key={it.id}
                      className="flex gap-4 rounded-2xl border border-herbal-100 bg-white p-3"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-mint-100 font-display text-xl text-herbal-700">
                        K+
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-semibold text-herbal-900">
                          {it.name}
                        </p>
                        <p className="text-xs text-ink-muted">{it.variantName}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQty(it.id, it.quantity - 1)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-herbal-200 hover:bg-herbal-50"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {it.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQty(it.id, it.quantity + 1)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-herbal-200 hover:bg-herbal-50"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-herbal-900">
                            {rupees(it.lineTotal)}
                          </span>
                        </div>
                      </div>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(it.id)}
                        className="self-start text-ink-muted hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-herbal-100 p-5">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="text-lg font-bold text-herbal-900">
                      {rupees(cart.subtotal)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-ink-muted">
                    Shipping calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="btn-primary w-full"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="btn-ghost mt-2 w-full"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
