const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Ensure the cucumber-report directory exists
const reportDir = path.join(__dirname, 'cucumber-report');
if (!fs.existsSync(reportDir)) {
    console.error('No cucumber-report directory found. Please run tests first with: npm run test:bdd');
    process.exit(1);
}

// Check if JSON report exists
const jsonReport = path.join(reportDir, 'cucumber-report.json');
if (!fs.existsSync(jsonReport)) {
    console.error('No JSON report found. Please run tests first with: npm run test:bdd');
    process.exit(1);
}

report.generate({
    jsonDir: reportDir,
    reportPath: path.join(reportDir, 'html-report'),
    metadata: {
        browser: {
            name: 'chromium',
            version: 'Latest'
        },
        device: 'Local Machine',
        platform: {
            name: process.platform,
            version: process.version
        }
    },
    customData: {
        title: 'Test Execution Report',
        data: [
            { label: 'Project', value: 'Playwright BDD Testing' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Time', value: new Date().toLocaleString() }
        ]
    }
});

console.log('✅ Cucumber HTML report generated successfully!');
console.log(`📊 Report location: ${path.join(reportDir, 'html-report', 'index.html')}`);
