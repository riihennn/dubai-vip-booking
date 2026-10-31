import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/lib/config";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageHero, Section } from "@/components/site";
import { images } from "@/lib/venues";
import { COOKIE_CONSENT_KEY } from "@/components/cookie-banner";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/cookies")({
  head: () =>
    createSeoMeta({
      title: "Cookie Policy | Dubai VIP Booking",
      description:
        "Cookie Policy for Dubai VIP Booking. Learn how cookies are used for essential site operation, privacy preferences, and optional analytics.",
      path: "/cookies",
    }),
  component: CookiesPage,
});

function CookiesPage() {
  const [currentConsent, setCurrentConsent] = useState<string>("Not yet decided");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === "accepted") setCurrentConsent("Accepted (All cookies enabled)");
      else if (stored === "declined") setCurrentConsent("Essential cookies only");
    } catch (_e) {
      // Storage unavailable in private browsing
    }
  }, []);

  const resetPreferences = () => {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setCurrentConsent("Reset (Reload page to set preferences)");
      window.location.reload();
    } catch (_e) {
      // Storage unavailable in private browsing
    }
  };

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Cookie Policy", path: "/cookies" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="Privacy Controls"
        title={
          <>
            Cookie <span className="text-gold">Policy.</span>
          </>
        }
        sub="Transparency on how Dubai VIP Booking uses cookies and local storage tokens to deliver a smooth experience."
        image={images.yacht}
      />
      <Section className="pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl space-y-10 text-foreground/85 leading-relaxed text-base">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              1. What Are Cookies?
            </h2>
            <p className="mt-3">
              Cookies and browser local storage tokens are small data items placed on your device to
              remember your preferences, support navigation, and ensure website security.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              2. Categories of Cookies We Use
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-sm border border-border bg-card p-5">
                <p className="font-bold text-foreground">
                  A. Strictly Necessary / Essential Cookies
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Required for core functionality, such as storing your dark/light theme preference
                  (<code>dubai-vip-theme</code>) and saving your cookie consent choices (
                  <code>{COOKIE_CONSENT_KEY}</code>). These do not collect identifiable marketing
                  data.
                </p>
              </div>

              <div className="rounded-sm border border-border bg-card p-5">
                <p className="font-bold text-foreground">B. Marketing Attribution & UTM Storage</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  When you visit via a marketing campaign or partner link, UTM parameters are
                  temporarily saved in your browser session (<code>dvb_utm_params</code>) so your
                  enquiry can accurately reflect how you discovered us on WhatsApp.
                </p>
              </div>

              <div className="rounded-sm border border-border bg-card p-5">
                <p className="font-bold text-foreground">
                  C. Optional Analytical & Advertising Cookies
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Third-party analytics (such as Google Analytics or Meta Pixel) help us understand
                  visitor trends and engagement. These scripts are strictly disabled unless you
                  grant explicit consent via our cookie banner.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              3. Managing Your Preferences
            </h2>
            <p className="mt-3">
              Your current status on this device is:{" "}
              <strong className="text-primary">{currentConsent}</strong>
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={resetPreferences}
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Reset Cookie Preferences
              </button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              4. Questions & Contact
            </h2>
            <p className="mt-3">
              If you have inquiries regarding our cookie practices, reach our concierge on WhatsApp
              at <strong>{brand.phone}</strong>. Dubai VIP Booking is operated by WaltX Limited
              (Licence No. MC 14979).
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
