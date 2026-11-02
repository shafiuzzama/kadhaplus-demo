import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const liveMode = Boolean(KEY_ID && KEY_SECRET);

export async function POST(req: NextRequest) {
  const { orderId } = await req.json().catch(() => ({}));
  const order = await prisma.order.findUnique({ where: { id: String(orderId) } });
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  if (order.paymentStatus === "paid") {
    return NextResponse.json({ error: "Order already paid." }, { status: 400 });
  }

  if (!liveMode) {
    // Built-in test/mock payment — no real gateway configured.
    return NextResponse.json({
      provider: "mock",
      amount: order.total,
      orderNumber: order.orderNumber,
    });
  }

  // Razorpay order creation
  const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64");
  const rpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: order.total,
      currency: "INR",
      receipt: order.orderNumber,
    }),
  });
  if (!rpRes.ok) {
    return NextResponse.json(
      { error: "Payment gateway error." },
      { status: 502 },
    );
  }
  const rp = await rpRes.json();
  return NextResponse.json({
    provider: "razorpay",
    razorpayOrderId: rp.id,
    keyId: KEY_ID,
    amount: order.total,
    orderNumber: order.orderNumber,
    email: order.email,
  });
}
