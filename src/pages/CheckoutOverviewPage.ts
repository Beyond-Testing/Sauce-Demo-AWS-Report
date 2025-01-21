import {type Page} from '@playwright/test'
import {IProduct} from '../fixtures/productsData'
import {clickOnElement, validateText, validateURL} from '../helpers/testUtils'
import {url} from '../fixtures/urlData'
import {CheckoutOverViewLocator} from '../locators/CheckoutOverviewLocators'

export class CheckoutOverviewPage {
  constructor(private readonly _page: Page) {}

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
    await validateURL(this._page, url.checkoutCompletePage)
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
