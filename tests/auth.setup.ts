import { test as setup } from './test-options'; 
import { expect } from '@playwright/test';

export const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ pm, page }) => {
  await pm.onLoginPage().navigate();
  await pm.onLoginPage().login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});

