import type { Metadata } from "next";
import { Check } from "lucide-react";

import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getPages } from "@/content/pages";
import { breadcrumbTrail } from "@/lib/nav";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqBlock } from "@/components/ui/FaqBlock";

type Params = { params: Promise<{ lang: string }> };
type Props = Params & { searchParams: Promise<{ scope?: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return pageMeta({
    lang,
    title: dict.nav.requestAssessment,
    description: dict.audit.standfirst,
    path: "/request-audit",
  });
}

export default async function RequestAuditPage({ params, searchParams }: Props) {
  const lang = await resolveLang(params);
  const { scope } = await searchParams;
  const dict = getDictionary(lang);
  const t = dict.audit;
  const faqs = getPages(lang).auditFaqs;
  const trail = breadcrumbTrail(lang, [
    { name: dict.nav.requestAssessment, path: "/request-audit" },
  ]);

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(faqs))} />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={t.label} title={t.title} standfirst={t.standfirst} />

      <section aria-labelledby="audit-form-heading" className="border-b border-line">
        <Container>
          <div className="grid gap-12 py-(--spacing-section-tight) lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 id="audit-form-heading" className="sr-only">
                {t.formHeading}
              </h2>
              <EnquiryForm
                lang={lang}
                labels={dict.form}
                defaultScope={scope ?? "audit"}
                variant="audit"
              />
            </div>

            <aside aria-labelledby="included-heading">
              <h2 id="included-heading" className="rail-label">
                {t.includedHeading}
              </h2>
              <ul className="mt-5 grid gap-3">
                {t.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-(length:--text-sm) leading-relaxed"
                  >
                    <Check
                      size={14}
                      strokeWidth={2.25}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-verified"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-l-2 border-primary py-1 pl-5">
                <p className="text-(length:--text-sm) leading-relaxed text-ink-muted">{t.note}</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <FaqBlock faqs={faqs} title={t.faqTitle} label={dict.common.questions} />
    </>
  );
}
