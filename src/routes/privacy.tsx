import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/lib/config";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageHero, Section } from "@/components/site";
import { images } from "@/lib/venues";

export const Route = createFileRoute("/privacy")({
  head: () =>
    createSeoMeta({
      title: "Privacy Policy | Dubai VIP Booking",
      description:
        "Privacy Policy for Dubai VIP Booking. Learn how WaltX Limited (Masdar City Free Zone, Abu Dhabi) collects and protects your personal data.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="Data Protection"
        title={
          <>
            Privacy <span className="text-gold">Policy.</span>
          </>
        }
        sub="How WaltX Limited respects and safeguards your personal data in accordance with UAE data protection standards."
        image={images.beach}
      />
      <Section className="pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl space-y-10 text-foreground/85 leading-relaxed text-base">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">1. Data Controller</h2>
            <p className="mt-3">
              The data controller responsible for personal information collected via Dubai VIP
              Booking is <strong>WaltX Limited</strong>, licensed by Masdar City Free Zone, Abu
              Dhabi, UAE (Licence No. MC 14979).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              2. Information We Collect
            </h2>
            <p className="mt-3">
              When you submit a VIP table or guestlist enquiry, we collect the necessary details to
              facilitate your request with venue teams, including:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Full name</li>
              <li>Mobile / WhatsApp contact number</li>
              <li>Desired reservation date and party size</li>
              <li>Venue and seating / budget preferences</li>
              <li>
                Marketing attribution data (e.g. UTM parameters) to gauge campaign effectiveness
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              3. How We Use Your Data
            </h2>
            <p className="mt-3">
              Your personal data is utilized strictly for legitimate concierge purposes:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>
                Coordinating table reservations and guestlist submissions with venue door teams
              </li>
              <li>
                Communicating reservation availability, updates, and minimum spends over WhatsApp
              </li>
              <li>Maintaining administrative enquiry records and preventing fraudulent bookings</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              4. Disclosure to Third Parties
            </h2>
            <p className="mt-3">
              We never sell or lease your personal information. Relevant enquiry details (such as
              your name and party size) are shared only with the specific venue host or door manager
              handling your booking.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              5. Data Retention & Your Rights
            </h2>
            <p className="mt-3">
              In accordance with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data
              Protection, you have the right to request access to, correction of, or deletion of
              your personal enquiry information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              6. Contacting the Concierge
            </h2>
            <p className="mt-3">
              For any data privacy enquiries or to request deletion of your contact records, please
              contact our team via our official WhatsApp business channel at{" "}
              <strong>{brand.phone}</strong>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
