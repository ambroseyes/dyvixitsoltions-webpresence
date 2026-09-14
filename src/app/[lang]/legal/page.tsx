import type { Metadata } from "next";

import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getCompany } from "@/content/company";
import { getPages } from "@/content/pages";
import { breadcrumbTrail } from "@/lib/nav";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/lib/site";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";
import { TokenText } from "@/components/ui/TokenText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const page = getPages(lang).legal;
  return pageMeta({
    lang,
    title: page.metaTitle,
    description: format(page.description, { legalName: site.legalName, url: site.url }),
    path: "/legal",
  });
}

export default async function LegalPage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const page = getPages(lang).legal;
  const labels = page.publisherLabels;
  const trail = breadcrumbTrail(lang, [{ name: page.label, path: "/legal" }]);

  const publisher = [
    { label: labels.name, value: site.legalName, href: null },
    { label: labels.email, value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: labels.phone, value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}` },
    {
      label: labels.location,
      value: `${site.address.locality}, ${getCompany(lang).countryName}`,
      href: null,
    },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={page.label} title={page.title} standfirst={page.standfirst} />

      <Container>
        <div className="border-t border-line">
          {page.sections.map((s, i) => (
            <SpecRow key={s.label} index={String(i + 1).padStart(2, "0")} label={s.label}>
              {/* The first section is the publisher: its facts come from lib/site. */}
              {i === 0 && (
                <dl className="mb-6 grid gap-3 text-(length:--text-base) text-ink-muted">
                  {publisher.map((row) => (
                    <div key={row.label} className="flex flex-wrap gap-x-3">
                      <dt className="rail-label w-32 shrink-0 pt-1">{row.label}</dt>
                      <dd>
                        {row.href ? (
                          <a href={row.href} className="hover:text-primary">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="max-w-[64ch] space-y-4 text-(length:--text-base) leading-relaxed text-ink-muted">
                {s.paragraphs.map((p) => (
                  <p key={p}>
                    <TokenText text={p} />
                  </p>
                ))}
                {s.placeholder && (
                  <p className="text-(length:--text-sm) text-ink-faint">{s.placeholder}</p>
                )}
              </div>
            </SpecRow>
          ))}
        </div>
      </Container>
    </>
  );
}
