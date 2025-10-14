import { test, expect } from '@playwright/test';

test('Login Success', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    await page.getByRole('textbox', { name: '用户名' }).fill('Admin');
    await page.getByRole('textbox', { name: '密码' }).fill('admin123');
    await page.getByRole('button', { name: '登录' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});
test('Login Unsuccess', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    await page.getByRole('textbox', { name: '用户名' }).fill('admin123');
    await page.getByRole('textbox', { name: '密码' }).fill('Admin');
    await page.getByRole('button', { name: '登录' }).click();
    expect(page.getByText('Invalid credentials')).toBeTruthy();
});