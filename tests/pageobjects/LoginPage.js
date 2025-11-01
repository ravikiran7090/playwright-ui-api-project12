class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.locator('[value="Login"]');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');  // or your app URL
  }

  async validLogin(userEmail, password) {
    await this.emailInput.fill(userEmail);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
