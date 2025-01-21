import {test} from '@playwright/test'
import {invalidUserLoginData, validUserLoginData} from '../fixtures/usersData'
import {LoginPage} from '../pages/LoginPage'
import {errorMessages} from '../fixtures/errorMessagesData'
import {ProductsPage} from '../pages/ProductsPage'
import {validateURL} from '../helpers/testUtils'
import {url} from '../fixtures/urlData'

test.describe('Positive Login Suite', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
  })
  validUserLoginData
    .filter(({username}) => username !== 'locked_out_user')
    .forEach(({username, password}) => {
      test(`Login with a defective user, username: ${username}`, async ({
        page,
      }) => {
        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)
        await loginPage.login(username, password)
        await validateURL(page, url.productsPage)
        await productsPage.verifyPageTitle()
        await productsPage.logout()
      })
    })
})

test.describe('Negative Login Suite', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
  })
  test("Verify Lockout User can't login", async ({page}) => {
    const loginPage = new LoginPage(page)
    const {username, password} = validUserLoginData.find(
      ({username}) => username === 'locked_out_user',
    )!
    await loginPage.login(username, password)
    await loginPage.verifyErrorMessage(errorMessages.locked_out_error_message)
  })

  invalidUserLoginData.forEach(({username, password, errorMessage}) => {
    test(`Verify invalid user can't login: username: ${
      username || 'empty username'
    } and password: ${password || 'empty username'}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      await loginPage.login(username, password)
      await loginPage.verifyErrorMessage(errorMessage)
    })
  })
})
