import { test, expect } from "@playwright/test"


test('Full shopping Journey', async ({ page }) => {
    
    
    
    await page.goto('https://www.saucedemo.com/');

    const userName = page.getByPlaceholder('Username');
    await userName.fill('standard_user');

    const password = page.getByPlaceholder('Password');
    await password.fill('secret_sauce');

    const loginBtn = page.getByRole('button', { name: 'Login' });
    await loginBtn.click();
    await expect(page).toHaveTitle('Swag Labs');


    const productImageLast = page.locator('.inventory_item_img').last();
    await expect(productImageLast).toBeVisible();

    //Porduct list - Know how many product in this page and print them in console
    const allProducts = page.locator('.inventory_item_description');
    const count = await allProducts.count();
    console.log(count);


    const desiredItemToAdd = 'Sauce Labs Onesie';

    await page.locator('.inventory_item').filter({ hasText: desiredItemToAdd }).getByRole('button', { name: 'Add to cart' }).click();
    const shoppingCart = page.locator('.shopping_cart_badge');
    console.log(await shoppingCart.innerText())
    await expect(shoppingCart).toHaveText('1');
    await shoppingCart.click();


    const addedItem = page.locator('.inventory_item_name');
    await expect(addedItem).toHaveText(desiredItemToAdd);

    const checkOut = page.getByRole('button', { name: 'Checkout' });
    await checkOut.click();

    const titleCheckout = page.locator('.title');
    await expect(titleCheckout).toHaveText('Checkout: Your Information');


    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const postalCode = page.getByPlaceholder('Zip/Postal Code');

    await firstName.fill('Ahmed');
    await lastName.fill('Hekal');
    await postalCode.fill('123456');

    const continueButton = page.getByRole('button', { name: 'Continue' });
    await continueButton.click();


    const titleOverview = page.locator('.title');
    await expect(titleOverview).toBeVisible();

    const finishBtn = page.getByRole('button', { name: 'Finish' });
    await finishBtn.click();

    const successMsg = page.getByRole('heading', { name: 'Thank you for your order!' });
    await expect(successMsg).toBeVisible();
})



test('logging with locked out user', async ({ page }) => {


    // 1. Go to the SauceDemo login page
    await page.goto('https://www.saucedemo.com/');


    // 2. Fill the Username field with 'locked_out_user'
    const userName = page.getByPlaceholder('Username');
    await userName.fill('locked_out_user');

    // 3. Fill the Password field with 'secret_sauce'
    const password = page.getByPlaceholder('Password');
    await password.fill('secret_sauce');

    // 4. Click the "Login" button
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await loginBtn.click();

    // 5. Create a locator for the error message container (hint: use data-test="error")
    const logingErrorMessage = page.locator('[data-test="error"]');

    // 6. Assert that the error message is visible
    await expect(logingErrorMessage).toBeVisible();

    // 7. Assert that the error text contains: "Epic sadface: Sorry, this user has been locked out."
    await expect(logingErrorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.')

})


// Test Case: Verify item can be added and then removed from the cart
test('add and remove item from card', async ({ page }) => {

    // --- Pre-condition: Login ---
    // 1. Go to SauceDemo, enter 'standard_user' and 'secret_sauce', and click Login
    await page.goto('https://www.saucedemo.com/');
    const userName = page.getByPlaceholder('Username');
    await userName.fill('standard_user');
    const password = page.getByPlaceholder('Password');
    await password.fill('secret_sauce');
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await loginBtn.click();
    await expect(page).toHaveTitle('Swag Labs');
    const productImageLast = page.locator('.inventory_item_img').last();
    await expect(productImageLast).toBeVisible();

    // 2. Find the product "Sauce Labs Backpack" and click its "Add to cart" button
    const desiredItemToAdd = 'Sauce Labs Backpack';
    await page.locator('.inventory_item').filter({ hasText: desiredItemToAdd }).getByRole('button', { name: 'Add to cart' }).click();

    // 3. Click the Shopping Cart link to go to the cart page
    const shoppingCart = page.locator('.shopping_cart_badge');
    console.log(await shoppingCart.innerText())
    await expect(shoppingCart).toHaveText('1');
    await shoppingCart.click();


    // 4. Verify that the "Sauce Labs Backpack" is visible in the cart list
    const addedItem = page.locator('.inventory_item_name');
    await expect(addedItem).toHaveText(desiredItemToAdd);


    // 5. Click the "Remove" button associated with that item
    await page.locator('.cart_item_label').filter({ hasText: desiredItemToAdd }).getByRole('button', { name: 'Remove' }).click();

    // 6. Assert that the "Sauce Labs Backpack" is now HIDDEN (or not visible)
    await expect(addedItem.filter({ hasText: 'Sauce Labs Backpack' })).not.toBeVisible();


})