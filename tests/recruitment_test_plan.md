# Test Plan: Recruitment Module - Add Candidate

**Target URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates`

## Objective
Verify the functionality of adding a new candidate in the Recruitment module.

## Scenarios

### 1. Successful Candidate Addition
**Description**: Verify that a user can successfully add a candidate with all mandatory fields.
**Steps**:
1. Login as Admin.
2. Navigate to "Recruitment" via the side menu.
3. Click the "Add" button.
4. Fill in "First Name", "Last Name", and "Email".
5. Click "Save".
**Expected Result**:
- User is redirected to the Candidate Profile page.
- A success toaster message is displayed.
- The candidate's name appears in the profile header.

### 2. Form Validation (Negative Test)
**Description**: Verify that the system prevents saving without mandatory fields.
**Steps**:
1. Login as Admin.
2. Navigate to "Recruitment" -> "Add".
3. Leave "First Name" and "Last Name" empty.
4. Click "Save".
**Expected Result**:
- "Required" error message appears under "First Name" and "Last Name" fields.
- Form is not submitted.

### 3. Invalid Email Format
**Description**: Verify that the system validates the email format.
**Steps**:
1. Login as Admin.
2. Navigate to "Recruitment" -> "Add".
3. Enter "invalid-email" in the Email field.
4. Click "Save".
**Expected Result**:
- "Expected format: admin@example.com" (or similar) error message appears under the Email field.
