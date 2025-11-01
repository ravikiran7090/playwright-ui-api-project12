
commands to excecute test cases
npx playwright test tests/clientAppPo.spec.js --config playwright.config1.js --project=safari

npx playwright test --grep "@UI"

npx playwright test --reporter=line,allure-playwright

npx allure generate ./allure-results --clean

npx allure open ./allure-report

 npx cucumber-js  features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html

 npx cucumber-js  --tags "@regression" --retry 1 --exit --format html:cucumber-report.html   


