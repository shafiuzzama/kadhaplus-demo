import { redirect } from "next/navigation";
import { ShoppingCart, IndianRupee, Users, Boxes } from "lucide-react";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { rupees } from "@/lib/money";
import { OrderStatusSelect, VariantEditor } from "./AdminControls";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?redirect=/admin");
  if (user.role !== "admin") redirect("/account");

  const [orders, variants, customers, paidAgg] = await Promise.all([
    prisma.order.findMany({
      include: { items: true, address: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.variant.findMany({ orderBy: { price: "asc" } }),
    prisma.user.findMany({
      where: { role: "customer" },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { orders: true } } },
    }),
    prisma.order.aggregate({
      where: { paymentStatus: "paid" },
      _sum: { total: true },
    }),
  ]);

  const revenue = paidAgg._sum.total ?? 0;
  const totalStock = variants.reduce((s, v) => s + v.stock, 0);

  const stats = [
    { icon: ShoppingCart, label: "Orders", value: orders.length },
    { icon: IndianRupee, label: "Revenue (paid)", value: rupees(revenue) },
    { icon: Users, label: "Customers", value: customers.length },
    { icon: Boxes, label: "Units in stock", value: totalStock },
  ];

  return (
    <section className="section">
      <div className="container-px">
        <h1 className="h-display text-4xl">Admin Dashboard</h1>
        <p className="mt-1 text-ink-muted">Manage orders, product and customers.</p>

        {/* stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-herbal-100 bg-white p-5 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-herbal-700">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-herbal-900">{s.value}</p>
              <p className="text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* product management */}
        <div className="mt-10 rounded-3xl border border-herbal-100 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl tracking-wide text-herbal-900">
            Product &amp; Inventory
          </h2>
          <p className="text-sm text-ink-muted">
            KadhaPlus Classic Kadha — update price, MRP and stock.
          </p>
          <div className="mt-5 space-y-4">
            {variants.map((v) => (
              <VariantEditor
                key={v.id}
                variantId={v.id}
                name={v.name}
                price={v.price / 100}
                mrp={v.mrp / 100}
                stock={v.stock}
              />
            ))}
          </div>
        </div>

        {/* orders */}
        <div className="mt-10 rounded-3xl border border-herbal-100 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl tracking-wide text-herbal-900">
            Orders
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-herbal-100 text-xs uppercase tracking-wide text-ink-muted">
                  <th className="py-3 pr-4">Order</th>
                  <th className="py-3 pr-4">Customer</th>
                  <th className="py-3 pr-4">Items</th>
                  <th className="py-3 pr-4">Total</th>
                  <th className="py-3 pr-4">Payment</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-ink-muted">
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="border-b border-herbal-50">
                      <td className="py-3 pr-4 font-medium text-herbal-900">
                        {o.orderNumber}
                      </td>
                      <td className="py-3 pr-4 text-ink-soft">
                        {o.address.fullName}
                        <br />
                        <span className="text-xs text-ink-muted">{o.email}</span>
                      </td>
                      <td className="py-3 pr-4 text-ink-soft">
                        {o.items.reduce((s, i) => s + i.quantity, 0)}
                      </td>
                      <td className="py-3 pr-4 font-semibold">{rupees(o.total)}</td>
                      <td className="py-3 pr-4 capitalize text-ink-soft">
                        {o.paymentStatus}
                      </td>
                      <td className="py-3 pr-4">
                        <OrderStatusSelect orderId={o.id} status={o.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* customers */}
        <div className="mt-10 rounded-3xl border border-herbal-100 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl tracking-wide text-herbal-900">
            Customers
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-herbal-100 text-xs uppercase tracking-wide text-ink-muted">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Orders</th>
                  <th className="py-3 pr-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-herbal-50">
                    <td className="py-3 pr-4 font-medium text-herbal-900">{c.name}</td>
                    <td className="py-3 pr-4 text-ink-soft">{c.email}</td>
                    <td className="py-3 pr-4 text-ink-soft">{c._count.orders}</td>
                    <td className="py-3 pr-4 text-ink-muted">
                      {new Date(c.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
