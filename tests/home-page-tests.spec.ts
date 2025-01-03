import { test, Page } from '@playwright/test';
import * as loginData from '../test-data/login.json';
import { HomePageScenario } from '../services/scenarios/home-page-scenarios';
import { LoginPageScenario } from '../services/scenarios/login-page-scenarios';
import { BasketPageScenario } from '../services/scenarios/basket-page-scenarios';

test.describe('Home page tests @home-page-tests', () => {
    let homePageScenarios: HomePageScenario,
        loginPageScenarios: LoginPageScenario,
        BasketPageScenarios: BasketPageScenario;

    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePageScenarios = new HomePageScenario(page);
        loginPageScenarios = new LoginPageScenario(page);
        BasketPageScenarios = new BasketPageScenario(page);

        await page.goto('https://www.saucedemo.com/v1/index.html', {waitUntil: 'domcontentloaded'});
        await page.setViewportSize({ width: 1920, height: 850 });
        await loginPageScenarios.submitLoginCredentials(
            loginData.username.standardUser,
            loginData.password.validPassword
        );
    });

    test('ID 1. Product Display @demo-tests', async () => {
        await homePageScenarios.verifyItemDisplay();
    });

    test('ID 2. Add to Cart @demo-tests', async () => {
        await homePageScenarios.verifyCartIconAfterAddingProduct();
    });

    test('ID 3. Remove from Cart @demo-tests', async () => {
        await homePageScenarios.verifyCartIconAfterRemovigProduct();
    });

    test('ID 4. Filter Product @demo-tests', async () => {
        await homePageScenarios.verifyProductSorting();
    });

    test('ID 5. Navigate to Cart @demo-tests', async () => {
        await BasketPageScenarios.verifyCartBasket();
    });
});