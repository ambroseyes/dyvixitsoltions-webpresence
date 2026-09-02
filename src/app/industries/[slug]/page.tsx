import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react";

import { industries, industryBySlug } from "@/content/industries";
import { solutionBySlug } from "@/content/solutions";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";
import { Button } from "@/components/ui/Button";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { CTABand } from "@/components/ui/CTABand";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) return {};
  return pageMeta({
    title: `${i.name} IT & Cybersecurity`,
    description: `${site.legalName} delivers infrastructure, cybersecurity, cloud and software engineering for ${i.name.toLowerCase()} organisations in Cameroon and Africa. ${i.summary}`,
    path: `/industries/${i.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  const mapped = industry.solutions.map(solutionBySlug).filter(Boolean);

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(industry.faqs))} />

      <Breadcrumbs trail={trail} />

      <PageHero
        index={industry.index}
        label={`Sector — ${industry.name}`}
        title={industry.headline}
        standfirst={industry.standfirst}
      >
        <Button href="/request-audit" size="lg">
          Request an Assessment
          <ArrowRight size={15} aria-hidden="true" />
        </Button>
      </PageHero>

      <Container>
        <div className="border-t border-line">
          <SpecRow index="01" label="Sector pressures">
            <ul className="grid gap-px border border-line bg-line">
              {industry.pressures.map((p) => (
                <li
                  key={p}
                  className="bg-surface px-5 py-4 text-(length:--text-base) text-ink-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="02" label="What goes wrong">
            <ul className="grid gap-3">
              {industry.risks.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 border-l-2 border-risk/50 py-1 pl-5 text-(length:--text-base)"
                >
                  <TriangleAlert
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-risk"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="03" label="Where we start">
            <ol className="grid gap-px border border-line bg-line">
              {mapped.map((s, n) => (
                <li key={s!.slug} className="bg-surface">
                  <Link
                    href={`/solutions/${s!.slug}`}
                    className="group flex items-start justify-between gap-6 p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="rail-index">{String(n + 1).padStart(2, "0")}</span>
                        <h3 className="text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                          {s!.name}
                        </h3>
                      </div>
                      <p className="mt-2 pl-9 text-(length:--text-sm) leading-relaxed text-ink-muted">
                        {s!.summary}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-primary opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-[62ch] text-(length:--text-sm) text-ink-faint">
              Ordered by what usually matters most in this sector. The sequence changes once an
              assessment establishes where you actually stand.
            </p>
          </SpecRow>
        </div>
      </Container>

      <FaqBlock faqs={industry.faqs} index="04" title={`${industry.name}: common questions`} />

      <CTABand
        title={`Engineering for ${industry.name.toLowerCase()}.`}
        body="Start with an assessment scoped to the obligations you are actually held to."
        primary={{ label: "Request an Assessment", href: "/request-audit" }}
        secondary={{ label: "All industries", href: "/industries" }}
      />
    </>
  );
}
