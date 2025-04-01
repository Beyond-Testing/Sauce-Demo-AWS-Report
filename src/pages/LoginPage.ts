import {type Page} from '@playwright/test'
import {BASE_PAGE_URL} from '@/data/urlData'
import {LoginLocator} from '@/locators/LoginLocators'
import {BasePage} from '@/helpers/BasePage'
import test from '@/fixtures/testSetup'

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async openLoginPage(): Promise<void> {
    await test.step('Open login page', async () => {
      await this.gotoURL(BASE_PAGE_URL)
      await this.validateURL(BASE_PAGE_URL)
    })
  }

  async login(username: string, password: string): Promise<void> {
    await test.step('Login', async () => {
      await this.fillInput(LoginLocator.usernameField, username)
      await this.fillInput(LoginLocator.passwordField, password)
      await this.clickOnElement(LoginLocator.loginButton)
    })
  }

  async verifyErrorMessage(expectedErrorMessage: string): Promise<void> {
    await test.step('Verify error message', async () => {
      await this.validateText(LoginLocator.errorMessage, expectedErrorMessage)
    })
  }
}
