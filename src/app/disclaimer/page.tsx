import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import Placeholder from "@/components/ui/Placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important product information disclaimer for KadhaPlus herbal wellness.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Product Information Disclaimer"
      subtitle="Please read this important information about KadhaPlus."
    >
      <p>
        {site.name} is a <strong>herbal wellness product</strong> inspired by
        traditional Indian kadha. The information on this website is provided for
        general wellness and informational purposes only.
      </p>

      <h2>Not a medicine or medical advice</h2>
      <p>
        Nothing on this website is intended to diagnose, treat, cure or prevent
        any disease or health condition. {site.name} does not claim to cure
        cough, cold or fever, treat infections, or guarantee any health outcome.
        Website content is not a substitute for professional medical advice.
        Always consult a qualified healthcare professional for medical concerns.
      </p>

      <h2>No unverified claims</h2>
      <p>
        We do not make clinical, medicinal or &quot;clinically proven&quot;
        claims unless they are specifically supported by the applicable product
        classification and approvals. Wellness messaging on this site reflects
        traditional inspiration, not medical efficacy.
      </p>

      <h2>Verified product information</h2>
      <p>
        Verified details are confirmed only from manufacturer-approved sources
        and the final product packaging. The following are shown as placeholders
        until officially confirmed:
      </p>
      <div className="not-prose mt-5 space-y-3">
        <Placeholder label="Manufacturer details" />
        <Placeholder label="Manufacturing licence details" />
        <Placeholder label="FSSAI / AYUSH registration (as applicable to final product classification)" />
        <Placeholder label="Complete ingredient list" />
        <Placeholder label="Batch details & expiry information" />
        <Placeholder label="Product warnings & precautions" />
        <Placeholder label="Usage instructions" />
      </div>

      <h2>Individual results & suitability</h2>
      <p>
        Suitability for children, pregnant or breastfeeding women, and
        individuals with medical conditions or allergies must be determined from
        approved product information and professional guidance. We do not make
        assumptions about suitability.
      </p>

      <h2>Regulatory information</h2>
      <p>
        Applicable regulatory information will be linked here once the final
        product classification and licences are confirmed.{" "}
        <span className="text-ink-muted">[Regulatory link to be added.]</span>
      </p>

      <h2>Contact</h2>
      <p>
        For any product information query, contact us at{" "}
        {site.contact.phones.join(" or ")}.
      </p>
    </LegalPage>
  );
}
