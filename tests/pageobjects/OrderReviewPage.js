const { expect } = require('@playwright/test');

class OrderReviewPage {
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
        this.countryInput = page.locator('[placeholder*="Select Country"]');
        this.countryDropdown = page.locator('.ta-results');
        this.userEmailLabel = page.locator('.user__name label');
        this.placeOrderBtn = page.locator(".action__submit");
        this.orderConfirmation = page.locator('.hero-primary');
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");


        // Define payment details locators explicitly
        this.cvvInput = page.locator('input[type="text"]').nth(1);   // Replace with better selector if available
        this.nameInput = page.locator('input[type="text"]').nth(2);  // Replace with better selector if available
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click();
    }

    async searchCountryAndSelect(countryCode,countryName) {
        // Enter country
        await this.countryInput.pressSequentially(countryCode, { delay: 150 });
        await this.countryDropdown.waitFor();
        const optionsCount = await this.countryDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.countryDropdown.locator("button").nth(i).textContent();
            if ((text.trim()) === countryName) {
                await this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }
        // Fill order details
        await this.cvvInput.fill('35654');
        await this.nameInput.fill('ravikiran');

        // Place order

    }
    async VerifyEmailId(userEmail) {
        await expect(this.userEmailLabel).toHaveText(userEmail);
    }
    async SubmitAndGetorderId() {
        await this.placeOrderBtn.click();
        await expect(this.orderConfirmation).toHaveText(" Thankyou for the order. ");
         return await this.orderId.textContent();
     
    }
}

module.exports = { OrderReviewPage };
