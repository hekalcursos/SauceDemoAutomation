import { test } from './test-options';
import { expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {

    test('Inventory Page Visual Check', async ({ pm, page }) => {

        // 1. Navigate
        await pm.onInventoryPage().navigate();


        //Mask any element with purple box
        expect(await page.screenshot({ path: 'InventoryScreenShotMasked.png', fullPage: true, mask: [pm.onInventoryPage().productImageLast], })).toMatchSnapshot('InventoryScreenShot.png'); 
        
        //Tolerance with threshold
        //expect(await page.screenshot()).toMatchSnapshot({ name: 'Landing.png',   threshold: 0.3});  
            });
    });