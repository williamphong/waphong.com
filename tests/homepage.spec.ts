import { test, expect } from '@playwright/test';

test('Homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check title
  await expect(page).toHaveTitle(/William Phong/);

  // Ensure main heading is visible
  await expect(page.locator('h1')).toHaveText(/william phong/i);

  // Check if navigation links exist
  const navLinks = ['about', 'projects', 'more'];
  for (const link of navLinks) {
    await expect(page.locator(`text=${link}`)).toBeVisible();
  }
});

