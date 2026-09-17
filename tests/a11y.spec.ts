import { test, expect } from '@playwright/test';

test('a skip link is the first thing you reach by keyboard', async ({
  page,
}) => {
  await page.goto('/');

  const skip = page.getByRole('link', { name: 'Skip to content' });

  // sr-only clips to 1x1 rather than hiding, so it is still "visible" to
  // Playwright. Measure the box instead.
  const clipped = await skip.boundingBox();
  expect(clipped?.width ?? 0).toBeLessThanOrEqual(2);

  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute('href', '#content');

  const revealed = await skip.boundingBox();
  expect(revealed?.width ?? 0).toBeGreaterThan(50);

  await expect(page.locator('#content')).toHaveCount(1);
});

for (const route of ['/', '/blog', '/gallery']) {
  test(`${route} has a skip link target`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main#content')).toHaveCount(1);
  });
}

for (const route of ['/experience', '/projects', '/gallery']) {
  test(`${route} does not skip a heading level`, async ({ page }) => {
    await page.goto(route);

    const levels = await page
      .locator('h1, h2, h3')
      .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName[1])));

    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
}

test('the project video autoplays normally', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/projects');

  const video = page.locator('video').first();
  await video.scrollIntoViewIfNeeded();
  await expect(video).not.toHaveAttribute('controls', /.*/);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
});

test('the project video is paused and controllable under reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects');

  const video = page.locator('video').first();
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute('controls', /.*/);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
});

test('/gallery has exactly one h1', async ({ page }) => {
  // The layout's site title and the page title were both h1.
  await page.goto('/gallery');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});
