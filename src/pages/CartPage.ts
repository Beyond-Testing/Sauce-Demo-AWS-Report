import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {Product} from '../fixtures/productsData'
import {url} from '../fixtures/urlData'

export class CartPage {
    readonly page: Page
    readonly title = '[data-test="title"]'
    readonly cartBadge = '[data-test="shopping-cart-badge"]'
    readonly checkoutButton = '[data-test="checkout"]'
    readonly cartListProductName = '[data-test="inventory-item-name"]'
    readonly cartListProductDesc = '[data-test="inventory-item-desc"]'
    readonly cartListProductPrice = '[data-test="inventory-item-price"]'

    constructor(page: Page) {
        this.page = page
    }

    async getTitle() {
        await validateText(this.page, this.title, 'Your Cart', 'string')
    }

    async getNumberOfItemsCartBadge(numberOfItems: number) {
        await validateText(
            this.page,
            this.cartBadge,
            numberOfItems.toString(),
            'string',
        )
    }

    async enterCheckoutPage() {
        await clickOnElement(this.page, this.checkoutButton)
        await validateURL(this.page, url.checkoutStepOnePage)
    }

    getCartListBySelectorPathNumber(number: number): string {
        return `#checkout_summary_container > div > div.cart_list > div:nth-child(${number})`
    }

    async getCartListByProduct(productArray: Product[]) {
        for (let i = 0; i < productArray.length; i++) {
            const productLocator = this.getCartListBySelectorPathNumber(i + 3)

            const nameLocator = `${productLocator} ${this.cartListProductName}`
            const descLocator = `${productLocator} ${this.cartListProductDesc}`
            const priceLocator = `${productLocator} ${this.cartListProductPrice}`

            const productObject = productArray[i]

            await validateText(
                this.page,
                nameLocator,
                productObject.name,
                'substring',
            )
            await validateText(
                this.page,
                descLocator,
                productObject.description,
                'substring',
            )
            await validateText(
                this.page,
                priceLocator,
                productObject.price,
                'substring',
            )
        }
    }
}
