const base=require('@playwright/test');
exports.customtest=base.test.extend(
    {
   testDataForOrder:{
    productName: "ZARA COAT 3",
    userEmail: "anshika@gmail.com",
    password: "Iamking@000"
   }
    })