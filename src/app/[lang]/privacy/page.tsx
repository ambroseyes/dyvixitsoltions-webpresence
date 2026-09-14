import type { Metadata } from "next";

import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
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
  const page = getPages(lang).privacy;
  return pageMeta({
    lang,
    title: page.metaTitle,
    description: format(page.description, { legalName: site.legalName, url: site.url }),
    path: "/privacy",
  });
}

/**
 * Describes what this build actually does today. Every statement here is
 * checkable against the source. Revisit it the moment analytics, a CRM or an
 * email provider is connected — a privacy notice that has drifted from the
 * implementation is worse than none.
 */
export default async function PrivacyPage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const page = getPages(lang).privacy;
  const trail = breadcrumbTrail(lang, [{ name: page.label, path: "/privacy" }]);

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={page.label} title={page.title} standfirst={page.standfirst} />

      <Container>
        <div className="border-t border-line">
          {page.sections.map((s, i) => (
            <SpecRow key={s.label} index={String(i + 1).padStart(2, "0")} label={s.label}>
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
