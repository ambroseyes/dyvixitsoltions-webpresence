/**
 * Single source of truth for the D’Yvix entity.
 *
 * GEO requirement (§57 Entity Consistency): every surface that states a fact
 * about the organisation — footer, About page, Organization schema, contact
 * page, OG tags — reads from here. Nothing about the company is retyped.
 *
 * SOURCES for everything below:
 *   [CP] Corporate Technical Profile (Touko Ngaunji, 5pp, partner review)
 *   [PD] D’Yvix / DroneNet Pitch Deck (12 slides)
 *   [LS] Recovered from the live site
 * A fact with no source is not published.
 */

export const VERIFICATION = {
  verified: "verified",
  placeholder: "placeholder",
} as const;

export type Verification = (typeof VERIFICATION)[keyof typeof VERIFICATION];

/** Company founding year [CP: "established in 2012", PD: "Since 2012"]. */
export const FOUNDED_YEAR = 2012;

/** Years in operation, derived — never a hardcoded number that goes stale. */
export const yearsInOperation = () => new Date().getFullYear() - FOUNDED_YEAR;

export const site = {
  legalName: "D’Yvix IT Solutions",
  shortName: "D’Yvix",
  alternateNames: ["DYVIX", "D’Yvix", "D’Yvix Solutions", "D’Yvix IT Solutions"],

  url: "https://dyvixitsolutions.com",

  /**
   * The single canonical sentence about D’Yvix (§79 AI Citability).
   * This exact string appears in the DOM, in Organization schema and in the
   * meta description, so extraction is unambiguous.
   */
  entityStatement:
    "D’Yvix IT Solutions is an IT engineering company founded in 2012 in Yaoundé, Cameroon, delivering software engineering, infrastructure and cloud, cybersecurity, data and document management, applied AI and managed services to government, diplomatic, international and private-sector clients across Central Africa.",

  tagline: "Fourteen years of engineering discipline, built in Central Africa",

  description:
    "We design, build, secure and operate the infrastructure, software and data systems behind institutions that cannot afford for them to fail.",

  contact: {
    email: "contact@dyvixitsolutions.com",
    phone: "+237674294455",
    phoneDisplay: "+237 674 29 44 55",
    whatsapp: "https://wa.me/237674294455",
    verification: VERIFICATION.verified,
  },

  /**
   * Two cities of operation [CP, PD: "Yaoundé & Douala, Cameroon"].
   *
   * PLACEHOLDER — no street address is published in any source, so
   * LocalBusiness schema is still withheld: a fabricated postal address is
   * exactly the unsupported claim §59 forbids. Organization schema is used.
   */
  address: {
    locality: "Yaoundé",
    secondaryLocality: "Douala",
    region: "Centre",
    country: "CM",
    countryName: "Cameroon",
    street: null as string | null,
    postalCode: null as string | null,
    verification: VERIFICATION.placeholder,
  },

  areaServed: [
    { name: "Cameroon", type: "Country" as const },
    { name: "Central Africa", type: "Place" as const },
    { name: "Africa", type: "Place" as const },
  ],

  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/dyvix-itsolutions/" },
    { label: "Facebook", url: "https://www.facebook.com/dyvixitsolutions" },
    { label: "X", url: "https://twitter.com/d_yvix" },
  ],

  locales: {
    default: "en",
    supported: ["en", "fr"] as const,
  },
} as const;

/**
 * Founder [CP]. A real, named person — §66 forbids inventing experts, and
 * this one is documented across both source files.
 */
export const founder = {
  name: "Ambrose-Yves Touko Ngaunji",
  role: "Founder & General Manager",
  title: "Infrastructure & Systems Engineer",
  since: 2012,
  experienceYears: 14,
  bio: "Infrastructure and systems engineer with over fourteen years of hands-on experience in network deployment, server administration, virtualisation and IT security, across public institutions, international organisations and private companies in Central Africa. Founded D’Yvix in 2012 and has led its technical direction since.",
  certifications: [
    "Cisco Certified Network Associate (CCNA) — Routing & Switching",
    "Microsoft Certified Solutions Associate (MCSA) — Windows Server 2012 & SQL Server 2012",
    "VMware vSphere 5.5",
    "FreeNAS — NAS installation & configuration",
    "Ubiquiti UniFi Access Point — indoor/outdoor",
    "Dokmee Enterprise & Dokmee Web — EDM deployment",
  ],
  languages: ["French — native", "English — working knowledge"],
} as const;

/**
 * The technical team [PD slide 7]. Six named members plus the founder.
 * Real people from the company deck; no one here is invented.
 */
export const team = [
  { name: "Ambrose-Yves Touko Ngaunji", role: "General Manager — IT & Cybersecurity" },
  { name: "NTCHYNGOUDOU Me Ntoule", role: "Security & Cryptography, Back-End" },
  { name: "Nassice Nana", role: "Systems & Network Engineer" },
  { name: "Loïc Azeme Bekono", role: "Back-End Developer" },
  { name: "Mforbesi Ntohnwi Bih", role: "Front-End Developer" },
  { name: "KENFACK MEGOUHOU Vanelle", role: "Front-End Developer" },
] as const;

/** Company history [PD slide 2]. */
export const timeline = [
  {
    period: "2012",
    title: "Foundations",
    detail:
      "Founded in Yaoundé on one conviction: Central Africa deserves the same technical rigour as Europe.",
  },
  {
    period: "2015",
    title: "First defining work",
    detail:
      "Ministries, public health and insurance — the delivery discipline that has not moved since.",
  },
  {
    period: "2017–19",
    title: "Going international",
    detail: "A European diplomatic mission and UN agencies trust us with their infrastructure.",
  },
  {
    period: "2020–21",
    title: "Consolidation",
    detail: "Every existing engagement maintained without exception, through global uncertainty.",
  },
  {
    period: "2022–25",
    title: "Diversification",
    detail: "E-commerce platforms, security infrastructure and large-scale video surveillance.",
  },
] as const;

/**
 * Standards and partnerships [CP page 5].
 *
 * NOTE on ISO/IEC 27001: the source describes the company as
 * "ISO/IEC 27001-aligned" in its narrative while listing it under
 * certifications. "Aligned" is the conservative reading and the one published
 * here — claiming certification that cannot be evidenced would fail exactly
 * the procurement check it is meant to pass. Confirm before changing.
 */
export const standards = [
  {
    name: "ISO/IEC 27001",
    qualifier: "aligned",
    note: "Information security management practices aligned to the standard.",
  },
  { name: "ITIL Foundation", qualifier: "certified", note: "Service management." },
  { name: "AWS Certified Cloud Practitioner", qualifier: "certified", note: "Cloud foundations." },
] as const;

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

/** Sectors with delivered work [CP page 2]. */
export const sectorsServed = [
  "Government ministries",
  "Diplomatic missions",
  "International organisations",
  "Financial institutions",
  "Healthcare providers",
  "Telecom operators",
  "Private companies",
] as const;

/**
 * knowsAbout taxonomy (§60). Controlled list — a topic appears only where
 * the source documents evidence delivery. Do not pad for SEO.
 */
export const knowsAbout = [
  "Information Technology Infrastructure",
  "Network Deployment and Cabling",
  "Systems Administration",
  "Windows Server Administration",
  "Linux Administration",
  "Server Virtualization",
  "VMware ESXi",
  "Backup and Storage Solutions",
  "Network Attached Storage",
  "Disaster Recovery",
  "Business Continuity",
  "Cybersecurity",
  "Network Security",
  "Firewall Administration",
  "Endpoint Security",
  "Security Operations Monitoring",
  "Wireless Network Infrastructure",
  "Software Engineering",
  "Web Application Development",
  "API Development",
  "Geospatial Data Systems",
  "PostgreSQL and PostGIS",
  "Electronic Document Management",
  "Digital Archiving",
  "Cloud Computing",
  "DevOps",
  "Applied Artificial Intelligence",
  "Managed IT Services",
  "Technical Training",
] as const;

/**
 * Trust metrics (§29). Every value now carries a documented source — the
 * placeholders this site launched with have been closed by the corporate
 * profile and the company deck.
 */
export const trustMetrics = [
  {
    label: "Years in operation",
    value: String(yearsInOperation()),
    verification: VERIFICATION.verified,
    source: "Founded May 2012",
  },
  {
    label: "Projects delivered",
    value: "60+",
    verification: VERIFICATION.verified,
    source: "Corporate technical profile",
  },
  {
    label: "Sectors served",
    value: "7",
    verification: VERIFICATION.verified,
    source: "Company records",
  },
  {
    label: "Permanent technical team",
    value: "7",
    verification: VERIFICATION.verified,
    source: "Company deck",
  },
] as const;
