import {type Page} from '@playwright/test'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {Product} from '../fixtures/productsData'
import {url} from '../fixtures/urlData'
import {CartLocators} from '../locators/CartLocators'

export class CartPage {
    constructor(private readonly page: Page) {}

    async verifyPageTitle(expectedTitle: string = 'Your Cart'): Promise<void> {
        await validateText(
            this.page,
            CartLocators.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async verifyNumberOfItemsCartBadge(numberOfItems: number): Promise<void> {
        await validateText(
            this.page,
            CartLocators.cartBadgeSelector,
            numberOfItems.toString(),
            'string',
        )
    }

    async proceedToCheckoutPage(): Promise<void> {
        await clickOnElement(this.page, CartLocators.checkoutButtonSelector)
        await validateURL(this.page, url.checkoutStepOnePage)
    }

    async verifyProductsInCart(productArray: Product[]): Promise<void> {
        productArray.forEach(async (product, index) => {
            const productLocator = CartLocators.cartItemSelector(index + 3)
            await this.verifySingleProductInCart(productLocator, product)
        })
    }

    private async verifySingleProductInCart(
        productLocator: string,
        product: Product,
    ): Promise<void> {
        await validateText(
            this.page,
            `${productLocator} ${CartLocators.cartListProductNameSelector}`,
            product.name,
            'substring',
        )
        await validateText(
            this.page,
            `${productLocator} ${CartLocators.cartListProductDescSelector}`,
            product.description,
            'substring',
        )
        await validateText(
            this.page,
            `${productLocator} ${CartLocators.cartListProductPriceSelector}`,
            product.price,
            'substring',
        )
    }
}
