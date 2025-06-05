import {BasePage} from '@/core/BasePage'
import {BASE_PAGE_URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {LOGIN_LOCATORS} from '@/locators/LoginLocators'
import type {Page} from '@playwright/test'

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
      await this.fillInput(LOGIN_LOCATORS.usernameField, username)
      await this.fillInput(LOGIN_LOCATORS.passwordField, password)
      await this.clickOnElement(LOGIN_LOCATORS.loginButton)
    })
  }

  async verifyErrorMessage(expectedErrorMessage: string): Promise<void> {
    await test.step('Verify error message', async () => {
      await this.validateText(LOGIN_LOCATORS.errorMessage, expectedErrorMessage)
    })
  }
}
