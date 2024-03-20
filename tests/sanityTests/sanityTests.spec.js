import {test} from '@playwright/test'
import {textAssertions} from '../utils/textAssertions'
import {userCredentials} from '../utils/testData'
import {
    addToCartTwoItems,
    clickOnCart,
    clickOnCheckout,
    clickOnContinue,
    clickOnFinish,
    fillCheckoutForm,
    login,
} from '../utils/testActions'
import {
    validateCartItems,
    validateSuccessBody,
    validateSuccessMessage,
    validateTitle,
    validateURL,
} from '../utils/testAssertions'

test.describe('Sanity Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(textAssertions.BASE_URL)
    })
    test('Sanity Scenario', async ({page}) => {
        await login(
            page,
            userCredentials[0].username,
            userCredentials[0].password,
        )
        await validateURL(page, textAssertions.PRODUCTS_PAGE_URL)
        await validateTitle(page, 'Products')

        await addToCartTwoItems(page)
        await clickOnCart(page)
        await validateURL(page, textAssertions.CHECKOUT_PAGE_URL)
        await validateTitle(page, 'Your Cart')
        await validateCartItems(page, '2')

        await clickOnCheckout(page)
        await validateURL(page, textAssertions.CHECKOUT_STEP_ONE_PAGE_URL)
        await validateTitle(page, 'Checkout: Your Information')

        await fillCheckoutForm(page)
        await clickOnContinue(page)
        await validateURL(page, textAssertions.CHECKOUT_OVERVIEW_PAGE_URL)
        await validateTitle(page, 'Checkout: Overview')

        await clickOnFinish(page)
        await validateURL(page, textAssertions.CHECKOUT_COMPLETE_PAGE_URL)
        await validateTitle(page, 'Checkout: Complete!')
        await validateSuccessMessage(page, 'Thank you for your order!')
        await validateSuccessBody(
            page,
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
        )
    })
})
