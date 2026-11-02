import "server-only";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import prisma from "./prisma";

export const CART_COOKIE = "kp_cart";

export type SerializedCartItem = {
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
export type SerializedCart = {
  items: SerializedCartItem[];
  subtotal: number;
  count: number;
};

export const EMPTY_CART: SerializedCart = { items: [], subtotal: 0, count: 0 };

export function getCartToken(): string | null {
  return cookies().get(CART_COOKIE)?.value ?? null;
}

export function newCartToken(): string {
  return randomUUID();
}

const include = {
  items: {
    include: { variant: { include: { product: true } } },
    orderBy: { id: "asc" as const },
  },
};

export async function getCartByToken(token: string | null) {
  if (!token) return null;
  return prisma.cart.findUnique({ where: { token }, include });
}

export async function getOrCreateCartByToken(token: string) {
  const existing = await prisma.cart.findUnique({ where: { token }, include });
  if (existing) return existing;
  return prisma.cart.create({ data: { token }, include });
}

type CartWithItems = NonNullable<Awaited<ReturnType<typeof getCartByToken>>>;

export function serializeCart(cart: CartWithItems | null): SerializedCart {
  if (!cart) return EMPTY_CART;
  const items: SerializedCartItem[] = cart.items.map((it) => ({
    id: it.id,
    variantId: it.variantId,
    quantity: it.quantity,
    name: it.variant.product.name,
    variantName: it.variant.name,
    price: it.variant.price,
    mrp: it.variant.mrp,
    sachets: it.variant.sachets,
    stock: it.variant.stock,
    lineTotal: it.variant.price * it.quantity,
  }));
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return { items, subtotal, count };
}
