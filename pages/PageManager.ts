import { Page } from "@playwright/test";
import { LoginePage } from "./loginPage";
import { InventoryPage } from "./inventoryPage";
import { CartPage } from "./cartPage";
import { CheckOutPage } from "./CheckOutPage";
import { CheckOutOverviewPage } from "./CheckOutOverviewPage";
import { CheckOutCompletePage } from "./CheckoutCompletePage";


export class PageManager {


    private readonly page: Page;
    private readonly loginPage: LoginePage;
    private readonly inventoryPage: InventoryPage;
    private readonly cartPage: CartPage;
    private readonly checkOutPage: CheckOutPage;
    private readonly checkOutOverviewPage: CheckOutOverviewPage;
    private readonly checkOutCompletePage: CheckOutCompletePage;


    constructor(page: Page) {

        this.page = page;
        this.loginPage = new LoginePage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.checkOutOverviewPage = new CheckOutOverviewPage(this.page);
        this.checkOutCompletePage = new CheckOutCompletePage(this.page);
    }


    onLoginPage() {
        return this.loginPage;
    }

    onInventoryPage() {
        return this.inventoryPage;
    }

    onCartPage() {
        return this.cartPage;
    }

    OnCheckOutPage() {
        return this.checkOutPage;
    }

    onCheckOutOverviePage() {
        return this.checkOutOverviewPage
    }

    onCheckOutCompletePage() {
        return this.checkOutCompletePage
    }

}