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

test.describe('on a phone', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('blog pages use the responsive gutter', async ({ page }) => {
    // px-16 at every breakpoint left ~247px for prose on a 375px screen.
    await page.goto('/blog/welcome-to-my-blog');
    await expect(page.locator('article section').first()).toHaveCSS(
      'padding-left',
      '24px'
    );
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
