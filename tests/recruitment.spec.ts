import { test, expect } from '@playwright/test';

test.describe('Recruitment Module - Add Candidate', () => {

  test.beforeEach(async ({ page }) => {
    // Login as Admin
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Successful Candidate Addition', async ({ page }) => {
    // Navigate to Recruitment
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await expect(page).toHaveURL(/recruitment/);

    // Click Add
    // HEALED: The Healer Agent identified the correct button is "Add"
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Fill Form
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByPlaceholder('Type here').first().fill('john.doe@example.com'); // Email field often lacks specific role/label in OrangeHRM, using placeholder as fallback or specific selector if needed.
    
    // Note: OrangeHRM email field might be tricky. Let's try a more specific locator if placeholder is generic.
    // Inspecting common OrangeHRM DOM: The email input usually has a label "Email".
    // Let's refine the email locator to be more robust if possible, or stick to the placeholder if it's unique.
    // For this demo, we'll assume the placeholder or use a label locator.
    // A better approach for "Email" if getByRole doesn't work directly due to complex DOM:
    // await page.locator('form').getByText('Email').locator('..').locator('input').fill('john.doe@example.com');
    // But let's try the standard first.
    
    // Click Save
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify Success
    // Expect a toaster or redirection
    await expect(page.getByText('Successfully Saved')).toBeVisible({ timeout: 10000 });
  });

  test('Form Validation (Negative Test)', async ({ page }) => {
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.getByRole('button', { name: 'Add' }).click();

    // Leave fields empty and Save
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify Errors
    await expect(page.getByText('Required').first()).toBeVisible();
  });
});
