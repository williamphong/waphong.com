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

  test(`${route} declares a canonical URL`, async ({ page }) => {
    await page.goto(route);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute(
      'href',
      new RegExp(`^https://waphong\\.com${route === '/' ? '/?' : route}$`)
    );
  });
}

test('every route advertises an og:image', async ({ page }) => {
  for (const route of ['/', '/blog', '/gallery']) {
    await page.goto(route);
    const image = page.locator('meta[property="og:image"]');
    await expect(image).toHaveAttribute('content', /^https:\/\/waphong\.com\//);
  }
});

test('a blog post points og:url at itself, not the index', async ({ page }) => {
  await page.goto('/blog/welcome-to-my-blog');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    /\/blog\/welcome-to-my-blog$/
  );
});
