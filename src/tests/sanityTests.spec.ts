import test from '../fixtures/testSetup'
import {randomUserDataForCheckout, validUserLoginData} from '../data/usersData'
import {basePageURL} from '../data/urlData'
import {productDetails} from '../data/productsData'

test.describe('Sanity Tests', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(basePageURL)
  })
  test('Verify user can purchase and complete an order', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    const {username, password} = validUserLoginData.find(
      ({username}) => username === 'standard_user',
    ) || {username: '', password: ''}
    await loginPage.login(username, password)
    await productsPage.validatePageURL()
    await productsPage.verifyPageTitle()
    for (let {locator} of productDetails) {
      await productsPage.addItemToCart(locator)
    }
    await productsPage.proceedToCartPage()
    await cartPage.verifyPageTitle()
    await cartPage.verifyNumberOfItemsCartBadge(productDetails.length)
    await cartPage.proceedToCheckoutPage()
    await checkoutPage.verifyPageTitle()
    const {firstName, lastName, postalCode} = randomUserDataForCheckout
    await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode)
    await checkoutPage.proceedToCheckoutOverviewPage()
    await checkoutOverviewPage.verifyPageTitle()
    await cartPage.verifyProductsInCart(productDetails)
    await checkoutOverviewPage.verifyTotalPrice(productDetails)
    await checkoutOverviewPage.completeCheckout()
    await checkoutCompletePage.verifyPageTitle()
    await checkoutCompletePage.verifyOrderTitle()
    await checkoutCompletePage.verifyOrderDescription()
    await checkoutCompletePage.goBackToHomePage()
  })
})
