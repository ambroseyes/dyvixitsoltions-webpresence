import { site, knowsAbout, founder, standards, FOUNDED_YEAR, team } from "./site";
import { solutions } from "@/content/solutions";
import type { FAQ } from "@/content/types";

const BASE = site.url;
const ORG_ID = `${BASE}/#organization`;
const SITE_ID = `${BASE}/#website`;

/**
 * Structured data (§59).
 *
 * Deliberately NOT emitted:
 *  - LocalBusiness — requires a confirmed postal address. site.address.street
 *    is null, so emitting it would mean inventing one.
 *  - Review / AggregateRating — no legitimate reviews exist. The previous
 *    site's testimonials were lorem-ipsum placeholders and were discarded.
 *  - ISO/IEC 27001 as a credential — the company describes itself as aligned
 *    to the standard, not certified against it. See hasCredential below.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: [...site.alternateNames],
    url: BASE,
    description: site.entityStatement,
    slogan: site.tagline,
    foundingDate: String(FOUNDED_YEAR),
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      description: founder.title,
    },
    numberOfEmployees: { "@type": "QuantitativeValue", value: team.length + 1 },
    /**
     * Only standards that are actually certified are emitted as credentials.
     * ISO/IEC 27001 is "aligned", not certified, so it is described in prose
     * on the site and deliberately NOT claimed here — a schema credential is
     * exactly the assertion a procurement process would check.
     */
    hasCredential: standards
      .filter((s) => s.qualifier === "certified")
      .map((s) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: s.name,
      })),
    logo: { "@type": "ImageObject", url: `${BASE}/icon.svg`, caption: `${site.legalName} logo` },
    sameAs: site.social.map((s) => s.url),
    email: site.contact.email,
    telephone: site.contact.phone,
    // Locality only — no street address is claimed.
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    location: [site.address.locality, site.address.secondaryLocality].map((city) => ({
      "@type": "Place",
      name: city,
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: site.address.country,
      },
    })),
    areaServed: site.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    knowsAbout: [...knowsAbout],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.contact.email,
        telephone: site.contact.phone,
        areaServed: ["CM", "Africa"],
        availableLanguage: ["en", "fr"],
      },
    ],
    // Explicit service catalogue — makes the org -> service edge unambiguous.
    makesOffer: solutions.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.definition,
        url: `${BASE}/solutions/${s.slug}`,
      },
    })),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: BASE,
    name: site.legalName,
    description: site.entityStatement,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** Service node linked back to the org so the provider edge is explicit. */
export function serviceSchema(slug: string) {
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@type": "Service",
    "@id": `${BASE}/solutions/${s.slug}/#service`,
    name: s.name,
    serviceType: s.name,
    description: s.definition,
    url: `${BASE}/solutions/${s.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    audience: { "@type": "Audience", audienceType: s.whoNeedsIt[0] },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.name} capabilities`,
      itemListElement: s.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.description },
      })),
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${BASE}${t.path}`,
    })),
  };
}

/** Only call where the FAQ is genuinely present in the rendered page (§59). */
export function faqSchema(faqs: FAQ[]) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  published: string;
  updated?: string;
  authorName: string;
  authorPath: string;
}) {
  return {
    "@type": "BlogPosting",
    "@id": `${BASE}/insights/${a.slug}/#article`,
    headline: a.title,
    description: a.description,
    url: `${BASE}/insights/${a.slug}`,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    author: { "@type": "Person", name: a.authorName, url: `${BASE}${a.authorPath}` },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en",
  };
}

/**
 * Wraps nodes into a single @graph. One script tag per page keeps node
 * identity consistent and avoids duplicate @id collisions.
 */
export function graph(...nodes: (object | null)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
