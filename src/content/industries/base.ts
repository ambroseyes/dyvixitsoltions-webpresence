import type { IndustryBase } from "../types";

/**
 * Sector pages describe pressures and risks characteristic of each sector.
 * They do not claim delivered work in that sector — evidence lives on the
 * expertise pages and in projects, where it is sourced.
 */
export const INDUSTRY_BASE: IndustryBase[] = [
  {
    slug: "financial-services",
    index: "01",
    expertise: [
      "cybersecurity",
      "cloud-infrastructure",
      "networks-telecom",
      "managed-services",
      "digital-engineering",
    ],
  },
  {
    slug: "government",
    index: "02",
    expertise: [
      "cybersecurity",
      "cloud-infrastructure",
      "ai-data",
      "digital-engineering",
      "managed-services",
    ],
  },
  {
    slug: "healthcare",
    index: "03",
    expertise: ["cloud-infrastructure", "cybersecurity", "networks-telecom", "managed-services"],
  },
  {
    slug: "education",
    index: "04",
    expertise: ["networks-telecom", "cloud-infrastructure", "cybersecurity", "managed-services"],
  },
  {
    slug: "sme",
    index: "05",
    expertise: ["managed-services", "cloud-infrastructure", "cybersecurity", "digital-engineering"],
  },
  {
    slug: "critical-infrastructure",
    index: "06",
    expertise: [
      "cybersecurity",
      "iot-edge",
      "networks-telecom",
      "cloud-infrastructure",
      "managed-services",
    ],
  },
];
