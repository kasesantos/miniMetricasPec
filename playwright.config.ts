import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "tests",
  timeout: 20_000,
  use: {
    baseURL: "http://localhost:3333",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  },
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
};

export default config;
