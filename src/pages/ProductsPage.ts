import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {ProductLocators} from '../locators/ProductsLocators'

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async verifyPageTitle(expectedTitle: string = 'Products'): Promise<void> {
    await validateText(
      this.page,
      ProductLocators.titleSelector,
      expectedTitle,
      'string',
    )
  }

  async addItemToCart(item: string): Promise<void> {
    await clickOnElement(this.page, ProductLocators.addToCartItemSelector(item))
  }

  async proceedToCartPage(): Promise<void> {
    await clickOnElement(this.page, ProductLocators.cartButtonSelector)
    await validateURL(this.page, url.checkoutPage)
  }

  async logout(): Promise<void> {
    await clickOnElement(
      this.page,
      ProductLocators.openHamburgerMenu.role,
      'role',
      {
        name: ProductLocators.openHamburgerMenu.name,
      },
    )
    await clickOnElement(this.page, ProductLocators.logoutButtonSelector)
    await validateURL(this.page, url.basePage)
  }
}
