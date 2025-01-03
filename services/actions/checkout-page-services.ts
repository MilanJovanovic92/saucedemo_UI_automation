import { Locator, Page } from 'playwright/test';
import * as selectors from '../../selectors.json';

export class CheckoutPageService {
    constructor(private page: Page) {}

    public getFiestNameInputField(): Locator {
        return this.page.locator(selectors.checkoutPage.firstNameInputField);
    }

    public getLastNameInputField(): Locator {
        return this.page.locator(selectors.checkoutPage.lastNameInputField);
    }

    public getPostalCodeInputField(): Locator {
        return this.page.locator(selectors.checkoutPage.postalCodeInputField);
    }

    public getContinueButton(): Locator {
        return this.page.locator(selectors.checkoutPage.continueButton);
    }

    public getOverviewItemTitle(): Locator {
        return this.page.locator(selectors.checkoutPage.overviewItemTitle);
    }

    public getOverviewItemPrice(): Locator {
        return this.page.locator(selectors.checkoutPage.overviewItemPrice);
    }

    public getFinishButton(): Locator {
        return this.page.locator(selectors.checkoutPage.finishButton);
    }

    public getCompletedOrderTitle(): Locator {
        return this.page.locator(selectors.checkoutPage.completedOrderTitle);
    }
}