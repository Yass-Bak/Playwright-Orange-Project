# Deployment Setup Guide

Follow these steps to connect your project to GitHub and Netlify.

## 1. GitHub Setup

1.  **Create a New Repository** on GitHub (e.g., `playwright-demo-automation`).
2.  **Push your code**:
    ```bash
    git add .
    git commit -m "Initial commit with Playwright tests and CI/CD"
    git branch -M main
    git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
    git push -u origin main
    ```

## 2. Netlify Setup

### Get your Auth Token
1.  Log in to your Netlify account.
2.  Go to **User Settings** -> **Applications** -> **Personal Access Tokens**.
3.  Click **New access token**.
4.  Give it a description (e.g., "GitHub Actions") and copy the token. **Save this securely.**

### Get your Site ID
1.  Go to the **Sites** tab in Netlify.
2.  You can either:
    *   **Create a new site manually**: Drag and drop an empty folder to create a placeholder site, then go to **Site Settings** -> **General** -> **Site details** to copy the **Site ID** (API ID).
    *   **OR** let the pipeline create one (requires slightly different config, but using a pre-created site is more stable).

## 3. Configure GitHub Secrets

1.  Go to your GitHub Repository.
2.  Click **Settings** -> **Secrets and variables** -> **Actions**.
3.  Click **New repository secret**.
4.  Add the following secrets:
    *   **Name**: `NETLIFY_AUTH_TOKEN`
        *   **Value**: (Paste the token you copied from Netlify)
    *   **Name**: `NETLIFY_SITE_ID`
        *   **Value**: (Paste the Site ID from Netlify)

## 4. Trigger the Pipeline

Once the secrets are added, the pipeline will run automatically at midnight. To test it immediately:
1.  Go to the **Actions** tab in your GitHub repository.
2.  Select the **Playwright Tests** workflow.
3.  Click **Run workflow**.
