"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { useStore, type CartItem } from "@/components/store/StoreProvider";
import { rupees } from "@/lib/money";
import PageHeader from "@/components/ui/PageHeader";

const FREE_SHIPPING = 49900;
const FLAT_SHIPPING = 4000;

type Placed = {
  ref: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  name: string;
  email: string;
};

function makeRef() {
  return "KP-" + Date.now().toString(36).toUpperCase().slice(-6);
}

export default function CheckoutPage() {
  const { cart, clearCart, loadingCart } = useStore();
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
  const [placed, setPlaced] = useState<Placed | null>(null);

  const shipping =
    cart.subtotal >= FREE_SHIPPING ? 0 : cart.subtotal > 0 ? FLAT_SHIPPING : 0;
  const total = cart.subtotal + shipping;

  const field =
    "w-full rounded-2xl border border-herbal-100 bg-cream-50 px-4 py-3 text-sm outline-none transition-colors focus:border-herbal-400 focus:bg-white";

  const requiredOk = useMemo(
    () =>
      form.email.trim() &&
      form.fullName.trim() &&
      form.phone.trim() &&
      form.line1.trim() &&
      form.city.trim() &&
      form.state.trim() &&
      form.pincode.trim(),
    [form],
  );

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!requiredOk) {
      setError("Please fill in all required fields.");
      return;
    }
    const order: Placed = {
      ref: makeRef(),
      items: cart.items,
      subtotal: cart.subtotal,
      shipping,
      total,
      name: form.fullName.trim(),
      email: form.email.trim(),
    };
    try {
      localStorage.setItem("kp_last_order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    setPlaced(order);
    clearCart();
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Confirmation ---------- */
  if (placed) {
    return (
      <>
        <PageHeader eyebrow="Order Received" title="Thank you for your order" />
        <section className="section">
          <div className="container-px mx-auto max-w-xl">
            <div className="rounded-3xl border border-herbal-100 bg-white p-8 text-center shadow-card">
              <CheckCircle2 className="mx-auto h-14 w-14 text-herbal-600" />
              <h2 className="mt-4 font-display text-2xl tracking-wide text-herbal-900">
                Order {placed.ref}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Thanks, {placed.name}! We&apos;ve noted your order request. Our team
                will get in touch with you at{" "}
                <span className="font-medium">{placed.email}</span> to confirm your
                order and arrange payment &amp; delivery.
              </p>

              <div className="mt-6 space-y-2 rounded-2xl bg-cream-50 p-5 text-left text-sm">
                {placed.items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span className="text-ink-soft">
                      {it.name} · {it.variantName} × {it.quantity}
                    </span>
                    <span className="font-medium">{rupees(it.lineTotal)}</span>
                  </div>
                ))}
                <div className="my-2 h-px bg-herbal-100" />
                <div className="flex justify-between">
                  <span className="text-ink-soft">Shipping</span>
                  <span className="font-medium">
                    {placed.shipping === 0 ? "Free" : rupees(placed.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-herbal-900">Total</span>
                  <span className="font-bold text-herbal-900">
                    {rupees(placed.total)}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-xs text-ink-muted">
                Online payment is being set up and will be available soon. No
                payment has been charged for this order.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/product" className="btn-primary">
                  Continue shopping
                </Link>
                <Link href="/" className="btn-ghost">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ---------- Empty cart ---------- */
  if (!loadingCart && cart.items.length === 0) {
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

  /* ---------- Form ---------- */
  return (
    <>
      <PageHeader eyebrow="Checkout" title="Checkout" />
      <section className="section">
        <div className="container-px grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {error && (
              <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

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

              <div className="mt-6 rounded-2xl bg-mint-100 p-4 text-sm text-ink-soft">
                <p className="flex items-center gap-2 font-medium text-herbal-800">
                  <ShieldCheck className="h-4 w-4" /> Online payment coming soon
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Place your order now and our team will contact you to confirm and
                  arrange payment &amp; delivery.
                </p>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
                Place Order
              </button>
            </form>
          </div>

          {/* summary */}
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
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
              <Truck className="h-4 w-4" /> Free delivery over ₹499
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
