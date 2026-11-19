import Link from "next/link";
import {
  Sparkles,
  PackageCheck,
  CupSoda,
  Clock3,
  Leaf,
  HeartHandshake,
} from "lucide-react";
import type { QA } from "@/components/ui/Accordion";
import { site } from "./site";

export const features = [
  {
    icon: Sparkles,
    title: "Inspired by Tradition",
    desc: "Rooted in the familiar warmth of traditional Indian kadha, passed down through generations.",
  },
  {
    icon: PackageCheck,
    title: "Convenient Sachet Format",
    desc: "Single-serve sachets made for busy, modern routines — no measuring, no mess.",
  },
  {
    icon: CupSoda,
    title: "Easy to Prepare",
    desc: "A simple cup, ready in minutes by following the instructions on the pack.",
  },
  {
    icon: Clock3,
    title: "Designed for Modern Lifestyles",
    desc: "A familiar wellness ritual that fits at home, at work, or on the move.",
  },
];

export const prepareSteps = [
  {
    step: "01",
    title: "Open your sachet",
    desc: "Tear open a single KadhaPlus sachet and empty the contents into your cup.",
    icon: PackageCheck,
  },
  {
    step: "02",
    title: "Follow the pack instructions",
    desc: "Prepare exactly as described on the approved product packaging.",
    icon: CupSoda,
  },
  {
    step: "03",
    title: "Enjoy your drink",
    desc: "Savour your freshly prepared cup — a comforting, familiar wellness ritual.",
    icon: Leaf,
  },
];

// The 17 herbs printed on the KadhaPlus pack back panel, with widely-known
// English equivalents. This is the manufacturer's stated blend.
export const traditionalIngredients = [
  { name: "Tulsi", note: "Holy basil — a cornerstone of traditional kadha." },
  { name: "Adrak", note: "Ginger, a warming root long used in home preparations." },
  { name: "Mulethi", note: "Liquorice root, familiar in throat preparations." },
  { name: "Kali Mirch", note: "Black pepper, a classic kadha spice." },
  { name: "Pippali", note: "Long pepper, a traditional Ayurvedic spice." },
  { name: "Dalchini", note: "Cinnamon, a sweet, warming bark." },
  { name: "Laung", note: "Clove, aromatic and traditionally comforting." },
  { name: "Elaichi", note: "Cardamom, for fragrance and warmth." },
  { name: "Giloy", note: "Guduchi, a herb valued in Ayurveda." },
  { name: "Ashwagandha", note: "A well-known restorative Ayurvedic herb." },
  { name: "Haldi", note: "Turmeric, the golden kitchen root." },
  { name: "Saunth", note: "Dry ginger, warming and pungent." },
  { name: "Ajwain", note: "Carom seeds, a familiar Indian spice." },
  { name: "Punarnava", note: "A traditional Ayurvedic herb." },
  { name: "Vasaka", note: "Malabar nut, long used in throat preparations." },
  { name: "Tejpatta", note: "Indian bay leaf, gently aromatic." },
  { name: "Shankhpushpi", note: "A classic calming Ayurvedic herb." },
];

export const whyTrust = [
  {
    icon: HeartHandshake,
    title: "Honest, wellness-first messaging",
    desc: "We describe KadhaPlus as a herbal wellness product and avoid unverified medical claims.",
  },
  {
    icon: Leaf,
    title: "Traditional inspiration",
    desc: "Built on the familiar comfort of home-style kadha, reimagined for convenience.",
  },
  {
    icon: PackageCheck,
    title: "Clear product information",
    desc: "Verified details such as ingredients and licences are shown from approved sources.",
  },
];

export const faqs: QA[] = [
  {
    q: "What is KadhaPlus?",
    a: (
      <>
        KadhaPlus is a herbal wellness product inspired by traditional Indian
        kadha, offered in a simple, convenient single-serve sachet format. It is
        designed to bring a familiar wellness ritual into modern everyday life.
      </>
    ),
  },
  {
    q: "What does one box contain?",
    a: <>Each box contains {site.product.sachetCount} individual KadhaPlus sachets.</>,
  },
  {
    q: "What is the price of KadhaPlus?",
    a: (
      <>
        An individual sachet is{" "}
        <strong>{site.product.sachetPriceLabel}</strong>, and a pack of{" "}
        {site.product.sachetCount} sachets is{" "}
        <strong>{site.product.priceLabel}</strong>.
      </>
    ),
  },
  {
    q: "How do I prepare KadhaPlus?",
    a: (
      <>
        Open a sachet and prepare it by following the instructions printed on the
        approved product packaging. See our{" "}
        <Link href="/how-to-prepare">How to Prepare</Link> page for the general
        steps. We do not specify water quantities, temperatures, or frequency
        here — always follow the pack.
      </>
    ),
  },
  {
    q: "What are the ingredients?",
    a: (
      <>
        KadhaPlus is a blend of 17 herbs — Tulsi, Adrak, Mulethi, Kali Mirch,
        Pippali, Dalchini, Laung, Elaichi, Giloy, Ashwagandha, Haldi, Saunth,
        Ajwain, Punarnava, Vasaka, Tejpatta and Shankhpushpi — as listed on the
        pack. See our <Link href="/ingredients">Ingredients</Link> page for more.
      </>
    ),
  },
  {
    q: "Is KadhaPlus suitable for children?",
    a: (
      <>
        Suitability information must come from manufacturer-approved details. We
        do not make assumptions here. Please refer to the product packaging and
        consult a qualified healthcare professional before giving any wellness
        product to children.
      </>
    ),
  },
  {
    q: "Can pregnant women consume KadhaPlus?",
    a: (
      <>
        We do not make safety claims for pregnancy. Please consult a qualified
        healthcare professional and refer to the approved product information
        before use during pregnancy or breastfeeding.
      </>
    ),
  },
  {
    q: "Are there any precautions?",
    a: (
      <>
        Any precautions, warnings and usage guidance are provided on the approved
        product packaging. If you have a medical condition, allergies, or are
        taking medication, please consult a qualified healthcare professional.
      </>
    ),
  },
  {
    q: "How can I contact KadhaPlus?",
    a: (
      <>
        You can reach us on {site.contact.phones.join(" or ")}, or through our{" "}
        <Link href="/contact">Contact Us</Link> page. Our office is in
        Indiranagar, Bengaluru.
      </>
    ),
  },
];
