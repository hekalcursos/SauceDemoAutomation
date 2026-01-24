import { type Locator, type Page, expect } from "@playwright/test";


export class CheckOutCompletePage {

    readonly page: Page;
    readonly successMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMsg = page.getByRole('heading', { name: 'Thank you for your order!' });

    }


    async verifySuccessMessage() {

        await expect(this.successMsg).toBeVisible();
    }

}
