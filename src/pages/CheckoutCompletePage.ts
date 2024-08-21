import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class CheckoutCompletePage {
    private readonly title = '[data-test="title"]'
    private readonly completeOrderTitle = '[data-test="complete-header"]'
    private readonly completeOrderDescription = '[data-test="complete-text"]'
    private readonly backHomeButton = '[data-test="back-to-products"]'

    constructor(private readonly page: Page) {}

    async verifyPageTitle(
        expectedTitle: string = 'Checkout: Complete!',
    ): Promise<void> {
        await validateText(this.page, this.title, expectedTitle, 'string')
    }

    async verifyOrderTitle(
        expectedTitle: string = 'Thank you for your order!',
    ): Promise<void> {
        await validateText(
            this.page,
            this.completeOrderTitle,
            expectedTitle,
            'string',
        )
    }

    async verifyOrderDescription(
        expectedDescription: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    ): Promise<void> {
        await validateText(
            this.page,
            this.completeOrderDescription,
            expectedDescription,
            'string',
        )
    }

    async goBackToHomePage(): Promise<void> {
        await clickOnElement(this.page, this.backHomeButton)
        await validateURL(this.page, url.productsPage)
    }
}
