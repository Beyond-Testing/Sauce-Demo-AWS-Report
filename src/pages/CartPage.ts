import {type Page} from '@playwright/test'
import {IProduct} from '@/data/productsData'
import {URL} from '@/data/urlData'
import {CartLocator} from '@/locators/CartLocators'
import {BasePage} from '@/helpers/BasePage'
import test from '@/fixtures/testSetup'
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyPageTitle(expectedTitle: string = 'Your Cart'): Promise<void> {
    await test.step('Verify page title', async () => {
      await this.validateText(CartLocator.title, expectedTitle)
    })
  }

  async verifyNumberOfItemsCartBadge(numberOfItems: number): Promise<void> {
    await test.step('Verify number of items in cart badge', async () => {
      await this.validateText(CartLocator.cartBadge, numberOfItems.toString())
    })
  }

  async proceedToCheckoutPage(): Promise<void> {
    await test.step('Proceed to checkout page', async () => {
      await this.clickOnElement(CartLocator.checkoutButton)
      await this.validateURL(URL.checkoutStepOnePage)
    })
  }

  async verifyProductsInCart(productArray: IProduct[]): Promise<void> {
    await test.step('Verify products in cart', async () => {
      productArray.forEach(async (product, index) => {
        const productLocator = CartLocator.cartItem(index + 3)
        await this._verifySingleProductInCart(productLocator, product)
      })
    })
  }

  private async _verifySingleProductInCart(
    productLocator: string,
    product: IProduct,
  ): Promise<void> {
    await test.step('Verify single product in cart', async () => {
      await this.validateText(
        `${productLocator} ${CartLocator.cartListProductName}`,
        product.name,
        'substring',
      )
      await this.validateText(
        `${productLocator} ${CartLocator.cartListProductDesc}`,
        product.description,
        'substring',
      )
      await this.validateText(
        `${productLocator} ${CartLocator.cartListProductPrice}`,
        product.price,
        'substring',
      )
    })
  }
}
