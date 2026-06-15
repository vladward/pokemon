import { test, expect } from '@playwright/test';

test.describe('ToTopButton E2E', () => {
  test('button should appear smoothly and scroll up the page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // ThemeSwitcher renders a <button> only after React hydration (useEffect sets mounted=true)
    await page.waitForSelector('button[aria-label="Toggle theme"]');

    const topBtn = page.locator('button[aria-label="Scroll to top"]');

    await expect(topBtn).not.toBeVisible();

    await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'instant' }));
    await page.waitForFunction(() => window.scrollY >= 925);
    await expect(topBtn).toBeVisible();
    await expect(topBtn).toHaveCSS('opacity', '1');

    await topBtn.click();

    await page.waitForFunction(() => window.scrollY === 0);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });
});
