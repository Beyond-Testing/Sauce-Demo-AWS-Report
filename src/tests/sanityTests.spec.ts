import {test} from '@playwright/test'
import {
    randomUserDataForCheckout,
    validUserLoginData,
} from '../fixtures/usersData'
import {url} from '../fixtures/urlData'
import {LoginPage} from '../pages/LoginPage'
import {ProductsPage} from '../pages/ProductsPage'
import {productDetails} from '../fixtures/productsData'
import {CartPage} from '../pages/CartPage'
import {CheckoutPage} from '../pages/CheckoutPage'
import {CheckoutOverviewPage} from '../pages/CheckoutOverviewPage'
import {CheckoutCompletePage} from '../pages/CheckoutCompletePage'
import {validateURL} from '../helpers/utils'

test.describe('Sanity Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(url.basePage)
    })
    test('Verify user can purchase and complete an order', async ({page}) => {
        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)
        const checkoutOverviewPage = new CheckoutOverviewPage(page)
        const checkoutCompletePage = new CheckoutCompletePage(page)
        const {username, password} = validUserLoginData.find(
            ({username}) => username === 'standard_user',
        ) || {username: '', password: ''}
        await loginPage.login(username, password)
        await validateURL(page, url.productsPage)
        await productsPage.verifyPageTitle()
        for (let {locator} of productDetails) {
            await productsPage.addItemToCart(locator)
        }
        await productsPage.proceedToCartPage()
        await cartPage.verifyPageTitle()
        await cartPage.verifyNumberOfItemsCartBadge(productDetails.length)
        await cartPage.proceedToCheckoutPage()
        await checkoutPage.verifyPageTitle()
        const {firstname, lastname, postalcode} = randomUserDataForCheckout
        await checkoutPage.fillCheckoutForm(firstname, lastname, postalcode)
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
