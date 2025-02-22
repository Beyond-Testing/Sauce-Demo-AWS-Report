import test from '../fixtures/testSetup'
import {invalidUserLoginData, validUserLoginData} from '../data/usersData'
import {errorMessages} from '../data/errorMessagesData'

test.describe('Positive Login Suite', () => {
  test.beforeEach(async ({loginPage}) => {
    //
    await loginPage.openLoginPage()
  })
  validUserLoginData
    .filter(({username}) => username !== 'locked_out_user')
    .forEach(({username, password}) => {
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

test.describe('Negative Login Suite', () => {
  test.beforeEach(async ({loginPage}) => {
    await loginPage.openLoginPage()
  })
  test("Verify Lockout User can't login", async ({loginPage}) => {
    const {username, password} = validUserLoginData.find(
      ({username}) => username === 'locked_out_user',
    )!
    await loginPage.login(username, password)
    await loginPage.verifyErrorMessage(errorMessages.locked_out_error_message)
  })

  invalidUserLoginData.forEach(({username, password, errorMessage}) => {
    test(`Verify invalid user can't login: username: ${
      username || 'empty username'
    } and password: ${password || 'empty username'}`, async ({loginPage}) => {
      await loginPage.login(username, password)
      await loginPage.verifyErrorMessage(errorMessage)
    })
  })
})
