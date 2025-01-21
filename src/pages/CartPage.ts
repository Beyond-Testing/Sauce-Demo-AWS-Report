import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/testUtils'
import {IProduct} from '../fixtures/productsData'
import {url} from '../fixtures/urlData'
import {CartLocator} from '../locators/CartLocators'

export class CartPage {
  constructor(private readonly _page: Page) {}

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
    await validateURL(this._page, url.checkoutStepOnePage)
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
