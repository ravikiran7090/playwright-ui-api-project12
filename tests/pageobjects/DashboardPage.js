class DashboardPage {
    constructor(page) {
        this.page = page;
        this.productTitles = page.locator('.card-body b');
        this.products = page.locator('.card-body');
        this.cartButton = page.locator('[routerlink*="cart"]');
        this.myOrdersButton = page.locator("[routerlink*='myorders']");
    }

    async searchProduct(productName) {
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            const title = await this.products.nth(i).locator("b").textContent();
            if (title.trim() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
    async navigateToOrders() {
        await this.myOrdersButton.first().click();
    }

    async navigateToCart() {
        await this.cartButton.click();
    }
}

module.exports = { DashboardPage };
