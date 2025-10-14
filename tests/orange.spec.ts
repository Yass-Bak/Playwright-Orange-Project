
// Playwright E2E tests for OrangeHRM demo site
// Each test uses Gherkin-style steps for clarity and maintainability
import { test, expect } from '@playwright/test';

// After each test, attach a DOM snapshot if the test failed, and always close the page
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        // Attach DOM snapshot for easier debugging of UI failures
        const domSnapshot = await page.content();
        await testInfo.attach('DOM Snapshot', {
            body: Buffer.from(domSnapshot, 'utf-8'),
            contentType: 'text/html',
        });
    }
    await page.close();
});
// Test: Successful login to OrangeHRM with valid credentials
test('Login Success', async ({ page }) => {
    // Step 1: Go to login page
    await test.step('Given the user is on the OrangeHRM login page', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com');
    });

    // Step 2: Enter valid credentials
    await test.step('When the user enters valid credentials', async () => {
        await page.getByRole('textbox', { name: 'username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'password' }).fill('admin123');
    });

    // Step 3: Click Login
    await test.step('And the user clicks the Login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
    });

    // Step 4: Assert dashboard is shown
    await test.step('Then the user should be redirected to the dashboard', async () => {
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });
});

// Test: Unsuccessful login to OrangeHRM with invalid credentials
test('Login Unsuccess', async ({ page }) => {
    // Step 1: Go to login page
    await test.step('Given the user is on the OrangeHRM login page', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com');
    });

    // Step 2: Enter invalid credentials
    await test.step('When the user enters invalid credentials', async () => {
        await page.getByRole('textbox', { name: 'username' }).fill('admin123');
        await page.getByRole('textbox', { name: 'password' }).fill('Admin');
    });

    // Step 3: Click Login
    await test.step('And the user clicks the Login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
    });

    // Step 4: Assert error message is shown
    await test.step('Then an error message "Invalid credentials" should be displayed', async () => {
        expect(page.getByText('Invalid credentials')).toBeTruthy();
    });
});

// Test: Admin login and navigation to Maintenance in OrangeHRM
test('Admin Login', async ({ page }) => {
    // Step 1: Go to login page
    await test.step('Given the user is on the OrangeHRM login page', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com');
    });

    // Step 2: Enter admin credentials
    await test.step('When the user enters admin credentials', async () => {
        await page.getByRole('textbox', { name: 'username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'password' }).fill('admin123');
    });

    // Step 3: Click Login
    await test.step('And the user clicks the Login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
    });

    // Step 4: Assert dashboard is visible
    await test.step('Then the dashboard should be visible', async () => {
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    // Step 5: Navigate to Maintenance
    await test.step('When the user navigates to Maintenance', async () => {
        await page.getByRole('link', { name: 'Maintenance' }).click();
    });

    // Step 6: Assert Administrator Access prompt is visible
    await test.step('Then the Administrator Access prompt should be visible', async () => {
        await expect(page.locator('div').filter({ hasText: 'Administrator AccessYou have' }).nth(1)).toBeVisible();
    });

    // Step 7: Confirm with admin password
    await test.step('When the user confirms with the admin password', async () => {
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('admin123');
        await page.getByRole('button', { name: 'Confirm' }).click();
    });

    // Step 8: Assert Maintenance page is displayed
    await test.step('Then the Maintenance page should be displayed', async () => {
        await expect(page.getByRole('banner')).toContainText('Maintenance');
        await expect(page.locator('#app')).toMatchAriaSnapshot(`
            - heading "Purge Employee Records" [level=6]
            - separator
            - text: Past Employee*
            - textbox "Type for hints..."
            - separator
            - paragraph: "* Required"
            - button "Search"
            - paragraph: Note
            - paragraph: "Users who seek access to their data, or who seek to correct, amend, or delete the given information should direct their requests to Data@orangehrm.com with the subject \"Purge Records (Instance Identifier: T3JhbmdlSFJNX3Rlc3RAb3JhbmdlaHJtLmNvbV9PcmFuZ2VfVGVzdF9vcGVuc291cmNlLWRlbW8tbWFzdGVyLm9yYW5nZWhybWxpdmUuY29tX180LjU=)\""
        `);
    });
});
