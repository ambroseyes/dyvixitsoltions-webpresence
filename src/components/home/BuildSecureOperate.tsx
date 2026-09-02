import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * §13 — the strongest visual signature on the site.
 *
 * Three verbs at display scale on an inverse panel. The scale contrast
 * against the surrounding sections is the point: this is where the scroll
 * changes register, and it states the whole proposition in three words.
 */
const PILLARS = [
  {
    index: "01",
    verb: "Build",
    lede: "We build",
    items: [
      "Software and APIs",
      "Network and server infrastructure",
      "Cloud and hybrid environments",
      "Digital platforms",
      "Automation systems",
      "AI-assisted workflows",
    ],
    href: "/solutions/software-engineering",
  },
  {
    index: "02",
    verb: "Secure",
    lede: "We secure",
    items: [
      "Networks and perimeters",
      "Endpoints",
      "Identities and privilege",
      "Applications",
      "Infrastructure",
      "Data and backups",
    ],
    href: "/solutions/cybersecurity",
  },
  {
    index: "03",
    verb: "Operate",
    lede: "We operate",
    items: [
      "Infrastructure",
      "Cloud environments",
      "Monitoring and alerting",
      "Backup and recovery",
      "Security controls",
      "Managed IT and support",
    ],
    href: "/solutions/managed-services",
  },
] as const;

export function BuildSecureOperate() {
  return (
    <section aria-labelledby="bso-heading" className="panel-inverse grain relative overflow-hidden">
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="py-(--spacing-section)">
          <div className="mb-4 flex items-center gap-3">
            <span className="rail-index">02</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="rail-label">The proposition</span>
          </div>

          <h2 id="bso-heading" className="sr-only">
            Build, secure and operate
          </h2>

          <div className="grid gap-px border-t border-line lg:grid-cols-3">
            {PILLARS.map((p) => (
              <article
                key={p.verb}
                className="group relative @container border-b border-line py-10 lg:border-r lg:px-8 lg:py-14 lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="rail-index">{p.index}</span>

                {/*
                  Sized in container-query units, not viewport units: these sit
                  in a three-up track on desktop and full width on mobile, so a
                  vw-based clamp overflows the column at desktop widths.
                */}
                <h3 className="mt-4 text-[clamp(2.75rem,20cqw,5.5rem)] leading-[0.85] font-semibold tracking-[-0.05em]">
                  {p.verb}
                  <span className="text-primary">.</span>
                </h3>

                <p className="rail-label mt-8">{p.lede}</p>

                <ul className="mt-4 grid gap-2.5">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-(length:--text-base) text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rotate-45 bg-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:scale-150"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.href}
                  className="mt-8 inline-flex items-center gap-1.5 text-(length:--text-sm) font-medium text-primary hover:underline"
                >
                  {p.verb} with us
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
