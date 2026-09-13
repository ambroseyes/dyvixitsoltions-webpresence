import { ImageResponse } from "next/og";

import { DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getCompany } from "@/content/company";
import { site } from "@/lib/site";

const company = getCompany(DEFAULT_LOCALE);
const dict = getDictionary(DEFAULT_LOCALE);

export const alt = `${site.legalName} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated rather than shipped as a binary. One card for both
 * locales: it carries the name, the descriptor and the proposition, which
 * read the same to either audience. Uses the same schematic language as the
 * site: hairline grid, brand node, mono annotation rail. Type is set in a
 * system stack — embedding a font file here would cost more than it adds.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#1b2618",
        padding: "72px",
        fontFamily: "sans-serif",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div style={{ width: "30px", height: "30px", border: "2px solid #579C32", transform: "rotate(45deg)" }} />
        <div style={{ fontSize: "34px", color: "#f7f1ea", fontWeight: 700, letterSpacing: "-1px" }}>D’Yvix</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Satori requires an explicit display on any node with more than one
            child, so the accent full stop is a sibling flex item rather than
            an inline span. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            fontSize: "84px",
            lineHeight: 1.02,
            color: "#f7f1ea",
            fontWeight: 700,
            letterSpacing: "-3.5px",
            maxWidth: "980px",
          }}
        >
          <div style={{ display: "flex" }}>{dict.meta.descriptor}</div>
          <div style={{ display: "flex", color: "#579C32" }}>.</div>
        </div>
        <div style={{ fontSize: "27px", color: "#a9b3a2", marginTop: "28px", maxWidth: "900px" }}>
          {company.description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #33422e",
          paddingTop: "26px",
          fontSize: "20px",
          color: "#8d9686",
          letterSpacing: "3px",
        }}
      >
        <div>BUILD · SECURE · OPERATE</div>
        <div>YAOUNDÉ · DOUALA · SINCE 2012</div>
      </div>
    </div>,
    size,
  );
}
