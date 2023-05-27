import { test, expect } from '@playwright/test';

// https://playwright.dev/docs/locators
test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto('http://localhost:4200');
    // Using locators functions: 
    // Using page element role:
    const title = await page.getByRole('heading', { name: 'Hello World!' });

    // Search by text content. Partial and exact text.
    const description1 = await page.getByText('Start your');
    const description2 = await page.getByText('Start your first app!',  { exact: true });

    // Using page.locator
    const description3 = await page.locator('div.description:has-text("Start your first app!")');

    expect(title).toBeVisible();
    expect(description1).toBeVisible();
    expect(description2).toBeVisible();
    expect(description3).toBeVisible();

    // Success not visible
    let success = await page.getByText('Wow!');
    // Success message should not be visible - we haven't clicked yet.
    expect(success).not.toBeVisible();
    // Triggers events
    const showSuccessButton = await page.getByRole('button', { name: 'Show success!'});
    await showSuccessButton.click();
    success = await page.getByText('Wow!');
    // Success message should be visible now!
    expect(success).toBeVisible();
    
    showSuccessButton.click();
    success = await page.getByText('Wow!');
    // Success message shouldn't be visible again.
    expect(success).not.toBeVisible();
  });
});
