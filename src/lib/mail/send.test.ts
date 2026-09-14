// @vitest-environment node
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { startSmtpSink } from "../../../e2e/support/smtp-sink.mjs";
import type { MailConfig } from "./config";
import { describeMailError, sendMail, smtpOptions } from "./send";

const message = {
  from: { name: "Site D’Yvix", address: "site@dyvixitsolutions.com" },
  to: "contact@dyvixitsolutions.com",
  replyTo: { name: "Amina Njoya", address: "amina@example.cm" },
  subject: "Demande DYX-ABC234 — Meridian Microfinance",
  text: "Nouvelle demande envoyée depuis le formulaire du site.",
};

const base: MailConfig = {
  host: "mail.dyvixitsolutions.com",
  port: 465,
  user: "site@dyvixitsolutions.com",
  pass: "pw",
  to: "contact@dyvixitsolutions.com",
};

describe("smtpOptions", () => {
  test("uses implicit TLS on 465", () => {
    expect(smtpOptions(base)).toMatchObject({ secure: true, requireTLS: false });
  });

  test("requires STARTTLS on any other port", () => {
    expect(smtpOptions({ ...base, port: 587 })).toMatchObject({ secure: false, requireTLS: true });
  });

  test.each(["127.0.0.1", "localhost", "::1"])(
    "allows plain SMTP only to a loopback host (%s)",
    (host) => {
      expect(smtpOptions({ ...base, host, port: 2525 })).toMatchObject({
        secure: false,
        requireTLS: false,
      });
    },
  );

  test("bounds every wait, so a stuck server cannot hang the request", () => {
    const options = smtpOptions(base);
    for (const wait of [
      options.connectionTimeout,
      options.greetingTimeout,
      options.socketTimeout,
    ]) {
      expect(wait).toBeGreaterThan(0);
      expect(wait).toBeLessThanOrEqual(20_000);
    }
  });
});

describe("sendMail over SMTP", () => {
  let sink: Awaited<ReturnType<typeof startSmtpSink>>;
  let config: MailConfig;

  beforeAll(async () => {
    sink = await startSmtpSink();
    config = { ...base, host: "127.0.0.1", port: sink.port, user: sink.user, pass: sink.password };
  });
  afterAll(() => sink.close());

  test("authenticates, then delivers the message as composed", async () => {
    await sendMail(config, message);
    const received = sink.messages.at(-1);
    expect(received).toMatchObject({
      authUser: "site@dyvixitsolutions.com",
      envelope: { from: "site@dyvixitsolutions.com", to: ["contact@dyvixitsolutions.com"] },
      from: { address: "site@dyvixitsolutions.com", name: "Site D’Yvix" },
      replyTo: { address: "amina@example.cm", name: "Amina Njoya" },
      subject: message.subject,
    });
    expect(received.text.trim()).toBe(message.text);
  });

  test("fails with EAUTH on a wrong password", async () => {
    const error = await sendMail({ ...config, pass: "wrong" }, message).catch((e: unknown) => e);
    expect(describeMailError(error)).toMatch(/^EAUTH 535 /);
  });

  test("fails with the server's reply when it refuses the message", async () => {
    const refused = { ...message, text: `${sink.rejectMarker} please` };
    const error = await sendMail(config, refused).catch((e: unknown) => e);
    expect(describeMailError(error)).toMatch(/^EMESSAGE 550 /);
  });

  test("fails fast when nothing listens on the port", async () => {
    const gone = await startSmtpSink();
    await gone.close();
    const error = await sendMail({ ...config, port: gone.port }, message).catch((e: unknown) => e);
    expect(describeMailError(error)).toMatch(/^(ECONNECTION|ESOCKET) /);
  });
});

describe("describeMailError", () => {
  test("keeps the SMTP code, the reply code and the message — nothing else", () => {
    const error = Object.assign(new Error("Invalid login: 535 Incorrect authentication data"), {
      code: "EAUTH",
      responseCode: 535,
      command: "AUTH PLAIN",
    });
    expect(describeMailError(error)).toBe(
      "EAUTH 535 Invalid login: 535 Incorrect authentication data",
    );
  });

  test("copes with anything thrown", () => {
    expect(describeMailError("boom")).toBe("unknown error");
    expect(describeMailError(new Error("plain"))).toBe("plain");
  });
});
