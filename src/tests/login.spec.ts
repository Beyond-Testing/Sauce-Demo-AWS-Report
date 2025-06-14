import {errorMessages} from '@/data/errorMessagesData'
import {INVALID_USER_LOGIN_DATA, VALID_USER_LOGIN_DATA} from '@/data/users'
import test from '@/fixtures/testSetup'

test.describe('Valid Login Suite', () => {
  test.beforeEach('Open login page', async ({loginPage}) => {
    await loginPage.openLoginPage()
  })
  // Filter out locked out user from the user test data
  VALID_USER_LOGIN_DATA.filter(
    ({username}) => username !== 'locked_out_user',
  ).forEach(({username, password}) => {
    test(`Login with a defective user, username: ${username}`, async ({
      loginPage,
      productsPage,
    }) => {
      await loginPage.login(username, password)
      await productsPage.validatePageURL()
      await productsPage.verifyPageTitle()
      await productsPage.logout()
    })
  })
})

test.describe('Invalid Login Suite', () => {
  test.beforeEach('Open login page', async ({loginPage}) => {
    await loginPage.openLoginPage()
  })

  test("Verify Lockout User can't login", async ({loginPage}) => {
    // Find a username by name: 'locked_out_user', if not (undefined), throw an error
    const {username, password} =
      VALID_USER_LOGIN_DATA.find(
        ({username}) => username === 'locked_out_user',
      ) ??
      (() => {
        throw new Error('Locked out user not found in test data')
      })()
    await loginPage.login(username, password)
    await loginPage.verifyErrorMessage(errorMessages.locked_out_error_message)
  })

  INVALID_USER_LOGIN_DATA.forEach(({username, password, errorMessage}) => {
    test(`Verify invalid user can't login: username: ${username} and password: ${password}`, async ({
      loginPage,
    }) => {
      await loginPage.login(username, password)
      await loginPage.verifyErrorMessage(errorMessage)
    })
  })
})
