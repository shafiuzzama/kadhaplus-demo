import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  CART_COOKIE,
  getCartToken,
  getCartByToken,
  getOrCreateCartByToken,
  newCartToken,
  serializeCart,
} from "@/lib/cart";
import { getSessionUser } from "@/lib/auth";

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function GET() {
  const cart = await getCartByToken(getCartToken());
  return NextResponse.json(serializeCart(cart));
}

// Add item (or set quantity if `set` is true)
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const variantId = String(body.variantId || "");
  const quantity = Math.max(1, Math.min(99, Number(body.quantity) || 1));
  const set = Boolean(body.set);

  const variant = await prisma.variant.findUnique({ where: { id: variantId } });
  if (!variant) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  let token = getCartToken();
  let isNew = false;
  if (!token) {
    token = newCartToken();
    isNew = true;
  }
  const cart = await getOrCreateCartByToken(token);

  const user = await getSessionUser();
  if (user && !cart.userId) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { userId: user.id },
    });
  }

  const existing = cart.items.find((i) => i.variantId === variantId);
  const desired = set ? quantity : (existing?.quantity ?? 0) + quantity;
  const finalQty = Math.max(1, Math.min(desired, Math.max(1, variant.stock)));

  await prisma.cartItem.upsert({
    where: { cartId_variantId: { cartId: cart.id, variantId } },
    update: { quantity: finalQty },
    create: { cartId: cart.id, variantId, quantity: finalQty },
  });

  const fresh = await getCartByToken(token);
  const res = NextResponse.json(serializeCart(fresh));
  if (isNew) res.cookies.set(CART_COOKIE, token, cookieOpts);
  return res;
}

// Update quantity of a line item
export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const itemId = String(body.itemId || "");
  const quantity = Number(body.quantity);
  const token = getCartToken();
  const cart = await getCartByToken(token);
  if (!cart) return NextResponse.json(serializeCart(null));

  const item = cart.items.find((i) => i.id === itemId);
  if (!item) return NextResponse.json(serializeCart(cart));

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  } else {
    const clamped = Math.min(quantity, Math.max(1, item.variant.stock));
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: clamped },
    });
  }
  const fresh = await getCartByToken(token);
  return NextResponse.json(serializeCart(fresh));
}

// Remove one item (itemId) or clear the whole cart
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");
  const token = getCartToken();
  const cart = await getCartByToken(token);
  if (!cart) return NextResponse.json(serializeCart(null));

  if (itemId) {
    await prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
  } else {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
  const fresh = await getCartByToken(token);
  return NextResponse.json(serializeCart(fresh));
}
