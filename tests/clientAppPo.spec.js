const { test, expect } = require('@playwright/test');
const { POManager } = require('C:/PLAYWRIGHT AUTOMATION/tests/pageobjects/POManager.js');
//Json->String-> js Object
const dataset= JSON.parse(JSON.stringify(require('C:/PLAYWRIGHT AUTOMATION/tests/Utils/placeorderTestData.json')));
const { customtest } = require('C:/PLAYWRIGHT AUTOMATION/tests/Utils/test-base.js');

for(const data of dataset){
test(`Client App Login ${data.productName}`, async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);

// -------------------- LOGIN --------------------
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(data.userEmail, data.password);

  // -------------------- DASHBOARD --------------------
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProduct(data.productName);

  //-----------------NAVIGATE TO CART-------
  await dashboardPage.navigateToCart();

  // Verify product is added to cart
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);



  // -------------------- CHECKOUT --------------------
   await cartPage.Checkout();
  // simpler & more stable than pressSequentially
  const orderReviewPage = poManager.getOrderReviewPage();
  await orderReviewPage.searchCountryAndSelect("Ind", "India");
  await orderReviewPage.VerifyEmailId(data.userEmail);
  

  // Verify order confirmation
  const orderId = await orderReviewPage.SubmitAndGetorderId();
  console.log("Order ID:", orderId);

  // -------------------- MY ORDERS --------------------
  await dashboardPage.navigateToOrders();
  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  const orderDetailsId = await orderHistoryPage.getOrderId();
  console.log("Order Details ID:", orderDetailsId);
  expect(orderId.includes(orderDetailsId)).toBeTruthy();  
});
}
customtest('Client App Login ', async ({ browser,testDataForOrder }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);

// -------------------- LOGIN --------------------
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(testDataForOrder.userEmail, testDataForOrder.password);

  // -------------------- DASHBOARD --------------------
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProduct(testDataForOrder.productName);

  //-----------------NAVIGATE TO CART-------
  await dashboardPage.navigateToCart();

  // Verify product is added to cart
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
})
