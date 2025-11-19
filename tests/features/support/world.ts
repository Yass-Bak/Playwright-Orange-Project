import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LandingPage } from '../../../pages/LandingPage';
import { RegisterPage } from '../../../pages/RegisterPage';
import { WidgetsPage } from '../../../pages/WidgetsPage';

/**
 * Custom World class that extends Cucumber's World
 * This class holds the browser, context, page, and Page Object instances
 * that are shared across step definitions
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  
  // Page Object Model instances
  landingPage!: LandingPage;
  registerPage!: RegisterPage;
  widgetsPage!: WidgetsPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  /**
   * Initialize browser and page objects
   */
  async init() {
    this.browser = await chromium.launch({
      headless: false, // Set to true for CI/CD
      slowMo: 100      // Slow down for demo purposes
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: './test-results/videos/'
      }
    });
    
    this.page = await this.context.newPage();
    
    // Initialize Page Objects
    this.landingPage = new LandingPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.widgetsPage = new WidgetsPage(this.page);
  }

  /**
   * Clean up browser resources
   */
  async cleanup() {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Set the custom world constructor
setWorldConstructor(CustomWorld);
