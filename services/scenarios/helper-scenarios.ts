import { expect } from 'playwright/test';
import { Locator, Page } from 'playwright';

export class HelperScenario {
    constructor(private page: Page) { }

    async verifyListOfElementsVisibility(listOfElements: Locator): Promise<void> {
        for (let i = 0; i < await listOfElements.count(); i++) {
            await expect(listOfElements.nth(i)).toBeVisible();
        }
    }

    async clickOnRandomElement(listOfElements: Locator): Promise<void> {
        const randomElement = Math.floor(Math.random() * (await listOfElements.count()));
        await (listOfElements.nth(randomElement).click());
    }

    async verifyListOfElementsText(
        listOfElements: Locator,
        listToCompareWith: string[]
    ): Promise<void> {
        for (let i = 0; i < await listOfElements.count(); i++) {
            await expect(listOfElements.nth(i)).toHaveText(listToCompareWith[i]);
        }
    }

    async generateRandomString(): Promise<string> {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const length = Math.floor(Math.random() * 2) + 5;
        let randomName = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * alphabet.length);
          randomName += alphabet[randomIndex];
        }
        return randomName.charAt(0).toUpperCase() + randomName.slice(1);
    }

    async generateRandomFiveDigitNumber(): Promise<number> {
        return Math.floor(10000 + Math.random() * 90000);
    }
}