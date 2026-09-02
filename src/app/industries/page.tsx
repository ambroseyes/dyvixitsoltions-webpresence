import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { industries } from "@/content/industries";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABand } from "@/components/ui/CTABand";

const trail = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export const metadata = pageMeta({
  title: "Industries",
  description: `${site.legalName} serves financial services, government, healthcare, education, small and medium enterprises, and critical infrastructure operators across Cameroon and Africa.`,
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: "Sectors served",
          itemListElement: industries.map((i, n) => ({
            "@type": "ListItem",
            position: n + 1,
            name: i.name,
            url: `${site.url}/industries/${i.slug}`,
          })),
        })}
      />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="Sectors"
        title="The obligations change. The engineering discipline does not."
        standfirst="Every sector carries its own failure profile — what breaks, what it costs, and who has to be told. Engagements are scoped against those obligations rather than against a generic checklist."
      />

      <section aria-labelledby="industries-heading" className="border-b border-line">
        <Container>
          <h2 id="industries-heading" className="sr-only">
            All industries
          </h2>
          <ul className="grid gap-px border border-line bg-line py-0 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <li key={i.slug} className="bg-surface">
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                >
                  <div className="flex items-center justify-between">
                    <span className="rail-index">{i.index}</span>
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="text-primary opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100"
                    />
                  </div>

                  <h3 className="mt-6 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                    {i.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-(length:--text-sm) leading-relaxed text-ink-muted">
                    {i.summary}
                  </p>

                  <div className="dimension-rule mt-7 mb-4" aria-hidden="true" />
                  <p className="rail-label">{i.solutions.length} mapped solutions</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABand
        title="Your sector is not on the list?"
        body="The list reflects where sector-specific obligations change the engineering. If yours is not here, the underlying work is the same — tell us what you operate."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "See all solutions", href: "/solutions" }}
      />
    </>
  );
}
