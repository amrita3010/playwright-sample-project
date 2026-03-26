// playwright.config.ts

import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
  timeout: 600000,
 reporter: [
    ['json', { outputFile: 'test-results/results.json' }],
    ['line'],
    ['html'],
    ['allure-playwright'],
    // ['ortoni-report', {
    //   projectName: "Sample Project",
    //   authorName: "Amrita",
    //   testType: "test"
    // }]
  ],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});