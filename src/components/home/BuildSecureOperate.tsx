import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { localePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { getHome } from "@/content/home";
import { Container } from "@/components/ui/Container";

/**
 * §13 — the strongest visual signature on the site.
 *
 * Three verbs at display scale on an inverse panel. The scale contrast
 * against the surrounding sections is the point: this is where the scroll
 * changes register, and it states the whole proposition in three words.
 */
export function BuildSecureOperate({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home.bso;
  const pillars = getHome(lang).pillars;

  return (
    <section aria-labelledby="bso-heading" className="panel-inverse grain relative overflow-hidden">
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="py-(--spacing-section)">
          <div className="mb-4 flex items-center gap-3">
            <span className="rail-index">02</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="rail-label">{t.label}</span>
          </div>

          <h2 id="bso-heading" className="sr-only">
            {t.heading}
          </h2>

          <div className="grid gap-px border-t border-line lg:grid-cols-3">
            {pillars.map((p, i) => (
              <article
                key={p.verb}
                className="group relative @container border-b border-line py-10 lg:border-r lg:px-8 lg:py-14 lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="rail-index">{String(i + 1).padStart(2, "0")}</span>

                {/*
                  Sized in container-query units, not viewport units: these sit
                  in a three-up track on desktop and full width on mobile, so a
                  vw-based clamp overflows the column at desktop widths. The
                  French verbs are longer, which the cqw sizing absorbs.
                */}
                <h3 className="mt-4 text-[clamp(2.5rem,17cqw,5.5rem)] leading-[0.85] font-semibold tracking-[-0.05em]">
                  {p.verb}
                  <span className="text-primary">.</span>
                </h3>

                <p className="rail-label mt-8">{p.lede}</p>

                <ul className="mt-4 grid gap-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-(length:--text-base) text-ink-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rotate-45 bg-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:scale-150"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={localePath(lang, p.href)}
                  className="mt-8 inline-flex items-center gap-1.5 text-(length:--text-sm) font-medium text-primary hover:underline"
                >
                  {format(t.withUs, { verb: p.verb })}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
