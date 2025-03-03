import {expect, type Page} from '@playwright/test'
import {URL} from '../data/urlData'
import {clickOnElement, validateText} from '../helpers/testUtils'
import {CheckoutCompleteLocator} from '../locators/CheckoutCompleteLocators'

export class CheckoutCompletePage {
  private readonly _page: Page

  constructor(page: Page) {
    this._page = page
  }
  
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
    await expect(this._page).toHaveURL(URL.productsPage)
  }
}
