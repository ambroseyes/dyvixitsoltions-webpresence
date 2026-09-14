import type { HomeContent } from "../types";

/**
 * Homepage content. Answers use {entity}, {years}, {email} and {phone}, filled
 * in home/index.ts, so the entity statement and contact details are never
 * retyped (§57) and the rendered copy matches FAQPage schema exactly.
 */
export const homeEn: HomeContent = {
  /** §12 — consequence first, then the response. One per domain family. */
  problems: [
    {
      id: "downtime",
      label: "Downtime",
      symptom: "Systems fail without warning and recovery depends on who is available.",
      consequence:
        "Work stops. Revenue stops. Confidence takes longer to return than the systems do.",
      response:
        "Remove single points of failure, verify backups by restoring them, and instrument the paths that matter so degradation surfaces before it becomes an outage.",
      expertise: "cloud-infrastructure",
    },
    {
      id: "threats",
      label: "Cyber threats",
      symptom: "No current picture of exposure, and no way to detect an intrusion in progress.",
      consequence:
        "Compromise is discovered through its consequences — encrypted files, a fraudulent transfer, a regulator’s call.",
      response:
        "Establish real exposure, close what is exploitable in risk order, and put detection where there was none.",
      expertise: "cybersecurity",
    },
    {
      id: "connectivity",
      label: "Unreliable connectivity",
      symptom: "Sites lose contact, and the backup link fails at the same moment as the primary.",
      consequence:
        "Branches stop working, calls drop, and the second link you paid for turns out to share the first one’s path.",
      response:
        "Measure real traffic and paths, design for each link failing, and test failover against real failures rather than a pulled cable.",
      expertise: "networks-telecom",
    },
    {
      id: "software-limits",
      label: "Software limitations",
      symptom: "The same data re-entered across systems that cannot exchange it.",
      consequence:
        "Staff time is spent on transcription, and every copy is a chance for the numbers to disagree.",
      response:
        "Integrate what exists where integration is possible, and build only the part that genuinely has to be built.",
      expertise: "digital-engineering",
    },
    {
      id: "manual-ops",
      label: "Operational inefficiency",
      symptom: "Repetitive rule-based work absorbing hours that should go elsewhere.",
      consequence:
        "Capacity is consumed by work that produces no advantage, and it scales linearly with headcount.",
      response:
        "Automate the rule-shaped steps, measure against the manual baseline, and leave consequential judgement with a person.",
      expertise: "ai-data",
    },
    {
      id: "no-owner",
      label: "No one accountable",
      symptom: "IT is handled when something breaks, by whoever has time.",
      consequence:
        "Maintenance is deferred until it becomes an incident, and every incident starts with finding out how things were set up.",
      response:
        "Agree a standard, instrument the estate, and put a named owner and escalation path behind it.",
      expertise: "managed-services",
    },
  ],

  /** §14 — every option maps to a real, scoped engagement. */
  finder: [
    {
      id: "unreliable",
      prompt: "My infrastructure is unreliable.",
      recommendation: "Infrastructure Resilience Assessment",
      rationale:
        "Recurring instability is almost always a small number of undocumented dependencies rather than a general weakness. The assessment finds them.",
      deliverables: [
        "Infrastructure and topology review",
        "Network path and redundancy assessment",
        "Availability and failure-point analysis",
        "Backup integrity and restore test",
        "Security review",
        "Prioritised remediation plan",
      ],
      ctaLabel: "Request an Assessment",
      ctaHref: "/request-audit?scope=cloud-infrastructure",
      expertise: "cloud-infrastructure",
    },
    {
      id: "security",
      prompt: "I need better cybersecurity.",
      recommendation: "Security Posture Assessment",
      rationale:
        "Buying controls before establishing exposure tends to protect what was already defended. Assessment sets the order.",
      deliverables: [
        "Network and segmentation review",
        "Firewall and perimeter configuration review",
        "Endpoint coverage analysis",
        "Identity and privilege review",
        "Patch currency assessment",
        "Written findings with risk-ordered remediation",
      ],
      ctaLabel: "Request a Security Assessment",
      ctaHref: "/request-audit?scope=cybersecurity",
      expertise: "cybersecurity",
    },
    {
      id: "cloud",
      prompt: "I want to migrate to the cloud.",
      recommendation: "Cloud Migration Assessment",
      rationale:
        "The question is which workloads should move, not whether to move. Some should stay, and the assessment says which.",
      deliverables: [
        "Workload inventory and dependency mapping",
        "Total cost comparison across three scenarios",
        "Latency and bandwidth measurement",
        "Data residency analysis",
        "Wave-based migration plan",
        "Rollback strategy per wave",
      ],
      ctaLabel: "Request a Migration Assessment",
      ctaHref: "/request-audit?scope=cloud-infrastructure",
      expertise: "cloud-infrastructure",
    },
    {
      id: "connectivity",
      prompt: "I need to connect my sites.",
      recommendation: "Network & Connectivity Survey",
      rationale:
        "Connectivity fails at the edges first, and on paths that look independent but are not. The survey finds them before they fail together.",
      deliverables: [
        "Site survey and usage inventory",
        "Traffic and path measurement",
        "Shared-path and single-point-of-failure analysis",
        "Wireless coverage assessment",
        "Failover design and test plan",
        "Prioritised remediation plan",
      ],
      ctaLabel: "Plan Your Network",
      ctaHref: "/contact?scope=networks-telecom",
      expertise: "networks-telecom",
    },
    {
      id: "software",
      prompt: "I need custom software.",
      recommendation: "Software Discovery Engagement",
      rationale:
        "The costly mistake is building the wrong thing correctly. Discovery establishes what the work actually requires first.",
      deliverables: [
        "Process observation and analysis",
        "Build-versus-buy recommendation",
        "Functional scope definition",
        "Architecture proposal",
        "Delivery plan with increments",
        "Indicative effort estimate",
      ],
      ctaLabel: "Discuss Your Software Project",
      ctaHref: "/contact?scope=digital-engineering",
      expertise: "digital-engineering",
    },
    {
      id: "automate",
      prompt: "I want to automate operations.",
      recommendation: "Automation Opportunity Review",
      rationale:
        "Automation pays where work is high volume and rule-shaped. The review finds those tasks and rules out the rest.",
      deliverables: [
        "Task inventory with volume and time measurement",
        "Suitability assessment per task",
        "Data readiness check",
        "Pilot scope with success criteria",
        "Effort and payback estimate",
      ],
      ctaLabel: "Discuss an Automation Pilot",
      ctaHref: "/contact?scope=ai-data",
      expertise: "ai-data",
    },
    {
      id: "ai",
      prompt: "I need AI capabilities.",
      recommendation: "Grounded AI Pilot Scoping",
      rationale:
        "Useful organisational AI is narrow and grounded in your own sources. Scoping identifies where that is genuinely true.",
      deliverables: [
        "Use-case identification and prioritisation",
        "Source and data readiness assessment",
        "Accuracy requirement definition",
        "Data handling and residency decision",
        "Narrow pilot scope",
        "Evaluation method",
      ],
      ctaLabel: "Discuss an AI Pilot",
      ctaHref: "/contact?scope=ai-data",
      expertise: "ai-data",
    },
    {
      id: "field",
      prompt: "I need to monitor equipment in the field.",
      recommendation: "Connected-Systems Scoping",
      rationale:
        "Field systems succeed or fail on power, connectivity and what must keep working offline. Scoping settles those constraints before any device is chosen.",
      deliverables: [
        "Equipment and site inventory",
        "Power and connectivity constraints",
        "Data path design",
        "Edge-versus-centre decision",
        "Regulatory frame, where drones or radio links are involved",
        "Pilot scope with success criteria",
      ],
      ctaLabel: "Discuss a Connected-Systems Project",
      ctaHref: "/contact?scope=iot-edge",
      expertise: "iot-edge",
    },
    {
      id: "recovery",
      prompt: "I need disaster recovery.",
      recommendation: "Business Continuity Assessment",
      rationale:
        "Recovery capability is a measurement, not a plan. This establishes what yours currently is.",
      deliverables: [
        "Backup coverage and integrity audit",
        "Live restore test with timing",
        "Recovery objective definition",
        "Continuity gap analysis",
        "Documented recovery runbook",
        "Failover test plan",
      ],
      ctaLabel: "Request a Continuity Assessment",
      ctaHref: "/request-audit?scope=cloud-infrastructure",
      expertise: "cloud-infrastructure",
    },
    {
      id: "unsure",
      prompt: "I don’t know where to start.",
      recommendation: "IT Discovery Session",
      rationale:
        "A structured conversation about how the organisation works, what breaks and what it costs — before anything is proposed.",
      deliverables: [
        "Structured discovery conversation",
        "Current-state summary",
        "Risk and priority identification",
        "Recommended first engagement",
        "No obligation to proceed",
      ],
      ctaLabel: "Book a Discovery Session",
      ctaHref: "/contact?scope=discovery",
      expertise: "consulting-rd",
    },
  ],

  pillars: [
    {
      verb: "Build",
      lede: "We build",
      items: [
        "Software, platforms and APIs",
        "Cloud and hybrid infrastructure",
        "Networks and connectivity",
        "Data and AI systems",
        "Automation and workflows",
        "Connected and edge systems",
      ],
      href: "/expertise/digital-engineering",
    },
    {
      verb: "Secure",
      lede: "We secure",
      items: [
        "Networks and perimeters",
        "Endpoints",
        "Identities and privilege",
        "Applications and APIs",
        "Cloud environments",
        "Data and backups",
      ],
      href: "/expertise/cybersecurity",
    },
    {
      verb: "Operate",
      lede: "We operate",
      items: [
        "Infrastructure and cloud",
        "Networks and sites",
        "Monitoring and alerting",
        "Backup and recovery",
        "Security controls",
        "Support, L1 to L3",
      ],
      href: "/expertise/managed-services",
    },
  ],

  /** §30 — eight stages, one per commitment. */
  method: [
    {
      title: "Discover",
      description: "Understand the organisation, the work and what failure actually costs.",
    },
    {
      title: "Assess",
      description:
        "Measure the current state. Document what exists rather than what is believed to exist.",
    },
    {
      title: "Architect",
      description:
        "Design the target state and the order of change that keeps you running throughout.",
    },
    {
      title: "Build",
      description: "Implement in reversible increments, each validated before the next begins.",
    },
    {
      title: "Secure",
      description: "Harden, review access, and verify controls behave as designed.",
    },
    {
      title: "Deploy",
      description: "Move to production with a rollback path that has been exercised.",
    },
    { title: "Operate", description: "Monitor, maintain and support against an agreed standard." },
    {
      title: "Optimise",
      description: "Review with evidence and feed findings into the next cycle.",
    },
  ],

  /** §62 — the questions people actually put to an assistant about a company. */
  answers: [
    {
      q: "What does D’Yvix IT Solutions do?",
      a: "{entity} It has delivered more than 60 projects since 2012 and works across nine engineering domains: digital and software engineering; cloud, infrastructure and DevOps; cybersecurity and digital resilience; AI, data and automation; networks, telecom and connectivity; IoT, edge and autonomous systems; product, UX and quality engineering; consulting, audit, R&D and innovation; and managed services and support.",
    },
    {
      q: "Where is D’Yvix IT Solutions based?",
      a: "D’Yvix IT Solutions operates from Yaoundé and Douala in Cameroon, serving organisations across Cameroon, Central Africa and the wider continent. It can be reached at {email} or on {phone}, in French or English, on West Africa Time (UTC+1).",
    },
    {
      q: "How long has D’Yvix been operating?",
      a: "Since May 2012 — {years} years. In that time it has grown from a founder-led practice into a seven-person permanent technical team, with several client relationships running eight years or more, including a storage platform managed continuously from 2015 to 2023 and a wireless estate maintained from 2013 to 2021.",
    },
    {
      q: "What has D’Yvix built itself?",
      a: "Alongside client work, D’Yvix develops its own platforms. Back-Node, a business process automation platform bringing together iPaaS, visual workflows, RPA and AI in a no-code interface, is in development. SaCrècheIci, a real-time web platform with a geospatial backend, is in production. Lexora AI and AEGIS will be documented here as they are released.",
    },
    {
      q: "What cybersecurity services does D’Yvix provide?",
      a: "Security assessment and audit, firewall and perimeter security including FortiGate, endpoint protection and EDR, security monitoring in a SOC context, identity and least-privilege access, secure development practices, and business continuity planning. D’Yvix has provided continuous network security for a European diplomatic mission since 2019.",
    },
    {
      q: "Which industries does D’Yvix serve?",
      a: "Government ministries, diplomatic missions, international organisations, financial institutions, healthcare providers, telecom operators and private companies. Delivered work includes an electronic document management system for a government ministry, virtualisation for national public institutions, and storage infrastructure for a telecom operator.",
    },
    {
      q: "Is D’Yvix ISO 27001 certified?",
      a: "The company’s information security practices are aligned to ISO/IEC 27001 — formal NDAs before any access to sensitive systems, least-privilege access limited to assigned team members, and secure development practices. It also holds ITIL Foundation and AWS Certified Cloud Practitioner. Ask us directly for the current certification position before relying on it in a procurement process.",
    },
    {
      q: "What technologies does D’Yvix work with?",
      a: "VMware ESXi, Windows Server and Red Hat Enterprise Linux; TrueNAS and FreeNAS storage; Cisco, MikroTik and Ubiquiti networking; FortiGate and Kaspersky security; Docker, Kubernetes, GitLab CI, Grafana, Prometheus and Zabbix; Python, FastAPI, Laravel, React and TypeScript; PostgreSQL with PostGIS; and self-hosted language models served with vLLM. Technology partnerships include Microsoft, Cisco, Fortinet, Google Cloud, AWS, Oracle, Kaspersky and OVH.",
    },
    {
      q: "Does D’Yvix work with drones?",
      a: "Drones and autonomous technologies are part of D’Yvix’s IoT, edge and autonomous systems domain, subject to the authorisations, certifications and regulations that apply to each deployment. Any such project starts by establishing the regulatory frame before the technical one.",
    },
    {
      q: "How does an organisation request an assessment from D’Yvix?",
      a: "Through the assessment request form on this site, by email to {email}, or by phone. An assessment begins with a scoping conversation, proceeds to discovery and measurement, and concludes with a written report setting out findings, the business risk of each, and a remediation sequence ordered by risk.",
    },
  ],

  /**
   * §15 — working technologies drawn only from delivered work and the
   * company’s own platforms. Not partnership or certification claims.
   */
  techCategories: [
    {
      id: "infrastructure",
      label: "Infrastructure",
      note: "Compute, storage and the systems underneath everything else",
      items: [
        "VMware ESXi",
        "Windows Server",
        "Red Hat Enterprise Linux",
        "Dell PowerEdge",
        "HP ProLiant",
        "TrueNAS",
        "FreeNAS",
      ],
    },
    {
      id: "network",
      label: "Networks & telecom",
      note: "Routing, wireless and the links between sites",
      items: [
        "Cisco",
        "MikroTik",
        "Ubiquiti UniFi",
        "Ubiquiti NanoBeam",
        "Fibre optic",
        "TrixBox PBX",
        "SIP",
        "GSM gateways",
      ],
    },
    {
      id: "security",
      label: "Security",
      note: "Perimeter, endpoint, identity and detection",
      items: [
        "FortiGate",
        "Kaspersky EDR",
        "Kaspersky Endpoint",
        "G-Data EndPoint",
        "SIEM",
        "EDR",
        "IAM",
        "VPN",
      ],
    },
    {
      id: "cloud",
      label: "Cloud & DevOps",
      note: "Public, private and hybrid — and the pipelines that ship to them",
      items: [
        "AWS",
        "Google Cloud",
        "OVH",
        "Docker",
        "Kubernetes",
        "GitLab CI",
        "Prometheus",
        "Grafana",
        "Zabbix",
      ],
    },
    {
      id: "software",
      label: "Software",
      note: "Application and API engineering",
      items: [
        "Python",
        "FastAPI",
        "Celery",
        "Laravel",
        "PHP",
        "React",
        "TypeScript",
        "WebSocket",
        "PostgreSQL",
        "PostGIS",
        "MySQL",
        "MongoDB",
        "Redis",
      ],
    },
    {
      id: "ai",
      label: "AI & data",
      note: "Grounded systems and the pipelines that feed them",
      items: ["DeepSeek", "vLLM", "Retrieval-augmented generation", "RPA", "SQL Server", "Dokmee"],
    },
    {
      id: "edge",
      label: "IoT & edge",
      note: "Connected equipment in the field",
      items: [
        "IP cameras",
        "Wireless mesh",
        "Long-range radio links",
        "Remote supervision",
        "PostGIS geolocation",
      ],
    },
  ],
};
