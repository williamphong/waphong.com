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
  const toggle = page.getByRole('button', {
    name: /switch to (light|dark) theme/i,
  });
  await toggle.focus();

  const outlineWidth = await toggle.evaluate(
    (el) => getComputedStyle(el).outlineWidth
  );
  expect(outlineWidth).not.toBe('0px');
});

test('the home page does not fetch the project video or the resume on load', async ({
  page,
}) => {
  // Both used to download on every visit: play() ran on mount, and next/link
  // prefetched the PDF as though it were a route.
  const heavy: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.endsWith('.webm') || url.includes('/files/resume.pdf')) {
      heavy.push(url);
    }
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(heavy).toEqual([]);
});

test('the project video starts once it is scrolled into view', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const video = page.locator('video').first();
  await video.scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
});

test('the resume link is a direct link to a PDF that exists', async ({
  page,
}) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: /resume/i });
  await expect(link).toHaveAttribute('href', '/files/resume.pdf');
  await expect(link).toHaveAttribute('target', '_blank');

  const res = await page.request.get('/files/resume.pdf');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/pdf');
});

test('the video controls are clickable under reduced motion at desktop width', async ({
  page,
}) => {
  // The whole-card link overlay used to sit above the video cell, so the
  // controls shown for reduced-motion users could not be clicked.
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects');
  const video = page.locator('video').first();
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute('controls', /.*/);
  const box = await video.boundingBox();
  if (!box) throw new Error('video has no bounding box');
  const hit = await page.evaluate(
    ([x, y]) => document.elementFromPoint(x, y)?.tagName,
    [box.x + box.width / 2, box.y + box.height / 2]
  );
  expect(hit).toBe('VIDEO');
});

test.describe('at the lg breakpoint', () => {
  test.use({ viewport: { width: 1024, height: 800 } });

  test('the site title does not overlap the content column', async ({
    page,
  }) => {
    // At 7xl "William Phong" (whitespace-nowrap) spilled 19px into <main>.
    await page.goto('/');
    const title = await page.locator('h1 a').boundingBox();
    const main = await page.locator('main#content').boundingBox();
    if (!title || !main) throw new Error('missing bounding box');
    expect(title.x + title.width).toBeLessThanOrEqual(main.x);
  });
});

for (const route of ['/experience', '/projects']) {
  test(`${route}: jump links lead to a real section`, async ({ page }) => {
    // The nav is shared by the layout, but only the home page has all four
    // section ids; a bare "#about" on a sub-page scrolled nowhere.
    await page.goto(route);
    const nav = page.getByRole('navigation', { name: 'In-page jump links' });
    await nav.getByRole('link', { name: 'about', exact: true }).click();
    await expect(page).toHaveURL(/\/#about$/);
    await expect(page.locator('#about')).toBeInViewport();
  });
}

test('hovering one project card dims its siblings on desktop', async ({
  page,
}) => {
  // The cards carried lg:group-hover/list:opacity-50 with no group/list
  // parent, so the effect never fired.
  await page.goto('/projects');
  const cards = page.locator('ol.group\\/list > li > div');
  await expect(cards.first()).toBeVisible();
  await cards.first().hover();
  await expect(cards.nth(1)).toHaveCSS('opacity', '0.5');
  await expect(cards.first()).toHaveCSS('opacity', '1');
});

test('the theme toggle switches the theme and announces the next one', async ({
  page,
}) => {
  // The button used to be named "Theme toggle" in both states.
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Switch to dark theme' });
  await expect(toggle).toBeEnabled();
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(
    page.getByRole('button', { name: 'Switch to light theme' })
  ).toBeVisible();
});
