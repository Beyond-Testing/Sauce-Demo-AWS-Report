import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class CheckoutCompletePage {
    protected readonly page: Page
    protected readonly title = '[data-test="title"]'
    protected readonly completeOrderTitle = '[data-test="complete-header"]'
    protected readonly completeOrderDescription = '[data-test="complete-text"]'
    protected readonly backHomeButton = '[data-test="back-to-products"]'

    constructor(page: Page) {
        this.page = page
    }

    async verifyPageTitle(expectedTitle: string = 'Checkout: Complete!') {
        await validateText(this.page, this.title, expectedTitle, 'string')
    }

    async verifyOrderTitle(
        expectedTitle: string = 'Thank you for your order!',
    ) {
        await validateText(
            this.page,
            this.completeOrderTitle,
            expectedTitle,
            'string',
        )
    }

    async verifyOrderDescription(
        expectedDescription: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    ) {
        await validateText(
            this.page,
            this.completeOrderDescription,
            expectedDescription,
            'string',
        )
    }

    async goBackToHomePage() {
        await clickOnElement(this.page, this.backHomeButton)
        await validateURL(this.page, url.productsPage)
    }
}
