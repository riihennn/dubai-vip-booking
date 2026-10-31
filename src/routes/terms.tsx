import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/lib/config";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageHero, Section } from "@/components/site";
import { images } from "@/lib/venues";

export const Route = createFileRoute("/terms")({
  head: () =>
    createSeoMeta({
      title: "Terms and Conditions | Dubai VIP Booking",
      description:
        "Terms and Conditions for Dubai VIP Booking, operated by WaltX Limited, licensed by Masdar City Free Zone, Abu Dhabi, UAE (Licence No. MC 14979).",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms and Conditions", path: "/terms" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="Legal & Regulatory"
        title={
          <>
            Terms & <span className="text-gold">Conditions.</span>
          </>
        }
        sub="Important terms governing your use of the Dubai VIP Booking concierge facilitation service."
        image={images.rooftop}
      />
      <Section className="pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl space-y-10 text-foreground/85 leading-relaxed text-base">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">1. Operating Entity</h2>
            <p className="mt-3">
              Dubai VIP Booking is an online promotional platform and nightlife concierge service
              operated by <strong>WaltX Limited</strong>, an entity duly licensed and registered
              within Masdar City Free Zone, Abu Dhabi, United Arab Emirates (Licence No. MC 14979).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              2. Promotional & Concierge Scope
            </h2>
            <p className="mt-3">
              Dubai VIP Booking acts solely as an independent nightlife discovery service and
              concierge facilitator connecting guests with nightlife venues. Dubai VIP Booking is
              <strong> not the venue operator</strong>, licensee, or proprietor of any featured
              nightclub, beach club, lounge, or restaurant.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              3. Venue Entry, Admission & Discretion
            </h2>
            <p className="mt-3">
              All reservations, table assignments, and guestlist admissions remain at the sole and
              exclusive discretion of the venue management and security door personnel.
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>
                Guests must strictly meet the UAE statutory legal drinking and venue age of 21+.
              </li>
              <li>
                Valid original government identification (Emirates ID or passport) is required at
                the door.
              </li>
              <li>Each venue strictly enforces its own dress code policy and capacity limits.</li>
              <li>Dubai VIP Booking cannot and does not guarantee admission or door entry.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              4. Minimum Spends & Payments
            </h2>
            <p className="mt-3">
              Minimum spend amounts for VIP tables are set independently by venue operators and may
              vary according to night, performer, table location, and seasonal demand. All table
              spends, beverage bills, and service charges are settled directly between you and the
              venue operator on the night of attendance. Dubai VIP Booking does not process venue
              beverage bills.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              5. Limitation of Liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted under UAE law, WaltX Limited and Dubai VIP Booking
              shall not be held liable for any refusal of admission, cancellations, service
              disputes, lost personal property, injuries, or alterations in table placement enacted
              by independent venue management.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              6. Official Communication
            </h2>
            <p className="mt-3">
              All official concierge communications, enquiries, and reservation updates are
              coordinated via our official business WhatsApp channel at{" "}
              <strong>{brand.phone}</strong>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
