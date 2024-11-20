import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'
import {CheckoutLocators} from '../locators/CheckoutLocators'

export class CheckoutPage {
    constructor(private readonly page: Page) {}

    async verifyPageTitle(
        expectedTitle: string = 'Checkout: Your Information',
    ) {
        await validateText(
            this.page,
            CheckoutLocators.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async fillCheckoutForm(
        firstName: string,
        lastName: string,
        postalCode: number,
    ): Promise<void> {
        await this.page
            .locator(CheckoutLocators.firstNameFieldSelector)
            .fill(firstName)
        await this.page
            .locator(CheckoutLocators.lastNameFieldSelector)
            .fill(lastName)
        await this.page
            .locator(CheckoutLocators.postalCodeFieldSelector)
            .fill(postalCode.toString())
    }

    async proceedToCheckoutOverviewPage(): Promise<void> {
        await clickOnElement(this.page, CheckoutLocators.continueButtonSelector)
        await validateURL(this.page, url.checkoutOverviewPage)
    }
}
