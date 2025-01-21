import {type Page} from '@playwright/test'
import {basePage, url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/testUtils'
import {ProductLocator} from '../locators/ProductsLocators'

export class ProductsPage {
  constructor(private readonly _page: Page) {}

  async verifyPageTitle(expectedTitle: string = 'Products'): Promise<void> {
    await validateText(
      this._page,
      ProductLocator.title,
      expectedTitle,
      'string',
    )
  }

  async addItemToCart(item: string): Promise<void> {
    await clickOnElement(this._page, ProductLocator.addToCartItem(item))
  }

  async proceedToCartPage(): Promise<void> {
    await clickOnElement(this._page, ProductLocator.cartButton)
    await validateURL(this._page, url.checkoutPage)
  }

  async logout(): Promise<void> {
    await clickOnElement(
      this._page,
      ProductLocator.openHamburgerMenu.role,
      'role',
      {
        name: ProductLocator.openHamburgerMenu.name,
      },
    )
    await clickOnElement(this._page, ProductLocator.logoutButton)
    await validateURL(this._page, basePage)
  }
}
