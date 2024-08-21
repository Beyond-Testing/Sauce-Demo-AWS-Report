import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'

export class CheckoutPage {
    private readonly titleSelector = '[data-test="title"]'
    private readonly firstNameFieldSelector = '[data-test="firstName"]'
    private readonly lastNameFieldSelector = '[data-test="lastName"]'
    private readonly postalCodeFieldSelector = '[data-test="postalCode"]'
    private readonly continueButtonSelector = '[data-test="continue"]'

    constructor(private readonly page: Page) {}

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
    ): Promise<void> {
        await this.page.locator(this.firstNameFieldSelector).fill(firstName)
        await this.page.locator(this.lastNameFieldSelector).fill(lastName)
        await this.page
            .locator(this.postalCodeFieldSelector)
            .fill(postalCode.toString())
    }

    async proceedToCheckoutOverviewPage(): Promise<void> {
        await clickOnElement(this.page, this.continueButtonSelector)
        await validateURL(this.page, url.checkoutOverviewPage)
    }
}
