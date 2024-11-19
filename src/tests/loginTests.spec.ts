import {test} from '@playwright/test'
import {invalidUserLoginData, validUserLoginData} from '../fixtures/usersData'
import {LoginPage} from '../pages/LoginPage'
import {errorMessages} from '../fixtures/errorMessagesData'
import {ProductsPage} from '../pages/ProductsPage'
import {validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'


test.describe('Positive Login Suite', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.openLoginPage()
    })

    test('Login with a defective user', async ({page}) => {
        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)
        for (let user of validUserLoginData) {
            if (user.username === 'locked_out_user') {
                continue
            }
            await loginPage.login(user.username, user.password)
            await validateURL(page, url.productsPage)
            await productsPage.verifyPageTitle()
            await productsPage.logout()
        }
    })
})

test.describe('Negative Login Suite', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.openLoginPage()
    })
    test('Login with Lockout User', async ({page}) => {
        const loginPage = new LoginPage(page)
        const {username = '', password = ''} =
            validUserLoginData.find(
                (user) => user.username === 'locked_out_user',
            ) || {}
        await loginPage.login(username, password)
        await loginPage.verifyErrorMessage(
            errorMessages.locked_out_error_message,
        )
    })

    test('Login with bad credentials', async ({page}) => {
        const loginPage = new LoginPage(page)
        for (let user of invalidUserLoginData) {
            await loginPage.login(user.username, user.password)
            await loginPage.verifyErrorMessage(user.errorMessage)
        }
    })
})
