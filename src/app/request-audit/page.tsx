import { Check } from "lucide-react";

import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqBlock } from "@/components/ui/FaqBlock";
import type { FAQ } from "@/content/types";

const trail = [
  { name: "Home", path: "/" },
  { name: "Request an Assessment", path: "/request-audit" },
];

export const metadata = pageMeta({
  title: "Request an Assessment",
  description: `Request an infrastructure, cybersecurity, cloud or business continuity assessment from ${site.legalName}. Independent review, written findings, and a remediation plan ordered by risk.`,
  path: "/request-audit",
});

const auditFaqs: FAQ[] = [
  {
    q: "What does an assessment cost?",
    a: "It depends on estate size and number of sites, so a figure is quoted after a short scoping conversation rather than guessed here. Scope, deliverables and price are agreed in writing before work starts, and the price does not move unless the scope does.",
  },
  {
    q: "How long does it take?",
    a: "A single-site estate is typically one to two weeks from kick-off to written report. Multi-site estates take longer, driven mainly by the number of locations rather than the complexity of any one of them.",
  },
  {
    q: "Will it disrupt our operations?",
    a: "No. Assessment work is read-only by default: configuration review, passive analysis and interviews with your team. Anything intrusive — active scanning against production, or a live restore test — is scheduled and agreed in writing in advance.",
  },
  {
    q: "What do we actually receive?",
    a: "A written report: what was examined, what was found, the business risk attached to each finding, and a remediation sequence ordered by risk. It is written to be handed to a board or an auditor, and it is yours whether or not you engage us for the remediation.",
  },
  {
    q: "Are we obliged to use D’Yvix for the remediation?",
    a: "No. The report is a deliverable in its own right and is written so another provider could act on it. If the right answer is that your incumbent should fix it, the report says so.",
  },
];

const INCLUDED = [
  "Structured scoping conversation before anything is quoted",
  "Discovery against the live estate, not against documentation",
  "Written findings with business risk stated per item",
  "Remediation sequence ordered by risk, not by ease",
  "A report you can hand to a board or an auditor",
  "No obligation to engage us for the remediation",
];

export default async function RequestAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string }>;
}) {
  const { scope } = await searchParams;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(auditFaqs))} />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="Assessment"
        title="Know where you stand before you spend."
        standfirst="An independent assessment establishes what your estate actually looks like — not what the documentation claims — and tells you what to fix first."
      />

      <section aria-labelledby="audit-form-heading" className="border-b border-line">
        <Container>
          <div className="grid gap-12 py-(--spacing-section-tight) lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 id="audit-form-heading" className="sr-only">
                Assessment request form
              </h2>
              <EnquiryForm defaultScope={scope ?? "audit"} variant="audit" />
            </div>

            <aside aria-labelledby="included-heading">
              <h2 id="included-heading" className="rail-label">
                Every assessment includes
              </h2>
              <ul className="mt-5 grid gap-3">
                {INCLUDED.map((i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-(length:--text-sm) leading-relaxed"
                  >
                    <Check
                      size={14}
                      strokeWidth={2.25}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-verified"
                    />
                    {i}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-l-2 border-primary py-1 pl-5">
                <p className="text-(length:--text-sm) leading-relaxed text-ink-muted">
                  An assessment that concludes your estate is in good order is a successful
                  assessment. We would rather tell you that than sell you a remediation you do not
                  need.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <FaqBlock faqs={auditFaqs} title="Assessments: common questions" />
    </>
  );
}
