import {BasePage} from '@/core/BasePage'
import type {Product} from '@/data/products'
import {URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {CHECKOUT_OVERVIEW_LOCATORS} from '@/locators/CheckoutOverviewLocators'
import type {Page} from '@playwright/test'

export class CheckoutOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  private _calculateTotalPriceAfterTax(
    productDetails: Product[],
    taxRate: number = 0.08,
  ): string {
    const totalPriceBeforeTax = productDetails.reduce(
      (total: number, product: Product) =>
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
      await this.validateText(CHECKOUT_OVERVIEW_LOCATORS.title, expectedTitle)
    })
  }

  async completeCheckout(): Promise<void> {
    await test.step('Complete checkout', async () => {
      await this.clickOnElement(CHECKOUT_OVERVIEW_LOCATORS.finishButton)
      await this.validateURL(URL.checkoutCompletePage)
    })
  }

  async verifyTotalPrice(products: Product[]): Promise<void> {
    await test.step('Verify total price', async () => {
      const calculatedTotalPrice = this._calculateTotalPriceAfterTax(products)
      await this.validateText(
        CHECKOUT_OVERVIEW_LOCATORS.totalPriceAfterTax,
        calculatedTotalPrice,
      )
    })
  }
}
