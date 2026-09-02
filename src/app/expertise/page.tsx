import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { techCategories } from "@/content/technologies";
import { solutions } from "@/content/solutions";
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
  { name: "Expertise", path: "/expertise" },
];

export const metadata = pageMeta({
  title: "Expertise",
  description: `The technologies ${site.legalName} deploys and operates across infrastructure, networking, security, cloud, software engineering, DevOps and AI — and the service lines each one supports.`,
  path: "/expertise",
});

/** Technology category to the solutions that actually use it. */
const CATEGORY_TO_SOLUTIONS: Record<string, string[]> = {
  infrastructure: ["infrastructure-cloud", "managed-services", "infrastructure-cloud"],
  network: ["infrastructure-cloud", "cybersecurity", "managed-services"],
  security: ["cybersecurity", "infrastructure-cloud", "managed-services"],
  cloud: ["infrastructure-cloud", "infrastructure-cloud", "infrastructure-cloud"],
  software: ["software-engineering", "applied-ai", "infrastructure-cloud"],
  devops: ["infrastructure-cloud", "software-engineering", "infrastructure-cloud"],
  ai: ["applied-ai", "software-engineering"],
};

/**
 * Expertise hub.
 *
 * Deliberately one substantive page rather than ~40 per-technology stubs.
 * §77 and §82 both warn against thin pages generated because a term might
 * rank: a /expertise/fortigate page earns its place once it carries real
 * technical content, and that belongs in the content roadmap, not in this
 * build. The links below give every technology a genuine internal path.
 */
export default function ExpertisePage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: "Technology expertise",
          itemListElement: techCategories.flatMap((c, ci) =>
            c.items.map((item, ii) => ({
              "@type": "ListItem",
              position: ci * 100 + ii + 1,
              name: item,
            })),
          ),
        })}
      />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="Expertise"
        title="The tools, and what we use them for."
        standfirst="A technology is only meaningful in the context of the problem it solves. Each group below links to the service lines where it does real work."
      />

      <section aria-labelledby="expertise-heading" className="border-b border-line">
        <Container>
          <h2 id="expertise-heading" className="sr-only">
            Technology categories
          </h2>

          <div className="border-t border-line">
            {techCategories.map((cat) => {
              const linked = (CATEGORY_TO_SOLUTIONS[cat.id] ?? [])
                .map((slug) => solutions.find((s) => s.slug === slug))
                .filter(Boolean);

              return (
                <div
                  key={cat.id}
                  id={cat.id}
                  className="grid gap-6 border-b border-line py-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14"
                >
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <h3 className="text-(length:--text-h3) font-semibold tracking-[-0.025em]">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-(length:--text-sm) leading-snug text-ink-faint">
                      {cat.note}
                    </p>
                  </div>

                  <div>
                    <ul className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-(--radius-sm) border border-line bg-surface-raised px-3 py-1.5 font-mono text-(length:--text-micro) text-ink-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="rail-label mt-8 mb-3">Used in</p>
                    <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
                      {linked.map((s) => (
                        <li key={s!.slug} className="bg-surface">
                          <Link
                            href={`/solutions/${s!.slug}`}
                            className="group flex items-center justify-between gap-3 p-4 text-(length:--text-sm) transition-colors duration-(--duration-fast) hover:bg-surface-raised"
                          >
                            {s!.name}
                            <ArrowUpRight
                              size={13}
                              aria-hidden="true"
                              className="shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-line py-10">
            <p className="max-w-[68ch] text-(length:--text-sm) leading-relaxed text-ink-faint">
              These are technologies we deploy and operate. Nothing on this page asserts vendor
              partnership, certification, accreditation or authorised-reseller status. Where a
              procurement process requires evidence of a specific certification, ask us directly and
              we will tell you what we do and do not hold.
            </p>
          </div>
        </Container>
      </section>

      <CTABand
        title="Working with something not listed?"
        body="The list reflects what we deploy routinely, not the limit of what we will engage with. Tell us what you run."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "See all solutions", href: "/solutions" }}
      />
    </>
  );
}
