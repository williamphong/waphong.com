import { test, expect } from '@playwright/test';

// With three root layouts and no app/layout.tsx, Next used to fall back to
// its unstyled built-in 404 for every unmatched URL — including blog slugs
// rejected by dynamicParams = false.
for (const route of ['/this-route-does-not-exist', '/blog/does-not-exist']) {
  test(`${route} returns the branded 404 page`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);

    await expect(
      page.getByRole('heading', { level: 1, name: 'Page not found' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /portfolio/i })
    ).toHaveAttribute('href', '/');
    await expect(page.locator('.next-error-h1')).toHaveCount(0);
    await expect(page).toHaveTitle(/William Phong/);
  });
}
