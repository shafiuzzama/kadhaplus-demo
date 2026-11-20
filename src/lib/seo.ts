import type { Metadata } from "next";
import { site } from "./site";

/* ============================================================================
   Shared SEO helpers — per-page metadata (canonical + Open Graph + Twitter)
   and JSON-LD structured-data builders. All values come from real site data;
   nothing (prices, reviews, claims, licences) is fabricated here.
   ========================================================================== */

const DEFAULT_OG_IMAGE = {
  url: "/images/kadhaplus/pack-box-closed.webp",
  width: 1536,
  height: 1024,
  alt: "KadhaPlus Instant Herbal Kadha — pack of 5 sachets",
};

type PageMetaInput = {
  /** Concise page title; the "%s | KadhaPlus" template adds the brand. */
  title: string;
  description: string;
  /** Absolute path for canonical + og:url, e.g. "/product" or "/". */
  path: string;
  image?: typeof DEFAULT_OG_IMAGE;
  /** Set true only for the home page so the brand isn't appended twice. */
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle,
}: PageMetaInput): Metadata {
  const img = image ?? DEFAULT_OG_IMAGE;
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: ogTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [img.url],
    },
  };
}

/* --------------------------------- JSON-LD -------------------------------- */

const abs = (p: string) => `${site.url}${p.startsWith("/") ? p : `/${p}`}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: abs("/images/logo.jpg"),
    description: site.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.contact.email,
      telephone: `+91-${site.contact.phones[0]}`,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function productSchema() {
  const images = [
    "/images/kadhaplus/pack-box-open.webp",
    "/images/kadhaplus/pack-box-closed.webp",
    "/images/kadhaplus/stick-front.webp",
    "/images/kadhaplus/stick-back.webp",
  ].map(abs);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: site.product.name,
    image: images,
    description:
      "KadhaPlus Instant Herbal Kadha is a traditional blend of 17 herbs in a convenient single-serve sachet. Available as a single 4 g sachet or a 5-sachet combo pack (5 × 4 g = 20 g).",
    brand: { "@type": "Brand", name: site.name },
    category: "Herbal Kadha",
    offers: [
      {
        "@type": "Offer",
        name: "Single Sachet",
        price: String(site.product.sachetPrice),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: abs("/product"),
        itemCondition: "https://schema.org/NewCondition",
      },
      {
        "@type": "Offer",
        name: "Combo Pack · 5 Sachets",
        price: String(site.product.price),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: abs("/product"),
        itemCondition: "https://schema.org/NewCondition",
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
