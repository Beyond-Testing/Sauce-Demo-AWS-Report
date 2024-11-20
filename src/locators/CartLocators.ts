import {CheckoutOverViewLocators} from '../locators/CheckoutOverviewLocators'

export class CartLocators {
    static readonly titleSelector = '[data-test="title"]'
    static readonly cartBadgeSelector = '[data-test="shopping-cart-badge"]'
    static readonly checkoutButtonSelector = '[data-test="checkout"]'
    static readonly cartListProductNameSelector =
        '[data-test="inventory-item-name"]'
    static readonly cartListProductDescSelector =
        '[data-test="inventory-item-desc"]'
    static readonly cartListProductPriceSelector =
        '[data-test="inventory-item-price"]'
    static readonly cartItemSelector = (number: number): string =>
        `#checkout_summary_container > div > div.cart_list > div:nth-child(${number})`
}
