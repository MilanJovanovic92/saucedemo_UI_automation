import { test, Page } from '@playwright/test';
import * as loginData from '../test-data/login.json';
import { HomePageScenario } from '../services/scenarios/home-page-scenarios';
import { LoginPageScenario } from '../services/scenarios/login-page-scenarios';

test.describe('End to end tests @end-to-end-tests', () => {
    let homePageScenarios: HomePageScenario,
        loginPageScenarios: LoginPageScenario;

    let page: Page;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        homePageScenarios = new HomePageScenario(page);
        loginPageScenarios = new LoginPageScenario(page);

        await page.goto('https://www.saucedemo.com/v1/index.html', {waitUntil: 'domcontentloaded'});
        await page.setViewportSize({ width: 1920, height: 850 });
        await loginPageScenarios.submitLoginCredentials(
            loginData.username.standardUser,
            loginData.password.validPassword
        );
    });

    test('ID 1. Complete Purchase with Item Removal @demo-tests', async () => {
        await homePageScenarios.verifyItemPurchase();
    });

    test('ID 2. Validate Adding and Removing Products with Sorting Applied @demo-tests', async () => {
        await homePageScenarios.verifyAddingAndRemovigProducts();
    });
});