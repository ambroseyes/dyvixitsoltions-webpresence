import { z } from "zod";
import { site } from "@/lib/site";

/**
 * Outgoing-mail settings, read from the environment on every request.
 *
 * Server-side only: none of these may carry the NEXT_PUBLIC_ prefix, which
 * would inline them into the browser bundle. On cPanel they live in Setup
 * Node.js App → Environment variables, so changing them takes a restart, not
 * a rebuild. See .env.example and docs/deploiement-cpanel.md, step 7.
 */
export type MailConfig = {
  host: string;
  port: number;
  /** The mailbox the site logs in as — also the From address, so SPF and DKIM align. */
  user: string;
  pass: string;
  /** Where enquiries go. */
  to: string;
};

export type MailConfigResult = { ok: true; config: MailConfig } | { ok: false; problems: string[] };

type Env = Readonly<Record<string, string | undefined>>;

const DEFAULT_PORT = 465;
const isEmail = (value: string) => z.email().safeParse(value).success;
const isPort = (value: number) => Number.isInteger(value) && value > 0 && value < 65_536;

/** Problems name the variable, never its value, so they are safe to log. */
export function readMailConfig(env: Env): MailConfigResult {
  const host = env.SMTP_HOST?.trim() ?? "";
  const user = env.SMTP_USER?.trim() ?? "";
  const pass = env.SMTP_PASS ?? "";
  const port = Number(env.SMTP_PORT?.trim() || DEFAULT_PORT);
  const to = env.ENQUIRY_TO_EMAIL?.trim() || site.contact.email;

  const checks: [failed: boolean, problem: string][] = [
    [host === "", "SMTP_HOST is missing"],
    [user === "", "SMTP_USER is missing"],
    [user !== "" && !isEmail(user), "SMTP_USER is not an e-mail address"],
    [pass.trim() === "", "SMTP_PASS is missing"],
    [!isPort(port), "SMTP_PORT is not a port number"],
    [!isEmail(to), "ENQUIRY_TO_EMAIL is not an e-mail address"],
  ];
  const problems = checks.filter(([failed]) => failed).map(([, problem]) => problem);

  return problems.length > 0
    ? { ok: false, problems }
    : { ok: true, config: { host, port, user, pass, to } };
}
