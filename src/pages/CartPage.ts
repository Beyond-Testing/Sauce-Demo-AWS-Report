import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {Product} from '../fixtures/productsData'
import {url} from '../fixtures/urlData'

export class CartPage {
    private page: Page
    private title = '[data-test="title"]'
    private cartBadge = '[data-test="shopping-cart-badge"]'
    private checkoutButton = '[data-test="checkout"]'
    private cartListProductName = '[data-test="inventory-item-name"]'
    private cartListProductDesc = '[data-test="inventory-item-desc"]'
    private cartListProductPrice = '[data-test="inventory-item-price"]'

    constructor(page: Page) {
        this.page = page
    }

    public async getTitle() {
        await validateText(this.page, this.title, 'Your Cart', 'string')
    }

    public async getNumberOfItemsCartBadge(numberOfItems: number) {
        await validateText(
            this.page,
            this.cartBadge,
            numberOfItems.toString(),
            'string',
        )
    }

    public async enterCheckoutPage() {
        await clickOnElement(this.page, this.checkoutButton)
        await validateURL(this.page, url.checkoutStepOnePage)
    }

    private getCartListBySelectorPathNumber(number: number): string {
        return `#checkout_summary_container > div > div.cart_list > div:nth-child(${number})`
    }

    public async getCartListByProduct(productArray: Product[]) {
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
