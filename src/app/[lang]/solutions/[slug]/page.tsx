import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { DEFAULT_LOCALE, localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getExpertiseBySlug } from "@/content/expertise";
import { getProductBySlug, getProducts, hasDetailPage } from "@/content/products";
import type { Expertise, ProductStatus } from "@/content/types";
import { breadcrumbTrail } from "@/lib/nav";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, softwareSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";

type Props = { params: Promise<{ lang: string; slug: string }> };

/** Only documented products have a page; the rest are cards on /solutions. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts(DEFAULT_LOCALE)
    .filter(hasDetailPage)
    .map((p) => ({ slug: p.slug }));
}

const STATUS_TONE: Record<ProductStatus, "verified" | "info" | "neutral"> = {
  production: "verified",
  development: "info",
  forthcoming: "neutral",
};

async function load(params: Props["params"]) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const product = getProductBySlug(lang, slug);
  if (!product || !product.description) notFound();
  return { lang, product, description: product.description };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, product, description } = await load(params);
  return pageMeta({
    lang,
    title: product.name,
    description,
    path: `/solutions/${product.slug}`,
    keywords: product.stack,
  });
}

export default async function ProductPage({ params }: Props) {
  const { lang, product: p, description } = await load(params);
  const dict = getDictionary(lang);
  const t = dict.solutions.detail;
  const L = (href: string) => localePath(lang, href);

  const trail = breadcrumbTrail(lang, [
    { name: dict.nav.solutions, path: "/solutions" },
    { name: p.name, path: `/solutions/${p.slug}` },
  ]);
  const builtOn = p.expertise
    .map((slug) => getExpertiseBySlug(lang, slug))
    .filter((x): x is Expertise => x !== undefined);

  let row = 0;
  const next = () => String(++row).padStart(2, "0");

  return (
    <>
      <JsonLd data={graph(softwareSchema(lang, p), breadcrumbSchema(trail))} />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={t.label} title={p.name} standfirst={p.tagline ?? description}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={STATUS_TONE[p.status]}>{dict.solutions.status[p.status]}</Badge>
          <Button href={L("/contact")} size="lg">
            {dict.nav.startProject}
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
        </div>
      </PageHero>

      <Container>
        <div className="border-t border-line">
          <SpecRow index={next()} label={t.whatItIs}>
            <p className="max-w-[64ch] text-(length:--text-lead) leading-relaxed">{description}</p>
          </SpecRow>

          {p.capabilities.length > 0 && (
            <SpecRow index={next()} label={t.capabilities}>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {p.capabilities.map((c) => (
                  <li key={c.title} className="bg-surface p-6">
                    <h3 className="text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-(length:--text-sm) leading-relaxed text-ink-muted">
                      {c.description}
                    </p>
                  </li>
                ))}
              </ul>
            </SpecRow>
          )}

          {p.architecture.length > 0 && (
            <SpecRow index={next()} label={t.architecture}>
              <ul className="grid gap-3">
                {p.architecture.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-3 text-(length:--text-base) text-ink-muted"
                  >
                    <Check
                      size={15}
                      strokeWidth={2.25}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-primary"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </SpecRow>
          )}

          {p.stack.length > 0 && (
            <SpecRow index={next()} label={dict.solutions.stack}>
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-(--radius-sm) border border-line bg-surface-raised px-3 py-1.5 font-mono text-(length:--text-micro) text-ink-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </SpecRow>
          )}

          <SpecRow index={next()} label={t.stage}>
            <Badge tone={STATUS_TONE[p.status]}>{dict.solutions.status[p.status]}</Badge>
          </SpecRow>

          {builtOn.length > 0 && (
            <SpecRow index={next()} label={t.builtOn}>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {builtOn.map((e) => (
                  <li key={e.slug} className="bg-surface">
                    <Link
                      href={L(`/expertise/${e.slug}`)}
                      className="block h-full p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                    >
                      <span className="rail-index">{e.index}</span>
                      <p className="mt-2 text-(length:--text-base) font-bold">{e.name}</p>
                      <p className="mt-1 text-(length:--text-sm) text-ink-muted">{e.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </SpecRow>
          )}
        </div>
      </Container>

      <CTABand
        title={format(t.ctaTitle, { name: p.name })}
        body={t.ctaBody}
        primary={{ label: dict.nav.startProject, href: L("/contact") }}
        secondary={{ label: t.allSolutions, href: L("/solutions") }}
      />
    </>
  );
}
