import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";

export type NavLeaf = { label: string; href: string; note?: string };
export type NavGroup = { label: string; href: string; children?: NavLeaf[]; feature?: NavLeaf };

/**
 * Primary navigation. Derived from content so a new solution or industry
 * appears in the menu, the sitemap and the internal-link graph at once —
 * §70 forbids orphan pages, and generating the menu is how that is enforced.
 */
export const primaryNav: NavGroup[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: solutions.map((s) => ({
      label: s.name,
      href: `/solutions/${s.slug}`,
      note: s.summary,
    })),
    feature: {
      label: "Not sure where to start?",
      href: "/#solution-finder",
      note: "Answer one question and get a scoped recommendation.",
    },
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((i) => ({
      label: i.name,
      href: `/industries/${i.slug}`,
      note: i.summary,
    })),
  },
  { label: "Expertise", href: "/expertise" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const footerNav = [
  {
    label: "Solutions",
    links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    label: "Industries",
    links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Expertise", href: "/expertise" },
      { label: "Projects", href: "/projects" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Engage",
    links: [
      { label: "Request an Assessment", href: "/request-audit" },
      { label: "Start a Project", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Legal Notice", href: "/legal" },
    ],
  },
];
