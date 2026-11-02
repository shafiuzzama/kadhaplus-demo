import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }
  const { variantId, price, mrp, stock } = await req.json().catch(() => ({}));
  const data: { price?: number; mrp?: number; stock?: number } = {};
  if (Number.isFinite(price)) data.price = Math.max(0, Math.round(price * 100));
  if (Number.isFinite(mrp)) data.mrp = Math.max(0, Math.round(mrp * 100));
  if (Number.isFinite(stock)) data.stock = Math.max(0, Math.round(stock));
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }
  await prisma.variant.update({ where: { id: String(variantId) }, data });
  return NextResponse.json({ ok: true });
}
