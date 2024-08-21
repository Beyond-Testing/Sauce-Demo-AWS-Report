import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class LoginPage {
    private readonly usernameFieldSelector: string = '[data-test="username"]'
    private readonly passwordFieldSelector: string = '[data-test="password"]'
    private readonly loginButtonSelector: string = '[data-test="login-button"]'
    private readonly errorMessageSelector: string = "[data-test='error']"

    constructor(private readonly page: Page) {}

    async openLoginPage(): Promise<void> {
        await this.page.goto(url.basePage)
        await validateURL(this.page, url.basePage)
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.locator(this.usernameFieldSelector).fill(username)
        await this.page.locator(this.passwordFieldSelector).fill(password)
        await clickOnElement(this.page, this.loginButtonSelector)
    }

    async verifyErrorMessage(expectedErrorMessage: string): Promise<void> {
        await validateText(
            this.page,
            this.errorMessageSelector,
            expectedErrorMessage,
            'string',
        )
    }
}
