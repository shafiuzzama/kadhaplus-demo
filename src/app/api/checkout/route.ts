import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCartToken, getCartByToken, serializeCart } from "@/lib/cart";
import { getSessionUser } from "@/lib/auth";
import { shippingFor, makeOrderNumber } from "@/lib/order";

const schema = z.object({
  email: z.string().email("Enter a valid email."),
  fullName: z.string().min(2, "Enter the recipient's name."),
  phone: z.string().regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number."),
  line1: z.string().min(3, "Enter the address."),
  line2: z.string().optional().default(""),
  city: z.string().min(2, "Enter the city."),
  state: z.string().min(2, "Enter the state."),
  pincode: z.string().regex(/^[0-9]{5,6}$/, "Enter a valid pincode."),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid details." },
      { status: 400 },
    );
  }

  const token = getCartToken();
  const cart = await getCartByToken(token);
  const summary = serializeCart(cart);
  if (!cart || summary.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const user = await getSessionUser();
  const d = parsed.data;

  const address = await prisma.address.create({
    data: {
      userId: user?.id ?? null,
      fullName: d.fullName,
      phone: d.phone,
      line1: d.line1,
      line2: d.line2 || null,
      city: d.city,
      state: d.state,
      pincode: d.pincode,
    },
  });

  const subtotal = summary.subtotal;
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const order = await prisma.order.create({
    data: {
      orderNumber: makeOrderNumber(),
      userId: user?.id ?? null,
      email: d.email.toLowerCase(),
      addressId: address.id,
      subtotal,
      shipping,
      total,
      status: "pending",
      paymentStatus: "unpaid",
      items: {
        create: summary.items.map((it) => ({
          variantId: it.variantId,
          name: it.name,
          variantName: it.variantName,
          price: it.price,
          quantity: it.quantity,
        })),
      },
    },
  });

  return NextResponse.json({
    orderId: order.id,
    orderNumber: order.orderNumber,
    total: order.total,
  });
}
