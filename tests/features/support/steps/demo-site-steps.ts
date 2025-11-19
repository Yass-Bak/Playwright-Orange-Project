import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

/**
 * Step Definitions for Demo Site Registration Feature
 * These steps use the Page Object Model (POM) pattern
 */

// ============================================
// GIVEN Steps - Preconditions
// ============================================

Given('I navigate to the demo site homepage', async function (this: CustomWorld) {
  await this.landingPage.navigateTo('https://demo.automationtesting.in/Index.html');
  console.log('✓ Navigated to demo site homepage');
});

// ============================================
// WHEN Steps - Actions
// ============================================

When('I skip the initial sign-in', async function (this: CustomWorld) {
  await this.landingPage.clickSkipSignIn();
  console.log('✓ Skipped initial sign-in');
});

When('I fill in the registration form with the following details:', async function (this: CustomWorld, dataTable: DataTable) {
  const data = dataTable.rowsHash();
  
  // Fill individual fields
  if (data['First Name']) {
    await this.registerPage.firstNameInput.fill(data['First Name']);
    console.log(`✓ Entered first name: ${data['First Name']}`);
  }
  
  if (data['Last Name']) {
    await this.registerPage.lastNameInput.fill(data['Last Name']);
    console.log(`✓ Entered last name: ${data['Last Name']}`);
  }
  
  if (data['Address']) {
    await this.registerPage.addressInput.fill(data['Address']);
    console.log(`✓ Entered address: ${data['Address']}`);
  }
  
  if (data['Email']) {
    await this.registerPage.emailInput.fill(data['Email']);
    console.log(`✓ Entered email: ${data['Email']}`);
  }
  
  if (data['Phone']) {
    await this.registerPage.phoneInput.fill(data['Phone']);
    console.log(`✓ Entered phone: ${data['Phone']}`);
  }
});

When('I select gender {string}', async function (this: CustomWorld, gender: string) {
  if (gender.toLowerCase() === 'male') {
    await this.registerPage.maleRadio.check();
  } else {
    await this.registerPage.femaleRadio.check();
  }
  console.log(`✓ Selected gender: ${gender}`);
});

When('I select hobbies {string}', async function (this: CustomWorld, hobby: string) {
  if (hobby.toLowerCase() === 'cricket') {
    await this.registerPage.hobbiesCricket.check();
  } else if (hobby.toLowerCase() === 'movies') {
    await this.registerPage.hobbiesMovies.check();
  } else if (hobby.toLowerCase() === 'hockey') {
    await this.registerPage.hobbiesHockey.check();
  }
  console.log(`✓ Selected hobby: ${hobby}`);
});

When('I select skills {string}', async function (this: CustomWorld, skill: string) {
  await this.registerPage.skillsDropdown.selectOption(skill);
  console.log(`✓ Selected skill: ${skill}`);
});

When('I choose a password {string}', async function (this: CustomWorld, password: string) {
  await this.registerPage.passwordInput.fill(password);
  console.log('✓ Entered password');
});

When('I confirm the password {string}', async function (this: CustomWorld, password: string) {
  await this.registerPage.confirmPasswordInput.fill(password);
  console.log('✓ Confirmed password');
});

When('I submit the registration form', async function (this: CustomWorld) {
  await this.registerPage.submitForm();
  console.log('✓ Submitted registration form');
});

When('I submit the registration form without filling any data', async function (this: CustomWorld) {
  await this.registerPage.submitForm();
  console.log('✓ Attempted to submit empty form');
});

// ============================================
// THEN Steps - Assertions
// ============================================

Then('I should be redirected to the widgets page', async function (this: CustomWorld) {
  // Wait for navigation to complete
  await this.page.waitForLoadState('networkidle');
  
  // Verify URL contains expected path
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('WebTable');
  console.log('✓ Successfully redirected to widgets page');
});

Then('I should see the accordion widget', async function (this: CustomWorld) {
  // Navigate to accordion to verify
  await this.widgetsPage.navigateToAccordion();
  const isVisible = await this.widgetsPage.accordionHeading1.isVisible();
  expect(isVisible).toBeTruthy();
  console.log('✓ Accordion widget is visible');
});

Then('I should see validation errors', async function (this: CustomWorld) {
  // Wait a moment for validation to appear
  await this.page.waitForTimeout(1000);
  
  // Check if form is still on registration page (not submitted)
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('Register');
  console.log('✓ Validation prevented form submission');
});

