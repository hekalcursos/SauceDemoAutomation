import { type Locator, type Page, expect } from "@playwright/test";

export class CheckOutPage {

    readonly page: Page
    readonly titleCheckout: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBTN: Locator;


    constructor(page: Page) {
        this.page = page;
        this.titleCheckout = page.locator('.title');
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.postalCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueBTN = page.getByRole('button', { name: 'Continue' });

    }

    async verifyCheckoutPage() {
        await expect(this.titleCheckout).toHaveText('Checkout: Your Information');

    }

    async fill(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);

    }


    async gotoCheckoutOverview() {

        await this.continueBTN.click();

    }

}