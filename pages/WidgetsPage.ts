import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WidgetsPage extends BasePage {
  readonly widgetsMenu: Locator;
  readonly accordionMenuItem: Locator;
  readonly accordionHeading1: Locator;
  readonly accordionContent1: Locator;

  constructor(page: Page) {
    super(page);
    this.widgetsMenu = page.locator('a', { hasText: 'Widgets' });
    this.accordionMenuItem = page.locator('a', { hasText: 'Accordion' });
    this.accordionHeading1 = page.locator('b', { hasText: 'Collapsible Group 1 - Readability' });
    this.accordionContent1 = page.locator('#collapse1');
  }

  async navigateToAccordion() {
    await this.widgetsMenu.hover();
    await this.accordionMenuItem.click();
  }

  async toggleAccordion1() {
    await this.accordionHeading1.click();
  }
}
