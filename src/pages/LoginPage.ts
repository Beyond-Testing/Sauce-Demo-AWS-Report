import {BasePage} from '@/core/BasePage'
import {BASE_URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {LOGIN_PAGE_LOCATORS} from '@/locators/Login'
import type {Page} from '@playwright/test'

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async openLoginPage(): Promise<void> {
    await test.step('Open login page', async () => {
      await this.gotoURL(BASE_URL)
      await this.validateURL(BASE_URL)
    })
  }

  async login(username: string, password: string): Promise<void> {
    await test.step('Login', async () => {
      await this.fillInput(LOGIN_PAGE_LOCATORS.usernameField, username)
      await this.fillInput(LOGIN_PAGE_LOCATORS.passwordField, password)
      await this.clickOnElement(LOGIN_PAGE_LOCATORS.loginButton)
    })
  }

  async verifyErrorMessage(expectedErrorMessage: string): Promise<void> {
    await test.step('Verify error message', async () => {
      await this.validateText(
        LOGIN_PAGE_LOCATORS.errorMessage,
        expectedErrorMessage,
      )
    })
  }
}
