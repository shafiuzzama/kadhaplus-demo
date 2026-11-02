import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, ShieldCheck, User as UserIcon } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import PageHeader from "@/components/ui/PageHeader";
import LogoutButton from "@/components/store/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?redirect=/account");

  return (
    <>
      <PageHeader eyebrow="My Account" title={`Hello, ${user.name.split(" ")[0]}`} />
      <section className="section">
        <div className="container-px mx-auto max-w-3xl">
          <div className="rounded-3xl border border-herbal-100 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-100 text-herbal-700">
                <UserIcon className="h-7 w-7" />
              </span>
              <div>
                <p className="font-semibold text-herbal-900">{user.name}</p>
                <p className="text-sm text-ink-muted">{user.email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/account/orders"
                className="flex items-center gap-3 rounded-2xl border border-herbal-100 p-5 transition-colors hover:border-herbal-300"
              >
                <Package className="h-6 w-6 text-herbal-600" />
                <div>
                  <p className="font-semibold text-herbal-900">My Orders</p>
                  <p className="text-sm text-ink-muted">Track and review orders</p>
                </div>
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 rounded-2xl border border-herbal-100 p-5 transition-colors hover:border-herbal-300"
                >
                  <ShieldCheck className="h-6 w-6 text-herbal-600" />
                  <div>
                    <p className="font-semibold text-herbal-900">Admin Dashboard</p>
                    <p className="text-sm text-ink-muted">Manage orders & product</p>
                  </div>
                </Link>
              )}
            </div>

            <div className="mt-6">
              <LogoutButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
