import { test, expect } from '@playwright/test';
import { routes } from './routes';

// Social, project and credit links are typed by hand in several files. A
// typo'd scheme or a missing rel=noopener on a new-tab link ships silently.
test('every external link is https, well-formed, and safe in a new tab', async ({
  page,
}) => {
  const seen = new Set<string>();

  for (const route of routes) {
    await page.goto(route);
    const links = await page.locator('a[href^="http"]').evaluateAll((nodes) =>
      nodes.map((n) => {
        const a = n as HTMLAnchorElement;
        return { href: a.href, target: a.target, rel: a.rel };
      })
    );

    for (const { href, target, rel } of links) {
      seen.add(href);
      const url = new URL(href);
      expect(url.protocol, `${route}: ${href}`).toBe('https:');
      if (target === '_blank') {
        expect(rel, `${route}: ${href} opens a new tab`).toMatch(/noopener/);
      }
    }
  }

  // Sanity: the site has well over ten distinct external links.
  expect(seen.size).toBeGreaterThan(10);
});

test('no link has an empty href', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('a[href=""]')).toHaveCount(0);
  }
});
