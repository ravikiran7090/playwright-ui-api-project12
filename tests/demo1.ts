import { expect, type Locator, type Page } from '@playwright/test';
let message1:string="hello";
message1="bye";
console.log(message1);
let age1:number=20;
console.log(age1);
let isactive:boolean=true;
let number1:number[]=[1,2,3,4,5];
let data:any="this could be anything";
data=42;

function add1(a:number,b:number):number
{
    return a+b;
}
add1(5,10);
let user1:{name:string,age:number,location:string}={name:"Ravi",age:25,location:"INDIA"};
console.log(user1.name);
user1.location="banglore";


class CartPage {
    page:Page;
    cartproducts:Locator;
    checkout:Locator;
    constructor(page:Page) {
        this.page = page;
        this.cartproducts = page.locator("div li").first();
        this.checkout = page.locator("text=Checkout");

    }
    async VerifyProductIsDisplayed(productName: string) {
        await this.cartproducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    async Checkout() {
        await this.checkout.click();
    }
    getProductLocator(productName: string): Locator {
        return this.page.locator("h3:has-text('" + productName + "')");
    }


}
module.exports = { CartPage };