import {type Page} from '@playwright/test'
import {URL} from '@/data/urlData'
import {CheckoutLocator} from '@/locators/CheckoutLocators'
import {BasePage} from '@/core/BasePage'
import test from '@/fixtures/testSetup'

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyPageTitle(expectedTitle: string = 'Checkout: Your Information') {
    await test.step('Verify page title', async () => {
      await this.validateText(CheckoutLocator.title, expectedTitle)
    })
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: number,
  ): Promise<void> {
    await test.step('Fill checkout form', async () => {
      await this.fillInput(CheckoutLocator.firstNameField, firstName)
      await this.fillInput(CheckoutLocator.lastNameField, lastName)
      await this.fillInput(
        CheckoutLocator.postalCodeField,
        postalCode.toString(),
      )
    })
  }

  async proceedToCheckoutOverviewPage(): Promise<void> {
    await test.step('Proceed to checkout overview page', async () => {
      await this.clickOnElement(CheckoutLocator.continueButton)
      await this.validateURL(URL.checkoutOverviewPage)
    })
  }
}
