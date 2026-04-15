const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  testMatch: /.*\.spec\.js/,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  }
});
