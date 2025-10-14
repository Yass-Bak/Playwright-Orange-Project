// performance.spec.ts
// Playwright + Lighthouse integration for performance testing OrangeHRM critical user flow
// Run with: npx playwright test tests/performance.spec.ts


import { test, expect, chromium } from '@playwright/test';
let lighthouse: typeof import('lighthouse');
const fs = require('fs');


// Define performance budgets (example values, adjust as needed)
const budgets = {
    performance: 80, // Lighthouse performance score (0-100)
    'first-contentful-paint': 2000, // ms
    'largest-contentful-paint': 2500, // ms
    'interactive': 3000, // ms
};

test.describe('Lighthouse Performance Test: OrangeHRM Login', () => {
    let browser: import('playwright').Browser;
    let port: number;

    test.beforeAll(async () => {
        // Pick a free port for debugging protocol
        port = 9222 + Math.floor(Math.random() * 1000);
        browser = await chromium.launch({
            headless: true,
            args: [`--remote-debugging-port=${port}`]
        });
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('should meet performance budgets on login page', async () => {
        const url = 'https://opensource-demo.orangehrmlive.com';
        // Dynamically import Lighthouse (ESM)
        if (!lighthouse) {
            lighthouse = await import('lighthouse');
        }
        // Run Lighthouse
        const result = await lighthouse.default(url, {
            port: port,
            output: ['html', 'json'],
            onlyCategories: ['performance'],
            disableStorageReset: true,
        });
        // Save reports and process results if defined
        if (result && result.report && result.lhr && result.lhr.categories && result.lhr.audits) {
            fs.writeFileSync('lighthouse-report.html', result.report[0]);
            fs.writeFileSync('lighthouse-report.json', result.report[1]);
            // Extract scores and metrics
            const perfScore = (result.lhr.categories.performance.score ?? 0) * 100;
            const audits = result.lhr.audits;
            // Assert budgets
            expect(perfScore).toBeGreaterThanOrEqual(budgets.performance);
            expect(audits['first-contentful-paint'].numericValue).toBeLessThanOrEqual(budgets['first-contentful-paint']);
            expect(audits['largest-contentful-paint'].numericValue).toBeLessThanOrEqual(budgets['largest-contentful-paint']);
            expect(audits['interactive'].numericValue).toBeLessThanOrEqual(budgets['interactive']);
            // Log summary
            console.log('Lighthouse performance score:', perfScore);
            console.log('FCP:', audits['first-contentful-paint'].numericValue, 'ms');
            console.log('LCP:', audits['largest-contentful-paint'].numericValue, 'ms');
            console.log('TTI:', audits['interactive'].numericValue, 'ms');
            console.log('Full report: lighthouse-report.html');
        } else {
            throw new Error('Lighthouse result is undefined or incomplete.');
        }
    });
});
