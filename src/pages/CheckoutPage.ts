import {BasePage} from '@/core/BasePage'
import {URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {CHECKOUT_PAGE_LOCATORS} from '@/locators/Checkout'
import type {Page} from '@playwright/test'

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyPageTitle(expectedTitle: string = 'Checkout: Your Information') {
    await test.step('Verify page title', async () => {
      await this.validateText(CHECKOUT_PAGE_LOCATORS.title, expectedTitle)
    })
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: number,
  ): Promise<void> {
    await test.step('Fill checkout form', async () => {
      await this.fillInput(CHECKOUT_PAGE_LOCATORS.firstNameField, firstName)
      await this.fillInput(CHECKOUT_PAGE_LOCATORS.lastNameField, lastName)
      await this.fillInput(
        CHECKOUT_PAGE_LOCATORS.postalCodeField,
        postalCode.toString(),
      )
    })
  }

  async proceedToCheckoutOverviewPage(): Promise<void> {
    await test.step('Proceed to checkout overview page', async () => {
      await this.clickOnElement(CHECKOUT_PAGE_LOCATORS.continueButton)
      await this.validateURL(URL.checkoutOverviewPage)
    })
  }
}
