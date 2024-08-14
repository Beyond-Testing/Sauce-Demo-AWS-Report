import {test} from '@playwright/test'
import {randomUserForCheckout, userCredentials} from '../fixtures/usersData'
import {url} from '../fixtures/urlData'
import {LoginPage} from '../pages/LoginPage'
import {ProductsPage} from '../pages/ProductsPage'
import {productDetails} from '../fixtures/productsData'
import {CartPage} from '../pages/CartPage'
import {CheckoutPage} from '../pages/CheckoutPage'
import {CheckoutOverviewPage} from '../pages/CheckoutOverviewPage'
import {CheckoutCompletePage} from '../pages/CheckoutCompletePage'
import {validateURL} from '../helpers/utils'

test.describe.skip('Sanity Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(url.basePage)
    })
    test('Sanity Scenario', async ({page}) => {
        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)
        const checkoutOverviewPage = new CheckoutOverviewPage(page)
        const checkoutCompletePage = new CheckoutCompletePage(page)
        const {username = '', password = ''} =
            userCredentials.find((user) => user.username === 'standard_user') ||
            {}
        await loginPage.login(username, password)
        await validateURL(page, url.productsPage)
        await productsPage.getTitle()
        for (let product of productDetails) {
            await productsPage.addItemsToCart(product.locator)
        }
        await productsPage.enterCart()
        await cartPage.getTitle()
        await cartPage.getNumberOfItemsCartBadge(productDetails.length)
        await cartPage.enterCheckoutPage()
        await checkoutPage.getTitle()
        const {firstname, lastname, postalcode} = randomUserForCheckout
        await checkoutPage.fillFormFields(firstname, lastname, postalcode)
        await checkoutPage.enterCheckoutOverviewPage()
        await checkoutOverviewPage.getTitle()
        await cartPage.getCartListByProduct(productDetails)
        await checkoutOverviewPage.checkTotalPrice(productDetails)
        await checkoutOverviewPage.finishCheckout()
        await checkoutCompletePage.getTitle()
        await checkoutCompletePage.getOrderTitle()
        await checkoutCompletePage.getOrderDescription()
        await checkoutCompletePage.goBackHome()
    })
})
