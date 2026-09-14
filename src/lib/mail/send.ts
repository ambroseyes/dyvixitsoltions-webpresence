import nodemailer from "nodemailer";
import type { MailConfig } from "./config";
import type { EnquiryEmail } from "./enquiry-email";

const IMPLICIT_TLS_PORT = 465;
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
/** A visitor is waiting on the response: fail within seconds, not minutes. */
const TIMEOUTS = { connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000 };

/**
 * Encrypted always: implicit TLS on 465, mandatory STARTTLS on any other
 * port — except to a loopback host, where the connection never leaves the
 * machine (a local relay, the test sink). Certificates are always verified.
 */
export function smtpOptions(config: MailConfig) {
  const secure = config.port === IMPLICIT_TLS_PORT;
  return {
    host: config.host,
    port: config.port,
    secure,
    requireTLS: !secure && !LOOPBACK_HOSTS.has(config.host),
    auth: { user: config.user, pass: config.pass },
    ...TIMEOUTS,
  };
}

/** Sends one message on a fresh connection, then closes it. Rejects on any SMTP failure. */
export async function sendMail(config: MailConfig, message: EnquiryEmail): Promise<void> {
  const transporter = nodemailer.createTransport(smtpOptions(config));
  try {
    await transporter.sendMail(message);
  } finally {
    transporter.close();
  }
}

/**
 * One log line for a failed send: nodemailer's error code (EAUTH,
 * ECONNECTION…), the server's reply code and its message. Never the message
 * content, which carries the visitor's personal data.
 */
export function describeMailError(error: unknown): string {
  if (!(error instanceof Error)) return "unknown error";
  const { code, responseCode } = error as Error & { code?: unknown; responseCode?: unknown };
  return [
    typeof code === "string" ? code : null,
    typeof responseCode === "number" ? String(responseCode) : null,
    error.message,
  ]
    .filter((part): part is string => part !== null)
    .join(" ");
}
