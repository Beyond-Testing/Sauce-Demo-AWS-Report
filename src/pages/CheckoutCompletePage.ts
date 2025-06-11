import {BasePage} from '@/core/BasePage'
import {URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {CHECKOUT_COMPLETE_PAGE_LOCATORS} from '@/locators/Checkout_Complete'
import type {Page} from '@playwright/test'

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyPageTitle(
    expectedTitle: string = 'Checkout: Complete!',
  ): Promise<void> {
    await test.step('Verify page title', async () => {
      await this.validateText(
        CHECKOUT_COMPLETE_PAGE_LOCATORS.title,
        expectedTitle,
      )
    })
  }

  async verifyOrderTitle(
    expectedTitle: string = 'Thank you for your order!',
  ): Promise<void> {
    await test.step('Verify order title', async () => {
      await this.validateText(
        CHECKOUT_COMPLETE_PAGE_LOCATORS.completeOrderTitle,
        expectedTitle,
      )
    })
  }

  async verifyOrderDescription(
    expectedDescription: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
  ): Promise<void> {
    await test.step('Verify order description', async () => {
      await this.validateText(
        CHECKOUT_COMPLETE_PAGE_LOCATORS.completeOrderDescription,
        expectedDescription,
      )
    })
  }

  async goBackToHomePage(): Promise<void> {
    await test.step('Go back to home page', async () => {
      await this.clickOnElement(CHECKOUT_COMPLETE_PAGE_LOCATORS.backHomeButton)
      await this.validateURL(URL.productsPage)
    })
  }
}
