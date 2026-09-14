import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getIndustries } from "@/content/industries";
import { breadcrumbTrail } from "@/lib/nav";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABand } from "@/components/ui/CTABand";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return pageMeta({
    lang,
    title: dict.nav.industries,
    description: dict.industries.standfirst,
    path: "/industries",
  });
}

export default async function IndustriesPage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const t = dict.industries;
  const industries = getIndustries(lang);
  const trail = breadcrumbTrail(lang, [{ name: dict.nav.industries, path: "/industries" }]);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: t.listHeading,
          itemListElement: industries.map((i, n) => ({
            "@type": "ListItem",
            position: n + 1,
            name: i.name,
            url: absoluteUrl(localePath(lang, `/industries/${i.slug}`)),
          })),
        })}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={t.label} title={t.title} standfirst={t.standfirst} />

      <section aria-labelledby="industries-heading" className="border-b border-line">
        <Container>
          <h2 id="industries-heading" className="sr-only">
            {t.listHeading}
          </h2>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <li key={i.slug} className="bg-surface">
                <Link
                  href={localePath(lang, `/industries/${i.slug}`)}
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
                  <p className="rail-label">{format(t.mapped, { count: i.expertise.length })}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABand
        title={t.ctaTitle}
        body={t.ctaBody}
        primary={{ label: dict.nav.startProject, href: localePath(lang, "/contact") }}
        secondary={{ label: dict.nav.expertise, href: localePath(lang, "/expertise") }}
      />
    </>
  );
}
