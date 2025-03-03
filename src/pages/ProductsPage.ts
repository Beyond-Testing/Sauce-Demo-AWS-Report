import {expect, type Page} from '@playwright/test'
import {BASE_PAGE_URL, URL} from '../data/urlData'
import {clickOnElement, validateText} from '../helpers/testUtils'
import {ProductLocator} from '../locators/ProductsLocators'

export class ProductsPage {
  private readonly _page: Page

  constructor(page: Page) {
    this._page = page
  }

  async validatePageURL(): Promise<void> {
    await expect(this._page).toHaveURL(URL.productsPage)
  }
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
    await expect(this._page).toHaveURL(URL.checkoutPage)
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
    await expect(this._page).toHaveURL(BASE_PAGE_URL)
  }
}
