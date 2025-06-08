import {BasePage} from '@/core/BasePage'
import {BASE_URL, URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {PRODUCT_LOCATORS} from '@/locators/ProductsLocators'
import type {Page} from '@playwright/test'

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async validatePageURL(): Promise<void> {
    await test.step('Validate page URL', async () => {
      await this.validateURL(URL.productsPage)
    })
  }

  async verifyPageTitle(expectedTitle: string = 'Products'): Promise<void> {
    await test.step('Verify page title', async () => {
      await this.validateText(PRODUCT_LOCATORS.title, expectedTitle)
    })
  }

  async addItemToCart(item: string): Promise<void> {
    await test.step('Add item to cart', async () => {
      await this.clickOnElement(PRODUCT_LOCATORS.addToCartItem(item))
    })
  }

  async proceedToCartPage(): Promise<void> {
    await test.step('Proceed to cart page', async () => {
      await this.clickOnElement(PRODUCT_LOCATORS.cartButton)
      await this.validateURL(URL.checkoutPage)
    })
  }

  async logout(): Promise<void> {
    await test.step('Logout', async () => {
      await this.clickOnElement(PRODUCT_LOCATORS.openHamburgerMenu)
      await this.clickOnElement(PRODUCT_LOCATORS.logoutButton)
      await this.validateURL(BASE_URL)
    })
  }
}
