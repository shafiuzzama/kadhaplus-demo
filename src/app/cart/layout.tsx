import type { Metadata } from "next";

// The cart is a private, transactional route — keep it out of search indexes.
export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
