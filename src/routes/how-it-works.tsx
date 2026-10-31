import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/venues";
import { CtaBand, PageHero, Reveal, Section } from "@/components/site";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    createSeoMeta({
      title: "How It Works — Dubai VIP Booking Concierge",
      description:
        "Understand the four-step process for reserving VIP tables and guestlist entry across Dubai and Abu Dhabi via our official WhatsApp concierge.",
      path: "/how-it-works",
    }),
  component: How,
});

const steps = [
  [
    "Message our concierge",
    "Share your desired city, date, party size, and the type of venue experience you are seeking.",
  ],
  [
    "Review available options",
    "Our concierge provides curated options, table placement details, and published or confirmed minimum spends.",
  ],
  [
    "Coordinate reservation",
    "We coordinate your reservation details with the venue team under your name. Table spend is settled directly with the venue.",
  ],
  [
    "Arrive & check in",
    "Arrive at the venue in adherence to the dress code and door policy. Venue door hosts verify your booking upon entry.",
  ],
];

function How() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="Concierge Process"
        title={
          <>
            Four steps <span className="text-gold">to the floor.</span>
          </>
        }
        sub="A streamlined concierge coordination flow connecting guests with premium nightlife in Dubai and Abu Dhabi."
        image={images.vip}
      />
      <Section>
        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />
          {steps.map(([t, d], i) => (
            <Reveal
              key={t}
              className={`relative grid gap-6 py-12 md:grid-cols-2 md:gap-20 ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <p className="font-display text-[clamp(6rem,16vw,12rem)] font-extrabold leading-none text-foreground/10 md:text-right">
                0{i + 1}
              </p>
              <div className="self-center">
                <h2 className="text-4xl font-bold md:text-5xl">{t}</h2>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 rounded-sm border border-border bg-card p-6 md:p-8 text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground text-base">
            Important Admission & Reservation Guidelines:
          </p>
          <p className="mt-2">
            Dubai VIP Booking facilitates promotional coordination and table reservation assistance.
            Final admission, door clearance, and seating allocations remain subject to venue
            operator discretion, room capacity, strict dress code adherence, and mandatory 21+
            original physical identification (Emirates ID or passport).
          </p>
        </div>
      </Section>
      <CtaBand
        title={
          <>
            Start your enquiry <span className="text-gold">in one message.</span>
          </>
        }
        message="Hi Dubai VIP Booking, I'd like to enquire about table bookings."
      />
    </>
  );
}
