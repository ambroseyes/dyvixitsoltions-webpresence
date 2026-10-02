import type { ExpertiseSlug } from "@/content/types";
import { ACCENT, Glyph } from "./Glyph";

/**
 * One drawing per domain, in the language of a technical sheet rather than
 * stock iconography: what the work actually looks like on paper. Each is a
 * server-rendered SVG — no JavaScript ships for any of them.
 *
 * Motion is a hover of the card: the accent brightens and one element moves
 * the way the idea moves (a plane lifts, a needle swings, a trend climbs).
 * Ambient loops are reserved for the larger glyph on a domain page.
 */
export const EXPERTISE_GLYPHS: Record<ExpertiseSlug, () => React.ReactElement> = {
  /** Braces around a stack: software written, then released. */
  "digital-engineering": () => (
    <Glyph>
      <path d="M18 12c-3 0-4 2-4 5v2c0 3-1 4-3 5 2 1 3 2 3 5v2c0 3 1 5 4 5" />
      <path d="M30 12c3 0 4 2 4 5v2c0 3 1 4 3 5-2 1-3 2-3 5v2c0 3-1 5-4 5" />
      <rect
        x="20"
        y="26"
        width="8"
        height="4"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:-translate-y-[3px]`}
      />
      <rect x="20" y="32" width="8" height="4" opacity="0.5" />
    </Glyph>
  ),

  /** Stacked planes, the top one lifting away: workloads moving to cloud. */
  "cloud-infrastructure": () => (
    <Glyph>
      <path d="M24 33 11 27l13-6 13 6z" opacity="0.45" />
      <path d="M24 27 11 21l13-6 13 6z" opacity="0.7" />
      <path
        d="M24 21 13 16l11-5 11 5z"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:-translate-y-[3px]`}
      />
    </Glyph>
  ),

  /** A shield with a keyhole, swept by a scanning line. */
  cybersecurity: () => (
    <Glyph>
      <path d="M24 9l12 4.5v9c0 8.5-5 13.5-12 16.5-7-3-12-8-12-16.5v-9z" />
      <circle cx="24" cy="23" r="2.6" {...ACCENT} />
      <path d="M24 25.6V30" {...ACCENT} />
      <path
        d="M17 20h14"
        {...ACCENT}
        className={`${ACCENT.className} opacity-0 group-hover:translate-y-[7px] group-hover:opacity-80`}
      />
    </Glyph>
  ),

  /** Three layers of nodes, wired: a model over data. */
  "ai-data": () => (
    <Glyph>
      <path d="M14 16l10 8-10 8M24 24h10" opacity="0.5" />
      <path d="M14 16v16" opacity="0.5" />
      <circle cx="14" cy="16" r="2" />
      <circle cx="14" cy="32" r="2" />
      <circle cx="24" cy="24" r="2" />
      <circle
        cx="34"
        cy="24"
        r="2.6"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:translate-x-[3px]`}
      />
    </Glyph>
  ),

  /** A node radiating: links that reach, and keep reaching. */
  "networks-telecom": () => (
    <Glyph>
      <circle cx="24" cy="31" r="2.6" {...ACCENT} />
      <path d="M16 28a11 11 0 0 1 16 0" opacity="0.75" />
      <path
        d="M11 23a18 18 0 0 1 26 0"
        opacity="0.5"
        className="transition-opacity duration-(--duration-normal) group-hover:opacity-80"
      />
      <path
        d="M6 18a25 25 0 0 1 36 0"
        opacity="0.28"
        className="transition-opacity duration-(--duration-slow) group-hover:opacity-65"
      />
    </Glyph>
  ),

  /** Sensors on a mesh, one of them the edge box that answers locally. */
  "iot-edge": () => (
    <Glyph>
      <path d="M12 18h24M12 30h24M18 12v24M30 12v24" opacity="0.35" />
      <circle cx="12" cy="18" r="1.6" />
      <circle cx="36" cy="18" r="1.6" />
      <circle cx="12" cy="30" r="1.6" />
      <circle cx="36" cy="30" r="1.6" />
      <rect
        x="20"
        y="20"
        width="8"
        height="8"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:scale-110`}
      />
    </Glyph>
  ),

  /** A dial under test, its needle swinging into the green. */
  "product-engineering": () => (
    <Glyph>
      <path d="M11 32a13 13 0 0 1 26 0" />
      <path d="M11 36h26" opacity="0.45" />
      <path
        d="M24 32l8-7"
        {...ACCENT}
        className={`${ACCENT.className} origin-[24px_32px] -rotate-[28deg] group-hover:rotate-0`}
      />
      <circle cx="24" cy="32" r="1.6" />
    </Glyph>
  ),

  /** Axes and a climb with waypoints: where the work is heading, and why. */
  "consulting-rd": () => (
    <Glyph>
      <path d="M12 11v25h25" opacity="0.5" />
      <path
        d="M16 31l6-6 5 4 9-12"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:-translate-y-[2px]`}
      />
      <circle cx="22" cy="25" r="1.5" />
      <circle cx="27" cy="29" r="1.5" />
      <circle cx="36" cy="17" r="1.5" />
    </Glyph>
  ),

  /** A closed loop around a live trace: watched, and kept running. */
  "managed-services": () => (
    <Glyph>
      <path d="M36 24a12 12 0 1 1-5-9.8" opacity="0.6" />
      <path d="M31 9v5.5h-5.5" opacity="0.6" />
      <path
        d="M14 24h4l2.5-5 3.5 10 2.5-5h7"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:translate-x-[2px]`}
      />
    </Glyph>
  ),
};
