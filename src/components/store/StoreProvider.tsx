"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCT_NAME, variantById } from "@/lib/catalog";

export type CartItem = {
  id: string;
  variantId: string;
  quantity: number;
  name: string;
  variantName: string;
  price: number;
  mrp: number;
  sachets: number;
  stock: number;
  lineTotal: number;
};
export type Cart = { items: CartItem[]; subtotal: number; count: number };

type StoreValue = {
  cart: Cart;
  loadingCart: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (variantId: string, quantity?: number, openDrawer?: boolean) => void;
  setQty: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

const Ctx = createContext<StoreValue | null>(null);
const EMPTY: Cart = { items: [], subtotal: 0, count: 0 };
const STORAGE_KEY = "kp_cart_v1";

/** A stored cart line — just a variant id + quantity. Everything else (name,
 *  price, totals) is derived from the static catalog so it can never go stale. */
type Line = { variantId: string; quantity: number };

function buildCart(lines: Line[]): Cart {
  const items: CartItem[] = [];
  for (const l of lines) {
    const v = variantById(l.variantId);
    if (!v) continue;
    const quantity = Math.max(1, Math.min(l.quantity, v.stock || 99));
    items.push({
      id: v.id,
      variantId: v.id,
      quantity,
      name: PRODUCT_NAME,
      variantName: v.name,
      price: v.price,
      mrp: v.mrp,
      sachets: v.sachets,
      stock: v.stock,
      lineTotal: v.price * quantity,
    });
  }
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return { items, subtotal, count };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hydrate the cart from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed
              .filter((l) => l && typeof l.variantId === "string")
              .map((l) => ({ variantId: l.variantId, quantity: Number(l.quantity) || 1 })),
          );
        }
      }
    } catch {
      /* ignore corrupt / unavailable storage */
    }
    setLoadingCart(false);
  }, []);

  const update = useCallback((fn: (prev: Line[]) => Line[]) => {
    setLines((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const addToCart = useCallback(
    (variantId: string, quantity = 1, open = true) => {
      update((prev) => {
        const existing = prev.find((l) => l.variantId === variantId);
        return existing
          ? prev.map((l) =>
              l.variantId === variantId
                ? { ...l, quantity: l.quantity + quantity }
                : l,
            )
          : [...prev, { variantId, quantity }];
      });
      if (open) setDrawerOpen(true);
    },
    [update],
  );

  const setQty = useCallback(
    (itemId: string, quantity: number) => {
      update((prev) =>
        quantity <= 0
          ? prev.filter((l) => l.variantId !== itemId)
          : prev.map((l) =>
              l.variantId === itemId ? { ...l, quantity } : l,
            ),
      );
    },
    [update],
  );

  const removeItem = useCallback(
    (itemId: string) => update((prev) => prev.filter((l) => l.variantId !== itemId)),
    [update],
  );

  const clearCart = useCallback(() => update(() => []), [update]);

  const cart = useMemo(() => buildCart(lines), [lines]);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      loadingCart,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addToCart,
      setQty,
      removeItem,
      clearCart,
    }),
    [cart, loadingCart, drawerOpen, addToCart, setQty, removeItem, clearCart],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
