import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { site, nav, policyNav } from "@/lib/site";

const socials = [
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Youtube, href: site.social.youtube, label: "YouTube" },
  { icon: Twitter, href: site.social.twitter, label: "X (Twitter)" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-herbal-100 bg-herbal-950 text-mint-100">
      <div className="container-px grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="inline-flex rounded-2xl bg-white p-2">
            <Image
              src="/images/logo.jpg"
              alt={`${site.name} logo`}
              width={160}
              height={160}
              className="h-12 w-auto object-contain"
            />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mint-100/70">
            {site.description}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-leaf-300">
            {site.philosophy}
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-mint-100/80 transition-colors hover:border-leaf-400 hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-mint-100/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Policies
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {policyNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-mint-100/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Get in Touch
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-mint-100/70">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-leaf-300" />
              <span>
                {site.contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p}`}
                    className="block transition-colors hover:text-white"
                  >
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-leaf-300" />
              <a
                href={`mailto:${site.contact.email}`}
                className="break-all transition-colors hover:text-white"
              >
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf-300" />
              <span className="not-italic">
                {site.contact.address.lines.join(", ")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-6 text-xs text-mint-100/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-center sm:text-right">
            {site.name} is a herbal wellness product. Information on this site is
            for general wellness purposes only. See our{" "}
            <Link href="/disclaimer" className="underline hover:text-white">
              Disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
