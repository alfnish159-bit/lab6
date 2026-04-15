const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'http://localhost:3000'
  }
});
