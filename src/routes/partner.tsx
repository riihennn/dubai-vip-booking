import { createFileRoute } from "@tanstack/react-router";
import { images, venues } from "@/lib/venues";
import { PageHero, Reveal, Section, WhatsAppButton } from "@/components/site";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/partner")({
  head: () =>
    createSeoMeta({
      title: "Partner With Dubai VIP Booking — Venues & Promoters",
      description:
        "Connect your venue or promotional brand with qualified guests booking VIP tables and nightlife experiences across Dubai and Abu Dhabi.",
      path: "/partner",
    }),
  component: Partner,
});

function Partner() {
  const activeCount = venues.length;
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Partner With Us", path: "/partner" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="For Venues & Operators"
        title={
          <>
            Showcase your venue <span className="text-gold">to the right audience.</span>
          </>
        }
        sub="Connect with qualified table spenders, international visitors, and nightlife enthusiasts across the UAE."
        image={images.supper}
      />
      <Section>
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          {[
            [`${activeCount}+`, "Curated nightlife venues in directory"],
            ["2", "Flagship destinations: Dubai & Abu Dhabi"],
            ["Daily", "Dedicated WhatsApp concierge coordination (6 PM – 2 AM GST)"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="bg-background p-10">
              <p className="font-display text-5xl font-extrabold text-gold md:text-6xl">{n}</p>
              <p className="mt-3 text-muted-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="display-lg">Why collaborate.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              WaltX Limited operates Dubai VIP Booking as a targeted nightlife discovery and
              concierge channel, helping venues connect with qualified table enquiries without
              friction.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-8">
            {[
              [
                "Qualified demand",
                "High-intent table enquiries from residents, business travelers, and premium tourists seeking VIP table experiences.",
              ],
              [
                "Accurate presentation",
                "Verified venue descriptions, operating hours, dress codes, and table tier information backed by official sources.",
              ],
              [
                "Streamlined coordination",
                "Our concierge facilitates guest details, party sizes, and reservation requirements directly to your door and reservations team.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="border-b border-border pb-8">
                <h3 className="text-2xl font-bold">{t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
            <WhatsAppButton
              size="lg"
              message="Hi Dubai VIP Booking, I represent a venue and would like to discuss a promotional partnership with WaltX Limited."
            >
              Enquire About Partnership
            </WhatsAppButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
