import { createFileRoute } from "@tanstack/react-router";
import { Clock, Globe, Mail, MessageCircle } from "lucide-react";
import { brand, images, waLink } from "@/lib/venues";
import { PageHero, Reveal, Section, WhatsAppButton, meta } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact Dubai VIP Booking — WhatsApp Concierge", "Reach the Dubai VIP Booking concierge on WhatsApp, or email for VIP tables in Dubai and Abu Dhabi."),
  component: Contact,
});

function Contact() {
  const items = [
    [MessageCircle, "WhatsApp", brand.phone, waLink("Hi Dubai VIP Booking!")],
    [Mail, "Email", brand.email, `mailto:${brand.email}`],
    [Globe, "Website", brand.website, "#"],
    [Clock, "Concierge Hours", brand.hours, "#"],
  ] as const;
  return (
    <>
      <PageHero eyebrow="Get in touch" title={<>Say the word. <span className="text-gold">We'll do the rest.</span></>} image={images.yacht} />
      <Section className="pt-12 md:pt-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map(([I, l, v, href], i) => (
            <Reveal key={l} delay={i * 0.06}>
              <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-6 rounded-sm border border-border p-8 transition-all duration-500 hover:border-primary hover:bg-card">
                <I className="size-7 text-primary transition-transform group-hover:scale-125" />
                <div><p className="eyebrow">{l}</p><p className="mt-1 text-xl font-semibold md:text-2xl">{v}</p></div>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center"><WhatsAppButton size="lg">Start a chat now</WhatsAppButton></div>
      </Section>
    </>
  );
}
