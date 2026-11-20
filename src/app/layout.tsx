import type { Metadata, Viewport } from "next";
import { Poppins, Bebas_Neue, Fraunces } from "next/font/google";
import "./globals.css";
import PromoBar from "@/components/PromoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/components/store/StoreProvider";
import CartDrawer from "@/components/store/CartDrawer";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

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
  creator: site.name,
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: `${site.name} | Herbal Wellness`,
    description: site.description,
    siteName: site.name,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "/images/kadhaplus/pack-box-closed.webp",
        width: 1536,
        height: 1024,
        alt: "KadhaPlus Instant Herbal Kadha — pack of 5 sachets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Herbal Wellness`,
    description: site.description,
    images: ["/images/kadhaplus/pack-box-closed.webp"],
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
      lang="en-IN"
      className={`${sans.variable} ${display.variable} ${serif.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
