import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/venues";
import { CtaBand, PageHero, Reveal, Section, meta } from "@/components/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => meta("How It Works — Dubai VIP Booking", "Four steps from WhatsApp message to the best table in the room. No booking fees, daily concierge."),
  component: How,
});

const steps = [
  ["Message us", "Tell us the city, date, group size and the kind of night you want."],
  ["Get options", "Within minutes you'll receive hand-picked venues, table positions and minimum spends."],
  ["Confirm", "Lock it in. The venue holds your table under your name — no fees from us."],
  ["Arrive", "Skip the line. A host walks you to your table and the night begins."],
];

function How() {
  return (
    <>
      <PageHero eyebrow="The process" title={<>Four steps <span className="text-gold">to the front.</span></>} image={images.vip} />
      <Section>
        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />
          {steps.map(([t, d], i) => (
            <Reveal key={t} className={`relative grid gap-6 py-12 md:grid-cols-2 md:gap-20 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <p className="font-display text-[clamp(6rem,16vw,12rem)] font-extrabold leading-none text-foreground/10 md:text-right">0{i + 1}</p>
              <div className="self-center">
                <h2 className="text-4xl font-bold md:text-5xl">{t}</h2>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand title={<>Step one <span className="text-gold">takes ten seconds.</span></>} />
    </>
  );
}
