# Playwright-Orange-Project

![Playwright Logo](https://playwright.dev/img/playwright-logo.svg)

A comprehensive end-to-end testing project for the Orange web application using [Playwright](https://playwright.dev/) and Playwright Model Context Protocol (MCP).

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)
- [Viewing Reports](#viewing-reports)
- [Writing & Organizing Tests](#writing--organizing-tests)
- [Playwright MCP Integration](#playwright-mcp-integration)
- [Screenshots & Visuals](#screenshots--visuals)
- [Useful Commands](#useful-commands)
- [Resources](#resources)

---

## Project Overview

This project leverages Playwright for automated browser testing and will integrate Playwright MCP for advanced model-based testing and context management. It is designed to ensure robust quality assurance for the Orange web application.

## Project Structure

```
.
├── package.json
├── playwright.config.ts
├── playwright-report/
│   └── index.html
├── test-results/
│   └── test-1-test-chromium/
│       └── error-context.md
└── tests/
    ├── example.spec.ts
    └── orange.spec.ts
```

- **package.json**: Project dependencies and scripts.
- **playwright.config.ts**: Playwright configuration.
- **playwright-report/**: HTML reports generated after test runs.
- **test-results/**: Raw test result files and error context.
- **tests/**: Contains Playwright test files.

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd Playwright-Orange-Project
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

![Install Screenshot](https://playwright.dev/img/intro.png)

## Running Tests

To run all tests:

```sh
npx playwright test
```

To run a specific test file:

```sh
npx playwright test tests/orange.spec.ts
```

To run tests in headed mode (see the browser):

```sh
npx playwright test --headed
```

## Viewing Reports

After running tests, view the HTML report:

```sh
npx playwright show-report
```

![Report Screenshot](https://playwright.dev/img/report.png)

## Writing & Organizing Tests

- Add new test files in the `tests/` directory.
- Use Playwright's [test API](https://playwright.dev/docs/test-api-testing) for writing and organizing tests.
- Example test snippet:

```ts
import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("https://orange.com");
  await expect(page).toHaveTitle(/Orange/);
});
```

## Playwright MCP Integration

> **Note:** Playwright MCP (Model Context Protocol) enables advanced model-based testing, context sharing, and enhanced traceability. This project is ready for MCP integration in future steps.

- [Playwright MCP Documentation](https://aka.ms/playwright-mcp)
- To enable MCP, follow the official guide and update your configuration as needed.
- Example MCP configuration and usage will be added as the project evolves.

## Screenshots & Visuals

- Test runs automatically capture screenshots on failure and store them in the `test-results/` directory.
- Example screenshot:

![Test Failure Screenshot](https://playwright.dev/img/screenshot.png)

## Useful Commands

- Run all tests: `npx playwright test`
- Show last test report: `npx playwright show-report`
- Run tests in headed mode: `npx playwright test --headed`
- Update Playwright: `npx playwright install`

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/test-api-testing)
- [Playwright MCP](https://aka.ms/playwright-mcp)

---

© 2025 Yass-Bak
