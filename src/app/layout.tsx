import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Herbal Wellness — Inspired by Traditional Kadha`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "KadhaPlus",
    "herbal wellness",
    "traditional kadha",
    "kadha sachets",
    "Indian wellness",
    "seasonal wellness",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: `${site.name} | Herbal Wellness`,
    description: site.description,
    siteName: site.name,
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Herbal Wellness`,
    description: site.description,
  },
  icons: {
    icon: "/icon",
  },
};

export const viewport: Viewport = {
  themeColor: "#2e693d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
