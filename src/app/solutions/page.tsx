import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { solutions } from "@/content/solutions";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";
import { MethodTimeline } from "@/components/home/MethodTimeline";

const trail = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
];

export const metadata = pageMeta({
  title: "Solutions",
  description: `${site.legalName} delivers seven lines of engineering: IT infrastructure, cybersecurity, cloud, software engineering, DevOps, AI and automation, and managed IT services for organisations in Cameroon and Africa.`,
  path: "/solutions",
});

/**
 * Solution index — the pillar page for the capability cluster (§61).
 * Every leaf is linked from here, and every leaf links back.
 */
export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: "D’Yvix IT Solutions — service lines",
          itemListElement: solutions.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `${site.url}/solutions/${s.slug}`,
          })),
        })}
      />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="Capability"
        title="Seven lines of engineering."
        standfirst="Each is delivered as a defined engagement with a stated scope, named deliverables and a written outcome — not an open-ended retainer."
      />

      <section aria-labelledby="solutions-list-heading" className="border-b border-line">
        <Container>
          <h2 id="solutions-list-heading" className="sr-only">
            All solutions
          </h2>
          <ul className="border-t border-line">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group grid gap-5 border-b border-line py-9 transition-colors duration-(--duration-normal) hover:bg-surface-raised lg:grid-cols-[minmax(0,4rem)_minmax(0,20rem)_minmax(0,1fr)_auto] lg:items-baseline lg:gap-10"
                >
                  <span className="rail-index">{s.index}</span>

                  <div>
                    <h3 className="text-(length:--text-h3) font-semibold tracking-[-0.025em]">
                      {s.name}
                    </h3>
                    <div className="mt-3">
                      <Badge tone={s.sourceService ? "verified" : "neutral"}>
                        {s.sourceService ? "Delivered" : "Stated capability"}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="max-w-[58ch] text-(length:--text-base) leading-relaxed text-ink-muted">
                      {s.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                      {s.technologies.slice(0, 6).map((t) => (
                        <li key={t} className="font-mono text-(length:--text-micro) text-ink-faint">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="hidden shrink-0 text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:-translate-y-1 group-hover:translate-x-1 lg:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <MethodTimeline />

      <CTABand
        title="Not sure which one you need?"
        body="Describe the problem rather than the solution. We will tell you which engagement fits — including when the answer is that you do not need one."
        primary={{ label: "Request an Assessment", href: "/request-audit" }}
        secondary={{ label: "Use the solution finder", href: "/#solution-finder" }}
      />
    </>
  );
}
