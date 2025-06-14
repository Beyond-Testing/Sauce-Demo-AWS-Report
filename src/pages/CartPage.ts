import {BasePage} from '@/core/BasePage'
import type {Product} from '@/data/products'
import {URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {CART_PAGE_LOCATORS} from '@/locators/Cart'
import type {Page} from '@playwright/test'

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyPageTitle(expectedTitle: string = 'Your Cart'): Promise<void> {
    await test.step('Verify page title', async () => {
      await this.validateText(CART_PAGE_LOCATORS.title, expectedTitle)
    })
  }

  async verifyNumberOfItemsCartBadge(numberOfItems: number): Promise<void> {
    await test.step('Verify number of items in cart badge', async () => {
      await this.validateText(
        CART_PAGE_LOCATORS.cartBadge,
        numberOfItems.toString(),
      )
    })
  }

  async proceedToCheckoutPage(): Promise<void> {
    await test.step('Proceed to checkout page', async () => {
      await this.clickOnElement(CART_PAGE_LOCATORS.checkoutButton)
      await this.validateURL(URL.checkoutStepOnePage)
    })
  }

  async verifyProductsInCart(productArray: Product[]): Promise<void> {
    await test.step('Verify products in cart', async () => {
      productArray.forEach(async (product, index) => {
        const productLocator = CART_PAGE_LOCATORS.cartItem(index + 3)
        await this._verifySingleProductInCart(productLocator, product)
      })
    })
  }

  private async _verifySingleProductInCart(
    productLocator: string,
    product: Product,
  ): Promise<void> {
    await test.step('Verify single product in cart', async () => {
      await this.validateText(
        `${productLocator} ${CART_PAGE_LOCATORS.cartListProductName}`,
        product.name,
      )
      await this.validateText(
        `${productLocator} ${CART_PAGE_LOCATORS.cartListProductDesc}`,
        product.description,
      )
      await this.validateText(
        `${productLocator} ${CART_PAGE_LOCATORS.cartListProductPrice}`,
        product.price,
      )
    })
  }
}
