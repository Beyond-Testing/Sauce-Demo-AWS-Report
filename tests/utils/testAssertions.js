import {expect} from '@playwright/test'

export async function validateErrorMessage(page, expectedErrorMessage) {
    const actualErrorMessage = await page
        .locator("[data-test='error']")
        .innerText()
    expect(actualErrorMessage).toBe(expectedErrorMessage)
}
export async function validateURL(page, expectedURL) {
    const actualErrorMessage = await page.url()
    expect(actualErrorMessage).toBe(expectedURL)
}
export async function validateTitle(page, expectedTitle) {
    const actualErrorMessage = await page.locator('[class="title"]').innerText()
    expect(actualErrorMessage).toBe(expectedTitle)
}
export async function validateCartItems(page, expectedNumberOfItems) {
    const shoppingCartBadge = await page.locator(
        "[class='shopping_cart_badge']",
    )
    const actualNumberOfItems = await shoppingCartBadge.innerText()
    expect(actualNumberOfItems).toEqual(expectedNumberOfItems)
}
export async function validateSuccessMessage(page, expectedMessage) {
    const actualSuccessMessage = await page
        .locator('#checkout_complete_container > h2')
        .innerText()
    expect(actualSuccessMessage).toBe(expectedMessage)
}
export async function validateSuccessBody(page, expectedBody) {
    const actualSuccessBody = await page
        .locator('#checkout_complete_container > div')
        .innerText()
    expect(actualSuccessBody).toBe(expectedBody)
}
