import { test, expect } from '@playwright/test';


test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        // Attach DOM snapshot
        const domSnapshot = await page.content();
        await testInfo.attach('DOM Snapshot', {
            body: Buffer.from(domSnapshot, 'utf-8'),
            contentType: 'text/html',
        });
        // Attach screenshot (redundant if Playwright already does, but ensures it's present)
        if (page.screenshot) {
            const screenshot = await page.screenshot();
            await testInfo.attach('Screenshot', { body: screenshot, contentType: 'image/png' });
        }
    }
    await page.close();

});


test('Login Success', async ({ page }) => {

    await test.step('Given the user is on the OrangeHRM login page', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com');
    });

    await test.step('When the user enters valid credentials', async () => {
        await page.getByRole('textbox', { name: 'username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'password' }).fill('admin123');
    });

    await test.step('And the user clicks the Login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
    });

    await test.step('Then the user should be redirected to the dashboard', async () => {
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });

});

test('Login Unsuccess', async ({ page }) => {

    await test.step('Given the user is on the OrangeHRM login page', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com');
    });

    await test.step('When the user enters invalid credentials', async () => {
        await page.getByRole('textbox', { name: 'username' }).fill('admin123');
        await page.getByRole('textbox', { name: 'password' }).fill('Admin');
    });

    await test.step('And the user clicks the Login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
    });

    await test.step('Then an error message "Invalid credentials" should be displayed', async () => {
        expect(page.getByText('Invalid credentials')).toBeTruthy();
    });

});

test('Admin Login', async ({ page }) => {
    await test.step('Given the user is on the OrangeHRM login page', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com');
    });

    await test.step('When the user enters admin credentials', async () => {
        await page.getByRole('textbox', { name: 'username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'password' }).fill('admin123');
    });

    await test.step('And the user clicks the Login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
    });

    await test.step('Then the dashboard should be visible', async () => {
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    await test.step('When the user navigates to Maintenance', async () => {
        await page.getByRole('link', { name: 'Maintenance' }).click();
    });

    await test.step('Then the Administrator Access prompt should be visible', async () => {
        await expect(page.locator('div').filter({ hasText: 'Administrator AccessYou have' }).nth(1)).toBeVisible();
    });

    await test.step('When the user confirms with the admin password', async () => {
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('admin123');
        await page.getByRole('button', { name: 'Confirm' }).click();
    });

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
- paragraph: "Users who seek access to their data, or who seek to correct, amend, or delete the given information should
direct their requests to Data@orangehrm.com with the subject \"Purge Records (Instance Identifier:
T3JhbmdlSFJNX3Rlc3RAb3JhbmdlaHJtLmNvbV9PcmFuZ2VfVGVzdF9vcGVuc291cmNlLWRlbW8tbWFzdGVyLm9yYW5nZWhybWxpdmUuY29tX180LjU=)\""
`);
    });

});
