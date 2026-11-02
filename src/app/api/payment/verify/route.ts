import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getCartToken } from "@/lib/cart";

const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const liveMode = Boolean(process.env.RAZORPAY_KEY_ID && KEY_SECRET);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const orderId = String(body.orderId || "");
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  if (order.paymentStatus === "paid") {
    return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
  }

  let paymentRef = "";

  if (liveMode) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment confirmation." },
        { status: 400 },
      );
    }
    const expected = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (expected !== razorpay_signature) {
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentStatus: "failed" },
      });
      return NextResponse.json(
        { error: "Payment verification failed." },
        { status: 400 },
      );
    }
    paymentRef = String(razorpay_payment_id);
  } else {
    // Mock/test payment success.
    paymentRef = `MOCK-${Date.now().toString(36).toUpperCase()}`;
  }

  // Mark paid, decrement stock, clear the cart.
  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: { status: "paid", paymentStatus: "paid", paymentRef },
    });
    for (const item of order.items) {
      await tx.variant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }
  });

  const token = getCartToken();
  if (token) {
    const cart = await prisma.cart.findUnique({ where: { token } });
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
  }

  return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
}
