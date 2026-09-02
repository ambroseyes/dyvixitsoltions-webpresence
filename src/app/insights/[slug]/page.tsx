import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { articles, articleBySlug, type Block } from "@/content/insights";
import { solutionBySlug } from "@/content/solutions";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CTABand } from "@/components/ui/CTABand";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return pageMeta({
    title: a.title,
    description: a.description,
    path: `/insights/${a.slug}`,
    keywords: a.topics,
    type: "article",
    publishedTime: a.published,
    authors: ["D’Yvix Engineering"],
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: article.title, path: `/insights/${article.slug}` },
  ];

  const headings = article.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const related = article.relatedSolutions.map(solutionBySlug).filter(Boolean);

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({
            title: article.title,
            description: article.description,
            slug: article.slug,
            published: article.published,
            updated: article.updated,
            authorName: "D’Yvix Engineering",
            authorPath: "/about",
          }),
          breadcrumbSchema(trail),
        )}
      />

      <Breadcrumbs trail={trail} />

      <article>
        <header className="grain relative overflow-hidden border-b border-line">
          <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <Container className="relative">
            <div className="max-w-3xl py-(--spacing-section-tight)">
              <p className="rail-label flex flex-wrap items-center gap-x-3 gap-y-1">
                <time dateTime={article.published}>
                  {new Date(article.published).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="text-line-strong" aria-hidden="true">
                  /
                </span>
                <span>{article.readingMinutes} min read</span>
                <span className="text-line-strong" aria-hidden="true">
                  /
                </span>
                <span>D’Yvix Engineering</span>
              </p>

              <h1 className="mt-6 text-(length:--text-h1) leading-[0.98] font-semibold tracking-[-0.035em]">
                {article.title}
              </h1>
              <p className="mt-7 text-(length:--text-lead) leading-relaxed text-ink-muted">
                {article.description}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {article.topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-(--radius-sm) border border-line px-2.5 py-1 font-mono text-(length:--text-micro) text-ink-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </header>

        <Container>
          <div className="grid gap-14 py-(--spacing-section-tight) lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] lg:gap-20">
            {/* Body */}
            <div className="max-w-(--container-prose)">
              {article.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* Contents rail */}
            <aside className="order-first lg:order-last">
              <nav aria-labelledby="toc-heading" className="lg:sticky lg:top-24">
                <h2 id="toc-heading" className="rail-label mb-4">
                  Contents
                </h2>
                <ol className="grid gap-2.5 border-l border-line pl-5">
                  {headings.map((h, i) => (
                    <li key={h.id} className="flex gap-3">
                      <span className="rail-index shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <a
                        href={`#${h.id}`}
                        className="text-(length:--text-sm) leading-snug text-ink-muted transition-colors hover:text-primary"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          </div>
        </Container>
      </article>

      <section aria-labelledby="article-related-heading" className="border-y border-line">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2 id="article-related-heading" className="rail-label mb-8">
              Related solutions
            </h2>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {related.map((s) => (
                <li key={s!.slug} className="bg-surface">
                  <Link
                    href={`/solutions/${s!.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rail-index">{s!.index}</span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="text-primary opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="mt-5 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                      {s!.name}
                    </h3>
                    <p className="mt-2 text-(length:--text-sm) text-ink-muted">{s!.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABand
        title="Want this reviewed on your own estate?"
        body={`An assessment from ${site.legalName} measures what is actually happening on your links rather than what the design intended.`}
        primary={{ label: "Request an Assessment", href: "/request-audit" }}
        secondary={{ label: "All insights", href: "/insights" }}
      />
    </>
  );
}

/** Block renderer. Content is authored data, never raw HTML — no injection surface. */
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-14 mb-5 scroll-mt-24 text-(length:--text-h3) font-semibold tracking-[-0.025em] first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-9 mb-3 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-5 text-(length:--text-base) leading-[1.75] text-ink-muted">{block.text}</p>
      );
    case "ul":
      return (
        <ul className="mt-6 grid gap-3">
          {block.items.map((i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-(length:--text-base) leading-relaxed text-ink-muted"
            >
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-primary" />
              {i}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 grid gap-3">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-3 text-(length:--text-base) leading-relaxed text-ink-muted"
            >
              <span className="rail-index mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="mt-8 border-l-2 border-primary bg-surface-raised py-5 pr-5 pl-6">
          <p className="rail-label text-primary">{block.title}</p>
          <p className="mt-2.5 text-(length:--text-base) leading-relaxed">{block.text}</p>
        </aside>
      );
    case "code":
      return (
        <pre className="mt-8 overflow-x-auto border border-line bg-surface-sunken p-5 font-mono text-(length:--text-sm) leading-relaxed">
          <code>{block.code}</code>
        </pre>
      );
  }
}
