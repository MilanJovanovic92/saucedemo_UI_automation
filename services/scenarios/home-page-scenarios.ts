import { Page } from 'playwright';
import { expect } from 'playwright/test';
import { HelperScenario } from './helper-scenarios';
import { BasketPageScenario } from './basket-page-scenarios';
import * as homePageData from '../../test-data/homepage.json';
import { HomePageService } from '../actions/home-page-services';
import { BasketPageService } from '../actions/basket-page-services';

export class HomePageScenario {
    private helperScenarios: HelperScenario;
    private homePageServices: HomePageService;
    private basketPageServices: BasketPageService;
    private basketPageScenarios: BasketPageScenario;


    constructor(private page: Page) {
        this.helperScenarios = new HelperScenario(page);
        this.homePageServices = new HomePageService(page);
        this.basketPageServices = new BasketPageService(page);
        this.basketPageScenarios = new BasketPageScenario(page);
    }

    async verifyItemDisplay(): Promise<void> {
        const inventoryList = this.homePageServices.getInventoryItemList();
        const inventoryTitleList = this.homePageServices.getInventoryItemTitleList();
        const inventoryPriceList = this.homePageServices.getInventoryItemPriceList();
        const inventoryImageList = this.homePageServices.getInventoryItemImageList();

        await this.helperScenarios.verifyListOfElementsVisibility(inventoryList);
        await this.helperScenarios.verifyListOfElementsText(
            inventoryTitleList,
            homePageData.inventoyItemTitleList
        );
        await this.helperScenarios.verifyListOfElementsText(
            inventoryPriceList,
            homePageData.inventoryItemPriceList
        );
        expect(await inventoryImageList.count()).toBe(6);

        // asserting visiblity of images (src attribute contains no data of a broken image)
        for (let i = 0; i < await inventoryImageList.count(); i++) {
            const src = await inventoryImageList.nth(i).getAttribute('src');
            expect(src).not.toContain(homePageData.brokenImageAttributeData);
        }
    }

    async verifyCartIconAfterAddingProduct(): Promise<void> {
        const backPackAddButton = this.homePageServices.getAddToCartButtonList().nth(0);
        const cartIconBadge = this.homePageServices.getCartIconBadge();

        await backPackAddButton.click();
        await expect(cartIconBadge).toBeVisible();
        await expect(cartIconBadge).toHaveText('1');
    }

    async verifyCartIconAfterRemovigProduct(): Promise<void> {
        const backPackRemoveButton = this.homePageServices.getRemoveFromCartButtonList().nth(0);
        const cartIconBadge = this.homePageServices.getCartIconBadge();

        await backPackRemoveButton.click();
        await expect(cartIconBadge).not.toBeVisible();
    }

    async verifyProductSorting(): Promise<void> {
        const inventoryPriceList = this.homePageServices.getInventoryItemPriceList();
        const priceBefore = await inventoryPriceList.allTextContents();

        // converting string to numbers
        const convertPriceToNumber = priceBefore.map(price =>
        parseFloat(price.replace('$', '').trim())
        );
        await this.page.selectOption('.product_sort_container', 'lohi');
        const pricesAfterSorting = await inventoryPriceList.allTextContents();

        // converting string to numbers
        const convertSortedPriceToNumber = pricesAfterSorting.map(price =>
        parseFloat(price.replace('$', '').trim())
        );
        expect(convertPriceToNumber).not.toEqual(convertSortedPriceToNumber);

        // asserting that prices after filtering are sorted from low to high
        expect(convertSortedPriceToNumber).toEqual([...convertSortedPriceToNumber].sort((a, b) => a - b));
    }

    async verifyItemPurchase(): Promise<void> {
        const addToBackPackToCart = this.homePageServices.getAddToCartButtonList().nth(0);
        const addToOnsiesToCart = this.homePageServices.getAddToCartButtonList().nth(4);
        const cartButton = this.homePageServices.getCartButton();
       
        await addToBackPackToCart.click()
        await addToOnsiesToCart.click();
        await cartButton.click();
        await this.basketPageScenarios.verifyItemRemovalAndOrderCompletion();
    }

    async verifyAddingAndRemovigProducts(): Promise<void> {
        const inventoryItemList = this.homePageServices.getInventoryItemList();
        await this.helperScenarios.verifyListOfElementsVisibility(inventoryItemList);
        await this.page.selectOption('.product_sort_container', 'lohi');

        //fetch list of prices
        const prices = await this.page.$$eval('.inventory_item_price', (elements) =>
            elements.map((el) => parseFloat(el.textContent!.replace('$', '')))
        );
        expect(prices).toEqual([...prices].sort((a, b) => a - b));
        const addToCartButtons = this.homePageServices.getAddToCartButtonList();
        await addToCartButtons.nth(0).click();
        await addToCartButtons.nth(1).click();

        const cartIconBadge = this.homePageServices.getCartIconBadge();
        await expect(cartIconBadge).toBeVisible();
        await expect(cartIconBadge).toHaveText('2');

        const cartButton = this.homePageServices.getCartButton();
        await cartButton.click();

        const basketRemoveButton = this.basketPageServices.getRemoveButton().nth(0);
        await basketRemoveButton.click();
        const updatedCartItems = this.basketPageServices.getCartItem();
        expect(await updatedCartItems.count()).toBe(1);
    }
}