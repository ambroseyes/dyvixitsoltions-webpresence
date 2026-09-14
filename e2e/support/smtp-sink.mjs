/**
 * SMTP sink for tests. Never used in production.
 *
 * Accepts mail on the loopback interface, checks the credentials the site
 * logs in with, keeps every message in memory and lists them over HTTP, so a
 * test can assert on what the site actually sent through real SMTP. A message
 * whose text contains `rejectMarker` is refused with 550, to exercise the
 * failure path.
 *
 * Playwright runs it as a web server (`node e2e/support/smtp-sink.mjs`, fixed
 * ports from sink.json); unit tests import startSmtpSink for a free port.
 */
import { readFileSync } from "node:fs";
import http from "node:http";
import { pathToFileURL } from "node:url";
import { simpleParser } from "mailparser";
import { SMTPServer } from "smtp-server";

export const settings = JSON.parse(readFileSync(new URL("./sink.json", import.meta.url), "utf8"));

const smtpError = (message, responseCode) => Object.assign(new Error(message), { responseCode });

/** mailparser gives one address object or several; flatten to mailboxes. */
const mailboxes = (field) => [field ?? []].flat().flatMap((group) => group.value);

const reply = (response, status, body) => {
  const isText = typeof body === "string";
  response.writeHead(status, { "content-type": isText ? "text/plain" : "application/json" });
  response.end(isText ? body : JSON.stringify(body));
};

const listen = (server, port) =>
  new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, settings.host, resolve);
  });

/**
 * @param {{ smtpPort?: number, httpPort?: number }} [ports]
 *   smtpPort 0 or omitted picks a free port; without httpPort, no HTTP listing.
 */
export async function startSmtpSink({ smtpPort = 0, httpPort } = {}) {
  const messages = [];

  const smtp = new SMTPServer({
    // Plain SMTP: the sink only listens on loopback, the one case where the
    // site allows an unencrypted connection (see smtpOptions in lib/mail).
    disabledCommands: ["STARTTLS"],
    allowInsecureAuth: true,
    disableReverseLookup: true,
    logger: false,
    onAuth(auth, _session, callback) {
      if (auth.username === settings.user && auth.password === settings.password) {
        callback(null, { user: auth.username });
      } else {
        callback(smtpError("Invalid credentials", 535));
      }
    },
    onData(stream, session, callback) {
      simpleParser(stream).then((mail) => {
        const text = mail.text ?? "";
        if (text.includes(settings.rejectMarker)) {
          callback(smtpError("Message refused by the test sink", 550));
          return;
        }
        messages.push({
          authUser: session.user,
          envelope: {
            from: session.envelope.mailFrom ? session.envelope.mailFrom.address : null,
            to: session.envelope.rcptTo.map((recipient) => recipient.address),
          },
          from: mailboxes(mail.from)[0] ?? null,
          replyTo: mailboxes(mail.replyTo)[0] ?? null,
          subject: mail.subject ?? "",
          text,
        });
        callback();
      }, callback);
    },
  });
  await listen(smtp, smtpPort);

  const web =
    httpPort === undefined
      ? null
      : http.createServer((request, response) => {
          const path = request.method === "GET" ? request.url : null;
          if (path === "/health") return reply(response, 200, "ok");
          if (path === "/messages") return reply(response, 200, messages);
          return reply(response, 404, "not found");
        });
  if (web) await listen(web, httpPort);

  return {
    port: smtp.server.address().port,
    user: settings.user,
    password: settings.password,
    rejectMarker: settings.rejectMarker,
    messages,
    close: () =>
      Promise.all([
        new Promise((resolve) => smtp.close(resolve)),
        web ? new Promise((resolve) => web.close(resolve)) : null,
      ]).then(() => undefined),
  };
}

// Run directly: the fixed ports from sink.json, for Playwright's webServer.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startSmtpSink({ smtpPort: settings.smtpPort, httpPort: settings.httpPort }).then(
    (sink) =>
      console.log(
        `SMTP sink on ${settings.host}:${sink.port}, messages at http://${settings.host}:${settings.httpPort}/messages`,
      ),
    (error) => {
      console.error(error);
      process.exit(1);
    },
  );
}
