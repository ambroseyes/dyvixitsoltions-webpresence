import { site, yearsInOperation } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import type { FAQ } from "@/content/types";

/**
 * §62 — answer-engine content.
 *
 * These are the questions people actually put to an assistant about a
 * company. Answers are written for a human reader first (§82) and are plain
 * server-rendered <dl> markup so extraction needs no interaction. The same
 * array feeds FAQPage schema on the homepage — the rendered copy and the
 * structured data are never allowed to diverge.
 */
export const homeFaqs: FAQ[] = [
  {
    q: "What does D’Yvix IT Solutions do?",
    a: `${site.entityStatement} It has delivered more than 60 projects since 2012 across seven service lines: software engineering; infrastructure and cloud; cybersecurity and DevSecOps; data, geospatial and document management; applied AI; managed services; and technical training.`,
  },
  {
    q: "Where is D’Yvix IT Solutions based?",
    a: "D’Yvix IT Solutions operates from Yaoundé and Douala in Cameroon, serving organisations across Cameroon, Central Africa and the wider continent. It can be reached at contact@dyvixitsolutions.com or on +237 674 29 44 55, in French or English, on West Africa Time (UTC+1).",
  },
  {
    q: "How long has D’Yvix been operating?",
    a: `Since May 2012 — ${yearsInOperation()} years. In that time it has grown from a founder-led practice into a seven-person permanent technical team, with several client relationships running eight years or more, including a storage platform managed continuously from 2015 to 2023 and a wireless estate maintained from 2013 to 2021.`,
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
    a: "VMware ESXi, Windows Server and Red Hat Enterprise Linux; TrueNAS and FreeNAS storage; Cisco, MikroTik and Ubiquiti networking; FortiGate and Kaspersky security; Docker, GitLab CI, Grafana, Prometheus and Zabbix; Python, FastAPI, Laravel, React and TypeScript; and PostgreSQL with PostGIS. Technology partnerships include Microsoft, Cisco, Fortinet, Google Cloud, AWS, Oracle, Kaspersky and OVH.",
  },
  {
    q: "How does an organisation request an assessment from D’Yvix?",
    a: "Through the assessment request form on this site, by email to contact@dyvixitsolutions.com, or by phone. An assessment begins with a scoping conversation, proceeds to discovery and measurement, and concludes with a written report setting out findings, the business risk of each, and a remediation sequence ordered by risk.",
  },
];

export function AnswerLayer() {
  return (
    <Section
      id="answers"
      index="08"
      label="Direct answers"
      title="Questions people ask about D’Yvix."
      standfirst="Stated plainly, so both a person in a hurry and a machine reading this page get the same answer."
      className="border-b border-line"
    >
      <dl className="grid gap-px border border-line bg-line md:grid-cols-2">
        {homeFaqs.map((f, i) => (
          <div key={f.q} className="bg-surface p-6 sm:p-8">
            {/* dt/dd must be direct children of this wrapper: a <dl> may only
                contain dt, dd, or a div grouping them. */}
            <dt className="flex items-baseline gap-3 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
              <span className="rail-index shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{f.q}</span>
            </dt>
            <dd className="mt-4 pl-9 text-(length:--text-sm) leading-relaxed text-ink-muted">
              {f.a}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
