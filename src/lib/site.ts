/**
 * Locale-independent facts about the D’Yvix entity.
 *
 * GEO requirement (§57 Entity Consistency): every surface that states a fact
 * about the organisation reads from here or from content/company — nothing is
 * retyped. Prose (entity statement, tagline, bios, timeline) is per-locale in
 * content/company; this file holds only what is identical in every language.
 *
 * SOURCES:
 *   [CP] Corporate Technical Profile (5pp, partner review)
 *   [PD] D’Yvix / DroneNet Pitch Deck (12 slides)
 *   [LS] Recovered from the live site
 *   [BN] Back-Node repository (README, service layout, manifests)
 * A fact with no source is not published.
 */

/** [CP: "established in 2012", PD: "Since 2012"] */
export const FOUNDED_YEAR = 2012;

/** Derived, never a hardcoded number that goes stale. */
export const yearsInOperation = (now: Date = new Date()) => now.getFullYear() - FOUNDED_YEAR;

export const site = {
  legalName: "D’Yvix IT Solutions",
  shortName: "D’Yvix",
  alternateNames: ["DYVIX", "D’Yvix", "D’Yvix Solutions", "D’Yvix IT Solutions"],
  url: "https://dyvixitsolutions.com",

  contact: {
    email: "contact@dyvixitsolutions.com",
    phone: "+237674294455",
    phoneDisplay: "+237 674 29 44 55",
    whatsapp: "https://wa.me/237674294455",
  },

  /**
   * [CP, PD: "Yaoundé & Douala, Cameroon"]. No street address appears in any
   * source, so LocalBusiness schema is withheld: a fabricated postal address
   * is exactly the unsupported claim §59 forbids.
   */
  address: {
    locality: "Yaoundé",
    secondaryLocality: "Douala",
    region: "Centre",
    country: "CM",
    street: null as string | null,
    postalCode: null as string | null,
  },

  /** Names are localised in content/company, in this order. */
  areaServed: [
    { id: "cameroon", type: "Country" },
    { id: "central-africa", type: "Place" },
    { id: "africa", type: "Place" },
  ],

  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/dyvix-itsolutions/" },
    { label: "Facebook", url: "https://www.facebook.com/dyvixitsolutions" },
    { label: "X", url: "https://twitter.com/d_yvix" },
  ],
  twitterHandle: "@d_yvix",
} as const;

/** [CP] A real, named person — §66 forbids inventing experts. */
export const founder = { name: "Ambrose-Yves Touko Ngaunji", since: 2012 } as const;

/**
 * [CP page 5] Technology partnerships. Brand names, identical in every
 * locale. Listed on the About page only — never rendered as badges or tiers.
 */
export const partnerships = [
  "Microsoft",
  "Cisco",
  "Fortinet",
  "Google Cloud",
  "AWS",
  "Oracle",
  "Kaspersky",
  "OVH",
] as const;
