import { Fragment } from "react";
import { format } from "@/i18n/format";
import { site } from "@/lib/site";

/**
 * Long-form copy with tokens: {legalName} and {url} are filled from lib/site
 * and {email} becomes a mailto link — so legal pages never retype a fact that
 * lib/site already states.
 */
export function TokenText({ text }: { text: string }) {
  const parts = format(text, { legalName: site.legalName, url: site.url }).split("{email}");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={`mailto:${site.contact.email}`} className="link-inline">
              {site.contact.email}
            </a>
          )}
        </Fragment>
      ))}
    </>
  );
}
