import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'

export class CheckoutPage {
    readonly page: Page
    readonly title = '[data-test="title"]'
    readonly firstnameField = '[data-test="firstName"]'
    readonly lastnameField = '[data-test="lastName"]'
    readonly postalcodeField = '[data-test="postalCode"]'
    readonly continueButton = '[data-test="continue"]'

    constructor(page: Page) {
        this.page = page
    }

    async getTitle() {
        await validateText(
            this.page,
            this.title,
            'Checkout: Your Information',
            'string',
        )
    }

    async fillFormFields(
        firstName: string,
        lastName: string,
        postalcode: number,
    ) {
        await this.page.locator(this.firstnameField).fill(firstName)
        await this.page.locator(this.lastnameField).fill(lastName)
        await this.page
            .locator(this.postalcodeField)
            .fill(postalcode.toString())
    }

    async enterCheckoutOverviewPage() {
        await clickOnElement(this.page, this.continueButton)
        await validateURL(this.page, url.checkoutOverviewPage)
    }
}
