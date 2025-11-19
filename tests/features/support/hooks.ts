import { Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as fs from 'fs';
import * as path from 'path';

// Set default timeout for all steps (30 seconds)
setDefaultTimeout(30 * 1000);

/**
 * Before hook - runs before each scenario
 * Initializes the browser and page objects
 */
Before(async function (this: CustomWorld, { pickle }) {
  console.log(`\n🚀 Starting scenario: ${pickle.name}`);
  await this.init();
});

/**
 * After hook - runs after each scenario
 * Closes the browser and cleans up resources
 */
After(async function (this: CustomWorld, { pickle }) {
  console.log(`\n✅ Completed scenario: ${pickle.name}`);
  await this.cleanup();
});

/**
 * AfterStep hook - runs after each step
 * Captures screenshot on failure for debugging
 */
AfterStep(async function (this: CustomWorld, { result, pickle, pickleStep }) {
  // Only capture screenshot if step failed
  if (result.status === Status.FAILED) {
    const screenshotDir = path.join(__dirname, '../../../test-results/screenshots');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // Generate screenshot filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const stepName = pickleStep.text.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const screenshotPath = path.join(
      screenshotDir,
      `FAILED_${scenarioName}_${stepName}_${timestamp}.png`
    );

    // Capture screenshot
    if (this.page) {
      const screenshot = await this.page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      // Attach screenshot to Cucumber report
      await this.attach(screenshot, 'image/png');
      
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    }
  }
});

