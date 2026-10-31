// Central brand + content config. Verified-info placeholders are clearly marked.
export const site = {
  name: "KadhaPlus",
  category: "Herbal Wellness",
  tagline: "Inspired by Traditional Kadha",
  description:
    "Bringing the wisdom of traditional Indian kadha into a simple, convenient and modern wellness experience.",
  philosophy: "Traditional Wisdom. Modern Convenience.",
  slogan: "Dadi Maa Ka Nuskha, Ab Ek Naye Andaaz Mein!",
  positioning: "Cough • Cold • Fever • Throat • Nasal Comfort",
  seasonal: "Seasonal & Sinus Wellness",
  url: "https://kadhaplus.com",
  product: {
    name: "KadhaPlus Classic Kadha",
    shortName: "KadhaPlus Classic Kadha",
    category: "Instant Herbal Kadha Granules",
    variant: "Classic Kadha",
    packagingTagline: "Traditional Taste. Modern Convenience.",
    pack: "Pack of 5 Sachets",
    sachetCount: 5,
    price: 89,
    priceLabel: "₹89",
    sachetPrice: 20,
    sachetPriceLabel: "₹20",
  },
  contact: {
    phones: ["9625668358", "8660647616"],
    email: "support.kadhaplus@gmail.com",
    address: {
      lines: [
        "271, HAL Stage 2",
        "6th Main Road",
        "Indiranagar",
        "Bengaluru – 560038, India",
      ],
    },
  },
  social: {
    // Configurable — replace with official handles.
    instagram: "#",
    facebook: "#",
    youtube: "#",
    twitter: "#",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Product", href: "/product" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "How to Prepare", href: "/how-to-prepare" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

export const policyNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Shipping & Delivery Policy", href: "/shipping-and-delivery" },
  { label: "Return & Refund Policy", href: "/return-and-refund" },
  { label: "Disclaimer", href: "/disclaimer" },
];
