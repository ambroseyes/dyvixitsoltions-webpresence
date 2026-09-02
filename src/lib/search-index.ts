import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";

export type SearchEntry = {
  label: string;
  href: string;
  group: string;
  /** Pre-lowercased haystack. Never rendered. */
  keywords: string;
};

/**
 * Static search index for the command palette.
 *
 * Built at module load from content — no network request, so the palette
 * works on a stalled connection (§42).
 *
 * Keywords deliberately include capability descriptions and the problems each
 * solution solves. People search for the thing they need — "firewall",
 * "backup", "disaster recovery" — not for the name of a service line, and an
 * index built only from titles returns nothing for any of those.
 */
export function buildSearchIndex(): SearchEntry[] {
  return [
    ...solutions.map((s) => ({
      label: s.name,
      href: `/solutions/${s.slug}`,
      group: "Solutions",
      keywords: [
        s.name,
        s.summary,
        s.definition,
        s.technologies.join(" "),
        s.capabilities.map((c) => `${c.title} ${c.description}`).join(" "),
        s.problemsSolved.join(" "),
        s.approach.map((a) => `${a.title} ${a.description}`).join(" "),
        s.outcomes.join(" "),
      ]
        .join(" ")
        .toLowerCase(),
    })),
    ...industries.map((i) => ({
      label: i.name,
      href: `/industries/${i.slug}`,
      group: "Industries",
      keywords: [i.name, i.summary, i.pressures.join(" "), i.risks.join(" ")]
        .join(" ")
        .toLowerCase(),
    })),
    ...articles.map((a) => ({
      label: a.title,
      href: `/insights/${a.slug}`,
      group: "Insights",
      keywords: [a.title, a.description, a.topics.join(" ")].join(" ").toLowerCase(),
    })),
    {
      label: "Request an Assessment",
      href: "/request-audit",
      group: "Actions",
      keywords: "audit assessment security infrastructure review posture scan",
    },
    {
      label: "Start a Project",
      href: "/contact",
      group: "Actions",
      keywords: "contact project quote enquiry brief email phone talk",
    },
    {
      label: "Find my solution",
      href: "/#solution-finder",
      group: "Actions",
      keywords: "finder recommend help where to start unsure advice",
    },
    {
      label: "Expertise",
      href: "/expertise",
      group: "Pages",
      keywords: "technologies stack skills capabilities tools vendors",
    },
    {
      label: "Projects",
      href: "/projects",
      group: "Pages",
      keywords: "case studies work evidence portfolio references clients",
    },
    {
      label: "Insights",
      href: "/insights",
      group: "Pages",
      keywords: "articles blog engineering writing guides",
    },
    {
      label: "About",
      href: "/about",
      group: "Pages",
      keywords: "company who we are method team history",
    },
    {
      label: "Contact",
      href: "/contact",
      group: "Pages",
      keywords: "email phone whatsapp reach us address location",
    },
  ];
}

/** Case-insensitive substring match. Empty query returns the whole index. */
export function searchIndex(index: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return index;
  return index.filter((e) => e.keywords.includes(q) || e.label.toLowerCase().includes(q));
}
