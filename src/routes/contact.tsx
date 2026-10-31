import { createFileRoute } from "@tanstack/react-router";
import { Clock, Globe, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { brand, images } from "@/lib/venues";
import { PageHero, Reveal, Section, WhatsAppButton } from "@/components/site";
import { BookingForm } from "@/components/booking-form";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/contact")({
  head: () =>
    createSeoMeta({
      title: "Contact Dubai VIP Booking — WhatsApp Concierge",
      description:
        "Contact the Dubai VIP Booking concierge on WhatsApp (+971 50 471 3452) for VIP table reservations, bottle service, and guestlists in Dubai and Abu Dhabi.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const items = [
    {
      Icon: MessageCircle,
      label: "Official WhatsApp",
      value: brand.phone,
      sub: "Primary Concierge Channel",
      href: `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Hi Dubai VIP Booking, I'd like to enquire about table reservations.")}`,
      external: true,
    },
    {
      Icon: Clock,
      label: "Concierge Operating Hours",
      value: brand.hours,
      sub: "Available 7 days a week",
      href: "#",
      external: false,
    },
    {
      Icon: ShieldCheck,
      label: "Licensed Operator",
      value: "WaltX Limited",
      sub: "Masdar City Free Zone (Licence No. MC 14979)",
      href: "/terms",
      external: false,
    },
    ...(brand.email
      ? [
          {
            Icon: Mail,
            label: "Official Email",
            value: brand.email,
            sub: "Corporate inquiries",
            href: `mailto:${brand.email}`,
            external: false,
          },
        ]
      : [
          {
            Icon: Globe,
            label: "Official Website",
            value: brand.website,
            sub: "dubaivipbooking.com",
            href: "/",
            external: false,
          },
        ]),
  ];

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            Say the word. <span className="text-gold">We'll handle the rest.</span>
          </>
        }
        sub="Reach out to our concierge team directly on WhatsApp for VIP table reservations, guestlist requests, or special arrangements."
        image={images.yacht}
      />
      <Section className="pt-12 md:pt-16">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Direct Contact Channels</p>
            <h2 className="display-lg mt-3">Connect in seconds.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We operate via WhatsApp for immediate, flexible table booking coordination. Whether
              planning days in advance or organizing a same-night celebration, reach our team
              directly below.
            </p>

            <div className="mt-8 space-y-4">
              {items.map(({ Icon, label, value, sub, href, external }) => (
                <Reveal key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 rounded-sm border border-border p-6 transition-all duration-300 hover:border-primary hover:bg-card"
                  >
                    <div className="grid size-12 shrink-0 place-items-center rounded-full bg-background border border-border group-hover:border-primary">
                      <Icon className="size-5 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <p className="eyebrow text-xs">{label}</p>
                      <p className="mt-0.5 text-lg font-bold text-foreground">{value}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <div className="mt-8">
              <WhatsAppButton size="lg" className="w-full sm:w-auto">
                Open WhatsApp Chat
              </WhatsAppButton>
            </div>
          </div>

          <div>
            <BookingForm
              title="Send a Booking Enquiry"
              subtitle="Submit your group details to pre-fill your concierge chat on WhatsApp."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
