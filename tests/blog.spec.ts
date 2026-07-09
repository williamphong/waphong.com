import { test, expect } from '@playwright/test';

test('post content renders as Markdown, not literal text', async ({ page }) => {
  await page.goto('/blog/welcome-to-my-blog');

  await expect(
    page.getByRole('heading', { level: 2, name: 'What to Expect' })
  ).toBeVisible();
  await expect(page.getByRole('listitem').first()).toBeVisible();

  // The failure mode was `## What to Expect` rendered with the hashes showing.
  await expect(page.locator('body')).not.toContainText('## What to Expect');
  await expect(page.locator('body')).not.toContainText('# Welcome to My Blog');
});

test('a post page has exactly one h1', async ({ page }) => {
  await page.goto('/blog/welcome-to-my-blog');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});

test('an unknown post returns a real 404', async ({ page }) => {
  const response = await page.goto('/blog/does-not-exist');
  expect(response?.status()).toBe(404);
});
