import { useEffect } from "react";
import { COOKIE_CONSENT_KEY } from "./cookie-banner";

// Public environment variables (safe for browser exposure)
const GA_ID = import.meta.env["VITE_GA_ID"] as string | undefined;
const PLAUSIBLE_DOMAIN = import.meta.env["VITE_PLAUSIBLE_DOMAIN"] as string | undefined;
const META_PIXEL_ID = import.meta.env["VITE_META_PIXEL_ID"] as string | undefined;

export function Analytics() {
  useEffect(() => {
    // 1. Google Analytics 4
    if (GA_ID && typeof window !== "undefined") {
      const existing = document.getElementById("ga4-script");
      if (!existing) {
        const s = document.createElement("script");
        s.id = "ga4-script";
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s);

        const inline = document.createElement("script");
        inline.id = "ga4-inline";
        inline.text = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `;
        document.head.appendChild(inline);
      }
    }

    // 2. Plausible Analytics
    if (PLAUSIBLE_DOMAIN && typeof window !== "undefined") {
      const existing = document.getElementById("plausible-script");
      if (!existing) {
        const s = document.createElement("script");
        s.id = "plausible-script";
        s.defer = true;
        s.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
        s.src = "https://plausible.io/js/script.js";
        document.head.appendChild(s);
      }
    }

    // 3. Meta Pixel (requires explicit cookie consent)
    const initMetaPixel = () => {
      if (!META_PIXEL_ID || typeof window === "undefined") return;
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent !== "accepted") return;

      const existing = document.getElementById("meta-pixel-script");
      if (existing) return;

      const s = document.createElement("script");
      s.id = "meta-pixel-script";
      s.text = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(s);
    };

    initMetaPixel();

    const handleConsent = (e: Event) => {
      const detail = (e as CustomEvent<{ accepted: boolean }>).detail;
      if (detail?.accepted) {
        initMetaPixel();
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsent);
    return () => window.removeEventListener("cookie-consent-updated", handleConsent);
  }, []);

  return null;
}
