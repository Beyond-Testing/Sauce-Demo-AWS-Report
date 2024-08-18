import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {Product} from '../fixtures/productsData'
import {url} from '../fixtures/urlData'

export class CartPage {
    protected readonly page: Page
    protected readonly titleSelector = '[data-test="title"]'
    protected readonly cartBadgeSelector = '[data-test="shopping-cart-badge"]'
    protected readonly checkoutButtonSelector = '[data-test="checkout"]'
    protected readonly cartListProductNameSelector =
        '[data-test="inventory-item-name"]'
    protected readonly cartListProductDescSelector =
        '[data-test="inventory-item-desc"]'
    protected readonly cartListProductPriceSelector =
        '[data-test="inventory-item-price"]'
    protected readonly cartItemSelector = (number: number): string =>
        `#checkout_summary_container > div > div.cart_list > div:nth-child(${number})`

    constructor(page: Page) {
        this.page = page
    }

    async verifyPageTitle(expectedTitle: string = 'Your Cart') {
        await validateText(
            this.page,
            this.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async verifyNumberOfItemsCartBadge(numberOfItems: number) {
        await validateText(
            this.page,
            this.cartBadgeSelector,
            numberOfItems.toString(),
            'string',
        )
    }

    async proceedToCheckoutPage() {
        await clickOnElement(this.page, this.checkoutButtonSelector)
        await validateURL(this.page, url.checkoutStepOnePage)
    }

    async verifyProductsInCart(productArray: Product[]) {
        for (let i = 0; i < productArray.length; i++) {
            const productLocator = this.cartItemSelector(i + 3)
            const product = productArray[i]

            await this.verifySingleProductInCart(productLocator, product)
        }
    }

    async verifySingleProductInCart(productLocator: string, product: Product) {
        await validateText(
            this.page,
            `${productLocator} ${this.cartListProductNameSelector}`,
            product.name,
            'substring',
        )
        await validateText(
            this.page,
            `${productLocator} ${this.cartListProductDescSelector}`,
            product.description,
            'substring',
        )
        await validateText(
            this.page,
            `${productLocator} ${this.cartListProductPriceSelector}`,
            product.price,
            'substring',
        )
    }
}
