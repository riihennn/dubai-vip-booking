import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, X } from "lucide-react";

export const COOKIE_CONSENT_KEY = "dvb_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Show after a brief delay so it doesn't block initial page render
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch (_e) {
      // Storage unavailable
    }
    return undefined;
  }, []);

  const handleChoice = (accepted: boolean) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? "accepted" : "declined");
      window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: { accepted } }));
    } catch (_e) {
      // Ignore localStorage errors in private browsing modes
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-sm border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-md md:left-8 md:right-auto"
    >
      <div className="flex items-start gap-4">
        <ShieldCheck className="size-6 shrink-0 text-primary mt-0.5" />
        <div className="flex-1 text-xs leading-relaxed text-foreground/85">
          <p className="font-semibold text-foreground text-sm">Privacy & Cookie Preferences</p>
          <p className="mt-1">
            We use essential cookies to maintain theme and site functionality. With your consent, we
            may also use analytical cookies to improve our concierge service. Review our{" "}
            <Link to="/cookies" className="text-primary underline hover:text-primary/80">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary underline hover:text-primary/80">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleChoice(true)}
              className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => handleChoice(false)}
              className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:border-foreground/40 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close cookie banner"
          onClick={() => handleChoice(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
