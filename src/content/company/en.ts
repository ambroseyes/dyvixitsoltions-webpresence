import type { CompanyContent } from "../types";

/**
 * [CP] corporate technical profile, [PD] company deck. `{years}` is filled
 * from FOUNDED_YEAR at build so no figure goes stale.
 */
export const companyEn: CompanyContent = {
  entityStatement:
    "D’Yvix IT Solutions is a digital and technology engineering company founded in 2012 in Yaoundé, Cameroon, that designs, builds, secures and operates software, cloud infrastructure, networks, data and AI systems and connected technologies for government, diplomatic, international and private-sector organisations across Central Africa.",
  tagline: "Digital and technology engineering, built in Central Africa since 2012",
  description:
    "We design, build, secure and operate the software, infrastructure, networks, data and AI systems behind organisations that cannot afford for them to fail.",
  countryName: "Cameroon",
  areaServed: ["Cameroon", "Central Africa", "Africa"],

  intro: [
    "D’Yvix IT Solutions was founded in Yaoundé in 2012 on one conviction: Central Africa deserves the same technical rigour as Europe. It has grown into a seven-person permanent technical team working across nine engineering domains, with more than sixty completed projects for government ministries, diplomatic missions, international organisations, financial institutions, healthcare providers, telecom operators and private companies.",
    "The work is engineering rather than resale. We are not a channel for a vendor’s product catalogue, and the recommendation at the end of an assessment is frequently to change a configuration rather than to buy anything. Alongside client work, the team designs and builds its own platforms — Back-Node among them.",
    "Being African is not a marketing position here — it changes the engineering. Bandwidth cost, link reliability, latency to the nearest cloud region and data residency obligations are constraints we design around rather than footnotes. It is also the one thing a European or Asian vendor structurally cannot offer: real execution capacity on the ground, on West Africa Time.",
  ],

  timeline: [
    { period: "2012", title: "Foundations", detail: "Founded in Yaoundé on one conviction: Central Africa deserves the same technical rigour as Europe." },
    { period: "2015", title: "First defining work", detail: "Ministries, public health and insurance — the delivery discipline that has not moved since." },
    { period: "2017–19", title: "Going international", detail: "A European diplomatic mission and UN agencies trust us with their infrastructure." },
    { period: "2020–21", title: "Consolidation", detail: "Every existing engagement maintained without exception, through global uncertainty." },
    { period: "2022–25", title: "Diversification", detail: "E-commerce platforms, security infrastructure and large-scale video surveillance." },
  ],

  team: [
    { name: "Ambrose-Yves Touko Ngaunji", role: "General Manager — IT & Cybersecurity" },
    { name: "NTCHYNGOUDOU Me Ntoule", role: "Security & Cryptography, Back-End" },
    { name: "Nassice Nana", role: "Systems & Network Engineer" },
    { name: "Loïc Azeme Bekono", role: "Back-End Developer" },
    { name: "Mforbesi Ntohnwi Bih", role: "Front-End Developer" },
    { name: "KENFACK MEGOUHOU Vanelle", role: "Front-End Developer" },
  ],

  founder: {
    role: "Founder & General Manager",
    title: "Infrastructure & Systems Engineer",
    bio: "Infrastructure and systems engineer with {years} years of hands-on experience in network deployment, server administration, virtualisation and IT security, across public institutions, international organisations and private companies in Central Africa. Founded D’Yvix in 2012 and has led its technical direction since.",
    certifications: [
      "Cisco Certified Network Associate (CCNA) — Routing & Switching",
      "Microsoft Certified Solutions Associate (MCSA) — Windows Server 2012 & SQL Server 2012",
      "VMware vSphere 5.5",
      "FreeNAS — NAS installation & configuration",
      "Ubiquiti UniFi Access Point — indoor/outdoor",
      "Dokmee Enterprise & Dokmee Web — EDM deployment",
    ],
    languages: ["French — native", "English — working knowledge"],
  },

  /**
   * ISO/IEC 27001 is "aligned", never "certified": the source uses both
   * words, and the conservative one is the one that survives a procurement
   * check. Confirm before changing.
   */
  standards: [
    { name: "ISO/IEC 27001", qualifier: "aligned", note: "Information security management practices aligned to the standard." },
    { name: "ITIL Foundation", qualifier: "certified", note: "Service management." },
    { name: "AWS Certified Cloud Practitioner", qualifier: "certified", note: "Cloud foundations." },
  ],

  sectors: [
    "Government ministries",
    "Diplomatic missions",
    "International organisations",
    "Financial institutions",
    "Healthcare providers",
    "Telecom operators",
    "Private companies",
  ],

  /** §60 — controlled list: a topic appears only where delivery evidences it. */
  knowsAbout: [
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
    "Microservices Architecture",
    "Geospatial Data Systems",
    "PostgreSQL and PostGIS",
    "Electronic Document Management",
    "Digital Archiving",
    "Cloud Computing",
    "DevOps",
    "Kubernetes",
    "Business Process Automation",
    "Robotic Process Automation",
    "Applied Artificial Intelligence",
    "Self-hosted Large Language Models",
    "IP Video Surveillance",
    "IP Telephony",
    "Managed IT Services",
    "Technical Training",
  ],

  trust: [
    { label: "Years in operation", value: "{years}", source: "Founded May 2012" },
    { label: "Projects delivered", value: "60+", source: "Corporate technical profile" },
    { label: "Sectors served", value: "7", source: "Company records" },
    { label: "Permanent technical team", value: "7", source: "Company deck" },
  ],
};
