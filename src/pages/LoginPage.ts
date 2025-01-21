import {type Page} from '@playwright/test'
import {basePage} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/testUtils'
import {LoginLocator} from '../locators/LoginLocators'

export class LoginPage {
  constructor(private readonly _page: Page) {}

  async openLoginPage(): Promise<void> {
    await this._page.goto(basePage)
    await validateURL(this._page, basePage)
  }

  async login(username: string, password: string): Promise<void> {
    await this._page.locator(LoginLocator.usernameField).fill(username)
    await this._page.locator(LoginLocator.passwordField).fill(password)
    await clickOnElement(this._page, LoginLocator.loginButton)
  }

  async verifyErrorMessage(expectedErrorMessage: string): Promise<void> {
    await validateText(
      this._page,
      LoginLocator.errorMessage,
      expectedErrorMessage,
      'string',
    )
  }
}
