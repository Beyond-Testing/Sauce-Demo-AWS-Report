import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class LoginPage {
    readonly page: Page
    readonly usernameField: string = '[data-test="username"]'
    readonly passwordField: string = '[data-test="password"]'
    readonly loginButton: string = '[data-test="login-button"]'
    readonly errorMessageLocator: string = "[data-test='error']"

    constructor(page: Page) {
        this.page = page
    }

    async openPage() {
        await this.page.goto(url.basePage)
        await validateURL(this.page, url.basePage)
    }
    async login(username: string, password: string) {
        await this.page.locator(this.usernameField).fill(username)
        await this.page.locator(this.passwordField).fill(password)
        await clickOnElement(this.page, this.loginButton)
    }

    async getErrorMessage(expectedErrorMessage: string) {
        await validateText(
            this.page,
            this.errorMessageLocator,
            expectedErrorMessage,
            'string',
        )
    }
}
