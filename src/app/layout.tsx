import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Quattrocento, Quattrocento_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { DEFAULT_LOCALE, HTML_LANG, isLocale } from "@/i18n/config";
import { site } from "@/lib/site";

/**
 * Typography is taken from the company's own materials rather than chosen:
 * Quattrocento is the serif used throughout the D’Yvix pitch deck, and
 * Quattrocento Sans is its designed companion. Counted as one superfamily
 * against the two-family budget; JetBrains Mono is the second, carrying the
 * technical rail.
 *
 * All three are self-hosted by next/font at build time — no runtime request
 * to a font CDN, which also keeps the CSP free of a third-party origin. The
 * latin subset covers French accents and typographic spaces.
 */
const quattrocento = Quattrocento({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quattrocento",
  weight: ["400", "700"],
});

const quattrocentoSans = Quattrocento_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quattrocento-sans",
  weight: ["400", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

/** Locale-independent defaults. Titles, descriptions and alternates are set per locale in [lang]. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.legalName,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#161f14" },
  ],
  colorScheme: "light dark",
};

/**
 * Applies the stored theme before first paint to avoid a flash of the wrong
 * palette, and drops the `no-js` class. Kept inline and tiny; it is the only
 * blocking script on the page.
 */
const themeScript = `
(function(){try{
var d=document.documentElement;d.classList.remove('no-js');
var t=localStorage.getItem('dyvix-theme');
var m=window.matchMedia('(prefers-color-scheme: dark)').matches;
if(t==='dark'||(t!=='light'&&m)){d.classList.add('dark')}
}catch(e){}})();
`;

/**
 * The root layout owns <html>, so it owns `lang`. The locale comes from the
 * `x-locale` header set by proxy.ts, because the root layout sits above the
 * [lang] segment and never receives its params — and an unmatched URL, which
 * renders here without [lang] at all, still needs the right language.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  // Set by proxy.ts. Lets the boot script run under a nonce CSP.
  const nonce = requestHeaders.get("x-nonce") ?? undefined;
  const requested = requestHeaders.get("x-locale") ?? DEFAULT_LOCALE;
  const lang = isLocale(requested) ? requested : DEFAULT_LOCALE;

  return (
    <html
      lang={HTML_LANG[lang]}
      className={`${quattrocento.variable} ${quattrocentoSans.variable} ${jetbrains.variable} no-js`}
      suppressHydrationWarning
    >
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
