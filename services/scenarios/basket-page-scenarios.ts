import { Page } from 'playwright';
import { expect } from 'playwright/test';
import { HelperScenario } from './helper-scenarios';
import * as checkoutData from '../../test-data/checkout.json';
import { HomePageService } from '../actions/home-page-services';
import { BasketPageService } from '../actions/basket-page-services';
import { CheckoutPageService } from '../actions/checkout-page-services';

export class BasketPageScenario {
    private helperScenarios: HelperScenario;
    private homePageServices: HomePageService;
    private basketPageServices: BasketPageService;
    private checkoutPageServices: CheckoutPageService;

    constructor(private page: Page) {
        this.helperScenarios = new HelperScenario(page);
        this.homePageServices = new HomePageService(page);
        this.basketPageServices = new BasketPageService(page);
        this.checkoutPageServices = new CheckoutPageService(page);
    }

    async verifyCartBasket(): Promise<void> {
        const homePageUrl = this.page.url();
        const cartButton = this.homePageServices.getCartButton();
        const addToCartButtonList = this.homePageServices.getAddToCartButtonList(); 

        await this.helperScenarios.clickOnRandomElement(addToCartButtonList);
        await cartButton.click();

        const cartPageUrl = this.page.url();
        const title = this.basketPageServices.getBasketPageTitle();
        const cartItem = this.basketPageServices.getCartItem();
        const removeButton = this.basketPageServices.getRemoveButton();
        const continueShoppingButton = this.basketPageServices.getContinueShoppingButton();
        const checkoutButton = this.basketPageServices.getCheckoutButton();

        expect(homePageUrl).not.toEqual(cartPageUrl);
        await expect(title).toHaveText('Your Cart');
        await expect(cartItem).toBeVisible();
        await expect(removeButton).toBeVisible();
        await expect(continueShoppingButton).toBeVisible();
        await expect(checkoutButton).toBeVisible();
    }

    async verifyItemRemovalAndOrderCompletion(): Promise<void> {
        const cartItemList = this.basketPageServices.getCartItem();
        const removeButton = this.basketPageServices.getRemoveButton().nth(0);
        const checkoutButton = this.basketPageServices.getCheckoutButton();

        expect(await cartItemList.count()).toBe(2);
        await removeButton.click();
        expect(await cartItemList.count()).toBe(1);
        await checkoutButton.click();

        const firstNameInputField = this.checkoutPageServices.getFiestNameInputField();
        const lastNameInputField = this.checkoutPageServices.getLastNameInputField();
        const postalCodeInputField = this.checkoutPageServices.getPostalCodeInputField();
        const firstName = await this.helperScenarios.generateRandomString();
        const lastName = await this.helperScenarios.generateRandomString();
        const postalCode = await this.helperScenarios.generateRandomFiveDigitNumber();
        const continueButton = this.checkoutPageServices.getContinueButton();

        await firstNameInputField.fill(firstName);
        await lastNameInputField.fill(lastName);
        await postalCodeInputField.fill(postalCode.toString());
        await continueButton.click();

        const overviewItemTitle = this.checkoutPageServices.getOverviewItemTitle();
        const overviewItemPrice = this.checkoutPageServices.getOverviewItemPrice();
        const finishButton = this.checkoutPageServices.getFinishButton();

        await expect(overviewItemTitle).toBeVisible();
        await expect(overviewItemPrice).toBeVisible();
        await finishButton.click();

        const completedOrderTitle = this.checkoutPageServices.getCompletedOrderTitle();
        await expect(completedOrderTitle).toHaveText(checkoutData.compeledOrder);
    }
}