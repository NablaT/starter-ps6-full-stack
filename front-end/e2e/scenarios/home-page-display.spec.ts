import { test, expect } from '@playwright/test';
import { AppFixture } from 'src/app/app.fixture';

// https://playwright.dev/docs/locators
test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto('http://localhost:4200');
    const appComponentFixture = new AppFixture(page);
    // Using locators functions:
    // Using page element role: see the function declaration
    const title = await appComponentFixture.getTitle();

    // Search by text content. Partial and exact text.
    const description1 = await page.getByText('Start your');
    // For exact text: see the function declaration
    const description2 = await appComponentFixture.getDescription();

    // Using page.locator
    const description3 = await page.locator(
      'div.description:has-text("Start your first app!")'
    );

    expect(title).toBeVisible();
    expect(description1).toBeVisible();
    expect(description2).toBeVisible();
    expect(description3).toBeVisible();

    // Success not visible
    let success = await appComponentFixture.getSuccessMessage();

    // Success message should not be visible - we haven't clicked yet.
    expect(success).not.toBeVisible();

    // Triggers events
    const showSuccessButton = await appComponentFixture.getShowButton();
    await showSuccessButton.click();
    success = await appComponentFixture.getSuccessMessage();

    // Success message should be visible now!
    expect(success).toBeVisible();

    await showSuccessButton.click();
    success = await appComponentFixture.getSuccessMessage();
    // Success message shouldn't be visible again.
    expect(success).not.toBeVisible();
  });
});
