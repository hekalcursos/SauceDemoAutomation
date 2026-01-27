import { type Locator, type Page, expect } from "@playwright/test";

export class InventoryPage {

    readonly page: Page;
    readonly productImageLast: Locator;
    readonly allProducts: Locator;
    readonly shoppingCart: Locator;

    count: number = 0;

    constructor(page: Page) {

        this.page = page;
        this.productImageLast = page.locator('.inventory_item_img').last();
        this.allProducts = page.locator('.inventory_item_description');
        this.shoppingCart = page.locator('.shopping_cart_badge');
        //this.desiredItemToAdd = 'Sauce Labs Onesie';
        //this.addToCart = page.locator('.inventory_item').filter({ hasText: this.desiredItemToAdd }).getByRole('button', { name: 'Add to cart' })
    }

    
    async navigate() {
        await this.page.goto('inventory.html');
    }


    async verifyInventoryPage() {
        await expect(this.page).toHaveTitle('Swag Labs');
        await expect(this.productImageLast).toBeVisible();
        this.count = await this.allProducts.count();
        console.log("Product Count:", this.count);

    }



    async addItem(productName: string) {

        const specificProduct = this.page.locator('.inventory_item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' });
        await specificProduct.click();

    }

    async gotoCart() {
        console.log("cart text: ", await this.shoppingCart.innerText())
        await expect(this.shoppingCart).toHaveText('1');
        await this.shoppingCart.click();

    }
}


