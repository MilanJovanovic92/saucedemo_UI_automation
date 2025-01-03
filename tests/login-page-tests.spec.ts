import { test, Page } from '@playwright/test';
import * as loginData from '../test-data/login.json';
import { LoginPageScenario } from '../services/scenarios/login-page-scenarios';

test.describe('Login page tests @login-page-tests', () => {
    let loginPageScenarios: LoginPageScenario;
    
    let page: Page;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginPageScenarios = new LoginPageScenario(page);

        await page.goto('https://www.saucedemo.com/v1/index.html', {waitUntil: 'domcontentloaded'});
        await page.setViewportSize({ width: 1920, height: 850 });
    });

    test('ID 1. Valid Login @demo-tests', async () => {
        await loginPageScenarios.verifyValidLogin(
            loginData.username.standardUser,
            loginData.password.validPassword
        );
    });

    test('ID 2. Empty Fields @demo-tests', async () => {
        await loginPageScenarios.verifyMissingCredentialsLoginAttempt(loginData.errorMessage.missingCredentialsErrorMessage);
    });

    test('ID 3. Locked out User @demo-tests', async () => {
        await loginPageScenarios.verifyInvalidLoginAttempt(
            loginData.username.lockedOutUser,
            loginData.password.validPassword,
            loginData.errorMessage.lockedOutErrorMessage
        )
    });
});