import {expect, type Page} from '@playwright/test'
import {IProduct} from '../data/productsData'
import {clickOnElement, validateText} from '../helpers/testUtils'
import {url} from '../data/urlData'
import {CheckoutOverViewLocator} from '../locators/CheckoutOverviewLocators'

export class CheckoutOverviewPage {
  private readonly _page: Page

  constructor(page: Page) {
    this._page = page
  }

  async verifyPageTitle(
    expectedTitle: string = 'Checkout: Overview',
  ): Promise<void> {
    await validateText(
      this._page,
      CheckoutOverViewLocator.title,
      expectedTitle,
      'string',
    )
  }

  async completeCheckout(): Promise<void> {
    await clickOnElement(this._page, CheckoutOverViewLocator.finishButton)
    await expect(this._page).toHaveURL(url.checkoutCompletePage)
  }

  private _calculateTotalPriceAfterTax(
    productDetails: IProduct[],
    taxRate: number = 0.08,
  ): string {
    const totalPriceBeforeTax = productDetails.reduce(
      (total: number, product: IProduct) =>
        total + parseFloat(product.price.replace('$', '')),
      0,
    )
    const totalTax = totalPriceBeforeTax * taxRate
    const finalPrice = totalPriceBeforeTax + totalTax
    return finalPrice.toFixed(2)
  }

  async verifyTotalPrice(products: IProduct[]): Promise<void> {
    const calculatedTotalPrice = this._calculateTotalPriceAfterTax(products)
    await validateText(
      this._page,
      CheckoutOverViewLocator.totalPriceAfterTax,
      calculatedTotalPrice,
      'substring',
    )
  }
}
