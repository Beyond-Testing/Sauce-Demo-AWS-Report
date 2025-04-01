import {type Page} from '@playwright/test'
import {IProduct} from '@/data/productsData'
import {URL} from '@/data/urlData'
import {CheckoutOverViewLocator} from '@/locators/CheckoutOverviewLocators'
import {BasePage} from '@/helpers/BasePage'
import test from '@/fixtures/testSetup'

export class CheckoutOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page)
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

  async verifyPageTitle(
    expectedTitle: string = 'Checkout: Overview',
  ): Promise<void> {
    await test.step('Verify page title', async () => {
      await this.validateText(CheckoutOverViewLocator.title, expectedTitle)
    })
  }

  async completeCheckout(): Promise<void> {
    await test.step('Complete checkout', async () => {
      await this.clickOnElement(CheckoutOverViewLocator.finishButton)
      await this.validateURL(URL.checkoutCompletePage)
    })
  }

  async verifyTotalPrice(products: IProduct[]): Promise<void> {
    await test.step('Verify total price', async () => {
      const calculatedTotalPrice = this._calculateTotalPriceAfterTax(products)
      await this.validateText(
        CheckoutOverViewLocator.totalPriceAfterTax,
        calculatedTotalPrice,
        'substring',
      )
    })
  }
}
