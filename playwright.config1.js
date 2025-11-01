// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 100 * 1000, 
  retries:1,
  workers:3,
    expect: {
    timeout: 60 * 1000, // expect timeout
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        ...devices['iPhone 11 Pro'],
        launchOptions: {
          slowMo: 2000, // 2 second delay between steps
        },
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        vedio:'only-on-failure',
      
        //viewport: { width: 720, height: 720 },
        ignoreHTTPSErrors: true, // ignores https errors
        permissions: ['geolocation'], // grant permissions
        launchOptions: {
          slowMo: 2000,
        },
      },
    },
  ],
};

module.exports = config;
