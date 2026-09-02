import type { Verification } from "@/lib/site";
import { VERIFICATION } from "@/lib/site";

/**
 * Delivered engagements.
 *
 * Every entry is taken from the corporate technical profile or the company
 * deck. Client names appear only where those documents name them; where a
 * document describes a client by sector instead, that is preserved here.
 * Nothing is embellished and no metric is estimated.
 */
export type Project = {
  slug: string;
  index: string;
  client: string;
  sector: string;
  period: string;
  title: string;
  challenge: string;
  contribution: string;
  outcome: string;
  technologies: string[];
  /** Headline figure, only where the source states one. */
  metric: { value: string; label: string } | null;
  solutions: string[];
  verification: Verification;
};

export const projects: Project[] = [
  {
    slug: "creolink-storage",
    index: "01",
    client: "Creolink Communication",
    sector: "Telecommunications / ISP",
    period: "2015 – 2023",
    title: "Backup and storage scaled sixfold over eight years",
    challenge:
      "An internet service provider needed a backup and storage platform that could keep pace with data volumes it could not yet forecast.",
    contribution:
      "Deployed the initial FreeNAS backup solution and its access controls, then grew the platform into a TrueNAS cluster as demand rose, with FTP and ShareFile data stores alongside.",
    outcome:
      "Capacity grew from 580 TB to over 3,500 TB under continuous management — an eight-year infrastructure partnership rather than a single delivery.",
    technologies: ["FreeNAS", "TrueNAS", "Storage clustering", "FTP", "ShareFile"],
    metric: { value: "3,500+ TB", label: "under management, from 580 TB" },
    solutions: ["infrastructure-cloud", "managed-services", "data-documents"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "sopecam-surveillance",
    index: "02",
    client: "SOPECAM",
    sector: "Public-sector media",
    period: "2017 – present",
    title: "Long-range connectivity and a 92-camera surveillance network",
    challenge:
      "Cameroon's national press and publishing company needed reliable connectivity across its premises and physical security coverage at scale.",
    contribution:
      "Installed a Ubiquiti NanoBeam long-range wireless link, then deployed a 92-camera IP surveillance network — bullet, PTZ and dome — with FreeNAS-based backup storage behind it.",
    outcome:
      "Secure connectivity and large-scale surveillance infrastructure for a public-sector institution, still under management today.",
    technologies: [
      "Ubiquiti NanoBeam",
      "IP cameras (bullet / PTZ / dome)",
      "FreeNAS",
      "260 TB storage",
    ],
    metric: { value: "92", label: "cameras in a meshed network" },
    solutions: ["infrastructure-cloud", "managed-services", "cybersecurity"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "ministry-public-works-edm",
    index: "03",
    client: "Ministry of Public Works",
    sector: "Government",
    period: "2015",
    title: "Electronic document management for a government ministry",
    challenge:
      "A ministry needed its paper archive to become a searchable, access-controlled repository.",
    contribution:
      "Deployed the server and database environment, installed Dokmee Enterprise and Dokmee Web, configured backup data stores, installed high-volume scanners, and deployed two NAS units as the archive repository.",
    outcome: "An operational document management and archiving system for a public institution.",
    technologies: [
      "Windows Server 2008 R2",
      "Microsoft SQL Server 2008",
      "Dokmee Enterprise",
      "Dokmee Web",
      "High-volume scanners",
      "NAS",
    ],
    metric: null,
    solutions: ["data-documents", "infrastructure-cloud"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "cyberlink-wireless",
    index: "04",
    client: "Cyberlink",
    sector: "Consumer internet",
    period: "2013 – 2021",
    title: "Wireless network across nearly 100 sites",
    challenge:
      "A cybercafé operator needed wireless coverage and captive-portal access control across a growing estate in Yaoundé, without technical staff at each location.",
    contribution:
      "Directed deployment and ongoing hardware and system maintenance of a Ubiquiti UniFi mesh network with MikroTik captive portal, initially across 52 sites and later extended.",
    outcome:
      "An eight-year infrastructure maintenance relationship spanning close to 100 locations.",
    technologies: ["Ubiquiti UniFi mesh", "MikroTik captive portal", "Multi-site wireless"],
    metric: { value: "~100", label: "sites maintained over eight years" },
    solutions: ["managed-services", "infrastructure-cloud"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "fodecc-security",
    index: "05",
    client: "FODECC",
    sector: "Public fund / agriculture",
    period: "2016 – 2020",
    title: "Multi-year security and network modernisation",
    challenge:
      "The Cocoa & Coffee Sector Development Fund needed to modernise an ageing estate and raise its security posture, in phases it could absorb.",
    contribution:
      "Migrated workstations and deployed endpoint protection, then built a racked and cabled local network, and finally a secured fibre-optic LAN linking two sites across 135 seats.",
    outcome:
      "A multi-year improvement of the client's security posture and network infrastructure, delivered phase by phase without disrupting operations.",
    technologies: [
      "FortiGate",
      "Kaspersky Endpoint",
      "G-Data EndPoint",
      "MikroTik",
      "Fibre-optic LAN",
      "Windows 8.1 migration",
    ],
    metric: { value: "135", label: "seats across two linked sites" },
    solutions: ["cybersecurity", "infrastructure-cloud"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "feicom-virtualization",
    index: "06",
    client: "FEICOM",
    sector: "Government / public institution",
    period: "2014",
    title: "Server and virtualisation infrastructure renewal",
    challenge:
      "A national public institution needed to renew ageing server infrastructure and consolidate onto a virtualised platform.",
    contribution:
      "Installed the server rack, configured RAID 5 storage, deployed VMware ESXi 5.5 across three servers with datastore configuration, and built the Red Hat Enterprise Linux virtual machines.",
    outcome: "A virtualised server environment delivered for the institution.",
    technologies: ["Dell PowerEdge", "RAID 5", "VMware ESXi 5.5", "Red Hat Enterprise Linux 6"],
    metric: null,
    solutions: ["infrastructure-cloud"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "pndp-cnc-virtualization",
    index: "07",
    client: "PNDP–CNC",
    sector: "National development programme",
    period: "2015",
    title: "Virtualised environment for a programme coordination centre",
    challenge:
      "A national development programme's coordination centre needed server infrastructure sized for its operations.",
    contribution:
      "Configured disk arrays, deployed VMware ESXi 5.5, created the virtual servers, and configured datastores, virtual switches and NICs.",
    outcome: "A virtualised environment supporting the programme's operations.",
    technologies: ["HP ProLiant G8", "RAID 5/1", "VMware ESXi 5.5"],
    metric: null,
    solutions: ["infrastructure-cloud"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "welldone-call-centre",
    index: "08",
    client: "WellDone Center",
    sector: "Business services",
    period: "2012 – 2016",
    title: "A 200-seat call centre, built from empty floor to live operations",
    challenge:
      "A call centre needed its entire IT and telephony infrastructure established from nothing.",
    contribution:
      "Cabled the network for 200 seats, deployed management servers and thin-client workstations, and set up the telephony infrastructure with a TrixBox PBX, SIP trunks and GSM gateways.",
    outcome: "A fully operational call centre environment.",
    technologies: [
      "Structured cabling",
      "Windows Server",
      "Thin clients",
      "TrixBox PBX",
      "SIP trunks",
      "GSM gateways",
    ],
    metric: { value: "200", label: "seats cabled and equipped" },
    solutions: ["infrastructure-cloud", "managed-services"],
    verification: VERIFICATION.verified,
  },
  {
    slug: "diplomatic-mission-security",
    index: "09",
    client: "A European diplomatic mission",
    sector: "Diplomatic",
    period: "2019 – present",
    title: "Uninterrupted network security since 2019",
    challenge:
      "A diplomatic mission required continuous network security under strict confidentiality.",
    contribution:
      "Continuous network security operations, delivered under signed NDAs with access limited to the team members assigned to the engagement.",
    outcome:
      "Uninterrupted service since 2019 — the confidentiality and security standard the practice operates at daily.",
    technologies: ["Network security", "Least-privilege access", "Continuous monitoring"],
    metric: { value: "Since 2019", label: "without interruption" },
    solutions: ["cybersecurity", "managed-services"],
    verification: VERIFICATION.verified,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsForSolution = (slug: string) =>
  projects.filter((p) => p.solutions.includes(slug));
