import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/testUtils'
import {CheckoutCompleteLocator} from '../locators/CheckoutCompleteLocators'

export class CheckoutCompletePage {
  constructor(private readonly _page: Page) {}

  async verifyPageTitle(
    expectedTitle: string = 'Checkout: Complete!',
  ): Promise<void> {
    await validateText(
      this._page,
      CheckoutCompleteLocator.title,
      expectedTitle,
      'string',
    )
  }

  async verifyOrderTitle(
    expectedTitle: string = 'Thank you for your order!',
  ): Promise<void> {
    await validateText(
      this._page,
      CheckoutCompleteLocator.completeOrderTitle,
      expectedTitle,
      'string',
    )
  }

  async verifyOrderDescription(
    expectedDescription: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
  ): Promise<void> {
    await validateText(
      this._page,
      CheckoutCompleteLocator.completeOrderDescription,
      expectedDescription,
      'string',
    )
  }

  async goBackToHomePage(): Promise<void> {
    await clickOnElement(this._page, CheckoutCompleteLocator.backHomeButton)
    await validateURL(this._page, url.productsPage)
  }
}
