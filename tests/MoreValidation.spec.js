const { test, expect } = require("@playwright/test");
//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});
test("@UI More validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("input#displayed-text")).toBeVisible();
    await page.locator("input#hide-textbox").click();
    await expect(page.locator("input#displayed-text")).toBeHidden();
    await page.locator("input#show-textbox").click();
    await expect(page.locator("input#displayed-text")).toBeVisible();
    await page.on("dialog", dialog => dialog.accept());
    await page.locator("input#confirmbtn").click();
    await page.locator("button#mousehover").hover()
    const framespage = page.frameLocator("#courses-iframe");
    await page.locator('a[href*="lifetime-access"]:visible').nth(0).click();

    const textCheck = await framespage.locator(".text h2").textContent();
    console.log(textCheck.split(' ')[1]);



})
 test.skip('visual' , async({page})=>{
 await page.goto("https://google.com/");
 //await page .goto("https://flightaware.com");
 expect(await page.screenshot()).toMatchSnapshot('landing.png');


 });

test("@UI Screenshot & visula comariosion", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("input#displayed-text")).toBeVisible();
    await page.locator("input#displayed-text").screenshot({ path: 'element.png' });
    await page.locator("input#hide-textbox").click();
    await page.screenshot({path:'screenshot.png',fullPage:true});
    await expect(page.locator("input#displayed-text")).toBeHidden();
    

});


