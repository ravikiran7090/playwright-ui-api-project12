const { LoginPage } = require('C:/PLAYWRIGHT AUTOMATION/tests/pageobjects/LoginPage.js');
const { DashboardPage } = require('C:/PLAYWRIGHT AUTOMATION/tests/pageobjects/DashboardPage.js');
const { CartPage } = require('C:/PLAYWRIGHT AUTOMATION/tests/pageobjects/CartPage.js');
const { OrderReviewPage } = require('./OrderReviewPage.js'); 
const { OdersHistoryPage } = require('./OderHistoryPage.js');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.orderReviewPage = new OrderReviewPage(page); 
        this.orderHistoryPage = new OdersHistoryPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrderReviewPage() {
        return this.orderReviewPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
}

module.exports = { POManager };
