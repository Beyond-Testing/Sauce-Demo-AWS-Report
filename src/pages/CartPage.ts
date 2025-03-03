import {expect, type Page} from '@playwright/test'
import {clickOnElement, validateText} from '../helpers/testUtils'
import {IProduct} from '../data/productsData'
import {URL} from '../data/urlData'
import {CartLocator} from '../locators/CartLocators'

export class CartPage {
  private readonly _page: Page

  constructor(page: Page) {
    this._page = page
  }

  async verifyPageTitle(expectedTitle: string = 'Your Cart'): Promise<void> {
    await validateText(this._page, CartLocator.title, expectedTitle, 'string')
  }

  async verifyNumberOfItemsCartBadge(numberOfItems: number): Promise<void> {
    await validateText(
      this._page,
      CartLocator.cartBadge,
      numberOfItems.toString(),
      'string',
    )
  }

  async proceedToCheckoutPage(): Promise<void> {
    await clickOnElement(this._page, CartLocator.checkoutButton)
    await expect(this._page).toHaveURL(URL.checkoutStepOnePage)
  }

  async verifyProductsInCart(productArray: IProduct[]): Promise<void> {
    productArray.forEach(async (product, index) => {
      const productLocator = CartLocator.cartItem(index + 3)
      await this._verifySingleProductInCart(productLocator, product)
    })
  }

  private async _verifySingleProductInCart(
    productLocator: string,
    product: IProduct,
  ): Promise<void> {
    await validateText(
      this._page,
      `${productLocator} ${CartLocator.cartListProductName}`,
      product.name,
      'substring',
    )
    await validateText(
      this._page,
      `${productLocator} ${CartLocator.cartListProductDesc}`,
      product.description,
      'substring',
    )
    await validateText(
      this._page,
      `${productLocator} ${CartLocator.cartListProductPrice}`,
      product.price,
      'substring',
    )
  }
}
