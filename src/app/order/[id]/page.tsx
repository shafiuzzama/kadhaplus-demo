import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Package, Truck } from "lucide-react";
import prisma from "@/lib/prisma";
import { rupees } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true, address: true },
  });
  if (!order) notFound();

  const paid = order.paymentStatus === "paid";

  return (
    <section className="section">
      <div className="container-px mx-auto max-w-2xl">
        <div className="rounded-3xl border border-herbal-100 bg-white p-8 text-center shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf-100">
            <CheckCircle2 className="h-9 w-9 text-herbal-600" />
          </div>
          <h1 className="mt-5 h-display text-3xl sm:text-4xl">
            {paid ? "Order Confirmed!" : "Order Placed"}
          </h1>
          <p className="mt-2 text-ink-soft">
            Thank you for choosing KadhaPlus. A confirmation has been sent to{" "}
            <span className="font-medium text-herbal-800">{order.email}</span>.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-mint-100 px-4 py-2 text-sm">
            <Package className="h-4 w-4 text-herbal-600" />
            <span className="font-semibold text-herbal-900">
              Order {order.orderNumber}
            </span>
            <span className="text-ink-muted">·</span>
            <span className="capitalize text-herbal-700">{order.status}</span>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-herbal-100 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl tracking-wide text-herbal-900">
            Order Details
          </h2>
          <div className="mt-4 space-y-3">
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between text-sm">
                <span className="text-ink-soft">
                  {it.name} · {it.variantName} × {it.quantity}
                </span>
                <span className="font-medium">{rupees(it.price * it.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="my-4 h-px bg-herbal-100" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span>{rupees(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Shipping</span>
              <span>{order.shipping === 0 ? "Free" : rupees(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-herbal-900">
              <span>Total</span>
              <span>{rupees(order.total)}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-herbal-800">
                <Truck className="h-4 w-4" /> Delivery Address
              </h3>
              <address className="mt-2 text-sm not-italic text-ink-soft">
                {order.address.fullName}
                <br />
                {order.address.line1}
                {order.address.line2 ? <>, {order.address.line2}</> : null}
                <br />
                {order.address.city}, {order.address.state} {order.address.pincode}
                <br />
                {order.address.phone}
              </address>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-herbal-800">Payment</h3>
              <p className="mt-2 text-sm capitalize text-ink-soft">
                {order.paymentMethod} · {order.paymentStatus}
              </p>
              {order.paymentRef && (
                <p className="text-xs text-ink-muted">Ref: {order.paymentRef}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/account/orders" className="btn-outline">
            View my orders
          </Link>
          <Link href="/product" className="btn-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
