import { Section } from "./Section";
import type { FAQ } from "@/content/types";

/**
 * FAQ list.
 *
 * Plain <dl>, not an accordion. Collapsing answers would hide them from a
 * reader scanning the page and adds JS for no benefit — and §63 wants the
 * answers extractable without interaction.
 */
export function FaqBlock({
  faqs,
  index,
  title = "Frequently asked questions",
}: {
  faqs: FAQ[];
  index?: string;
  title?: string;
}) {
  if (!faqs.length) return null;
  return (
    <Section
      id="faq"
      index={index}
      label="Questions"
      title={title}
      className="border-b border-line"
    >
      <dl className="border-t border-line">
        {faqs.map((f) => (
          <div
            key={f.q}
            className="grid gap-3 border-b border-line py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-12"
          >
            <dt className="text-(length:--text-h4) font-semibold tracking-[-0.02em] text-balance">
              {f.q}
            </dt>
            <dd className="text-(length:--text-base) leading-relaxed text-ink-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
