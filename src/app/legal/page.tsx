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
  { name: "Legal Notice", path: "/legal" },
];

export const metadata = pageMeta({
  title: "Legal Notice",
  description: `Publisher and legal information for ${site.url}.`,
  path: "/legal",
});

export default function LegalPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs trail={trail} />

      <PageHero
        label="Legal"
        title="Legal notice."
        standfirst="Publisher information for this website."
      />

      <Container>
        <div className="border-t border-line">
          <SpecRow index="01" label="Publisher">
            <dl className="grid gap-3 text-(length:--text-base) text-ink-muted">
              <div className="flex flex-wrap gap-x-3">
                <dt className="rail-label w-32 shrink-0 pt-1">Name</dt>
                <dd>{site.legalName}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="rail-label w-32 shrink-0 pt-1">Email</dt>
                <dd>
                  <a href={`mailto:${site.contact.email}`} className="hover:text-primary">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="rail-label w-32 shrink-0 pt-1">Phone</dt>
                <dd>
                  <a href={`tel:${site.contact.phone}`} className="hover:text-primary">
                    {site.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="rail-label w-32 shrink-0 pt-1">Location</dt>
                <dd>
                  {site.address.locality}, {site.address.countryName}
                </dd>
              </div>
            </dl>

            <p className="mt-6 max-w-[64ch] text-(length:--text-sm) text-ink-faint">
              PLACEHOLDER — registered company name, registration number, tax identifier, registered
              address, share capital and the name of the publication director must be supplied by
              D’Yvix and added here before launch.
            </p>
          </SpecRow>

          <SpecRow index="02" label="Hosting">
            <p className="max-w-[64ch] text-(length:--text-sm) text-ink-faint">
              PLACEHOLDER — hosting provider name, address and contact details to be added once the
              deployment target is confirmed.
            </p>
          </SpecRow>

          <SpecRow index="03" label="Intellectual property">
            <p className="max-w-[64ch] text-(length:--text-base) leading-relaxed text-ink-muted">
              The content, design and source code of this site are the property of {site.legalName}{" "}
              unless stated otherwise. Third-party technology names are the trademarks of their
              respective owners, and their appearance on this site indicates working familiarity
              only — not partnership, endorsement, certification or authorised-reseller status.
            </p>
          </SpecRow>
        </div>
      </Container>
    </>
  );
}
