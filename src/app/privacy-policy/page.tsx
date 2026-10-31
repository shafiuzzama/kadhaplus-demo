import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How KadhaPlus collects, uses and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This policy explains how KadhaPlus handles your information."
    >
      <p>
        This Privacy Policy describes how {site.name} (&quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) collects, uses and safeguards
        information when you visit our website or contact us. This is a template
        to be reviewed and finalised with legal counsel before publication.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you share with us (such as name, phone and email) via our contact form or enquiries.</li>
        <li>Basic usage information collected automatically, such as pages viewed, to help improve our website.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiries and provide customer support.</li>
        <li>To process and fulfil orders and business enquiries.</li>
        <li>To improve our website, products and services.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Our website may use cookies or similar technologies to enhance your
        browsing experience. You can control cookies through your browser
        settings.
      </p>

      <h2>Data sharing</h2>
      <p>
        We do not sell your personal information. We may share information with
        trusted service providers who help us operate our business, subject to
        appropriate safeguards. [Specific third-party processors to be
        confirmed.]
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        information by contacting us. [Applicable data-protection rights to be
        confirmed per jurisdiction.]
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, reach us at {site.contact.phones.join(" or ")}, by
        email at {site.contact.email}, or at our office:{" "}
        {site.contact.address.lines.join(", ")}.
      </p>
    </LegalPage>
  );
}
