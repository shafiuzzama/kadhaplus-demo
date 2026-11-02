"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ShieldCheck, CreditCard } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";
import { rupees } from "@/lib/money";
import PageHeader from "@/components/ui/PageHeader";

const FREE_SHIPPING = 49900;
const FLAT_SHIPPING = 4000;

/* eslint-disable @typescript-eslint/no-explicit-any */
function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, loadingCart } = useStore();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [error, setError] = useState("");
  const [stage, setStage] = useState<"form" | "pay">("form");
  const [order, setOrder] = useState<{ orderId: string; total: number } | null>(
    null,
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, email: f.email || user.email, fullName: f.fullName || user.name }));
  }, [user]);

  const shipping = cart.subtotal >= FREE_SHIPPING ? 0 : cart.subtotal > 0 ? FLAT_SHIPPING : 0;
  const total = cart.subtotal + shipping;

  const field =
    "w-full rounded-2xl border border-herbal-100 bg-cream-50 px-4 py-3 text-sm outline-none transition-colors focus:border-herbal-400 focus:bg-white";

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error || "Could not place order.");
        return;
      }
      setOrder({ orderId: data.orderId, total: data.total });
      setStage("pay");
    } finally {
      setBusy(false);
    }
  }

  async function pay() {
    if (!order) return;
    setBusy(true);
    setError("");
    try {
      const cr = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId }),
      });
      const info = await cr.json();
      if (!cr.ok) {
        setError(info.error || "Payment could not be started.");
        return;
      }

      if (info.provider === "razorpay") {
        const ok = await loadRazorpay();
        if (!ok) {
          setError("Could not load payment gateway.");
          return;
        }
        const rz = new (window as any).Razorpay({
          key: info.keyId,
          amount: info.amount,
          currency: "INR",
          name: "KadhaPlus",
          description: info.orderNumber,
          order_id: info.razorpayOrderId,
          prefill: { email: info.email, name: form.fullName, contact: form.phone },
          theme: { color: "#3c6f45" },
          handler: async (resp: any) => {
            await verify({
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
            });
          },
        });
        rz.open();
      } else {
        // mock/test payment
        await verify({});
      }
    } finally {
      setBusy(false);
    }
  }

  async function verify(extra: Record<string, string>) {
    if (!order) return;
    const vr = await fetch("/api/payment/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.orderId, ...extra }),
    });
    const vd = await vr.json();
    if (vr.ok && vd.ok) {
      router.push(`/order/${order.orderId}`);
    } else {
      setError(vd.error || "Payment failed. Please try again.");
    }
  }

  if (!loadingCart && cart.items.length === 0 && stage === "form") {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Checkout" />
        <section className="section">
          <div className="container-px mx-auto max-w-md text-center">
            <p className="text-ink-soft">Your cart is empty.</p>
            <Link href="/product" className="btn-primary mt-6">
              Shop KadhaPlus
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Secure Checkout" title="Checkout" />
      <section className="section">
        <div className="container-px grid gap-8 lg:grid-cols-3">
          {/* left: form / payment */}
          <div className="lg:col-span-2">
            {error && (
              <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {stage === "form" ? (
              <form
                onSubmit={placeOrder}
                className="rounded-3xl border border-herbal-100 bg-white p-6 shadow-card sm:p-8"
                noValidate
              >
                <h2 className="font-display text-2xl tracking-wide text-herbal-900">
                  Shipping Details
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      Email
                    </label>
                    <input
                      type="email"
                      className={field}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      Full Name
                    </label>
                    <input
                      className={field}
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      Phone
                    </label>
                    <input
                      className={field}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      Address line 1
                    </label>
                    <input
                      className={field}
                      value={form.line1}
                      onChange={(e) => setForm({ ...form, line1: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      Address line 2 <span className="text-ink-muted">(optional)</span>
                    </label>
                    <input
                      className={field}
                      value={form.line2}
                      onChange={(e) => setForm({ ...form, line2: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      City
                    </label>
                    <input
                      className={field}
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      State
                    </label>
                    <input
                      className={field}
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                      Pincode
                    </label>
                    <input
                      className={field}
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" disabled={busy} className="btn-primary mt-6 w-full sm:w-auto">
                  {busy ? "Placing order…" : "Continue to Payment"}
                </button>
              </form>
            ) : (
              <div className="rounded-3xl border border-herbal-100 bg-white p-6 shadow-card sm:p-8">
                <h2 className="flex items-center gap-2 font-display text-2xl tracking-wide text-herbal-900">
                  <CreditCard className="h-5 w-5" /> Payment
                </h2>
                <div className="mt-4 rounded-2xl bg-mint-100 p-4 text-sm text-ink-soft">
                  <p className="flex items-center gap-2 font-medium text-herbal-800">
                    <ShieldCheck className="h-4 w-4" /> Test / Demo payment mode
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    No live payment gateway is configured, so this uses a built-in
                    test payment. Add Razorpay keys in <code>.env</code> to accept
                    real payments.
                  </p>
                </div>
                <p className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Amount payable</span>
                  <span className="text-2xl font-bold text-herbal-900">
                    {rupees(order?.total ?? total)}
                  </span>
                </p>
                <button onClick={pay} disabled={busy} className="btn-primary mt-6 w-full">
                  <Lock className="h-4 w-4" />
                  {busy ? "Processing…" : `Pay ${rupees(order?.total ?? total)}`}
                </button>
                <button
                  onClick={() => setStage("form")}
                  className="btn-ghost mt-2 w-full"
                >
                  Back to details
                </button>
              </div>
            )}
          </div>

          {/* right: summary */}
          <aside className="h-fit rounded-3xl border border-herbal-100 bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl tracking-wide text-herbal-900">
              Order Summary
            </h2>
            <div className="mt-4 space-y-3">
              {cart.items.map((it) => (
                <div key={it.id} className="flex justify-between text-sm">
                  <span className="text-ink-soft">
                    {it.name} · {it.variantName} × {it.quantity}
                  </span>
                  <span className="font-medium">{rupees(it.lineTotal)}</span>
                </div>
              ))}
            </div>
            <div className="my-4 h-px bg-herbal-100" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-soft">Subtotal</span>
                <span className="font-medium">{rupees(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : rupees(shipping)}
                </span>
              </div>
            </div>
            <div className="my-4 h-px bg-herbal-100" />
            <div className="flex justify-between">
              <span className="font-semibold text-herbal-900">Total</span>
              <span className="text-xl font-bold text-herbal-900">
                {rupees(total)}
              </span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
