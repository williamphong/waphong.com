import { test, expect, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { routes } from './routes';

// Every page fades in over 0.4s (.animate-page-fade). axe composites ancestor
// opacity into its contrast maths, so a scan that starts mid-fade reads every
// text node at ~10% alpha and reports the whole page as failing. Settle first.
const settled = (page: Page) =>
  page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== 'running')
  );

// The hand-made accessibility fixes throughout the codebase (reduced motion,
// contrast, tab order, heading levels, dialog focus) had no general guard.
// This scans every route for WCAG 2.0/2.1 A and AA rules in both themes.
//
// The AA tags include color-contrast, which is the gate for the light theme's
// darkened `-deep` tokens: Dawn's stock love/rose/gold/foam/iris/subtle all
// sit below 4.5:1 on the base background.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

for (const colorScheme of ['light', 'dark'] as const) {
  for (const route of routes) {
    test(`${route} has no axe violations in ${colorScheme} mode`, async ({
      page,
    }) => {
      // next-themes follows prefers-color-scheme when no choice is stored.
      await page.emulateMedia({ colorScheme });
      await page.goto(route);
      await expect(page.locator('html')).toHaveClass(new RegExp(colorScheme));
      await settled(page);

      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

      expect(
        results.violations.map((v) => ({
          rule: v.id,
          impact: v.impact,
          targets: v.nodes.map((n) => n.target.join(' ')),
        }))
      ).toEqual([]);
    });
  }
}

test('the open gallery lightbox has no axe violations', async ({ page }) => {
  // The dialog is only in the accessibility tree while open.
  await page.goto('/gallery');
  await page.getByRole('button', { name: /Big Sur/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await settled(page);

  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
