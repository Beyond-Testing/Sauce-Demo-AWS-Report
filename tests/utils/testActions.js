import {validateErrorMessage} from '../utils/testAssertions'

export async function login(page, username, password) {
    await page.locator('[data-test="username"]').fill(username)
    await page.locator('[data-test="password"]').fill(password)
    await page.locator('[data-test="login-button"]').click()
}
export async function loginsScenarios(page, username, password, errorMessage) {
    await login(page, username, password)
    await validateErrorMessage(page, errorMessage)
}
export async function addToCartTwoItems(page) {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
}
export async function clickOnCart(page) {
    await page.locator('[class="shopping_cart_badge"]').click()
}
export async function clickOnCheckout(page) {
    await page.locator('[data-test="checkout"]').click()
}
export async function fillCheckoutForm(page) {
    await page.locator('[data-test="firstName"]').fill('John')
    await page.locator('[data-test="lastName"]').fill('Doe')
    await page.locator('[data-test="postalCode"]').fill('12345')
}
export async function clickOnContinue(page) {
    await page.locator('[data-test="continue"]').click()
}
export async function clickOnFinish(page) {
    await page.locator('[data-test="finish"]').click()
}
