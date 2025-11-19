const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const allureResultsDir = path.join(__dirname, 'allure-results');
const allureReportDir = path.join(__dirname, 'allure-report');
const historyDir = path.join(allureReportDir, 'history');
const resultsHistoryDir = path.join(allureResultsDir, 'history');

// 1. Copy history from previous report to results
if (fs.existsSync(historyDir)) {
    if (!fs.existsSync(resultsHistoryDir)) {
        fs.mkdirSync(resultsHistoryDir, { recursive: true });
    }

    const files = fs.readdirSync(historyDir);
    files.forEach(file => {
        fs.copyFileSync(path.join(historyDir, file), path.join(resultsHistoryDir, file));
    });
    console.log('History copied successfully.');
} else {
    console.log('No previous history found.');
}

// 2. Generate Report
try {
    console.log('Generating Allure Report...');
    execSync('npx allure generate ./allure-results --clean -o allure-report', { stdio: 'inherit' });

    // 3. Open Report
    console.log('Opening Allure Report...');
    execSync('npx allure open allure-report', { stdio: 'inherit' });
} catch (error) {
    console.error('Error generating or opening report:', error);
}
