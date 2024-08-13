import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class LoginPage {
    private page: Page
    private usernameField: string = '[data-test="username"]'
    private passwordField: string = '[data-test="password"]'
    private loginButton: string = '[data-test="login-button"]'
    private errorMessageLocator: string = "[data-test='error']"

    constructor(page: Page) {
        this.page = page
    }

    public async openPage() {
        await this.page.goto(url.basePage)
        await validateURL(this.page, url.basePage)
    }
    public async login(username: string, password: string) {
        await this.page.locator(this.usernameField).fill(username)
        await this.page.locator(this.passwordField).fill(password)
        await clickOnElement(this.page, this.loginButton)
    }

    public async getErrorMessage(expectedErrorMessage: string) {
        await validateText(
            this.page,
            this.errorMessageLocator,
            expectedErrorMessage,
            'string',
        )
    }
}
