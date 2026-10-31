import { useState, useId } from "react";
import { MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { venues } from "@/lib/venues";
import { formatBookingEnquiryMessage, type BookingEnquiry } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  initialCity?: "dubai" | "abu-dhabi";
  initialVenue?: string;
  initialBudget?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  partySize?: string;
  venue?: string;
  budget?: string;
}

export function BookingForm({
  initialCity = "dubai",
  initialVenue,
  initialBudget,
  className,
  title = "Reserve a Table",
  subtitle = "Complete your details to start your enquiry with our concierge on WhatsApp.",
  compact = false,
}: BookingFormProps) {
  const [city, setCity] = useState<"dubai" | "abu-dhabi">(initialCity);
  const availableVenues = venues.filter((v) => v.city === city);

  const [form, setForm] = useState<BookingEnquiry>({
    name: "",
    phone: "",
    date: "",
    partySize: "4",
    city: initialCity === "abu-dhabi" ? "Abu Dhabi" : "Dubai",
    venue: initialVenue || availableVenues[0]?.name || "BLING",
    budget: initialBudget || "Standard Table (Spend on enquiry)",
    notes: "",
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const idPrefix = useId();

  const handleCityChange = (newCity: "dubai" | "abu-dhabi") => {
    setCity(newCity);
    const newVenues = venues.filter((v) => v.city === newCity);
    setForm((prev) => ({
      ...prev,
      city: newCity === "abu-dhabi" ? "Abu Dhabi" : "Dubai",
      venue: newVenues[0]?.name || "",
    }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }

    const phoneClean = form.phone.replace(/[^0-9]/g, "");
    if (!phoneClean || phoneClean.length < 7) {
      errs.phone = "Please enter a valid mobile number with country code.";
    }

    if (!form.date) {
      errs.date = "Please select your planned date.";
    }

    const partyNum = Number(form.partySize);
    if (!partyNum || partyNum < 1 || partyNum > 50) {
      errs.partySize = "Party size must be between 1 and 50 guests.";
    }

    if (!form.venue.trim()) {
      errs.venue = "Please select a venue.";
    }

    if (!form.budget.trim()) {
      errs.budget = "Please select your preferred budget.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { refCode, url } = formatBookingEnquiryMessage(form);
    setSubmittedRef(refCode);

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const fieldClass = (hasError: boolean) =>
    cn(
      "w-full rounded-sm border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground",
      hasError
        ? "border-destructive focus:ring-1 focus:ring-destructive"
        : "border-border hover:border-foreground/30 focus:border-primary focus:ring-1 focus:ring-primary",
    );

  const budgetOptions = [
    "Standard Table (Spend on enquiry)",
    "Premium Booth (Elevated view)",
    "Signature VIP (Centre-stage / DJ-side)",
    "Complimentary Guestlist (Subject to door)",
    "Custom budget / Corporate group",
  ];

  return (
    <div className={cn("rounded-sm border border-border bg-card p-6 md:p-8", className)}>
      {title && (
        <div className="mb-6">
          <p className="eyebrow">Direct Concierge Enquiry</p>
          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{title}</h3>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {submittedRef && (
        <div className="mb-6 rounded-sm border border-primary/40 bg-primary/10 p-4 text-sm text-foreground">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>Enquiry initiated for {form.venue}!</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Reference code:{" "}
            <span className="font-mono font-bold text-foreground">{submittedRef}</span>. If WhatsApp
            didn't open automatically,{" "}
            <button
              type="button"
              onClick={() => {
                const { url } = formatBookingEnquiryMessage(form, submittedRef);
                window.open(url, "_blank", "noopener,noreferrer");
              }}
              className="text-primary underline hover:text-primary/80"
            >
              click here to continue
            </button>
            .
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* City selection */}
        <div>
          <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-city`}>
            City
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["dubai", "abu-dhabi"] as const).map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => handleCityChange(c)}
                className={cn(
                  "rounded-sm border py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                  city === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground/80 hover:border-foreground/30",
                )}
              >
                {c === "dubai" ? "Dubai" : "Abu Dhabi"}
              </button>
            ))}
          </div>
        </div>

        {/* Venue selection */}
        <div>
          <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-venue`}>
            Venue *
          </label>
          <select
            id={`${idPrefix}-venue`}
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className={fieldClass(!!errors.venue)}
          >
            {availableVenues.map((v) => (
              <option key={v.slug} value={v.name} className="bg-card text-foreground">
                {v.name} ({v.area})
              </option>
            ))}
          </select>
          {errors.venue && <p className="mt-1 text-xs text-destructive">{errors.venue}</p>}
        </div>

        {/* Name and Mobile */}
        <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
          <div>
            <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-name`}>
              Full Name *
            </label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              placeholder="e.g. Alexander Vance"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={fieldClass(!!errors.name)}
              required
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-phone`}>
              Mobile / WhatsApp *
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              placeholder="+971 50 123 4567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={fieldClass(!!errors.phone)}
              required
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>

        {/* Date and Party Size */}
        <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
          <div>
            <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-date`}>
              Date *
            </label>
            <input
              id={`${idPrefix}-date`}
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={fieldClass(!!errors.date)}
              required
            />
            {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
          </div>

          <div>
            <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-party`}>
              Party Size *
            </label>
            <input
              id={`${idPrefix}-party`}
              type="number"
              min={1}
              max={50}
              placeholder="Number of guests"
              value={form.partySize}
              onChange={(e) => setForm({ ...form, partySize: e.target.value })}
              className={fieldClass(!!errors.partySize)}
              required
            />
            {errors.partySize && (
              <p className="mt-1 text-xs text-destructive">{errors.partySize}</p>
            )}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-budget`}>
            Budget / Table Tier *
          </label>
          <select
            id={`${idPrefix}-budget`}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className={fieldClass(!!errors.budget)}
          >
            {budgetOptions.map((b) => (
              <option key={b} value={b} className="bg-card text-foreground">
                {b}
              </option>
            ))}
          </select>
          {errors.budget && <p className="mt-1 text-xs text-destructive">{errors.budget}</p>}
        </div>

        {/* Notes (optional) */}
        {!compact && (
          <div>
            <label className="eyebrow mb-2 block" htmlFor={`${idPrefix}-notes`}>
              Occasion / Special Requests (Optional)
            </label>
            <input
              id={`${idPrefix}-notes`}
              type="text"
              placeholder="e.g. Birthday celebration, DJ booth view"
              value={form.notes || ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={fieldClass(false)}
            />
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-4 font-semibold text-whatsapp-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            <MessageCircle className="size-5" />
            <span>Send Enquiry on WhatsApp</span>
          </button>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <AlertCircle className="size-3.5 shrink-0 text-muted-foreground" />
          <span>Final table spend & admission are subject to venue confirmation & 21+ ID.</span>
        </p>
      </form>
    </div>
  );
}
