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

This project leverages Playwright for:

- **End-to-End (E2E) UI Testing**: Automated browser tests for critical user flows in the OrangeHRM demo web application.
- **API Testing**: Automated tests for public APIs (e.g., JSONPlaceholder) to ensure backend reliability.
- **Database Testing**: Integration tests using MySQL (Sakila sample DB) to validate data integrity and queries.
- **Performance Testing**: Automated performance audits using Lighthouse, with budgets and KPIs for web performance.
- **Playwright MCP**: Ready for advanced model-based testing and context management.

The project ensures robust quality assurance across UI, API, database, and performance layers.

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
   ├── api.spec.ts         # API tests (JSONPlaceholder)
   ├── db.spec.ts          # Database tests (MySQL/Sakila)
   ├── orange.spec.ts      # E2E UI tests (OrangeHRM)
   └── performance.spec.ts # Lighthouse performance tests
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

## API Testing

API tests are located in `tests/api.spec.ts` and use Playwright's APIRequestContext to validate endpoints like JSONPlaceholder. Example:

```ts
import { test, expect } from "@playwright/test";
test("GET /posts returns a list of posts", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  expect(response.ok()).toBeTruthy();
  const posts = await response.json();
  expect(Array.isArray(posts)).toBeTruthy();
});
```

## Database Testing

Database tests are in `tests/db.spec.ts` and use MySQL (Sakila sample DB) via `mysql2/promise`. DB credentials are managed securely in a `.env` file. Example:

```ts
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();
// ...connect and run queries...
```

## Performance Testing (Lighthouse)

Performance tests are in `tests/performance.spec.ts` and use Lighthouse to audit web performance. KPIs and budgets are enforced automatically. To run and view the report:

```sh
npm run lh:report
```

This generates `lighthouse-report.html` and opens it automatically.

### Performance KPIs Explained

- **FCP (First Contentful Paint):** Time until the first text/image is visible. Lower is better.
- **LCP (Largest Contentful Paint):** Time until the main content is visible. Lower is better.
- **TTI (Time to Interactive):** Time until the page is fully usable. Lower is better.
- **Performance Score:** 0–100 score summarizing overall web performance.

Performance budgets are set in the test file. If a KPI exceeds its budget, the test fails.

## Load Testing (JMeter, k6, Gatling)

This project focuses on browser, API, DB, and web performance testing. For large-scale load testing (simulating many users or stressing APIs), consider:

- **JMeter**: Java-based, GUI/CLI, protocol-level load testing.
- **k6**: JavaScript, CLI, modern API load testing.
- **Gatling**: Scala, code-centric, advanced HTTP load testing.

These tools are not included by default but can be integrated if needed.

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

## Environment Variables

Database credentials and other secrets are managed in a `.env` file (not committed to version control). Example:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_DATABASE=sakila
```

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
