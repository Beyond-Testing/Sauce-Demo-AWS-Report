import {test} from '@playwright/test'
import {loginData, userCredentials} from '../fixtures/usersData'
import {LoginPage} from '../pages/LoginPage'
import {errorMessages} from '../fixtures/errorMessagesData'
import {ProductsPage} from '../pages/ProductsPage'
import {validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'

test.describe('Positive Login Suite', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.openPage()
    })

    test('Login with a defective user', async ({page}) => {
        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)
        for (let user of userCredentials) {
            if (user.username === 'locked_out_user') {
                continue
            }
            await loginPage.login(user.username, user.password)
            await validateURL(page, url.productsPage)
            await productsPage.getTitle()
            await productsPage.logout()
        }
    })
})

test.describe('Negative Login Suite', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.openPage()
    })
    test('Login with Lockout User', async ({page}) => {
        const loginPage = new LoginPage(page)
        const {username = '', password = ''} =
            userCredentials.find(
                (user) => user.username === 'locked_out_user',
            ) || {}
        await loginPage.login(username, password)
        await loginPage.getErrorMessage(errorMessages.locked_out_error_message)
    })

    test('Login with bad credentials', async ({page}) => {
        const loginPage = new LoginPage(page)
        for (let user of loginData) {
            await loginPage.login(user.username, user.password)
            await loginPage.getErrorMessage(user.errorMessage)
        }
    })
})
