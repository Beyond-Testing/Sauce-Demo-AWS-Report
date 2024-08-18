import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class LoginPage {
    protected readonly page: Page
    protected readonly usernameFieldSelector: string = '[data-test="username"]'
    protected readonly passwordFieldSelector: string = '[data-test="password"]'
    protected readonly loginButtonSelector: string = '[data-test="login-button"]'
    protected readonly errorMessageSelector: string = "[data-test='error']"

    constructor(page: Page) {
        this.page = page
    }

    async openLoginPage() {
        await this.page.goto(url.basePage)
        await validateURL(this.page, url.basePage)
    }

    async login(username: string, password: string) {
        await this.page.locator(this.usernameFieldSelector).fill(username)
        await this.page.locator(this.passwordFieldSelector).fill(password)
        await clickOnElement(this.page, this.loginButtonSelector)
    }

    async verifyErrorMessage(expectedErrorMessage: string) {
        await validateText(
            this.page,
            this.errorMessageSelector,
            expectedErrorMessage,
            'string',
        )
    }
}
