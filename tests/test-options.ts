//This is to creat a fixture to call PM once and attach it in the test instead of repeat it in the test detail
import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

export type TestOptions = {
    pm: PageManager;
};

export const test = base.extend<TestOptions>({
    pm: async ({ page }, use) => {
        const pm = new PageManager(page);
        await use(pm);
    },
});