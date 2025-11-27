import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  page.goto("Playwright.com")
});