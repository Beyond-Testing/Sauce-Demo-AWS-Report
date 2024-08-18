import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'

export class CheckoutPage {
    protected readonly page: Page
    protected readonly titleSelector = '[data-test="title"]'
    protected readonly firstNameFieldSelector = '[data-test="firstName"]'
    protected readonly lastNameFieldSelector = '[data-test="lastName"]'
    protected readonly postalCodeFieldSelector = '[data-test="postalCode"]'
    protected readonly continueButtonSelector = '[data-test="continue"]'

    constructor(page: Page) {
        this.page = page
    }
    async verifyPageTitle(
        expectedTitle: string = 'Checkout: Your Information',
    ) {
        await validateText(
            this.page,
            this.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async fillCheckoutForm(
        firstName: string,
        lastName: string,
        postalCode: number,
    ) {
        await this.page.locator(this.firstNameFieldSelector).fill(firstName)
        await this.page.locator(this.lastNameFieldSelector).fill(lastName)
        await this.page
            .locator(this.postalCodeFieldSelector)
            .fill(postalCode.toString())
    }

    async proceedToCheckoutOverviewPage() {
        await clickOnElement(this.page, this.continueButtonSelector)
        await validateURL(this.page, url.checkoutOverviewPage)
    }
}
