import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveTitle(/login/i);

  // Input username and password
  await page.getByLabel('Tài khoản').fill('admin');
  await page.getByLabel('Mật khẩu').fill('admin');

  await page.getByTitle('Đăng nhập').click();

  await expect(page.getByTitle('Đăng nhập')).toBeVisible();

  // Expects navigation to the home page
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle(/home/i);

  // Check if logged in successfully
  await expect(page.getByText('Logout (admin)')).toBeVisible();
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveTitle(/login/i);

  // Input username and password
  await page.getByLabel('Tài khoản').fill('admin');
  await page.getByLabel('Mật khẩu').fill('ahihi');

  await page.getByTitle('Đăng nhập').click();

  await expect(page.getByText('Tài khoản hoặc mật khẩu không đúng')).toBeVisible();
});