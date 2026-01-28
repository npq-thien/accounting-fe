import { test, expect } from '@playwright/test';

test('submit simple form', async ({ page }) => {
  await page.goto('/template/form');

  await expect(page).toHaveTitle(/Form Sample/i);
  await page.getByLabel('Your name').fill('Thien Test');
  await page.getByLabel('Email Address').fill('thien.test@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByLabel('Date of Birth').fill('2000-01-01');
  await page.getByLabel('Gender').first().click();

  // Click on the dropdown and select the option
  await page.getByLabel('Gender').first().click();
  await page.getByRole('option', { name: 'Male', exact: true }).click(); 

  await page.getByRole('button', { name: 'Submit Form' }).click();

  await expect(page.getByText('Form submitted successfully!')).toBeVisible();
});