"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Loader2 } from "lucide-react";

// Imports the dependency-free rules module, never lib/validation — pulling in
// the Zod schema here would ship 67 kB gzipped of validator to the browser.
import {
  SCOPES,
  SCOPE_LABELS,
  TIMELINES,
  TIMELINE_LABELS,
  STEP_FIELDS,
  validateEnquiry,
  type Scope,
  type Timeline,
} from "@/lib/enquiry-rules";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

const STEPS = ["Scope", "Context", "Contact"] as const;

/**
 * Three-step enquiry form (§31).
 *
 * Progressive disclosure: asking for a name first makes the form feel like a
 * gate, so it opens with the question the visitor came to answer and collects
 * identity last.
 *
 * Accessibility: each step is a fieldset with a legend; per-field errors are
 * wired with aria-describedby and aria-invalid; the step heading receives
 * focus on advance so a screen-reader user is told where they are; the
 * summary error region is role="alert".
 */
export function EnquiryForm({
  defaultScope,
  variant = "project",
}: {
  defaultScope?: string;
  variant?: "project" | "audit";
}) {
  const [step, setStep] = useState(0);
  const [scopes, setScopes] = useState<Scope[]>(
    SCOPES.includes(defaultScope as Scope) ? [defaultScope as Scope] : [],
  );
  const [timeline, setTimeline] = useState<Timeline | "">("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const headingRef = useRef<HTMLLegendElement>(null);
  const didMount = useRef(false);

  // Move focus on step change, but not on first render.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const toggleScope = (s: Scope) =>
    setScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const values = { name, organisation, email, phone, scopes, timeline, message, website };

  /** Validates only the fields belonging to `which`, so step 1 is not blocked by step 3. */
  const validateStep = (which: number): boolean => {
    const all = validateEnquiry(values);
    const stepErrors: Errors = {};
    for (const field of STEP_FIELDS[which]!) {
      const msg = all[field];
      if (msg) stepErrors[field] = msg;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    // Full-form check: the step validators only cover their own fields, so a
    // value edited after passing an earlier step would otherwise slip through.
    if (Object.keys(validateEnquiry(values)).length > 0) {
      setFormError("Please review your answers.");
      return;
    }

    setStatus("sending");
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        setStatus("failed");
        setFormError(body.error ?? "Something went wrong. Please email us directly.");
        return;
      }
      setReference(body.data?.reference ?? null);
      setStatus("sent");
    } catch {
      setStatus("failed");
      setFormError("We could not reach the server. Please email us directly.");
    }
  };

  if (status === "sent") {
    return (
      <div className="brackets border border-line bg-surface-raised p-8 sm:p-10" role="status">
        <div className="flex size-11 items-center justify-center rounded-(--radius-sm) border border-verified/50">
          <Check size={20} strokeWidth={2} aria-hidden="true" className="text-verified" />
        </div>
        <h2 className="mt-6 text-(length:--text-h3) font-semibold tracking-[-0.025em]">
          Received. We will come back to you.
        </h2>
        <p className="mt-4 max-w-[52ch] text-(length:--text-base) leading-relaxed text-ink-muted">
          An engineer reads every enquiry — this does not go into a queue for a sales team to
          qualify. Expect a reply proposing a scoping conversation, or a note telling you this is
          not something we should take on.
        </p>
        {reference && (
          <p className="rail-label mt-6">
            Reference <span className="text-primary">{reference}</span>
          </p>
        )}
        <p className="mt-8 text-(length:--text-sm) text-ink-faint">
          Something urgent in the meantime?{" "}
          <a href={`mailto:${site.contact.email}`} className="link-inline">
            {site.contact.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="brackets border border-line bg-surface-raised">
      {/* Step indicator */}
      <ol className="flex border-b border-line" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li
            key={s}
            aria-current={i === step ? "step" : undefined}
            className={cn(
              "flex flex-1 items-center gap-2.5 border-r border-line px-4 py-3.5 last:border-r-0",
              i === step ? "bg-primary-soft/40" : i < step ? "text-ink-muted" : "text-ink-faint",
            )}
          >
            <span className={cn("rail-index", i > step && "text-ink-faint")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="rail-label truncate">{s}</span>
          </li>
        ))}
      </ol>

      <div className="p-6 sm:p-8">
        {step === 0 && (
          <fieldset>
            <legend
              ref={headingRef}
              tabIndex={-1}
              className="text-(length:--text-h3) font-semibold tracking-[-0.025em] outline-none"
            >
              What do you need?
            </legend>
            <p className="mt-3 text-(length:--text-sm) text-ink-muted">
              Select everything that applies. “Not sure yet” is a valid answer.
            </p>

            <div
              className="mt-7 grid gap-2 sm:grid-cols-2"
              role="group"
              aria-describedby={errors.scopes ? "err-scopes" : undefined}
            >
              {SCOPES.map((s) => {
                const checked = scopes.includes(s);
                return (
                  <label
                    key={s}
                    className={cn(
                      "flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-(length:--text-sm) transition-colors duration-(--duration-fast)",
                      checked
                        ? "border-primary bg-primary-soft/50"
                        : "border-line hover:border-line-strong",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleScope(s)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2.5 shrink-0 rotate-45 border transition-colors duration-(--duration-fast)",
                        checked ? "border-primary bg-primary" : "border-line-strong",
                      )}
                    />
                    {SCOPE_LABELS[s]}
                  </label>
                );
              })}
            </div>
            <FieldError id="err-scopes" message={errors.scopes} />
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend
              ref={headingRef}
              tabIndex={-1}
              className="text-(length:--text-h3) font-semibold tracking-[-0.025em] outline-none"
            >
              Give us the context.
            </legend>

            <div className="mt-7">
              <p className="rail-label mb-3">What is your timeline?</p>
              <div
                className="grid gap-2 sm:grid-cols-2"
                role="radiogroup"
                aria-label="Timeline"
                aria-describedby={errors.timeline ? "err-timeline" : undefined}
              >
                {TIMELINES.map((t) => (
                  <label
                    key={t}
                    className={cn(
                      "flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-(length:--text-sm) transition-colors duration-(--duration-fast)",
                      timeline === t
                        ? "border-primary bg-primary-soft/50"
                        : "border-line hover:border-line-strong",
                    )}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      checked={timeline === t}
                      onChange={() => setTimeline(t)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2.5 shrink-0 rotate-45 border transition-colors duration-(--duration-fast)",
                        timeline === t ? "border-primary bg-primary" : "border-line-strong",
                      )}
                    />
                    {TIMELINE_LABELS[t]}
                  </label>
                ))}
              </div>
              <FieldError id="err-timeline" message={errors.timeline} />
            </div>

            <div className="mt-8">
              <Field
                id="message"
                label="What should we know?"
                error={errors.message}
                hint={
                  variant === "audit"
                    ? "Roughly what you operate — sites, users, servers — and what prompted this."
                    : "What breaks, what it costs, or what you are trying to build."
                }
              >
                <textarea
                  id="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={cn("hint-message", errors.message && "err-message")}
                  className="w-full resize-y border border-line bg-surface px-4 py-3 text-(length:--text-base) outline-none focus-visible:border-primary"
                />
              </Field>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend
              ref={headingRef}
              tabIndex={-1}
              className="text-(length:--text-h3) font-semibold tracking-[-0.025em] outline-none"
            >
              Who should we reply to?
            </legend>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name}>
                <Input
                  id="name"
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                  error={!!errors.name}
                />
              </Field>
              <Field id="organisation" label="Organisation" error={errors.organisation}>
                <Input
                  id="organisation"
                  value={organisation}
                  onChange={setOrganisation}
                  autoComplete="organization"
                  error={!!errors.organisation}
                />
              </Field>
              <Field id="email" label="Work email" error={errors.email}>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  error={!!errors.email}
                />
              </Field>
              <Field id="phone" label="Phone" optional error={errors.phone}>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  autoComplete="tel"
                  error={!!errors.phone}
                />
              </Field>
            </div>

            {/* Honeypot: hidden from people, offered to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website (leave blank)</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <p className="mt-6 max-w-[56ch] text-(length:--text-sm) text-ink-faint">
              We use these details to reply to this enquiry. We do not sell them, and we do not add
              you to a mailing list. See our{" "}
              <a href="/privacy" className="link-inline">
                privacy notice
              </a>
              .
            </p>
          </fieldset>
        )}

        {formError && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2.5 border-l-2 border-risk py-1 pl-4 text-(length:--text-sm) text-risk"
          >
            <CircleAlert
              size={15}
              strokeWidth={1.75}
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            />
            {formError}
          </p>
        )}

        <div className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex min-h-11 items-center gap-2 text-(length:--text-sm) text-ink-muted transition-colors hover:text-ink disabled:invisible"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-11 items-center gap-2 rounded-(--radius-sm) border border-primary bg-primary px-6 text-(length:--text-sm) font-medium text-surface transition-colors duration-(--duration-fast) hover:border-ink hover:bg-ink dark:hover:bg-ink-inverse dark:hover:text-surface"
            >
              Continue
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-11 items-center gap-2 rounded-(--radius-sm) border border-primary bg-primary px-6 text-(length:--text-sm) font-medium text-surface transition-colors duration-(--duration-fast) hover:border-ink hover:bg-ink disabled:opacity-60 dark:hover:bg-ink-inverse dark:hover:text-surface"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={14} aria-hidden="true" className="animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowRight size={14} aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="rail-label mb-2.5 block">
        {label}
        {optional && <span className="ml-2 normal-case text-ink-faint">(optional)</span>}
      </label>
      {hint && (
        <p id={`hint-${id}`} className="mb-2.5 text-(length:--text-sm) text-ink-faint">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={`err-${id}`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-2 text-(length:--text-sm) text-risk"
    >
      <CircleAlert size={13} strokeWidth={2} aria-hidden="true" className="mt-1 shrink-0" />
      {message}
    </p>
  );
}

function Input({
  id,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  error?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={error}
      aria-describedby={error ? `err-${id}` : undefined}
      className={cn(
        "h-12 w-full border bg-surface px-4 text-(length:--text-base) outline-none transition-colors duration-(--duration-fast) focus-visible:border-primary",
        error ? "border-risk" : "border-line",
      )}
    />
  );
}
