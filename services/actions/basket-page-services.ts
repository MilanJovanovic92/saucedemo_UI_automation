import { Locator, Page } from 'playwright/test';
import * as selectors from '../../selectors.json';

export class BasketPageService {
    constructor(private page: Page) {}

    public getBasketPageTitle(): Locator {
        return this.page.locator(selectors.basketPage.title);
    }

    public getCartItem(): Locator {
        return this.page.locator(selectors.basketPage.cartItem);
    }

    public getRemoveButton(): Locator {
        return this.page.locator(selectors.basketPage.removeButton);
    }

    public getContinueShoppingButton(): Locator {
        return this.page.locator(selectors.basketPage.continueShoppingButton);
    }

    public getCheckoutButton(): Locator {
        return this.page.locator(selectors.basketPage.checkoutButton);
    }
}