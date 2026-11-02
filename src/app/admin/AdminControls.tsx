"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function change(next: string) {
    setValue(next);
    setSaving(true);
    await fetch("/api/admin/order-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: next }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => change(e.target.value)}
      className="rounded-lg border border-herbal-200 bg-white px-2 py-1 text-xs font-medium capitalize text-herbal-800 outline-none"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}

export function VariantEditor({
  variantId,
  name,
  price,
  mrp,
  stock,
}: {
  variantId: string;
  name: string;
  price: number; // rupees
  mrp: number;
  stock: number;
}) {
  const router = useRouter();
  const [p, setP] = useState(String(price));
  const [m, setM] = useState(String(mrp));
  const [s, setS] = useState(String(stock));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/variant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        variantId,
        price: Number(p),
        mrp: Number(m),
        stock: Number(s),
      }),
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 1500);
  }

  const input =
    "w-20 rounded-lg border border-herbal-200 px-2 py-1 text-sm outline-none focus:border-herbal-400";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-32 text-sm font-medium text-herbal-900">{name}</span>
      <label className="text-xs text-ink-muted">
        Price ₹
        <input className={input} value={p} onChange={(e) => setP(e.target.value)} />
      </label>
      <label className="text-xs text-ink-muted">
        MRP ₹
        <input className={input} value={m} onChange={(e) => setM(e.target.value)} />
      </label>
      <label className="text-xs text-ink-muted">
        Stock
        <input className={input} value={s} onChange={(e) => setS(e.target.value)} />
      </label>
      <button
        onClick={save}
        disabled={saving}
        className="btn bg-herbal-600 px-4 py-1.5 text-xs text-white hover:bg-herbal-700"
      >
        {saved ? <Check className="h-3.5 w-3.5" /> : null}
        {saving ? "Saving…" : saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}
