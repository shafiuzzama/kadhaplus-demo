"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";

function RegisterInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/account";
  const { setUser } = useStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const r = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await r.json();
    setBusy(false);
    if (!r.ok) {
      setError(data.error || "Could not create account.");
      return;
    }
    setUser(data.user);
    router.push(redirect);
    router.refresh();
  }

  const field =
    "w-full rounded-2xl border border-herbal-100 bg-cream-50 px-4 py-3 text-sm outline-none transition-colors focus:border-herbal-400 focus:bg-white";

  return (
    <section className="section">
      <div className="container-px mx-auto max-w-md">
        <div className="rounded-3xl border border-herbal-100 bg-white p-8 shadow-card">
          <h1 className="h-display text-3xl">Create Account</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Join KadhaPlus to check out faster and track orders.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                Full Name
              </label>
              <input
                className={field}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                Email
              </label>
              <input
                type="email"
                className={field}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                Password
              </label>
              <input
                type="password"
                className={field}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="new-password"
              />
              <p className="mt-1 text-xs text-ink-muted">At least 6 characters.</p>
            </div>
            <button type="submit" disabled={busy} className="btn-primary w-full">
              <UserPlus className="h-4 w-4" />
              {busy ? "Creating…" : "Create Account"}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-herbal-700 underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterInner />
    </Suspense>
  );
}
