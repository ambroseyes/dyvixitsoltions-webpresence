import type { Metadata } from "next";

import { LOCALES } from "@/i18n/config";
import { resolveLang } from "@/i18n/params";
import { getCompany } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteChrome } from "@/components/layout/SiteChrome";

type Params = { params: Promise<{ lang: string }> };

/** Only the configured locales exist; anything else under [lang] is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = await resolveLang(params);
  const company = getCompany(lang);
  const title = `${site.legalName} — ${company.tagline}`;
  return {
    ...pageMeta({ lang, title, description: company.entityStatement, path: "/", absoluteTitle: true }),
    title: { default: title, template: `%s — ${site.legalName}` },
  };
}

export default async function LangLayout({ children, params }: Params & { children: React.ReactNode }) {
  const lang = await resolveLang(params);
  return (
    <>
      <JsonLd data={graph(organizationSchema(lang), websiteSchema(lang))} />
      <SiteChrome lang={lang}>{children}</SiteChrome>
    </>
  );
}
