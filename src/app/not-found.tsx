import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";

import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPrimaryNav } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { SiteChrome } from "@/components/layout/SiteChrome";

/**
 * Root 404. It renders for unmatched URLs — outside the [lang] segment — so it
 * brings its own chrome, in the language of the URL that was asked for.
 */
export default async function NotFound() {
  const requested = (await headers()).get("x-locale") ?? DEFAULT_LOCALE;
  const lang = isLocale(requested) ? requested : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  return (
    <SiteChrome lang={lang}>
      <section aria-labelledby="notfound-heading" className="grain relative overflow-hidden">
        <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-3xl py-(--spacing-section)">
            <p className="rail-index">404</p>
            <h1
              id="notfound-heading"
              className="mt-6 text-(length:--text-h1) leading-[0.98] font-semibold tracking-[-0.035em]"
            >
              {dict.notFound.title}
            </h1>
            <p className="mt-7 max-w-[52ch] text-(length:--text-lead) text-ink-muted">
              {dict.notFound.body}
            </p>

            <nav aria-label={dict.notFound.suggestions} className="mt-12">
              <p className="rail-label mb-4">{dict.notFound.suggestions}</p>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {getPrimaryNav(lang).map((n) => (
                  <li key={n.href} className="bg-surface">
                    <Link
                      href={n.href}
                      className="group flex items-center justify-between gap-4 p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                    >
                      <span className="text-(length:--text-base) font-medium">{n.label}</span>
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 text-primary transition-transform duration-(--duration-fast) group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mt-10 text-(length:--text-sm) text-ink-faint">
              {dict.notFound.searchHint}
            </p>
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
