import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class CheckoutCompletePage {
    readonly page: Page
    readonly title = '[data-test="title"]'
    readonly completeOrderTitle = '[data-test="complete-header"]'
    readonly completeOrderDescription = '[data-test="complete-text"]'
    readonly backHomeButton = '[data-test="back-to-products"]'

    constructor(page: Page) {
        this.page = page
    }

    async getTitle() {
        await validateText(
            this.page,
            this.title,
            'Checkout: Complete!',
            'string',
        )
    }
    async getOrderTitle() {
        await validateText(
            this.page,
            this.completeOrderTitle,
            'Thank you for your order!',
            'string',
        )
    }
    async getOrderDescription() {
        await validateText(
            this.page,
            this.completeOrderDescription,
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
            'string',
        )
    }

    async goBackHome() {
        await clickOnElement(this.page, this.backHomeButton)
        await validateURL(this.page, url.productsPage)
    }
}
