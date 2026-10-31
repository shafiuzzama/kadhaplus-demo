import type { Metadata } from "next";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the KadhaPlus team — call us, visit our Indiranagar, Bengaluru office, or send a business enquiry.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        subtitle="Questions, feedback or business enquiries — our team is here to help."
      />

      <section className="section">
        <div className="container-px grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              eyebrow="Reach Us"
              title="Contact details"
            />
            <div className="mt-8 space-y-4">
              <a
                href={`tel:${site.contact.phones[0]}`}
                className="card flex items-center gap-4 p-5 transition-colors hover:border-herbal-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink-muted">Phone</span>
                  {site.contact.phones.map((p) => (
                    <span key={p} className="block font-semibold text-herbal-900">
                      {p}
                    </span>
                  ))}
                </span>
              </a>

              <div className="card flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink-muted">Email</span>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-semibold text-herbal-900 hover:text-herbal-600"
                  >
                    {site.contact.email}
                  </a>
                </span>
              </div>

              <div className="card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                  <Building2 className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink-muted">Office Address</span>
                  <address className="mt-0.5 not-italic font-semibold text-herbal-900">
                    {site.contact.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </span>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="card mt-6 overflow-hidden">
              <div className="flex aspect-[16/10] items-center justify-center bg-mint-100 text-center">
                <div>
                  <MapPin className="mx-auto h-8 w-8 text-herbal-500" />
                  <p className="mt-2 text-sm font-medium text-herbal-800">
                    Google Maps integration
                  </p>
                  <p className="text-xs text-ink-muted">
                    Map embed placeholder — Indiranagar, Bengaluru
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <SectionHeading
              align="left"
              eyebrow="Business & General Enquiries"
              title="Send us a message"
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
