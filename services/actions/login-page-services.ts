import { Locator, Page } from 'playwright/test';
import * as selectors from '../../selectors.json';

export class LoginPageService {
    constructor(private page: Page) {}

    public getUsernameInputField(): Locator {
        return this.page.locator(selectors.loginPage.usernameInputField);
    }

    public getPasswordInputField(): Locator {
        return this.page.locator(selectors.loginPage.passwordInputField);
    }

    public getLoginButton(): Locator {
        return this.page.locator(selectors.loginPage.loginButton);
    }

    public getLoginErrorMessage(): Locator {
        return this.page.locator(selectors.loginPage.errorMessage);
    }
}