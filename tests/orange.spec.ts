import { test, expect } from '@playwright/test';

test('Login TC', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    const username = page.getByRole('textbox', { name: 'Username' });
    await username.fill('Admin');
    const Password = page.getByPlaceholder('Password');
    await Password.fill('admin123');
    const submit = page.getByRole('button', { name: 'Login' });
    submit.click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});