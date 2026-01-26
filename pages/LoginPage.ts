// 1. Import the types we need (Page and Locator)
import { type Locator, type Page, expect } from "@playwright/test";

// 2. Add 'export' so other files can import this class
export class LoginPage {

    // 3. THE INVENTORY LIST (Required in TypeScript)
    // We must declare these variables and their types here first.
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly logingErrorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.userName = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.logingErrorMessage = page.locator('[data-test="error"]');

    }

    async navigate() {
        await this.page.goto('/');
    }

    // 4. USE THE ARGUMENTS
    // We add ': string' to tell TS these inputs are text.
    // We use the variable 'user' inside .fill() instead of hardcoding 'standard_user'.

    async login(user: string, pass: string) {
        await this.userName.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }

    async verifyErrorMessage(expectedError: string) {
        await expect(this.logingErrorMessage).toBeVisible();
        await expect(this.logingErrorMessage).toContainText(expectedError)

    }


}

