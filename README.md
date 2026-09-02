# D’YVIX IT Solutions — web presence

Production web platform for **D’YVIX IT Solutions**, a technology engineering
company delivering infrastructure, cybersecurity, cloud, software engineering,
DevOps and managed IT services in Cameroon and across Africa.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:coverage` | Unit tests with coverage thresholds |
| `npm run test:e2e` | Playwright, all browser projects |
| `npm run audit:geo` | Score every page for AI/search discoverability |
| `npm run verify` | typecheck → lint → test → build |

`audit:geo` and the Playwright suite both need a server on port 3100
(`npm run build && npx next start -p 3100`). Playwright starts one itself.

## Architecture

```text
src/
├── app/                    Routes (App Router). Server Components by default.
│   ├── api/contact/        Enquiry endpoint: rate limit → origin → validate
│   ├── solutions/[slug]/   Seven service pages from one template
│   ├── industries/[slug]/  Six sector pages
│   ├── insights/[slug]/    Articles
│   ├── sitemap.ts          Generated from content
│   ├── robots.ts           Crawl policy (AI crawlers allowed — see below)
│   └── opengraph-image.tsx Social card, generated
├── components/
│   ├── layout/             Header, mega menu, drawer, command palette, footer
│   ├── home/               Homepage sections
│   ├── diagrams/           Interactive capability graph
│   ├── forms/              Multi-step enquiry form
│   ├── seo/                JSON-LD renderer
│   └── ui/                 Primitives (Button, Card, Section, SpecRow, …)
├── content/                Typed content models — CMS-ready, no CMS yet
├── lib/                    site (entity facts), schema, seo, search, colour,
│                           validation, rate limiting
└── proxy.ts                Per-request nonce CSP
```

### Client/server split

Only five components ship JavaScript: the header (mega menu + drawer), the
command palette, the capability diagram, the homepage problem tabs, the
solution finder, and the enquiry form. Everything else is server-rendered.

The site's own JavaScript is **≈33 kB gzipped**. See
[Performance](#performance) for the framework baseline on top of that.

### Content is data

`src/content/` holds typed models rather than JSX. Adding a solution to
`solutions.ts` puts it in the mega menu, the footer, the sitemap, the
`Organization` schema's service catalogue, the command palette index and the
internal-link graph automatically — enforced by tests in
`src/content/integrity.test.ts`.

## Design system

Direction: **"Signal"** — an engineering drawing sheet crossed with an
operations centre, rendered in the company's own brand. Recurring devices:
hairline technical grid, registration brackets, a monospace annotation rail
carrying section indices, near-zero border radius, and skewed-bar nodes taken
from the two slanted strokes of the D'Yvix mark.

**Everything visual derives from real brand assets, not invention:**

| Token | Source |
| --- | --- |
| `#579C32` brand green | Sampled from the logo PNG |
| `#E72E36` brand red | Sampled from the logo PNG |
| `#2B4222` forest ground | Company pitch deck |
| `#F9EEE7` cream paper | Company pitch deck |
| Quattrocento | The serif used throughout the pitch deck |
| Quattrocento Sans | Its designed companion, for body text |

All tokens live in `src/app/globals.css`. Nothing hardcodes a colour, size or
duration.

- **Palette** — OKLCH. Light "Paper" (warm cream stock), dark "Field" (deep
  forest). Dark mode is designed, not inverted. `.panel-inverse` rebinds the
  palette on a subtree so any component can sit on a dark band unchanged.
- **Two greens, on purpose** — `--c-brand` is the untouched logo green. White
  on it measures 3.38:1, so it is a marks-and-fills token only. `--c-primary`
  holds the same hue and chroma at a solved lightness and carries all text and
  buttons. `src/lib/color.test.ts` pins both facts so they are never merged.
- **Contrast** — the lightness of `--c-ink-faint`, `--c-brass` and
  `--c-line-strong` is *solved*, not chosen: each is the value at which the
  token clears WCAG against the darkest surface it appears on.
  `src/lib/color.test.ts` converts OKLCH → sRGB → relative luminance and fails
  the build if any pairing drops below AA. Run `npx tsx scripts/contrast-report.mjs`
  for the full matrix.
- **Type** — Quattrocento + Quattrocento Sans (one superfamily, from the
  company deck) and JetBrains Mono (technical rail). Self-hosted by
  `next/font`, no font CDN. Note Quattrocento ships only 400 and 700, which
  forces hierarchy through size and colour rather than weight.
- **Motion** — tokens only; `prefers-reduced-motion` collapses every
  transition globally.

## SEO and GEO

The previous site was a client-rendered SPA serving **614 bytes** of HTML with
no facts in it. Every page here server-renders its content, so an assistant
that fetches a URL gets the answer without executing JavaScript.

- `src/lib/site.ts` is the single source of truth for the entity. The same
  canonical sentence appears in the DOM, the meta description and
  `Organization` schema, so the three can never disagree.
- One JSON-LD `@graph` per page: `Organization`, `WebSite`, `Service`,
  `BreadcrumbList`, `FAQPage`, `BlogPosting`, `ItemList` as applicable.
- **Deliberately not emitted**: `LocalBusiness` (no confirmed street address),
  `AggregateRating`/`Review` (none legitimate), certifications or awards.
- `npm run audit:geo` discovers every route from the site's own sitemap,
  scores each on ten criteria, and exits non-zero below threshold. Current:
  **84.5/100**, no page below 70.

### Crawl policy

AI and answer-engine crawlers are **allowed**. Blocking them while asking to be
cited by assistants would be self-defeating. `/api/` is disallowed. See
`src/app/robots.ts`.

## Security

- **CSP with a per-request nonce**, set in `src/proxy.ts`, using
  `strict-dynamic`. No `unsafe-inline` for scripts.
- HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
  `X-Frame-Options`, COOP in `next.config.ts`. `x-powered-by` removed.
- Enquiry endpoint: rate limit → same-origin check → server-side Zod parse →
  silent honeypot. The honeypot is **not** enforced in the schema, because a
  422 naming the field would tell a bot exactly what to fix.
- Fonts self-hosted; no third-party script or asset origin at runtime.

> **Trade-off:** the nonce makes HTML uncacheable by a CDN and renders pages
> dynamically. These pages fetch no data, so render cost is small. If HTML
> caching matters more for a given deployment, delete `src/proxy.ts` and move a
> hash-based CSP into `next.config.ts`.

## Accessibility

Target WCAG 2.2 AA, verified rather than asserted: `e2e/a11y.spec.ts` runs
axe-core over 14 pages in both themes on every browser project. **Zero
violations.** Also covered: skip link, keyboard traversal, reduced motion, and
decorative SVGs kept out of the accessibility tree.

## Performance

Measured with `node scripts/bundle-report.mjs` against a production server.

| Page | HTML | JS | CSS |
| --- | --- | --- | --- |
| `/` | 32.9 kB | 211.9 kB | 11.7 kB |
| `/solutions/cybersecurity` | 21.2 kB | 205.2 kB | 11.7 kB |
| `/contact` | ~13 kB | ~208 kB | 11.7 kB |

All gzipped.

**On the 150 kB JS budget:** it is not reachable with Next 16 App Router. The
framework floor alone — `react-dom` (69.9 kB) plus router and runtime chunks
(107 kB) — is ~177 kB before a line of application code. D'YVIX code accounts
for ~33 kB of the total, including icons. Options if the budget is firm:
inlining the ~15 Lucide icons as raw SVG saves ~13 kB; meeting 150 kB outright
would mean a different framework.

Zod was removed from the client bundle by splitting validation rules
(`lib/enquiry-rules.ts`, zero dependencies) from the server schema
(`lib/validation.ts`). That cut `/contact` from 271 kB to 208 kB.

## Testing

| Suite | Count | Command |
| --- | --- | --- |
| Unit (Vitest) | 185 | `npm test` |
| E2E (Playwright ×4 projects) | 194 | `npm run test:e2e` |

Coverage on `src/lib` and `src/content`: 95% statements, 90% branches, 97%
functions, 97% lines.

E2E projects: Chromium, Firefox, WebKit, and Pixel 7. Specs cover navigation,
the command palette, the solution finder, the problem tabs, the enquiry form
end to end, the API contract, SEO/schema output, security headers, responsive
overflow at six widths, and accessibility.

## Environment

See `.env.example`. No secret is needed to run the site. Enquiry **delivery is
not wired up** — `src/app/api/contact/route.ts` validates and accepts
submissions but does not send them anywhere yet. Connect a transactional email
provider or a CRM webhook before launch.

## Deployment

Any Node host supporting Next.js 16.

```bash
npm ci
npm run build
npm start
```

Before going live:

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
2. Implement enquiry delivery in the contact route.
3. Fill the placeholders in `/legal` (company registration, hosting) and
   `/privacy` (data controller, legal basis, supervisory authority).
4. Confirm the postal address, then enable `LocalBusiness` schema in
   `src/lib/schema.ts`.
5. Move rate limiting to a shared store if deploying multi-instance.
6. Run `npm run verify` and `npm run audit:geo`.

## Content sourcing

Every fact on the site traces to one of two client documents — the corporate
technical profile and the company pitch deck — or to the previous site. The
placeholders this project launched with are now closed: years in operation,
projects delivered, sectors served, team size, certifications, partnerships,
company history and nine named client engagements all come from those sources.

**Still open:**

- **Street address** — not published in any source, so `LocalBusiness` schema
  stays withheld. Two cities (Yaoundé, Douala) are stated; no street is.
- **ISO/IEC 27001** — the profile describes the company as *aligned* in prose
  while listing it under certifications. The site publishes the conservative
  reading ("aligned") and the schema emits no ISO credential. Confirm the real
  position before a tender relies on it.
- **Domain mismatch** — the corporate profile gives the founder's email as
  `@dyvix-itsolutions.com` (hyphenated) while the deck and the live site use
  `dyvixitsolutions.com`. The site uses the unhyphenated form throughout.
- **Enquiry delivery** — validated and accepted, not yet sent anywhere.
