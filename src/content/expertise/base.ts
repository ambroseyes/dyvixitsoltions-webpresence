import type { ExpertiseBase } from "../types";

/**
 * The nine domains, in display order.
 *
 * `historicalService` quotes the service line exactly as the previous French
 * site published it, so every historical offer stays traceable into the new
 * structure. It is null for domains introduced with the 2026 positioning.
 */
export const EXPERTISE_BASE: ExpertiseBase[] = [
  {
    slug: "digital-engineering",
    index: "01",
    related: ["product-engineering", "ai-data", "cloud-infrastructure"],
    projects: [],
    products: ["sacrecheici", "lexora-ai", "back-node"],
    historicalService: "Génie logiciel",
    ctaHref: "/contact?scope=digital-engineering",
  },
  {
    slug: "cloud-infrastructure",
    index: "02",
    related: ["cybersecurity", "managed-services", "networks-telecom"],
    projects: ["creolink-storage", "feicom-virtualization", "pndp-cnc-virtualization", "welldone-call-centre"],
    products: ["back-node"],
    historicalService: "Virtualisation, stockage, sauvegarde et réplication",
    ctaHref: "/request-audit?scope=cloud-infrastructure",
  },
  {
    slug: "cybersecurity",
    index: "03",
    related: ["cloud-infrastructure", "networks-telecom", "managed-services"],
    projects: ["diplomatic-mission-security", "fodecc-security"],
    products: [],
    historicalService: "Audit, conseil et sécurité informatique",
    ctaHref: "/request-audit?scope=cybersecurity",
  },
  {
    slug: "ai-data",
    index: "04",
    related: ["digital-engineering", "cybersecurity", "consulting-rd"],
    projects: ["ministry-public-works-edm"],
    products: ["back-node", "lexora-ai", "sacrecheici"],
    historicalService: "Archivage numérique et gestion électronique des documents (GED)",
    ctaHref: "/contact?scope=ai-data",
  },
  {
    slug: "networks-telecom",
    index: "05",
    related: ["cloud-infrastructure", "iot-edge", "managed-services"],
    projects: ["cyberlink-wireless", "sopecam-surveillance", "welldone-call-centre", "fodecc-security"],
    products: [],
    historicalService: "Administration et maintenance des systèmes et réseaux informatiques",
    ctaHref: "/contact?scope=networks-telecom",
  },
  {
    slug: "iot-edge",
    index: "06",
    related: ["networks-telecom", "ai-data", "cloud-infrastructure"],
    projects: ["sopecam-surveillance", "cyberlink-wireless"],
    products: [],
    historicalService: null,
    ctaHref: "/contact?scope=iot-edge",
  },
  {
    slug: "product-engineering",
    index: "07",
    related: ["digital-engineering", "ai-data", "consulting-rd"],
    projects: [],
    products: ["sacrecheici"],
    historicalService: null,
    ctaHref: "/contact?scope=product-engineering",
  },
  {
    slug: "consulting-rd",
    index: "08",
    related: ["cybersecurity", "product-engineering", "ai-data"],
    projects: [],
    products: ["back-node"],
    historicalService: "Audit, conseil et sécurité informatique",
    ctaHref: "/request-audit?scope=consulting-rd",
  },
  {
    slug: "managed-services",
    index: "09",
    related: ["cloud-infrastructure", "networks-telecom", "cybersecurity"],
    projects: ["creolink-storage", "cyberlink-wireless", "sopecam-surveillance", "diplomatic-mission-security"],
    products: [],
    historicalService:
      "Environnement de travail collaboratif · Administration et maintenance des systèmes et réseaux",
    ctaHref: "/contact?scope=managed-services",
  },
];
