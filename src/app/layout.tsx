import type { Metadata, Viewport } from "next";
import { Poppins, Bebas_Neue, Fraunces } from "next/font/google";
import "./globals.css";
import PromoBar from "@/components/PromoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/components/store/StoreProvider";
import CartDrawer from "@/components/store/CartDrawer";
import { site } from "@/lib/site";

const sans = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const display = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: "400",
});

const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
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
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${serif.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <StoreProvider>
          <PromoBar />
          <Navbar />
          <main className="flex-1 overflow-x-clip">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
