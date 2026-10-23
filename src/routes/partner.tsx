import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/venues";
import { PageHero, Reveal, Section, WhatsAppButton, meta } from "@/components/site";

export const Route = createFileRoute("/partner")({
  head: () => meta("Partner With Dubai VIP Booking — Venues & Promoters", "Fill your best tables with qualified guests. Partner with Dubai's premium nightlife concierge."),
  component: Partner,
});

function Partner() {
  return (
    <>
      <PageHero eyebrow="For venues & promoters" title={<>Fill the room <span className="text-gold">with the right crowd.</span></>} image={images.supper} />
      <Section>
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          {[["12k+", "Guests hosted yearly (demo)"], ["6", "Demo partner venues"], ["< 5 min", "Average reply time (demo)"]].map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="bg-background p-10">
              <p className="font-display text-6xl font-extrabold text-gold">{n}</p>
              <p className="mt-3 text-muted-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="display-lg">Why partner.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-8">
            {[["Qualified demand", "High-spend groups, tourists and residents booking tables, not just entry."], ["Brand-safe", "Curated presentation alongside the region's most respected venues."], ["Zero friction", "We handle enquiries, confirmations and reminders over WhatsApp."]].map(([t, d]) => (
              <div key={t} className="border-b border-border pb-8"><h3 className="text-2xl font-bold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
            ))}
            <WhatsAppButton size="lg" message="Hi Dubai VIP Booking, I'd like to discuss a venue partnership.">Talk partnerships</WhatsAppButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
