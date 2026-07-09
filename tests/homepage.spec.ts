import { test, expect } from '@playwright/test';

test('has the site title and exactly one h1', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/William Phong/);

  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText(/william phong/i);
});

test('in-page nav exposes each section link', async ({ page }) => {
  await page.goto('/');
  // Scoped to the nav: a bare `text=about` also matches the "About Me"
  // heading, which is a strict-mode violation rather than a passing test.
  const nav = page.getByRole('navigation', { name: 'In-page jump links' });

  for (const name of ['about', 'experience', 'projects', 'education']) {
    await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
  }
});

test('scroll spy activates the section in view, including tall ones', async ({
  page,
}) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'In-page jump links' });

  // "about" is five paragraphs — taller than 1.5x the viewport, so a ratio
  // threshold could never mark it active. This is the regression test.
  for (const id of ['about', 'experience', 'projects']) {
    await page.evaluate(
      (section) =>
        document.getElementById(section)?.scrollIntoView({ block: 'start' }),
      id
    );
    await expect(nav.locator('a.active .nav-text')).toHaveText(id);
    await expect(nav.locator('a.active')).toHaveCount(1);
  }
});

test('tech tag pills are not in the tab order', async ({ page }) => {
  await page.goto('/projects');

  const pills = page.locator('span', { hasText: /^Unity$/ });
  await expect(pills.first()).toBeVisible();

  // They used to be <button pointer-events-none>, which keeps them focusable.
  await expect(page.locator('button', { hasText: /^Unity$/ })).toHaveCount(0);
});

test('projects without a URL render as text, not an empty link', async ({
  page,
}) => {
  await page.goto('/projects');
  await expect(page.locator('a[href=""]')).toHaveCount(0);
  await expect(page.getByText('Discord Bot').first()).toBeVisible();
});

test('the blog is reachable from the portfolio', async ({ page }) => {
  await page.goto('/');
  const blogLink = page.getByRole('link', { name: /visit my blog/i });
  await expect(blogLink).toBeVisible();
});

test('the theme toggle has a visible focus indicator', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Theme toggle' });
  await toggle.focus();

  const outlineWidth = await toggle.evaluate(
    (el) => getComputedStyle(el).outlineWidth
  );
  expect(outlineWidth).not.toBe('0px');
});
