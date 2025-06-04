import test from '@/fixtures/testSetup'
import {generateRandomUserData, VALID_USER_LOGIN_DATA} from '@/data/users'
import {BASE_PAGE_URL} from '@/data/urls'
import {productDetails} from '@/data/products'

test.describe('Sanity Tests', () => {
  test.beforeEach('Open main page', async ({page}) => {
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
    // Find a valid user from the user test data
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
    const {firstName, lastName, postalCode} = generateRandomUserData()
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
