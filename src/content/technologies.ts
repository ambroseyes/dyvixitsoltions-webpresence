import type { TechCategory } from "./types";

/**
 * Technology ecosystem (§15).
 *
 * These are working technologies, not partnership or certification claims.
 * §15 explicitly forbids implying certifications or partner status that has
 * not been confirmed — so no vendor badges, tiers or logos are rendered.
 */
export const techCategories: TechCategory[] = [
  {
    id: "infrastructure",
    label: "Infrastructure",
    note: "Compute, storage and the systems underneath everything else",
    items: [
      "Linux",
      "Windows Server",
      "VMware",
      "Proxmox",
      "NAS / SAN",
      "Active Directory",
      "Veeam-class backup",
    ],
  },
  {
    id: "network",
    label: "Network",
    note: "Routing, switching and the links between sites",
    items: ["Cisco", "MikroTik", "SD-WAN", "VLAN segmentation", "BGP / OSPF", "VPN", "Wireless"],
  },
  {
    id: "security",
    label: "Security",
    note: "Perimeter, endpoint, identity and detection",
    items: [
      "FortiGate",
      "pfSense",
      "SIEM",
      "EDR",
      "IAM",
      "Wazuh",
      "Nessus / OpenVAS",
      "Zero Trust access",
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    note: "Public, private and the hybrid reality in between",
    items: [
      "AWS",
      "Microsoft Azure",
      "Private cloud",
      "Hybrid cloud",
      "Object storage",
      "Terraform",
    ],
  },
  {
    id: "software",
    label: "Software",
    note: "Application and API engineering",
    items: [
      "Python",
      "FastAPI",
      "Django",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    note: "Build, ship and observe",
    items: [
      "Docker",
      "Kubernetes",
      "Ansible",
      "GitLab CI",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "Nginx",
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    note: "Grounded systems and the pipelines that feed them",
    items: [
      "Large language models",
      "Retrieval-augmented generation",
      "Model Context Protocol",
      "Vector databases",
      "Workflow automation",
      "Data pipelines",
    ],
  },
];
