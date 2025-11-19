# BDD Testing Guide with Cucumber and Playwright

This guide explains how to write and run BDD (Behavior-Driven Development) tests using Cucumber with Gherkin syntax and Playwright.

## 📋 Table of Contents

- [Overview](#overview)
- [Writing Feature Files](#writing-feature-files)
- [Creating Step Definitions](#creating-step-definitions)
- [Using Page Object Model](#using-page-object-model)
- [Running Tests](#running-tests)
- [Viewing Reports](#viewing-reports)
- [Best Practices](#best-practices)

## 🎯 Overview

Our BDD framework combines:
- **Gherkin** - Human-readable test scenarios
- **Cucumber** - Test execution engine
- **Playwright** - Browser automation
- **Page Object Model** - Maintainable test code
- **Allure** - Detailed test reporting

## 📝 Writing Feature Files

Feature files are written in Gherkin syntax and stored in the `features/` directory.

### Basic Structure

```gherkin
Feature: Feature Name
  As a [role]
  I want [feature]
  So that [benefit]

  Background:
    Given [common precondition]

  Scenario: Scenario Name
    Given [precondition]
    When [action]
    Then [expected result]
```

### Example

```gherkin
Feature: User Login
  As a registered user
  I want to log into the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "admin"
    And I enter password "admin123"
    And I click the login button
    Then I should see the dashboard
```

### Data Tables

Use data tables for structured data:

```gherkin
When I fill in the form with:
  | Field      | Value           |
  | First Name | John            |
  | Last Name  | Doe             |
  | Email      | john@test.com   |
```

### Scenario Outlines

Use scenario outlines for data-driven testing:

```gherkin
Scenario Outline: Login with different users
  Given I am on the login page
  When I enter username "<username>"
  And I enter password "<password>"
  Then I should see "<result>"

  Examples:
    | username | password  | result     |
    | admin    | admin123  | Dashboard  |
    | user     | user123   | Dashboard  |
```

### Tags

Use tags to organize and filter tests:

```gherkin
@smoke @login
Scenario: Quick login test

@regression @slow
Scenario: Comprehensive login test
```

Run specific tags:
```bash
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@smoke and @login"
npx cucumber-js --tags "not @slow"
```

## 🔧 Creating Step Definitions

Step definitions are TypeScript files in `features/support/steps/` that implement the Gherkin steps.

### Basic Step Definition

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});

When('I enter username {string}', async function (this: CustomWorld, username: string) {
  await this.loginPage.fillUsername(username);
});

Then('I should see the dashboard', async function (this: CustomWorld) {
  const isVisible = await this.dashboardPage.isVisible();
  expect(isVisible).toBeTruthy();
});
```

### Step Definition Patterns

| Pattern | Example | Usage |
|---------|---------|-------|
| `{string}` | `"admin"` | String parameter |
| `{int}` | `42` | Integer parameter |
| `{float}` | `3.14` | Float parameter |
| `{word}` | `username` | Single word |

### Using Data Tables

```typescript
When('I fill in the form with:', async function (this: CustomWorld, dataTable: DataTable) {
  const data = dataTable.rowsHash();
  await this.registerPage.fillFirstName(data['First Name']);
  await this.registerPage.fillLastName(data['Last Name']);
});
```

## 🏗️ Using Page Object Model

Step definitions should use Page Objects for maintainability.

### Accessing Page Objects

The `CustomWorld` class provides access to all page objects:

```typescript
// Available in all step definitions via 'this'
this.page          // Playwright Page object
this.landingPage   // LandingPage instance
this.registerPage  // RegisterPage instance
this.widgetsPage   // WidgetsPage instance
```

### Example Integration

```typescript
Given('I navigate to the demo site', async function (this: CustomWorld) {
  await this.landingPage.navigate();
});

When('I fill in first name {string}', async function (this: CustomWorld, name: string) {
  await this.registerPage.fillFirstName(name);
});
```

### Adding New Page Objects

1. Create the page object in `pages/` directory
2. Import it in `features/support/world.ts`
3. Initialize it in the `init()` method:

```typescript
// In world.ts
import { NewPage } from '../../pages/NewPage';

export class CustomWorld extends World {
  newPage!: NewPage;
  
  async init() {
    // ... existing code
    this.newPage = new NewPage(this.page);
  }
}
```

## 🚀 Running Tests

### Run All BDD Tests

```bash
npm run test:bdd
```

### Run Tests with Tags

```bash
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@regression"
npx cucumber-js --tags "@smoke and not @slow"
```

### Run Specific Feature File

```bash
npx cucumber-js features/demo-site/registration.feature
```

### Run Tests and Generate Report

```bash
npm run test:bdd:report
```

### Parallel Execution

Tests run in parallel by default (configured in `cucumber.js`):

```javascript
parallel: 2  // Run 2 scenarios in parallel
```

## 📊 Viewing Reports

### Cucumber HTML Report

After running tests with `npm run test:bdd:report`:

```bash
# Report location
cucumber-report/html-report/index.html
```

Open in browser to see:
- Feature and scenario details
- Step-by-step execution
- Pass/fail status
- Execution time
- Screenshots on failure

### Allure Report

Generate Allure report:

```bash
npm run report
```

View report:
```bash
npx allure open allure-report
```

Allure shows:
- Test trends over time
- Detailed step breakdown
- Screenshots and attachments
- Execution timeline
- Categorized failures

## ✅ Best Practices

### Writing Good Gherkin

1. **Use business language**, not technical terms
   - ✅ `Given I am logged in as an admin`
   - ❌ `Given I POST to /api/login with admin credentials`

2. **Keep scenarios focused** - One scenario, one behavior
   - ✅ `Scenario: User can add item to cart`
   - ❌ `Scenario: User can browse, add to cart, checkout, and review order`

3. **Use Background** for common preconditions
   ```gherkin
   Background:
     Given I am logged in
     And I am on the products page
   ```

4. **Make scenarios independent** - Each scenario should work standalone

5. **Use descriptive scenario names**
   - ✅ `Scenario: Admin can delete user account`
   - ❌ `Scenario: Test delete function`

### Writing Step Definitions

1. **Reuse steps** - Write generic, reusable step definitions
2. **Keep steps simple** - Each step should do one thing
3. **Use Page Objects** - Never interact with selectors directly
4. **Add logging** - Use `console.log()` for debugging
5. **Handle waits properly** - Use Playwright's auto-waiting

### Organizing Tests

```
features/
├── demo-site/
│   ├── registration.feature
│   └── widgets.feature
├── orange-hrm/
│   └── login.feature
└── support/
    ├── world.ts
    ├── hooks.ts
    └── steps/
        ├── demo-site-steps.ts
        └── orange-hrm-steps.ts
```

### Tags Strategy

- `@smoke` - Critical path tests (run on every commit)
- `@regression` - Full test suite (run nightly)
- `@wip` - Work in progress (excluded from CI)
- `@slow` - Long-running tests (run separately)

## 🐛 Debugging

### View Browser

Set `headless: false` in `features/support/world.ts`:

```typescript
this.browser = await chromium.launch({
  headless: false,
  slowMo: 100
});
```

### Screenshots on Failure

Screenshots are automatically captured on failure and saved to:
```
test-results/screenshots/FAILED_*.png
```

### Console Logging

Add logging in step definitions:

```typescript
When('I click the button', async function (this: CustomWorld) {
  console.log('Clicking the submit button');
  await this.page.click('#submit');
  console.log('Button clicked successfully');
});
```

## 📚 Additional Resources

- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🆘 Common Issues

### Issue: Step definition not found

**Solution**: Ensure step definition file is in `features/support/steps/` and matches the Gherkin text exactly.

### Issue: TypeScript errors

**Solution**: Run `npm install` and check `tsconfig.cucumber.json` configuration.

### Issue: Browser not closing

**Solution**: Check that hooks in `features/support/hooks.ts` are properly configured.

### Issue: Screenshots not captured

**Solution**: Verify `AfterStep` hook is configured and `test-results/screenshots/` directory exists.
