# Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![Allure Report](https://img.shields.io/badge/Allure_Report-21b3b3?style=for-the-badge&logo=Allure&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

A robust end-to-end automation framework built with Playwright, TypeScript, and Page Object Model (POM) design pattern. This project includes automated tests for the [Demo Automation Site](https://demo.automationtesting.in/Index.html) and integrates with Allure for reporting and GitHub Actions for CI/CD.

## 🚀 Features

-   **Page Object Model (POM)**: Modular and maintainable test structure.
-   **Allure Reporting**: Detailed, interactive HTML reports with history trends, steps, and screenshots.
-   **CI/CD Integration**: Automated testing pipeline using GitHub Actions.
-   **Cross-Browser Testing**: Configured for Chromium (expandable to Firefox/WebKit).
-   **Visual Debugging**: Screenshots attached automatically on test failure.
-   **Custom Reporting Script**: Cross-platform script (`generate_report.js`) for reliable report generation with history.

## 🛠️ Tools & Technologies

-   **Language**: TypeScript / Node.js
-   **Framework**: [Playwright](https://playwright.dev/)
-   **Reporting**: [Allure Report](https://allurereport.org/)
-   **CI/CD**: GitHub Actions
-   **Deployment**: Netlify (for reports)

## 📂 Project Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml    # GitHub Actions pipeline configuration
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts           # Common methods
│   ├── LandingPage.ts        # Landing page interactions
│   ├── RegisterPage.ts       # Registration form elements
│   └── WidgetsPage.ts        # Widget interactions
├── tests/                    # Test specifications
│   ├── demo_site.spec.ts     # Main test suite for the demo site
│   └── ...                   # Other existing tests
├── allure-results/           # Raw test results (gitignored)
├── allure-report/            # Generated HTML report (gitignored)
├── generate_report.js        # Script to generate Allure report with history
├── playwright.config.ts      # Playwright configuration
└── package.json              # Dependencies and scripts
```

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Install Playwright browsers**:
    ```bash
    npx playwright install
    ```

## 🏃‍♂️ Running Tests

### Run All Tests
Executes all tests in the `tests/` directory.
```bash
npm test
# OR
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/demo_site.spec.ts
```

### Run with UI Mode (Headed)
```bash
npx playwright test --ui
```

## 📊 Reporting

This project uses Allure for reporting. We have a custom script to ensure history is preserved between runs (enabling the Trend chart).

### Generate and Open Report
After running tests, execute:
```bash
npm run report
```
This will:
1.  Copy history from the previous report (if exists).
2.  Generate a new report in `allure-report/`.
3.  Automatically open it in your default browser.

## 🤖 CI/CD Pipeline

The project is configured with GitHub Actions to run tests automatically.

-   **Schedule**: Runs every day at midnight (UTC).
-   **Workflow**:
    1.  Checkout code.
    2.  Install Node.js and dependencies.
    3.  Run all Playwright tests.
    4.  Generate Allure Report.
    5.  Deploy report to Netlify.

### Secrets Configuration
To enable Netlify deployment, add the following secrets to your GitHub Repository:
-   `NETLIFY_AUTH_TOKEN`: Your Netlify Personal Access Token.
-   `NETLIFY_SITE_ID`: The API ID of your Netlify site.

## 📝 Test Cases Implemented

1.  **Navigate to Register Page**: Verifies the "Skip Sign In" functionality.
2.  **Fill Registration Form**: Interacts with various form inputs (Text, Email, Phone, Radio, Checkbox, Select2).
    *   *Note: Currently has a known issue with the specific Select2 interaction for "Country".*
3.  **Widget Interaction**: Verifies navigation and interaction with the Accordion widget.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
