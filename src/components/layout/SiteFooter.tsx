import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getCompany } from "@/content/company";
import { getFooterNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

/**
 * The footer is a GEO surface, not decoration.
 *
 * It carries the canonical entity statement, the contact points and the
 * service area on every single page — so any crawler that reaches any URL
 * leaves with the same facts (§57, §78), in the language of that URL.
 */
export function SiteFooter({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const company = getCompany(lang);
  const columns = getFooterNav(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface-sunken">
      <div className="schematic-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <Container className="relative">
        <div className="grid gap-12 py-(--spacing-section-tight) lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div>
            <Logo href={localePath(lang, "/")} label={`${site.legalName} — ${dict.nav.home}`} />
            {/* The canonical statement. Same string as Organization schema. */}
            <p className="mt-6 max-w-[42ch] text-(length:--text-sm) leading-relaxed text-ink-muted">
              {company.entityStatement}
            </p>

            <address className="mt-8 grid gap-2.5 not-italic">
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex w-fit items-center gap-2.5 text-(length:--text-sm) transition-colors hover:text-primary"
              >
                <Mail size={14} strokeWidth={1.75} aria-hidden="true" className="text-primary" />
                {site.contact.email}
              </a>
              <a
                href={`tel:${site.contact.phone}`}
                className="inline-flex w-fit items-center gap-2.5 text-(length:--text-sm) transition-colors hover:text-primary"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden="true" className="text-primary" />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2.5 text-(length:--text-sm) transition-colors hover:text-primary"
              >
                <MessageCircle size={14} strokeWidth={1.75} aria-hidden="true" className="text-primary" />
                {dict.contact.whatsapp}
              </a>
            </address>

            <p className="rail-label mt-8">
              {dict.footer.serving} {company.areaServed.join(" · ")}
            </p>
          </div>

          <nav aria-label={dict.nav.footerLabel} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.label}>
                <h2 className="rail-label mb-4">{col.label}</h2>
                <ul className="grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={`${col.label}-${l.href}`}>
                      <Link href={l.href} className="text-(length:--text-sm) text-ink-muted transition-colors hover:text-primary">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-5 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="rail-label">
            © {year} {site.legalName}
          </p>

          <ul className="flex items-center gap-5">
            {site.social.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="rail-label transition-colors hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
