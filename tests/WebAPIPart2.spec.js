const { test, expect } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill("ravikirannagure@gmail.com");
  await page.locator("#userPassword").fill("Ravi@7090");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");

  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Client App Login Test", async () => {
  const page = await webContext.newPage();

  // Locators
  const products = page.locator(".card-body");
  const cartButton = page.locator('[routerlink*="cart"]');
  const checkoutButton = page.locator("text=Checkout");
  const countryInput = page.locator('[placeholder*="Select Country"]');
  const countryDropdown = page.locator(".ta-results");
  const userEmailLabel = page.locator(".user__name label");
  const orderConfirmation = page.locator(".hero-primary");
  const orderRows = page.locator("tbody tr");

  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.waitForLoadState("networkidle");
  await products.first().waitFor();

  // Add product to cart
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  // Go to cart and verify product
  await cartButton.click();
  await page.locator("div li").first().waitFor();
  await expect(page.locator(`h3:has-text('${productName}')`)).toBeVisible();

  // Checkout
  await checkoutButton.click();
  await countryInput.pressSequentially("Ind", { delay: 150 });
  await countryDropdown.waitFor();

  const optionsCount = await countryDropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    if ((await countryDropdown.locator("button").nth(i).textContent()) === " India") {
      await countryDropdown.locator("button").nth(i).click();
      break;
    }
  }

  // Verify user email
  await expect(userEmailLabel).toHaveText("ravikirannagure@gmail.com");

  // Fill order details
  await page.locator('input[type="text"]').nth(1).fill("35654");
  await page.locator('input[type="text"]').nth(2).fill("ravikiran");
  await page.locator(".action__submit").click();

  // Verify order confirmation
  await expect(orderConfirmation).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log("Order ID:", orderId);

  // Go to My Orders
  await page.locator('[routerlink="/dashboard/myorders"]').first().click();
  await page.waitForLoadState("networkidle");
  await page.locator("tbody").waitFor({ state: "visible" });

  // Find and view the order
  const totalOrders = await orderRows.count();
  for (let i = 0; i < totalOrders; i++) {
    const rowOrderId = await orderRows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await Promise.all([
        orderRows.nth(i).locator(".btn-primary").click(),
        page.waitForURL("**/dashboard/order-details/**"),
      ]);
      break;
    }
  }

  // Verify order details
  const orderIdDetails = await page.locator(".col-text").first().textContent();
  console.log("Order Details ID:", orderIdDetails);
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
