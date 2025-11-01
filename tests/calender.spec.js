const { test, expect } = require("@playwright/test");

test("calendar validations", async ({ page }) => {
  const monthNumber = "6";
  const date = "15";
  const year = "2027";
  const expectedlist=[monthNumber,date,year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  // Open date picker
  await page.locator("input[name='day']").click();

  // Navigate to year selection
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();

  // Select year
  await page.getByRole("button", { name: year }).click();

  // Select month (nth is 0-based, so January = 0)
  await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber - 1)).click();

  // Select date
  await page.locator(`//abbr[text()='${date}']`).click();

 //validate selected date with input date
 const inputs= page.locator("input.react-date-picker__inputGroup__input")
 for(let i=0;i<await inputs.count();++i)
 {
   const value=await inputs.nth(i).inputValue();
   expect(value).toEqual(expectedlist[i]);
 }
 
   
});
