import Link from "next/link";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { rupees } from "@/lib/money";
import PageHeader from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-leaf-100 text-herbal-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-herbal-100 text-herbal-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function OrdersPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?redirect=/account/orders");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader eyebrow="My Account" title="Order History" />
      <section className="section">
        <div className="container-px mx-auto max-w-3xl">
          {orders.length === 0 ? (
            <div className="rounded-3xl border border-herbal-100 bg-white p-12 text-center shadow-card">
              <Package className="mx-auto h-12 w-12 text-herbal-200" />
              <p className="mt-4 text-ink-soft">You have no orders yet.</p>
              <Link href="/product" className="btn-primary mt-6">
                Shop KadhaPlus
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <Link
                  key={o.id}
                  href={`/order/${o.id}`}
                  className="block rounded-2xl border border-herbal-100 bg-white p-5 shadow-card transition-colors hover:border-herbal-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-herbal-900">
                        {o.orderNumber}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {new Date(o.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        · {o.items.reduce((s, i) => s + i.quantity, 0)} item(s)
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        statusColor[o.status] ?? "bg-herbal-50 text-herbal-700"
                      }`}
                    >
                      {o.status}
                    </span>
                    <span className="font-bold text-herbal-900">
                      {rupees(o.total)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
