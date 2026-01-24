import { test } from './test-options'; 
import { expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import * as testData from '../data/TestData.json';


test('@Regression @Smoke Full Shopping Journey HappyPath', async ({ page, pm }) => {


    //1- Login
    await pm.onLoginPage().navigate();
    await pm.onLoginPage().login(testData.username, testData.password);

    //2- Inventory: Add Item
    await pm.onInventoryPage().verifyInventoryPage();
    await pm.onInventoryPage().addItem(testData.productName);
    await pm.onInventoryPage().gotoCart();

    //3- Cart: Verify & Checkout
    await pm.onCartPage().productIsVisible(testData.productName);
    await pm.onCartPage().checkOut();

    //4- Checkout Information
    await pm.OnCheckOutPage().verifyCheckoutPage();
    await pm.OnCheckOutPage().fill(testData.firstName, testData.LastName, testData.PostalCode);
    await pm.OnCheckOutPage().gotoCheckoutOverview();

    //5-  Overview and Finish
    await pm.onCheckOutOverviePage().verifyCheckOutOverviewPage();
    await pm.onCheckOutOverviePage().gotoCheckOutCompletePage();

    //6- Complete - Verify Success
    await pm.onCheckOutCompletePage().verifySuccessMessage();

})

test('logging with locked out user', async ({page, pm})=>{


    //1- Login
    await pm.onLoginPage().navigate();
    await pm.onLoginPage().login(testData.lockedUser, testData.password);

    //2- Verify Login Error to have an especific message
    await pm.onLoginPage().verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.')

})


test('@Regression Add and remove item from cart', async ({ page , pm}) => {


    //1- Login
    await pm.onLoginPage().navigate();
    await pm.onLoginPage().login(testData.username, testData.password);

    //2- Inventory: Add Item
    await pm.onInventoryPage().verifyInventoryPage();
    await pm.onInventoryPage().addItem(testData.productName);
    await pm.onInventoryPage().gotoCart();

    //3- Cart: Verify & Checkout

    await pm.onCartPage().productIsVisible(testData.productName);
    await pm.onCartPage().removeItem(testData.productName);
    await pm.onCartPage().verifyProductIsNotVisible(testData.productName);

})


