import type { Problem } from "./types";

/** §12 — the problem section. Consequence first, then the response. */
export const problems: Problem[] = [
  {
    id: "downtime",
    index: "01",
    label: "Downtime",
    symptom: "Systems fail without warning and recovery depends on who is available.",
    consequence:
      "Work stops. Revenue stops. Confidence takes longer to return than the systems do.",
    response:
      "Remove single points of failure, verify backups by restoring them, and instrument the paths that matter so degradation surfaces before it becomes an outage.",
    solution: "infrastructure-cloud",
  },
  {
    id: "threats",
    index: "02",
    label: "Cyber threats",
    symptom: "No current picture of exposure, and no way to detect an intrusion in progress.",
    consequence:
      "Compromise is discovered through its consequences — encrypted files, a fraudulent transfer, a regulator's call.",
    response:
      "Establish real exposure, close what is exploitable in risk order, and put detection where there was none.",
    solution: "cybersecurity",
  },
  {
    id: "legacy",
    index: "03",
    label: "Legacy infrastructure",
    symptom: "Systems that predate current staff, running versions no longer receiving fixes.",
    consequence:
      "Every change carries unknown risk, so changes stop being made, and the gap widens.",
    response:
      "Inventory reality, isolate what cannot be updated, and modernise in reversible increments rather than a single migration.",
    solution: "infrastructure-cloud",
  },
  {
    id: "cloud-cost",
    index: "04",
    label: "Cloud complexity",
    symptom: "Cloud spend growing faster than usage, with no clear attribution.",
    consequence:
      "Cost becomes unpredictable and the flexibility that justified the move is never actually realised.",
    response:
      "Model the trade in numbers, place workloads where they perform and price best, and make spend visible and attributable.",
    solution: "infrastructure-cloud",
  },
  {
    id: "software-limits",
    index: "05",
    label: "Software limitations",
    symptom: "The same data re-entered across systems that cannot exchange it.",
    consequence:
      "Staff time is spent on transcription, and every copy is a chance for the numbers to disagree.",
    response:
      "Integrate what exists where integration is possible, and build only the part that genuinely has to be built.",
    solution: "software-engineering",
  },
  {
    id: "manual-ops",
    index: "06",
    label: "Operational inefficiency",
    symptom: "Repetitive rule-based work absorbing hours that should go elsewhere.",
    consequence:
      "Capacity is consumed by work that produces no advantage, and it scales linearly with headcount.",
    response:
      "Automate the rule-shaped steps, measure against the manual baseline, and leave consequential judgement with a person.",
    solution: "applied-ai",
  },
];

/** §14 — Solution Finder. Every option maps to a real, scoped engagement. */
export const finderOptions = [
  {
    id: "unreliable",
    prompt: "My infrastructure is unreliable.",
    recommendation: "Infrastructure Resilience Assessment",
    solution: "infrastructure-cloud",
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
    cta: { label: "Request an Assessment", href: "/request-audit?scope=infrastructure" },
  },
  {
    id: "security",
    prompt: "I need better cybersecurity.",
    recommendation: "Security Posture Assessment",
    solution: "cybersecurity",
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
    cta: { label: "Request a Security Assessment", href: "/request-audit?scope=cybersecurity" },
  },
  {
    id: "infrastructure-cloud",
    prompt: "I want to migrate to the cloud.",
    recommendation: "Cloud Migration Assessment",
    solution: "infrastructure-cloud",
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
    cta: { label: "Request a Migration Assessment", href: "/request-audit?scope=cloud" },
  },
  {
    id: "software",
    prompt: "I need custom software.",
    recommendation: "Software Discovery Engagement",
    solution: "software-engineering",
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
    cta: { label: "Discuss Your Software Project", href: "/contact?scope=software-engineering" },
  },
  {
    id: "automate",
    prompt: "I want to automate operations.",
    recommendation: "Automation Opportunity Review",
    solution: "applied-ai",
    rationale:
      "Automation pays where work is high volume and rule-shaped. The review finds those tasks and rules out the rest.",
    deliverables: [
      "Task inventory with volume and time measurement",
      "Suitability assessment per task",
      "Data readiness check",
      "Pilot scope with success criteria",
      "Effort and payback estimate",
    ],
    cta: { label: "Discuss an Automation Pilot", href: "/contact?scope=ai-automation" },
  },
  {
    id: "ai",
    prompt: "I need AI capabilities.",
    recommendation: "Grounded AI Pilot Scoping",
    solution: "applied-ai",
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
    cta: { label: "Discuss an AI Pilot", href: "/contact?scope=ai-automation" },
  },
  {
    id: "recovery",
    prompt: "I need disaster recovery.",
    recommendation: "Business Continuity Assessment",
    solution: "infrastructure-cloud",
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
    cta: { label: "Request a Continuity Assessment", href: "/request-audit?scope=infrastructure" },
  },
  {
    id: "unsure",
    prompt: "I don't know where to start.",
    recommendation: "IT Discovery Session",
    solution: "managed-services",
    rationale:
      "A structured conversation about how the organisation works, what breaks and what it costs — before anything is proposed.",
    deliverables: [
      "Structured discovery conversation",
      "Current-state summary",
      "Risk and priority identification",
      "Recommended first engagement",
      "No obligation to proceed",
    ],
    cta: { label: "Book a Discovery Session", href: "/contact?scope=discovery" },
  },
] as const;

/** §30 — the engineering method. Eight stages, one per commitment. */
export const method = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the organisation, the work and what failure actually costs.",
  },
  {
    step: "02",
    title: "Assess",
    description:
      "Measure the current state. Document what exists rather than what is believed to exist.",
  },
  {
    step: "03",
    title: "Architect",
    description:
      "Design the target state and the order of change that keeps you running throughout.",
  },
  {
    step: "04",
    title: "Build",
    description: "Implement in reversible increments, each validated before the next begins.",
  },
  {
    step: "05",
    title: "Secure",
    description: "Harden, review access, and verify controls behave as designed.",
  },
  {
    step: "06",
    title: "Deploy",
    description: "Move to production with a rollback path that has been exercised.",
  },
  {
    step: "07",
    title: "Operate",
    description: "Monitor, maintain and support against an agreed standard.",
  },
  {
    step: "08",
    title: "Optimise",
    description: "Review with evidence and feed findings into the next cycle.",
  },
] as const;

/** §24 — persona routing. No tracking, no storage; a navigation aid only. */
export const personas = [
  {
    id: "ceo",
    label: "CEO / Executive",
    concern: "Risk, cost and continuity",
    route: "/industries/sme",
    note: "Start with what an outage or breach would actually cost you.",
  },
  {
    id: "it-manager",
    label: "IT Manager",
    concern: "Day-to-day operation and backlog",
    route: "/solutions/managed-services",
    note: "Start with the deferred maintenance backlog and monitoring.",
  },
  {
    id: "cto",
    label: "CTO",
    concern: "Architecture and delivery capability",
    route: "/solutions/software-engineering",
    note: "Start with architecture and the path to production.",
  },
  {
    id: "ciso",
    label: "CISO / Security Lead",
    concern: "Exposure and detection",
    route: "/solutions/cybersecurity",
    note: "Start with an independent assessment of current exposure.",
  },
  {
    id: "cfo",
    label: "CFO",
    concern: "Predictable cost",
    route: "/solutions/infrastructure-cloud",
    note: "Start with total cost modelling before any migration decision.",
  },
  {
    id: "engineer",
    label: "Engineer / Developer",
    concern: "Tooling and pipelines",
    route: "/solutions/infrastructure-cloud",
    note: "Start with build reproducibility, then deployment.",
  },
] as const;
