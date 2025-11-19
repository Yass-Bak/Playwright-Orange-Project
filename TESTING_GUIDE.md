# 🚀 Running Tests - Quick Reference

## Run ALL Tests (Playwright + Cucumber)

```bash
npm test
```

This will run:
1. All Playwright tests (`.spec.ts` files)
2. All Cucumber BDD tests (`.feature` files)

## Run Specific Test Types

### Playwright Tests Only
```bash
npm run test:playwright
```

### Cucumber BDD Tests Only
```bash
npm run test:cucumber
```

### Run with Tags (Cucumber)
```bash
# Run smoke tests only
npm run test:cucumber -- --tags "@smoke"

# Run regression tests
npm run test:cucumber -- --tags "@regression"

# Combine tags
npm run test:cucumber -- --tags "@smoke and @registration"
```

## Generate Reports

### Allure Report (for ALL tests)
```bash
npm run report
```

This generates an Allure report that includes:
- Playwright test results
- Cucumber test results  
- Screenshots on failure
- Step-by-step execution details

Then open: `allure-report/index.html`

### Cucumber HTML Report Only
```bash
npm run report:cucumber
```

Opens: `cucumber-report/html-report/index.html`

## Complete Workflow

```bash
# Run all tests and generate Allure report
npm run test:all
```

This runs Playwright tests, Cucumber tests, and generates the Allure report automatically.

## Test File Locations

```
tests/
├── *.spec.ts                    # Playwright tests
└── features/
    ├── demo-site/
    │   └── *.feature            # Cucumber feature files
    └── support/
        ├── world.ts             # Browser context
        ├── hooks.ts             # Before/After hooks
        └── steps/
            └── *-steps.ts       # Step definitions
```

## Tips

- **Headless mode**: Edit `tests/features/support/world.ts` and set `headless: true`
- **Parallel execution**: Configured in `cucumber.js` (currently 2 scenarios in parallel)
- **Screenshots**: Auto-captured on failure → `test-results/screenshots/`
- **Videos**: Auto-recorded → `test-results/videos/`

---

**Quick Start**: Just run `npm test` to execute everything! 🎉
