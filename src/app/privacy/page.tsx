import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";

const trail = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" },
];

export const metadata = pageMeta({
  title: "Privacy Notice",
  description: `How ${site.legalName} handles personal data submitted through this website.`,
  path: "/privacy",
});

/**
 * Describes what this build actually does today. Every statement here is
 * checkable against the source. Revisit it the moment analytics, a CRM or an
 * email provider is connected — a privacy notice that has drifted from the
 * implementation is worse than none.
 */
export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs trail={trail} />

      <PageHero
        label="Privacy"
        title="What we collect, and what we do with it."
        standfirst="This describes what this website does today. If that changes — analytics, a CRM, a mailing list — this page changes with it."
      />

      <Container>
        <div className="border-t border-line">
          <SpecRow index="01" label="What we collect">
            <div className="max-w-[64ch] space-y-4 text-(length:--text-base) leading-relaxed text-ink-muted">
              <p>
                Only what you type into the enquiry form: your name, organisation, email address,
                optional phone number, the areas you selected, your timeline and your message.
              </p>
              <p>
                We do not use advertising trackers, third-party analytics or profiling cookies. The
                site sets no cookies for its own purposes. Your theme preference is stored in your
                browser’s local storage and is never sent to us.
              </p>
            </div>
          </SpecRow>

          <SpecRow index="02" label="Why we hold it">
            <p className="max-w-[64ch] text-(length:--text-base) leading-relaxed text-ink-muted">
              To reply to your enquiry and, if it proceeds, to scope the work. We do not sell or
              share it with third parties for their own purposes, and we do not add you to a mailing
              list because you contacted us.
            </p>
          </SpecRow>

          <SpecRow index="03" label="How long we keep it">
            <p className="max-w-[64ch] text-(length:--text-base) leading-relaxed text-ink-muted">
              Enquiries that do not lead to an engagement are deleted once the conversation has
              clearly ended. Where an engagement follows, records are retained for as long as the
              commercial relationship and any legal or accounting obligation requires.
            </p>
          </SpecRow>

          <SpecRow index="04" label="Server logs">
            <p className="max-w-[64ch] text-(length:--text-base) leading-relaxed text-ink-muted">
              The hosting infrastructure records standard request logs, including IP address, for
              operational and abuse-prevention purposes. Submission contents are deliberately not
              written to application logs.
            </p>
          </SpecRow>

          <SpecRow index="05" label="Your rights">
            <div className="max-w-[64ch] space-y-4 text-(length:--text-base) leading-relaxed text-ink-muted">
              <p>
                You can ask us what we hold about you, ask us to correct it, or ask us to delete it.
                Write to{" "}
                <a href={`mailto:${site.contact.email}`} className="link-inline">
                  {site.contact.email}
                </a>{" "}
                and we will respond.
              </p>
              <p className="text-(length:--text-sm) text-ink-faint">
                PLACEHOLDER — the identity of the data controller, the applicable legal basis and
                the competent supervisory authority must be confirmed against Cameroonian data
                protection law and any other jurisdiction in which D’Yvix operates, before launch.
              </p>
            </div>
          </SpecRow>
        </div>
      </Container>
    </>
  );
}
