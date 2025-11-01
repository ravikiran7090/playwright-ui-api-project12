const { Before, setDefaultTimeout, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // increase timeout to 60 seconds

const { POManager } = require('C:/PLAYWRIGHT AUTOMATION/tests/pageobjects/POManager.js');
const playwright = require('playwright');

Before({ tags: '@regression or @validation' }, async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep(async function () {

});
AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot12.png' });

    }


});
After(async function () {
    await this.browser.close();
    console.log("Browser closed");
});
