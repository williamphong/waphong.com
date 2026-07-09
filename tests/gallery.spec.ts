import { test, expect } from '@playwright/test';

test('the lightbox is a real modal dialog', async ({ page }) => {
  await page.goto('/gallery');

  await page.getByRole('button', { name: /Hollywood Palladium/ }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // showModal() moves focus into the dialog; `<dialog open>` did not.
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();

  // The page behind must not scroll while the modal is open.
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

  // Escape only closes a dialog opened with showModal().
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('the close button dismisses the lightbox', async ({ page }) => {
  await page.goto('/gallery');

  await page.getByRole('button', { name: /Big Sur/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
});
