import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CtaBand, PageHero, Section, meta } from "@/components/site";
import { cn } from "@/lib/utils";
import { images } from "@/lib/venues";

export const Route = createFileRoute("/faq")({
  head: () => meta("FAQ — Dubai VIP Booking Dubai Nightlife Concierge", "Answers on minimum spends, dress codes, guestlists, age limits and booking VIP tables in Dubai and Abu Dhabi."),
  component: Faq,
});

const faqs = [
  ["Do you charge a booking fee?", "No. You pay the venue's minimum spend directly on the night. Our service is free."],
  ["What is a minimum spend?", "The amount your table must spend on food and drinks. It varies by venue, night and table position."],
  ["What's the age limit?", "21+ for all venues. Bring a valid passport or Emirates ID."],
  ["What should I wear?", "Each venue lists its dress code. As a rule: elegant, no sportswear, no flip-flops at night."],
  ["Can you arrange birthdays?", "Yes — sparklers, cakes, custom signage and bottle parades on request."],
  ["How fast do you reply?", "Usually within minutes on WhatsApp during operating hours, daily 6:00 PM – 2:00 AM (sample hours)."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero eyebrow="Good to know" title={<>Questions, <span className="text-gold">answered.</span></>} image={images.beach} />
      <Section className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-7 text-left">
                <span className={cn("text-xl font-semibold transition-colors md:text-2xl", open === i && "text-primary")}>{q}</span>
                <Plus className={cn("size-6 shrink-0 transition-transform duration-500", open === i && "rotate-45 text-primary")} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-7 text-lg text-muted-foreground">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title={<>Still curious? <span className="text-gold">Just ask.</span></>} />
    </>
  );
}
