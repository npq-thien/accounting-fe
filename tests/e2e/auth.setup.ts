import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Tài khoản').fill('admin');
  await page.getByLabel('Mật khẩu').fill('admin');
  await page.getByTitle('Đăng nhập').click();

  // Wait until the home page is loaded
  await expect(page).toHaveURL('/');

  // Save the session
  await page.context().storageState({ path: authFile });
});