"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/account";
  const { setUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await r.json();
    setBusy(false);
    if (!r.ok) {
      setError(data.error || "Could not sign in.");
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
          <h1 className="h-display text-3xl">Sign In</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Welcome back to KadhaPlus.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-herbal-800">
                Email
              </label>
              <input
                type="email"
                className={field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button type="submit" disabled={busy} className="btn-primary w-full">
              <LogIn className="h-4 w-4" />
              {busy ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-ink-soft">
            New here?{" "}
            <Link href="/register" className="font-medium text-herbal-700 underline">
              Create an account
            </Link>
          </p>
          <p className="mt-4 rounded-xl bg-mint-100 px-4 py-3 text-center text-xs text-ink-muted">
            Demo: customer@example.com / test1234 · admin@kadhaplus.com / admin123
          </p>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
