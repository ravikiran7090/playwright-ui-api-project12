class OdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.orderTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator('.col-text');
    }
    async searchOrderAndSelect(orderId) {
        await this.page.waitForLoadState('networkidle');
        await this.orderTable.waitFor({ state: "visible" });

        // Find and view the order

        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = (await this.rows.nth(i).locator("th").textContent()).trim();
            if (orderId.includes(rowOrderId)) {

                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId() {
        return (await this.orderIdDetails.first().textContent()).trim();
    }
}

module.exports = { OdersHistoryPage };