Feature: User Registration on Demo Site
  As a new user
  I want to register on the demo automation testing site
  So that I can access the application features

  Background:
    Given I navigate to the demo site homepage

  @smoke @registration
  Scenario: Successful registration with valid data
    When I skip the initial sign-in
    And I fill in the registration form with the following details:
      | Field       | Value                    |
      | First Name  | John                     |
      | Last Name   | Doe                      |
      | Address     | 123 Main Street          |
      | Email       | john.doe@example.com     |
      | Phone       | 1234567890               |
    And I select gender "Male"
    And I select hobbies "Cricket"
    And I select skills "APIs"
    And I choose a password "SecurePass123"
    And I confirm the password "SecurePass123"
    And I submit the registration form
    Then I should be redirected to the widgets page
    And I should see the accordion widget

  @smoke @registration @validation
  Scenario: Registration form validation
    When I skip the initial sign-in
    And I submit the registration form without filling any data
    Then I should see validation errors

  @regression @registration
  Scenario Outline: Register users with different skill sets
    When I skip the initial sign-in
    And I fill in the registration form with the following details:
      | Field       | Value                    |
      | First Name  | <firstName>              |
      | Last Name   | <lastName>               |
      | Address     | 456 Test Avenue          |
      | Email       | <email>                  |
      | Phone       | 9876543210               |
    And I select gender "<gender>"
    And I select skills "<skill>"
    And I choose a password "TestPass123"
    And I confirm the password "TestPass123"
    And I submit the registration form
    Then I should be redirected to the widgets page

    Examples:
      | firstName | lastName | email                  | gender | skill      |
      | Alice     | Smith    | alice.smith@test.com   | Female | Java       |
      | Bob       | Johnson  | bob.johnson@test.com   | Male   | Python     |
      | Carol     | Williams | carol.williams@test.com| Female | Analytics  |
