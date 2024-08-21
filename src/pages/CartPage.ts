import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {Product} from '../fixtures/productsData'
import {url} from '../fixtures/urlData'

export class CartPage {
    private readonly titleSelector = '[data-test="title"]'
    private readonly cartBadgeSelector = '[data-test="shopping-cart-badge"]'
    private readonly checkoutButtonSelector = '[data-test="checkout"]'
    private readonly cartListProductNameSelector =
        '[data-test="inventory-item-name"]'
    private readonly cartListProductDescSelector =
        '[data-test="inventory-item-desc"]'
    private readonly cartListProductPriceSelector =
        '[data-test="inventory-item-price"]'
    private readonly cartItemSelector = (number: number): string =>
        `#checkout_summary_container > div > div.cart_list > div:nth-child(${number})`

    constructor(private readonly page: Page) {}

    async verifyPageTitle(expectedTitle: string = 'Your Cart'): Promise<void> {
        await validateText(
            this.page,
            this.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async verifyNumberOfItemsCartBadge(numberOfItems: number): Promise<void> {
        await validateText(
            this.page,
            this.cartBadgeSelector,
            numberOfItems.toString(),
            'string',
        )
    }

    async proceedToCheckoutPage(): Promise<void> {
        await clickOnElement(this.page, this.checkoutButtonSelector)
        await validateURL(this.page, url.checkoutStepOnePage)
    }

    async verifyProductsInCart(productArray: Product[]): Promise<void> {
        productArray.forEach(async (product, index) => {
            const productLocator = this.cartItemSelector(index + 3)
            await this.verifySingleProductInCart(productLocator, product)
        })
    }

    private async verifySingleProductInCart(
        productLocator: string,
        product: Product,
    ): Promise<void> {
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
