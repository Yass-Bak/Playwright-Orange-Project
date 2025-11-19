import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly hobbiesCricket: Locator;
  readonly hobbiesMovies: Locator;
  readonly hobbiesHockey: Locator;
  readonly skillsDropdown: Locator;
  readonly countryDropdown: Locator; // The one that says "Select Country"
  readonly selectCountryDropdown: Locator; // The searchable one
  readonly yearDropdown: Locator;
  readonly monthDropdown: Locator;
  readonly dayDropdown: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.addressInput = page.locator('textarea[ng-model="Address"]');
    this.emailInput = page.locator('input[type="email"]');
    this.phoneInput = page.locator('input[type="tel"]');
    this.maleRadio = page.locator('input[value="Male"]');
    this.femaleRadio = page.locator('input[value="FeMale"]');
    this.hobbiesCricket = page.locator('#checkbox1');
    this.hobbiesMovies = page.locator('#checkbox2');
    this.hobbiesHockey = page.locator('#checkbox3');
    this.skillsDropdown = page.locator('#Skills');
    this.countryDropdown = page.locator('#countries');
    this.selectCountryDropdown = page.locator('#country');
    this.yearDropdown = page.locator('#yearbox');
    this.monthDropdown = page.locator('select[placeholder="Month"]');
    this.dayDropdown = page.locator('#daybox');
    this.passwordInput = page.locator('#firstpassword');
    this.confirmPasswordInput = page.locator('#secondpassword');
    this.submitButton = page.locator('#submitbtn');
  }

  async fillRegistrationForm(data: any) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    
    if (data.gender === 'Male') {
      await this.maleRadio.check();
    } else {
      await this.femaleRadio.check();
    }

    if (data.hobbies.includes('Cricket')) await this.hobbiesCricket.check();
    if (data.hobbies.includes('Movies')) await this.hobbiesMovies.check();
    if (data.hobbies.includes('Hockey')) await this.hobbiesHockey.check();

    await this.skillsDropdown.selectOption(data.skill);
    // await this.countryDropdown.selectOption(data.country); // Found to be empty
    
    // Handle Select2 for Country
    // Use the specific container for the country dropdown
    await this.page.locator('span[aria-labelledby="select2-country-container"]').click();
    await this.page.locator('.select2-search__field').fill(data.country);
    await this.page.locator('.select2-results__option').first().click();

    await this.yearDropdown.selectOption(data.dob.year);
    await this.monthDropdown.selectOption(data.dob.month);
    await this.dayDropdown.selectOption(data.dob.day);

    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
