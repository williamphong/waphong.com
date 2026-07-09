import { test, expect } from '@playwright/test';

// title.template only decorates child segments. Pages that sit beside the
// layout declaring the template silently get a bare title, which is easy to
// miss and bad for search results. Assert the brand on every route.
const routes = [
  '/',
  '/experience',
  '/projects',
  '/gallery',
  '/blog',
  '/blog/welcome-to-my-blog',
];

for (const route of routes) {
  test(`${route} has a branded title and a description`, async ({ page }) => {
    await page.goto(route);

    await expect(page).toHaveTitle(/William Phong/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });
}
