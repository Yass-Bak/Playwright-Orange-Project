import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { RegisterPage } from '../pages/RegisterPage';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('Demo Automation Site Tests', () => {
  let landingPage: LandingPage;
  let registerPage: RegisterPage;
  let widgetsPage: WidgetsPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    registerPage = new RegisterPage(page);
    widgetsPage = new WidgetsPage(page);
    await landingPage.navigateTo('https://demo.automationtesting.in/Index.html');
  });

  test('Test Case 1: Navigate to Register Page', async ({ page }) => {
    await test.step('Step 1: Click "Skip Sign In" button', async () => {
      await landingPage.clickSkipSignIn();
    });
    
    await test.step('Step 2: Verify navigation to Register page', async () => {
      await expect(page).toHaveURL('https://demo.automationtesting.in/Register.html');
      await expect(page).toHaveTitle('Register');
    });
  });

  test('Test Case 2: Fill Registration Form', async ({ page }) => {
    await test.step('Step 1: Navigate to Register Page', async () => {
      await landingPage.clickSkipSignIn();
    });
    
    const dummyData = {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      email: 'john.doe@example.com',
      phone: '1234567890',
      gender: 'Male',
      hobbies: ['Cricket', 'Movies'],
      skill: 'Javascript',
      country: 'India', 
      dob: { year: '1990', month: 'January', day: '1' },
      password: 'Password123',
      confirmPassword: 'Password123'
    };

    await test.step('Step 2: Fill out the registration form', async () => {
      await registerPage.fillRegistrationForm(dummyData);
    });

    await test.step('Step 3: Verify input values', async () => {
      await expect(registerPage.firstNameInput).toHaveValue(dummyData.firstName);
      await expect(registerPage.lastNameInput).toHaveValue(dummyData.lastName);
    });
  });

  test('Test Case 3: Widget Interaction', async ({ page }) => {
    await test.step('Step 1: Navigate to Register Page', async () => {
      await landingPage.clickSkipSignIn();
    });

    await test.step('Step 2: Navigate to Accordion Widget', async () => {
      await widgetsPage.navigateToAccordion();
    });

    await test.step('Step 3: Verify Accordion Page', async () => {
      await expect(page).toHaveURL('https://demo.automationtesting.in/Accordion.html');
    });
    
    await test.step('Step 4: Interact with Accordion', async () => {
      await expect(widgetsPage.accordionContent1).toBeVisible();
      await widgetsPage.toggleAccordion1();
    });
  });
});
