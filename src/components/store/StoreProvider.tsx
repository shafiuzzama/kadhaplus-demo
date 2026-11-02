"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
export type User = { id: string; email: string; name: string; role: string } | null;

type StoreValue = {
  cart: Cart;
  user: User;
  loadingCart: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (variantId: string, quantity?: number, openDrawer?: boolean) => Promise<void>;
  setQty: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  setUser: (u: User) => void;
  refreshUser: () => Promise<void>;
};

const Ctx = createContext<StoreValue | null>(null);
const EMPTY: Cart = { items: [], subtotal: 0, count: 0 };

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(EMPTY);
  const [user, setUser] = useState<User>(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const busy = useRef(false);

  const refreshCart = useCallback(async () => {
    try {
      const r = await fetch("/api/cart", { cache: "no-store" });
      if (r.ok) setCart(await r.json());
    } finally {
      setLoadingCart(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const r = await fetch("/api/auth/me", { cache: "no-store" });
      if (r.ok) setUser((await r.json()).user ?? null);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    refreshCart();
    refreshUser();
  }, [refreshCart, refreshUser]);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1, open = true) => {
      if (busy.current) return;
      busy.current = true;
      try {
        const r = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId, quantity }),
        });
        if (r.ok) {
          setCart(await r.json());
          if (open) setDrawerOpen(true);
        }
      } finally {
        busy.current = false;
      }
    },
    [],
  );

  const setQty = useCallback(async (itemId: string, quantity: number) => {
    const r = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity }),
    });
    if (r.ok) setCart(await r.json());
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    const r = await fetch(`/api/cart?itemId=${itemId}`, { method: "DELETE" });
    if (r.ok) setCart(await r.json());
  }, []);

  const clearCart = useCallback(async () => {
    const r = await fetch("/api/cart", { method: "DELETE" });
    if (r.ok) setCart(await r.json());
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      user,
      loadingCart,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addToCart,
      setQty,
      removeItem,
      clearCart,
      setUser,
      refreshUser,
    }),
    [cart, user, loadingCart, drawerOpen, addToCart, setQty, removeItem, clearCart, refreshUser],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
