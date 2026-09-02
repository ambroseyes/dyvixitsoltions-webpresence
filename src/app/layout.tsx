import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Quattrocento, Quattrocento_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Typography is taken from the company's own materials rather than chosen:
 * Quattrocento is the serif used throughout the D’Yvix pitch deck, and
 * Quattrocento Sans is its designed companion. Counted as one superfamily
 * against the two-family budget; JetBrains Mono is the second, carrying the
 * technical rail.
 *
 * All three are self-hosted by next/font at build time — no runtime request
 * to a font CDN, which also keeps the CSP free of a third-party origin.
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMeta({
    title: `${site.legalName} — ${site.tagline}`,
    description: site.entityStatement,
    path: "/",
  }),
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Set by middleware.ts. Lets the boot script run under a nonce CSP.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${quattrocento.variable} ${quattrocentoSans.variable} ${jetbrains.variable} no-js`}
      suppressHydrationWarning
    >
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-toast) focus:rounded-(--radius-sm) focus:border focus:border-primary focus:bg-surface focus:px-4 focus:py-2.5 focus:text-(length:--text-sm) focus:font-medium"
        >
          Skip to main content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
