import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "KadhaPlus policy on returns, replacements and refunds.",
};

export default function ReturnRefundPage() {
  return (
    <LegalPage
      title="Return & Refund Policy"
      subtitle="Our commitment to a fair and transparent returns experience."
    >
      <p>
        This Return &amp; Refund Policy outlines the conditions under which
        returns, replacements and refunds are handled by {site.name}. Specific
        terms are to be confirmed and finalised before publication.
      </p>

      <h2>Eligibility</h2>
      <p>
        As KadhaPlus is a consumable wellness product, returns may be accepted
        only in specific cases such as damaged, defective or incorrect items.
        [Exact eligibility window and conditions to be confirmed.]
      </p>

      <h2>How to request a return</h2>
      <ul>
        <li>Contact us within [X days — to be confirmed] of delivery.</li>
        <li>Share your order details and a description (and photos, where relevant) of the issue.</li>
        <li>Our team will guide you through the next steps.</li>
      </ul>

      <h2>Refunds</h2>
      <p>
        Approved refunds will be processed to your original payment method within
        [X business days — to be confirmed]. [Refund charges, if any, to be
        confirmed.]
      </p>

      <h2>Non-returnable items</h2>
      <p>
        For hygiene and safety reasons, opened or used sachets may not be
        eligible for return unless they were defective on arrival. [To be
        confirmed.]
      </p>

      <h2>Contact</h2>
      <p>
        To raise a return or refund request, contact us at{" "}
        {site.contact.phones.join(" or ")}.
      </p>
    </LegalPage>
  );
}
