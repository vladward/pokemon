import { test, expect } from '@playwright/test';

test.describe('Theme Persistence', () => {
  test('should persist theme after page reload', async ({ page }) => {
    await page.goto('/');

    const body = page.locator('body');
    await expect(body).toHaveClass(/dark-theme/);

    const switcher = page.getByRole('button', { name: /toggle theme/i });
    await switcher.click();

    await expect(body).not.toHaveClass(/dark-theme/);

    await page.reload();
    await expect(body).not.toHaveClass(/dark-theme/);
  });

  test('should not have a white flash on initial load with dark theme', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('theme', 'dark');
    });

    await page.goto('/');

    const backgroundColor = await page.evaluate(
      () => window.getComputedStyle(document.body).backgroundColor,
    );

    expect(backgroundColor).toMatch(/26,\s*34,\s*45/);
  });

  test('should sync theme across multiple tabs', async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('/');
    await page2.goto('/');

    await expect(page1.locator('body')).toHaveClass(/dark-theme/);
    await expect(page2.locator('body')).toHaveClass(/dark-theme/);

    const switcher = page1.getByRole('button', { name: /toggle theme/i });
    await switcher.click();

    await expect(page1.locator('body')).not.toHaveClass(/dark-theme/);

    await expect(page2.locator('body')).not.toHaveClass(/dark-theme/, { timeout: 10000 });

    await context.close();
  });
});
