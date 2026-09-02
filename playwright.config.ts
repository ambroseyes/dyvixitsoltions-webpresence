import { defineConfig, devices } from "@playwright/test";

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
  webServer: {
    // Workers share one source IP, so the production rate limit would throttle
    // the suite itself. The 429 path is covered by unit tests in
    // src/lib/rate-limit.test.ts instead.
    command: "RATE_LIMIT_MAX=1000 npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
