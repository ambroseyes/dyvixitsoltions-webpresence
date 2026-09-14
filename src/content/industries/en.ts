import type { IndustrySlug, IndustryText } from "../types";

export const industriesEn: Record<IndustrySlug, IndustryText> = {
  "financial-services": {
    name: "Financial Services",
    summary: "Banks, microfinance and payment operators, where availability is regulated.",
    headline: "Availability and integrity are not features here. They are the licence.",
    standfirst:
      "Financial institutions carry obligations that turn an IT problem into a regulatory one. The engineering has to reflect that from the start.",
    pressures: [
      "Regulatory expectations on availability, retention and audit trail",
      "Transaction systems where downtime is measured in direct loss",
      "Branch and agent networks depending on links that fail independently",
      "Third-party integrations with payment and interbank systems",
    ],
    risks: [
      "Fraud and account takeover through weak identity controls",
      "Ransomware reaching backups because they were never isolated",
      "Branch connectivity failure isolating operations",
      "Audit findings on privileged access and change control",
    ],
    faqs: [
      {
        q: "Can D’Yvix work within our regulator’s requirements?",
        a: "Engagements are scoped against the specific obligations you are held to. Where a control is mandated, it becomes an explicit requirement of the design rather than a recommendation, and the resulting documentation is written to support audit.",
      },
      {
        q: "How is branch connectivity made resilient?",
        a: "Through independent links that do not share a failure path, with automatic failover configured and tested. The design begins by identifying where apparently separate links converge on the same physical infrastructure — which is more common than most estates assume.",
      },
    ],
  },
  government: {
    name: "Government & Public Sector",
    summary: "Public institutions holding citizen data and delivering essential services.",
    headline: "Systems the public cannot choose to stop depending on.",
    standfirst:
      "Public institutions hold data citizens cannot withdraw and deliver services they cannot obtain elsewhere. Sovereignty over that infrastructure matters.",
    pressures: [
      "Citizen data held under residency and confidentiality obligations",
      "Procurement and budget cycles that constrain architecture",
      "Legacy systems that predate current staff",
      "Service continuity expectations independent of budget cycle",
    ],
    risks: [
      "Citizen data exposure through unmaintained systems",
      "Dependency on infrastructure outside national jurisdiction",
      "Knowledge loss as staff rotate out of post",
      "Undocumented systems nobody is able to change safely",
    ],
    faqs: [
      {
        q: "Can data be kept within national jurisdiction?",
        a: "Yes. Where residency is required, architectures keep the relevant data on infrastructure located and operated within jurisdiction. This is a common driver toward on-premises or hybrid designs rather than full public cloud.",
      },
      {
        q: "How is knowledge retained across staff rotation?",
        a: "By treating documentation and handover as deliverables rather than by-products. Topology, runbooks and decision records are written for a reader who was not present, so operational capability does not leave with an individual.",
      },
    ],
  },
  healthcare: {
    name: "Healthcare",
    summary: "Hospitals and clinics where record availability affects clinical decisions.",
    headline: "When the record is unavailable, care is delivered without it.",
    standfirst:
      "Healthcare IT failure does not stop work. It makes clinicians work without information they should have had — which is a different and worse kind of failure.",
    pressures: [
      "Patient records required at the point of care, without delay",
      "Confidentiality obligations over sensitive personal data",
      "Clinical and imaging systems with specific infrastructure demands",
      "Continuous operation, with no scheduled quiet period",
    ],
    risks: [
      "Records unavailable during clinical decision-making",
      "Patient data exposure",
      "Ransomware on unsegmented clinical networks",
      "Medical devices on the network that cannot be patched",
    ],
    faqs: [
      {
        q: "How are unpatchable medical devices handled?",
        a: "Through network segmentation. Devices that cannot be patched are isolated so that compromise cannot spread laterally, with monitored and tightly controlled access paths in and out.",
      },
      {
        q: "How is maintenance scheduled where there is no downtime window?",
        a: "By building redundancy that allows components to be taken out of service individually while the system stays available, so maintenance does not require an outage.",
      },
    ],
  },
  education: {
    name: "Education",
    summary: "Universities and schools with dense, seasonal, largely unmanaged device load.",
    headline: "Thousands of devices you do not control, on a network you do.",
    standfirst:
      "Education networks carry a device population no other sector tolerates: unmanaged, transient and concentrated into sharp seasonal peaks.",
    pressures: [
      "High-density wireless across campus buildings",
      "Enrolment and examination peaks concentrated into days",
      "Unmanaged student and staff devices on shared infrastructure",
      "Constrained budgets against growing demand",
    ],
    risks: [
      "Enrolment or examination systems failing under peak load",
      "Student record exposure",
      "Compromised devices spreading across a flat network",
      "Research or administrative data lost without recoverable backup",
    ],
    faqs: [
      {
        q: "How is seasonal peak load handled economically?",
        a: "By sizing owned infrastructure for normal load and using elastic capacity for the peak, where the workload permits it. Sizing an entire estate for a few days a year is rarely the efficient choice.",
      },
      {
        q: "How are unmanaged devices kept from becoming a risk?",
        a: "By separating them onto their own network segment with no route to administrative or academic record systems, so an infected student laptop reaches nothing that matters.",
      },
    ],
  },
  sme: {
    name: "Small & Medium Enterprises",
    summary: "Growing businesses that need enterprise discipline without an enterprise budget.",
    headline: "Enterprise discipline, sized for a business that does not have an IT department.",
    standfirst:
      "Smaller organisations face the same threats as large ones with none of the staffing. The answer is not less engineering. It is engineering scoped correctly.",
    pressures: [
      "No internal IT function, or one person carrying it informally",
      "Capital constraints on infrastructure investment",
      "Growth outrunning systems chosen when the business was smaller",
      "Owner-level decisions made without technical advice",
    ],
    risks: [
      "Total data loss with no recoverable backup",
      "Business email compromise and invoice fraud",
      "Complete dependency on one undocumented person",
      "Ransomware against an estate with no detection at all",
    ],
    faqs: [
      {
        q: "Is this affordable for a small business?",
        a: "Engagements are scoped to the estate. A small organisation needs verified backups, current patching, controlled access and a recovery plan — that is a proportionate piece of work, not an enterprise programme. The alternative cost is usually discovered during an incident.",
      },
      {
        q: "Where should a small business start?",
        a: "With backup verification and access control. They are the two controls that most reliably determine whether an incident is an inconvenience or an existential event, and both are inexpensive relative to their effect.",
      },
    ],
  },
  "critical-infrastructure": {
    name: "Critical Infrastructure",
    summary: "Energy, water, telecommunications and transport operators.",
    headline: "Failure here is not measured in downtime. It is measured in consequence.",
    standfirst:
      "Operators of essential services carry a failure profile no commercial system has: the effects land on people who were never customers.",
    pressures: [
      "Operational technology with lifecycles measured in decades",
      "Convergence of previously isolated OT with corporate IT",
      "Geographically distributed and often unmanned sites",
      "Regulatory obligations on continuity and incident reporting",
    ],
    risks: [
      "IT compromise reaching operational technology",
      "Legacy control systems that cannot be patched or replaced",
      "Remote sites without monitoring or physical control",
      "Extended recovery times on specialised equipment",
    ],
    faqs: [
      {
        q: "How is OT separated from IT?",
        a: "Through enforced segmentation with controlled, monitored and minimal crossing points. The objective is that a compromise of corporate IT has no path to operational systems, and that every legitimate crossing is deliberate and logged.",
      },
      {
        q: "How are remote unmanned sites monitored?",
        a: "With local instrumentation reporting over redundant paths, designed so that the loss of a single link is itself a detected and alerted event rather than silence.",
      },
    ],
  },
};
