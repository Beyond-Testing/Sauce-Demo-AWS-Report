import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'

export class CheckoutPage {
    private page: Page
    private title = '[data-test="title"]'
    private firstnameField = '[data-test="firstName"]'
    private lastnameField = '[data-test="lastName"]'
    private postalcodeField = '[data-test="postalCode"]'
    private continueButton = '[data-test="continue"]'

    constructor(page: Page) {
        this.page = page
    }

    public async getTitle() {
        await validateText(
            this.page,
            this.title,
            'Checkout: Your Information',
            'string',
        )
    }

    public async fillFormFields(
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

    public async enterCheckoutOverviewPage() {
        await clickOnElement(this.page, this.continueButton)
        await validateURL(this.page, url.checkoutOverviewPage)
    }
}
