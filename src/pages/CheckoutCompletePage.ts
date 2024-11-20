import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {CheckoutCompleteLocators} from '../locators/CheckoutCompleteLocators'

export class CheckoutCompletePage {
    constructor(private readonly page: Page) {}

    async verifyPageTitle(
        expectedTitle: string = 'Checkout: Complete!',
    ): Promise<void> {
        await validateText(
            this.page,
            CheckoutCompleteLocators.title,
            expectedTitle,
            'string',
        )
    }

    async verifyOrderTitle(
        expectedTitle: string = 'Thank you for your order!',
    ): Promise<void> {
        await validateText(
            this.page,
            CheckoutCompleteLocators.completeOrderTitle,
            expectedTitle,
            'string',
        )
    }

    async verifyOrderDescription(
        expectedDescription: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    ): Promise<void> {
        await validateText(
            this.page,
            CheckoutCompleteLocators.completeOrderDescription,
            expectedDescription,
            'string',
        )
    }

    async goBackToHomePage(): Promise<void> {
        await clickOnElement(this.page, CheckoutCompleteLocators.backHomeButton)
        await validateURL(this.page, url.productsPage)
    }
}
