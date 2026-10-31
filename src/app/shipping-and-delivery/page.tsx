import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "How KadhaPlus orders are processed, shipped and delivered.",
};

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping & Delivery Policy"
      subtitle="Everything you need to know about how your KadhaPlus order reaches you."
    >
      <p>
        This Shipping &amp; Delivery Policy explains how orders placed with{" "}
        {site.name} are processed and delivered. Specific timelines, charges and
        serviceable areas are to be confirmed and finalised before publication.
      </p>

      <h2>Order processing</h2>
      <p>
        Orders are typically processed within [X business days — to be
        confirmed] of confirmation. You will be notified once your order is
        dispatched.
      </p>

      <h2>Shipping charges</h2>
      <p>
        Shipping charges, if any, will be displayed at checkout. [Free-shipping
        thresholds and rates to be confirmed.]
      </p>

      <h2>Delivery timelines</h2>
      <ul>
        <li>Metro cities: [To be confirmed] business days.</li>
        <li>Other locations: [To be confirmed] business days.</li>
      </ul>
      <p>
        Delivery timelines are estimates and may vary due to factors beyond our
        control.
      </p>

      <h2>Serviceable areas</h2>
      <p>
        We currently ship to [serviceable regions — to be confirmed]. If your
        area is not serviceable, we will notify you.
      </p>

      <h2>Tracking</h2>
      <p>
        Where available, tracking details will be shared after dispatch.
      </p>

      <h2>Contact</h2>
      <p>
        For shipping queries, reach us at {site.contact.phones.join(" or ")}.
      </p>
    </LegalPage>
  );
}
