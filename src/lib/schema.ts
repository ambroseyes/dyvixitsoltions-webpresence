import { HTML_LANG, localePath, type Locale } from "@/i18n/config";
import { getCompany } from "@/content/company";
import { getExpertise, getExpertiseBySlug } from "@/content/expertise";
import type { FAQ, Product } from "@/content/types";
import { FOUNDED_YEAR, founder, site } from "./site";

const BASE = site.url;

/** One organisation, whatever the page language: the @id never varies. */
export const ORG_ID = `${BASE}/#organization`;

const url = (lang: Locale, path: string) => `${BASE}${localePath(lang, path)}`;
const siteId = (lang: Locale) => `${url(lang, "/")}#website`;

const areaServed = (lang: Locale) => {
  const names = getCompany(lang).areaServed;
  return site.areaServed.map((a, i) => ({ "@type": a.type, name: names[i] }));
};

/**
 * Structured data (§59), per locale.
 *
 * Deliberately NOT emitted:
 *  - LocalBusiness — requires a confirmed postal address. site.address.street
 *    is null, so emitting it would mean inventing one.
 *  - Review / AggregateRating — no legitimate reviews exist.
 *  - ISO/IEC 27001 as a credential — the company is aligned to the standard,
 *    not certified against it. See hasCredential below.
 */
export function organizationSchema(lang: Locale) {
  const company = getCompany(lang);
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: [...site.alternateNames],
    url: BASE,
    description: company.entityStatement,
    slogan: company.tagline,
    foundingDate: String(FOUNDED_YEAR),
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: company.founder.role,
      description: company.founder.title,
    },
    numberOfEmployees: { "@type": "QuantitativeValue", value: company.team.length + 1 },
    /**
     * Only certified standards become credentials. A schema credential is
     * exactly the assertion a procurement process would check.
     */
    hasCredential: company.standards
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
      address: { "@type": "PostalAddress", addressLocality: city, addressCountry: site.address.country },
    })),
    areaServed: areaServed(lang),
    knowsAbout: [...company.knowsAbout],
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
    makesOffer: getExpertise(lang).map((e) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: e.name,
        description: e.definition,
        url: url(lang, `/expertise/${e.slug}`),
      },
    })),
  };
}

export function websiteSchema(lang: Locale) {
  return {
    "@type": "WebSite",
    "@id": siteId(lang),
    url: url(lang, "/"),
    name: site.legalName,
    description: getCompany(lang).entityStatement,
    publisher: { "@id": ORG_ID },
    inLanguage: HTML_LANG[lang],
  };
}

/** Service node for an expertise domain, linked back to the organisation. */
export function serviceSchema(lang: Locale, slug: string) {
  const e = getExpertiseBySlug(lang, slug);
  if (!e) return null;
  const pageUrl = url(lang, `/expertise/${e.slug}`);
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: e.name,
    serviceType: e.name,
    description: e.definition,
    url: pageUrl,
    provider: { "@id": ORG_ID },
    areaServed: areaServed(lang),
    audience: { "@type": "Audience", audienceType: e.whoNeedsIt[0] },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: e.name,
      itemListElement: e.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.description },
      })),
    },
  };
}

/**
 * A D’Yvix platform. No offers or ratings: none are published, and a node
 * that implied either would be an unsupported claim.
 */
export function softwareSchema(lang: Locale, product: Product) {
  if (!product.description) return null;
  const pageUrl = url(lang, `/solutions/${product.slug}`);
  return {
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    name: product.name,
    description: product.description,
    applicationCategory: "BusinessApplication",
    url: pageUrl,
    creator: { "@id": ORG_ID },
    inLanguage: HTML_LANG[lang],
  };
}

/** `trail` paths are public, already-localised paths. */
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

export function articleSchema(
  lang: Locale,
  a: {
    title: string;
    description: string;
    slug: string;
    published: string;
    updated?: string;
    authorName: string;
    /** Public, already-localised path. */
    authorPath: string;
  },
) {
  const pageUrl = url(lang, `/insights/${a.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: a.title,
    description: a.description,
    url: pageUrl,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    author: { "@type": "Organization", name: a.authorName, url: `${BASE}${a.authorPath}` },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": siteId(lang) },
    inLanguage: HTML_LANG[lang],
  };
}

/**
 * Wraps nodes into a single @graph. One script tag per page keeps node
 * identity consistent and avoids duplicate @id collisions.
 */
export function graph(...nodes: (object | null)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
