import { test, expect } from '@playwright/test';

test.describe('Header Adaptive Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('full cycle: open/close via burger and overlay', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    const burger = page.getByLabel('Toggle menu');
    const drawer = page.locator('[data-testid="mobile-drawer"]');
    const overlay = page.locator('[data-testid="overlay"]');

    await burger.click();
    await expect(drawer).toBeInViewport();

    await burger.click();
    await expect(drawer).not.toBeInViewport();

    await burger.click();
    await overlay.waitFor({ state: 'visible' });
    await overlay.dispatchEvent('click');

    await expect(drawer).not.toBeInViewport();
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });

  test('auto-closing when clicking on a link', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    await page.getByLabel('Toggle menu').click();

    const drawer = page.locator('[data-testid="mobile-drawer"]');
    await drawer.getByRole('link', { name: 'Pokemon' }).click();

    await expect(drawer).not.toBeInViewport();
    await expect(page).toHaveURL(/\/pokemon/);
  });

  test('adaptability: hiding a burger when resizing to a desktop', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    await expect(page.getByLabel('Toggle menu')).toBeVisible();

    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByLabel('Toggle menu')).not.toBeVisible();
  });
});
