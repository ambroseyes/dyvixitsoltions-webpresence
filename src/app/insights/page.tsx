import Link from "next/link";
import { ArrowUpRight, CircleDashed } from "lucide-react";

import { articles } from "@/content/insights";
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
  { name: "Insights", path: "/insights" },
];

export const metadata = pageMeta({
  title: "Insights",
  description: `Engineering writing from ${site.legalName} on infrastructure, networking, cybersecurity, cloud and software — written from delivery experience rather than assembled from other people's articles.`,
  path: "/insights",
});

/** Planned, not published. Listed openly rather than implied by an empty page. */
const PLANNED = [
  "FortiGate SD-WAN failover: architecture and troubleshooting",
  "Designing secure FastAPI applications for enterprise environments",
  "Business continuity architecture for systems that cannot stop",
  "Cloud migration when bandwidth is the constraint, not compute",
  "Segmenting a flat network without stopping the business",
];

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "Blog",
          name: `${site.legalName} Insights`,
          url: `${site.url}/insights`,
          description: "Engineering writing on infrastructure, security, cloud and software.",
          publisher: { "@id": `${site.url}/#organization` },
        })}
      />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="Insights"
        title="Engineering writing, not content marketing."
        standfirst="Articles are written from delivery experience and published when there is something specific to say. There is no publishing schedule to fill."
      />

      <section aria-labelledby="articles-heading" className="border-b border-line">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2 id="articles-heading" className="rail-label mb-8">
              Published
            </h2>

            <ul className="border-t border-line">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/insights/${a.slug}`}
                    className="group grid gap-4 border-b border-line py-9 transition-colors duration-(--duration-normal) hover:bg-surface-raised lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] lg:gap-10"
                  >
                    <div>
                      <time dateTime={a.published} className="rail-label block">
                        {new Date(a.published).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <span className="rail-label mt-1.5 block text-ink-faint">
                        {a.readingMinutes} min read
                      </span>
                    </div>

                    <div>
                      <h3 className="max-w-[24ch] text-(length:--text-h3) font-semibold tracking-[-0.025em]">
                        {a.title}
                      </h3>
                      <p className="mt-3 max-w-[62ch] text-(length:--text-base) leading-relaxed text-ink-muted">
                        {a.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                        {a.topics.map((t) => (
                          <li
                            key={t}
                            className="font-mono text-(length:--text-micro) text-ink-faint"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ArrowUpRight
                      size={20}
                      aria-hidden="true"
                      className="hidden shrink-0 self-center text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:-translate-y-1 group-hover:translate-x-1 lg:block"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="planned-heading" className="border-b border-line bg-surface-sunken">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <div className="flex items-center gap-3">
              <CircleDashed
                size={15}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-ink-faint"
              />
              <h2 id="planned-heading" className="rail-label">
                In the writing queue
              </h2>
            </div>
            <p className="mt-5 max-w-[62ch] text-(length:--text-base) text-ink-muted">
              Listed so you can see the direction rather than an empty archive. These are not
              published yet and are not linked.
            </p>
            <ul className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2">
              {PLANNED.map((p, i) => (
                <li key={p} className="flex items-start gap-3 bg-surface p-5">
                  <span className="rail-index shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-(length:--text-sm) text-ink-muted">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABand
        title="Have a problem worth writing about?"
        body="The articles here come out of real engagements. If you are wrestling with something specific, tell us."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "Request an Assessment", href: "/request-audit" }}
      />
    </>
  );
}
