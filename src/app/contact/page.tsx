import { Mail, MessageCircle, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata = pageMeta({
  title: "Contact",
  description: `Contact ${site.legalName} to discuss an infrastructure, cybersecurity, cloud, software engineering or managed IT project. Email ${site.contact.email} or call ${site.contact.phoneDisplay}.`,
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string }>;
}) {
  const { scope } = await searchParams;

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ContactPage",
          name: `Contact ${site.legalName}`,
          url: `${site.url}/contact`,
          description: `How to reach ${site.legalName}.`,
        })}
      />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="Contact"
        title="Let’s engineer your next digital system."
        standfirst="Three questions, then your details. An engineer reads every enquiry — it does not land in a queue to be qualified by someone who cannot answer you."
      />

      <section aria-labelledby="enquiry-heading" className="border-b border-line">
        <Container>
          <div className="grid gap-12 py-(--spacing-section-tight) lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 id="enquiry-heading" className="sr-only">
                Enquiry form
              </h2>
              {/* Client island. Everything around it is server-rendered. */}
              <EnquiryForm defaultScope={scope} variant="project" />
            </div>

            <aside aria-labelledby="direct-heading">
              <h2 id="direct-heading" className="rail-label">
                Or reach us directly
              </h2>

              <ul className="mt-5 grid gap-px border border-line bg-line">
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-4 bg-surface p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <Mail
                      size={17}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="shrink-0 text-primary"
                    />
                    <span>
                      <span className="rail-label block">Email</span>
                      <span className="mt-1 block font-mono text-(length:--text-sm)">
                        {site.contact.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="flex items-center gap-4 bg-surface p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <Phone
                      size={17}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="shrink-0 text-primary"
                    />
                    <span>
                      <span className="rail-label block">Phone</span>
                      <span className="mt-1 block font-mono text-(length:--text-sm)">
                        {site.contact.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-surface p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <MessageCircle
                      size={17}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="shrink-0 text-primary"
                    />
                    <span>
                      <span className="rail-label block">WhatsApp</span>
                      <span className="mt-1 block font-mono text-(length:--text-sm)">
                        {site.contact.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 border border-line p-5">
                <p className="rail-label">Operating from</p>
                <p className="mt-2 text-(length:--text-sm) text-ink-muted">
                  {site.address.locality}, {site.address.countryName}
                </p>
                <p className="rail-label mt-5">Service area</p>
                <p className="mt-2 text-(length:--text-sm) text-ink-muted">
                  {site.areaServed.map((a) => a.name).join(" · ")}
                </p>
                <p className="rail-label mt-5">Languages</p>
                <p className="mt-2 text-(length:--text-sm) text-ink-muted">English · Français</p>
              </div>

              <div className="mt-8 border border-dashed border-line-strong p-5">
                <p className="rail-label">What happens next</p>
                <ol className="mt-3 grid gap-2.5 text-(length:--text-sm) text-ink-muted">
                  <li className="flex gap-3">
                    <span className="rail-index shrink-0">01</span>An engineer reads your enquiry.
                  </li>
                  <li className="flex gap-3">
                    <span className="rail-index shrink-0">02</span>We reply proposing a scoping call
                    — or tell you it is not a fit.
                  </li>
                  <li className="flex gap-3">
                    <span className="rail-index shrink-0">03</span>You get a written scope before
                    anything is committed.
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
