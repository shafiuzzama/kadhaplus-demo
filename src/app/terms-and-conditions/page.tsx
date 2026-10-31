import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of the KadhaPlus website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our website."
    >
      <p>
        These Terms &amp; Conditions govern your use of the {site.name} website.
        By accessing or using our website, you agree to these terms. This is a
        template to be reviewed and finalised with legal counsel before
        publication.
      </p>

      <h2>Use of the website</h2>
      <p>
        You agree to use this website for lawful purposes only and not to misuse
        it in any way that could damage or impair its availability.
      </p>

      <h2>Product information</h2>
      <p>
        We aim to keep product information accurate. Verified product details —
        including ingredients, usage, licences and pricing — are confirmed from
        manufacturer-approved sources. The displayed price of{" "}
        {site.product.priceLabel} for a box of {site.product.sachetCount} sachets
        may change without notice.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {site.name} name, logo, packaging artwork and website content are the
        property of {site.name} and may not be used without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        {site.name} is a herbal wellness product. Website content is provided for
        general information and wellness purposes only and does not constitute
        medical advice. [Specific liability terms to be confirmed with legal
        counsel.]
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, subject to the
        jurisdiction of the courts in Bengaluru. [To be confirmed.]
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Contact us at{" "}
        {site.contact.phones.join(" or ")}.
      </p>
    </LegalPage>
  );
}
