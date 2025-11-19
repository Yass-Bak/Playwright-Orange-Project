import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {
  readonly skipSignInButton: Locator;
  readonly emailInput: Locator;
  readonly enterButton: Locator;

  constructor(page: Page) {
    super(page);
    this.skipSignInButton = page.locator('#btn2'); // "Skip Sign In"
    this.emailInput = page.locator('#email');
    this.enterButton = page.locator('#enterimg');
  }

  async clickSkipSignIn() {
    await this.skipSignInButton.click();
  }

  async enterEmailAndSignIn(email: string) {
    await this.emailInput.fill(email);
    await this.enterButton.click();
  }
}
