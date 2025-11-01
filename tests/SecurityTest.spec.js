const { test, expect } = require("@playwright/test");

test('@Security test intercepting network requests', async ({ page }) => {

    const emailInput = page.locator('#userEmail');
    const passwordInput = page.locator('#userPassword');
    const loginButton = page.locator('[value="Login"]');
    const productTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const cartButton = page.locator('[routerlink*="cart"]');
    const checkoutButton = page.locator("text=Checkout");
    const countryInput = page.locator('[placeholder*="Select Country"]');
    const countryDropdown = page.locator('.ta-results');
    const userEmailLabel = page.locator('.user__name label');
    const orderConfirmation = page.locator('.hero-primary');
    const myOrdersButton = page.locator("[routerlink*='myorders']");
    const orderRows = page.locator("tbody tr");

    const productName = 'ZARA COAT 3';
    const userEmail = 'anshika@gmail.com';
    const password = 'Iamking@000';

    // Login
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await emailInput.fill(userEmail);
    await passwordInput.fill(password);
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=620c7bf148767f1f1215d2ca"
        }))

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p.blink_me")).toHaveText("You are not authorize to view this order");
   



});