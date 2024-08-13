import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class CheckoutCompletePage {
    private page: Page
    private title = '[data-test="title"]'
    private completeOrderTitle = '[data-test="complete-header"]'
    private completeOrderDescription = '[data-test="complete-text"]'
    private backHomeButton = '[data-test="back-to-products"]'

    constructor(page: Page) {
        this.page = page
    }

    public async getTitle() {
        await validateText(
            this.page,
            this.title,
            'Checkout: Complete!',
            'string',
        )
    }
    public async getOrderTitle() {
        await validateText(
            this.page,
            this.completeOrderTitle,
            'Thank you for your order!',
            'string',
        )
    }
    public async getOrderDescription() {
        await validateText(
            this.page,
            this.completeOrderDescription,
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
            'string',
        )
    }

    public async goBackHome() {
        await clickOnElement(this.page, this.backHomeButton)
        await validateURL(this.page, url.productsPage)
    }
}
