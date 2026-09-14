import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getExpertiseBySlug } from "@/content/expertise";
import { getProducts, hasDetailPage } from "@/content/products";
import type { Expertise, ProductStatus } from "@/content/types";
import { breadcrumbTrail, productHref } from "@/lib/nav";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";

type Props = { params: Promise<{ lang: string }> };

const STATUS_TONE: Record<ProductStatus, "verified" | "info" | "neutral"> = {
  production: "verified",
  development: "info",
  forthcoming: "neutral",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return pageMeta({
    lang,
    title: dict.nav.solutions,
    description: dict.solutions.standfirst,
    path: "/solutions",
  });
}

/**
 * D’Yvix platforms. Each is described only as far as a source supports it:
 * a product without a confirmed description is a card with its status, not
 * a page padded out with guesses inferred from its name.
 */
export default async function SolutionsPage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const t = dict.solutions;
  const products = getProducts(lang);
  const trail = breadcrumbTrail(lang, [{ name: dict.nav.solutions, path: "/solutions" }]);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: t.listHeading,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            url: absoluteUrl(localePath(lang, productHref(p))),
          })),
        })}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={t.label} title={t.title} standfirst={t.standfirst} />

      <section aria-labelledby="products-heading" className="border-b border-line">
        <Container>
          <h2 id="products-heading" className="sr-only">
            {t.listHeading}
          </h2>
          <ul className="border-t border-line">
            {products.map((p, i) => {
              const builtOn = p.expertise
                .map((slug) => getExpertiseBySlug(lang, slug))
                .filter((x): x is Expertise => x !== undefined);
              return (
                <li
                  key={p.slug}
                  id={p.slug}
                  className="grid scroll-mt-24 gap-6 border-b border-line py-10 lg:grid-cols-[minmax(0,4rem)_minmax(0,18rem)_minmax(0,1fr)] lg:gap-10"
                >
                  <span className="rail-index">{String(i + 1).padStart(2, "0")}</span>

                  <div>
                    <h3 className="text-(length:--text-h3) font-semibold tracking-[-0.025em]">
                      {p.name}
                    </h3>
                    <div className="mt-3">
                      <Badge tone={STATUS_TONE[p.status]}>{t.status[p.status]}</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="max-w-[60ch] text-(length:--text-base) leading-relaxed text-ink-muted">
                      {p.tagline ?? t.forthcomingBody}
                    </p>
                    {p.tagline && !hasDetailPage(p) && (
                      <p className="mt-3 max-w-[60ch] text-(length:--text-sm) text-ink-faint">
                        {t.forthcomingBody}
                      </p>
                    )}

                    {p.stack.length > 0 && (
                      <>
                        <p className="rail-label mt-6 mb-2">{t.stack}</p>
                        <ul className="flex flex-wrap gap-1.5">
                          {p.stack.map((s) => (
                            <li
                              key={s}
                              className="rounded-(--radius-sm) border border-line px-2 py-0.5 font-mono text-(length:--text-micro) text-ink-faint"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {builtOn.length > 0 && (
                      <>
                        <p className="rail-label mt-6 mb-2">{t.builtOn}</p>
                        <ul className="flex flex-wrap gap-x-5 gap-y-2">
                          {builtOn.map((e) => (
                            <li key={e.slug}>
                              <Link
                                href={localePath(lang, `/expertise/${e.slug}`)}
                                className="text-(length:--text-sm) text-primary hover:underline"
                              >
                                {e.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {hasDetailPage(p) && (
                      <Link
                        href={localePath(lang, productHref(p))}
                        className="mt-7 inline-flex items-center gap-2 text-(length:--text-sm) font-medium text-primary hover:underline"
                      >
                        {t.view}
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
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
