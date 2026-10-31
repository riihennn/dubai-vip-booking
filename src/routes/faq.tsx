import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CtaBand, PageHero, Section } from "@/components/site";
import { cn } from "@/lib/utils";
import { images } from "@/lib/venues";
import { createSeoMeta, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/faq")({
  head: () =>
    createSeoMeta({
      title: "Frequently Asked Questions | Dubai VIP Booking",
      description:
        "Frequently asked questions on minimum spends, dress codes, 21+ identification requirements, and table booking in Dubai and Abu Dhabi.",
      path: "/faq",
    }),
  component: Faq,
});

const faqs: [string, string][] = [
  [
    "How does payment work for VIP table bookings?",
    "Your table's minimum spend is settled directly with the venue operator on the night of your visit. Dubai VIP Booking facilitates concierge coordination and reservation placement.",
  ],
  [
    "What is a minimum spend?",
    "A minimum spend is the agreed minimum amount your group must spend on beverages and dining during your table booking. It is set independently by venue management according to the night, performer, and table position.",
  ],
  [
    "What is the statutory age requirement?",
    "The legal age for nightlife venues and licensed alcohol consumption across Dubai and Abu Dhabi is strictly 21+. All venues require a valid physical Emirates ID or original passport at the door.",
  ],
  [
    "What is the venue dress code?",
    "Most premium nightclubs and evening lounges enforce a smart elegant dress code (no sportswear, beach sandals, or shorts after dark). Day beach clubs permit luxury swimwear by the pool but require stylish cover-ups when entering dining or indoor club areas.",
  ],
  [
    "Is venue admission or table reservation guaranteed?",
    "No concierge service can guarantee door admission. All admissions, table allocations, and entry decisions remain at the sole discretion of venue management and door hosts, subject to dress code adherence, capacity, and valid 21+ identification.",
  ],
  [
    "Can you arrange special celebrations or birthdays?",
    "Yes. We coordinate custom arrangements such as sparkler bottle presentations, birthday cakes, customized table placement, and chauffeur transport upon request.",
  ],
  [
    "What are your concierge operating hours?",
    "Our WhatsApp concierge is active daily from 6:00 PM to 2:00 AM Gulf Standard Time (GST). Messages sent during daytime hours are queued and addressed promptly upon opening.",
  ],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <JsonLd schema={faqSchema} />

      <PageHero
        eyebrow="Help & Information"
        title={
          <>
            Questions, <span className="text-gold">answered.</span>
          </>
        }
        sub="Everything you need to know about table reservations, door policies, dress codes, and minimum spends in the UAE."
        image={images.beach}
      />
      <Section className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
                aria-expanded={open === i}
              >
                <span
                  className={cn(
                    "text-xl font-semibold transition-colors md:text-2xl",
                    open === i && "text-primary",
                  )}
                >
                  {q}
                </span>
                <Plus
                  className={cn(
                    "size-6 shrink-0 transition-transform duration-500",
                    open === i && "rotate-45 text-primary",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 text-lg text-muted-foreground leading-relaxed">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand
        title={
          <>
            Still have questions? <span className="text-gold">Ask on WhatsApp.</span>
          </>
        }
        message="Hi Dubai VIP Booking, I have a question about booking a VIP table."
      />
    </>
  );
}
