import { Page } from 'playwright';
import { expect } from 'playwright/test';
import { HelperScenario } from './helper-scenarios';
import { HomePageService } from '../actions/home-page-services';
import { LoginPageService } from '../actions/login-page-services';

export class LoginPageScenario {
    private helperScenarios: HelperScenario;
    private homePageServices: HomePageService;
    private loginPageServices: LoginPageService;

    constructor(private page: Page) {
        this.helperScenarios = new HelperScenario(page);
        this.homePageServices = new HomePageService(page);
        this.loginPageServices = new LoginPageService(page);
    }

    async submitLoginCredentials(
        usernameData: string,
        passwordData: string
    ): Promise<void> {
        const usernameInputField = this.loginPageServices.getUsernameInputField();
        const passwordInputField = this.loginPageServices.getPasswordInputField();
        const loginButton = this.loginPageServices.getLoginButton();

        await usernameInputField.fill(usernameData);
        await passwordInputField.fill(passwordData);
        await loginButton.click();
    }

    async verifyValidLogin(
        usernameData: string,
        passwordData: string
    ): Promise<void> {
        const loginPageUrl = this.page.url();
        this.submitLoginCredentials(
            usernameData,
            passwordData
        );
        await this.page.waitForTimeout(500);
        const inventoryItemList = this.homePageServices.getInventoryItemList();
        await this.helperScenarios.verifyListOfElementsVisibility(inventoryItemList);
        const homePageUrl = this.page.url();
        expect(loginPageUrl).not.toEqual(homePageUrl);
    }

    async verifyMissingCredentialsLoginAttempt(errorMessageData: string): Promise<void> {
        const loginButton = this.loginPageServices.getLoginButton();
        const usernameInputFieldValue = this.loginPageServices.getUsernameInputField();
        const passwordInputFieldValue = this.loginPageServices.getPasswordInputField();
        const loginErrorMessage = this.loginPageServices.getLoginErrorMessage();

        await loginButton.click();
        await expect(usernameInputFieldValue).toHaveAttribute('value', '');
        await expect(passwordInputFieldValue).toHaveAttribute('value', '');
        await expect(loginErrorMessage).toBeVisible();
        await expect(loginErrorMessage).toHaveText(errorMessageData);
    }

    async verifyInvalidLoginAttempt(
        usernameData: string,
        passwordData: string,
        errorMessageData: string
    ): Promise<void> {
        const defaultUrl = this.page.url();
        this.submitLoginCredentials(
            usernameData,
            passwordData
        );
        const urlAfterLoginAttempt = this.page.url();
        const loginErrorMessage = this.loginPageServices.getLoginErrorMessage();

        await expect(loginErrorMessage).toBeVisible();
        await expect(loginErrorMessage).toHaveText(errorMessageData);
        expect(defaultUrl).toStrictEqual(urlAfterLoginAttempt);
    }
}