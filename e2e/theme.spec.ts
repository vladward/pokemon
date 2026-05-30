import { test, expect } from '@playwright/test';

test.describe('Theme Persistence', () => {
  test('should persist theme after page reload', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('theme', 'dark');
    });
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/\bdark\b/);

    const switcher = page.getByRole('button', { name: /toggle theme/i });
    await switcher.click();

    await expect(html).not.toHaveClass(/\bdark\b/);

    await page.reload();
    await expect(html).not.toHaveClass(/\bdark\b/);
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
    await context.addInitScript(() => {
      window.localStorage.setItem('theme', 'dark');
    });
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('/');
    await page2.goto('/');

    await expect(page1.locator('html')).toHaveClass(/\bdark\b/);
    await expect(page2.locator('html')).toHaveClass(/\bdark\b/);

    const switcher = page1.getByRole('button', { name: /toggle theme/i });
    await switcher.click();

    await expect(page1.locator('html')).not.toHaveClass(/\bdark\b/);

    await expect(page2.locator('html')).not.toHaveClass(/\bdark\b/, { timeout: 10000 });

    await context.close();
  });
});
