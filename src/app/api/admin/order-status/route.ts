import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }
  const { orderId, status } = await req.json().catch(() => ({}));
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  await prisma.order.update({
    where: { id: String(orderId) },
    data: { status },
  });
  return NextResponse.json({ ok: true });
}
