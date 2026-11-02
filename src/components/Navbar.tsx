"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { nav } from "@/lib/site";
import { useStore } from "@/components/store/StoreProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, user, openDrawer } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-herbal-100 bg-cream-50/90 backdrop-blur-md"
          : "border-b border-transparent bg-cream-50/60 backdrop-blur-sm"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between sm:h-20">
        <Logo priority />

        <ul className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-herbal-50 text-herbal-700"
                      : "text-ink-soft hover:bg-herbal-50 hover:text-herbal-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href={user ? "/account" : "/login"}
            aria-label={user ? "My account" : "Sign in"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-herbal-100 bg-white text-herbal-700 transition-colors hover:bg-herbal-50"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-herbal-100 bg-white text-herbal-700 transition-colors hover:bg-herbal-50"
          >
            <ShoppingBag className="h-5 w-5" />
            {cart.count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-herbal-600 px-1 text-[11px] font-semibold text-white">
                {cart.count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-herbal-100 bg-white text-herbal-700 xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-herbal-100 bg-cream-50 xl:hidden"
          >
            <ul className="container-px flex flex-col gap-1 py-4">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                        active
                          ? "bg-herbal-50 text-herbal-700"
                          : "text-ink-soft hover:bg-herbal-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2 grid grid-cols-2 gap-2">
                <Link href="/product" className="btn-primary">
                  <ShoppingBag className="h-4 w-4" />
                  Shop Now
                </Link>
                <Link
                  href={user ? "/account" : "/login"}
                  className="btn-outline"
                >
                  <User className="h-4 w-4" />
                  {user ? "Account" : "Sign In"}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
