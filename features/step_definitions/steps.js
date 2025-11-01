const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // increase timeout to 60 seconds

const { POManager } = require('C:/PLAYWRIGHT AUTOMATION/tests/pageobjects/POManager.js');
const { expect } = require('@playwright/test');
const playwright = require('playwright');

// ---------- LOGIN ----------
Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {


  const loginPage = this.poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(username, password);
});

// ---------- ADD TO CART ----------
When('Add {string} to the cart', async function (productName) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProduct(productName);
  await dashboardPage.navigateToCart();
});

// ---------- VERIFY IN CART ----------
Then('Verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

// ---------- PLACE ORDER ----------
When('Enter valid details and place the order', async function () {
  const orderReviewPage = this.poManager.getOrderReviewPage();
  await orderReviewPage.searchCountryAndSelect("Ind", "India");
  await orderReviewPage.VerifyEmailId(this.username); // use stored username
  this.orderId = await orderReviewPage.SubmitAndGetorderId(); // store orderId for next step
  console.log("Order ID:", this.orderId);
});

// ---------- VERIFY ORDER HISTORY ----------
Then('Verify the order is present in the order history', async function () {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.navigateToOrders();

  const orderHistoryPage = this.poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(this.orderId);
  const orderDetailsId = await orderHistoryPage.getOrderId();

  console.log("Order Details ID:", orderDetailsId);
  expect(this.orderId.includes(orderDetailsId)).toBeTruthy();

  await this.browser.close();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  const username1 = this.page.locator('#username');
  const password1 = this.page.locator('#password');
  const signIn = this.page.locator('#signInBtn');
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await username1.fill(username);
  await password1.fill(password);
  await signIn.click();
});


Then('Varify Error message is dispalyed.', async function () {
  console.log(await this.page.locator('[style*="block"]').textContent());
  await expect(this.page.locator('[style*="block"]')).toContainText('Incorrect username/password.');
});