import { type Locator, type Page, expect } from "@playwright/test";

export class CartPage {


    readonly page: Page;
    readonly addedItem: Locator;
    readonly checkOutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addedItem = page.locator('.inventory_item_name');
        this.checkOutBtn = page.getByRole('button', { name: 'Checkout' });

    }

    async productIsVisible(productName: string) {
        const specificItem = this.addedItem.filter({ hasText: productName });
        await expect(specificItem).toBeVisible()

    }

    async checkOut() {
        await this.checkOutBtn.click()

    }


    async removeItem(productName: string) {
        const specificRemoveBTN = this.page.locator('.cart_item_label').filter({ hasText: productName }).getByRole('button', { name: 'Remove' })
        await specificRemoveBTN.click();
    }


    async verifyProductIsNotVisible(productName: string) {
        await expect(this.addedItem.filter({ hasText: productName })).not.toBeVisible();

    }



}