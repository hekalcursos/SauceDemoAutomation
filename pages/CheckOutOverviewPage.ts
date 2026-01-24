import { type Locator, type Page, expect } from "@playwright/test"

export class CheckOutOverviewPage {


    readonly page: Page;
    readonly titleOverview: Locator;
    readonly finishBTN: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleOverview = page.locator('.title');
        this.finishBTN = page.getByRole('button', { name: 'Finish' });

    }


    async verifyCheckOutOverviewPage() {
        await expect(this.titleOverview).toBeVisible();
    }


    async gotoCheckOutCompletePage() {
        await this.finishBTN.click();
    }

}