const { test, expect } = require('@playwright/test')

test('Browser context Playwright test', async ({ browser }) => {
    //chrome -plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route("**/*.{png,jpg,jpeg}", route => route.abort());
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    page.on('request', request =>console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //type.fill to enter the data in to field
    await username.fill("learning");
    await password.fill("learning");
    await signIn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect username/password.');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);



});
test('UI Controls', async ({ page }) => {
    //chrome -plugins/cookies
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    const dropdown = page.locator('select.form-control')
    const checkbox = page.locator(".radiotextsty");
    const okbtn = page.locator('#okayBtn');
    const termsandcondition = page.locator('#terms');
    const documentlink = page.locator("[href*=documents-request]");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropdown.selectOption("consult");
    //await page.pause();
    await checkbox.last().click();
    console.log(await checkbox.last().isChecked());
    await expect(checkbox.last()).toBeChecked();
    await okbtn.click();
    await termsandcondition.click();
    await expect(termsandcondition).toBeChecked();
    await termsandcondition.uncheck();
    expect(await termsandcondition.isChecked()).toBeFalsy();
    await expect(documentlink).toHaveAttribute("class", "blinkingText");


});
test('Child Window handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const documentlink = page.locator('[href*="documents-request"]');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentlink.click(),
    ])
    const text = await newPage.locator(".red").first().textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    //await page.pause();
    await username.fill(domain);
    console.log(await username.inputValue());

    //console.log(domain);


});

