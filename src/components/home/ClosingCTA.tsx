import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const ROW =
  "group flex items-center justify-between gap-6 bg-surface p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised sm:p-7";

function RowBody({
  index,
  title,
  body,
  mono = false,
}: {
  index: string;
  title: string;
  body: string;
  mono?: boolean;
}) {
  return (
    <>
      <span>
        <span className="rail-index">{index}</span>
        <span className="mt-2 block text-(length:--text-h4) font-semibold tracking-[-0.02em]">
          {title}
        </span>
        <span
          className={
            mono
              ? "mt-1.5 block font-mono text-(length:--text-sm) text-ink-muted"
              : "mt-1.5 block text-(length:--text-sm) text-ink-muted"
          }
        >
          {body}
        </span>
      </span>
      <ArrowRight
        size={18}
        aria-hidden="true"
        className="shrink-0 text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-1"
      />
    </>
  );
}

/** Final conversion band. Two paths: scoped assessment, or an open project brief. */
export function ClosingCTA({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home.closing;

  return (
    <section
      aria-labelledby="cta-heading"
      className="grain relative overflow-hidden border-b border-line"
    >
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-1/4 -bottom-1/2 size-[55rem] max-w-[130vw] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--c-brand), transparent 65%)" }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-end gap-12 py-(--spacing-section) lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <p className="rail-label">
              <span
                className="mr-3 inline-block size-1.5 rotate-45 bg-primary align-middle"
                aria-hidden="true"
              />
              {t.nextStep}
            </p>
            <h2
              id="cta-heading"
              className="mt-6 max-w-[16ch] text-(length:--text-h1) leading-[0.95] font-semibold tracking-[-0.04em]"
            >
              {t.title}
              <span className="text-primary">.</span>
            </h2>
            <p className="mt-7 max-w-[48ch] text-(length:--text-lead) text-ink-muted">{t.body}</p>
          </div>

          <div className="grid gap-px border border-line bg-line">
            <Link href={localePath(lang, "/request-audit")} className={ROW}>
              <RowBody index="01" title={t.assessmentTitle} body={t.assessmentBody} />
            </Link>
            <Link href={localePath(lang, "/contact")} className={ROW}>
              <RowBody index="02" title={t.projectTitle} body={t.projectBody} />
            </Link>
            <a href={`mailto:${site.contact.email}`} className={ROW}>
              <RowBody index="03" title={t.emailTitle} body={site.contact.email} mono />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
