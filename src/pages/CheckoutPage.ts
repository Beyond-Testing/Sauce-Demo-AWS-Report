import {type Page} from '@playwright/test'
import {URL} from '@/data/urlData'
import {CHECKOUT_LOCATORS} from '@/locators/CheckoutLocators'
import {BasePage} from '@/core/BasePage'
import test from '@/fixtures/testSetup'

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyPageTitle(expectedTitle: string = 'Checkout: Your Information') {
    await test.step('Verify page title', async () => {
      await this.validateText(CHECKOUT_LOCATORS.title, expectedTitle)
    })
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: number,
  ): Promise<void> {
    await test.step('Fill checkout form', async () => {
      await this.fillInput(CHECKOUT_LOCATORS.firstNameField, firstName)
      await this.fillInput(CHECKOUT_LOCATORS.lastNameField, lastName)
      await this.fillInput(
        CHECKOUT_LOCATORS.postalCodeField,
        postalCode.toString(),
      )
    })
  }

  async proceedToCheckoutOverviewPage(): Promise<void> {
    await test.step('Proceed to checkout overview page', async () => {
      await this.clickOnElement(CHECKOUT_LOCATORS.continueButton)
      await this.validateURL(URL.checkoutOverviewPage)
    })
  }
}
