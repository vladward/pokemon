import { test, expect } from '@playwright/test';

const POKEMON_URL = '/en/pokemon/1';

const BREAKPOINTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
] as const;

test.describe('Pokemon Details Page', () => {
  test.describe('structure', () => {
    test('renders status section with stat bars', async ({ page }) => {
      await page.goto(POKEMON_URL);
      const statusSection = page.getByRole('region', { name: /status/i });
      await expect(statusSection).toBeVisible();
      await expect(statusSection.getByText('HP')).toBeVisible();
      await expect(statusSection.getByText('Speed')).toBeVisible();
    });

    test('renders abilities section', async ({ page }) => {
      await page.goto(POKEMON_URL);
      await expect(page.getByRole('region', { name: /abilities/i })).toBeVisible();
    });

    test('renders evolution chain section', async ({ page }) => {
      await page.goto(POKEMON_URL);
      await expect(page.getByRole('region', { name: /evolution chain/i })).toBeVisible();
    });

    test('renders biological info section', async ({ page }) => {
      await page.goto(POKEMON_URL);
      await expect(page.getByRole('region', { name: /biological info/i })).toBeVisible();
      await expect(page.getByText(/height/i)).toBeVisible();
      await expect(page.getByText(/weight/i)).toBeVisible();
    });

    test('renders the dex number header', async ({ page }) => {
      await page.goto(POKEMON_URL);
      await expect(page.getByText('No. 001')).toBeVisible();
    });
  });

  test.describe('navigation', () => {
    test('NEXT button navigates to the next pokemon', async ({ page }) => {
      await page.goto(POKEMON_URL);
      const nextBtn = page.getByRole('link', { name: /next/i });
      await expect(nextBtn).toBeVisible();
      await nextBtn.click();
      await expect(page).toHaveURL(/\/pokemon\/2/);
    });

    test('PREV button is disabled or absent for the first pokemon', async ({ page }) => {
      await page.goto(POKEMON_URL);
      const prevBtn = page.getByRole('link', { name: /prev/i });
      const isVisible = await prevBtn.isVisible().catch(() => false);
      if (isVisible) {
        const href = await prevBtn.getAttribute('href');
        expect(href).toBeNull();
      }
    });
  });

  for (const bp of BREAKPOINTS) {
    test.describe(`${bp.name} (${bp.width}×${bp.height})`, () => {
      test.use({ viewport: { width: bp.width, height: bp.height } });

      test(`renders without layout errors at ${bp.name}`, async ({ page }) => {
        await page.goto(POKEMON_URL);
        await expect(page.getByRole('region', { name: /status/i })).toBeVisible();
        await expect(page.getByRole('region', { name: /abilities/i })).toBeVisible();
      });

      test(`visual snapshot at ${bp.name}`, async ({ page }) => {
        await page.goto(POKEMON_URL);
        // Wait for sprite to load so snapshot is stable
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot(`pokemon-details-${bp.name}.png`, {
          maxDiffPixelRatio: 0.03,
        });
      });
    });
  }
});
