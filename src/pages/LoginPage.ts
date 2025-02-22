import {expect, type Page} from '@playwright/test'
import {basePageURL} from '../data/urlData'
import {clickOnElement, validateText} from '../helpers/testUtils'
import {LoginLocator} from '../locators/LoginLocators'

export class LoginPage {
  private readonly _page: Page

  constructor(page: Page) {
    this._page = page
  }

  async openLoginPage(): Promise<void> {
    await this._page.goto(basePageURL)
    await expect(this._page).toHaveURL(basePageURL)
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
