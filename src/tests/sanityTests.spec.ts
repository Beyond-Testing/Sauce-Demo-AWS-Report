import test from '../fixtures/testSetup'
import {
  RANDOM_USER_DATA_FOR_CHECKOUT,
  VALID_USER_LOGIN_DATA,
} from '../data/usersData'
import {BASE_PAGE_URL} from '../data/urlData'
import {productDetails} from '../data/productsData'

test.describe('Sanity Tests', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(BASE_PAGE_URL)
  })
  test('Verify user can purchase and complete an order', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    const {username, password} = VALID_USER_LOGIN_DATA.find(
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
    const {firstName, lastName, postalCode} = RANDOM_USER_DATA_FOR_CHECKOUT
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
