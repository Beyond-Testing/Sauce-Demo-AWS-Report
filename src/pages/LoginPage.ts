import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {LoginLocators} from '../locators/LoginLocators'

export class LoginPage {
  constructor(private readonly page: Page) {}

  async openLoginPage(): Promise<void> {
    await this.page.goto(url.basePage)
    await validateURL(this.page, url.basePage)
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator(LoginLocators.usernameFieldSelector).fill(username)
    await this.page.locator(LoginLocators.passwordFieldSelector).fill(password)
    await clickOnElement(this.page, LoginLocators.loginButtonSelector)
  }

  async verifyErrorMessage(expectedErrorMessage: string): Promise<void> {
    await validateText(
      this.page,
      LoginLocators.errorMessageSelector,
      expectedErrorMessage,
      'string',
    )
  }
}
