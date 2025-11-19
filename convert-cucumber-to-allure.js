const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Convert Cucumber JSON to Allure format
 * This script reads Cucumber JSON output and creates Allure result files
 */

const cucumberJsonPath = path.join(__dirname, 'allure-results', 'cucumber.json');
const allureResultsDir = path.join(__dirname, 'allure-results');

// Check if Cucumber JSON exists
if (!fs.existsSync(cucumberJsonPath)) {
    console.log('No Cucumber JSON file found. Skipping conversion.');
    process.exit(0);
}

// Read Cucumber JSON
const cucumberResults = JSON.parse(fs.readFileSync(cucumberJsonPath, 'utf8'));

// Helper to generate UUID
function generateUUID() {
    return crypto.randomUUID();
}

// Helper to convert status
function convertStatus(cucumberStatus) {
    switch (cucumberStatus) {
        case 'passed': return 'passed';
        case 'failed': return 'failed';
        case 'skipped':
        case 'pending':
        case 'undefined': return 'skipped';
        default: return 'broken';
    }
}

// Helper to process attachments
function processAttachments(step) {
    const attachments = [];

    if (step.embeddings) {
        step.embeddings.forEach((embedding, index) => {
            const attachmentUuid = generateUUID();
            let fileName, mimeType;

            if (embedding.mime_type === 'image/png') {
                fileName = `${attachmentUuid}-attachment.png`;
                mimeType = 'image/png';
            } else if (embedding.mime_type === 'text/html') {
                fileName = `${attachmentUuid}-attachment.html`;
                mimeType = 'text/html';
            } else {
                fileName = `${attachmentUuid}-attachment.txt`;
                mimeType = 'text/plain';
            }

            // Write attachment file
            const attachmentPath = path.join(allureResultsDir, fileName);
            const buffer = Buffer.from(embedding.data, 'base64');
            fs.writeFileSync(attachmentPath, buffer);

            attachments.push({
                name: embedding.name || `Attachment ${index + 1}`,
                source: fileName,
                type: mimeType
            });
        });
    }

    return attachments;
}

let convertedCount = 0;

// Convert each feature
cucumberResults.forEach(feature => {
    feature.elements.forEach(scenario => {
        const testUuid = generateUUID();
        const startTime = Date.now();
        let stopTime = startTime;

        // Determine overall test status
        let testStatus = 'passed';
        const steps = [];
        const testAttachments = [];

        // Process all steps (including Before/After hooks)
        scenario.steps.forEach(step => {
            const stepUuid = generateUUID();
            const stepStatus = step.result ? convertStatus(step.result.status) : 'skipped';

            // Determine step name
            let stepName = `${step.keyword}${step.name}`;
            if (step.keyword === 'Before') {
                stepName = 'Before (Setup)';
            } else if (step.keyword === 'After') {
                stepName = 'After (Teardown)';
            }

            if (stepStatus === 'failed') {
                testStatus = 'failed';
            } else if (stepStatus === 'skipped' && testStatus === 'passed') {
                testStatus = 'skipped';
            }

            const stepDuration = step.result && step.result.duration ?
                Math.round(step.result.duration / 1000000) : 0; // Convert nanoseconds to milliseconds

            // Process attachments for this step
            const stepAttachments = processAttachments(step);

            const stepData = {
                name: stepName,
                status: stepStatus,
                statusDetails: step.result && step.result.error_message ? {
                    message: step.result.error_message.split('\n')[0], // First line only
                    trace: step.result.error_message
                } : {},
                stage: 'finished',
                start: stopTime,
                stop: stopTime + stepDuration,
                steps: [],
                attachments: stepAttachments,
                parameters: []
            };

            steps.push(stepData);
            stopTime += stepDuration;
        });

        // Extract tags
        const labels = [];
        if (scenario.tags) {
            scenario.tags.forEach(tag => {
                const tagValue = tag.name.replace('@', '');
                labels.push({
                    name: 'tag',
                    value: tagValue
                });

                // Also add as severity if it's a known severity tag
                if (['blocker', 'critical', 'normal', 'minor', 'trivial'].includes(tagValue)) {
                    labels.push({
                        name: 'severity',
                        value: tagValue
                    });
                }
            });
        }

        // Add suite label (feature name)
        labels.push({
            name: 'suite',
            value: feature.name
        });

        labels.push({
            name: 'feature',
            value: feature.name
        });

        // Add parent suite for BDD tests
        labels.push({
            name: 'parentSuite',
            value: 'BDD Tests (Cucumber)'
        });

        // Create Allure result object
        const allureResult = {
            uuid: testUuid,
            historyId: `${feature.name}:${scenario.name}`,
            fullName: `${feature.name}: ${scenario.name}`,
            name: scenario.name,
            status: testStatus,
            statusDetails: {},
            stage: 'finished',
            start: startTime,
            stop: stopTime,
            steps: steps,
            attachments: testAttachments,
            parameters: [],
            labels: labels,
            links: []
        };

        // Write Allure result file
        const resultFileName = `${testUuid}-result.json`;
        const resultFilePath = path.join(allureResultsDir, resultFileName);
        fs.writeFileSync(resultFilePath, JSON.stringify(allureResult, null, 2));
        convertedCount++;
    });
});

console.log('✅ Cucumber results converted to Allure format');
console.log(`   Converted ${convertedCount} scenarios`);
console.log(`   Results saved to: ${allureResultsDir}`);
