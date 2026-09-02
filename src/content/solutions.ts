import { VERIFICATION } from "@/lib/site";
import type { Solution } from "./types";

/**
 * Seven service lines.
 *
 * This taxonomy is the company's own, taken from the corporate technical
 * profile and the company deck — not an invented set of categories. Every
 * `evidence` entry names a real client engagement from those documents.
 */
export const solutions: Solution[] = [
  {
    slug: "software-engineering",
    index: "01",
    name: "Software Engineering",
    summary: "Web platforms, APIs and microservices — Python/FastAPI, Laravel, React.",
    headline: "Software built around the way your organisation actually works.",
    standfirst:
      "Packaged software asks you to change your process to match its assumptions. Sometimes that is the right trade. When it is not, the software should be built to fit — and built so your team can still change it in five years.",
    definition:
      "D’Yvix provides software engineering services covering the analysis, architecture, development, integration and maintenance of web platforms, REST APIs, microservices and custom business applications.",
    whoNeedsIt: [
      "Organisations running critical processes on spreadsheets and email",
      "Teams whose systems cannot exchange data without manual re-entry",
      "Businesses whose process is a genuine differentiator worth encoding",
      "Anyone maintaining software nobody on the current team wrote",
    ],
    problemsSolved: [
      "Manual re-entry of the same data across disconnected systems",
      "Processes that exist only in one person's head",
      "Reporting assembled by hand every month",
      "Packaged software that fits eighty percent and blocks the rest",
      "Legacy applications with no maintainer and no documentation",
    ],
    capabilities: [
      {
        title: "Systems analysis",
        description: "Establishing how the work is genuinely done before deciding what to build.",
      },
      {
        title: "Web platforms",
        description:
          "Internal tools and customer-facing systems, built to be operated and extended.",
      },
      {
        title: "REST APIs and microservices",
        description: "Service boundaries drawn around the business, not around the framework.",
      },
      {
        title: "Real-time interfaces",
        description: "WebSocket-driven dashboards where sub-second state actually matters.",
      },
      {
        title: "Integration",
        description: "Making existing systems exchange data reliably instead of through people.",
      },
      {
        title: "Maintenance and handover",
        description: "Documentation and knowledge transfer so the system outlives the engagement.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Understand the work",
        description: "Observe the actual process, including the workarounds people rely on.",
      },
      {
        step: "02",
        title: "Define the smallest useful system",
        description: "Identify what delivers value first and defer the rest deliberately.",
      },
      {
        step: "03",
        title: "Architect",
        description: "Choose a structure sized to the problem, not to a framework's preferences.",
      },
      {
        step: "04",
        title: "Build in increments",
        description: "Ship working slices to real users and correct course on their feedback.",
      },
      {
        step: "05",
        title: "Review and harden",
        description:
          "No merge without review. Validation, authorisation and tests before production.",
      },
      {
        step: "06",
        title: "Hand over",
        description: "Documentation and training so your team can operate and change it.",
      },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Laravel",
      "PHP",
      "React",
      "TypeScript",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "WebSocket",
      "Docker",
    ],
    outcomes: [
      "Manual re-entry removed from the process",
      "Institutional knowledge encoded rather than held individually",
      "Reporting produced by the system instead of by staff",
      "A codebase your team can maintain",
    ],
    evidence: [
      {
        claim: "SaCrècheIci — real-time platform",
        detail:
          "React single-page application with WebSocket live updates over a PostgreSQL/PostGIS backend, including a real-time operations dashboard. In production.",
      },
      {
        claim: "Lexora AI — ten FastAPI microservices",
        detail: "A microservice API estate built and operated in-house.",
      },
      {
        claim: "B2B e-commerce platform, 2022–2025",
        detail:
          "A three-year platform engagement delivered under the company's own review discipline.",
      },
    ],
    faqs: [
      {
        q: "Can D’Yvix develop custom software?",
        a: "Yes. Software engineering is one of the seven service lines D’Yvix delivers, covering web platforms, REST APIs, microservices and custom business applications from analysis through to maintenance. Recent work includes a real-time React and PostGIS platform and a ten-service FastAPI estate.",
      },
      {
        q: "Should we build or buy?",
        a: "Buy when the process is genuinely standard — accounting and payroll usually are. Build when the process is a differentiator, or when packaged software would force a change costing more than the software saves. The analysis phase answers this before code is written, and recommending a package is a valid outcome.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Source code, documentation and deployment configuration are delivered to the client, and engagements are structured so another team could take over without renegotiating access.",
      },
      {
        q: "How is quality controlled?",
        a: "Continuous documentation, weekly demonstrations, and no merge without code review. Functional and security testing precede every production go-live, with supervised deployment and a rollback plan.",
      },
    ],
    cta: { label: "Discuss Your Software Project", href: "/contact?scope=software-engineering" },
    related: ["data-documents", "applied-ai", "infrastructure-cloud"],
    sourceService: "Génie logiciel",
    verification: VERIFICATION.verified,
  },

  {
    slug: "infrastructure-cloud",
    index: "02",
    name: "Infrastructure & Cloud",
    summary: "Networks, servers, virtualisation, storage and the pipelines that keep them current.",
    headline: "Infrastructure that simply works.",
    standfirst:
      "Most outages are not exotic. They are a single point of failure nobody documented, a backup nobody restored, or a link nobody monitored. We remove those quietly and permanently.",
    definition:
      "D’Yvix provides IT infrastructure and cloud engineering services: the design, deployment, administration and maintenance of networks, servers, virtualisation, storage and backup systems, together with containerisation, delivery pipelines and operational monitoring.",
    whoNeedsIt: [
      "Organisations whose operations stop when a server or link goes down",
      "Teams running ageing hardware with no documented recovery path",
      "Multi-site businesses with unreliable connectivity between branches",
      "Anyone who has never tested whether their backups actually restore",
    ],
    problemsSolved: [
      "Unplanned downtime with no clear root cause",
      "Backups that exist but have never been verified",
      "Single points of failure in network or power paths",
      "Storage growth outrunning capacity planning",
      "Deployments only one person knows how to perform",
    ],
    capabilities: [
      {
        title: "Network engineering",
        description:
          "LAN, WAN and multi-site design, structured cabling, segmentation and redundant links sized to real traffic.",
      },
      {
        title: "Systems administration",
        description:
          "Build, hardening, patching and lifecycle management across Windows Server and Linux estates.",
      },
      {
        title: "Virtualisation",
        description:
          "Consolidation onto VMware ESXi, with resource planning that leaves genuine headroom.",
      },
      {
        title: "Storage and backup",
        description:
          "NAS and cluster design, retention policy and replication — with restores rehearsed, not assumed.",
      },
      {
        title: "Disaster recovery",
        description:
          "A documented recovery objective, a tested runbook, and a secondary path that has actually been failed over to.",
      },
      {
        title: "Containers and delivery",
        description: "Docker and CI/CD pipelines so environments are rebuildable from source.",
      },
      {
        title: "Monitoring",
        description:
          "Grafana, Prometheus and Zabbix instrumentation on the paths that matter, tuned to reduce noise.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Inventory",
        description: "Establish what actually exists — not what the documentation claims.",
      },
      {
        step: "02",
        title: "Assess",
        description:
          "Identify single points of failure, unsupported versions and untested recovery paths.",
      },
      {
        step: "03",
        title: "Architect",
        description:
          "Design the target state and the migration order that keeps you running throughout.",
      },
      {
        step: "04",
        title: "Implement",
        description: "Change in reversible increments, each one validated before the next begins.",
      },
      {
        step: "05",
        title: "Operate",
        description: "Monitor, patch and review — with a named escalation path.",
      },
    ],
    technologies: [
      "VMware ESXi",
      "Windows Server",
      "Red Hat Enterprise Linux",
      "Dell PowerEdge",
      "HP ProLiant",
      "TrueNAS",
      "FreeNAS",
      "Ubiquiti",
      "MikroTik",
      "Cisco",
      "Docker",
      "GitLab CI",
      "Grafana",
      "Prometheus",
      "Zabbix",
    ],
    outcomes: [
      "Reduced unplanned downtime",
      "A recovery objective you can state in numbers and demonstrate",
      "Documented topology your team can operate without us",
      "Capacity headroom planned against measured growth",
    ],
    evidence: [
      {
        claim: "Storage scaled from 580 TB to over 3,500 TB",
        detail:
          "Creolink Communication, 2015–2023. Initial FreeNAS backup platform grown into a TrueNAS cluster across an eight-year partnership as the ISP's data volumes grew.",
      },
      {
        claim: "FEICOM — virtualisation for a national public institution",
        detail:
          "Dell PowerEdge servers, RAID 5, VMware ESXi 5.5 across three hosts with datastore configuration and Red Hat Enterprise Linux virtual machines.",
      },
      {
        claim: "PNDP–CNC — virtualised environment for a national programme",
        detail:
          "HP ProLiant G8 servers, RAID 5/1, VMware ESXi 5.5, virtual switches and NIC configuration.",
      },
      {
        claim: "WellDone Center — 200-seat call centre",
        detail:
          "Structured cabling, management servers, thin-client workstations and TrixBox telephony with SIP trunks and GSM gateways.",
      },
    ],
    faqs: [
      {
        q: "How long does an infrastructure assessment take?",
        a: "For a single-site estate, typically one to two weeks from kick-off to written report: discovery, measurement, then a findings document with prioritised remediation. Multi-site estates take longer, driven by the number of locations rather than the complexity of any one.",
      },
      {
        q: "Can D’Yvix manage infrastructure we already have?",
        a: "Yes, and several of our longest relationships began that way — one storage platform has been under our management for eight years. Taking over an existing estate starts with an inventory and assessment so we operate against documented reality.",
      },
      {
        q: "Do you replace existing hardware?",
        a: "Only where it is failing, unsupported, or demonstrably the constraint. Consolidation and virtualisation frequently extend the useful life of an estate at a fraction of replacement cost.",
      },
      {
        q: "What does a tested backup mean in practice?",
        a: "A restore performed against real data on a defined schedule, timed and documented, so the recovery time objective is a measurement rather than an estimate. Backups that have never been restored are unverified by definition.",
      },
    ],
    cta: {
      label: "Request an Infrastructure Assessment",
      href: "/request-audit?scope=infrastructure-cloud",
    },
    related: ["cybersecurity", "managed-services", "data-documents"],
    sourceService:
      "Administration et maintenance des systèmes et réseaux · Virtualisation, stockage, sauvegarde et réplication",
    verification: VERIFICATION.verified,
  },

  {
    slug: "cybersecurity",
    index: "03",
    name: "Cybersecurity & DevSecOps",
    summary:
      "Assess, protect, detect, respond and recover — run as a cycle, aligned to ISO/IEC 27001.",
    headline: "Know where you are vulnerable before someone else does.",
    standfirst:
      "Security is not a firewall you bought. It is a cycle you run. We establish where you actually stand, close what matters most first, and put detection in place for what remains.",
    definition:
      "D’Yvix provides cybersecurity engineering services that help organisations assess, protect, monitor, respond to and recover from threats to their IT infrastructure, systems and data, with information security practices aligned to ISO/IEC 27001.",
    whoNeedsIt: [
      "Organisations holding financial, health, citizen or diplomatic data",
      "Teams that have never had an independent security assessment",
      "Businesses that have experienced an incident and want it not to recur",
      "Anyone who cannot currently answer where am I exposed",
    ],
    problemsSolved: [
      "No current picture of exposure across the estate",
      "Perimeter appliances deployed but never tuned or reviewed",
      "Endpoints outside any managed patching cycle",
      "Shared and orphaned accounts with standing privilege",
      "No detection capability — incidents found by their consequences",
      "No rehearsed response plan",
    ],
    approach: [
      {
        step: "01",
        title: "Assess",
        description:
          "Establish real exposure across network, endpoints, identity and applications.",
      },
      {
        step: "02",
        title: "Protect",
        description: "Close the exploitable gaps, ordered by risk rather than by ease.",
      },
      {
        step: "03",
        title: "Detect",
        description:
          "Instrument for the events that matter and tune out the noise that hides them.",
      },
      {
        step: "04",
        title: "Respond",
        description: "A rehearsed plan with named owners, decision authority and escalation paths.",
      },
      {
        step: "05",
        title: "Recover",
        description: "Restore to a known-good state with verified, isolated backups.",
      },
      {
        step: "06",
        title: "Improve",
        description: "Feed every finding and incident back into the next cycle.",
      },
    ],
    capabilities: [
      {
        title: "Security assessment and audit",
        description:
          "Independent review of infrastructure, configuration and practice against a documented baseline.",
      },
      {
        title: "Firewall and perimeter security",
        description:
          "FortiGate firewall and MikroTik architecture, network segmentation and policy review — deployed, then tuned rather than left at defaults.",
      },
      {
        title: "Endpoint security",
        description: "Managed protection and patching across the endpoint estate, including EDR.",
      },
      {
        title: "Security monitoring",
        description:
          "Continuous monitoring in a security-operations context, with AI-assisted triage under human review.",
      },
      {
        title: "Identity and access",
        description:
          "Least-privilege access, privilege review and removal of shared or orphaned accounts.",
      },
      {
        title: "Secure development",
        description:
          "Secure-by-design practices and mandatory code review across the engineering team.",
      },
      {
        title: "Business continuity",
        description: "Continuity planning tied to tested recovery capability.",
      },
    ],
    technologies: [
      "FortiGate",
      "Kaspersky Endpoint",
      "G-Data EndPoint",
      "MikroTik",
      "EDR",
      "SIEM",
      "IAM",
      "VPN",
      "ISO/IEC 27001 practices",
    ],
    outcomes: [
      "A prioritised, evidenced picture of current exposure",
      "Critical gaps closed in a defined sequence",
      "Detection where previously there was none",
      "A response plan that has been rehearsed",
    ],
    evidence: [
      {
        claim: "Continuous network security for a European diplomatic mission since 2019",
        detail:
          "Uninterrupted security operations for a confidentiality-critical client — the standard the practice operates at daily.",
      },
      {
        claim: "FODECC — multi-year security and network modernisation, 2016–2020",
        detail:
          "Workstation migration and endpoint protection, then a racked and cabled local network and a secured fibre-optic LAN across two sites, 135 seats. FortiGate firewall and Kaspersky Endpoint.",
      },
      {
        claim: "Security monitoring for a financial-sector client, 2025",
        detail: "Kaspersky EDR with AI-assisted SOC monitoring under mandatory human review.",
      },
    ],
    faqs: [
      {
        q: "What does a cybersecurity assessment include?",
        a: "A review of network architecture and segmentation, perimeter and firewall configuration, endpoint coverage, identity and privilege, patch currency, backup integrity and recovery capability. It concludes with a written report: findings, the business risk of each, and a remediation sequence ordered by risk.",
      },
      {
        q: "Does D’Yvix support FortiGate?",
        a: "Yes. FortiGate has been deployed and operated on client engagements, including a multi-year security modernisation programme. Fortinet is also among the company's technology partnerships.",
      },
      {
        q: "Is D’Yvix ISO 27001 certified?",
        a: "The company's information security practices are aligned to ISO/IEC 27001 — formal NDAs before any access to sensitive systems, least-privilege access limited to assigned team members, and secure development practices. Ask us directly for the current certification position before relying on it in a procurement process; we will not overstate it.",
      },
      {
        q: "Will an assessment disrupt operations?",
        a: "No. Assessment work is read-only by default — configuration review, passive analysis and interviews. Anything intrusive, such as active scanning against production, is scheduled and agreed in writing in advance.",
      },
      {
        q: "How often should an assessment be repeated?",
        a: "Annually as a baseline, and additionally after any material change — a new site, a significant migration, a merger, or an incident. Exposure is a moving state, so a single assessment describes one moment only.",
      },
    ],
    cta: { label: "Request a Security Assessment", href: "/request-audit?scope=cybersecurity" },
    related: ["infrastructure-cloud", "managed-services", "software-engineering"],
    sourceService: "Audit, conseil et sécurité informatique",
    verification: VERIFICATION.verified,
  },

  {
    slug: "data-documents",
    index: "04",
    name: "Data, Geospatial & Documents",
    summary: "PostgreSQL/PostGIS, electronic document management and large-scale digitisation.",
    headline: "Information you can actually find, and trust when you find it.",
    standfirst:
      "An archive nobody can search is a cost, not an asset. The same is true of a database nobody can query and a location dataset nobody can map. This is the company's most evidenced technical strength.",
    definition:
      "D’Yvix provides data and document engineering services covering relational and geospatial database design with PostgreSQL and PostGIS, electronic document management (EDM/GED) deployment, large-scale digitisation, and archival storage infrastructure.",
    whoNeedsIt: [
      "Institutions holding paper archives that must become searchable",
      "Organisations whose location data sits unused in spreadsheets",
      "Teams whose reporting requires manual assembly every cycle",
      "Anyone with retention obligations they cannot currently demonstrate",
    ],
    problemsSolved: [
      "Documents scattered across personal drives and email attachments",
      "Paper archives with no index and no retrieval path",
      "Retention policy that exists on paper but not in any system",
      "Geospatial data trapped in formats nothing can query",
      "Storage growth with no capacity or archival plan",
    ],
    capabilities: [
      {
        title: "Geospatial data engineering",
        description:
          "PostgreSQL with PostGIS — the team's strongest and most evidenced skill, proven in production.",
      },
      {
        title: "Electronic document management",
        description:
          "Dokmee Enterprise and Dokmee Web deployment, indexing and controlled retrieval.",
      },
      {
        title: "Large-scale digitisation",
        description: "High-volume scanning workflows into a structured, indexed repository.",
      },
      {
        title: "Archival storage",
        description:
          "NAS and cluster infrastructure sized for archive growth, with retention policy applied.",
      },
      {
        title: "Database administration",
        description: "Design, tuning and backup of SQL Server, PostgreSQL and MySQL estates.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Survey the corpus",
        description: "Establish volume, formats, condition and the retrieval patterns that matter.",
      },
      {
        step: "02",
        title: "Design the index",
        description: "Agree the metadata that makes a document findable by the people who need it.",
      },
      {
        step: "03",
        title: "Build the repository",
        description: "Server, database and storage sized against measured growth.",
      },
      {
        step: "04",
        title: "Digitise",
        description: "Structured capture with quality control, not a bulk scan into a folder.",
      },
      {
        step: "05",
        title: "Apply policy",
        description:
          "Access control and retention enforced by the system rather than by convention.",
      },
    ],
    technologies: [
      "PostgreSQL",
      "PostGIS",
      "Microsoft SQL Server",
      "MySQL",
      "Dokmee Enterprise",
      "Dokmee Web",
      "TrueNAS",
      "FreeNAS",
      "High-volume scanners",
    ],
    outcomes: [
      "Documents findable, controlled and retained to policy",
      "Geospatial data queryable rather than merely stored",
      "Archive capacity planned against measured growth",
      "Retention obligations you can demonstrate",
    ],
    evidence: [
      {
        claim: "Ministry of Public Works — electronic document management",
        detail:
          "Windows Server 2008 R2 and SQL Server environment, Dokmee Enterprise and Dokmee Web, configured backup data stores, high-volume scanners and two NAS units for the archive repository. An operational EDM system for a government ministry.",
      },
      {
        claim: "SOPECAM — 260 TB archival backup",
        detail:
          "FreeNAS-based backup storage supporting a national press and publishing institution, running since 2017.",
      },
      {
        claim: "PostGIS proven in production",
        detail:
          "Geospatial storage and querying in the SaCrècheIci platform — the company's most evidenced data capability.",
      },
    ],
    faqs: [
      {
        q: "What is electronic document management?",
        a: "A system for storing, indexing, retrieving and retaining an organisation's documents under defined access control and retention policy — replacing scattered personal drives and email attachments with a single controlled repository.",
      },
      {
        q: "Can you digitise an existing paper archive?",
        a: "Yes. D’Yvix has deployed high-volume scanning into an indexed EDM repository for a government ministry, including the server, database and NAS storage behind it. Digitisation without an index produces a second unusable archive, so the index design comes first.",
      },
      {
        q: "Why PostGIS specifically?",
        a: "Because location questions asked of a normal database become slow, approximate, or impossible. PostGIS makes them ordinary queries. It is the team's most evidenced technical strength and is running in production today.",
      },
    ],
    cta: { label: "Discuss a Data or Archive Project", href: "/contact?scope=data-documents" },
    related: ["software-engineering", "infrastructure-cloud", "applied-ai"],
    sourceService: "Archivage numérique et gestion électronique des documents (GED)",
    verification: VERIFICATION.verified,
  },

  {
    slug: "applied-ai",
    index: "05",
    name: "Applied AI",
    summary:
      "Business automation and AI-assisted operations, with human review that is not optional.",
    headline: "Intelligence that works for your organisation.",
    standfirst:
      "Useful AI in an organisation is narrow, grounded in your own material, and honest about uncertainty. A system that answers confidently from nothing is worse than no system at all — which is why review here is mandatory, not advisory.",
    definition:
      "D’Yvix provides applied AI services covering business process automation, document processing and data extraction, AI-assisted development and AI-assisted security monitoring, all delivered under mandatory human review before anything reaches production.",
    whoNeedsIt: [
      "Organisations where staff spend hours locating information that exists",
      "Teams processing high volumes of documents by hand",
      "Businesses with repetitive rule-based work between systems",
      "Security teams drowning in alert volume",
    ],
    problemsSolved: [
      "Knowledge that exists but cannot be found",
      "Manual extraction of data from documents",
      "Repetitive routing, classification and first-line response",
      "Alert volume no human team can triage in time",
    ],
    capabilities: [
      {
        title: "Business process automation",
        description:
          "Document processing, first-line response and data extraction, with confidence surfaced to a reviewer.",
      },
      {
        title: "AI-assisted development",
        description:
          "Used inside our own delivery, with mandatory human review before production. No generated code merges unreviewed.",
      },
      {
        title: "AI-assisted monitoring",
        description:
          "Triage support in a security-operations context, escalating to people rather than deciding for them.",
      },
      {
        title: "Self-hosted models",
        description:
          "Where confidentiality or residency rules require it, models run on infrastructure you control.",
      },
      {
        title: "Data pipelines",
        description: "The unglamorous work of getting data clean and current enough to be usable.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Find the repetitive work",
        description: "Identify tasks that are high volume, rule-shaped and currently manual.",
      },
      {
        step: "02",
        title: "Check the data",
        description:
          "Confirm the underlying data is complete and current enough to support the task.",
      },
      {
        step: "03",
        title: "Define acceptable error",
        description: "Agree what accuracy is required and what a wrong answer costs.",
      },
      {
        step: "04",
        title: "Pilot narrowly",
        description: "One workflow, measured against the manual baseline it replaces.",
      },
      {
        step: "05",
        title: "Keep a human in the loop",
        description: "Automate the work; leave consequential judgement with a person.",
      },
    ],
    technologies: [
      "Python",
      "Self-hosted LLMs",
      "DeepSeek",
      "vLLM",
      "Retrieval-augmented generation",
      "FastAPI",
      "Workflow automation",
    ],
    outcomes: [
      "Measured reduction in time spent on repetitive tasks",
      "Internal knowledge that is searchable and attributable",
      "Automation with a defined and monitored error rate",
    ],
    evidence: [
      {
        claim: "Self-hosted LLM infrastructure, 2025",
        detail:
          "DeepSeek models served with vLLM on infrastructure under our control — the option that keeps confidential material inside the client's boundary.",
      },
      {
        claim: "AI-assisted SOC monitoring, 2022 onward",
        detail:
          "Kaspersky EDR with AI-assisted triage in a live security-operations context, under human review.",
      },
      {
        claim: "AI-assisted development in delivery",
        detail:
          "Used inside the company's own engineering with mandatory review before production — not a claim about a product, a description of practice.",
      },
    ],
    faqs: [
      {
        q: "Will an AI assistant invent answers?",
        a: "Any system built on a language model can produce a confident wrong answer. That risk is managed by grounding responses in approved sources, returning citations so answers can be checked, and configuring the system to decline rather than guess. It is reduced by design, not eliminated — which is why human review is mandatory in every deployment we run.",
      },
      {
        q: "Does our data leave the organisation?",
        a: "That is decided explicitly at design time, not by default. Where confidentiality or residency rules require it, models run self-hosted on infrastructure you control — we operate DeepSeek under vLLM for exactly this case.",
      },
      {
        q: "Where should an organisation start?",
        a: "With one narrow, high-volume, rule-shaped task that has a measurable manual baseline — document extraction or internal search, typically. Broad organisation-wide AI programmes tend to produce demonstrations rather than results.",
      },
      {
        q: "Is D’Yvix an AI research company?",
        a: "No, and it does not claim to be. This is working familiarity with the responsible, human-supervised use of AI in a professional IT services setting — not a specialised machine-learning engineering background.",
      },
    ],
    cta: { label: "Discuss an Automation Pilot", href: "/contact?scope=applied-ai" },
    related: ["software-engineering", "data-documents", "cybersecurity"],
    sourceService: null,
    verification: VERIFICATION.verified,
  },

  {
    slug: "managed-services",
    index: "06",
    name: "Managed Services",
    summary: "L1/L2/L3 support, infrastructure monitoring and long-run operational ownership.",
    headline: "Someone accountable for it working on Monday.",
    standfirst:
      "Most organisations do not need a large internal IT department. They need a defined standard of service, a named escalation path, and someone whose job it is to notice before users do. Several of these relationships have run past eight years.",
    definition:
      "D’Yvix provides managed IT services covering ongoing administration and maintenance of systems and networks, L1/L2/L3 technical support, infrastructure monitoring, preventive and corrective maintenance, and collaborative work environments.",
    whoNeedsIt: [
      "Organisations without an internal IT team",
      "Teams whose IT responsibility has landed on someone's spare capacity",
      "Businesses needing predictable IT cost rather than emergency spend",
      "Multi-site operators who cannot staff every location",
    ],
    problemsSolved: [
      "IT handled reactively, after something breaks",
      "No single accountable owner for systems",
      "Patching and maintenance deferred indefinitely",
      "No visibility into failures until users report them",
      "Sites too remote or too numerous to attend individually",
    ],
    capabilities: [
      {
        title: "Tiered support",
        description:
          "L1, L2 and L3 support in French or English, against an agreed response standard.",
      },
      {
        title: "Systems and network administration",
        description: "Ongoing operation, patching and maintenance to a defined baseline.",
      },
      {
        title: "Infrastructure monitoring",
        description:
          "Grafana, Prometheus and Zabbix instrumentation so problems surface to us, not to your users.",
      },
      {
        title: "Preventive and corrective maintenance",
        description:
          "Scheduled work plus incident handling and on-call support for deployed systems.",
      },
      {
        title: "Collaborative work environments",
        description: "Shared workspaces and document collaboration teams will actually adopt.",
      },
      {
        title: "Multi-site operations",
        description:
          "Distributed estates maintained without a permanent presence at every location.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Inventory and baseline",
        description: "Document the estate and agree the standard it will be held to.",
      },
      {
        step: "02",
        title: "Stabilise",
        description: "Clear the accumulated backlog of deferred maintenance.",
      },
      {
        step: "03",
        title: "Instrument",
        description: "Monitoring, so problems surface to us rather than to your users.",
      },
      {
        step: "04",
        title: "Operate",
        description: "Scheduled maintenance and defined support against the agreed standard.",
      },
      {
        step: "05",
        title: "Review",
        description: "Regular service review with the evidence to support it.",
      },
    ],
    technologies: [
      "Zabbix",
      "Grafana",
      "Prometheus",
      "Ubiquiti UniFi",
      "MikroTik",
      "Windows Server",
      "Linux",
      "Microsoft 365",
    ],
    outcomes: [
      "Predictable IT cost in place of emergency spend",
      "A named owner and defined escalation path",
      "Maintenance that happens on schedule",
      "Degradation detected before it becomes an outage",
    ],
    evidence: [
      {
        claim: "Cyberlink — nearly 100 sites maintained over eight years",
        detail:
          "Wireless deployment and ongoing hardware and system maintenance across cybercafé locations in Yaoundé, 2013–2021. Ubiquiti UniFi mesh access points with a MikroTik captive portal, from 52 sites initially to close to 100.",
      },
      {
        claim: "SOPECAM — operating since 2017",
        detail:
          "Long-range wireless connectivity and a 92-camera surveillance network with backup storage, still under management.",
      },
      {
        claim: "Creolink — eight-year storage partnership",
        detail:
          "Continuous technical oversight as the client's platform grew from 580 TB to over 3,500 TB.",
      },
    ],
    faqs: [
      {
        q: "Does D’Yvix provide managed IT services?",
        a: "Yes. Ongoing administration and maintenance of systems and networks is a core service line, with L1/L2/L3 support in French or English. Several managed relationships have run for eight years or more.",
      },
      {
        q: "Can you work alongside our internal IT staff?",
        a: "Yes. A common arrangement is internal staff owning user-facing support while D’Yvix handles infrastructure, security and escalation. Responsibility boundaries are defined in writing so nothing sits in a gap between the two.",
      },
      {
        q: "Can you support sites we cannot staff?",
        a: "Yes — that is a large part of what the managed practice does. A wireless estate of nearly a hundred locations was maintained for eight years without a permanent presence at each site.",
      },
    ],
    cta: { label: "Discuss Managed Services", href: "/contact?scope=managed-services" },
    related: ["infrastructure-cloud", "cybersecurity", "technical-training"],
    sourceService: "Environnement de travail collaboratif · Administration et maintenance",
    verification: VERIFICATION.verified,
  },

  {
    slug: "technical-training",
    index: "07",
    name: "Technical Training",
    summary: "Documentation and knowledge transfer, so your team can operate what we built.",
    headline: "The engagement should end with your team able to continue without us.",
    standfirst:
      "A system nobody on your side understands is a dependency, not a deliverable. Technical and end-user documentation is delivered alongside every solution — and the handover is treated as part of the work, not a courtesy at the end.",
    definition:
      "D’Yvix provides technical training and knowledge transfer services: technical and end-user documentation, operator training on deployed systems, and structured handover so client teams can operate and extend the systems delivered to them.",
    whoNeedsIt: [
      "Organisations that have inherited systems nobody was trained on",
      "Teams facing staff rotation who need capability to stay behind",
      "Institutions where continuity cannot depend on one individual",
      "Anyone taking ownership of a newly deployed system",
    ],
    problemsSolved: [
      "Systems only the original vendor understands",
      "Knowledge that leaves when a staff member does",
      "Documentation written for its author rather than its reader",
      "Operators trained by demonstration and nothing else",
    ],
    capabilities: [
      {
        title: "Technical documentation",
        description:
          "Topology, configuration and runbooks written for a reader who was not present.",
      },
      {
        title: "End-user documentation",
        description: "Task-oriented guides for the people who use the system daily.",
      },
      {
        title: "Operator training",
        description: "Hands-on sessions on the deployed system, not on a generic course.",
      },
      {
        title: "Structured handover",
        description:
          "A defined transfer of access, knowledge and responsibility, with the client signing off.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Document during, not after",
        description: "Documentation is produced alongside the build while decisions are fresh.",
      },
      {
        step: "02",
        title: "Write for the successor",
        description: "Assume the reader was not in any of the meetings.",
      },
      {
        step: "03",
        title: "Train on the real system",
        description: "Sessions run against the deployed environment, with the client's own data.",
      },
      {
        step: "04",
        title: "Verify the transfer",
        description: "The team performs the routine operations themselves before sign-off.",
      },
    ],
    technologies: [
      "Technical documentation",
      "Runbooks",
      "Operator training",
      "Knowledge transfer",
    ],
    outcomes: [
      "A team able to operate the system without the vendor",
      "Continuity that survives staff rotation",
      "Documentation an auditor or successor can actually use",
    ],
    evidence: [
      {
        claim: "Documentation delivered with every solution",
        detail:
          "Technical and end-user documentation alongside each deployment is a standing part of the company's delivery framework, not a paid extra.",
      },
      {
        claim: "Continuous documentation as a working method",
        detail:
          "Documentation produced continuously through delivery, with weekly demonstrations — the practice the company applies on every engagement.",
      },
    ],
    faqs: [
      {
        q: "Is training charged separately?",
        a: "Technical and end-user documentation is delivered alongside every solution as part of the engagement. Extended operator training programmes are scoped separately because their size depends on how many people need them.",
      },
      {
        q: "What does handover actually involve?",
        a: "A defined transfer of access, documentation and responsibility, ending with your team performing the routine operations themselves rather than watching us perform them.",
      },
      {
        q: "Can you train on systems D’Yvix did not build?",
        a: "Yes, provided we can first assess and document them. Training people on an undocumented system produces confidence without capability.",
      },
    ],
    cta: { label: "Discuss Training & Handover", href: "/contact?scope=technical-training" },
    related: ["managed-services", "infrastructure-cloud", "data-documents"],
    sourceService: null,
    verification: VERIFICATION.verified,
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
export const solutionSlugs = solutions.map((s) => s.slug);
