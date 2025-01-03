import { Locator, Page } from 'playwright/test';
import * as selectors from '../../selectors.json';

export class HomePageService {
    constructor(private page: Page) {}

    public getInventoryItemList(): Locator {
        return this.page.locator(selectors.homePage.inventoryItemList);
    }

    public getInventoryItemTitleList(): Locator {
        return this.page.locator(selectors.homePage.inventoyItemTitleList);
    }

    public getAddToCartButtonList(): Locator {
        return this.page.locator(selectors.homePage.addToCartButtonList);
    }

    public getRemoveFromCartButtonList(): Locator {
        return this.page.locator(selectors.homePage.removeFromCartButtonList);
    }

    public getCartIconBadge(): Locator {
        return this.page.locator(selectors.homePage.cartIconBadge);
    }

    public getInventoryItemImageList(): Locator {
        return this.page.locator(selectors.homePage.inventoryItemImageList);
    }

    public getInventoryItemPriceList(): Locator {
        return this.page.locator(selectors.homePage.inventoryItemPriceList);
    }

    public getCartButton(): Locator {
        return this.page.locator(selectors.homePage.cartButton);
    }
}