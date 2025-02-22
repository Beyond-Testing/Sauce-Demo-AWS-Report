import {expect, type Page} from '@playwright/test'
import {clickOnElement, validateText} from '../helpers/testUtils'
import {url} from '../data/urlData'
import {CheckoutLocator} from '../locators/CheckoutLocators'

export class CheckoutPage {
  private readonly _page: Page

  constructor(page: Page) {
    this._page = page
  }

  async verifyPageTitle(expectedTitle: string = 'Checkout: Your Information') {
    await validateText(
      this._page,
      CheckoutLocator.title,
      expectedTitle,
      'string',
    )
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: number,
  ): Promise<void> {
    await this._page.locator(CheckoutLocator.firstNameField).fill(firstName)
    await this._page.locator(CheckoutLocator.lastNameField).fill(lastName)
    await this._page
      .locator(CheckoutLocator.postalCodeField)
      .fill(postalCode.toString())
  }

  async proceedToCheckoutOverviewPage(): Promise<void> {
    await clickOnElement(this._page, CheckoutLocator.continueButton)
    await expect(this._page).toHaveURL(url.checkoutOverviewPage)
  }
}
