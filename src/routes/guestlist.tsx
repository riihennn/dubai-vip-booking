import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/venues";
import { PageHero, Reveal, Section } from "@/components/site";
import { BookingForm } from "@/components/booking-form";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/guestlist")({
  head: () =>
    createSeoMeta({
      title: "VIP Guestlist Access Dubai & Abu Dhabi | Dubai VIP Booking",
      description:
        "Request guestlist access to top nightclubs and luxury beach clubs across Dubai and Abu Dhabi. Coordinated directly via official WhatsApp concierge.",
      path: "/guestlist",
    }),
  component: Guestlist,
});

function Guestlist() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guestlist", path: "/guestlist" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="Guestlist & Table Access"
        title={
          <>
            On the list. <span className="text-gold">Past the line.</span>
          </>
        }
        sub="Complimentary guestlist access for mixed groups at selected venues. Submit your request below for door coordination on WhatsApp."
        image={images.hero}
      />
      <Section className="grid gap-16 pt-12 md:grid-cols-2 md:pt-16">
        <Reveal>
          <p className="eyebrow">How guestlist works</p>
          <ol className="mt-6 space-y-8">
            {[
              "Choose your city, venue, and preferred night",
              "Submit your guest details and mobile number",
              "Our concierge coordinates your name with the door host",
            ].map((s, i) => (
              <li key={s} className="flex gap-6">
                <span className="font-display text-5xl font-extrabold text-primary">0{i + 1}</span>
                <span className="pt-3 text-xl">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-sm border border-border bg-card p-6 text-sm text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground">Important Door Guidelines:</p>
            <p className="mt-1">
              Guestlist admission is strictly subject to venue capacity, arrival timing (typically
              before 11:30 PM for nightclubs), adherence to the venue dress code, and door
              management discretion. All guests must be 21+ with original Emirates ID or physical
              passport.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BookingForm
            title="Guestlist & Table Request"
            subtitle="Fill in all required fields to generate your unique reference code and launch WhatsApp."
            initialBudget="Complimentary Guestlist (Subject to door)"
          />
        </Reveal>
      </Section>
    </>
  );
}
