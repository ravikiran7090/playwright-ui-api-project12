const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('C:/PLAYWRIGHT AUTOMATION/tests/Utils/APiUtils.js');

const loginPayload = {
  userEmail: "ravikirannagure@gmail.com",
  userPassword: "Ravi@7090"
};

const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }]
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayLoad);
});

// create order is successful
test('@Api Place the order', async ({ page }) => {
  // Inject token into localStorage before page loads
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.waitForLoadState('networkidle');

  // Navigate to My Orders page
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const orders = await page.locator("tbody tr");
  for (let i = 0; i < await orders.count(); ++i) {
    const rowOrderId = await orders.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await orders.nth(i).getByRole('button', { name: 'View' }).click();
      break;
    }
  }

  // Verify order details
  await page.waitForSelector('.col-text.-main');
  const orderIdDetails = await page.locator('.col-text.-main').textContent();
  console.log("Order ID in details =>", orderIdDetails);

  expect(response.orderId.includes(orderIdDetails.trim())).toBeTruthy();
});
