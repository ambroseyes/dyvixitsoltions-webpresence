import { defineConfig, devices } from "@playwright/test";
import sink from "./e2e/support/sink.json";

/**
 * E2E runs against a production build, not the dev server: dev-only overlays
 * and unminified React change both the accessibility tree and the timing, so
 * a dev-mode pass proves less than it appears to.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : [["list"]],
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      // Local SMTP sink (e2e/support/smtp-sink.mjs): the site sends real mail
      // to it over SMTP, and the specs read back what arrived. Nobody is mailed.
      command: "node e2e/support/smtp-sink.mjs",
      url: `http://${sink.host}:${sink.httpPort}/health`,
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      // Workers share one source IP, so the production rate limit would throttle
      // the suite itself. The 429 path is covered by unit tests in
      // src/lib/rate-limit.test.ts instead.
      // The standalone server, i.e. exactly what gets deployed — not `next start`.
      command: [
        "RATE_LIMIT_MAX=1000 PORT=3100 HOSTNAME=127.0.0.1",
        `SMTP_HOST=${sink.host} SMTP_PORT=${sink.smtpPort}`,
        `SMTP_USER=${sink.user} SMTP_PASS=${sink.password}`,
        "node .next/standalone/server.js",
      ].join(" "),
      url: "http://localhost:3100",
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
