const{ test, expect , request}=require("@playwright/test");
const { ApiUtils } = require('C:/PLAYWRIGHT AUTOMATION/tests/Utils/APiUtils.js');
const loginPayload = {
  userEmail: "ravikirannagure@gmail.com",
  userPassword: "Ravi@7090"
};

const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }]
};
const fackepayLoadOrders={data:[],message:"No Orders"};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayLoad);
});

// create order is successful
test('@API Place the order', async ({ page }) => {
  // Inject token into localStorage before page loads
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.waitForLoadState('networkidle');

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    async route => {
      const response = await page.request.fetch(route.request());
      let body = fackepayLoadOrders;
      route.fulfill({
        response,
        body: JSON.stringify(body),
      });
      //intrecepting response-Api response ->{ playwright fake response} >>browser -> render data on front end
    } );

  // Navigate to My Orders page
  await page.locator("button[routerlink*='myorders']").click();
 // await page.pause();
  //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());
  expect(await page.locator(".mt-4").textContent()).toContain("You have No Orders"); 

  
  });

