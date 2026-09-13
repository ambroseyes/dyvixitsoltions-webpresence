import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPrimaryNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/**
 * Skip link, header, main landmark and footer for one locale.
 *
 * Shared by the [lang] layout and the root not-found page: an unmatched URL
 * renders outside [lang], and a 404 without navigation is a dead end.
 */
export function SiteChrome({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const dict = getDictionary(lang);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-toast) focus:rounded-(--radius-sm) focus:border focus:border-primary focus:bg-surface focus:px-4 focus:py-2.5 focus:text-(length:--text-sm) focus:font-medium"
      >
        {dict.meta.skipToContent}
      </a>

      <SiteHeader
        lang={lang}
        nav={getPrimaryNav(lang)}
        labels={dict.nav}
        theme={dict.theme}
        command={dict.command}
        homeLabel={`${site.legalName} — ${dict.nav.home}`}
      />
      <main id="main">{children}</main>
      <SiteFooter lang={lang} />
    </>
  );
}
