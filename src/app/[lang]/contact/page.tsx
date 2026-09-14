import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { HTML_LANG, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getCompany } from "@/content/company";
import { breadcrumbTrail } from "@/lib/nav";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/lib/site";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

type Params = { params: Promise<{ lang: string }> };
type Props = Params & { searchParams: Promise<{ scope?: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return pageMeta({
    lang,
    title: dict.nav.contact,
    description: `${dict.contact.standfirst} ${site.contact.email} · ${site.contact.phoneDisplay}`,
    path: "/contact",
  });
}

export default async function ContactPage({ params, searchParams }: Props) {
  const lang = await resolveLang(params);
  const { scope } = await searchParams;
  const dict = getDictionary(lang);
  const t = dict.contact;
  const company = getCompany(lang);
  const trail = breadcrumbTrail(lang, [{ name: dict.nav.contact, path: "/contact" }]);

  const channels = [
    {
      href: `mailto:${site.contact.email}`,
      icon: Mail,
      label: t.email,
      value: site.contact.email,
      external: false,
    },
    {
      href: `tel:${site.contact.phone}`,
      icon: Phone,
      label: t.phone,
      value: site.contact.phoneDisplay,
      external: false,
    },
    {
      href: site.contact.whatsapp,
      icon: MessageCircle,
      label: t.whatsapp,
      value: site.contact.phoneDisplay,
      external: true,
    },
  ];

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ContactPage",
          name: `${dict.nav.contact} — ${site.legalName}`,
          url: absoluteUrl(localePath(lang, "/contact")),
          description: t.standfirst,
          inLanguage: HTML_LANG[lang],
        })}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={t.label} title={t.title} standfirst={t.standfirst} />

      <section aria-labelledby="enquiry-heading" className="border-b border-line">
        <Container>
          <div className="grid gap-12 py-(--spacing-section-tight) lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 id="enquiry-heading" className="sr-only">
                {t.formHeading}
              </h2>
              {/* Client island. Everything around it is server-rendered. */}
              <EnquiryForm lang={lang} labels={dict.form} defaultScope={scope} variant="project" />
            </div>

            <aside aria-labelledby="direct-heading">
              <h2 id="direct-heading" className="rail-label">
                {t.directHeading}
              </h2>

              <ul className="mt-5 grid gap-px border border-line bg-line">
                {channels.map(({ href, icon: Icon, label, value, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 bg-surface p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.6}
                        aria-hidden="true"
                        className="shrink-0 text-primary"
                      />
                      <span>
                        <span className="rail-label block">{label}</span>
                        <span className="mt-1 block font-mono text-(length:--text-sm)">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border border-line p-5">
                <p className="rail-label">{t.operatingFrom}</p>
                <p className="mt-2 text-(length:--text-sm) text-ink-muted">
                  {site.address.locality} &amp; {site.address.secondaryLocality},{" "}
                  {company.countryName}
                </p>
                <p className="rail-label mt-5">{t.serviceArea}</p>
                <p className="mt-2 text-(length:--text-sm) text-ink-muted">
                  {company.areaServed.join(" · ")}
                </p>
                <p className="rail-label mt-5">{t.languages}</p>
                <p className="mt-2 text-(length:--text-sm) text-ink-muted">{t.languagesValue}</p>
              </div>

              <div className="mt-8 border border-dashed border-line-strong p-5">
                <p className="rail-label">{t.nextTitle}</p>
                <ol className="mt-3 grid gap-2.5 text-(length:--text-sm) text-ink-muted">
                  {t.next.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="rail-index shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
