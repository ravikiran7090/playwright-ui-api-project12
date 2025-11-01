class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  // Login
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload }
    );

    const responseJson = await loginResponse.json();
    let token = responseJson.token;
    console.log("Token =>", token);
    return token;
  }

  // Create order
  async createOrder(orderPayLoad) {
    let response = {};
    response.token = await this.getToken();

    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,  
          "Content-Type": "application/json",
        },
      }
    );

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);

    if (orderResponseJson?.orders?.length > 0) {
      response.orderId = orderResponseJson.orders[0];
    } else {
      throw new Error("Order creation failed: No orders found in response.");
    }

    return response;
  }
}

module.exports = { ApiUtils };
